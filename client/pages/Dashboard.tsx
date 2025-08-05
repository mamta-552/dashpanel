import {
  Users,
  UserPlus,
  FileText,
  DollarSign,
  Clock,
  BookOpen,
  Plus,
  Award,
  Building,
  TrendingUp,
} from "lucide-react";
import { AnalyticsCard } from "@/components/dashboard/AnalyticsCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { StudentTable } from "@/components/dashboard/StudentTable";
import { PartnerChart } from "@/components/dashboard/PartnerChart";
import { StudentGrowthChart } from "@/components/dashboard/StudentGrowthChart";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back! Here's what's happening with your educational
            platform.
          </p>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Analytics Cards - Light Colors and Compact Size */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        <AnalyticsCard
          title="Total Students"
          value="3,248"
          change="+12% from last month"
          changeType="positive"
          icon={Users}
          cardColor="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
          textColor="text-blue-700 dark:text-blue-300"
          iconBg="bg-blue-100 dark:bg-blue-800/30"
          className="max-w-xs"
        />
        <AnalyticsCard
          title="New Students"
          value="142"
          change="+8% from last week"
          changeType="positive"
          icon={UserPlus}
          cardColor="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
          textColor="text-green-700 dark:text-green-300"
          iconBg="bg-green-100 dark:bg-green-800/30"
          className="max-w-xs"
        />
        <AnalyticsCard
          title="New Applications"
          value="89"
          change="+5% from yesterday"
          changeType="positive"
          icon={FileText}
          cardColor="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800"
          textColor="text-purple-700 dark:text-purple-300"
          iconBg="bg-purple-100 dark:bg-purple-800/30"
          className="max-w-xs"
        />
        <AnalyticsCard
          title="Total Collection"
          value="₹12,45,000"
          change="+15% from last month"
          changeType="positive"
          icon={DollarSign}
          cardColor="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800"
          textColor="text-emerald-700 dark:text-emerald-300"
          iconBg="bg-emerald-100 dark:bg-emerald-800/30"
          className="max-w-xs"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        <AnalyticsCard
          title="Pending Fees"
          value="₹2,35,000"
          change="-3% from last week"
          changeType="negative"
          icon={Clock}
          cardColor="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800"
          textColor="text-orange-700 dark:text-orange-300"
          iconBg="bg-orange-100 dark:bg-orange-800/30"
          className="max-w-xs"
        />
        <AnalyticsCard
          title="Total Partners"
          value="28"
          change="+3 new partners"
          changeType="positive"
          icon={Building}
          cardColor="bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800"
          textColor="text-pink-700 dark:text-pink-300"
          iconBg="bg-pink-100 dark:bg-pink-800/30"
          className="max-w-xs"
        />
        <AnalyticsCard
          title="Total Courses"
          value="45"
          change="+2 new courses"
          changeType="positive"
          icon={BookOpen}
          cardColor="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800"
          textColor="text-indigo-700 dark:text-indigo-300"
          iconBg="bg-indigo-100 dark:bg-indigo-800/30"
          className="max-w-xs"
        />
        <AnalyticsCard
          title="Topper Students"
          value="128"
          change="Top 10% performers"
          changeType="positive"
          icon={Award}
          cardColor="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800"
          textColor="text-yellow-700 dark:text-yellow-300"
          iconBg="bg-yellow-100 dark:bg-yellow-800/30"
          className="max-w-xs"
        />
      </div>

      {/* Charts */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
        <RevenueChart />
      </div>

      {/* Partner and Student Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
          <PartnerChart />
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
          <StudentGrowthChart />
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
        <StudentTable />
      </div>
    </div>
  );
}
