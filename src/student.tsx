import { useState } from 'react'
import { AppShell, PageHeader, Card, StatCard, Avatar, Badge, Button, Tabs, Input, Select, Textarea, Modal, ReportModal, CreatePostModal, EmptyState, Toast } from './shell'
import { COMMUNITY_POSTS, RESOURCES, ALUMNI_LIST, EVENTS, JOBS, ANNOUNCEMENTS, NOTIFICATIONS, COMMUNITY_MEMBERS, DEMO_STUDENT } from './demo'
import type { SharedProps } from './shell'

// ─── Student Dashboard ────────────────────────────────────────────────────────

export function StudentDashboard(props: SharedProps) {
  const { navigate, params } = props
  const [showCreate, setShowCreate] = useState(false)
  const [toast, setToast] = useState('')
  return (
    <AppShell {...props} params={{...params, _view:'student-dashboard'}}>
      <div className="px-6 lg:px-8 py-6 space-y-6">
        {/* Welcome banner */}
        <div className="bg-primary rounded-2xl p-6 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar name={DEMO_STUDENT.name} size="lg" />
            <div>
              <p className="text-white/60 text-sm">Welcome back 👋</p>
              <h2 className="font-display text-2xl">{DEMO_STUDENT.name}</h2>
              <p className="text-accent text-sm font-code mt-0.5">{DEMO_STUDENT.department} · Batch {DEMO_STUDENT.batch} · Section {DEMO_STUDENT.section}</p>
            </div>
          </div>
          <Button variant="accent" onClick={() => setShowCreate(true)}>+ Create Post</Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Community Posts" value={DEMO_STUDENT.posts} icon="◈" color="navy" />
          <StatCard label="Resources Shared" value={DEMO_STUDENT.resources} icon="◉" color="green" />
          <StatCard label="Connections" value={DEMO_STUDENT.connections} icon="◎" color="gold" />
          <StatCard label="Events Registered" value={3} icon="◷" color="navy" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent community posts */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-ink">Recent Community Posts</h3>
              <button onClick={() => navigate('community')} className="text-sm text-primary hover:underline">View community →</button>
            </div>
            {COMMUNITY_POSTS.slice(0,3).map(post => (
              <Card key={post.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('discussion', {postId: post.id})}>
                <div className="flex items-start gap-3">
                  <Avatar name={post.author} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm text-ink">{post.author}</span>
                      <Badge variant={post.type==='Question'?'gold':post.type==='Resource'?'green':'navy'}>{post.type}</Badge>
                    </div>
                    <p className="text-sm text-muted line-clamp-2">{post.content}</p>
                    <div className="flex gap-3 mt-2 text-xs text-muted">
                      <span>↑ {post.upvotes}</span>
                      <span>💬 {post.comments}</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Sidebar widgets */}
          <div className="space-y-4">
            {/* Announcements */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-sm text-ink">Announcements</h4>
                <button onClick={() => navigate('announcements')} className="text-xs text-primary hover:underline">See all</button>
              </div>
              {ANNOUNCEMENTS.slice(0,3).map(a => (
                <div key={a.id} className="py-2 border-b border-edge last:border-0 cursor-pointer hover:bg-canvas-dark -mx-4 px-4 transition-colors" onClick={() => navigate('announcements')}>
                  <p className="text-sm text-ink font-medium line-clamp-1">{a.title}</p>
                  <p className="text-xs text-muted mt-0.5">{a.date}</p>
                </div>
              ))}
            </Card>

            {/* Upcoming Events */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-sm text-ink">Upcoming Events</h4>
                <button onClick={() => navigate('events')} className="text-xs text-primary hover:underline">See all</button>
              </div>
              {EVENTS.filter(e=>e.status==='upcoming').slice(0,3).map(ev => (
                <div key={ev.id} className="py-2 border-b border-edge last:border-0 cursor-pointer hover:bg-canvas-dark -mx-4 px-4 transition-colors" onClick={() => navigate('event-detail', {eventId: ev.id})}>
                  <p className="text-sm text-ink font-medium line-clamp-1">{ev.title}</p>
                  <p className="text-xs text-muted mt-0.5">{ev.date}</p>
                </div>
              ))}
            </Card>

            {/* Job highlights */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-sm text-ink">New Opportunities</h4>
                <button onClick={() => navigate('jobs')} className="text-xs text-primary hover:underline">See all</button>
              </div>
              {JOBS.filter(j=>j.approved).slice(0,3).map(j => (
                <div key={j.id} className="py-2 border-b border-edge last:border-0 cursor-pointer hover:bg-canvas-dark -mx-4 px-4 transition-colors" onClick={() => navigate('job-detail', {jobId: j.id})}>
                  <p className="text-sm text-ink font-medium">{j.title}</p>
                  <p className="text-xs text-muted">{j.company} · {j.type}</p>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>
      <CreatePostModal isOpen={showCreate} onClose={() => setShowCreate(false)} onPost={() => setToast('Post shared to your community!')} />
      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </AppShell>
  )
}

// ─── Community ────────────────────────────────────────────────────────────────

export function CommunityPage(props: SharedProps) {
  const { navigate } = props
  const [activeTab, setActiveTab] = useState('discussions')
  const [showCreate, setShowCreate] = useState(false)
  const [showReport, setShowReport] = useState(false)
  const [posts, setPosts] = useState(COMMUNITY_POSTS)
  const [toast, setToast] = useState('')

  function toggleUpvote(id: string) {
    setPosts(ps => ps.map(p => p.id===id ? {...p, upvoted:!p.upvoted, upvotes:p.upvoted?p.upvotes-1:p.upvotes+1} : p))
  }

  return (
    <AppShell {...props} params={{...(props.params||{}), _view:'community'}}>
      {/* Community banner */}
      <div className="bg-primary px-6 lg:px-8 py-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Badge variant="gold" className="mb-2">Batch Community</Badge>
            <h1 className="font-display text-2xl text-white">CSE Batch 2023 — Section A</h1>
            <p className="text-white/60 text-sm mt-1">{COMMUNITY_MEMBERS.length} members · Active community</p>
          </div>
          <Button variant="accent" onClick={() => setShowCreate(true)}>+ Create Post</Button>
        </div>
        <p className="text-white/60 text-sm mt-3 max-w-2xl">Your batch community for CSE Batch 2023, Section A. Share notes, ask questions, discuss topics, and collaborate with your batchmates.</p>
      </div>

      <div className="px-6 lg:px-8 py-4">
        <Tabs
          tabs={[{id:'discussions',label:'Discussions',count:posts.length},{id:'resources',label:'Resources',count:RESOURCES.length},{id:'members',label:'Members',count:COMMUNITY_MEMBERS.length}]}
          active={activeTab} onChange={setActiveTab} className="mb-6" />

        {activeTab === 'discussions' && (
          <div className="space-y-4 max-w-2xl">
            {posts.map(post => (
              <Card key={post.id} className="p-5">
                <div className="flex items-start gap-3">
                  <Avatar name={post.author} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-semibold text-sm text-ink">{post.author}</span>
                      <span className="text-xs text-muted">{post.authorRole}</span>
                      <Badge variant={post.type==='Question'?'gold':post.type==='Resource'?'green':'navy'}>{post.type}</Badge>
                    </div>
                    <p className="text-sm text-ink leading-relaxed mb-3">{post.content}</p>
                    <div className="flex items-center gap-3">
                      <button onClick={() => toggleUpvote(post.id)}
                        className={`flex items-center gap-1 text-xs px-2 py-1 rounded-lg transition-colors ${post.upvoted ? 'bg-primary-pale text-primary' : 'text-muted hover:bg-canvas-dark'}`}>
                        ↑ {post.upvotes}
                      </button>
                      <button onClick={() => navigate('discussion', {postId: post.id})}
                        className="flex items-center gap-1 text-xs text-muted hover:text-ink px-2 py-1 rounded-lg hover:bg-canvas-dark">
                        💬 {post.comments}
                      </button>
                      <span className="text-xs text-muted ml-auto">{post.date}</span>
                      <button onClick={() => setShowReport(true)} className="text-xs text-muted hover:text-danger transition-colors">⚑ Report</button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl">
            {RESOURCES.map(r => (
              <Card key={r.id} className="p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('resource-detail', {resourceId: r.id})}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-secondary-pale rounded-xl flex items-center justify-center text-secondary text-sm font-code font-medium flex-shrink-0">{r.fileType}</div>
                  <div className="min-w-0">
                    <p className="font-medium text-sm text-ink line-clamp-1">{r.title}</p>
                    <p className="text-xs text-muted mt-0.5">{r.course} · {r.semester} Semester</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted">
                      <span>↓ {r.downloads}</span>
                      <span>💬 {r.comments}</span>
                      <span>{r.fileSize}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'members' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl">
            {COMMUNITY_MEMBERS.map(m => (
              <Card key={m.id} className="p-4 flex items-center gap-3">
                <div className="relative">
                  <Avatar name={m.name} size="md" />
                  {m.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-surface" />}
                </div>
                <div>
                  <p className="font-medium text-sm text-ink">{m.name}</p>
                  <p className="text-xs text-muted">Batch {m.batch} · Section {m.section}</p>
                  {m.online && <p className="text-xs text-success mt-0.5">Online</p>}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
      <CreatePostModal isOpen={showCreate} onClose={() => setShowCreate(false)} onPost={() => setToast('Post created!')} />
      <ReportModal isOpen={showReport} onClose={() => setShowReport(false)} />
      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </AppShell>
  )
}

// ─── Discussion / Post Detail ─────────────────────────────────────────────────

export function DiscussionPage(props: SharedProps) {
  const { navigate, params } = props
  const post = COMMUNITY_POSTS.find(p => p.id === params?.postId) || COMMUNITY_POSTS[0]
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState(post.commentList)
  const [showReport, setShowReport] = useState(false)
  const [upvoted, setUpvoted] = useState(post.upvoted)
  const [upvotes, setUpvotes] = useState(post.upvotes)

  function addComment() {
    if (!comment.trim()) return
    setComments(cs => [...cs, { id: `new-${Date.now()}`, author: 'Arif Rahman', text: comment, date: '2026-08-29' }])
    setComment('')
  }

  return (
    <AppShell {...props} params={{...(props.params||{}), _view:'community'}}>
      <div className="px-6 lg:px-8 py-6 max-w-2xl">
        <button onClick={() => navigate('community')} className="flex items-center gap-1 text-sm text-muted hover:text-ink mb-4 transition-colors">← Back to Community</button>

        <Card className="p-6 mb-4">
          <div className="flex items-start gap-3 mb-4">
            <Avatar name={post.author} size="md" />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-ink">{post.author}</span>
                <span className="text-sm text-muted">{post.authorRole}</span>
                <Badge variant={post.type==='Question'?'gold':post.type==='Resource'?'green':'navy'}>{post.type}</Badge>
              </div>
              <p className="text-xs text-muted mt-0.5">{post.date}</p>
            </div>
          </div>
          <p className="text-sm text-ink leading-relaxed mb-4">{post.content}</p>
          <div className="flex items-center gap-3 border-t border-edge pt-3">
            <button onClick={() => { setUpvoted(!upvoted); setUpvotes(u => upvoted ? u-1 : u+1) }}
              className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg transition-colors ${upvoted ? 'bg-primary-pale text-primary' : 'text-muted hover:bg-canvas-dark'}`}>
              ↑ {upvotes} upvotes
            </button>
            <button onClick={() => setShowReport(true)} className="ml-auto text-sm text-muted hover:text-danger transition-colors">⚑ Report</button>
          </div>
        </Card>

        {/* Comments */}
        <Card className="p-5">
          <h3 className="font-semibold text-ink mb-4">{comments.length} Comments</h3>
          <div className="space-y-4">
            {comments.map(c => (
              <div key={c.id} className="flex gap-3">
                <Avatar name={c.author} size="sm" />
                <div className="flex-1 bg-canvas rounded-xl px-4 py-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm text-ink">{c.author}</span>
                    <span className="text-xs text-muted">{c.date}</span>
                  </div>
                  <p className="text-sm text-ink">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-4 border-t border-edge pt-4">
            <Avatar name={DEMO_STUDENT.name} size="sm" />
            <div className="flex-1 flex gap-2">
              <input value={comment} onChange={e => setComment(e.target.value)}
                onKeyDown={e => e.key==='Enter' && addComment()}
                placeholder="Write a reply..."
                className="flex-1 px-3 py-2 rounded-xl border border-edge text-sm bg-canvas focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              <Button size="sm" onClick={addComment} disabled={!comment.trim()}>Reply</Button>
            </div>
          </div>
        </Card>
      </div>
      <ReportModal isOpen={showReport} onClose={() => setShowReport(false)} />
    </AppShell>
  )
}

// ─── Resources ────────────────────────────────────────────────────────────────

export function ResourcesPage(props: SharedProps) {
  const { navigate } = props
  const [course, setCourse] = useState('All')
  const [semester, setSemester] = useState('All')
  const [search, setSearch] = useState('')

  const courses = ['All', 'Data Structures', 'Algorithms', 'DBMS', 'Operating Systems', 'Computer Networks']
  const semesters = ['All', '3rd', '4th', '5th']

  const filtered = RESOURCES.filter(r =>
    (course === 'All' || r.course === course) &&
    (semester === 'All' || r.semester === semester) &&
    (search === '' || r.title.toLowerCase().includes(search.toLowerCase()) || r.course.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <AppShell {...props} params={{...(props.params||{}), _view:'resources'}}>
      <PageHeader title="Notes & Resources" subtitle="Academic materials shared by students and alumni" />
      <div className="px-6 lg:px-8 pb-8">
        {/* Filters */}
        <Card className="p-4 mb-6">
          <div className="flex flex-wrap gap-3 items-end">
            <div className="flex-1 min-w-48">
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍  Search resources..."
                className="w-full px-3 py-2 rounded-lg border border-edge text-sm bg-canvas focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            </div>
            <Select label="" value={course} onChange={setCourse} options={courses.map(c=>({value:c,label:c==='All'?'All Courses':c}))} className="w-40" />
            <Select label="" value={semester} onChange={setSemester} options={semesters.map(s=>({value:s,label:s==='All'?'All Semesters':`${s} Semester`}))} className="w-44" />
          </div>
        </Card>

        {/* Course chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {courses.map(c => (
            <button key={c} onClick={() => setCourse(c)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${course===c ? 'bg-primary text-white' : 'bg-surface border border-edge text-muted hover:border-primary/40'}`}>
              {c}
            </button>
          ))}
        </div>

        {filtered.length === 0
          ? <EmptyState icon="📚" title="No resources found" subtitle="Try adjusting your filters or search query" />
          : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map(r => (
              <Card key={r.id} className="p-5 cursor-pointer hover:shadow-md hover:border-primary/20 transition-all" onClick={() => navigate('resource-detail', {resourceId: r.id})}>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 bg-secondary-pale rounded-xl flex items-center justify-center text-secondary font-code text-xs font-bold flex-shrink-0">{r.fileType}</div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-ink line-clamp-2">{r.title}</p>
                    <p className="text-xs text-muted mt-0.5">{r.course}</p>
                  </div>
                </div>
                <p className="text-xs text-muted line-clamp-2 mb-3">{r.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-3 text-xs text-muted">
                    <span>↓ {r.downloads}</span>
                    <span>💬 {r.comments}</span>
                    <span>{r.fileSize}</span>
                  </div>
                  <Badge variant="green">{r.semester} Sem</Badge>
                </div>
                <div className="mt-3 pt-3 border-t border-edge">
                  <p className="text-xs text-muted">By <span className="text-ink">{r.uploader}</span> · {r.uploadDate}</p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  )
}

// ─── Resource Detail ──────────────────────────────────────────────────────────

export function ResourceDetailPage(props: SharedProps) {
  const { navigate, params } = props
  const resource = RESOURCES.find(r => r.id === params?.resourceId) || RESOURCES[0]
  const [showReport, setShowReport] = useState(false)
  const [downloaded, setDownloaded] = useState(false)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState(resource.commentList)

  return (
    <AppShell {...props} params={{...(props.params||{}), _view:'resources'}}>
      <div className="px-6 lg:px-8 py-6">
        <button onClick={() => navigate('resources')} className="flex items-center gap-1 text-sm text-muted hover:text-ink mb-4 transition-colors">← Back to Resources</button>
        <div className="grid lg:grid-cols-3 gap-6 max-w-5xl">
          <div className="lg:col-span-2 space-y-4">
            {/* Preview card */}
            <Card className="overflow-hidden">
              <div className="bg-canvas-dark h-48 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-2">📄</div>
                  <p className="text-sm text-muted font-code">{resource.fileType} · {resource.fileSize}</p>
                </div>
              </div>
              <div className="p-5">
                <h1 className="font-display text-xl text-ink mb-2">{resource.title}</h1>
                <p className="text-sm text-muted leading-relaxed">{resource.description}</p>
              </div>
            </Card>

            {/* Comments */}
            <Card className="p-5">
              <h3 className="font-semibold text-ink mb-4">{comments.length} Comments</h3>
              <div className="space-y-4">
                {comments.map((c, i) => (
                  <div key={i} className="flex gap-3">
                    <Avatar name={c.author} size="sm" />
                    <div className="flex-1 bg-canvas rounded-xl px-4 py-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm text-ink">{c.author}</span>
                        <span className="text-xs text-muted">{c.date}</span>
                      </div>
                      <p className="text-sm text-ink">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-4 pt-4 border-t border-edge">
                <Avatar name={DEMO_STUDENT.name} size="sm" />
                <input value={comment} onChange={e => setComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 px-3 py-2 rounded-xl border border-edge text-sm bg-canvas focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                <Button size="sm" onClick={() => { if(comment.trim()) { setComments(cs=>[...cs,{author:'Arif Rahman',text:comment,date:'2026-08-29'}]); setComment('') } }}>Post</Button>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card className="p-5">
              <h3 className="font-semibold text-ink mb-4">Resource Info</h3>
              <div className="space-y-3 text-sm">
                {[
                  ['Course', resource.course],
                  ['Semester', `${resource.semester} Semester`],
                  ['File Type', resource.fileType],
                  ['File Size', resource.fileSize],
                  ['Downloads', resource.downloads.toString()],
                  ['Uploaded', resource.uploadDate],
                ].map(([k,v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-muted">{k}</span>
                    <span className="text-ink font-medium">{v}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-edge mt-4 pt-4">
                <p className="text-xs text-muted mb-2">Uploaded by</p>
                <div className="flex items-center gap-2">
                  <Avatar name={resource.uploader.replace(' (Alumni)','')} size="sm" />
                  <span className="text-sm font-medium text-ink">{resource.uploader}</span>
                </div>
              </div>
            </Card>

            <Button fullWidth size="lg" variant={downloaded ? 'outline' : 'primary'}
              onClick={() => setDownloaded(true)}>
              {downloaded ? '✓ Downloaded' : '⬇ Download'}
            </Button>
            <button onClick={() => setShowReport(true)} className="w-full text-sm text-muted hover:text-danger text-center transition-colors">⚑ Report this resource</button>
          </div>
        </div>
      </div>
      <ReportModal isOpen={showReport} onClose={() => setShowReport(false)} />
    </AppShell>
  )
}

// ─── Alumni Directory ─────────────────────────────────────────────────────────

export function AlumniDirectoryPage(props: SharedProps) {
  const { navigate } = props
  const [batch, setBatch] = useState('All')
  const [company, setCompany] = useState('')
  const [search, setSearch] = useState('')

  const batches = ['All', '2016', '2017', '2018', '2019', '2020', '2021', '2022']

  const filtered = ALUMNI_LIST.filter(a =>
    (batch === 'All' || a.batch === batch) &&
    (company === '' || a.company.toLowerCase().includes(company.toLowerCase())) &&
    (search === '' || a.name.toLowerCase().includes(search.toLowerCase()) || a.jobTitle.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <AppShell {...props} params={{...(props.params||{}), _view:'alumni-directory'}}>
      <PageHeader title="Alumni Directory" subtitle="Connect with Premier University graduates across the world" />
      <div className="px-6 lg:px-8 pb-8">
        {/* Filters */}
        <Card className="p-4 mb-6">
          <div className="flex flex-wrap gap-3">
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍  Search alumni..."
              className="flex-1 min-w-48 px-3 py-2 rounded-lg border border-edge text-sm bg-canvas focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            <select value={batch} onChange={e => setBatch(e.target.value)}
              className="px-3 py-2 rounded-lg border border-edge text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
              {batches.map(b=><option key={b} value={b}>{b==='All'?'All Batches':`Batch ${b}`}</option>)}
            </select>
            <input value={company} onChange={e => setCompany(e.target.value)} placeholder="Filter by company..."
              className="px-3 py-2 rounded-lg border border-edge text-sm bg-canvas focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-44" />
          </div>
        </Card>

        <p className="text-sm text-muted mb-4">{filtered.length} alumni found</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(alumni => (
            <Card key={alumni.id} className="p-5 cursor-pointer hover:shadow-md hover:border-primary/20 transition-all"
              onClick={() => navigate('alumni-profile', {alumniId: alumni.id})}>
              <div className="flex items-start gap-3 mb-3">
                <Avatar name={alumni.name} size="lg" />
                <div className="min-w-0">
                  <p className="font-semibold text-ink">{alumni.name}</p>
                  <p className="text-sm text-secondary font-medium">{alumni.jobTitle}</p>
                  <p className="text-xs text-muted">{alumni.company}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {alumni.skills.slice(0,3).map(s => <Badge key={s} variant="gray">{s}</Badge>)}
                {alumni.skills.length > 3 && <Badge variant="gray">+{alumni.skills.length-3}</Badge>}
              </div>
              <div className="flex items-center justify-between text-xs text-muted border-t border-edge pt-3">
                <span className="font-code">Batch {alumni.batch} · {alumni.department}</span>
                <span>{alumni.location}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  )
}

// ─── Alumni Profile ───────────────────────────────────────────────────────────

export function AlumniProfilePage(props: SharedProps) {
  const { navigate, params } = props
  const alumni = ALUMNI_LIST.find(a => a.id === params?.alumniId) || ALUMNI_LIST[0]
  const [connected, setConnected] = useState(alumni.connected)
  const [showReport, setShowReport] = useState(false)
  const [toast, setToast] = useState('')

  function handleConnect() { setConnected(true); setToast(`Connected with ${alumni.name}!`) }

  return (
    <AppShell {...props} params={{...(props.params||{}), _view:'alumni-directory'}}>
      <div className="px-6 lg:px-8 py-6 max-w-3xl">
        <button onClick={() => navigate('alumni-directory')} className="flex items-center gap-1 text-sm text-muted hover:text-ink mb-4 transition-colors">← Back to Alumni Directory</button>
        <Card className="overflow-hidden mb-4">
          <div className="h-28 bg-primary" />
          <div className="px-6 pb-6 -mt-12">
            <div className="flex items-end gap-4 mb-4">
              <div className="w-20 h-20 rounded-2xl border-4 border-surface flex items-center justify-center text-white text-2xl font-semibold flex-shrink-0"
                style={{background: '#1B2B4B'}}>
                {alumni.name.split(' ').map(p=>p[0]).join('').slice(0,2)}
              </div>
              <div className="flex-1 pb-2">
                <h1 className="font-display text-2xl text-ink">{alumni.name}</h1>
                <p className="text-secondary font-medium">{alumni.jobTitle} at {alumni.company}</p>
                <p className="text-sm text-muted">{alumni.location}</p>
              </div>
              <div className="flex items-center gap-2 pb-2">
                <Button variant={connected ? 'outline' : 'primary'} onClick={handleConnect}>
                  {connected ? '✓ Connected' : 'Connect'}
                </Button>
                <button onClick={() => setShowReport(true)} className="text-sm text-muted hover:text-danger transition-colors px-2">⚑</button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="navy">Batch {alumni.batch}</Badge>
              <Badge variant="green">{alumni.department}</Badge>
              <Badge variant="gold">Class of {alumni.graduationYear}</Badge>
            </div>
            <p className="text-sm text-muted leading-relaxed">{alumni.bio}</p>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-5">
            <h3 className="font-semibold text-ink mb-3">Career Timeline</h3>
            <div className="space-y-3">
              {alumni.careerTimeline.map((c, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    {i < alumni.careerTimeline.length-1 && <div className="w-0.5 flex-1 bg-edge mt-1" />}
                  </div>
                  <div className="pb-3">
                    <p className="font-medium text-sm text-ink">{c.role}</p>
                    <p className="text-sm text-secondary">{c.company}</p>
                    <p className="text-xs text-muted font-code">{c.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="font-semibold text-ink mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {alumni.skills.map(s => <Badge key={s} variant="navy">{s}</Badge>)}
            </div>
          </Card>
        </div>
      </div>
      <ReportModal isOpen={showReport} onClose={() => setShowReport(false)} />
      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </AppShell>
  )
}

// ─── Events ───────────────────────────────────────────────────────────────────

export function EventsPage(props: SharedProps) {
  const { navigate } = props
  const [tab, setTab] = useState('upcoming')
  const [category, setCategory] = useState('All')
  const categories = ['All', 'Career', 'Academic', 'Community', 'Networking']
  const filtered = EVENTS.filter(e =>
    e.status === tab &&
    (category === 'All' || e.category === category)
  )
  return (
    <AppShell {...props} params={{...(props.params||{}), _view:'events'}}>
      <PageHeader title="Events" subtitle="Upcoming and past events at Premier University" />
      <div className="px-6 lg:px-8 pb-8">
        <Tabs tabs={[{id:'upcoming',label:'Upcoming'},{id:'past',label:'Past'}]} active={tab} onChange={setTab} className="mb-6" />
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${category===c ? 'bg-primary text-white' : 'bg-surface border border-edge text-muted hover:border-primary/40'}`}>
              {c}
            </button>
          ))}
        </div>
        {filtered.length === 0
          ? <EmptyState icon="📅" title="No events found" subtitle="Check back later or browse a different category" />
          : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map(ev => (
              <Card key={ev.id} className="cursor-pointer hover:shadow-md hover:border-primary/20 transition-all overflow-hidden"
                onClick={() => navigate('event-detail', {eventId: ev.id})}>
                <div className="h-40 bg-primary-light relative">
                  <img src={`https://images.unsplash.com/photo-${ev.banner}?w=400&h=160&fit=crop&auto=format`}
                    alt={ev.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3">
                    <Badge variant={ev.category==='Career'?'gold':ev.category==='Academic'?'navy':'green'}>{ev.category}</Badge>
                  </div>
                  {ev.rsvped && <div className="absolute top-3 right-3 bg-success text-white text-xs px-2 py-0.5 rounded-full">RSVP'd</div>}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-ink mb-1">{ev.title}</h3>
                  <p className="text-sm text-muted mb-1">{ev.date} · {ev.time}</p>
                  <p className="text-xs text-muted mb-3">{ev.location}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted">{ev.attendees} attending</span>
                    <span className="text-xs text-primary font-medium">View details →</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  )
}

// ─── Event Detail ─────────────────────────────────────────────────────────────

export function EventDetailPage(props: SharedProps) {
  const { navigate, params } = props
  const event = EVENTS.find(e => e.id === params?.eventId) || EVENTS[0]
  const [rsvped, setRsvped] = useState(event.rsvped)
  const [toast, setToast] = useState('')

  function handleRsvp() { setRsvped(true); setToast('RSVP Confirmed! See you there.') }

  return (
    <AppShell {...props} params={{...(props.params||{}), _view:'events'}}>
      <div className="px-6 lg:px-8 py-6 max-w-3xl">
        <button onClick={() => navigate('events')} className="flex items-center gap-1 text-sm text-muted hover:text-ink mb-4 transition-colors">← Back to Events</button>
        <div className="h-52 rounded-2xl overflow-hidden bg-primary mb-6">
          <img src={`https://images.unsplash.com/photo-${event.banner}?w=800&h=208&fit=crop&auto=format`}
            alt={event.title} className="w-full h-full object-cover" />
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="flex items-start gap-3 mb-4">
              <Badge variant={event.category==='Career'?'gold':event.category==='Academic'?'navy':'green'}>{event.category}</Badge>
            </div>
            <h1 className="font-display text-2xl text-ink mb-3">{event.title}</h1>
            <p className="text-sm text-muted leading-relaxed mb-6">{event.description}</p>
            <div className="space-y-2 mb-6">
              {[['📅','Date',event.date],['🕐','Time',event.time],['📍','Location',event.location],['👤','Organizer',event.organizer]].map(([icon,label,val])=>(
                <div key={label as string} className="flex items-center gap-3 text-sm">
                  <span className="text-base w-6 text-center">{icon}</span>
                  <span className="text-muted w-20">{label}</span>
                  <span className="text-ink">{val}</span>
                </div>
              ))}
            </div>
            <div className="bg-canvas-dark rounded-xl px-4 py-3 text-sm text-muted">
              <span className="text-ink font-medium">{event.attendees}</span> people attending
            </div>
          </div>
          <div className="space-y-3">
            <Button fullWidth size="lg" variant={rsvped ? 'outline' : 'primary'} onClick={handleRsvp}>
              {rsvped ? '✓ RSVP Confirmed' : 'RSVP for this event'}
            </Button>
            {rsvped && <p className="text-xs text-success text-center">You are registered for this event!</p>}
          </div>
        </div>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </AppShell>
  )
}

// ─── Announcements ────────────────────────────────────────────────────────────

export function AnnouncementsPage(props: SharedProps) {
  const [category, setCategory] = useState('All')
  const categories = ['All', 'Academic', 'Event', 'General', 'Department']
  const filtered = ANNOUNCEMENTS.filter(a => category === 'All' || a.category === category)
  const catColor: Record<string, string> = { Academic:'navy', Event:'gold', General:'gray', Department:'green' }

  return (
    <AppShell {...props} params={{...(props.params||{}), _view:'announcements'}}>
      <PageHeader title="Announcements" subtitle="Official announcements from Premier University" />
      <div className="px-6 lg:px-8 pb-8">
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${category===c ? 'bg-primary text-white' : 'bg-surface border border-edge text-muted hover:border-primary/40'}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="space-y-4 max-w-2xl">
          {filtered.map(a => (
            <Card key={a.id} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={catColor[a.category] || 'gray'}>{a.category}</Badge>
                    {a.priority === 'high' && <Badge variant="red">High Priority</Badge>}
                    <span className="text-xs text-muted ml-auto font-code">{a.date}</span>
                  </div>
                  <h3 className="font-semibold text-ink mb-2">{a.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{a.content}</p>
                  <div className="mt-3 pt-3 border-t border-edge flex items-center justify-between">
                    <p className="text-xs text-muted">— {a.author}</p>
                    <Badge variant="gray">{a.target}</Badge>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  )
}

// ─── Jobs & Internships ───────────────────────────────────────────────────────

export function JobsPage(props: SharedProps) {
  const { navigate } = props
  const [typeFilter, setTypeFilter] = useState('All')
  const [search, setSearch] = useState('')
  const types = ['All', 'Full-time', 'Internship']
  const filtered = JOBS.filter(j =>
    j.approved &&
    (typeFilter === 'All' || j.type === typeFilter) &&
    (search === '' || j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase()))
  )
  return (
    <AppShell {...props} params={{...(props.params||{}), _view:'jobs'}}>
      <PageHeader title="Jobs & Internships" subtitle="Opportunities posted by Premier University alumni" />
      <div className="px-6 lg:px-8 pb-8">
        <Card className="p-4 mb-6">
          <div className="flex flex-wrap gap-3">
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍  Search jobs..."
              className="flex-1 min-w-48 px-3 py-2 rounded-lg border border-edge text-sm bg-canvas focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            {types.map(t => (
              <button key={t} onClick={() => setTypeFilter(t)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${typeFilter===t ? 'bg-primary text-white' : 'border border-edge text-muted hover:border-primary/40'}`}>
                {t}
              </button>
            ))}
          </div>
        </Card>
        <div className="space-y-4">
          {filtered.map(j => (
            <Card key={j.id} className="p-5 cursor-pointer hover:shadow-md hover:border-primary/20 transition-all"
              onClick={() => navigate('job-detail', {jobId: j.id})}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-pale flex items-center justify-center text-primary font-bold text-lg flex-shrink-0">
                  {j.company[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-ink">{j.title}</h3>
                      <p className="text-secondary font-medium text-sm">{j.company}</p>
                    </div>
                    <Badge variant={j.type==='Internship'?'gold':'navy'}>{j.type}</Badge>
                  </div>
                  <p className="text-sm text-muted mt-1 line-clamp-2">{j.description}</p>
                  <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted">
                    <span>📍 {j.location}</span>
                    <span>⏰ Deadline: {j.deadline}</span>
                    <span>💰 {j.salary}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          {filtered.length === 0 && <EmptyState icon="💼" title="No jobs found" subtitle="Try adjusting your search or filters" />}
        </div>
      </div>
    </AppShell>
  )
}

// ─── Job Detail ───────────────────────────────────────────────────────────────

export function JobDetailPage(props: SharedProps) {
  const { navigate, params } = props
  const job = JOBS.find(j => j.id === params?.jobId) || JOBS[0]
  const [applied, setApplied] = useState(job.applied)
  const [toast, setToast] = useState('')

  function handleApply() { setApplied(true); setToast('Application submitted successfully!') }

  return (
    <AppShell {...props} params={{...(props.params||{}), _view:'jobs'}}>
      <div className="px-6 lg:px-8 py-6 max-w-3xl">
        <button onClick={() => navigate('jobs')} className="flex items-center gap-1 text-sm text-muted hover:text-ink mb-4 transition-colors">← Back to Jobs</button>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Card className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-primary-pale flex items-center justify-center text-primary font-bold text-2xl flex-shrink-0">{job.company[0]}</div>
                <div>
                  <h1 className="font-display text-xl text-ink">{job.title}</h1>
                  <p className="text-secondary font-medium">{job.company}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant={job.type==='Internship'?'gold':'navy'}>{job.type}</Badge>
                    <Badge variant="gray">{job.location}</Badge>
                  </div>
                </div>
              </div>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-semibold text-ink mb-1">Description</p>
                  <p className="text-muted leading-relaxed">{job.description}</p>
                </div>
                <div>
                  <p className="font-semibold text-ink mb-1">Requirements</p>
                  <ul className="space-y-1">
                    {job.requirements.map(r => <li key={r} className="flex gap-2 text-muted"><span className="text-primary mt-0.5">›</span>{r}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-ink mb-1">Eligibility</p>
                  <p className="text-muted">{job.eligibility}</p>
                </div>
              </div>
            </Card>
          </div>
          <div className="space-y-4">
            <Card className="p-5">
              <div className="space-y-3 text-sm mb-4">
                {[['Salary', job.salary],['Location',job.location],['Deadline',job.deadline]].map(([k,v])=>(
                  <div key={k as string} className="flex justify-between">
                    <span className="text-muted">{k}</span>
                    <span className="text-ink font-medium text-right">{v}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-edge pt-4">
                <p className="text-xs text-muted mb-2">Posted by</p>
                <p className="text-sm font-medium text-ink">{job.postedBy}</p>
                <p className="text-xs text-muted">{job.postedByRole}</p>
              </div>
            </Card>
            <Button fullWidth size="lg" variant={applied ? 'outline' : 'accent'} onClick={handleApply}>
              {applied ? '✓ Application Submitted' : 'Apply Now'}
            </Button>
            {applied && <p className="text-xs text-success text-center">Your application has been sent!</p>}
          </div>
        </div>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </AppShell>
  )
}

// ─── Notifications ────────────────────────────────────────────────────────────

export function NotificationsPage(props: SharedProps) {
  const { navigate } = props
  const [notifs, setNotifs] = useState(NOTIFICATIONS)
  const typeIcon: Record<string, string> = { comment:'💬', resource:'📚', event:'📅', announcement:'📢', job:'💼', connection:'👥' }
  const typeView: Record<string, string> = { comment:'community', resource:'resources', event:'events', announcement:'announcements', job:'jobs', connection:'alumni-directory' }

  return (
    <AppShell {...props} params={{...(props.params||{}), _view:'notifications'}}>
      <PageHeader title="Notifications"
        actions={<button onClick={() => setNotifs(ns=>ns.map(n=>({...n,read:true})))} className="text-sm text-primary hover:underline">Mark all as read</button>} />
      <div className="px-6 lg:px-8 pb-8 max-w-2xl">
        {notifs.some(n=>!n.read) && (
          <div className="mb-4">
            <p className="text-xs font-medium text-muted uppercase tracking-wide mb-2">New</p>
            {notifs.filter(n=>!n.read).map(n => (
              <Card key={n.id} className="p-4 mb-2 cursor-pointer hover:shadow-sm border-primary/20 bg-primary-pale/30 transition-all"
                onClick={() => { setNotifs(ns=>ns.map(x=>x.id===n.id?{...x,read:true}:x)); navigate(typeView[n.type] as any) }}>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-pale flex items-center justify-center text-sm flex-shrink-0">{typeIcon[n.type]}</div>
                  <div className="flex-1">
                    <p className="text-sm text-ink">{n.message}</p>
                    <p className="text-xs text-muted mt-1 font-code">{n.time}</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                </div>
              </Card>
            ))}
          </div>
        )}
        <div>
          <p className="text-xs font-medium text-muted uppercase tracking-wide mb-2">Earlier</p>
          {notifs.filter(n=>n.read).map(n => (
            <Card key={n.id} className="p-4 mb-2 cursor-pointer hover:shadow-sm transition-all"
              onClick={() => navigate(typeView[n.type] as any)}>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-canvas-dark flex items-center justify-center text-sm flex-shrink-0">{typeIcon[n.type]}</div>
                <div className="flex-1">
                  <p className="text-sm text-muted">{n.message}</p>
                  <p className="text-xs text-muted mt-1 font-code">{n.time}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  )
}

// ─── Student Profile ──────────────────────────────────────────────────────────

export function StudentProfilePage(props: SharedProps) {
  const { navigate } = props
  const [tab, setTab] = useState('about')
  const [editing, setEditing] = useState(false)
  const [bio, setBio] = useState(DEMO_STUDENT.bio)

  return (
    <AppShell {...props} params={{...(props.params||{}), _view:'student-profile'}}>
      <div className="px-6 lg:px-8 py-6 max-w-3xl">
        <Card className="overflow-hidden mb-4">
          <div className="h-28 bg-primary" />
          <div className="px-6 pb-6 -mt-10">
            <div className="flex items-end gap-4 mb-4">
              <Avatar name={DEMO_STUDENT.name} size="xl" className="border-4 border-surface" />
              <div className="flex-1 pb-1">
                <h1 className="font-display text-2xl text-ink">{DEMO_STUDENT.name}</h1>
                <p className="text-muted text-sm">{DEMO_STUDENT.department} · Batch {DEMO_STUDENT.batch} · Section {DEMO_STUDENT.section}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setEditing(!editing)}>{editing ? 'Save Profile' : 'Edit Profile'}</Button>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="navy">Student</Badge>
              <Badge variant="green">{DEMO_STUDENT.department}</Badge>
              <Badge variant="gold">Batch {DEMO_STUDENT.batch}</Badge>
            </div>
            {editing
              ? <Textarea value={bio} onChange={setBio} rows={3} placeholder="Write about yourself..." />
              : <p className="text-sm text-muted leading-relaxed">{bio}</p>}
          </div>
        </Card>

        <Tabs tabs={[{id:'about',label:'About'},{id:'posts',label:'My Posts',count:DEMO_STUDENT.posts},{id:'resources',label:'My Resources',count:DEMO_STUDENT.resources}]} active={tab} onChange={setTab} className="mb-6" />

        {tab === 'about' && (
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-5">
              <h3 className="font-semibold text-ink mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {DEMO_STUDENT.skills.map(s => <Badge key={s} variant="navy">{s}</Badge>)}
              </div>
            </Card>
            <Card className="p-5">
              <h3 className="font-semibold text-ink mb-3">Academic Info</h3>
              <div className="space-y-2 text-sm">
                {[['Department','CSE'],['Batch','2023'],['Section','A'],['Email',DEMO_STUDENT.email]].map(([k,v])=>(
                  <div key={k} className="flex justify-between"><span className="text-muted">{k}</span><span className="text-ink font-medium">{v}</span></div>
                ))}
              </div>
            </Card>
          </div>
        )}
        {tab === 'posts' && (
          <div className="space-y-4">
            {COMMUNITY_POSTS.filter(p=>p.author==='Arif Rahman').map(post=>(
              <Card key={post.id} className="p-4 cursor-pointer hover:shadow-sm" onClick={()=>navigate('discussion',{postId:post.id})}>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={post.type==='Question'?'gold':post.type==='Resource'?'green':'navy'}>{post.type}</Badge>
                  <span className="text-xs text-muted">{post.date}</span>
                </div>
                <p className="text-sm text-ink line-clamp-2">{post.content}</p>
                <div className="flex gap-3 mt-2 text-xs text-muted"><span>↑ {post.upvotes}</span><span>💬 {post.comments}</span></div>
              </Card>
            ))}
          </div>
        )}
        {tab === 'resources' && (
          <div className="grid md:grid-cols-2 gap-4">
            {RESOURCES.filter(r=>r.uploader===DEMO_STUDENT.name).map(r=>(
              <Card key={r.id} className="p-4 cursor-pointer hover:shadow-sm" onClick={()=>navigate('resource-detail',{resourceId:r.id})}>
                <p className="font-medium text-sm text-ink mb-1">{r.title}</p>
                <p className="text-xs text-muted">{r.course} · ↓ {r.downloads}</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  )
}

// ─── Search Results ───────────────────────────────────────────────────────────

export function SearchResultsPage(props: SharedProps) {
  const { navigate, params } = props
  const query = params?.query || 'Data Structures'
  const [tab, setTab] = useState('resources')

  const peopleResults = ALUMNI_LIST.filter(a => a.name.toLowerCase().includes(query.toLowerCase()) || a.skills.some(s=>s.toLowerCase().includes(query.toLowerCase()))).slice(0,4)
  const postResults = COMMUNITY_POSTS.filter(p => p.content.toLowerCase().includes(query.toLowerCase())).slice(0,4)
  const resourceResults = RESOURCES.filter(r => r.title.toLowerCase().includes(query.toLowerCase()) || r.course.toLowerCase().includes(query.toLowerCase())).slice(0,4)
  const eventResults = EVENTS.filter(e => e.title.toLowerCase().includes(query.toLowerCase()) || e.description.toLowerCase().includes(query.toLowerCase())).slice(0,4)
  const jobResults = JOBS.filter(j => j.title.toLowerCase().includes(query.toLowerCase()) || j.description.toLowerCase().includes(query.toLowerCase())).slice(0,4)

  return (
    <AppShell {...props} params={{...(props.params||{}), _view:''}}>
      <div className="px-6 lg:px-8 py-6">
        <div className="mb-4">
          <h1 className="font-display text-2xl text-ink">Search Results</h1>
          <p className="text-muted text-sm mt-1">Showing results for "<span className="text-ink font-medium">{query}</span>"</p>
        </div>
        <Tabs
          tabs={[
            {id:'resources',label:'Resources',count:resourceResults.length},
            {id:'people',label:'People',count:peopleResults.length},
            {id:'posts',label:'Posts',count:postResults.length},
            {id:'events',label:'Events',count:eventResults.length},
            {id:'jobs',label:'Jobs',count:jobResults.length},
          ]}
          active={tab} onChange={setTab} className="mb-6" />

        {tab==='people' && (
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
            {peopleResults.length===0 ? <EmptyState icon="👥" title="No people found" /> : peopleResults.map(a=>(
              <Card key={a.id} className="p-4 cursor-pointer hover:shadow-sm" onClick={()=>navigate('alumni-profile',{alumniId:a.id})}>
                <div className="flex items-center gap-3">
                  <Avatar name={a.name} size="md" />
                  <div><p className="font-semibold text-sm text-ink">{a.name}</p><p className="text-xs text-muted">{a.jobTitle} · {a.company}</p></div>
                </div>
              </Card>
            ))}
          </div>
        )}
        {tab==='posts' && (
          <div className="space-y-3 max-w-2xl">
            {postResults.length===0 ? <EmptyState icon="◈" title="No posts found" /> : postResults.map(p=>(
              <Card key={p.id} className="p-4 cursor-pointer hover:shadow-sm" onClick={()=>navigate('discussion',{postId:p.id})}>
                <p className="font-medium text-sm text-ink mb-1">{p.author}</p>
                <p className="text-sm text-muted line-clamp-2">{p.content}</p>
              </Card>
            ))}
          </div>
        )}
        {tab==='resources' && (
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl">
            {resourceResults.length===0 ? <EmptyState icon="📚" title="No resources found" /> : resourceResults.map(r=>(
              <Card key={r.id} className="p-4 cursor-pointer hover:shadow-sm" onClick={()=>navigate('resource-detail',{resourceId:r.id})}>
                <p className="font-semibold text-sm text-ink mb-1">{r.title}</p>
                <p className="text-xs text-muted">{r.course} · {r.fileType}</p>
              </Card>
            ))}
          </div>
        )}
        {tab==='events' && (
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl">
            {eventResults.length===0 ? <EmptyState icon="📅" title="No events found" /> : eventResults.map(e=>(
              <Card key={e.id} className="p-4 cursor-pointer hover:shadow-sm" onClick={()=>navigate('event-detail',{eventId:e.id})}>
                <p className="font-semibold text-sm text-ink mb-1">{e.title}</p>
                <p className="text-xs text-muted">{e.date} · {e.location}</p>
              </Card>
            ))}
          </div>
        )}
        {tab==='jobs' && (
          <div className="space-y-3 max-w-2xl">
            {jobResults.length===0 ? <EmptyState icon="💼" title="No jobs found" /> : jobResults.map(j=>(
              <Card key={j.id} className="p-4 cursor-pointer hover:shadow-sm" onClick={()=>navigate('job-detail',{jobId:j.id})}>
                <p className="font-semibold text-sm text-ink">{j.title}</p>
                <p className="text-xs text-muted">{j.company} · {j.type}</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  )
}
