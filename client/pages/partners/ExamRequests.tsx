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
  ClipboardList,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Download,
  Filter,
} from "lucide-react";
import { toast } from "sonner";

interface ExamRequest {
  id: string;
  studentName: string;
  enrollmentNo: string;
  partnerName: string;
  partnerId: string;
  examName: string;
  examDate: string;
  course: string;
  batch: string;
  requestDate: string;
  status: "pending" | "approved" | "rejected";
  eligibilityStatus: "eligible" | "not-eligible" | "under-review";
  feeStatus: "paid" | "pending";
  documents: {
    application: boolean;
    feeReceipt: boolean;
    idProof: boolean;
  };
  remarks?: string;
}

const mockExamRequests: ExamRequest[] = [
  {
    id: "1",
    studentName: "Rahul Sharma",
    enrollmentNo: "WD2024001",
    partnerName: "ABC Learning Center",
    partnerId: "ALC001",
    examName: "Web Development Final Exam",
    examDate: "2024-02-15",
    course: "Web Development",
    batch: "2024-A",
    requestDate: "2024-01-20",
    status: "pending",
    eligibilityStatus: "eligible",
    feeStatus: "paid",
    documents: {
      application: true,
      feeReceipt: true,
      idProof: true,
    },
  },
  {
    id: "2",
    studentName: "Priya Patel",
    enrollmentNo: "DS2024002",
    partnerName: "XYZ Education Hub",
    partnerId: "ALC002",
    examName: "Data Science Mid-Term",
    examDate: "2024-02-10",
    course: "Data Science",
    batch: "2024-B",
    requestDate: "2024-01-18",
    status: "approved",
    eligibilityStatus: "eligible",
    feeStatus: "paid",
    documents: {
      application: true,
      feeReceipt: true,
      idProof: true,
    },
    remarks: "All documents verified. Student eligible for exam.",
  },
  {
    id: "3",
    studentName: "Amit Kumar",
    enrollmentNo: "UI2024003",
    partnerName: "Tech Skills Institute",
    partnerId: "ALC003",
    examName: "UI/UX Design Assessment",
    examDate: "2024-02-20",
    course: "UI/UX Design",
    batch: "2024-A",
    requestDate: "2024-01-19",
    status: "rejected",
    eligibilityStatus: "not-eligible",
    feeStatus: "pending",
    documents: {
      application: true,
      feeReceipt: false,
      idProof: true,
    },
    remarks: "Fee payment pending. Cannot approve exam request.",
  },
];

export default function ExamRequests() {
  const [examRequests, setExamRequests] =
    useState<ExamRequest[]>(mockExamRequests);
  const [selectedRequest, setSelectedRequest] = useState<ExamRequest | null>(
    null,
  );
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(
    null,
  );
  const [remarks, setRemarks] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPartner, setFilterPartner] = useState("all");
  const [filterEligibility, setFilterEligibility] = useState("all");

  const filteredRequests = examRequests.filter((request) => {
    if (filterStatus !== "all" && request.status !== filterStatus) return false;
    if (filterPartner !== "all" && request.partnerId !== filterPartner)
      return false;
    if (
      filterEligibility !== "all" &&
      request.eligibilityStatus !== filterEligibility
    )
      return false;
    return true;
  });

  const handleAction = (request: ExamRequest, action: "approve" | "reject") => {
    setSelectedRequest(request);
    setActionType(action);
    setIsActionDialogOpen(true);
  };

  const confirmAction = () => {
    if (!selectedRequest || !actionType) return;

    setExamRequests(
      examRequests.map((request) =>
        request.id === selectedRequest.id
          ? { ...request, status: actionType, remarks }
          : request,
      ),
    );

    toast.success(
      `Exam request ${actionType === "approve" ? "approved" : "rejected"} successfully`,
    );
    setIsActionDialogOpen(false);
    setRemarks("");
    setSelectedRequest(null);
    setActionType(null);
  };

  const viewRequest = (request: ExamRequest) => {
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

  const getEligibilityColor = (status: string) => {
    switch (status) {
      case "eligible":
        return "default";
      case "not-eligible":
        return "destructive";
      case "under-review":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getDocumentStatus = (documents: ExamRequest["documents"]) => {
    const totalDocs = Object.keys(documents).length;
    const completedDocs = Object.values(documents).filter(Boolean).length;
    return `${completedDocs}/${totalDocs}`;
  };

  const isDocumentComplete = (documents: ExamRequest["documents"]) => {
    return Object.values(documents).every(Boolean);
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
  const partners = Array.from(new Set(examRequests.map((r) => r.partnerId)));

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Exam Requests
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Approve or reject exam participation requests from partners
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
              <ClipboardList className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-xs font-medium text-gray-600">Total</p>
                <p className="text-lg font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Exam Requests Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <ClipboardList className="h-5 w-5" />
            <span>Exam Participation Requests</span>
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
            <Select
              value={filterEligibility}
              onValueChange={setFilterEligibility}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Eligibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="eligible">Eligible</SelectItem>
                <SelectItem value="not-eligible">Not Eligible</SelectItem>
                <SelectItem value="under-review">Under Review</SelectItem>
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
                <TableHead>Request Date</TableHead>
                <TableHead>Eligibility</TableHead>
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
                        {request.course} - {request.batch}
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
                        Date: {request.examDate}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{request.requestDate}</TableCell>
                  <TableCell>
                    <Badge
                      variant={getEligibilityColor(request.eligibilityStatus)}
                    >
                      {request.eligibilityStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          isDocumentComplete(request.documents)
                            ? "default"
                            : "secondary"
                        }
                      >
                        {getDocumentStatus(request.documents)}
                      </Badge>
                      <Badge
                        variant={
                          request.feeStatus === "paid"
                            ? "default"
                            : "destructive"
                        }
                      >
                        {request.feeStatus}
                      </Badge>
                    </div>
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
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleAction(request, "approve")}
                            className="text-green-600 hover:text-green-700"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleAction(request, "reject")}
                            className="text-red-600 hover:text-red-700"
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Exam Request Details</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
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
                  <Label className="text-sm font-medium">Partner</Label>
                  <p className="text-sm">
                    {selectedRequest.partnerName} ({selectedRequest.partnerId})
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Course</Label>
                  <p className="text-sm">
                    {selectedRequest.course} - Batch: {selectedRequest.batch}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Exam Name</Label>
                  <p className="text-sm">{selectedRequest.examName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Exam Date</Label>
                  <p className="text-sm">{selectedRequest.examDate}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Document Status</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <Badge
                    variant={
                      selectedRequest.documents.application
                        ? "default"
                        : "secondary"
                    }
                  >
                    Application
                  </Badge>
                  <Badge
                    variant={
                      selectedRequest.documents.feeReceipt
                        ? "default"
                        : "secondary"
                    }
                  >
                    Fee Receipt
                  </Badge>
                  <Badge
                    variant={
                      selectedRequest.documents.idProof
                        ? "default"
                        : "secondary"
                    }
                  >
                    ID Proof
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">
                    Eligibility Status
                  </Label>
                  <Badge
                    variant={getEligibilityColor(
                      selectedRequest.eligibilityStatus,
                    )}
                    className="mt-1"
                  >
                    {selectedRequest.eligibilityStatus}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Fee Status</Label>
                  <Badge
                    variant={
                      selectedRequest.feeStatus === "paid"
                        ? "default"
                        : "destructive"
                    }
                    className="mt-1"
                  >
                    {selectedRequest.feeStatus}
                  </Badge>
                </div>
              </div>
              {selectedRequest.remarks && (
                <div>
                  <Label className="text-sm font-medium">Remarks</Label>
                  <p className="text-sm">{selectedRequest.remarks}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Action Confirmation Dialog */}
      <Dialog open={isActionDialogOpen} onOpenChange={setIsActionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "approve" ? "Approve" : "Reject"} Exam Request
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>
              Are you sure you want to {actionType} the exam request for{" "}
              <strong>{selectedRequest?.studentName}</strong>?
            </p>
            <div className="space-y-2">
              <Label htmlFor="remarks">Remarks</Label>
              <Textarea
                id="remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Add any remarks or notes..."
                rows={3}
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
                onClick={confirmAction}
                variant={actionType === "approve" ? "default" : "destructive"}
              >
                {actionType === "approve" ? "Approve" : "Reject"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
