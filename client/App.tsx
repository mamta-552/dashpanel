import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminLayout } from "./components/layout/AdminLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AuthManagement from "./pages/AuthManagement";
import PartnerManagement from "./pages/PartnerManagement";
import StudentManagement from "./pages/StudentManagement";
import CourseManagement from "./pages/CourseManagement";
import EventManagement from "./pages/EventManagement";
import BlogManagement from "./pages/BlogManagement";
import PageManagement from "./pages/PageManagement";
import ContactManagement from "./pages/ContactManagement";
import SettingsManagement from "./pages/SettingsManagement";
import ServicesManagement from "./pages/ServicesManagement";
import TestQuizBuilder from "./pages/TestQuizBuilder";
import LiveClassesManagement from "./pages/LiveClassesManagement";
import NotFound from "./pages/NotFound";

// Individual Page Components
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CareersPage from "./pages/CareersPage";
import OurCoursesPage from "./pages/OurCoursesPage";
import StudentCornerPage from "./pages/StudentCornerPage";
import FooterPage from "./pages/FooterPage";
import PlaceholderPage from "./pages/PlaceholderPage";

// Student Tab Components
import StudentsTab from "./pages/students/StudentsTab";
import BooksTab from "./pages/students/BooksTab";
import ResultsTab from "./pages/students/ResultsTab";
import ScholarshipsTab from "./pages/students/ScholarshipsTab";
import TestsTab from "./pages/students/TestsTab";
import LiveClassesTab from "./pages/students/LiveClassesTab";
import SelfLearningTab from "./pages/students/SelfLearningTab";

// Partner Management Components
import PartnerOverview from "./pages/partners/PartnerOverview";
import NewApplications from "./pages/partners/NewApplications";
import PendingFee from "./pages/partners/PendingFee";
import RegisteredStudents from "./pages/partners/RegisteredStudents";
import ExamRequests from "./pages/partners/ExamRequests";
import ExamsManagement from "./pages/partners/ExamsManagement";
import ResultUpdateRequests from "./pages/partners/ResultUpdateRequests";
import ReExaminations from "./pages/partners/ReExaminations";
import ReExamFeeTracking from "./pages/partners/ReExamFeeTracking";
import FeeReceipts from "./pages/partners/FeeReceipts";
import NotificationsManagement from "./pages/partners/NotificationsManagement";
import AdmitCards from "./pages/partners/AdmitCards";
import PartnerWallet from "./pages/partners/PartnerWallet";
import LiveChat from "./pages/partners/LiveChat";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="eduadmin-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/admin" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="auth" element={<AuthManagement />} />
              <Route path="partners" element={<PartnerManagement />} />
              <Route path="students" element={<StudentManagement />} />
              <Route path="courses" element={<CourseManagement />} />
              <Route path="events" element={<EventManagement />} />
              <Route path="blog" element={<BlogManagement />} />
              <Route path="pages" element={<PageManagement />} />
              <Route path="contact" element={<ContactManagement />} />
              <Route path="settings" element={<SettingsManagement />} />
              <Route path="services" element={<ServicesManagement />} />
              <Route path="tests" element={<TestQuizBuilder />} />
              <Route path="live-classes" element={<LiveClassesManagement />} />

              {/* Individual Page Management Routes */}
              <Route path="pages/home" element={<HomePage />} />
              <Route path="pages/about" element={<AboutPage />} />
              <Route
                path="pages/services"
                element={
                  <PlaceholderPage
                    title="Services Page"
                    description="Manage services page content and offerings"
                  />
                }
              />
              <Route path="pages/careers" element={<CareersPage />} />
              <Route
                path="pages/events"
                element={
                  <PlaceholderPage
                    title="Events Page"
                    description="Manage events page content and upcoming events"
                  />
                }
              />
              <Route path="pages/courses" element={<OurCoursesPage />} />
              <Route
                path="pages/student-corner"
                element={<StudentCornerPage />}
              />
              <Route
                path="pages/blog"
                element={
                  <PlaceholderPage
                    title="Blog Page"
                    description="Manage blog page layout and featured posts"
                  />
                }
              />
              <Route
                path="pages/contact"
                element={
                  <PlaceholderPage
                    title="Contact Page"
                    description="Manage contact page content and information"
                  />
                }
              />
              <Route path="pages/footer" element={<FooterPage />} />

              {/* Student Tab Routes */}
              <Route path="students/students" element={<StudentsTab />} />
              <Route path="students/books" element={<BooksTab />} />
              <Route path="students/results" element={<ResultsTab />} />
              <Route
                path="students/scholarships"
                element={<ScholarshipsTab />}
              />
              <Route path="students/tests" element={<TestsTab />} />
              <Route
                path="students/live-classes"
                element={<LiveClassesTab />}
              />
              <Route
                path="students/self-learning"
                element={<SelfLearningTab />}
              />

              {/* Partner Management Routes */}
              <Route path="partners/overview" element={<PartnerOverview />} />
              <Route
                path="partners/applications"
                element={<NewApplications />}
              />
              <Route path="partners/pending-fee" element={<PendingFee />} />
              <Route
                path="partners/students"
                element={<RegisteredStudents />}
              />
              <Route path="partners/exam-requests" element={<ExamRequests />} />
              <Route path="partners/exams" element={<ExamsManagement />} />
              <Route
                path="partners/result-updates"
                element={<ResultUpdateRequests />}
              />
              <Route path="partners/re-exams" element={<ReExaminations />} />
              <Route
                path="partners/re-exam-fee"
                element={<ReExamFeeTracking />}
              />
              <Route path="partners/receipts" element={<FeeReceipts />} />
              <Route
                path="partners/notifications"
                element={<NotificationsManagement />}
              />
              <Route path="partners/admit-cards" element={<AdmitCards />} />
              <Route path="partners/wallet" element={<PartnerWallet />} />
              <Route path="partners/chat" element={<LiveChat />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
