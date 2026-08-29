import { useState } from 'react'
import { Button, Input, Avatar } from './shell'
import type { NavigateFn } from './shell'

// ─── Landing ─────────────────────────────────────────────────────────────────

export function LandingPage({ navigate }: { navigate: NavigateFn }) {
  return (
    <div className="min-h-screen bg-canvas">
      {/* Navbar */}
      <header className="bg-primary">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white text-sm font-bold font-display">C</div>
            <span className="font-display text-white text-xl">CampusHub</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-white/70 text-sm">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <a href="#features" className="hover:text-white transition-colors">About</a>
            <a href="#events" className="hover:text-white transition-colors">Events</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('login')} className="text-white/80 hover:text-white text-sm px-3 py-1.5 rounded-lg transition-colors">Login</button>
            <button onClick={() => navigate('student-register')} className="bg-accent text-white text-sm px-4 py-1.5 rounded-lg font-medium hover:bg-accent-light transition-colors">Register</button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-primary text-white pb-20 pt-16">
        <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/40 text-accent text-xs font-medium mb-6">
              ✦ Premier University · Official Platform
            </div>
            <h1 className="font-display text-5xl lg:text-6xl leading-tight mb-5">
              Connect. Learn.<br />Grow. <span className="text-accent">Together.</span>
            </h1>
            <p className="text-white/70 text-lg max-w-xl mb-8 leading-relaxed">
              One digital community for Premier University students, alumni, and academic networking — batches, notes, events, and career opportunities, all in one place.
            </p>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <button onClick={() => navigate('student-register')} className="px-6 py-3 bg-accent text-white rounded-xl font-medium hover:bg-accent-light transition-all shadow-lg">Get Started</button>
              <button onClick={() => navigate('login')} className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-xl font-medium hover:bg-white/20 transition-all">Explore Community</button>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-3 max-w-sm w-full">
            {[
              { label: '5,000+', sub: 'Active Students' },
              { label: '1,200+', sub: 'Alumni Members' },
              { label: '50+', sub: 'Communities' },
              { label: '100+', sub: 'Resources' },
            ].map(s => (
              <div key={s.label} className="bg-white/10 rounded-2xl p-5 text-center border border-white/10">
                <div className="font-display text-3xl text-accent">{s.label}</div>
                <div className="text-white/70 text-sm mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl text-ink mb-2">Everything Your University Community Needs</h2>
            <p className="text-muted max-w-xl mx-auto">A complete platform connecting students, alumni, and administration in one cohesive experience.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: '◈', title: 'Communities', desc: 'Batch and section communities for focused discussion and collaboration.', color: 'bg-primary-pale text-primary' },
              { icon: '◉', title: 'Notes & Resources', desc: 'Academic notes, assignments, and study materials shared by students and alumni.', color: 'bg-secondary-pale text-secondary' },
              { icon: '◎', title: 'Alumni Network', desc: 'Connect with Premier University graduates across industries and companies.', color: 'bg-accent-pale text-accent' },
              { icon: '◈', title: 'Jobs & Internships', desc: 'Curated opportunities posted by alumni exclusively for Premier University students.', color: 'bg-primary-pale text-primary' },
            ].map(f => (
              <div key={f.title} className="bg-surface rounded-2xl p-6 border border-edge shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center text-xl mb-4`}>{f.icon}</div>
                <h3 className="font-semibold text-ink mb-2">{f.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements preview */}
      <section className="py-10 bg-surface border-y border-edge">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl text-ink">Latest Announcements</h2>
            <button onClick={() => navigate('login')} className="text-sm text-primary font-medium hover:underline">View all →</button>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: 'Final Examination Schedule — Fall 2026', category: 'Academic', date: 'Aug 27', priority: 'high' },
              { title: 'Merit Scholarship Applications Open', category: 'Academic', date: 'Aug 18', priority: 'high' },
              { title: 'Alumni Meet 2026 — Registration Open', category: 'Event', date: 'Aug 23', priority: 'medium' },
            ].map(a => (
              <div key={a.title} className="p-4 rounded-xl border border-edge hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${a.priority==='high' ? 'bg-red-50 text-danger' : 'bg-accent-pale text-accent'}`}>{a.category}</span>
                  <span className="text-xs text-muted">{a.date}</span>
                </div>
                <p className="text-sm font-medium text-ink">{a.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events preview */}
      <section id="events" className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl text-ink">Upcoming Events</h2>
            <button onClick={() => navigate('login')} className="text-sm text-primary font-medium hover:underline">View all →</button>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: 'Career Fair 2026', date: 'Sep 15, 2026', category: 'Career', attendees: 342 },
              { title: 'Alumni Networking Night', date: 'Sep 20, 2026', category: 'Networking', attendees: 156 },
              { title: 'HackPremier 2026', date: 'Oct 1, 2026', category: 'Community', attendees: 210 },
            ].map(ev => (
              <div key={ev.title} className="bg-primary rounded-2xl p-5 text-white border border-primary-light">
                <div className="text-accent text-xs font-medium mb-2">{ev.category}</div>
                <h3 className="font-semibold mb-1">{ev.title}</h3>
                <p className="text-white/60 text-sm mb-3">{ev.date}</p>
                <p className="text-white/50 text-xs">{ev.attendees} attending</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white/60 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-accent rounded flex items-center justify-center text-white text-xs font-bold">C</div>
            <span className="font-display text-white text-base">CampusHub</span>
          </div>
          <p className="text-sm">© 2026 Premier University. All rights reserved.</p>
          <div className="flex gap-4 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

// ─── Login ────────────────────────────────────────────────────────────────────

export function LoginPage({ navigate, onLogin }: { navigate: NavigateFn; onLogin: (role: 'student'|'alumni'|'admin') => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [remember, setRemember] = useState(false)

  const presets = [
    { label: 'Login as Student', email: 'arif.rahman@premier.edu', role: 'student' as const },
    { label: 'Login as Alumni', email: 'tanvir.ahmed@orbitlabs.io', role: 'alumni' as const },
    { label: 'Login as Admin', email: 'admin@premier.edu', role: 'admin' as const },
  ]

  function handleLogin(role: 'student'|'alumni'|'admin') { onLogin(role) }

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex w-96 flex-shrink-0 bg-primary flex-col justify-between p-10">
        <div>
          <div className="flex items-center gap-2 mb-12">
            <div className="w-9 h-9 bg-accent rounded-lg flex items-center justify-center text-white font-bold font-display">C</div>
            <span className="font-display text-white text-xl">CampusHub</span>
          </div>
          <h2 className="font-display text-3xl text-white mb-3">Welcome back to Premier University</h2>
          <p className="text-white/60 text-sm leading-relaxed">Your gateway to campus communities, academic resources, alumni connections, and career opportunities.</p>
        </div>
        <div className="space-y-3">
          {[{name:'Arif Rahman',role:'CSE 2023'},{name:'Tanvir Ahmed',role:'Orbit Labs'},{name:'Nusrat Jahan',role:'TechVentures'}].map(u=>(
            <div key={u.name} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
              <Avatar name={u.name} size="sm" />
              <div><p className="text-white text-sm font-medium">{u.name}</p><p className="text-white/50 text-xs">{u.role}</p></div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-canvas">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white font-bold font-display">C</div>
            <span className="font-display text-primary text-xl">CampusHub</span>
          </div>
          <h1 className="font-display text-2xl text-ink mb-1">Welcome back</h1>
          <p className="text-muted text-sm mb-6">Sign in to your Premier University account</p>

          <div className="bg-surface rounded-2xl border border-edge shadow-sm p-6 flex flex-col gap-4">
            <Input label="Email address" value={email} onChange={setEmail} placeholder="you@premier.edu" type="email" />
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-ink-light">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 pr-10 rounded-lg border border-edge bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                <button onClick={() => setShowPass(!showPass)} type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted hover:text-ink">
                  {showPass ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-muted cursor-pointer">
                <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="rounded" />
                Remember me
              </label>
              <button onClick={() => navigate('forgot-password')} className="text-sm text-primary hover:underline">Forgot password?</button>
            </div>

            {/* Demo login buttons */}
            <div className="border-t border-edge pt-3">
              <p className="text-xs text-muted mb-2 text-center">Quick demo login:</p>
              <div className="flex flex-col gap-2">
                {presets.map(p => (
                  <button key={p.role} onClick={() => handleLogin(p.role)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm font-medium border border-edge text-ink hover:bg-primary hover:text-white hover:border-primary transition-all">
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <div className="flex gap-2">
              <button onClick={() => navigate('student-register')} className="flex-1 py-2 rounded-xl border border-edge text-sm text-muted hover:border-primary hover:text-primary transition-colors">Register as Student</button>
              <button onClick={() => navigate('alumni-register')} className="flex-1 py-2 rounded-xl border border-edge text-sm text-muted hover:border-primary hover:text-primary transition-colors">Register as Alumni</button>
            </div>
            <button onClick={() => navigate('landing')} className="py-2 text-sm text-muted hover:text-ink transition-colors">← Back to Home</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Student Registration ─────────────────────────────────────────────────────

export function StudentRegisterPage({ navigate }: { navigate: NavigateFn }) {
  const [form, setForm] = useState({ name:'', email:'', password:'', confirm:'', department:'CSE', batch:'2023', section:'A' })
  const set = (k: string) => (v: string) => setForm(f => ({...f,[k]:v}))
  return (
    <div className="min-h-screen bg-canvas flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => navigate('landing')}>
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white text-sm font-bold">C</div>
          <span className="font-display text-primary text-xl">CampusHub</span>
        </div>
        <div className="bg-surface rounded-2xl border border-edge shadow-sm p-8">
          <h1 className="font-display text-2xl text-ink mb-1">Student Registration</h1>
          <p className="text-muted text-sm mb-6">Create your Premier University student account</p>
          <div className="flex flex-col gap-4">
            <Input label="Full Name" value={form.name} onChange={set('name')} placeholder="Arif Rahman" required />
            <Input label="University Email" value={form.email} onChange={set('email')} placeholder="arif@premier.edu" type="email" required />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Password" value={form.password} onChange={set('password')} type="password" required />
              <Input label="Confirm Password" value={form.confirm} onChange={set('confirm')} type="password" required />
            </div>
            <div>
              <p className="text-sm font-medium text-ink-light mb-1">Profile Photo <span className="text-muted font-normal">(optional)</span></p>
              <div className="flex items-center gap-3 p-3 rounded-lg border border-dashed border-edge hover:border-primary/40 transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-canvas-dark flex items-center justify-center text-muted text-xl">👤</div>
                <p className="text-sm text-muted">Upload photo</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-ink-light">Department</label>
                <select value={form.department} onChange={e => set('department')(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-edge text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                  <option>CSE</option><option>EEE</option><option>BBA</option><option>ENG</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-ink-light">Batch / Year</label>
                <select value={form.batch} onChange={e => set('batch')(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-edge text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                  {['2026','2025','2024','2023','2022','2021'].map(b=><option key={b}>{b}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-ink-light">Section</label>
                <select value={form.section} onChange={e => set('section')(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-edge text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                  {['A','B','C','D'].map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <Button fullWidth onClick={() => navigate('login')} className="mt-2">Create Student Account</Button>
            <p className="text-center text-sm text-muted">Already have an account? <button onClick={() => navigate('login')} className="text-primary hover:underline">Sign in</button></p>
          </div>
        </div>
        <button onClick={() => navigate('landing')} className="mt-4 text-sm text-muted hover:text-ink w-full text-center transition-colors">← Back to Home</button>
      </div>
    </div>
  )
}

// ─── Alumni Registration ──────────────────────────────────────────────────────

export function AlumniRegisterPage({ navigate }: { navigate: NavigateFn }) {
  const [form, setForm] = useState({ name:'', email:'', password:'', confirm:'', department:'CSE', gradYear:'2023', batch:'2019', company:'', jobTitle:'' })
  const set = (k: string) => (v: string) => setForm(f => ({...f,[k]:v}))
  return (
    <div className="min-h-screen bg-canvas flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => navigate('landing')}>
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white text-sm font-bold">C</div>
          <span className="font-display text-primary text-xl">CampusHub</span>
        </div>
        <div className="bg-surface rounded-2xl border border-edge shadow-sm p-8">
          <h1 className="font-display text-2xl text-ink mb-1">Alumni Registration</h1>
          <p className="text-muted text-sm mb-6">Join the Premier University alumni network</p>
          <div className="flex flex-col gap-4">
            <Input label="Full Name" value={form.name} onChange={set('name')} placeholder="Tanvir Ahmed" required />
            <Input label="Email" value={form.email} onChange={set('email')} placeholder="tanvir@company.com" type="email" required />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Password" value={form.password} onChange={set('password')} type="password" required />
              <Input label="Confirm Password" value={form.confirm} onChange={set('confirm')} type="password" required />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-ink-light">Department</label>
                <select value={form.department} onChange={e => set('department')(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-edge text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                  <option>CSE</option><option>EEE</option><option>BBA</option><option>ENG</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-ink-light">Grad. Year</label>
                <select value={form.gradYear} onChange={e => set('gradYear')(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-edge text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                  {['2026','2025','2024','2023','2022','2021','2020','2019','2018','2017','2016'].map(y=><option key={y}>{y}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-ink-light">Batch</label>
                <select value={form.batch} onChange={e => set('batch')(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-edge text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                  {['2022','2021','2020','2019','2018','2017','2016','2015'].map(b=><option key={b}>{b}</option>)}
                </select>
              </div>
            </div>
            <Input label="Current Company" value={form.company} onChange={set('company')} placeholder="Orbit Labs" />
            <Input label="Job Title" value={form.jobTitle} onChange={set('jobTitle')} placeholder="Software Engineer" />
            <Button fullWidth onClick={() => navigate('login')} className="mt-2">Create Alumni Account</Button>
            <p className="text-center text-sm text-muted">Already have an account? <button onClick={() => navigate('login')} className="text-primary hover:underline">Sign in</button></p>
          </div>
        </div>
        <button onClick={() => navigate('landing')} className="mt-4 text-sm text-muted hover:text-ink w-full text-center transition-colors">← Back to Home</button>
      </div>
    </div>
  )
}

// ─── Forgot Password ──────────────────────────────────────────────────────────

export function ForgotPasswordPage({ navigate }: { navigate: NavigateFn }) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  return (
    <div className="min-h-screen bg-canvas flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 mb-8 justify-center cursor-pointer" onClick={() => navigate('landing')}>
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">C</div>
          <span className="font-display text-primary text-xl">CampusHub</span>
        </div>
        <div className="bg-surface rounded-2xl border border-edge shadow-sm p-8">
          {sent ? (
            <div className="text-center">
              <div className="text-5xl mb-4">📨</div>
              <h2 className="font-display text-xl text-ink mb-2">Check your email</h2>
              <p className="text-sm text-muted mb-6">We sent a password reset link to <strong>{email}</strong></p>
              <Button fullWidth onClick={() => navigate('reset-password')}>Open Reset Link →</Button>
            </div>
          ) : (
            <>
              <h1 className="font-display text-2xl text-ink mb-1">Forgot Password?</h1>
              <p className="text-muted text-sm mb-6">Enter your email and we will send you a reset link.</p>
              <div className="flex flex-col gap-4">
                <Input label="Email address" value={email} onChange={setEmail} placeholder="you@premier.edu" type="email" />
                <Button fullWidth onClick={() => setSent(true)}>Send Reset Link</Button>
                <button onClick={() => navigate('login')} className="text-sm text-muted hover:text-ink text-center transition-colors">← Back to Login</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Reset Password ───────────────────────────────────────────────────────────

export function ResetPasswordPage({ navigate }: { navigate: NavigateFn }) {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3
  const strengthLabels = ['','Weak','Fair','Strong']
  const strengthColors = ['','bg-danger','bg-warning','bg-success']
  return (
    <div className="min-h-screen bg-canvas flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 mb-8 justify-center cursor-pointer" onClick={() => navigate('landing')}>
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">C</div>
          <span className="font-display text-primary text-xl">CampusHub</span>
        </div>
        <div className="bg-surface rounded-2xl border border-edge shadow-sm p-8">
          <h1 className="font-display text-2xl text-ink mb-1">Reset Password</h1>
          <p className="text-muted text-sm mb-6">Create a new secure password for your account.</p>
          <div className="flex flex-col gap-4">
            <div>
              <Input label="New Password" value={password} onChange={setPassword} type="password" placeholder="Enter new password" />
              {password.length > 0 && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1,2,3].map(i => <div key={i} className={`h-1 flex-1 rounded-full ${i<=strength ? strengthColors[strength] : 'bg-edge'} transition-colors`} />)}
                  </div>
                  <p className="text-xs text-muted">Password strength: <span className={strength===1?'text-danger':strength===2?'text-warning':'text-success'}>{strengthLabels[strength]}</span></p>
                </div>
              )}
            </div>
            <Input label="Confirm New Password" value={confirm} onChange={setConfirm} type="password" placeholder="Confirm your password" />
            <Button fullWidth onClick={() => navigate('reset-success')} disabled={!password || password !== confirm}>Reset Password</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Reset Success ────────────────────────────────────────────────────────────

export function ResetSuccessPage({ navigate }: { navigate: NavigateFn }) {
  return (
    <div className="min-h-screen bg-canvas flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="font-display text-2xl text-ink mb-2">Password Reset Successfully</h1>
        <p className="text-muted text-sm mb-8">Your password has been reset successfully. You can now log in with your new password.</p>
        <Button fullWidth onClick={() => navigate('login')}>Go to Login</Button>
      </div>
    </div>
  )
}
