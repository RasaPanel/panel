import { Card, CardContent } from '@/components/ui/card'
import { CircularProgress } from '@/components/ui/circular-progress'
import { Skeleton } from '@/components/ui/skeleton'
import type { LucideIcon } from 'lucide-react'

export default function ResourceGaugeCard({ label, icon: Icon, value, detail, loading }: { label: string; icon: LucideIcon; value: number; detail: string; loading: boolean }) {
  return (
    <Card className="rasa-resource-gauge h-full">
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-center gap-2 text-sm font-medium">
          <span className="rasa-gauge-icon">
            <Icon className="h-4 w-4" />
          </span>
          <span>{label}</span>
        </div>
        <div className="mt-4 flex items-center justify-between gap-4 sm:mt-5">
          {loading ? (
            <Skeleton className="h-[104px] w-[104px] shrink-0 rounded-full" />
          ) : (
            <CircularProgress value={value} size={104} strokeWidth={7} valueFormatter={v => `${v.toFixed(1)}%`} className="shrink-0 [&>span]:text-xl [&>span]:font-semibold [&>span]:tabular-nums" />
          )}
          <div className="min-w-0 flex-1 text-end">
            {loading ? (
              <Skeleton className="ms-auto h-6 w-20" />
            ) : (
              <strong dir="ltr" className="inline-block max-w-full text-sm font-semibold break-words sm:text-base">
                {detail}
              </strong>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
