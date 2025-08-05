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
  RotateCcw,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Download,
  Upload,
  Edit,
} from "lucide-react";
import { toast } from "sonner";

interface ResultUpdateRequest {
  id: string;
  studentName: string;
  enrollmentNo: string;
  rollNumber: string;
  partnerName: string;
  partnerId: string;
  examName: string;
  examDate: string;
  course: string;
  batch: string;
  currentMarks: number;
  requestedMarks: number;
  currentGrade: string;
  requestedGrade: string;
  reason: string;
  requestDate: string;
  status: "pending" | "approved" | "rejected";
  reviewedBy?: string;
  reviewDate?: string;
  adminRemarks?: string;
  supportingDocuments: {
    answerSheet: boolean;
    rechecking: boolean;
    grievance: boolean;
  };
}

const mockRequests: ResultUpdateRequest[] = [
  {
    id: "1",
    studentName: "Rahul Sharma",
    enrollmentNo: "WD2024001",
    rollNumber: "2024001",
    partnerName: "ABC Learning Center",
    partnerId: "ALC001",
    examName: "Web Development Final Exam",
    examDate: "2024-01-15",
    course: "Web Development",
    batch: "2024-A",
    currentMarks: 65,
    requestedMarks: 72,
    currentGrade: "B",
    requestedGrade: "B+",
    reason: "Answer sheet evaluation discrepancy in Question 5",
    requestDate: "2024-01-20",
    status: "pending",
    supportingDocuments: {
      answerSheet: true,
      rechecking: true,
      grievance: false,
    },
  },
  {
    id: "2",
    studentName: "Priya Patel",
    enrollmentNo: "DS2024002",
    rollNumber: "2024002",
    partnerName: "XYZ Education Hub",
    partnerId: "ALC002",
    examName: "Data Science Mid-Term",
    examDate: "2024-01-10",
    course: "Data Science",
    batch: "2024-B",
    currentMarks: 58,
    requestedMarks: 63,
    currentGrade: "C+",
    requestedGrade: "B",
    reason: "Mathematical calculation error in practical section",
    requestDate: "2024-01-18",
    status: "approved",
    reviewedBy: "Dr. Admin",
    reviewDate: "2024-01-19",
    adminRemarks: "Valid calculation error found. Marks updated accordingly.",
    supportingDocuments: {
      answerSheet: true,
      rechecking: true,
      grievance: true,
    },
  },
  {
    id: "3",
    studentName: "Amit Kumar",
    enrollmentNo: "UI2024003",
    rollNumber: "2024003",
    partnerName: "Tech Skills Institute",
    partnerId: "ALC003",
    examName: "UI/UX Design Assessment",
    examDate: "2024-01-12",
    course: "UI/UX Design",
    batch: "2024-A",
    currentMarks: 45,
    requestedMarks: 52,
    currentGrade: "C",
    requestedGrade: "C+",
    reason: "Subjective evaluation bias in design portfolio",
    requestDate: "2024-01-17",
    status: "rejected",
    reviewedBy: "Prof. Admin",
    reviewDate: "2024-01-18",
    adminRemarks:
      "Re-evaluation confirms original marks. No discrepancy found.",
    supportingDocuments: {
      answerSheet: false,
      rechecking: true,
      grievance: true,
    },
  },
];

export default function ResultUpdateRequests() {
  const [requests, setRequests] = useState<ResultUpdateRequest[]>(mockRequests);
  const [selectedRequest, setSelectedRequest] =
    useState<ResultUpdateRequest | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPartner, setFilterPartner] = useState("all");
  const [updateForm, setUpdateForm] = useState({
    action: "approve",
    newMarks: "",
    newGrade: "",
    remarks: "",
  });

  const filteredRequests = requests.filter((request) => {
    if (filterStatus !== "all" && request.status !== filterStatus) return false;
    if (filterPartner !== "all" && request.partnerId !== filterPartner)
      return false;
    return true;
  });

  const handleUpdateRequest = (request: ResultUpdateRequest) => {
    setSelectedRequest(request);
    setUpdateForm({
      action: "approve",
      newMarks: request.requestedMarks.toString(),
      newGrade: request.requestedGrade,
      remarks: "",
    });
    setIsUpdateDialogOpen(true);
  };

  const submitUpdate = () => {
    if (!selectedRequest) return;

    const updatedRequest = {
      ...selectedRequest,
      status: updateForm.action as "approved" | "rejected",
      reviewedBy: "Super Admin",
      reviewDate: new Date().toISOString().split("T")[0],
      adminRemarks: updateForm.remarks,
    };

    if (updateForm.action === "approve") {
      updatedRequest.currentMarks = parseInt(updateForm.newMarks);
      updatedRequest.currentGrade = updateForm.newGrade;
    }

    setRequests(
      requests.map((req) =>
        req.id === selectedRequest.id ? updatedRequest : req,
      ),
    );

    toast.success(
      `Result update request ${updateForm.action === "approve" ? "approved" : "rejected"} successfully`,
    );
    setIsUpdateDialogOpen(false);
    setSelectedRequest(null);
  };

  const calculateGrade = (marks: number): string => {
    if (marks >= 85) return "A+";
    if (marks >= 75) return "A";
    if (marks >= 65) return "B+";
    if (marks >= 55) return "B";
    if (marks >= 45) return "C+";
    if (marks >= 35) return "C";
    return "F";
  };

  const viewRequest = (request: ResultUpdateRequest) => {
    setSelectedRequest(request);
    setIsViewDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "default";
      case "rejected":
        return "destructive";
      case "pending":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getDocumentStatus = (
    documents: ResultUpdateRequest["supportingDocuments"],
  ) => {
    const totalDocs = Object.keys(documents).length;
    const uploadedDocs = Object.values(documents).filter(Boolean).length;
    return `${uploadedDocs}/${totalDocs}`;
  };

  const getStats = () => {
    const pending = filteredRequests.filter(
      (r) => r.status === "pending",
    ).length;
    const approved = filteredRequests.filter(
      (r) => r.status === "approved",
    ).length;
    const rejected = filteredRequests.filter(
      (r) => r.status === "rejected",
    ).length;
    const total = filteredRequests.length;
    return { pending, approved, rejected, total };
  };

  const stats = getStats();
  const partners = Array.from(new Set(requests.map((r) => r.partnerId)));

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Result Update Requests
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Approve or decline result correction submissions from partners
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
                <p className="text-xs font-medium text-gray-600">Approved</p>
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
              <RotateCcw className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-xs font-medium text-gray-600">Total</p>
                <p className="text-lg font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Result Update Requests Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <RotateCcw className="h-5 w-5" />
            <span>Result Update Requests</span>
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
                <SelectItem value="rejected">Rejected</SelectItem>
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
                <TableHead>Exam Details</TableHead>
                <TableHead>Current Result</TableHead>
                <TableHead>Requested Result</TableHead>
                <TableHead>Documents</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{request.studentName}</div>
                      <div className="text-sm text-gray-500">
                        {request.enrollmentNo}
                      </div>
                      <div className="text-sm text-gray-500">
                        Roll: {request.rollNumber}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{request.partnerName}</div>
                      <div className="text-sm text-gray-500">
                        {request.partnerId}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{request.examName}</div>
                      <div className="text-sm text-gray-500">
                        {request.examDate}
                      </div>
                      <div className="text-sm text-gray-500">
                        {request.course}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {request.currentMarks} marks
                      </div>
                      <Badge variant="outline">{request.currentGrade}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-blue-600">
                        {request.requestedMarks} marks
                      </div>
                      <Badge variant="secondary">
                        {request.requestedGrade}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {getDocumentStatus(request.supportingDocuments)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(request.status)}>
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => viewRequest(request)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {request.status === "pending" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleUpdateRequest(request)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Request Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Result Update Request Details</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Student Name</Label>
                  <p className="text-sm">{selectedRequest.studentName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Enrollment No</Label>
                  <p className="text-sm">{selectedRequest.enrollmentNo}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Roll Number</Label>
                  <p className="text-sm">{selectedRequest.rollNumber}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Partner</Label>
                  <p className="text-sm">
                    {selectedRequest.partnerName} ({selectedRequest.partnerId})
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Exam Details</Label>
                  <p className="text-sm">{selectedRequest.examName}</p>
                  <p className="text-sm text-gray-500">
                    Date: {selectedRequest.examDate}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Course</Label>
                  <p className="text-sm">
                    {selectedRequest.course} - {selectedRequest.batch}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <Label className="text-sm font-medium">Current Result</Label>
                  <div className="mt-2">
                    <p className="text-lg font-bold">
                      {selectedRequest.currentMarks} marks
                    </p>
                    <Badge variant="outline">
                      {selectedRequest.currentGrade}
                    </Badge>
                  </div>
                </div>
                <div className="p-4 border rounded-lg bg-blue-50">
                  <Label className="text-sm font-medium">
                    Requested Result
                  </Label>
                  <div className="mt-2">
                    <p className="text-lg font-bold text-blue-600">
                      {selectedRequest.requestedMarks} marks
                    </p>
                    <Badge variant="secondary">
                      {selectedRequest.requestedGrade}
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Reason for Update</Label>
                <p className="text-sm mt-1 p-3 bg-gray-50 rounded">
                  {selectedRequest.reason}
                </p>
              </div>

              <div>
                <Label className="text-sm font-medium">
                  Supporting Documents
                </Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <Badge
                    variant={
                      selectedRequest.supportingDocuments.answerSheet
                        ? "default"
                        : "secondary"
                    }
                  >
                    Answer Sheet
                  </Badge>
                  <Badge
                    variant={
                      selectedRequest.supportingDocuments.rechecking
                        ? "default"
                        : "secondary"
                    }
                  >
                    Rechecking Form
                  </Badge>
                  <Badge
                    variant={
                      selectedRequest.supportingDocuments.grievance
                        ? "default"
                        : "secondary"
                    }
                  >
                    Grievance Letter
                  </Badge>
                </div>
              </div>

              {selectedRequest.adminRemarks && (
                <div>
                  <Label className="text-sm font-medium">Admin Remarks</Label>
                  <p className="text-sm mt-1 p-3 bg-yellow-50 rounded">
                    {selectedRequest.adminRemarks}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Reviewed by {selectedRequest.reviewedBy} on{" "}
                    {selectedRequest.reviewDate}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Update Request Dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Result Request</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedRequest && (
              <div className="p-3 bg-gray-50 rounded">
                <p className="font-medium">{selectedRequest.studentName}</p>
                <p className="text-sm text-gray-600">
                  Current: {selectedRequest.currentMarks} marks (
                  {selectedRequest.currentGrade}) → Requested:{" "}
                  {selectedRequest.requestedMarks} marks (
                  {selectedRequest.requestedGrade})
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="action">Action</Label>
              <Select
                value={updateForm.action}
                onValueChange={(value) =>
                  setUpdateForm({ ...updateForm, action: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="approve">Approve Request</SelectItem>
                  <SelectItem value="reject">Reject Request</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {updateForm.action === "approve" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newMarks">Final Marks</Label>
                  <Input
                    id="newMarks"
                    type="number"
                    value={updateForm.newMarks}
                    onChange={(e) => {
                      const marks = parseInt(e.target.value) || 0;
                      setUpdateForm({
                        ...updateForm,
                        newMarks: e.target.value,
                        newGrade: calculateGrade(marks),
                      });
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newGrade">Final Grade</Label>
                  <Input
                    id="newGrade"
                    value={updateForm.newGrade}
                    onChange={(e) =>
                      setUpdateForm({ ...updateForm, newGrade: e.target.value })
                    }
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="remarks">Admin Remarks</Label>
              <Textarea
                id="remarks"
                value={updateForm.remarks}
                onChange={(e) =>
                  setUpdateForm({ ...updateForm, remarks: e.target.value })
                }
                placeholder="Add your remarks about this decision..."
                rows={3}
                required
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsUpdateDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={submitUpdate}
                variant={
                  updateForm.action === "approve" ? "default" : "destructive"
                }
              >
                {updateForm.action === "approve" ? "Approve" : "Reject"} Request
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
