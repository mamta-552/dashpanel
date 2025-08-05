import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { Label } from "@/components/ui/label";
import {
  UserPlus,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Download,
} from "lucide-react";
import { toast } from "sonner";

interface StudentApplication {
  id: string;
  studentName: string;
  partnerName: string;
  partnerId: string;
  course: string;
  batch: string;
  applicationDate: string;
  status: "pending" | "approved" | "rejected";
  contactNo: string;
  email: string;
  documents: {
    photo: boolean;
    signature: boolean;
    idProof: boolean;
    qualificationDocs: boolean;
  };
  remarks?: string;
}

const mockApplications: StudentApplication[] = [
  {
    id: "1",
    studentName: "Rahul Sharma",
    partnerName: "ABC Learning Center",
    partnerId: "ALC001",
    course: "Web Development",
    batch: "2024-A",
    applicationDate: "2024-01-20",
    status: "pending",
    contactNo: "9876543210",
    email: "rahul@email.com",
    documents: {
      photo: true,
      signature: true,
      idProof: true,
      qualificationDocs: false,
    },
  },
  {
    id: "2",
    studentName: "Priya Patel",
    partnerName: "XYZ Education Hub",
    partnerId: "ALC002",
    course: "Data Science",
    batch: "2024-B",
    applicationDate: "2024-01-19",
    status: "pending",
    contactNo: "9876543211",
    email: "priya@email.com",
    documents: {
      photo: true,
      signature: true,
      idProof: true,
      qualificationDocs: true,
    },
  },
  {
    id: "3",
    studentName: "Amit Kumar",
    partnerName: "ABC Learning Center",
    partnerId: "ALC001",
    course: "UI/UX Design",
    batch: "2024-A",
    applicationDate: "2024-01-18",
    status: "approved",
    contactNo: "9876543212",
    email: "amit@email.com",
    documents: {
      photo: true,
      signature: true,
      idProof: true,
      qualificationDocs: true,
    },
    remarks: "All documents verified. Good academic background.",
  },
];

export default function NewApplications() {
  const [applications, setApplications] =
    useState<StudentApplication[]>(mockApplications);
  const [selectedApplication, setSelectedApplication] =
    useState<StudentApplication | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(
    null,
  );
  const [remarks, setRemarks] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPartner, setFilterPartner] = useState("all");

  const filteredApplications = applications.filter((app) => {
    if (filterStatus !== "all" && app.status !== filterStatus) return false;
    if (filterPartner !== "all" && app.partnerId !== filterPartner)
      return false;
    return true;
  });

  const handleAction = (
    application: StudentApplication,
    action: "approve" | "reject",
  ) => {
    setSelectedApplication(application);
    setActionType(action);
    setIsActionDialogOpen(true);
  };

  const confirmAction = () => {
    if (!selectedApplication || !actionType) return;

    setApplications(
      applications.map((app) =>
        app.id === selectedApplication.id
          ? { ...app, status: actionType, remarks }
          : app,
      ),
    );

    toast.success(
      `Application ${actionType === "approve" ? "approved" : "rejected"} successfully`,
    );
    setIsActionDialogOpen(false);
    setRemarks("");
    setSelectedApplication(null);
    setActionType(null);
  };

  const viewApplication = (application: StudentApplication) => {
    setSelectedApplication(application);
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

  const getDocumentStatus = (documents: StudentApplication["documents"]) => {
    const totalDocs = Object.keys(documents).length;
    const uploadedDocs = Object.values(documents).filter(Boolean).length;
    return `${uploadedDocs}/${totalDocs}`;
  };

  const isDocumentComplete = (documents: StudentApplication["documents"]) => {
    return Object.values(documents).every(Boolean);
  };

  const partners = Array.from(
    new Set(applications.map((app) => app.partnerId)),
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            New Applications
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Review and approve partner-submitted student applications
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
                <p className="text-lg font-bold">
                  {applications.filter((a) => a.status === "pending").length}
                </p>
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
                <p className="text-lg font-bold">
                  {applications.filter((a) => a.status === "approved").length}
                </p>
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
                <p className="text-lg font-bold">
                  {applications.filter((a) => a.status === "rejected").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <UserPlus className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-xs font-medium text-gray-600">Total</p>
                <p className="text-lg font-bold">{applications.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Applications Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <UserPlus className="h-5 w-5" />
            <span>Student Applications</span>
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
                <TableHead>Student Name</TableHead>
                <TableHead>Partner</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Application Date</TableHead>
                <TableHead>Documents</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className="font-medium">
                    {application.studentName}
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
                      <div>{application.course}</div>
                      <div className="text-sm text-gray-500">
                        Batch: {application.batch}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{application.applicationDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          isDocumentComplete(application.documents)
                            ? "default"
                            : "secondary"
                        }
                      >
                        {getDocumentStatus(application.documents)}
                      </Badge>
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Student Name</Label>
                  <p className="text-sm">{selectedApplication.studentName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Contact</Label>
                  <p className="text-sm">{selectedApplication.contactNo}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <p className="text-sm">{selectedApplication.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Course</Label>
                  <p className="text-sm">
                    {selectedApplication.course} (Batch:{" "}
                    {selectedApplication.batch})
                  </p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Partner</Label>
                <p className="text-sm">
                  {selectedApplication.partnerName} (
                  {selectedApplication.partnerId})
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium">Documents Status</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        selectedApplication.documents.photo
                          ? "default"
                          : "secondary"
                      }
                    >
                      Photo
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        selectedApplication.documents.signature
                          ? "default"
                          : "secondary"
                      }
                    >
                      Signature
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        selectedApplication.documents.idProof
                          ? "default"
                          : "secondary"
                      }
                    >
                      ID Proof
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        selectedApplication.documents.qualificationDocs
                          ? "default"
                          : "secondary"
                      }
                    >
                      Qualification
                    </Badge>
                  </div>
                </div>
              </div>
              {selectedApplication.remarks && (
                <div>
                  <Label className="text-sm font-medium">Remarks</Label>
                  <p className="text-sm">{selectedApplication.remarks}</p>
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
              {actionType === "approve" ? "Approve" : "Reject"} Application
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>
              Are you sure you want to {actionType} the application for{" "}
              <strong>{selectedApplication?.studentName}</strong>?
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
