import { useState } from 'react'
import type { ViewName, UserRole } from './shell'
import { DEMO_STUDENT, DEMO_ALUMNI, DEMO_ADMIN } from './demo'

// Public views
import { LandingPage, LoginPage, StudentRegisterPage, AlumniRegisterPage, ForgotPasswordPage, ResetPasswordPage, ResetSuccessPage } from './public'

// Student views
import { StudentDashboard, CommunityPage, DiscussionPage, ResourcesPage, ResourceDetailPage, AlumniDirectoryPage, AlumniProfilePage, EventsPage, EventDetailPage, AnnouncementsPage, JobsPage, JobDetailPage, NotificationsPage, StudentProfilePage, SearchResultsPage } from './student'

// Alumni views
import { AlumniDashboard, AlumniCommunityPage, PostJobPage, ManageJobPostingsPage, AlumniProfileSelfPage } from './alumni'

// Admin views
import { AdminDashboard, AdminUsersPage, AdminUserDetailPage, AdminCommunitiesPage, AdminModerationPage, AdminAnnouncementsPage, AdminEventsPage, AdminJobsModerationPage, AdminReportsPage } from './admin'

export default function App() {
  const [view, setView] = useState<ViewName>('landing')
  const [params, setParams] = useState<any>({})
  const [userRole, setUserRole] = useState<UserRole | null>(null)
  const [currentUser, setCurrentUser] = useState<any>(null)

  function navigate(v: ViewName, p?: any) {
    setView(v)
    setParams(p || {})
    window.scrollTo(0, 0)
  }

  function handleLogin(role: UserRole) {
    setUserRole(role)
    const user = role === 'student' ? DEMO_STUDENT : role === 'alumni' ? DEMO_ALUMNI : DEMO_ADMIN
    setCurrentUser(user)
    const dest: ViewName = role === 'student' ? 'student-dashboard' : role === 'alumni' ? 'alumni-dashboard' : 'admin-dashboard'
    navigate(dest)
  }

  function handleLogout() {
    setUserRole(null)
    setCurrentUser(null)
    navigate('login')
  }

  const sharedProps = { navigate, params, userRole: userRole ?? undefined, currentUser, onLogout: handleLogout }

  // ── Public routes ────────────────────────────────────────────────────────

  if (view === 'landing') return <LandingPage navigate={navigate} />
  if (view === 'login') return <LoginPage navigate={navigate} onLogin={handleLogin} />
  if (view === 'student-register') return <StudentRegisterPage navigate={navigate} />
  if (view === 'alumni-register') return <AlumniRegisterPage navigate={navigate} />
  if (view === 'forgot-password') return <ForgotPasswordPage navigate={navigate} />
  if (view === 'reset-password') return <ResetPasswordPage navigate={navigate} />
  if (view === 'reset-success') return <ResetSuccessPage navigate={navigate} />

  // ── Student routes ───────────────────────────────────────────────────────

  if (view === 'student-dashboard') return <StudentDashboard {...sharedProps} />
  if (view === 'community') return <CommunityPage {...sharedProps} />
  if (view === 'discussion') return <DiscussionPage {...sharedProps} />
  if (view === 'resources') return <ResourcesPage {...sharedProps} />
  if (view === 'resource-detail') return <ResourceDetailPage {...sharedProps} />
  if (view === 'student-profile') return <StudentProfilePage {...sharedProps} />
  if (view === 'search-results') return <SearchResultsPage {...sharedProps} />
  if (view === 'notifications') return <NotificationsPage {...sharedProps} />

  // ── Shared student/alumni routes ─────────────────────────────────────────

  if (view === 'alumni-directory') return <AlumniDirectoryPage {...sharedProps} />
  if (view === 'alumni-profile') return <AlumniProfilePage {...sharedProps} />
  if (view === 'events') return <EventsPage {...sharedProps} />
  if (view === 'event-detail') return <EventDetailPage {...sharedProps} />
  if (view === 'announcements') return <AnnouncementsPage {...sharedProps} />
  if (view === 'jobs') return <JobsPage {...sharedProps} />
  if (view === 'job-detail') return <JobDetailPage {...sharedProps} />

  // ── Alumni routes ────────────────────────────────────────────────────────

  if (view === 'alumni-dashboard') return <AlumniDashboard {...sharedProps} />
  if (view === 'alumni-community') return <AlumniCommunityPage {...sharedProps} />
  if (view === 'post-job') return <PostJobPage {...sharedProps} />
  if (view === 'my-job-postings') return <ManageJobPostingsPage {...sharedProps} />
  if (view === 'alumni-profile-self') return <AlumniProfileSelfPage {...sharedProps} />

  // ── Admin routes ─────────────────────────────────────────────────────────

  const adminProps = { navigate, params, onLogout: handleLogout }
  if (view === 'admin-dashboard') return <AdminDashboard {...adminProps} />
  if (view === 'admin-users') return <AdminUsersPage {...adminProps} />
  if (view === 'admin-user-detail') return <AdminUserDetailPage {...adminProps} />
  if (view === 'admin-communities') return <AdminCommunitiesPage {...adminProps} />
  if (view === 'admin-moderation') return <AdminModerationPage {...adminProps} />
  if (view === 'admin-announcements') return <AdminAnnouncementsPage {...adminProps} />
  if (view === 'admin-events') return <AdminEventsPage {...adminProps} />
  if (view === 'admin-jobs-mod') return <AdminJobsModerationPage {...adminProps} />
  if (view === 'admin-reports') return <AdminReportsPage {...adminProps} />

  // ── Fallback ─────────────────────────────────────────────────────────────

  return <LandingPage navigate={navigate} />
}
