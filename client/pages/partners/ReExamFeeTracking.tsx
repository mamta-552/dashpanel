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
  CreditCard,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Download,
  Upload,
  Receipt,
} from "lucide-react";
import { toast } from "sonner";

interface ReExamFeeRecord {
  id: string;
  studentName: string;
  enrollmentNo: string;
  rollNumber: string;
  partnerName: string;
  partnerId: string;
  examName: string;
  reExamDate: string;
  course: string;
  batch: string;
  feeAmount: number;
  dueDate: string;
  paymentStatus: "pending" | "paid" | "overdue" | "verified" | "refunded";
  paymentDate?: string;
  paymentMethod?: string;
  transactionId?: string;
  receiptNumber?: string;
  verificationStatus: "pending" | "verified" | "rejected";
  verificationDate?: string;
  verifiedBy?: string;
  remarks?: string;
}

const mockFeeRecords: ReExamFeeRecord[] = [
  {
    id: "1",
    studentName: "Rahul Sharma",
    enrollmentNo: "WD2024001",
    rollNumber: "2024001",
    partnerName: "ABC Learning Center",
    partnerId: "ALC001",
    examName: "Web Development Final Re-Exam",
    reExamDate: "2024-02-15",
    course: "Web Development",
    batch: "2024-A",
    feeAmount: 1500,
    dueDate: "2024-02-10",
    paymentStatus: "paid",
    paymentDate: "2024-02-08",
    paymentMethod: "Online Banking",
    transactionId: "TXN123456789",
    receiptNumber: "REC001",
    verificationStatus: "verified",
    verificationDate: "2024-02-09",
    verifiedBy: "Admin",
  },
  {
    id: "2",
    studentName: "Priya Patel",
    enrollmentNo: "DS2024002",
    rollNumber: "2024002",
    partnerName: "XYZ Education Hub",
    partnerId: "ALC002",
    examName: "Data Science Mid-Term Re-Exam",
    reExamDate: "2024-02-20",
    course: "Data Science",
    batch: "2024-B",
    feeAmount: 1200,
    dueDate: "2024-02-15",
    paymentStatus: "paid",
    paymentDate: "2024-02-12",
    paymentMethod: "UPI",
    transactionId: "UPI987654321",
    receiptNumber: "REC002",
    verificationStatus: "pending",
  },
  {
    id: "3",
    studentName: "Amit Kumar",
    enrollmentNo: "UI2024003",
    rollNumber: "2024003",
    partnerName: "Tech Skills Institute",
    partnerId: "ALC003",
    examName: "UI/UX Design Re-Exam",
    reExamDate: "2024-02-25",
    course: "UI/UX Design",
    batch: "2024-A",
    feeAmount: 1300,
    dueDate: "2024-02-20",
    paymentStatus: "pending",
    verificationStatus: "pending",
  },
  {
    id: "4",
    studentName: "Sneha Gupta",
    enrollmentNo: "MD2024004",
    rollNumber: "2024004",
    partnerName: "ABC Learning Center",
    partnerId: "ALC001",
    examName: "Mobile Development Re-Exam",
    reExamDate: "2024-02-18",
    course: "Mobile Development",
    batch: "2024-B",
    feeAmount: 1400,
    dueDate: "2024-02-13",
    paymentStatus: "overdue",
    verificationStatus: "pending",
  },
];

export default function ReExamFeeTracking() {
  const [feeRecords, setFeeRecords] =
    useState<ReExamFeeRecord[]>(mockFeeRecords);
  const [selectedRecord, setSelectedRecord] = useState<ReExamFeeRecord | null>(
    null,
  );
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isVerificationDialogOpen, setIsVerificationDialogOpen] =
    useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPartner, setFilterPartner] = useState("all");
  const [filterVerification, setFilterVerification] = useState("all");

  const [paymentForm, setPaymentForm] = useState({
    paymentMethod: "",
    transactionId: "",
    paymentDate: "",
    receiptFile: null as File | null,
    remarks: "",
  });

  const [verificationForm, setVerificationForm] = useState({
    action: "verify",
    remarks: "",
  });

  const filteredRecords = feeRecords.filter((record) => {
    if (filterStatus !== "all" && record.paymentStatus !== filterStatus)
      return false;
    if (filterPartner !== "all" && record.partnerId !== filterPartner)
      return false;
    if (
      filterVerification !== "all" &&
      record.verificationStatus !== filterVerification
    )
      return false;
    return true;
  });

  const handlePaymentUpdate = (record: ReExamFeeRecord) => {
    setSelectedRecord(record);
    setPaymentForm({
      paymentMethod: "",
      transactionId: "",
      paymentDate: new Date().toISOString().split("T")[0],
      receiptFile: null,
      remarks: "",
    });
    setIsPaymentDialogOpen(true);
  };

  const submitPayment = () => {
    if (!selectedRecord) return;

    const updatedRecord = {
      ...selectedRecord,
      paymentStatus: "paid" as const,
      paymentDate: paymentForm.paymentDate,
      paymentMethod: paymentForm.paymentMethod,
      transactionId: paymentForm.transactionId,
      receiptNumber: `REC${Date.now()}`,
      verificationStatus: "pending" as const,
    };

    setFeeRecords(
      feeRecords.map((record) =>
        record.id === selectedRecord.id ? updatedRecord : record,
      ),
    );

    toast.success("Payment recorded successfully. Pending verification.");
    setIsPaymentDialogOpen(false);
    setSelectedRecord(null);
  };

  const handleVerification = (record: ReExamFeeRecord) => {
    setSelectedRecord(record);
    setVerificationForm({
      action: "verify",
      remarks: "",
    });
    setIsVerificationDialogOpen(true);
  };

  const submitVerification = () => {
    if (!selectedRecord) return;

    const updatedRecord = {
      ...selectedRecord,
      verificationStatus: verificationForm.action as "verified" | "rejected",
      verificationDate: new Date().toISOString().split("T")[0],
      verifiedBy: "Super Admin",
      remarks: verificationForm.remarks,
    };

    setFeeRecords(
      feeRecords.map((record) =>
        record.id === selectedRecord.id ? updatedRecord : record,
      ),
    );

    toast.success(
      `Payment ${verificationForm.action === "verify" ? "verified" : "rejected"} successfully`,
    );
    setIsVerificationDialogOpen(false);
    setSelectedRecord(null);
  };

  const viewRecord = (record: ReExamFeeRecord) => {
    setSelectedRecord(record);
    setIsViewDialogOpen(true);
  };

  const generateReceipt = (record: ReExamFeeRecord) => {
    // In a real application, this would generate and download a PDF receipt
    toast.success("Receipt downloaded successfully");
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
      case "verified":
        return "default";
      case "pending":
        return "secondary";
      case "overdue":
        return "destructive";
      case "refunded":
        return "outline";
      default:
        return "outline";
    }
  };

  const getVerificationStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "default";
      case "pending":
        return "secondary";
      case "rejected":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getDaysOverdue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = today.getTime() - due.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const getStats = () => {
    const totalAmount = filteredRecords.reduce(
      (sum, record) => sum + record.feeAmount,
      0,
    );
    const paidAmount = filteredRecords
      .filter(
        (r) => r.paymentStatus === "paid" || r.paymentStatus === "verified",
      )
      .reduce((sum, record) => sum + record.feeAmount, 0);
    const pendingAmount = filteredRecords
      .filter(
        (r) => r.paymentStatus === "pending" || r.paymentStatus === "overdue",
      )
      .reduce((sum, record) => sum + record.feeAmount, 0);
    const pendingVerification = filteredRecords.filter(
      (r) => r.verificationStatus === "pending",
    ).length;

    return { totalAmount, paidAmount, pendingAmount, pendingVerification };
  };

  const stats = getStats();
  const partners = Array.from(new Set(feeRecords.map((r) => r.partnerId)));

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Re-Exam Fee Tracking
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Track and verify re-exam fee payments by partner
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-xs font-medium text-gray-600">
                  Total Amount
                </p>
                <p className="text-lg font-bold">
                  ₹{stats.totalAmount.toLocaleString()}
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
                <p className="text-xs font-medium text-gray-600">Paid Amount</p>
                <p className="text-lg font-bold">
                  ₹{stats.paidAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-xs font-medium text-gray-600">
                  Pending Amount
                </p>
                <p className="text-lg font-bold">
                  ₹{stats.pendingAmount.toLocaleString()}
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
                <p className="text-xs font-medium text-gray-600">
                  Pending Verification
                </p>
                <p className="text-lg font-bold">{stats.pendingVerification}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fee Records Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Re-Exam Fee Records</span>
          </CardTitle>
          <div className="flex space-x-2">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Payment Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filterVerification}
              onValueChange={setFilterVerification}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Verification" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
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
                <TableHead>Fee Amount</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Verification</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{record.studentName}</div>
                      <div className="text-sm text-gray-500">
                        {record.enrollmentNo}
                      </div>
                      <div className="text-sm text-gray-500">
                        Roll: {record.rollNumber}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{record.partnerName}</div>
                      <div className="text-sm text-gray-500">
                        {record.partnerId}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{record.examName}</div>
                      <div className="text-sm text-gray-500">
                        Date: {record.reExamDate}
                      </div>
                      <div className="text-sm text-gray-500">
                        {record.course}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        ₹{record.feeAmount.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        Due: {record.dueDate}
                      </div>
                      {record.paymentStatus === "overdue" && (
                        <div className="text-sm text-red-500">
                          {getDaysOverdue(record.dueDate)} days overdue
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Badge
                        variant={getPaymentStatusColor(record.paymentStatus)}
                      >
                        {record.paymentStatus}
                      </Badge>
                      {record.paymentDate && (
                        <div className="text-sm text-gray-500">
                          Paid: {record.paymentDate}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={getVerificationStatusColor(
                        record.verificationStatus,
                      )}
                    >
                      {record.verificationStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => viewRecord(record)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {record.paymentStatus === "pending" ||
                      record.paymentStatus === "overdue" ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePaymentUpdate(record)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <CreditCard className="h-4 w-4" />
                        </Button>
                      ) : (
                        record.verificationStatus === "pending" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleVerification(record)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )
                      )}
                      {record.paymentStatus === "verified" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => generateReceipt(record)}
                        >
                          <Receipt className="h-4 w-4" />
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

      {/* View Record Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Re-Exam Fee Details</DialogTitle>
          </DialogHeader>
          {selectedRecord && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Student Name</Label>
                  <p className="text-sm">{selectedRecord.studentName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Enrollment No</Label>
                  <p className="text-sm">{selectedRecord.enrollmentNo}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Partner</Label>
                  <p className="text-sm">
                    {selectedRecord.partnerName} ({selectedRecord.partnerId})
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Fee Amount</Label>
                  <p className="text-sm font-bold">
                    ��{selectedRecord.feeAmount.toLocaleString()}
                  </p>
                </div>
              </div>

              {selectedRecord.paymentDate && (
                <div className="p-4 bg-green-50 border rounded-lg">
                  <Label className="text-sm font-medium">Payment Details</Label>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Payment Date</p>
                      <p className="font-medium">
                        {selectedRecord.paymentDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Payment Method</p>
                      <p className="font-medium">
                        {selectedRecord.paymentMethod}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Transaction ID</p>
                      <p className="font-medium font-mono">
                        {selectedRecord.transactionId}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Receipt Number</p>
                      <p className="font-medium">
                        {selectedRecord.receiptNumber}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedRecord.verificationDate && selectedRecord.verifiedBy && (
                <div className="p-4 bg-blue-50 border rounded-lg">
                  <Label className="text-sm font-medium">
                    Verification Details
                  </Label>
                  <div className="mt-2">
                    <p className="text-sm">
                      Verified by {selectedRecord.verifiedBy} on{" "}
                      {selectedRecord.verificationDate}
                    </p>
                    {selectedRecord.remarks && (
                      <p className="text-sm mt-2 p-2 bg-white rounded">
                        {selectedRecord.remarks}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Payment Update Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record Payment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedRecord && (
              <div className="p-3 bg-gray-50 rounded">
                <p className="font-medium">{selectedRecord.studentName}</p>
                <p className="text-sm text-gray-600">
                  Fee Amount: ₹{selectedRecord.feeAmount.toLocaleString()}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select
                  value={paymentForm.paymentMethod}
                  onValueChange={(value) =>
                    setPaymentForm({ ...paymentForm, paymentMethod: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online-banking">
                      Online Banking
                    </SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                    <SelectItem value="credit-card">Credit Card</SelectItem>
                    <SelectItem value="debit-card">Debit Card</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="cheque">Cheque</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentDate">Payment Date</Label>
                <Input
                  id="paymentDate"
                  type="date"
                  value={paymentForm.paymentDate}
                  onChange={(e) =>
                    setPaymentForm({
                      ...paymentForm,
                      paymentDate: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="transactionId">Transaction ID / Reference</Label>
              <Input
                id="transactionId"
                value={paymentForm.transactionId}
                onChange={(e) =>
                  setPaymentForm({
                    ...paymentForm,
                    transactionId: e.target.value,
                  })
                }
                placeholder="Enter transaction ID or reference number"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="receiptFile">Receipt Upload</Label>
              <Input
                id="receiptFile"
                type="file"
                accept="image/*,application/pdf"
                onChange={(e) =>
                  setPaymentForm({
                    ...paymentForm,
                    receiptFile: e.target.files?.[0] || null,
                  })
                }
              />
              <p className="text-sm text-gray-500">
                Upload payment receipt (optional)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentRemarks">Remarks</Label>
              <Textarea
                id="paymentRemarks"
                value={paymentForm.remarks}
                onChange={(e) =>
                  setPaymentForm({ ...paymentForm, remarks: e.target.value })
                }
                placeholder="Any additional notes about the payment..."
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsPaymentDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={submitPayment}>Record Payment</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Verification Dialog */}
      <Dialog
        open={isVerificationDialogOpen}
        onOpenChange={setIsVerificationDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Payment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedRecord && (
              <div className="p-3 bg-gray-50 rounded">
                <p className="font-medium">{selectedRecord.studentName}</p>
                <p className="text-sm text-gray-600">
                  Payment: ₹{selectedRecord.feeAmount.toLocaleString()} via{" "}
                  {selectedRecord.paymentMethod}
                </p>
                <p className="text-sm text-gray-600">
                  Transaction ID: {selectedRecord.transactionId}
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="verificationAction">Action</Label>
              <Select
                value={verificationForm.action}
                onValueChange={(value) =>
                  setVerificationForm({ ...verificationForm, action: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="verify">Verify Payment</SelectItem>
                  <SelectItem value="reject">Reject Payment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="verificationRemarks">Remarks</Label>
              <Textarea
                id="verificationRemarks"
                value={verificationForm.remarks}
                onChange={(e) =>
                  setVerificationForm({
                    ...verificationForm,
                    remarks: e.target.value,
                  })
                }
                placeholder={`Reason for ${verificationForm.action === "verify" ? "verifying" : "rejecting"} this payment...`}
                rows={3}
                required
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsVerificationDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={submitVerification}
                variant={
                  verificationForm.action === "verify"
                    ? "default"
                    : "destructive"
                }
              >
                {verificationForm.action === "verify" ? "Verify" : "Reject"}{" "}
                Payment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
