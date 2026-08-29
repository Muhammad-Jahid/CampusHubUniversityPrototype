import { useState, type ReactNode } from 'react'
import { Card, StatCard, Badge, Button, Tabs, Avatar, Modal, Input, Textarea, Toast } from './shell'
import { ADMIN_STATS, ADMIN_USERS, ADMIN_COMMUNITIES, ADMIN_REPORTS, ANNOUNCEMENTS, EVENTS, JOBS, ACTIVITY_DATA, MODERATION_QUEUE } from './demo'
import type { NavigateFn } from './shell'

interface AdminProps { navigate: NavigateFn; params?: any; onLogout?: () => void }

// ─── Admin Shell ──────────────────────────────────────────────────────────────

const adminNav = [
  { label: 'Dashboard', view: 'admin-dashboard', icon: '⊞' },
  { label: 'Users', view: 'admin-users', icon: '◎' },
  { label: 'Communities', view: 'admin-communities', icon: '◈' },
  { label: 'Content Moderation', view: 'admin-moderation', icon: '◉' },
  { label: 'Announcements', view: 'admin-announcements', icon: '◬' },
  { label: 'Events', view: 'admin-events', icon: '◷' },
  { label: 'Jobs', view: 'admin-jobs-mod', icon: '◈' },
  { label: 'Reports', view: 'admin-reports', icon: '⚠' },
]

function AdminShell({ children, navigate, params, onLogout }: { children: ReactNode; navigate: NavigateFn; params?: any; onLogout?: () => void }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const currentView = params?._view || ''

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      {sidebarOpen && <div className="lg:hidden fixed inset-0 bg-black/50 z-30" onClick={() => setSidebarOpen(false)} />}
      <aside className={`fixed top-0 left-0 h-full w-56 bg-ink z-40 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-danger rounded-lg flex items-center justify-center text-white text-xs font-bold">A</div>
            <div>
              <div className="font-display text-white text-base leading-tight">Admin Panel</div>
              <div className="text-white/40 text-xs font-code">Premier University</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          {adminNav.map(item => (
            <button key={item.view} onClick={() => { navigate(item.view as any); setSidebarOpen(false) }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 mb-0.5 text-left
                ${currentView===item.view ? 'bg-white/15 text-white font-medium' : 'text-white/60 hover:bg-white/8 hover:text-white'}`}>
              <span className="text-sm opacity-70">{item.icon}</span><span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="px-5 py-4 border-t border-white/10">
          <button onClick={onLogout} className="w-full text-left text-xs text-white/40 hover:text-white/70 transition-colors">Logout →</button>
        </div>
      </aside>
      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-56">
        <header className="fixed top-0 left-0 lg:left-56 right-0 h-12 bg-ink z-20 flex items-center px-4 gap-4 border-b border-white/10">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden w-8 h-8 flex items-center justify-center text-white/60 hover:text-white">☰</button>
          <span className="font-display text-white text-sm">CampusHub Administration</span>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-xs text-white/40 font-code">Dr. Admin · admin@premier.edu</span>
            <button onClick={onLogout} className="text-xs text-white/50 hover:text-white transition-colors border border-white/20 px-3 py-1 rounded-lg">Logout</button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto pt-12 bg-canvas">{children}</main>
      </div>
    </div>
  )
}

// ─── Admin Dashboard ──────────────────────────────────────────────────────────

export function AdminDashboard(props: AdminProps) {
  const { navigate, params } = props
  const maxPosts = Math.max(...ACTIVITY_DATA.map(d => d.posts))

  return (
    <AdminShell navigate={navigate} params={{...params, _view:'admin-dashboard'}} onLogout={props.onLogout}>
      <div className="px-6 lg:px-8 py-6 space-y-6">
        <div>
          <h1 className="font-display text-2xl text-ink">Admin Dashboard</h1>
          <p className="text-muted text-sm mt-0.5">Premier University · CampusHub v1.0 · August 29, 2026</p>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard label="Total Students" value={ADMIN_STATS.totalStudents.toLocaleString()} icon="◎" color="navy" sub="Active accounts" />
          <StatCard label="Total Alumni" value={ADMIN_STATS.totalAlumni.toLocaleString()} icon="◈" color="green" sub="Verified members" />
          <StatCard label="Active Communities" value={ADMIN_STATS.activeCommunities} icon="◉" color="gold" sub="Across all batches" />
          <StatCard label="Posts Today" value={ADMIN_STATS.postsToday} icon="◬" color="navy" sub="+12% vs yesterday" />
          <StatCard label="Pending Reports" value={ADMIN_STATS.pendingReports} icon="⚠" color="red" sub="Requires attention" />
          <StatCard label="Upcoming Events" value={ADMIN_STATS.upcomingEvents} icon="◷" color="green" sub="Next 30 days" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Activity chart */}
          <div className="lg:col-span-2">
            <Card className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-ink">Platform Activity — Last 7 Days</h3>
                <div className="flex gap-3 text-xs">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary inline-block"/>Posts</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-secondary inline-block"/>Logins</span>
                </div>
              </div>
              <div className="flex items-end gap-3 h-36">
                {ACTIVITY_DATA.map(d => (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex items-end gap-0.5 h-28">
                      <div className="flex-1 bg-primary rounded-t transition-all" style={{height:`${(d.posts/maxPosts)*100}%`}} title={`Posts: ${d.posts}`} />
                      <div className="flex-1 bg-secondary/40 rounded-t" style={{height:`${(d.logins/500)*100}%`}} title={`Logins: ${d.logins}`} />
                    </div>
                    <span className="text-xs text-muted font-code">{d.day}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Quick actions */}
          <div className="space-y-3">
            <Card className="p-4">
              <h4 className="font-semibold text-sm text-ink mb-3">Quick Actions</h4>
              <div className="flex flex-col gap-2">
                {[
                  {label:'Review Reports',count:ADMIN_STATS.pendingReports,view:'admin-reports',color:'bg-red-50 text-danger'},
                  {label:'Moderate Content',count:3,view:'admin-moderation',color:'bg-accent-pale text-accent'},
                  {label:'Manage Users',count:ADMIN_USERS.filter(u=>u.status==='pending').length,view:'admin-users',color:'bg-primary-pale text-primary'},
                  {label:'Review Jobs',count:JOBS.filter(j=>!j.approved).length,view:'admin-jobs-mod',color:'bg-secondary-pale text-secondary'},
                ].map(a => (
                  <button key={a.view} onClick={() => navigate(a.view as any)}
                    className="flex items-center justify-between p-3 rounded-xl border border-edge hover:border-primary/30 transition-colors text-left">
                    <span className="text-sm text-ink">{a.label}</span>
                    {a.count > 0 && <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${a.color}`}>{a.count}</span>}
                  </button>
                ))}
              </div>
            </Card>
            <Card className="p-4">
              <h4 className="font-semibold text-sm text-ink mb-3">Recent Registrations</h4>
              {ADMIN_USERS.filter(u=>u.status==='pending').slice(0,3).map(u => (
                <div key={u.id} className="flex items-center gap-2 py-2 border-b border-edge last:border-0">
                  <Avatar name={u.name} size="xs" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-ink truncate">{u.name}</p>
                    <p className="text-xs text-muted">{u.role}</p>
                  </div>
                  <Badge variant="gold">Pending</Badge>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </AdminShell>
  )
}

// ─── User Management ──────────────────────────────────────────────────────────

export function AdminUsersPage(props: AdminProps) {
  const { navigate, params } = props
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')
  const [users, setUsers] = useState(ADMIN_USERS)
  const [toast, setToast] = useState('')

  const filtered = users.filter(u =>
    (roleFilter==='All'||u.role===roleFilter) &&
    (search===''||u.name.toLowerCase().includes(search.toLowerCase())||u.email.toLowerCase().includes(search.toLowerCase()))
  )

  const statusBadge: Record<string, string> = { active:'green', suspended:'red', pending:'gold' }

  function handleAction(id: string, action: string) {
    if (action === 'suspend') {
      setUsers(us => us.map(u => u.id===id ? {...u, status:'suspended'} : u))
      setToast('User suspended.')
    } else if (action === 'verify') {
      setUsers(us => us.map(u => u.id===id ? {...u, status:'active'} : u))
      setToast('User verified and activated.')
    }
  }

  return (
    <AdminShell navigate={navigate} params={{...params, _view:'admin-users'}} onLogout={props.onLogout}>
      <div className="px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div><h1 className="font-display text-2xl text-ink">User Management</h1><p className="text-muted text-sm">{users.length} total users</p></div>
        </div>
        <Card className="p-4 mb-4">
          <div className="flex flex-wrap gap-3">
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍  Search users..."
              className="flex-1 min-w-48 px-3 py-2 rounded-lg border border-edge text-sm bg-canvas focus:outline-none focus:ring-2 focus:ring-primary/20" />
            {['All','Student','Alumni'].map(r => (
              <button key={r} onClick={() => setRoleFilter(r)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${roleFilter===r ? 'bg-ink text-white' : 'border border-edge text-muted hover:border-ink/40'}`}>{r}</button>
            ))}
          </div>
        </Card>
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-edge bg-canvas-dark">
                  {['Name','Role','Department','Batch','Status','Actions'].map(h=>(
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(u => (
                  <tr key={u.id} className="border-b border-edge hover:bg-canvas-dark/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar name={u.name} size="xs" />
                        <div>
                          <p className="font-medium text-ink">{u.name}</p>
                          <p className="text-xs text-muted">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3"><Badge variant={u.role==='Alumni'?'green':'navy'}>{u.role}</Badge></td>
                    <td className="px-4 py-3 text-muted">{u.department}</td>
                    <td className="px-4 py-3 text-muted font-code text-xs">{u.batch}</td>
                    <td className="px-4 py-3"><Badge variant={statusBadge[u.status]}>{u.status}</Badge></td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button onClick={() => navigate('admin-user-detail', {userId: u.id})}
                          className="px-2 py-1 text-xs text-primary hover:bg-primary-pale rounded transition-colors">View</button>
                        {u.status==='pending' && <button onClick={() => handleAction(u.id,'verify')} className="px-2 py-1 text-xs text-success hover:bg-green-50 rounded transition-colors">Verify</button>}
                        {u.status==='active' && <button onClick={() => handleAction(u.id,'suspend')} className="px-2 py-1 text-xs text-danger hover:bg-red-50 rounded transition-colors">Suspend</button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </AdminShell>
  )
}

// ─── User Detail ──────────────────────────────────────────────────────────────

export function AdminUserDetailPage(props: AdminProps) {
  const { navigate, params } = props
  const user = ADMIN_USERS.find(u => u.id === params?.userId) || ADMIN_USERS[0]
  const [toast, setToast] = useState('')

  return (
    <AdminShell navigate={navigate} params={{...params, _view:'admin-users'}} onLogout={props.onLogout}>
      <div className="px-6 lg:px-8 py-6 max-w-3xl">
        <button onClick={() => navigate('admin-users')} className="text-sm text-muted hover:text-ink mb-4 flex items-center gap-1 transition-colors">← Back to Users</button>
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-5">
            <div className="flex items-start gap-4 mb-4">
              <Avatar name={user.name} size="lg" />
              <div>
                <h2 className="font-display text-xl text-ink">{user.name}</h2>
                <Badge variant={user.role==='Alumni'?'green':'navy'}>{user.role}</Badge>
                <p className="text-sm text-muted mt-1">{user.email}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              {[['Department',user.department],['Batch',user.batch],['Joined',user.joinDate],['Status',user.status]].map(([k,v])=>(
                <div key={k as string} className="flex justify-between"><span className="text-muted">{k}</span><span className="text-ink font-medium">{v}</span></div>
              ))}
            </div>
          </Card>
          <Card className="p-5">
            <h3 className="font-semibold text-ink mb-3">Activity Summary</h3>
            <div className="space-y-3">
              {[['Posts',user.posts],['Reports Against',user.reports]].map(([k,v])=>(
                <div key={k as string} className="flex justify-between items-center">
                  <span className="text-muted text-sm">{k}</span>
                  <span className="font-bold text-ink">{v}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-edge">
              <h4 className="font-semibold text-sm text-ink mb-2">Moderation Actions</h4>
              <div className="flex flex-col gap-2">
                {user.status === 'active' ? (
                  <Button variant="danger" size="sm" fullWidth onClick={() => { setToast('User suspended.') }}>Suspend Account</Button>
                ) : user.status === 'suspended' ? (
                  <Button variant="secondary" size="sm" fullWidth onClick={() => setToast('Account reactivated.')}>Reactivate Account</Button>
                ) : (
                  <Button variant="primary" size="sm" fullWidth onClick={() => setToast('Account verified.')}>Verify & Activate</Button>
                )}
                <Button variant="ghost" size="sm" fullWidth onClick={() => setToast('Warning sent to user.')}>Send Warning</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </AdminShell>
  )
}

// ─── Community Management ─────────────────────────────────────────────────────

export function AdminCommunitiesPage(props: AdminProps) {
  const { navigate, params } = props
  const [toast, setToast] = useState('')
  const [showCreate, setShowCreate] = useState(false)
  const [newName, setNewName] = useState('')

  return (
    <AdminShell navigate={navigate} params={{...params, _view:'admin-communities'}} onLogout={props.onLogout}>
      <div className="px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div><h1 className="font-display text-2xl text-ink">Community Management</h1><p className="text-muted text-sm">{ADMIN_COMMUNITIES.length} communities</p></div>
          <Button onClick={() => setShowCreate(true)}>+ Create Community</Button>
        </div>
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-edge bg-canvas-dark">
                  {['Community','Type','Members','Posts','Moderator','Status','Actions'].map(h=>(
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ADMIN_COMMUNITIES.map(c => (
                  <tr key={c.id} className="border-b border-edge hover:bg-canvas-dark/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-ink max-w-48">{c.name}</td>
                    <td className="px-4 py-3"><Badge variant="gray">{c.type}</Badge></td>
                    <td className="px-4 py-3 text-muted">{c.members.toLocaleString()}</td>
                    <td className="px-4 py-3 text-muted">{c.posts.toLocaleString()}</td>
                    <td className="px-4 py-3 text-muted">{c.moderator || <span className="text-danger text-xs">Unassigned</span>}</td>
                    <td className="px-4 py-3">
                      <Badge variant={c.status==='active'?'success':c.status==='needs_moderator'?'gold':'gray'}>
                        {c.status === 'needs_moderator' ? 'Needs Moderator' : c.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button className="px-2 py-1 text-xs text-primary hover:bg-primary-pale rounded">Edit</button>
                        <button onClick={() => setToast('Moderator assignment updated.')} className="px-2 py-1 text-xs text-secondary hover:bg-secondary-pale rounded">Assign Mod</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Create Community" size="sm">
        <div className="flex flex-col gap-4">
          <Input label="Community Name" value={newName} onChange={setNewName} placeholder="CSE Batch 2024 — Section A" />
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowCreate(false)} fullWidth>Cancel</Button>
            <Button onClick={() => { setShowCreate(false); setToast('Community created!') }} disabled={!newName} fullWidth>Create</Button>
          </div>
        </div>
      </Modal>
      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </AdminShell>
  )
}

// ─── Content Moderation ───────────────────────────────────────────────────────

export function AdminModerationPage(props: AdminProps) {
  const { navigate, params } = props
  const [queue, setQueue] = useState(MODERATION_QUEUE)
  const [toast, setToast] = useState('')
  const [tab, setTab] = useState('flagged')

  function action(id: string, act: string) {
    setQueue(q => q.filter(x => x.id !== id))
    setToast(act === 'approve' ? 'Content approved.' : act === 'remove' ? 'Content removed.' : 'Warning sent to user.')
  }

  const shown = tab === 'flagged' ? queue.filter(q=>q.flagged) : queue.filter(q=>!q.flagged)

  return (
    <AdminShell navigate={navigate} params={{...params, _view:'admin-moderation'}} onLogout={props.onLogout}>
      <div className="px-6 lg:px-8 py-6">
        <div className="mb-6"><h1 className="font-display text-2xl text-ink">Content Moderation</h1><p className="text-muted text-sm">Review and moderate platform content</p></div>
        <Tabs tabs={[{id:'flagged',label:'Flagged Queue',count:queue.filter(q=>q.flagged).length},{id:'all',label:'All Recent Content',count:queue.filter(q=>!q.flagged).length}]}
          active={tab} onChange={setTab} className="mb-6" />
        <div className="space-y-3 max-w-3xl">
          {shown.length === 0 && <div className="text-center py-12 text-muted"><p className="text-4xl mb-2">✅</p><p>No items in this queue!</p></div>}
          {shown.map(item => (
            <Card key={item.id} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={item.type==='Post'?'navy':item.type==='Comment'?'green':'gold'}>{item.type}</Badge>
                    {item.flagged && <Badge variant="red">Flagged</Badge>}
                    <span className="text-xs text-muted font-code">{item.date}</span>
                  </div>
                  <p className="text-sm font-medium text-ink mb-0.5">"{item.content}"</p>
                  <p className="text-xs text-muted">By: {item.author} · in {item.community}</p>
                </div>
                <div className="flex flex-col gap-1.5 flex-shrink-0">
                  <Button size="xs" variant="secondary" onClick={() => action(item.id, 'approve')}>Approve</Button>
                  <Button size="xs" variant="danger" onClick={() => action(item.id, 'remove')}>Remove</Button>
                  <Button size="xs" variant="ghost" onClick={() => action(item.id, 'warn')}>Warn User</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </AdminShell>
  )
}

// ─── Announcement Management ──────────────────────────────────────────────────

export function AdminAnnouncementsPage(props: AdminProps) {
  const { navigate, params } = props
  const [anns, setAnns] = useState(ANNOUNCEMENTS)
  const [showCreate, setShowCreate] = useState(false)
  const [toast, setToast] = useState('')
  const [form, setForm] = useState({ title:'', category:'Academic', content:'', target:'All Students' })
  const set = (k: string) => (v: string) => setForm(f=>({...f,[k]:v}))

  return (
    <AdminShell navigate={navigate} params={{...params, _view:'admin-announcements'}} onLogout={props.onLogout}>
      <div className="px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div><h1 className="font-display text-2xl text-ink">Announcement Management</h1></div>
          <Button onClick={() => setShowCreate(true)}>+ Create Announcement</Button>
        </div>
        <div className="space-y-3 max-w-3xl">
          {anns.map(a => (
            <Card key={a.id} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={a.category==='Academic'?'navy':a.category==='Event'?'gold':a.category==='Department'?'green':'gray'}>{a.category}</Badge>
                    {a.priority==='high'&&<Badge variant="red">High</Badge>}
                    <span className="text-xs text-muted font-code">{a.date}</span>
                  </div>
                  <h3 className="font-semibold text-ink">{a.title}</h3>
                  <p className="text-sm text-muted mt-1 line-clamp-2">{a.content}</p>
                  <p className="text-xs text-muted mt-1">— {a.author} · Target: {a.target}</p>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button className="px-2 py-1 text-xs text-primary hover:bg-primary-pale rounded transition-colors">Edit</button>
                  <button onClick={() => { setAnns(as => as.filter(x=>x.id!==a.id)); setToast('Announcement archived.') }}
                    className="px-2 py-1 text-xs text-muted hover:bg-canvas-dark rounded transition-colors">Archive</button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Create Announcement" size="md">
        <div className="flex flex-col gap-4">
          <Input label="Title" value={form.title} onChange={set('title')} placeholder="Announcement title..." />
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-ink-light">Category</label>
              <select value={form.category} onChange={e=>set('category')(e.target.value)} className="px-3 py-2 rounded-lg border border-edge text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                {['Academic','Event','General','Department'].map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-ink-light">Target Audience</label>
              <select value={form.target} onChange={e=>set('target')(e.target.value)} className="px-3 py-2 rounded-lg border border-edge text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                {['All Students','Alumni & Students','CSE Students','Everyone'].map(t=><option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <Textarea label="Content" value={form.content} onChange={set('content')} rows={4} placeholder="Announcement body..." />
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowCreate(false)} fullWidth>Cancel</Button>
            <Button onClick={() => { setShowCreate(false); setToast('Announcement published!') }} disabled={!form.title||!form.content} fullWidth>Publish</Button>
          </div>
        </div>
      </Modal>
      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </AdminShell>
  )
}

// ─── Event Management ─────────────────────────────────────────────────────────

export function AdminEventsPage(props: AdminProps) {
  const { navigate, params } = props
  const [events, setEvents] = useState(EVENTS)
  const [toast, setToast] = useState('')

  return (
    <AdminShell navigate={navigate} params={{...params, _view:'admin-events'}} onLogout={props.onLogout}>
      <div className="px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div><h1 className="font-display text-2xl text-ink">Event Management</h1><p className="text-muted text-sm">{events.length} total events</p></div>
          <Button onClick={() => setToast('Create event form coming soon.')}>+ Create Event</Button>
        </div>
        <div className="space-y-3 max-w-3xl">
          {events.map(ev => (
            <Card key={ev.id} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={ev.category==='Career'?'gold':ev.category==='Academic'?'navy':'green'}>{ev.category}</Badge>
                    <Badge variant={ev.status==='upcoming'?'success':'gray'}>{ev.status}</Badge>
                  </div>
                  <h3 className="font-semibold text-ink">{ev.title}</h3>
                  <p className="text-sm text-muted">{ev.date} · {ev.time}</p>
                  <p className="text-xs text-muted mt-1">{ev.attendees} RSVP · Organizer: {ev.organizer}</p>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button className="px-2 py-1 text-xs text-primary hover:bg-primary-pale rounded">Edit</button>
                  <button onClick={() => setToast('RSVP stats modal.')} className="px-2 py-1 text-xs text-secondary hover:bg-secondary-pale rounded">RSVPs</button>
                  <button onClick={() => { setEvents(es=>es.filter(e=>e.id!==ev.id)); setToast('Event removed.') }} className="px-2 py-1 text-xs text-muted hover:bg-canvas-dark rounded">Remove</button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </AdminShell>
  )
}

// ─── Jobs Moderation ──────────────────────────────────────────────────────────

export function AdminJobsModerationPage(props: AdminProps) {
  const { navigate, params } = props
  const [jobs, setJobs] = useState(JOBS)
  const [tab, setTab] = useState('pending')
  const [toast, setToast] = useState('')

  const pending = jobs.filter(j=>!j.approved)
  const approved = jobs.filter(j=>j.approved)
  const shown = tab === 'pending' ? pending : approved

  function approve(id: string) { setJobs(js=>js.map(j=>j.id===id?{...j,approved:true}:j)); setToast('Job approved and published.') }
  function reject(id: string) { setJobs(js=>js.filter(j=>j.id!==id)); setToast('Job posting rejected.') }

  return (
    <AdminShell navigate={navigate} params={{...params, _view:'admin-jobs-mod'}} onLogout={props.onLogout}>
      <div className="px-6 lg:px-8 py-6">
        <div className="mb-6"><h1 className="font-display text-2xl text-ink">Job Postings Moderation</h1><p className="text-muted text-sm">Review and approve alumni job postings</p></div>
        <Tabs tabs={[{id:'pending',label:'Pending Review',count:pending.length},{id:'approved',label:'Approved',count:approved.length}]}
          active={tab} onChange={setTab} className="mb-6" />
        <div className="space-y-3 max-w-3xl">
          {shown.length===0 && <div className="text-center py-12 text-muted"><p className="text-4xl mb-2">✅</p><p>No items pending review.</p></div>}
          {shown.map(j => (
            <Card key={j.id} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={j.type==='Internship'?'gold':'navy'}>{j.type}</Badge>
                    {!j.approved && <Badge variant="gold">Pending</Badge>}
                    {j.approved && <Badge variant="success">Live</Badge>}
                  </div>
                  <h3 className="font-semibold text-ink">{j.title}</h3>
                  <p className="text-sm text-secondary">{j.company}</p>
                  <p className="text-xs text-muted mt-1">Posted by: {j.postedBy} · Deadline: {j.deadline}</p>
                </div>
                {!j.approved && (
                  <div className="flex gap-2 flex-shrink-0">
                    <Button size="sm" variant="secondary" onClick={() => approve(j.id)}>Approve</Button>
                    <Button size="sm" variant="danger" onClick={() => reject(j.id)}>Reject</Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </AdminShell>
  )
}

// ─── Reports ──────────────────────────────────────────────────────────────────

export function AdminReportsPage(props: AdminProps) {
  const { navigate, params } = props
  const [reports, setReports] = useState(ADMIN_REPORTS)
  const [tab, setTab] = useState('pending')
  const [toast, setToast] = useState('')

  const pending = reports.filter(r=>r.status==='pending')
  const resolved = reports.filter(r=>r.status==='resolved')
  const shown = tab==='pending' ? pending : resolved

  function resolve(id: string) { setReports(rs=>rs.map(r=>r.id===id?{...r,status:'resolved'}:r)); setToast('Report resolved.') }
  function dismiss(id: string) { setReports(rs=>rs.filter(r=>r.id!==id)); setToast('Report dismissed.') }

  return (
    <AdminShell navigate={navigate} params={{...params, _view:'admin-reports'}} onLogout={props.onLogout}>
      <div className="px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="font-display text-2xl text-ink">Reports</h1>
          <p className="text-muted text-sm">User-submitted content reports</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <StatCard label="Total Reports" value={reports.length} icon="⚑" color="navy" />
          <StatCard label="Pending" value={pending.length} icon="⏳" color="red" />
          <StatCard label="Resolved" value={resolved.length} icon="✓" color="green" />
        </div>

        <Tabs tabs={[{id:'pending',label:'Pending',count:pending.length},{id:'resolved',label:'Resolved',count:resolved.length}]}
          active={tab} onChange={setTab} className="mb-6" />
        <div className="space-y-3 max-w-3xl">
          {shown.length===0 && <div className="text-center py-12 text-muted"><p className="text-4xl mb-2">✅</p><p>No reports in this category.</p></div>}
          {shown.map(r => (
            <Card key={r.id} className={`p-5 ${r.status==='resolved'?'opacity-70':''}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={r.type==='Post'?'navy':r.type==='Comment'?'green':'gold'}>{r.type}</Badge>
                    <Badge variant={r.reason==='Spam'?'gray':r.reason==='Harassment'?'red':'gold'}>{r.reason}</Badge>
                    <Badge variant={r.status==='pending'?'gold':'success'}>{r.status}</Badge>
                    <span className="text-xs text-muted font-code ml-auto">{r.date}</span>
                  </div>
                  <p className="text-sm font-medium text-ink">"{r.content}"</p>
                  <div className="flex gap-4 mt-1 text-xs text-muted">
                    <span>Reporter: {r.reporter}</span>
                    <span>Reported: {r.reported}</span>
                  </div>
                </div>
                {r.status==='pending' && (
                  <div className="flex gap-1 flex-shrink-0">
                    <Button size="xs" variant="danger" onClick={() => resolve(r.id)}>Take Action</Button>
                    <Button size="xs" variant="ghost" onClick={() => dismiss(r.id)}>Dismiss</Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </AdminShell>
  )
}
