import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  Calendar,
  MessageSquare,
  Settings,
  UserCheck,
  FileText,
  Contact,
  Building,
  Award,
  ChevronDown,
  ChevronRight,
  Home,
  Info,
  Briefcase,
  GraduationCap as UserGraduationCap,
  Newspaper,
  Phone,
  DollarSign,
  CreditCard,
  Bell,
  ClipboardList,
  IdCard,
  UserPlus,
  MessageCircle,
  Wallet,
  Receipt,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Authentication", href: "/admin/auth", icon: UserCheck },
  { name: "Courses", href: "/admin/courses", icon: BookOpen },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

const partnersNavigation = [
  {
    name: "Partner Overview",
    href: "/admin/partners/overview",
    icon: Building,
  },
  {
    name: "New Applications",
    href: "/admin/partners/applications",
    icon: UserPlus,
  },
  {
    name: "Pending Fee",
    href: "/admin/partners/pending-fee",
    icon: DollarSign,
  },
  {
    name: "Registered Students",
    href: "/admin/partners/students",
    icon: Users,
  },
  {
    name: "Exam Requests",
    href: "/admin/partners/exam-requests",
    icon: ClipboardList,
  },
  { name: "Exams Management", href: "/admin/partners/exams", icon: FileText },
  {
    name: "Result Update Requests",
    href: "/admin/partners/result-updates",
    icon: RotateCcw,
  },
  {
    name: "Re-Examination Apps",
    href: "/admin/partners/re-exams",
    icon: Award,
  },
  {
    name: "Re-Exam Fee Tracking",
    href: "/admin/partners/re-exam-fee",
    icon: CreditCard,
  },
  { name: "Fee Receipts", href: "/admin/partners/receipts", icon: Receipt },
  { name: "Notifications", href: "/admin/partners/notifications", icon: Bell },
  { name: "Admit Cards", href: "/admin/partners/admit-cards", icon: IdCard },
  { name: "Partner Wallet", href: "/admin/partners/wallet", icon: Wallet },
  { name: "Live Chat", href: "/admin/partners/chat", icon: MessageCircle },
];

const studentsNavigation = [
  {
    name: "Student Registration",
    href: "/admin/students/students",
    icon: Users,
  },
  { name: "Books", href: "/admin/students/books", icon: BookOpen },
  { name: "Results", href: "/admin/students/results", icon: FileText },
  { name: "Scholarships", href: "/admin/students/scholarships", icon: Award },
  { name: "Tests", href: "/admin/students/tests", icon: FileText },
  { name: "Live Classes", href: "/admin/students/live-classes", icon: Users },
  {
    name: "Self Learning",
    href: "/admin/students/self-learning",
    icon: BookOpen,
  },
];

const pagesNavigation = [
  { name: "Home Page", href: "/admin/pages/home", icon: Home },
  { name: "About Us", href: "/admin/pages/about", icon: Info },
  { name: "Our Courses", href: "/admin/pages/courses", icon: BookOpen },
  { name: "Careers", href: "/admin/pages/careers", icon: UserGraduationCap },
  {
    name: "Student Corner",
    href: "/admin/pages/student-corner",
    icon: Users,
    hasDropdown: true,
    children: studentsNavigation,
  },
  { name: "Services Page", href: "/admin/services", icon: Briefcase },
  { name: "Events Page", href: "/admin/events", icon: Calendar },
  { name: "Blog Page", href: "/admin/blog", icon: Newspaper },
  { name: "Contact Page", href: "/admin/contact", icon: Phone },
  { name: "Footer", href: "/admin/pages/footer", icon: FileText },
];

export function Sidebar() {
  const [isPagesOpen, setIsPagesOpen] = useState(false);
  const [isStudentsOpen, setIsStudentsOpen] = useState(false);
  const [isStudentCornerOpen, setIsStudentCornerOpen] = useState(false);
  const [isPartnersOpen, setIsPartnersOpen] = useState(false);

  return (
    <div className="w-64 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 flex flex-col border-r border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </div>
          <div>
            <h1 className="text-xs font-bold text-gray-900 dark:text-white">
              PRATIBHA IT EDUCATION
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-xs">
              Super Admin Panel
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {/* First group - Dashboard, Auth */}
        {navigation.slice(0, 2).map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center px-3 py-2 text-xs font-medium rounded-lg transition-colors",
                isActive
                  ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-150 dark:hover:bg-gray-750 hover:text-gray-900 dark:hover:text-white",
              )
            }
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.name}
          </NavLink>
        ))}

        {/* Partners Dropdown */}
        <div className="space-y-1">
          <button
            onClick={() => setIsPartnersOpen(!isPartnersOpen)}
            className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium rounded-lg transition-colors text-gray-700 dark:text-gray-300 hover:bg-gray-150 dark:hover:bg-gray-750 hover:text-gray-900 dark:hover:text-white"
          >
            <div className="flex items-center">
              <Building className="mr-2 h-4 w-4" />
              Partners
            </div>
            {isPartnersOpen ? (
              <ChevronDown className="h-3 w-3" />
            ) : (
              <ChevronRight className="h-3 w-3" />
            )}
          </button>

          {isPartnersOpen && (
            <div className="ml-4 space-y-1">
              {partnersNavigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                      isActive
                        ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-150 dark:hover:bg-gray-750 hover:text-gray-900 dark:hover:text-white",
                    )
                  }
                >
                  <item.icon className="mr-2 h-3 w-3" />
                  {item.name}
                </NavLink>
              ))}
            </div>
          )}
        </div>

        {/* Pages Dropdown */}
        <div className="space-y-1">
          <button
            onClick={() => setIsPagesOpen(!isPagesOpen)}
            className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium rounded-lg transition-colors text-gray-700 dark:text-gray-300 hover:bg-gray-150 dark:hover:bg-gray-750 hover:text-gray-900 dark:hover:text-white"
          >
            <div className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Pages
            </div>
            {isPagesOpen ? (
              <ChevronDown className="h-3 w-3" />
            ) : (
              <ChevronRight className="h-3 w-3" />
            )}
          </button>

          {isPagesOpen && (
            <div className="ml-4 space-y-1">
              {pagesNavigation.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <div className="space-y-1">
                      <button
                        onClick={() =>
                          setIsStudentCornerOpen(!isStudentCornerOpen)
                        }
                        className="flex items-center justify-between w-full px-3 py-1.5 text-xs font-medium rounded-md transition-colors text-gray-600 dark:text-gray-400 hover:bg-gray-150 dark:hover:bg-gray-750 hover:text-gray-900 dark:hover:text-white"
                      >
                        <div className="flex items-center">
                          <item.icon className="mr-2 h-3 w-3" />
                          {item.name}
                        </div>
                        {isStudentCornerOpen ? (
                          <ChevronDown className="h-2 w-2" />
                        ) : (
                          <ChevronRight className="h-2 w-2" />
                        )}
                      </button>

                      {isStudentCornerOpen && (
                        <div className="ml-4 space-y-1">
                          {item.children?.map((child) => (
                            <NavLink
                              key={child.name}
                              to={child.href}
                              className={({ isActive }) =>
                                cn(
                                  "flex items-center px-2 py-1 text-xs font-medium rounded-sm transition-colors",
                                  isActive
                                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                                    : "text-gray-500 dark:text-gray-500 hover:bg-gray-150 dark:hover:bg-gray-750 hover:text-gray-900 dark:hover:text-white",
                                )
                              }
                            >
                              <child.icon className="mr-2 h-2 w-2" />
                              {child.name}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                          isActive
                            ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-150 dark:hover:bg-gray-750 hover:text-gray-900 dark:hover:text-white",
                        )
                      }
                    >
                      <item.icon className="mr-2 h-3 w-3" />
                      {item.name}
                    </NavLink>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Remaining navigation items - Courses, Settings */}
        {navigation.slice(2).map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center px-3 py-2 text-xs font-medium rounded-lg transition-colors",
                isActive
                  ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-150 dark:hover:bg-gray-750 hover:text-gray-900 dark:hover:text-white",
              )
            }
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <Award className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Super Admin
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              admin@edu.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
