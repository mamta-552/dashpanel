import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  Users,
  Eye,
  Edit,
  UserX,
  UserCheck,
  Search,
  Filter,
  Download,
  GraduationCap,
} from "lucide-react";
import { toast } from "sonner";

interface RegisteredStudent {
  id: string;
  enrollmentNo: string;
  studentName: string;
  email: string;
  contactNo: string;
  partnerName: string;
  partnerId: string;
  course: string;
  batch: string;
  enrollmentDate: string;
  feeStatus: "paid" | "pending" | "overdue";
  examStatus: "eligible" | "not-eligible" | "completed";
  status: "active" | "blocked" | "graduated";
  progress: number;
  lastActivity: string;
}

const mockStudents: RegisteredStudent[] = [
  {
    id: "1",
    enrollmentNo: "WD2024001",
    studentName: "Rahul Sharma",
    email: "rahul@email.com",
    contactNo: "9876543210",
    partnerName: "ABC Learning Center",
    partnerId: "ALC001",
    course: "Web Development",
    batch: "2024-A",
    enrollmentDate: "2024-01-15",
    feeStatus: "paid",
    examStatus: "eligible",
    status: "active",
    progress: 75,
    lastActivity: "2024-01-20",
  },
  {
    id: "2",
    enrollmentNo: "DS2024002",
    studentName: "Priya Patel",
    email: "priya@email.com",
    contactNo: "9876543211",
    partnerName: "XYZ Education Hub",
    partnerId: "ALC002",
    course: "Data Science",
    batch: "2024-B",
    enrollmentDate: "2024-01-10",
    feeStatus: "pending",
    examStatus: "not-eligible",
    status: "active",
    progress: 45,
    lastActivity: "2024-01-19",
  },
  {
    id: "3",
    enrollmentNo: "UI2024003",
    studentName: "Amit Kumar",
    email: "amit@email.com",
    contactNo: "9876543212",
    partnerName: "ABC Learning Center",
    partnerId: "ALC001",
    course: "UI/UX Design",
    batch: "2024-A",
    enrollmentDate: "2024-01-05",
    feeStatus: "paid",
    examStatus: "completed",
    status: "graduated",
    progress: 100,
    lastActivity: "2024-01-18",
  },
  {
    id: "4",
    enrollmentNo: "WD2024004",
    studentName: "Sneha Gupta",
    email: "sneha@email.com",
    contactNo: "9876543213",
    partnerName: "Tech Skills Institute",
    partnerId: "ALC003",
    course: "Web Development",
    batch: "2024-B",
    enrollmentDate: "2024-01-12",
    feeStatus: "overdue",
    examStatus: "not-eligible",
    status: "blocked",
    progress: 30,
    lastActivity: "2024-01-16",
  },
];

export default function RegisteredStudents() {
  const [students, setStudents] = useState<RegisteredStudent[]>(mockStudents);
  const [selectedStudent, setSelectedStudent] =
    useState<RegisteredStudent | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPartner, setFilterPartner] = useState("all");
  const [filterCourse, setFilterCourse] = useState("all");
  const [filterBatch, setFilterBatch] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterFeeStatus, setFilterFeeStatus] = useState("all");

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.enrollmentNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPartner =
      filterPartner === "all" || student.partnerId === filterPartner;
    const matchesCourse =
      filterCourse === "all" || student.course === filterCourse;
    const matchesBatch = filterBatch === "all" || student.batch === filterBatch;
    const matchesStatus =
      filterStatus === "all" || student.status === filterStatus;
    const matchesFeeStatus =
      filterFeeStatus === "all" || student.feeStatus === filterFeeStatus;

    return (
      matchesSearch &&
      matchesPartner &&
      matchesCourse &&
      matchesBatch &&
      matchesStatus &&
      matchesFeeStatus
    );
  });

  const handleToggleStatus = (studentId: string) => {
    setStudents(
      students.map((student) =>
        student.id === studentId
          ? {
              ...student,
              status:
                student.status === "active"
                  ? "blocked"
                  : student.status === "blocked"
                    ? "active"
                    : student.status,
            }
          : student,
      ),
    );
    toast.success("Student status updated successfully");
  };

  const viewStudent = (student: RegisteredStudent) => {
    setSelectedStudent(student);
    setIsViewDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "blocked":
        return "destructive";
      case "graduated":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getFeeStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "default";
      case "pending":
        return "secondary";
      case "overdue":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getExamStatusColor = (status: string) => {
    switch (status) {
      case "eligible":
        return "default";
      case "completed":
        return "secondary";
      case "not-eligible":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStats = () => {
    const total = filteredStudents.length;
    const active = filteredStudents.filter((s) => s.status === "active").length;
    const blocked = filteredStudents.filter(
      (s) => s.status === "blocked",
    ).length;
    const graduated = filteredStudents.filter(
      (s) => s.status === "graduated",
    ).length;
    const feesPending = filteredStudents.filter(
      (s) => s.feeStatus !== "paid",
    ).length;

    return { total, active, blocked, graduated, feesPending };
  };

  const stats = getStats();
  const partners = Array.from(new Set(students.map((s) => s.partnerId)));
  const courses = Array.from(new Set(students.map((s) => s.course)));
  const batches = Array.from(new Set(students.map((s) => s.batch)));

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Registered Students
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage enrolled students across all partner centers
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-xs font-medium text-gray-600">
                  Total Students
                </p>
                <p className="text-lg font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <UserCheck className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-xs font-medium text-gray-600">Active</p>
                <p className="text-lg font-bold">{stats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <UserX className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-xs font-medium text-gray-600">Blocked</p>
                <p className="text-lg font-bold">{stats.blocked}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-xs font-medium text-gray-600">Graduated</p>
                <p className="text-lg font-bold">{stats.graduated}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-xs font-medium text-gray-600">
                  Fees Pending
                </p>
                <p className="text-lg font-bold">{stats.feesPending}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Student Management</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={filterPartner} onValueChange={setFilterPartner}>
              <SelectTrigger>
                <SelectValue placeholder="Partner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Partners</SelectItem>
                {partners.map((partner) => (
                  <SelectItem key={partner} value={partner}>
                    {partner}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterCourse} onValueChange={setFilterCourse}>
              <SelectTrigger>
                <SelectValue placeholder="Course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {courses.map((course) => (
                  <SelectItem key={course} value={course}>
                    {course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterBatch} onValueChange={setFilterBatch}>
              <SelectTrigger>
                <SelectValue placeholder="Batch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Batches</SelectItem>
                {batches.map((batch) => (
                  <SelectItem key={batch} value={batch}>
                    {batch}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
                <SelectItem value="graduated">Graduated</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Details</TableHead>
                <TableHead>Partner</TableHead>
                <TableHead>Course & Batch</TableHead>
                <TableHead>Fee Status</TableHead>
                <TableHead>Exam Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{student.studentName}</div>
                      <div className="text-sm text-gray-500">
                        {student.enrollmentNo}
                      </div>
                      <div className="text-sm text-gray-500">
                        {student.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{student.partnerName}</div>
                      <div className="text-sm text-gray-500">
                        {student.partnerId}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>{student.course}</div>
                      <div className="text-sm text-gray-500">
                        Batch: {student.batch}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getFeeStatusColor(student.feeStatus)}>
                      {student.feeStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getExamStatusColor(student.examStatus)}>
                      {student.examStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">{student.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(student.status)}>
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => viewStudent(student)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {student.status !== "graduated" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleStatus(student.id)}
                          className={
                            student.status === "active"
                              ? "text-red-600 hover:text-red-700"
                              : "text-green-600 hover:text-green-700"
                          }
                        >
                          {student.status === "active" ? (
                            <UserX className="h-4 w-4" />
                          ) : (
                            <UserCheck className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Student Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Student Details</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Student Name</Label>
                  <p className="text-sm">{selectedStudent.studentName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Enrollment No</Label>
                  <p className="text-sm">{selectedStudent.enrollmentNo}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <p className="text-sm">{selectedStudent.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Contact</Label>
                  <p className="text-sm">{selectedStudent.contactNo}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Partner</Label>
                  <p className="text-sm">
                    {selectedStudent.partnerName} ({selectedStudent.partnerId})
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Course</Label>
                  <p className="text-sm">
                    {selectedStudent.course} (Batch: {selectedStudent.batch})
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Enrollment Date</Label>
                  <p className="text-sm">{selectedStudent.enrollmentDate}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Last Activity</Label>
                  <p className="text-sm">{selectedStudent.lastActivity}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Fee Status</Label>
                  <Badge
                    variant={getFeeStatusColor(selectedStudent.feeStatus)}
                    className="mt-1"
                  >
                    {selectedStudent.feeStatus}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Exam Status</Label>
                  <Badge
                    variant={getExamStatusColor(selectedStudent.examStatus)}
                    className="mt-1"
                  >
                    {selectedStudent.examStatus}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge
                    variant={getStatusColor(selectedStudent.status)}
                    className="mt-1"
                  >
                    {selectedStudent.status}
                  </Badge>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">
                  Course Progress: {selectedStudent.progress}%
                </Label>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${selectedStudent.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
