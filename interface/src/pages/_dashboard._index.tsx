import AdminStatisticsCard from '@/features/dashboard/components/admin-statistics-card'
import DashboardStatistics from '@/features/dashboard/components/dashboard-statistics'
import WorkersHealthCard from '@/features/dashboard/components/workers-health-card'
import AdminFilterCombobox from '@/components/common/admin-filter-combobox'
import { useCommandPaletteStore } from '@/hooks/use-command-palette-store'
import UserModal from '@/features/users/dialogs/user-modal'
import { Separator } from '@/components/ui/separator'
import { useAdmin } from '@/hooks/use-admin'
import { useClipboard } from '@/hooks/use-clipboard'
import type { AdminDetails, UserResponse } from '@/service/api'
import { useGetSystemResourceStats, useGetSystemUsersStats } from '@/service/api'
import { Bookmark, Plus, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import PageHeader from '@/components/layout/page-header'
import { type UseEditFormValues, type UseFormValues, getDefaultUserForm } from '@/features/users/forms/user-form'
import { hasPermission, hasScopeAll } from '@/utils/rbac'
import { useQueryClient } from '@tanstack/react-query'

type DashboardAdmin = Pick<AdminDetails, 'id' | 'username'>

const totalAdmin: DashboardAdmin = {
  username: 'Total',
}

const Dashboard = () => {
  const [isUserModalOpen, setUserModalOpen] = useState(false)
  const setCommandPaletteOpen = useCommandPaletteStore(s => s.setOpen)
  const { admin: currentAdmin } = useAdmin()
  const canReadAllUsers = hasScopeAll(currentAdmin, 'users', 'read')
  const canCreateUsers = hasPermission(currentAdmin, 'users', 'create')
  const canReadNodeStats = hasPermission(currentAdmin, 'nodes', 'stats')
  const { t } = useTranslation()

  const [selectedAdmin, setSelectedAdmin] = useState<DashboardAdmin | undefined>(totalAdmin)

  const userForm = useForm<UseFormValues | UseEditFormValues>({
    defaultValues: getDefaultUserForm,
  })

  const queryClient = useQueryClient()
  const { copy } = useClipboard()

  const refreshAllUserData = () => {
    queryClient.invalidateQueries({ queryKey: ['getUsers'] })
    queryClient.invalidateQueries({ queryKey: ['getUsersUsage'] })
    queryClient.invalidateQueries({ queryKey: ['/api/users/'] })
  }

  const handleCreateUserSuccess = async (user: UserResponse) => {
    if (user.subscription_url) {
      const subURL = user.subscription_url.startsWith('/') ? window.location.origin + user.subscription_url : user.subscription_url
      await copy(subURL)
      toast.success(t('userSettings.subscriptionUrlCopied'))
    }
    refreshAllUserData()
  }

  const handleCreateUser = () => {
    if (!canCreateUsers) return
    userForm.reset()
    setUserModalOpen(true)
  }

  const handleOpenQuickActions = () => {
    setCommandPaletteOpen(true)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'n' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        handleCreateUser()
      }
      if (event.key === 'r' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        refreshAllUserData()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const systemUsersStatsParams = canReadAllUsers && selectedAdmin && selectedAdmin.username !== 'Total' ? { admin_username: selectedAdmin.username } : undefined

  const { data: systemResourceStatsData } = useGetSystemResourceStats({
    query: {
      refetchInterval: 5000,
    },
  })

  const { data: systemUsersStatsData } = useGetSystemUsersStats(systemUsersStatsParams, {
    query: {
      refetchInterval: 5000,
    },
  })

  return (
    <div className="flex w-full flex-col items-start gap-2">
      <div className="w-full">
        <PageHeader title="dashboard" description="dashboardDescription" buttonIcon={Bookmark} buttonText="quickActions.title" onButtonClick={handleOpenQuickActions} />
        <Separator />
      </div>

      <div className="w-full px-3 pt-2 sm:px-4">
        <section className="rasa-dashboard-hero mb-5 flex flex-col justify-between gap-5 p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="relative z-10 min-w-0">
            <span className="mb-3 inline-flex items-center gap-2 text-xs font-medium tracking-widest opacity-75">
              <ArrowUpRight className="h-4 w-4" /> RASA PANEL
            </span>
            <h2 className="text-2xl font-semibold sm:text-3xl">{t('rasa.welcome', { name: currentAdmin?.username ?? 'Rasa' })}</h2>
            <p className="mt-2 max-w-xl text-sm leading-7 opacity-80">{t('dashboardDescription')}</p>
          </div>
          {canCreateUsers && (
            <Button onClick={handleCreateUser} className="rasa-hero-action bg-card text-foreground hover:bg-background relative z-10 shrink-0 gap-2">
              <Plus className="h-4 w-4" />
              {t('createUser', { defaultValue: t('userSettings.createUser', { defaultValue: 'Create user' }) })}
            </Button>
          )}
        </section>
        <div className="flex flex-col gap-4 sm:gap-6">
          <DashboardStatistics resourceData={systemResourceStatsData} usersData={systemUsersStatsData} />
          {canReadNodeStats && <WorkersHealthCard />}
          <Separator className="my-1" />
          {canReadAllUsers ? (
            <>
              <AdminFilterCombobox
                value={selectedAdmin?.username === 'Total' ? 'all' : (selectedAdmin?.username ?? 'all')}
                onValueChange={username => {
                  if (username === 'all') {
                    setSelectedAdmin(totalAdmin)
                    return
                  }
                  if (currentAdmin?.username === username) {
                    setSelectedAdmin(currentAdmin)
                    return
                  }
                  setSelectedAdmin(prev => (prev?.username === username ? prev : { username }))
                }}
                onAdminSelect={admin => {
                  if (!admin) return
                  setSelectedAdmin(admin)
                }}
                className="relative mb-3 w-full max-w-xs sm:mb-4 sm:max-w-sm lg:max-w-md"
              />
              <div className="flex flex-col gap-3 sm:gap-4">
                {selectedAdmin && <AdminStatisticsCard key={selectedAdmin.username} admin={selectedAdmin} systemStats={systemUsersStatsData} currentAdmin={currentAdmin} skipStatsFetch />}
              </div>
            </>
          ) : (
            <AdminStatisticsCard showAdminInfo={false} admin={currentAdmin} systemStats={systemUsersStatsData} currentAdmin={currentAdmin} skipStatsFetch />
          )}
        </div>
      </div>

      {isUserModalOpen && <UserModal isDialogOpen={isUserModalOpen} onOpenChange={setUserModalOpen} form={userForm} editingUser={false} onSuccessCallback={handleCreateUserSuccess} />}
    </div>
  )
}

export default Dashboard
