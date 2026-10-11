import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'
import useDirDetection from '@/hooks/use-dir-detection'
import { SystemResourceStats, SystemUsersStats } from '@/service/api'
import { formatBytes } from '@/utils/formatByte'
import { formatDuration } from '@/utils/formatDuration'
import { Clock3, Cpu, Download, HardDrive, MemoryStick, Upload, UserCheck, Users, Wifi } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const percent = (used: number, total: number) => (total > 0 ? Math.min(100, Math.max(0, (used / total) * 100)) : 0)

export default function DashboardStatistics({ resourceData, usersData }: { resourceData: SystemResourceStats | undefined; usersData: SystemUsersStats | undefined }) {
  const { t } = useTranslation()
  const dir = useDirDetection()
  const cpu = Math.min(100, Math.max(0, Number(resourceData?.cpu_usage) || 0))
  const memory = percent(Number(resourceData?.mem_used) || 0, Number(resourceData?.mem_total) || 0)
  const disk = percent(Number(resourceData?.disk_used) || 0, Number(resourceData?.disk_total) || 0)
  const total = Number(usersData?.total_user) || 0
  const active = Number(usersData?.active_users) || 0
  const online = Number(usersData?.online_users) || 0
  const incoming = Number(usersData?.incoming_bandwidth) || 0
  const outgoing = Number(usersData?.outgoing_bandwidth) || 0
  const resources = [
    { label: 'statistics.cpuUsage', icon: Cpu, value: cpu, detail: `${Number(resourceData?.cpu_cores) || 0} ${t('statistics.cores', { defaultValue: 'cores' })}`, tone: 'blue' },
    {
      label: 'statistics.ramUsage',
      icon: MemoryStick,
      value: memory,
      detail: `${formatBytes(Number(resourceData?.mem_used) || 0, 1)} / ${formatBytes(Number(resourceData?.mem_total) || 0, 1)}`,
      tone: 'violet',
    },
    {
      label: 'statistics.diskUsage',
      icon: HardDrive,
      value: disk,
      detail: `${formatBytes(Number(resourceData?.disk_used) || 0, 1)} / ${formatBytes(Number(resourceData?.disk_total) || 0, 1)}`,
      tone: 'amber',
    },
  ]

  return (
    <div dir={dir} className="rasa-statistics flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: 'statistics.users', icon: Users, value: total, ratio: null, tone: 'blue' },
          { label: 'statistics.activeUsers', icon: UserCheck, value: active, ratio: percent(active, total), tone: 'violet' },
          { label: 'statistics.onlineUsers', icon: Wifi, value: online, ratio: percent(online, active), tone: 'green' },
        ].map(metric => (
          <Card key={metric.label} className={`rasa-user-metric rasa-tone-${metric.tone}`}>
            <CardContent className="relative p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground text-sm font-medium">{t(metric.label)}</span>
                <span className="rasa-metric-icon">
                  <metric.icon className="h-5 w-5" />
                </span>
              </div>
              <div className="mt-5 flex items-end justify-between gap-3">
                {usersData ? (
                  <strong dir="ltr" className="text-4xl font-semibold tracking-tight tabular-nums">
                    {metric.value.toLocaleString()}
                  </strong>
                ) : (
                  <Skeleton className="h-10 w-24" />
                )}
                {usersData && metric.ratio !== null && (
                  <span dir="ltr" className="rasa-metric-ratio">
                    {metric.ratio.toFixed(1)}%
                  </span>
                )}
              </div>
              <div className="rasa-meter mt-5" aria-hidden="true">
                <span style={{ width: `${usersData ? (metric.ratio ?? 100) : 0}%` }} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {resources.map(metric => (
          <Card key={metric.label} className={`rasa-resource-metric rasa-tone-${metric.tone}`}>
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <span className="rasa-metric-icon">
                  <metric.icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-medium">{t(metric.label)}</span>
              </div>
              <div className="my-5 flex flex-wrap items-end justify-between gap-2">
                {resourceData ? (
                  <strong dir="ltr" className="text-3xl font-semibold tabular-nums">
                    {metric.value.toFixed(1)}
                    <span className="text-muted-foreground ms-1 text-base">%</span>
                  </strong>
                ) : (
                  <Skeleton className="h-9 w-24" />
                )}
                {resourceData && (
                  <span dir="ltr" className="text-muted-foreground text-xs">
                    {metric.detail}
                  </span>
                )}
              </div>
              <div className="rasa-meter" role="progressbar" aria-label={t(metric.label)} aria-valuenow={resourceData ? metric.value : undefined} aria-valuemin={0} aria-valuemax={100}>
                <span style={{ width: `${resourceData ? metric.value : 0}%` }} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <Card className="rasa-traffic-card">
          <CardContent className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <p className="text-muted-foreground mb-2 text-sm">{t('statistics.totalTraffic')}</p>
              {usersData ? (
                <strong dir="ltr" className="text-3xl font-semibold">
                  {formatBytes(incoming + outgoing, 1)}
                </strong>
              ) : (
                <Skeleton className="h-9 w-32" />
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-8">
              {[
                [Download, incoming, 'statistics.downlink'],
                [Upload, outgoing, 'statistics.uplink'],
              ].map(([Icon, value, label]) => {
                const TrafficIcon = Icon as typeof Download
                return (
                  <div key={label as string} className="rasa-transfer">
                    <TrafficIcon className="text-primary mb-2 h-4 w-4" />
                    <p className="text-muted-foreground mb-1 text-xs">{t(label as string)}</p>
                    {usersData ? (
                      <strong dir="ltr" className="text-sm">
                        {formatBytes(value as number, 1)}
                      </strong>
                    ) : (
                      <Skeleton className="h-5 w-16" />
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex h-full items-center gap-4 p-5 sm:p-6">
            <span className="rasa-metric-icon">
              <Clock3 className="h-5 w-5" />
            </span>
            <div>
              <p className="text-muted-foreground mb-2 text-sm">{t('statistics.uptime')}</p>
              {resourceData ? <strong className="text-lg font-semibold">{formatDuration(resourceData.uptime_seconds, t)}</strong> : <Skeleton className="h-7 w-32" />}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
