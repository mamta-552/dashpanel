import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Award,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Plus,
  Download,
} from "lucide-react";
import { toast } from "sonner";

interface ReExamApplication {
  id: string;
  studentName: string;
  enrollmentNo: string;
  rollNumber: string;
  partnerName: string;
  partnerId: string;
  originalExamName: string;
  originalExamDate: string;
  originalMarks: number;
  originalGrade: string;
  course: string;
  batch: string;
  reason: string;
  applicationDate: string;
  status: "pending" | "approved" | "rejected" | "scheduled" | "completed";
  reExamDate?: string;
  reExamTime?: string;
  reExamVenue?: string;
  feeStatus: "pending" | "paid";
  feeAmount: number;
  adminRemarks?: string;
}

const mockApplications: ReExamApplication[] = [
  {
    id: "1",
    studentName: "Rahul Sharma",
    enrollmentNo: "WD2024001",
    rollNumber: "2024001",
    partnerName: "ABC Learning Center",
    partnerId: "ALC001",
    originalExamName: "Web Development Final Exam",
    originalExamDate: "2024-01-15",
    originalMarks: 32,
    originalGrade: "F",
    course: "Web Development",
    batch: "2024-A",
    reason: "Medical emergency during exam period",
    applicationDate: "2024-01-20",
    status: "approved",
    reExamDate: "2024-02-15",
    reExamTime: "10:00",
    reExamVenue: "Room 101, ABC Center",
    feeStatus: "paid",
    feeAmount: 1500,
    adminRemarks: "Valid medical certificate provided. Re-exam scheduled.",
  },
  {
    id: "2",
    studentName: "Priya Patel",
    enrollmentNo: "DS2024002",
    rollNumber: "2024002",
    partnerName: "XYZ Education Hub",
    partnerId: "ALC002",
    originalExamName: "Data Science Mid-Term",
    originalExamDate: "2024-01-10",
    originalMarks: 28,
    originalGrade: "F",
    course: "Data Science",
    batch: "2024-B",
    reason: "Family emergency and transportation issues",
    applicationDate: "2024-01-18",
    status: "pending",
    feeStatus: "pending",
    feeAmount: 1200,
  },
  {
    id: "3",
    studentName: "Amit Kumar",
    enrollmentNo: "UI2024003",
    rollNumber: "2024003",
    partnerName: "Tech Skills Institute",
    partnerId: "ALC003",
    originalExamName: "UI/UX Design Assessment",
    originalExamDate: "2024-01-12",
    originalMarks: 30,
    originalGrade: "F",
    course: "UI/UX Design",
    batch: "2024-A",
    reason: "Insufficient preparation time due to illness",
    applicationDate: "2024-01-17",
    status: "rejected",
    feeStatus: "pending",
    feeAmount: 1300,
    adminRemarks:
      "Reason not sufficient for re-examination. Student should retake course.",
  },
];

export default function ReExaminations() {
  const [applications, setApplications] =
    useState<ReExamApplication[]>(mockApplications);
  const [selectedApplication, setSelectedApplication] =
    useState<ReExamApplication | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPartner, setFilterPartner] = useState("all");
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(
    null,
  );

  const [scheduleForm, setScheduleForm] = useState({
    reExamDate: "",
    reExamTime: "",
    reExamVenue: "",
    duration: "120",
    instructions: "",
  });

  const [actionForm, setActionForm] = useState({
    remarks: "",
  });

  const filteredApplications = applications.filter((app) => {
    if (filterStatus !== "all" && app.status !== filterStatus) return false;
    if (filterPartner !== "all" && app.partnerId !== filterPartner)
      return false;
    return true;
  });

  const handleScheduleExam = (application: ReExamApplication) => {
    setSelectedApplication(application);
    setScheduleForm({
      reExamDate: "",
      reExamTime: "",
      reExamVenue: "",
      duration: "120",
      instructions: "",
    });
    setIsScheduleDialogOpen(true);
  };

  const submitSchedule = () => {
    if (!selectedApplication) return;

    setApplications(
      applications.map((app) =>
        app.id === selectedApplication.id
          ? {
              ...app,
              status: "scheduled",
              reExamDate: scheduleForm.reExamDate,
              reExamTime: scheduleForm.reExamTime,
              reExamVenue: scheduleForm.reExamVenue,
              adminRemarks: `Re-exam scheduled for ${scheduleForm.reExamDate} at ${scheduleForm.reExamTime}. Venue: ${scheduleForm.reExamVenue}`,
            }
          : app,
      ),
    );

    toast.success("Re-examination scheduled successfully");
    setIsScheduleDialogOpen(false);
    setSelectedApplication(null);
  };

  const handleAction = (
    application: ReExamApplication,
    action: "approve" | "reject",
  ) => {
    setSelectedApplication(application);
    setActionType(action);
    setActionForm({ remarks: "" });
    setIsActionDialogOpen(true);
  };

  const submitAction = () => {
    if (!selectedApplication || !actionType) return;

    setApplications(
      applications.map((app) =>
        app.id === selectedApplication.id
          ? {
              ...app,
              status: actionType,
              adminRemarks: actionForm.remarks,
            }
          : app,
      ),
    );

    toast.success(
      `Re-exam application ${actionType === "approve" ? "approved" : "rejected"} successfully`,
    );
    setIsActionDialogOpen(false);
    setSelectedApplication(null);
    setActionType(null);
  };

  const viewApplication = (application: ReExamApplication) => {
    setSelectedApplication(application);
    setIsViewDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
      case "scheduled":
        return "default";
      case "completed":
        return "secondary";
      case "rejected":
        return "destructive";
      case "pending":
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
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStats = () => {
    const pending = filteredApplications.filter(
      (a) => a.status === "pending",
    ).length;
    const approved = filteredApplications.filter(
      (a) => a.status === "approved" || a.status === "scheduled",
    ).length;
    const rejected = filteredApplications.filter(
      (a) => a.status === "rejected",
    ).length;
    const completed = filteredApplications.filter(
      (a) => a.status === "completed",
    ).length;
    return { pending, approved, rejected, completed };
  };

  const stats = getStats();
  const partners = Array.from(new Set(applications.map((a) => a.partnerId)));

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Re-Examination Applications
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage re-exam requests and schedule examinations by partner
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-xs font-medium text-gray-600">Pending</p>
                <p className="text-lg font-bold">{stats.pending}</p>
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
                  Approved/Scheduled
                </p>
                <p className="text-lg font-bold">{stats.approved}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-xs font-medium text-gray-600">Rejected</p>
                <p className="text-lg font-bold">{stats.rejected}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-xs font-medium text-gray-600">Completed</p>
                <p className="text-lg font-bold">{stats.completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Applications Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5" />
            <span>Re-Exam Applications</span>
          </CardTitle>
          <div className="flex space-x-2">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPartner} onValueChange={setFilterPartner}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Partner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Partners</SelectItem>
                {partners.map((partnerId) => (
                  <SelectItem key={partnerId} value={partnerId}>
                    {partnerId}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Details</TableHead>
                <TableHead>Partner</TableHead>
                <TableHead>Original Exam</TableHead>
                <TableHead>Re-Exam Schedule</TableHead>
                <TableHead>Fee Status</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {application.studentName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {application.enrollmentNo}
                      </div>
                      <div className="text-sm text-gray-500">
                        Roll: {application.rollNumber}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {application.partnerName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {application.partnerId}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {application.originalExamName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {application.originalExamDate}
                      </div>
                      <div className="text-sm text-red-500">
                        {application.originalMarks} marks (
                        {application.originalGrade})
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {application.reExamDate ? (
                      <div>
                        <div className="font-medium">
                          {application.reExamDate}
                        </div>
                        <div className="text-sm text-gray-500">
                          {application.reExamTime}
                        </div>
                        <div className="text-sm text-gray-500">
                          {application.reExamVenue}
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-400">Not scheduled</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div>
                      <Badge variant={getFeeStatusColor(application.feeStatus)}>
                        {application.feeStatus}
                      </Badge>
                      <div className="text-sm text-gray-500 mt-1">
                        ₹{application.feeAmount}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(application.status)}>
                      {application.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => viewApplication(application)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {application.status === "pending" && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleAction(application, "approve")}
                            className="text-green-600 hover:text-green-700"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleAction(application, "reject")}
                            className="text-red-600 hover:text-red-700"
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      {application.status === "approved" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleScheduleExam(application)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Calendar className="h-4 w-4" />
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

      {/* View Application Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Re-Exam Application Details</DialogTitle>
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Student Name</Label>
                  <p className="text-sm">{selectedApplication.studentName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Enrollment No</Label>
                  <p className="text-sm">{selectedApplication.enrollmentNo}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Partner</Label>
                  <p className="text-sm">
                    {selectedApplication.partnerName} (
                    {selectedApplication.partnerId})
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Course</Label>
                  <p className="text-sm">
                    {selectedApplication.course} - {selectedApplication.batch}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <Label className="text-sm font-medium">Original Exam</Label>
                  <div className="mt-2">
                    <p className="font-medium">
                      {selectedApplication.originalExamName}
                    </p>
                    <p className="text-sm text-gray-500">
                      Date: {selectedApplication.originalExamDate}
                    </p>
                    <p className="text-sm text-red-600">
                      Result: {selectedApplication.originalMarks} marks (
                      {selectedApplication.originalGrade})
                    </p>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <Label className="text-sm font-medium">Fee Details</Label>
                  <div className="mt-2">
                    <p className="font-medium">
                      ₹{selectedApplication.feeAmount}
                    </p>
                    <Badge
                      variant={getFeeStatusColor(selectedApplication.feeStatus)}
                    >
                      {selectedApplication.feeStatus}
                    </Badge>
                  </div>
                </div>
              </div>

              {selectedApplication.reExamDate && (
                <div className="p-4 bg-blue-50 border rounded-lg">
                  <Label className="text-sm font-medium">
                    Re-Exam Schedule
                  </Label>
                  <div className="mt-2 grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-medium">
                        {selectedApplication.reExamDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Time</p>
                      <p className="font-medium">
                        {selectedApplication.reExamTime}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Venue</p>
                      <p className="font-medium">
                        {selectedApplication.reExamVenue}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <Label className="text-sm font-medium">
                  Reason for Re-Exam
                </Label>
                <p className="text-sm mt-1 p-3 bg-gray-50 rounded">
                  {selectedApplication.reason}
                </p>
              </div>

              {selectedApplication.adminRemarks && (
                <div>
                  <Label className="text-sm font-medium">Admin Remarks</Label>
                  <p className="text-sm mt-1 p-3 bg-yellow-50 rounded">
                    {selectedApplication.adminRemarks}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Schedule Exam Dialog */}
      <Dialog
        open={isScheduleDialogOpen}
        onOpenChange={setIsScheduleDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Re-Examination</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedApplication && (
              <div className="p-3 bg-gray-50 rounded">
                <p className="font-medium">{selectedApplication.studentName}</p>
                <p className="text-sm text-gray-600">
                  {selectedApplication.originalExamName} - Re-exam
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reExamDate">Re-Exam Date</Label>
                <Input
                  id="reExamDate"
                  type="date"
                  value={scheduleForm.reExamDate}
                  onChange={(e) =>
                    setScheduleForm({
                      ...scheduleForm,
                      reExamDate: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reExamTime">Start Time</Label>
                <Input
                  id="reExamTime"
                  type="time"
                  value={scheduleForm.reExamTime}
                  onChange={(e) =>
                    setScheduleForm({
                      ...scheduleForm,
                      reExamTime: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reExamVenue">Venue</Label>
                <Input
                  id="reExamVenue"
                  value={scheduleForm.reExamVenue}
                  onChange={(e) =>
                    setScheduleForm({
                      ...scheduleForm,
                      reExamVenue: e.target.value,
                    })
                  }
                  placeholder="Room number, building, center"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Select
                  value={scheduleForm.duration}
                  onValueChange={(value) =>
                    setScheduleForm({ ...scheduleForm, duration: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="90">90 minutes</SelectItem>
                    <SelectItem value="120">120 minutes</SelectItem>
                    <SelectItem value="150">150 minutes</SelectItem>
                    <SelectItem value="180">180 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructions">Special Instructions</Label>
              <Textarea
                id="instructions"
                value={scheduleForm.instructions}
                onChange={(e) =>
                  setScheduleForm({
                    ...scheduleForm,
                    instructions: e.target.value,
                  })
                }
                placeholder="Any special instructions for the re-exam..."
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsScheduleDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={submitSchedule}>Schedule Re-Exam</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Action Dialog */}
      <Dialog open={isActionDialogOpen} onOpenChange={setIsActionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "approve" ? "Approve" : "Reject"} Re-Exam
              Application
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedApplication && (
              <div className="p-3 bg-gray-50 rounded">
                <p className="font-medium">{selectedApplication.studentName}</p>
                <p className="text-sm text-gray-600">
                  {selectedApplication.originalExamName} - Re-exam request
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="actionRemarks">Remarks</Label>
              <Textarea
                id="actionRemarks"
                value={actionForm.remarks}
                onChange={(e) =>
                  setActionForm({ ...actionForm, remarks: e.target.value })
                }
                placeholder={`Reason for ${actionType === "approve" ? "approving" : "rejecting"} this application...`}
                rows={4}
                required
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsActionDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={submitAction}
                variant={actionType === "approve" ? "default" : "destructive"}
              >
                {actionType === "approve" ? "Approve" : "Reject"} Application
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
