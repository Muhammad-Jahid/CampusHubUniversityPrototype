import { useState, useRef, useEffect, type ReactNode } from 'react'

export type ViewName =
  | 'landing' | 'login' | 'student-register' | 'alumni-register'
  | 'forgot-password' | 'reset-password' | 'reset-success'
  | 'student-dashboard' | 'community' | 'discussion' | 'resources'
  | 'resource-detail' | 'alumni-directory' | 'alumni-profile'
  | 'events' | 'event-detail' | 'announcements' | 'jobs' | 'job-detail'
  | 'notifications' | 'student-profile' | 'search-results'
  | 'alumni-dashboard' | 'alumni-community' | 'post-job' | 'my-job-postings' | 'alumni-profile-self'
  | 'admin-dashboard' | 'admin-users' | 'admin-user-detail' | 'admin-communities'
  | 'admin-moderation' | 'admin-announcements' | 'admin-events' | 'admin-jobs-mod' | 'admin-reports'

export type UserRole = 'student' | 'alumni' | 'admin'
export type NavigateFn = (view: ViewName, params?: any) => void

export interface SharedProps {
  navigate: NavigateFn
  params?: any
  userRole?: UserRole
  currentUser?: any
  onLogout?: () => void
}

// ─── Avatar ─────────────────────────────────────────────────────────────────

const avatarColors = ['#1B2B4B','#4A7B6F','#C9994A','#7C5C8A','#3B7DD8','#C0504D','#1F7A8C']
function nameToColor(name: string) {
  let h = 0; for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h)
  return avatarColors[Math.abs(h) % avatarColors.length]
}
function initials(name: string) {
  return name.split(' ').map(p => p[0]).join('').slice(0,2).toUpperCase()
}

interface AvatarProps { name: string; size?: 'xs'|'sm'|'md'|'lg'|'xl'; className?: string }
export function Avatar({ name, size = 'md', className = '' }: AvatarProps) {
  const sz = { xs:'w-6 h-6 text-xs', sm:'w-8 h-8 text-sm', md:'w-10 h-10 text-sm', lg:'w-12 h-12 text-base', xl:'w-16 h-16 text-xl' }[size]
  return (
    <div className={`${sz} rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 ${className}`}
      style={{ background: nameToColor(name) }}>
      {initials(name)}
    </div>
  )
}

// ─── Badge ───────────────────────────────────────────────────────────────────

const badgeStyles: Record<string, string> = {
  navy:    'bg-primary-pale text-primary border-primary/20',
  green:   'bg-secondary-pale text-secondary border-secondary/20',
  gold:    'bg-accent-pale text-accent border-accent/20',
  gray:    'bg-canvas-dark text-muted border-edge',
  red:     'bg-red-50 text-danger border-red-200',
  blue:    'bg-blue-50 text-blue-700 border-blue-200',
  success: 'bg-green-50 text-success border-green-200',
}
interface BadgeProps { variant?: string; children: ReactNode; className?: string }
export function Badge({ variant = 'gray', children, className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${badgeStyles[variant] ?? badgeStyles.gray} ${className}`}>
      {children}
    </span>
  )
}

// ─── Button ──────────────────────────────────────────────────────────────────

interface ButtonProps {
  variant?: 'primary'|'secondary'|'accent'|'ghost'|'danger'|'outline'
  size?: 'xs'|'sm'|'md'|'lg'
  children: ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
  type?: 'button'|'submit'
  fullWidth?: boolean
}
export function Button({ variant='primary', size='md', children, onClick, className='', disabled=false, type='button', fullWidth=false }: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-150 cursor-pointer select-none'
  const sizes = { xs:'px-2 py-1 text-xs', sm:'px-3 py-1.5 text-sm', md:'px-4 py-2 text-sm', lg:'px-6 py-2.5 text-base' }
  const variants: Record<string, string> = {
    primary: 'bg-primary text-white hover:bg-primary-dark active:scale-95 shadow-sm',
    secondary: 'bg-secondary text-white hover:bg-secondary-light active:scale-95 shadow-sm',
    accent: 'bg-accent text-white hover:bg-accent-light active:scale-95 shadow-sm',
    ghost: 'bg-transparent text-ink hover:bg-canvas-dark',
    danger: 'bg-danger text-white hover:bg-red-700 active:scale-95',
    outline: 'bg-transparent border border-edge text-ink hover:bg-canvas-dark',
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      className={`${base} ${sizes[size]} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      {children}
    </button>
  )
}

// ─── Input / Textarea / Select ───────────────────────────────────────────────

interface InputProps {
  label?: string; value: string; onChange: (v: string) => void
  placeholder?: string; type?: string; required?: boolean; className?: string
}
export function Input({ label, value, onChange, placeholder, type='text', required, className='' }: InputProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label className="text-sm font-medium text-ink-light">{label}{required && <span className="text-danger ml-0.5">*</span>}</label>}
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg border border-edge bg-surface text-sm text-ink placeholder-muted-light focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors" />
    </div>
  )
}
interface TextareaProps { label?: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number; className?: string }
export function Textarea({ label, value, onChange, placeholder, rows=3, className='' }: TextareaProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label className="text-sm font-medium text-ink-light">{label}</label>}
      <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows}
        className="w-full px-3 py-2 rounded-lg border border-edge bg-surface text-sm text-ink placeholder-muted-light focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none" />
    </div>
  )
}
interface SelectProps { label?: string; value: string; onChange: (v: string) => void; options: {value:string;label:string}[]; className?: string }
export function Select({ label, value, onChange, options, className='' }: SelectProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label className="text-sm font-medium text-ink-light">{label}</label>}
      <select value={value} onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-edge bg-surface text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors">
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
}

// ─── Tabs ────────────────────────────────────────────────────────────────────

interface Tab { id: string; label: string; count?: number }
interface TabsProps { tabs: Tab[]; active: string; onChange: (id: string) => void; className?: string }
export function Tabs({ tabs, active, onChange, className='' }: TabsProps) {
  return (
    <div className={`flex gap-0 border-b border-edge ${className}`}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${active === t.id ? 'border-primary text-primary' : 'border-transparent text-muted hover:text-ink'}`}>
          {t.label}
          {t.count !== undefined && <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs ${active === t.id ? 'bg-primary text-white' : 'bg-canvas-dark text-muted'}`}>{t.count}</span>}
        </button>
      ))}
    </div>
  )
}

// ─── Card ────────────────────────────────────────────────────────────────────

export function Card({ children, className='' }: { children: ReactNode; className?: string }) {
  return <div className={`bg-surface rounded-xl border border-edge shadow-sm ${className}`}>{children}</div>
}

// ─── Modal ───────────────────────────────────────────────────────────────────

interface ModalProps { isOpen: boolean; onClose: () => void; title: string; children: ReactNode; size?: 'sm'|'md'|'lg' }
export function Modal({ isOpen, onClose, title, children, size='md' }: ModalProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])
  if (!isOpen) return null
  const widths = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl' }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative bg-surface rounded-2xl shadow-2xl w-full ${widths[size]} max-h-[90vh] overflow-y-auto`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-edge">
          <h3 className="font-semibold text-ink">{title}</h3>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-canvas-dark text-muted transition-colors text-lg leading-none">×</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

// ─── Toast ───────────────────────────────────────────────────────────────────

export function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t) }, [onClose])
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-ink text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-fade-in text-sm max-w-xs">
      <span className="text-success text-base">✓</span>
      <span>{message}</span>
    </div>
  )
}

// ─── EmptyState ──────────────────────────────────────────────────────────────

export function EmptyState({ icon, title, subtitle }: { icon: string; title: string; subtitle?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-5xl mb-3 opacity-40">{icon}</div>
      <p className="font-medium text-ink">{title}</p>
      {subtitle && <p className="text-sm text-muted mt-1 max-w-xs">{subtitle}</p>}
    </div>
  )
}

// ─── ReportModal ─────────────────────────────────────────────────────────────

export function ReportModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [reason, setReason] = useState('')
  const [details, setDetails] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const reasons = ['Spam', 'Inappropriate Content', 'Harassment', 'Misinformation', 'Other']
  function submit() { if (!reason) return; setSubmitted(true) }
  function handleClose() { setReason(''); setDetails(''); setSubmitted(false); onClose() }
  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Report Content" size="sm">
      {submitted ? (
        <div className="text-center py-4">
          <div className="text-4xl mb-3">✅</div>
          <p className="font-semibold text-ink">Report submitted successfully.</p>
          <p className="text-sm text-muted mt-1">Our moderation team will review it within 24 hours.</p>
          <Button onClick={handleClose} className="mt-4">Close</Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted">Select a reason for your report:</p>
          <div className="flex flex-col gap-2">
            {reasons.map(r => (
              <label key={r} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${reason===r ? 'border-primary bg-primary-pale' : 'border-edge hover:bg-canvas'}`}>
                <input type="radio" name="reason" value={r} checked={reason===r} onChange={()=>setReason(r)} className="text-primary" />
                <span className="text-sm text-ink">{r}</span>
              </label>
            ))}
          </div>
          <Textarea label="Additional details (optional)" value={details} onChange={setDetails} placeholder="Describe the issue..." rows={3} />
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={handleClose} fullWidth>Cancel</Button>
            <Button variant="danger" onClick={submit} disabled={!reason} fullWidth>Submit Report</Button>
          </div>
        </div>
      )}
    </Modal>
  )
}

// ─── CreatePostModal ─────────────────────────────────────────────────────────

export function CreatePostModal({ isOpen, onClose, onPost }: { isOpen: boolean; onClose: () => void; onPost?: () => void }) {
  const [type, setType] = useState('Discussion')
  const [content, setContent] = useState('')
  const [community, setCommunity] = useState('CSE Batch 2023 — Section A')
  function submit() { if (!content.trim()) return; onPost?.(); onClose(); setContent(''); setType('Discussion') }
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Post" size="md">
      <div className="flex flex-col gap-4">
        <Select label="Community" value={community} onChange={setCommunity}
          options={[{value:'CSE Batch 2023 — Section A',label:'CSE Batch 2023 — Section A'},{value:'Alumni Network',label:'Alumni Network'},{value:'Premier Tech Society',label:'Premier Tech Society'}]} />
        <div>
          <p className="text-sm font-medium text-ink-light mb-2">Post Type</p>
          <div className="flex gap-2">
            {['Discussion','Question','Resource'].map(t => (
              <button key={t} onClick={()=>setType(t)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${type===t ? 'bg-primary text-white border-primary' : 'border-edge text-muted hover:border-primary/40'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <Textarea label="What would you like to share?" value={content} onChange={setContent} placeholder="Write your post here..." rows={5} />
        <div className="flex items-center gap-2 text-sm text-muted border border-dashed border-edge rounded-lg p-3 cursor-pointer hover:border-primary/40 transition-colors">
          <span>📎</span> <span>Attach a file (optional)</span>
        </div>
        <div className="flex gap-3 pt-1">
          <Button variant="outline" onClick={onClose} fullWidth>Cancel</Button>
          <Button onClick={submit} disabled={!content.trim()} fullWidth>Post to Community</Button>
        </div>
      </div>
    </Modal>
  )
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────

interface NavItem { label: string; icon: string; view: ViewName }

const studentNavItems: NavItem[] = [
  { label: 'Dashboard', icon: '⊞', view: 'student-dashboard' },
  { label: 'My Community', icon: '◈', view: 'community' },
  { label: 'Notes & Resources', icon: '◉', view: 'resources' },
  { label: 'Alumni Directory', icon: '◎', view: 'alumni-directory' },
  { label: 'Events', icon: '◷', view: 'events' },
  { label: 'Announcements', icon: '◬', view: 'announcements' },
  { label: 'Jobs & Internships', icon: '◈', view: 'jobs' },
]

const alumniNavItems: NavItem[] = [
  { label: 'Dashboard', icon: '⊞', view: 'alumni-dashboard' },
  { label: 'My Community', icon: '◈', view: 'alumni-community' },
  { label: 'Alumni Directory', icon: '◎', view: 'alumni-directory' },
  { label: 'Events', icon: '◷', view: 'events' },
  { label: 'Announcements', icon: '◬', view: 'announcements' },
  { label: 'Jobs & Internships', icon: '◈', view: 'jobs' },
  { label: 'My Job Postings', icon: '◉', view: 'my-job-postings' },
]

const adminNavItems: NavItem[] = [
  { label: 'Dashboard', icon: '⊞', view: 'admin-dashboard' },
  { label: 'Users', icon: '◎', view: 'admin-users' },
  { label: 'Communities', icon: '◈', view: 'admin-communities' },
  { label: 'Content Moderation', icon: '◉', view: 'admin-moderation' },
  { label: 'Announcements', icon: '◬', view: 'admin-announcements' },
  { label: 'Events', icon: '◷', view: 'admin-events' },
  { label: 'Jobs', icon: '◈', view: 'admin-jobs-mod' },
  { label: 'Reports', icon: '⚠', view: 'admin-reports' },
]

interface SidebarProps { role: UserRole; currentView: string; navigate: NavigateFn; isOpen: boolean; onClose: () => void }
function Sidebar({ role, currentView, navigate, isOpen, onClose }: SidebarProps) {
  const items = role === 'admin' ? adminNavItems : role === 'alumni' ? alumniNavItems : studentNavItems
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="lg:hidden fixed inset-0 bg-black/50 z-30" onClick={onClose} />}
      <aside className={`fixed top-0 left-0 h-full w-60 bg-primary z-40 flex flex-col transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white text-sm font-bold font-display">C</div>
            <div>
              <div className="font-display text-white text-lg leading-tight">CampusHub</div>
              <div className="text-white/50 text-xs font-code">Premier University</div>
            </div>
          </div>
        </div>
        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          {items.map(item => (
            <button key={item.view} onClick={() => { navigate(item.view); onClose() }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 mb-0.5 text-left
                ${currentView === item.view
                  ? 'bg-white/15 text-white font-medium'
                  : 'text-white/60 hover:bg-white/8 hover:text-white'}`}>
              <span className="text-base opacity-70">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        {/* Footer */}
        <div className="px-5 py-4 border-t border-white/10">
          <div className="text-white/30 text-xs font-code">v1.0.0 · Demo Build</div>
        </div>
      </aside>
    </>
  )
}

// ─── Navbar ──────────────────────────────────────────────────────────────────

interface NavbarProps { navigate: NavigateFn; currentUser: any; onLogout: () => void; onMenu: () => void; currentView: string }
function Navbar({ navigate, currentUser, onLogout, onMenu, currentView }: NavbarProps) {
  const [searchQ, setSearchQ] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [showNotifDot] = useState(true)
  const dropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) { if (dropRef.current && !dropRef.current.contains(e.target as Node)) setShowDropdown(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (searchQ.trim()) { navigate('search-results', { query: searchQ }); setSearchQ('') }
  }

  const profileView = currentUser?.role === 'alumni' ? 'alumni-profile-self' : currentUser?.role === 'admin' ? 'admin-dashboard' : 'student-profile'

  return (
    <header className="fixed top-0 left-0 lg:left-60 right-0 h-14 bg-surface border-b border-edge z-20 flex items-center px-4 gap-4">
      {/* Mobile menu button */}
      <button onClick={onMenu} className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-canvas-dark text-muted">
        <span className="text-lg">☰</span>
      </button>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex-1 max-w-md">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm">🔍</span>
          <input value={searchQ} onChange={e => setSearchQ(e.target.value)}
            placeholder="Search people, posts, resources..." type="search"
            className="w-full pl-8 pr-4 py-1.5 text-sm bg-canvas rounded-lg border border-edge focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
        </div>
      </form>

      <div className="flex items-center gap-2 ml-auto">
        {/* Notifications */}
        <button onClick={() => navigate('notifications')}
          className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-canvas-dark transition-colors">
          <span className="text-lg text-muted">🔔</span>
          {showNotifDot && currentView !== 'notifications' &&
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger" />}
        </button>

        {/* Profile dropdown */}
        <div className="relative" ref={dropRef}>
          <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Avatar name={currentUser?.name || 'User'} size="sm" />
            <div className="hidden sm:block text-left">
              <div className="text-sm font-medium text-ink leading-tight">{currentUser?.name}</div>
              <div className="text-xs text-muted capitalize">{currentUser?.role}</div>
            </div>
          </button>
          {showDropdown && (
            <div className="absolute right-0 top-12 w-48 bg-surface border border-edge rounded-xl shadow-xl overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-edge">
                <div className="font-medium text-sm text-ink">{currentUser?.name}</div>
                <div className="text-xs text-muted">{currentUser?.email}</div>
              </div>
              <div className="py-1">
                <button onClick={() => { navigate(profileView as ViewName); setShowDropdown(false) }}
                  className="w-full text-left px-4 py-2 text-sm text-ink hover:bg-canvas-dark transition-colors">My Profile</button>
                <button onClick={() => { onLogout(); setShowDropdown(false) }}
                  className="w-full text-left px-4 py-2 text-sm text-danger hover:bg-red-50 transition-colors">Logout</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

// ─── AppShell ─────────────────────────────────────────────────────────────────

interface AppShellProps extends SharedProps { children: ReactNode }
export function AppShell({ children, navigate, userRole, currentUser, onLogout, params }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const currentView = params?._view || ''
  return (
    <div className="flex h-full">
      <Sidebar role={userRole!} currentView={currentView} navigate={navigate} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 lg:ml-60">
        <Navbar navigate={navigate} currentUser={currentUser} onLogout={onLogout!} onMenu={() => setSidebarOpen(true)} currentView={currentView} />
        <main className="flex-1 overflow-y-auto pt-14 bg-canvas">
          {children}
        </main>
      </div>
    </div>
  )
}

// ─── Page Header ─────────────────────────────────────────────────────────────

export function PageHeader({ title, subtitle, actions, breadcrumb }: {
  title: string; subtitle?: string; actions?: ReactNode; breadcrumb?: string
}) {
  return (
    <div className="px-6 lg:px-8 pt-6 pb-4">
      {breadcrumb && <p className="text-xs text-muted mb-1 font-code">{breadcrumb}</p>}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-ink">{title}</h1>
          {subtitle && <p className="text-sm text-muted mt-0.5">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
      </div>
    </div>
  )
}

// ─── StatCard ─────────────────────────────────────────────────────────────────

export function StatCard({ label, value, icon, sub, color='navy' }: {
  label: string; value: string|number; icon: string; sub?: string; color?: string
}) {
  const colors: Record<string, string> = {
    navy: 'text-primary bg-primary-pale',
    green: 'text-secondary bg-secondary-pale',
    gold: 'text-accent bg-accent-pale',
    red: 'text-danger bg-red-50',
  }
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted font-medium uppercase tracking-wide">{label}</p>
          <p className="text-2xl font-bold text-ink mt-1">{value}</p>
          {sub && <p className="text-xs text-muted mt-0.5">{sub}</p>}
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${colors[color]}`}>{icon}</div>
      </div>
    </Card>
  )
}
