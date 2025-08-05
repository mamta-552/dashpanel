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
  Receipt,
  Download,
  Upload,
  FileText,
  Eye,
  Plus,
  Search,
  Filter,
} from "lucide-react";
import { toast } from "sonner";

interface DocumentRecord {
  id: string;
  studentName: string;
  enrollmentNo: string;
  rollNumber: string;
  partnerName: string;
  partnerId: string;
  documentType:
    | "fee-receipt"
    | "application-form"
    | "admission-form"
    | "certificate"
    | "other";
  documentName: string;
  course: string;
  batch: string;
  amount?: number;
  feeType?: string;
  academicYear: string;
  uploadDate: string;
  uploadedBy: string;
  fileSize: string;
  fileFormat: string;
  status: "active" | "archived" | "expired";
  downloadCount: number;
  lastDownloaded?: string;
  notes?: string;
}

const mockDocuments: DocumentRecord[] = [
  {
    id: "1",
    studentName: "Rahul Sharma",
    enrollmentNo: "WD2024001",
    rollNumber: "2024001",
    partnerName: "ABC Learning Center",
    partnerId: "ALC001",
    documentType: "fee-receipt",
    documentName: "Tuition Fee Receipt - Q1 2024",
    course: "Web Development",
    batch: "2024-A",
    amount: 25000,
    feeType: "Tuition Fee",
    academicYear: "2024-25",
    uploadDate: "2024-01-15",
    uploadedBy: "Partner Admin",
    fileSize: "245 KB",
    fileFormat: "PDF",
    status: "active",
    downloadCount: 3,
    lastDownloaded: "2024-01-20",
  },
  {
    id: "2",
    studentName: "Priya Patel",
    enrollmentNo: "DS2024002",
    rollNumber: "2024002",
    partnerName: "XYZ Education Hub",
    partnerId: "ALC002",
    documentType: "application-form",
    documentName: "Course Application Form",
    course: "Data Science",
    batch: "2024-B",
    academicYear: "2024-25",
    uploadDate: "2024-01-10",
    uploadedBy: "Student",
    fileSize: "1.2 MB",
    fileFormat: "PDF",
    status: "active",
    downloadCount: 1,
    lastDownloaded: "2024-01-18",
  },
  {
    id: "3",
    studentName: "Amit Kumar",
    enrollmentNo: "UI2024003",
    rollNumber: "2024003",
    partnerName: "Tech Skills Institute",
    partnerId: "ALC003",
    documentType: "fee-receipt",
    documentName: "Exam Fee Receipt",
    course: "UI/UX Design",
    batch: "2024-A",
    amount: 5000,
    feeType: "Exam Fee",
    academicYear: "2024-25",
    uploadDate: "2024-01-12",
    uploadedBy: "Finance Team",
    fileSize: "180 KB",
    fileFormat: "PDF",
    status: "active",
    downloadCount: 2,
    lastDownloaded: "2024-01-19",
  },
  {
    id: "4",
    studentName: "Sneha Gupta",
    enrollmentNo: "MD2024004",
    rollNumber: "2024004",
    partnerName: "ABC Learning Center",
    partnerId: "ALC001",
    documentType: "certificate",
    documentName: "Course Completion Certificate",
    course: "Mobile Development",
    batch: "2023-B",
    academicYear: "2023-24",
    uploadDate: "2024-01-08",
    uploadedBy: "Academic Office",
    fileSize: "890 KB",
    fileFormat: "PDF",
    status: "active",
    downloadCount: 5,
    lastDownloaded: "2024-01-21",
  },
];

export default function FeeReceipts() {
  const [documents, setDocuments] = useState<DocumentRecord[]>(mockDocuments);
  const [selectedDocument, setSelectedDocument] =
    useState<DocumentRecord | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [filterPartner, setFilterPartner] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const [uploadForm, setUploadForm] = useState({
    studentEnrollmentNo: "",
    documentType: "fee-receipt",
    documentName: "",
    amount: "",
    feeType: "",
    academicYear: "2024-25",
    file: null as File | null,
    notes: "",
  });

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.enrollmentNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.documentName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === "all" || doc.documentType === filterType;
    const matchesPartner =
      filterPartner === "all" || doc.partnerId === filterPartner;
    const matchesStatus = filterStatus === "all" || doc.status === filterStatus;

    return matchesSearch && matchesType && matchesPartner && matchesStatus;
  });

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();

    if (!uploadForm.file) {
      toast.error("Please select a file to upload");
      return;
    }

    // Find student info (in real app, this would be from a database)
    const studentInfo = {
      studentName: "New Student", // This would be fetched based on enrollment number
      rollNumber: "2024005",
      partnerName: "ABC Learning Center",
      partnerId: "ALC001",
      course: "Web Development",
      batch: "2024-A",
    };

    const newDocument: DocumentRecord = {
      id: Date.now().toString(),
      ...studentInfo,
      enrollmentNo: uploadForm.studentEnrollmentNo,
      documentType: uploadForm.documentType as DocumentRecord["documentType"],
      documentName: uploadForm.documentName,
      amount: uploadForm.amount ? parseInt(uploadForm.amount) : undefined,
      feeType: uploadForm.feeType || undefined,
      academicYear: uploadForm.academicYear,
      uploadDate: new Date().toISOString().split("T")[0],
      uploadedBy: "Admin",
      fileSize: `${Math.round(uploadForm.file.size / 1024)} KB`,
      fileFormat: uploadForm.file.name.split(".").pop()?.toUpperCase() || "PDF",
      status: "active",
      downloadCount: 0,
      notes: uploadForm.notes,
    };

    setDocuments([...documents, newDocument]);
    toast.success("Document uploaded successfully");
    resetUploadForm();
  };

  const resetUploadForm = () => {
    setUploadForm({
      studentEnrollmentNo: "",
      documentType: "fee-receipt",
      documentName: "",
      amount: "",
      feeType: "",
      academicYear: "2024-25",
      file: null,
      notes: "",
    });
    setIsUploadDialogOpen(false);
  };

  const handleDownload = (doc: DocumentRecord) => {
    // Update download count
    setDocuments(
      documents.map((d) =>
        d.id === doc.id
          ? {
              ...d,
              downloadCount: d.downloadCount + 1,
              lastDownloaded: new Date().toISOString().split("T")[0],
            }
          : d,
      ),
    );

    // In real app, this would trigger actual file download
    toast.success(`${doc.documentName} downloaded successfully`);
  };

  const viewDocument = (doc: DocumentRecord) => {
    setSelectedDocument(doc);
    setIsViewDialogOpen(true);
  };

  const generateBulkReceipts = () => {
    toast.success(
      "Bulk receipt generation started. You will be notified when ready.",
    );
  };

  const getDocumentTypeColor = (type: string) => {
    switch (type) {
      case "fee-receipt":
        return "default";
      case "application-form":
        return "secondary";
      case "certificate":
        return "outline";
      case "admission-form":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "archived":
        return "secondary";
      case "expired":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStats = () => {
    const totalDocuments = filteredDocuments.length;
    const feeReceipts = filteredDocuments.filter(
      (d) => d.documentType === "fee-receipt",
    ).length;
    const applicationForms = filteredDocuments.filter(
      (d) => d.documentType === "application-form",
    ).length;
    const totalDownloads = filteredDocuments.reduce(
      (sum, d) => sum + d.downloadCount,
      0,
    );

    return { totalDocuments, feeReceipts, applicationForms, totalDownloads };
  };

  const stats = getStats();
  const partners = Array.from(new Set(documents.map((d) => d.partnerId)));

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Fee Receipts & Applications
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Upload, download and manage student documents by partner
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-xs font-medium text-gray-600">
                  Total Documents
                </p>
                <p className="text-lg font-bold">{stats.totalDocuments}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Receipt className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-xs font-medium text-gray-600">
                  Fee Receipts
                </p>
                <p className="text-lg font-bold">{stats.feeReceipts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-xs font-medium text-gray-600">
                  Application Forms
                </p>
                <p className="text-lg font-bold">{stats.applicationForms}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Download className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-xs font-medium text-gray-600">
                  Total Downloads
                </p>
                <p className="text-lg font-bold">{stats.totalDownloads}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by student name, enrollment number, or document name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Document Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="fee-receipt">Fee Receipts</SelectItem>
            <SelectItem value="application-form">Application Forms</SelectItem>
            <SelectItem value="admission-form">Admission Forms</SelectItem>
            <SelectItem value="certificate">Certificates</SelectItem>
            <SelectItem value="other">Other</SelectItem>
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
      </div>

      {/* Documents Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Receipt className="h-5 w-5" />
            <span>Document Management</span>
          </CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={generateBulkReceipts}>
              <Download className="h-4 w-4 mr-2" />
              Bulk Generate
            </Button>
            <Dialog
              open={isUploadDialogOpen}
              onOpenChange={setIsUploadDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Document
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Upload Document</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleUpload} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="studentEnrollmentNo">
                        Student Enrollment No
                      </Label>
                      <Input
                        id="studentEnrollmentNo"
                        value={uploadForm.studentEnrollmentNo}
                        onChange={(e) =>
                          setUploadForm({
                            ...uploadForm,
                            studentEnrollmentNo: e.target.value,
                          })
                        }
                        placeholder="WD2024001"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="documentType">Document Type</Label>
                      <Select
                        value={uploadForm.documentType}
                        onValueChange={(value) =>
                          setUploadForm({ ...uploadForm, documentType: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fee-receipt">
                            Fee Receipt
                          </SelectItem>
                          <SelectItem value="application-form">
                            Application Form
                          </SelectItem>
                          <SelectItem value="admission-form">
                            Admission Form
                          </SelectItem>
                          <SelectItem value="certificate">
                            Certificate
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="documentName">Document Name</Label>
                    <Input
                      id="documentName"
                      value={uploadForm.documentName}
                      onChange={(e) =>
                        setUploadForm({
                          ...uploadForm,
                          documentName: e.target.value,
                        })
                      }
                      placeholder="Enter descriptive document name"
                      required
                    />
                  </div>

                  {uploadForm.documentType === "fee-receipt" && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                          id="amount"
                          type="number"
                          value={uploadForm.amount}
                          onChange={(e) =>
                            setUploadForm({
                              ...uploadForm,
                              amount: e.target.value,
                            })
                          }
                          placeholder="25000"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="feeType">Fee Type</Label>
                        <Select
                          value={uploadForm.feeType}
                          onValueChange={(value) =>
                            setUploadForm({ ...uploadForm, feeType: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select fee type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Tuition Fee">
                              Tuition Fee
                            </SelectItem>
                            <SelectItem value="Exam Fee">Exam Fee</SelectItem>
                            <SelectItem value="Lab Fee">Lab Fee</SelectItem>
                            <SelectItem value="Library Fee">
                              Library Fee
                            </SelectItem>
                            <SelectItem value="Development Fee">
                              Development Fee
                            </SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="academicYear">Academic Year</Label>
                    <Select
                      value={uploadForm.academicYear}
                      onValueChange={(value) =>
                        setUploadForm({ ...uploadForm, academicYear: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024-25">2024-25</SelectItem>
                        <SelectItem value="2023-24">2023-24</SelectItem>
                        <SelectItem value="2022-23">2022-23</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="file">Document File</Label>
                    <Input
                      id="file"
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.png"
                      onChange={(e) =>
                        setUploadForm({
                          ...uploadForm,
                          file: e.target.files?.[0] || null,
                        })
                      }
                      required
                    />
                    <p className="text-sm text-gray-500">
                      Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      value={uploadForm.notes}
                      onChange={(e) =>
                        setUploadForm({ ...uploadForm, notes: e.target.value })
                      }
                      placeholder="Any additional notes about this document..."
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetUploadForm}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Upload Document</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Details</TableHead>
                <TableHead>Partner</TableHead>
                <TableHead>Document Info</TableHead>
                <TableHead>Upload Details</TableHead>
                <TableHead>Download Stats</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{doc.studentName}</div>
                      <div className="text-sm text-gray-500">
                        {doc.enrollmentNo}
                      </div>
                      <div className="text-sm text-gray-500">
                        Roll: {doc.rollNumber}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{doc.partnerName}</div>
                      <div className="text-sm text-gray-500">
                        {doc.partnerId}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{doc.documentName}</div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant={getDocumentTypeColor(doc.documentType)}>
                          {doc.documentType.replace("-", " ")}
                        </Badge>
                        {doc.amount && (
                          <span className="text-sm text-green-600">
                            ₹{doc.amount.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {doc.course} - {doc.batch}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm">
                        <span className="font-medium">Uploaded:</span>{" "}
                        {doc.uploadDate}
                      </div>
                      <div className="text-sm text-gray-500">
                        By: {doc.uploadedBy}
                      </div>
                      <div className="text-sm text-gray-500">
                        {doc.fileSize} • {doc.fileFormat}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm font-medium">
                        {doc.downloadCount} downloads
                      </div>
                      {doc.lastDownloaded && (
                        <div className="text-sm text-gray-500">
                          Last: {doc.lastDownloaded}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(doc.status)}>
                      {doc.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => viewDocument(doc)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownload(doc)}
                        className="text-blue-600 hover:text-blue-700"
                      >
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

      {/* View Document Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Document Details</DialogTitle>
          </DialogHeader>
          {selectedDocument && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Student Name</Label>
                  <p className="text-sm">{selectedDocument.studentName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Enrollment No</Label>
                  <p className="text-sm">{selectedDocument.enrollmentNo}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Partner</Label>
                  <p className="text-sm">
                    {selectedDocument.partnerName} ({selectedDocument.partnerId}
                    )
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Course</Label>
                  <p className="text-sm">
                    {selectedDocument.course} - {selectedDocument.batch}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 border rounded-lg">
                <Label className="text-sm font-medium">
                  Document Information
                </Label>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Name:</span>
                    <span className="text-sm font-medium">
                      {selectedDocument.documentName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Type:</span>
                    <Badge
                      variant={getDocumentTypeColor(
                        selectedDocument.documentType,
                      )}
                    >
                      {selectedDocument.documentType.replace("-", " ")}
                    </Badge>
                  </div>
                  {selectedDocument.amount && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Amount:</span>
                      <span className="text-sm font-medium text-green-600">
                        ₹{selectedDocument.amount.toLocaleString()}
                      </span>
                    </div>
                  )}
                  {selectedDocument.feeType && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Fee Type:</span>
                      <span className="text-sm">
                        {selectedDocument.feeType}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Academic Year:
                    </span>
                    <span className="text-sm">
                      {selectedDocument.academicYear}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">File Size:</span>
                    <span className="text-sm">{selectedDocument.fileSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Format:</span>
                    <span className="text-sm">
                      {selectedDocument.fileFormat}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border rounded-lg">
                <Label className="text-sm font-medium">Usage Statistics</Label>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Upload Date:</span>
                    <span className="text-sm">
                      {selectedDocument.uploadDate}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Uploaded By:</span>
                    <span className="text-sm">
                      {selectedDocument.uploadedBy}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Downloads:</span>
                    <span className="text-sm font-medium">
                      {selectedDocument.downloadCount}
                    </span>
                  </div>
                  {selectedDocument.lastDownloaded && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        Last Downloaded:
                      </span>
                      <span className="text-sm">
                        {selectedDocument.lastDownloaded}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {selectedDocument.notes && (
                <div>
                  <Label className="text-sm font-medium">Notes</Label>
                  <p className="text-sm mt-1 p-3 bg-yellow-50 rounded">
                    {selectedDocument.notes}
                  </p>
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => handleDownload(selectedDocument)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button onClick={() => setIsViewDialogOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
