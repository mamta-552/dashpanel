import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building,
  Users,
  DollarSign,
  TrendingUp,
  ClipboardList,
  AlertCircle,
  CheckCircle,
  Clock,
  Award,
} from "lucide-react";

interface Partner {
  id: string;
  name: string;
  alcId: string;
  status: "active" | "inactive" | "suspended";
  studentsCount: number;
  pendingFees: number;
  totalRevenue: number;
  examRequests: number;
  lastActivity: string;
}

const mockPartners: Partner[] = [
  {
    id: "1",
    name: "ABC Learning Center",
    alcId: "ALC001",
    status: "active",
    studentsCount: 45,
    pendingFees: 15000,
    totalRevenue: 125000,
    examRequests: 8,
    lastActivity: "2024-01-20",
  },
  {
    id: "2",
    name: "XYZ Education Hub",
    alcId: "ALC002",
    status: "active",
    studentsCount: 32,
    pendingFees: 8500,
    totalRevenue: 98000,
    examRequests: 5,
    lastActivity: "2024-01-19",
  },
  {
    id: "3",
    name: "Tech Skills Institute",
    alcId: "ALC003",
    status: "inactive",
    studentsCount: 18,
    pendingFees: 5200,
    totalRevenue: 45000,
    examRequests: 2,
    lastActivity: "2024-01-15",
  },
];

export default function PartnerOverview() {
  const [partners] = useState<Partner[]>(mockPartners);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredPartners = partners.filter((partner) => {
    if (selectedFilter === "all") return true;
    return partner.status === selectedFilter;
  });

  const totalStats = {
    totalPartners: partners.length,
    activePartners: partners.filter((p) => p.status === "active").length,
    totalStudents: partners.reduce((sum, p) => sum + p.studentsCount, 0),
    totalPendingFees: partners.reduce((sum, p) => sum + p.pendingFees, 0),
    totalRevenue: partners.reduce((sum, p) => sum + p.totalRevenue, 0),
    totalExamRequests: partners.reduce((sum, p) => sum + p.examRequests, 0),
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "inactive":
        return "secondary";
      case "suspended":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Partner Overview
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Comprehensive partner management dashboard
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Building className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-xs font-medium text-gray-600">
                  Total Partners
                </p>
                <p className="text-lg font-bold">{totalStats.totalPartners}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-xs font-medium text-gray-600">
                  Active Partners
                </p>
                <p className="text-lg font-bold">{totalStats.activePartners}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-xs font-medium text-gray-600">
                  Total Students
                </p>
                <p className="text-lg font-bold">{totalStats.totalStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-xs font-medium text-gray-600">
                  Pending Fees
                </p>
                <p className="text-lg font-bold">
                  ₹{totalStats.totalPendingFees.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-xs font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-lg font-bold">
                  ₹{totalStats.totalRevenue.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ClipboardList className="h-5 w-5 text-indigo-500" />
              <div>
                <p className="text-xs font-medium text-gray-600">
                  Exam Requests
                </p>
                <p className="text-lg font-bold">
                  {totalStats.totalExamRequests}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Partner List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Building className="h-5 w-5" />
            <span>Partner List</span>
          </CardTitle>
          <div className="flex space-x-2">
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Partners</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Partner Name</TableHead>
                <TableHead>ALC ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Pending Fees</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Exam Requests</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPartners.map((partner) => (
                <TableRow key={partner.id}>
                  <TableCell className="font-medium">{partner.name}</TableCell>
                  <TableCell>{partner.alcId}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(partner.status)}>
                      {partner.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{partner.studentsCount}</TableCell>
                  <TableCell>₹{partner.pendingFees.toLocaleString()}</TableCell>
                  <TableCell>
                    ₹{partner.totalRevenue.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {partner.examRequests > 0 ? (
                      <Badge variant="secondary">{partner.examRequests}</Badge>
                    ) : (
                      "0"
                    )}
                  </TableCell>
                  <TableCell>{partner.lastActivity}</TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                      <Button variant="ghost" size="sm">
                        Manage
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span>New applications today</span>
                <Badge>12</Badge>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Pending approvals</span>
                <Badge variant="secondary">8</Badge>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Approved today</span>
                <Badge variant="outline">15</Badge>
              </div>
            </div>
            <Button className="w-full mt-4" size="sm">
              View All Applications
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Fee Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span>Overdue payments</span>
                <Badge variant="destructive">5</Badge>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Due this week</span>
                <Badge variant="secondary">18</Badge>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Paid today</span>
                <Badge>₹45,000</Badge>
              </div>
            </div>
            <Button className="w-full mt-4" size="sm">
              Manage Fees
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Exam Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span>Upcoming exams</span>
                <Badge>3</Badge>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Admit cards pending</span>
                <Badge variant="secondary">12</Badge>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Result updates</span>
                <Badge variant="outline">7</Badge>
              </div>
            </div>
            <Button className="w-full mt-4" size="sm">
              Manage Exams
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
