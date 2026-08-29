import { useState } from 'react'
import { AppShell, PageHeader, Card, StatCard, Avatar, Badge, Button, Tabs, Input, Select, Textarea, ReportModal, CreatePostModal, Toast } from './shell'
import { DEMO_ALUMNI, ALUMNI_COMMUNITY_POSTS, EVENTS, ANNOUNCEMENTS, JOBS, ALUMNI_LIST } from './demo'
import type { SharedProps } from './shell'

// ─── Alumni Dashboard ─────────────────────────────────────────────────────────

export function AlumniDashboard(props: SharedProps) {
  const { navigate, params } = props
  const [showCreate, setShowCreate] = useState(false)
  const [toast, setToast] = useState('')

  return (
    <AppShell {...props} params={{...params, _view:'alumni-dashboard'}}>
      <div className="px-6 lg:px-8 py-6 space-y-6">
        {/* Welcome banner */}
        <div className="bg-primary rounded-2xl p-6 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar name={DEMO_ALUMNI.name} size="lg" />
            <div>
              <p className="text-white/60 text-sm">Welcome back 👋</p>
              <h2 className="font-display text-2xl">{DEMO_ALUMNI.name}</h2>
              <p className="text-accent text-sm font-code mt-0.5">{DEMO_ALUMNI.jobTitle} · {DEMO_ALUMNI.company}</p>
              <p className="text-white/50 text-xs mt-0.5">{DEMO_ALUMNI.department} · Class of {DEMO_ALUMNI.graduationYear}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="accent" onClick={() => setShowCreate(true)}>+ Post in Community</Button>
            <Button variant="outline" onClick={() => navigate('post-job')}
              className="border-white/30 text-white hover:bg-white/10">Post a Job</Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Connections" value={24} icon="◎" color="navy" />
          <StatCard label="Jobs Posted" value={2} icon="◈" color="green" />
          <StatCard label="Community Posts" value={8} icon="◉" color="gold" />
          <StatCard label="Events Attended" value={5} icon="◷" color="navy" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Community feed */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-ink">Alumni Community</h3>
              <button onClick={() => navigate('alumni-community')} className="text-sm text-primary hover:underline">View all →</button>
            </div>
            {ALUMNI_COMMUNITY_POSTS.slice(0,3).map(post => (
              <Card key={post.id} className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar name={post.author} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-ink">{post.author}</p>
                    <p className="text-xs text-muted mb-2">{post.authorRole}</p>
                    <p className="text-sm text-muted line-clamp-3">{post.content}</p>
                    <div className="flex gap-3 mt-2 text-xs text-muted">
                      <span>↑ {post.upvotes}</span><span>💬 {post.comments}</span><span>{post.date}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-sm text-ink">Upcoming Events</h4>
                <button onClick={() => navigate('events')} className="text-xs text-primary hover:underline">See all</button>
              </div>
              {EVENTS.filter(e=>e.status==='upcoming').slice(0,3).map(ev => (
                <div key={ev.id} className="py-2 border-b border-edge last:border-0 cursor-pointer hover:bg-canvas-dark -mx-4 px-4 transition-colors"
                  onClick={() => navigate('event-detail', {eventId: ev.id})}>
                  <p className="text-sm text-ink font-medium line-clamp-1">{ev.title}</p>
                  <p className="text-xs text-muted">{ev.date}</p>
                </div>
              ))}
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-sm text-ink">Recent Jobs</h4>
                <button onClick={() => navigate('jobs')} className="text-xs text-primary hover:underline">See all</button>
              </div>
              {JOBS.filter(j=>j.approved).slice(0,3).map(j => (
                <div key={j.id} className="py-2 border-b border-edge last:border-0 cursor-pointer hover:bg-canvas-dark -mx-4 px-4 transition-colors"
                  onClick={() => navigate('job-detail', {jobId: j.id})}>
                  <p className="text-sm text-ink font-medium">{j.title}</p>
                  <p className="text-xs text-muted">{j.company}</p>
                </div>
              ))}
            </Card>
            <Card className="p-4">
              <h4 className="font-semibold text-sm text-ink mb-3">Announcements</h4>
              {ANNOUNCEMENTS.slice(0,2).map(a => (
                <div key={a.id} className="py-2 border-b border-edge last:border-0 cursor-pointer hover:bg-canvas-dark -mx-4 px-4 transition-colors"
                  onClick={() => navigate('announcements')}>
                  <p className="text-sm text-ink font-medium line-clamp-1">{a.title}</p>
                  <p className="text-xs text-muted">{a.date}</p>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>
      <CreatePostModal isOpen={showCreate} onClose={() => setShowCreate(false)} onPost={() => setToast('Post shared!')} />
      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </AppShell>
  )
}

// ─── Alumni Community ─────────────────────────────────────────────────────────

export function AlumniCommunityPage(props: SharedProps) {
  const [showCreate, setShowCreate] = useState(false)
  const [showReport, setShowReport] = useState(false)
  const [posts, setPosts] = useState(ALUMNI_COMMUNITY_POSTS)
  const [toast, setToast] = useState('')

  function toggleUpvote(id: string) {
    setPosts(ps => ps.map(p => p.id===id ? {...p, upvoted:!p.upvoted, upvotes:p.upvoted?p.upvotes-1:p.upvotes+1} : p))
  }

  return (
    <AppShell {...props} params={{...(props.params||{}), _view:'alumni-community'}}>
      <div className="bg-primary px-6 lg:px-8 py-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Badge variant="gold" className="mb-2">Alumni Network</Badge>
            <h1 className="font-display text-2xl text-white">Premier University Alumni Network</h1>
            <p className="text-white/60 text-sm mt-1">1,284 alumni members · Global network</p>
          </div>
          <Button variant="accent" onClick={() => setShowCreate(true)}>+ Create Post</Button>
        </div>
        <p className="text-white/60 text-sm mt-3 max-w-2xl">Connect with fellow Premier University graduates. Share career insights, job opportunities, and professional experiences.</p>
      </div>
      <div className="px-6 lg:px-8 py-6 space-y-4 max-w-2xl">
        {posts.map(post => (
          <Card key={post.id} className="p-5">
            <div className="flex items-start gap-3">
              <Avatar name={post.author} size="md" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-semibold text-sm text-ink">{post.author}</span>
                  <Badge variant={post.type==='Question'?'gold':post.type==='Resource'?'green':'navy'}>{post.type}</Badge>
                </div>
                <p className="text-xs text-muted mb-2">{post.authorRole}</p>
                <p className="text-sm text-ink leading-relaxed mb-3">{post.content}</p>
                <div className="flex items-center gap-3">
                  <button onClick={() => toggleUpvote(post.id)}
                    className={`flex items-center gap-1 text-xs px-2 py-1 rounded-lg transition-colors ${post.upvoted ? 'bg-primary-pale text-primary' : 'text-muted hover:bg-canvas-dark'}`}>
                    ↑ {post.upvotes}
                  </button>
                  <span className="text-xs text-muted">💬 {post.comments}</span>
                  <span className="text-xs text-muted ml-auto">{post.date}</span>
                  <button onClick={() => setShowReport(true)} className="text-xs text-muted hover:text-danger transition-colors">⚑ Report</button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <CreatePostModal isOpen={showCreate} onClose={() => setShowCreate(false)} onPost={() => setToast('Post shared to alumni community!')} />
      <ReportModal isOpen={showReport} onClose={() => setShowReport(false)} />
      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </AppShell>
  )
}

// ─── Post Job ─────────────────────────────────────────────────────────────────

export function PostJobPage(props: SharedProps) {
  const { navigate } = props
  const [form, setForm] = useState({ title:'', company: DEMO_ALUMNI.company, type:'Full-time', location:'Dhaka, Bangladesh', description:'', requirements:'', eligibility:'', deadline:'' })
  const set = (k: string) => (v: string) => setForm(f => ({...f,[k]:v}))
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit() { if (!form.title || !form.description) return; setSubmitted(true) }

  if (submitted) return (
    <AppShell {...props} params={{...(props.params||{}), _view:'my-job-postings'}}>
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="font-display text-2xl text-ink mb-2">Job Posted Successfully!</h2>
        <p className="text-muted text-sm mb-6 max-w-sm">Your job posting has been submitted for review. It will be live once approved by the admin team (usually within 24 hours).</p>
        <div className="flex gap-3">
          <Button onClick={() => navigate('my-job-postings')}>Manage My Postings</Button>
          <Button variant="outline" onClick={() => { setSubmitted(false); setForm({title:'',company:DEMO_ALUMNI.company,type:'Full-time',location:'Dhaka, Bangladesh',description:'',requirements:'',eligibility:'',deadline:''}) }}>Post Another Job</Button>
        </div>
      </div>
    </AppShell>
  )

  return (
    <AppShell {...props} params={{...(props.params||{}), _view:'post-job'}}>
      <PageHeader title="Post a Job / Internship" subtitle="Share opportunities exclusively for Premier University students and alumni" />
      <div className="px-6 lg:px-8 pb-8 max-w-2xl">
        <Card className="p-6">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <Input label="Job Title" value={form.title} onChange={set('title')} placeholder="Software Engineer" required />
            <Input label="Company" value={form.company} onChange={set('company')} placeholder="Company name" required />
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <Select label="Job Type" value={form.type} onChange={set('type')}
              options={[{value:'Full-time',label:'Full-time'},{value:'Internship',label:'Internship'},{value:'Part-time',label:'Part-time'},{value:'Contract',label:'Contract'}]} />
            <Input label="Location" value={form.location} onChange={set('location')} placeholder="Dhaka, Bangladesh or Remote" />
          </div>
          <Textarea label="Job Description" value={form.description} onChange={set('description')} placeholder="Describe the role, responsibilities, and what makes it great..." rows={4} className="mb-4" />
          <Textarea label="Requirements" value={form.requirements} onChange={set('requirements')} placeholder="List key skills and qualifications (one per line)" rows={3} className="mb-4" />
          <Input label="Eligibility" value={form.eligibility} onChange={set('eligibility')} placeholder="e.g. CSE graduates, Batch 2022 or earlier" className="mb-4" />
          <Input label="Application Deadline" value={form.deadline} onChange={set('deadline')} type="date" className="mb-6" />
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate('alumni-dashboard')}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={!form.title || !form.description}>Submit for Review</Button>
          </div>
        </Card>
      </div>
    </AppShell>
  )
}

// ─── My Job Postings ──────────────────────────────────────────────────────────

export function ManageJobPostingsPage(props: SharedProps) {
  const { navigate } = props
  const myJobs = JOBS.filter(j => j.postedBy.includes('Tanvir'))
  const [tab, setTab] = useState('active')
  const [toast, setToast] = useState('')

  return (
    <AppShell {...props} params={{...(props.params||{}), _view:'my-job-postings'}}>
      <PageHeader title="My Job Postings"
        actions={<Button onClick={() => navigate('post-job')}>+ Post New Job</Button>} />
      <div className="px-6 lg:px-8 pb-8">
        <Tabs tabs={[{id:'active',label:'Active',count:myJobs.filter(j=>j.approved).length},{id:'closed',label:'Pending / Closed',count:myJobs.filter(j=>!j.approved).length}]}
          active={tab} onChange={setTab} className="mb-6" />

        {tab === 'active' && (
          <div className="space-y-4 max-w-3xl">
            {myJobs.filter(j=>j.approved).length === 0
              ? <div className="text-center py-12 text-muted"><p>No active job postings yet.</p><Button className="mt-4" onClick={() => navigate('post-job')}>Post a Job</Button></div>
              : myJobs.filter(j=>j.approved).map(j => (
              <Card key={j.id} className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-ink">{j.title}</h3>
                      <Badge variant={j.type==='Internship'?'gold':'navy'}>{j.type}</Badge>
                      <Badge variant="success">Active</Badge>
                    </div>
                    <p className="text-sm text-muted">{j.company} · {j.location}</p>
                    <p className="text-xs text-muted mt-1">Deadline: {j.deadline}</p>
                    <div className="mt-2 flex gap-4 text-xs text-muted">
                      <span>14 applications received</span>
                      <span>Posted {j.postedDate}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="danger" onClick={() => setToast('Job posting closed.')}>Close</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {tab === 'closed' && (
          <div className="space-y-4 max-w-3xl">
            {/* Show a pending demo item */}
            <Card className="p-5 opacity-75">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-ink">Senior Backend Engineer</h3>
                    <Badge variant="navy">Full-time</Badge>
                    <Badge variant="gold">Pending Review</Badge>
                  </div>
                  <p className="text-sm text-muted">Orbit Labs · Dhaka, Bangladesh</p>
                  <p className="text-xs text-muted mt-1">Submitted Aug 25, 2026 · Under admin review</p>
                </div>
                <Button size="sm" variant="ghost">View</Button>
              </div>
            </Card>
            <Card className="p-5 opacity-60">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-ink">Junior Developer (Intern)</h3>
                    <Badge variant="gold">Internship</Badge>
                    <Badge variant="gray">Closed</Badge>
                  </div>
                  <p className="text-sm text-muted">Orbit Labs · Dhaka, Bangladesh</p>
                  <p className="text-xs text-muted mt-1">Closed Aug 10, 2026 · 31 applications</p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </AppShell>
  )
}

// ─── Alumni Profile (Self) ────────────────────────────────────────────────────

export function AlumniProfileSelfPage(props: SharedProps) {
  const [editing, setEditing] = useState(false)
  const [bio, setBio] = useState(DEMO_ALUMNI.bio)
  const [toast, setToast] = useState('')
  const [tab, setTab] = useState('about')

  function save() { setEditing(false); setToast('Profile updated successfully!') }

  return (
    <AppShell {...props} params={{...(props.params||{}), _view:'alumni-profile-self'}}>
      <div className="px-6 lg:px-8 py-6 max-w-3xl">
        <Card className="overflow-hidden mb-4">
          <div className="h-28 bg-primary" />
          <div className="px-6 pb-6 -mt-10">
            <div className="flex items-end gap-4 mb-4">
              <Avatar name={DEMO_ALUMNI.name} size="xl" className="border-4 border-surface" />
              <div className="flex-1 pb-1">
                <h1 className="font-display text-2xl text-ink">{DEMO_ALUMNI.name}</h1>
                <p className="text-secondary font-medium">{DEMO_ALUMNI.jobTitle} · {DEMO_ALUMNI.company}</p>
                <p className="text-sm text-muted">{DEMO_ALUMNI.location}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => editing ? save() : setEditing(true)}>
                {editing ? 'Save Profile' : 'Edit Profile'}
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="navy">Alumni</Badge>
              <Badge variant="green">{DEMO_ALUMNI.department}</Badge>
              <Badge variant="gold">Class of {DEMO_ALUMNI.graduationYear}</Badge>
            </div>
            {editing
              ? <Textarea value={bio} onChange={setBio} rows={3} />
              : <p className="text-sm text-muted leading-relaxed">{bio}</p>}
          </div>
        </Card>

        <Tabs tabs={[{id:'about',label:'About'},{id:'career',label:'Career'},{id:'achievements',label:'Achievements'}]} active={tab} onChange={setTab} className="mb-6" />

        {tab==='about' && (
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-5">
              <h3 className="font-semibold text-ink mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {DEMO_ALUMNI.skills.map(s => <Badge key={s} variant="navy">{s}</Badge>)}
              </div>
            </Card>
            <Card className="p-5">
              <h3 className="font-semibold text-ink mb-3">Info</h3>
              <div className="space-y-2 text-sm">
                {[['Batch','2019'],['Dept',DEMO_ALUMNI.department],['Grad Year',DEMO_ALUMNI.graduationYear],['Company',DEMO_ALUMNI.company]].map(([k,v])=>(
                  <div key={k} className="flex justify-between"><span className="text-muted">{k}</span><span className="text-ink font-medium">{v}</span></div>
                ))}
              </div>
            </Card>
          </div>
        )}
        {tab==='career' && (
          <Card className="p-5">
            <h3 className="font-semibold text-ink mb-4">Career History</h3>
            {DEMO_ALUMNI.careerTimeline.map((c,i)=>(
              <div key={i} className="flex gap-3 mb-4">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                  {i<DEMO_ALUMNI.careerTimeline.length-1&&<div className="w-0.5 flex-1 bg-edge mt-1"/>}
                </div>
                <div className="pb-2">
                  <p className="font-medium text-ink">{c.role}</p>
                  <p className="text-secondary text-sm">{c.company}</p>
                  <p className="text-xs text-muted font-code">{c.year}</p>
                </div>
              </div>
            ))}
          </Card>
        )}
        {tab==='achievements' && (
          <Card className="p-5">
            <h3 className="font-semibold text-ink mb-3">Achievements</h3>
            {DEMO_ALUMNI.achievements.map(a=>(
              <div key={a} className="flex items-center gap-2 py-2 border-b border-edge last:border-0">
                <span className="text-accent">★</span><span className="text-sm text-ink">{a}</span>
              </div>
            ))}
          </Card>
        )}
      </div>
      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </AppShell>
  )
}
