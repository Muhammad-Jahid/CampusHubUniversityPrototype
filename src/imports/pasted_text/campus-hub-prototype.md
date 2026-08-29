Create a complete high-fidelity interactive web app prototype called "CampusHub" for Premier University.

CampusHub is a university community platform connecting students, alumni, and university administrators.

IMPORTANT:
Build this as ONE connected prototype, not as unrelated pages.
Create reusable components and consistent layouts.
Use realistic fictional demo data.
Do not require a backend or real authentication.

==================================================
DESIGN DIRECTION
==================================================

Create a modern, premium university platform UI.

Brand:
- Product name: CampusHub
- University: Premier University
- Primary visual tone: professional, academic, trustworthy, modern
- Navy + muted green + warm gold accent palette
- Elegant serif display typography for major headings
- Clean sans-serif typography for body/UI
- Monospace typography only for small metadata where appropriate
- Generous whitespace
- Soft shadows
- Medium rounded corners
- Clean cards
- Professional iconography

Use the same design system across the entire product.

Create reusable:
- Navbar
- Sidebar
- Buttons
- Inputs
- Selects
- Cards
- Avatar
- Badge
- Tabs
- Modal
- Table
- Filter bar
- Search bar
- Toast
- Empty state
- Event card
- Job card
- Resource card
- Post card
- User card

==================================================
PUBLIC / AUTHENTICATION
==================================================

Create these screens:

1. Landing Page

Navbar:
- CampusHub logo
- Home
- About
- Events
- Contact
- Login
- Register

Hero:
"Connect. Learn. Grow. Together."

Subtitle:
"One digital community for Premier University students, alumni, and academic networking — batches, notes, events, and career opportunities, all in one place."

Buttons:
- Get Started
- Explore Community

Feature cards:
- Communities
- Notes & Resources
- Alumni Network
- Jobs & Internships

Stats:
- 5,000+ Students
- 1,200+ Alumni
- 50+ Communities
- 100+ Resources

Include announcements preview, upcoming events preview, and footer.

2. Login

Include:
- CampusHub logo
- Welcome back
- Email
- Password
- Show password
- Remember me
- Forgot Password?
- Login
- Register as Student
- Register as Alumni
- Back to Home

3. Student Registration

Fields:
- Full Name
- University Email
- Password
- Confirm Password
- Profile Photo
- Department
- Batch / Year
- Section

Default department:
CSE

4. Alumni Registration

Fields:
- Full Name
- Email
- Password
- Confirm Password
- Department
- Graduation Year
- Batch
- Current Company
- Job Title

5. Forgot Password

Email field and:
"Send Reset Link"

6. Reset Password

Fields:
- New Password
- Confirm New Password
- Password strength indicator
- Reset Password

7. Password Reset Success

Success message:
"Your password has been reset successfully."

Button:
"Go to Login"

==================================================
STUDENT APP
==================================================

Create a shared student/alumni application shell.

Navbar:
- CampusHub logo
- Global Search
- Notifications
- User Avatar
- Profile dropdown

Student sidebar:
- Dashboard
- My Community
- Notes & Resources
- Alumni Directory
- Events
- Announcements
- Jobs & Internships

8. Student Dashboard

Include:
- Welcome banner
- Student name
- CSE Batch 2023, Section A
- Quick statistics
- Recent community posts
- Latest announcements
- Upcoming events
- Recent resources
- Job/internship highlights
- Create Post button

9. Batch/Section Community

Community:
"CSE Batch 2023 — Section A"

Include:
- Member count
- Description
- Discussions tab
- Resources tab
- Members tab
- Post feed
- Create Post

10. Community Discussion/Post

Include:
- Author
- Timestamp
- Post type
- Post content
- Attachment preview
- Upvote/reaction
- Comments
- Reply field
- Report action

11. Create Post

Create modal:
- Community selector
- Discussion / Question / Resource
- Text area
- Attachment
- Post
- Cancel

12. Academic Notes & Resources

Filters:
- Course
- Semester
- Search

Courses:
- Data Structures
- Algorithms
- DBMS
- Operating Systems
- Computer Networks

Show resource cards.

13. Resource Detail

Include:
- File preview
- Course
- Semester
- Uploader
- Upload date
- File size/type
- Description
- Comments
- Download
- Report

14. Alumni Directory

Filters:
- Batch
- Graduation Year
- Company
- Location
- Department

Show 10–15 fictional alumni cards.

15. Alumni Profile

Include:
- Profile photo
- Name
- Current role
- Company
- Batch
- Graduation year
- Bio
- Career timeline
- Connect
- Report

Connect should show a success state.

16. Events

Tabs:
- Upcoming
- Past

Categories:
- Career
- Academic
- Community
- Networking

Create event cards.

17. Event Details

Include:
- Event banner
- Title
- Date
- Time
- Location
- Description
- Organizer
- Attendees
- RSVP button

RSVP should change to:
"RSVP Confirmed"

18. Announcements

Categories:
- Academic
- Event
- General
- Department

Create chronological announcement feed.

19. Jobs & Internships

Filters:
- Job / Internship
- Department
- Location

Create 8–10 fictional job listings.

20. Job Details

Include:
- Job title
- Company
- Type
- Location
- Deadline
- Description
- Requirements
- Eligibility
- Posted by
- Apply button

Apply should show a success state.

21. Notifications

Include:
- Comments
- Resources
- Events
- Announcements
- Jobs
- Connection requests

Show read/unread states.

Include:
"Mark all as read"

22. Student Profile

Include:
- Profile photo
- Name
- Department
- Batch
- Section
- Bio
- Skills

Tabs:
- About
- My Posts
- My Resources

Include:
"Edit Profile"

23. Global Search Results

Search example:
"Data Structures"

Tabs:
- People
- Posts
- Resources
- Events
- Jobs

Results should be clickable.

24. Report / Flag Modal

Reasons:
- Spam
- Inappropriate
- Harassment
- Other

Include:
- Reason selection
- Optional details
- Submit Report
- Cancel

After submission:
"Report submitted successfully."

==================================================
ALUMNI EXPERIENCE
==================================================

Create an alumni version of the same app shell.

Alumni sidebar:
- Dashboard
- My Community
- Alumni Directory
- Events
- Announcements
- Jobs & Internships
- My Job Postings

25. Alumni Dashboard

Focus on:
- Networking
- Alumni community
- Job opportunities
- Upcoming events
- Announcements

26. Alumni Community

Create alumni community feed using the same community component.

27. Alumni Directory

Reuse the same Alumni Directory component.

28. Student / Alumni Profile View

Reuse the same profile template for viewing users.

29. Post Job / Internship

Fields:
- Job title
- Company
- Type
- Location
- Description
- Requirements
- Eligibility
- Deadline

30. Manage My Job Postings

Show:
- Active
- Closed

Actions:
- Edit
- Close

31. Events

Reuse Events component.

32. Announcements

Reuse Announcements component.

33. Notifications

Reuse Notifications component.

34. Alumni Profile

Editable profile with:
- Name
- Graduation year
- Batch
- Company
- Job title
- Career history
- Bio
- Skills
- Achievements

==================================================
ADMIN EXPERIENCE
==================================================

Create a separate professional admin dashboard shell.

Admin sidebar:
- Dashboard
- Users
- Communities
- Content Moderation
- Announcements
- Events
- Jobs
- Reports

35. Admin Dashboard

KPI cards:
- Total Students
- Total Alumni
- Active Communities
- Posts Today
- Pending Reports
- Upcoming Events

Include simple activity charts.

36. User Management

Create searchable table.

Columns:
- Name
- Role
- Department
- Batch
- Status
- Actions

Actions:
- View
- Verify
- Suspend

37. User Detail

Include:
- Profile
- Role
- Academic information
- Activity summary
- Moderation actions

38. Community Management

Include:
- Community list
- Member count
- Create
- Edit
- Assign moderator

39. Content Moderation

Create moderation queue for:
- Posts
- Comments
- Resources

Actions:
- Approve
- Remove
- Warn

40. Announcement Management

Include:
- Announcement list
- Create
- Edit
- Archive
- Target audience

41. Event Management

Include:
- Event list
- Create event
- Edit
- Approve
- RSVP statistics

42. Job Postings Moderation

Include:
- Pending job posts
- Job details
- Approve
- Reject

43. Reports

Include:
- Total reports
- Pending reports
- Resolved reports
- Moderation activity
- Engagement/activity chart

==================================================
INTERACTIONS
==================================================

Make the prototype interactive.

Connect:

Landing → Login
Landing → Student Registration
Landing → Alumni Registration

Login → Student Dashboard
Login → Alumni Dashboard
Login → Admin Dashboard

Forgot Password → Reset Password → Success → Login

Student Dashboard → Community
Student Dashboard → Resources
Student Dashboard → Alumni Directory
Student Dashboard → Events
Student Dashboard → Announcements
Student Dashboard → Jobs
Student Dashboard → Notifications
Student Dashboard → Profile

Community → Discussion
Community → Create Post

Discussion → Report Modal

Resources → Resource Detail

Alumni Directory → Alumni Profile
Alumni Profile → Connect Success

Events → Event Details
Event Details → RSVP Confirmed

Jobs → Job Details
Job Details → Apply Success

Alumni Dashboard → Post Job
Post Job → Manage My Job Postings

Admin Dashboard → all admin management sections

Profile avatar → Profile / Logout

Logout → Login

Search → Search Results

Notifications → relevant destination screens

==================================================
RESPONSIVE DESIGN
==================================================

Create desktop-first responsive layouts.

Desktop:
- Left sidebar
- Top navbar
- Main content
- Optional right rail

Tablet:
- Collapsible sidebar

Mobile:
- Responsive navigation
- Stacked cards
- Full-width content
- Touch-friendly buttons

==================================================
DEMO DATA
==================================================

Use fictional realistic data.

Student:
Arif Rahman
CSE Batch 2023
Section A

Alumni:
Tanvir Ahmed
Software Engineer
Orbit Labs
CSE Batch 2019

Use fictional companies, events, resources, announcements and jobs.

Clearly treat all data as prototype/demo content.

==================================================
FINAL REQUIREMENTS
==================================================

The final result must feel like ONE complete product.

Prioritize:
1. Visual consistency
2. Complete navigation
3. Reusable components
4. High-fidelity UI
5. Realistic demo data
6. Working prototype interactions

Do NOT add:
- Real backend
- Real database
- Payment system
- Video calling
- Full chat/DM system
- AI chatbot
- Complex mentorship system
- Features outside this specification

Do not create unrelated pages.

Make all 43 screens part of the same CampusHub prototype and connect them through working prototype interactions.

The result should be presentation-ready for a university software/project demonstration.