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
  DollarSign,
  AlertTriangle,
  Calendar,
  Phone,
  Mail,
  Eye,
  Send,
  Download,
} from "lucide-react";
import { toast } from "sonner";

interface PendingFeeRecord {
  id: string;
  studentName: string;
  enrollmentNo: string;
  partnerName: string;
  partnerId: string;
  course: string;
  batch: string;
  feeAmount: number;
  dueDate: string;
  daysOverdue: number;
  contactNo: string;
  email: string;
  lastReminder: string;
  reminderCount: number;
  status: "due" | "overdue" | "critical";
}

const mockPendingFees: PendingFeeRecord[] = [
  {
    id: "1",
    studentName: "Rahul Sharma",
    enrollmentNo: "WD2024001",
    partnerName: "ABC Learning Center",
    partnerId: "ALC001",
    course: "Web Development",
    batch: "2024-A",
    feeAmount: 15000,
    dueDate: "2024-01-15",
    daysOverdue: 5,
    contactNo: "9876543210",
    email: "rahul@email.com",
    lastReminder: "2024-01-18",
    reminderCount: 2,
    status: "overdue",
  },
  {
    id: "2",
    studentName: "Priya Patel",
    enrollmentNo: "DS2024002",
    partnerName: "XYZ Education Hub",
    partnerId: "ALC002",
    course: "Data Science",
    batch: "2024-B",
    feeAmount: 18000,
    dueDate: "2024-01-25",
    daysOverdue: 0,
    contactNo: "9876543211",
    email: "priya@email.com",
    lastReminder: "2024-01-20",
    reminderCount: 1,
    status: "due",
  },
  {
    id: "3",
    studentName: "Amit Kumar",
    enrollmentNo: "UI2024003",
    partnerName: "Tech Skills Institute",
    partnerId: "ALC003",
    course: "UI/UX Design",
    batch: "2024-A",
    feeAmount: 12000,
    dueDate: "2024-01-10",
    daysOverdue: 10,
    contactNo: "9876543212",
    email: "amit@email.com",
    lastReminder: "2024-01-15",
    reminderCount: 3,
    status: "critical",
  },
];

export default function PendingFee() {
  const [pendingFees, setPendingFees] =
    useState<PendingFeeRecord[]>(mockPendingFees);
  const [selectedRecord, setSelectedRecord] = useState<PendingFeeRecord | null>(
    null,
  );
  const [isReminderDialogOpen, setIsReminderDialogOpen] = useState(false);
  const [reminderMessage, setReminderMessage] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPartner, setFilterPartner] = useState("all");

  const filteredRecords = pendingFees.filter((record) => {
    if (filterStatus !== "all" && record.status !== filterStatus) return false;
    if (filterPartner !== "all" && record.partnerId !== filterPartner)
      return false;
    return true;
  });

  const handleSendReminder = (record: PendingFeeRecord) => {
    setSelectedRecord(record);
    setReminderMessage(
      `Dear ${record.studentName}, your fee payment of ₹${record.feeAmount} for ${record.course} is pending. Please clear your dues at the earliest.`,
    );
    setIsReminderDialogOpen(true);
  };

  const sendReminder = () => {
    if (!selectedRecord) return;

    setPendingFees(
      pendingFees.map((record) =>
        record.id === selectedRecord.id
          ? {
              ...record,
              lastReminder: new Date().toISOString().split("T")[0],
              reminderCount: record.reminderCount + 1,
            }
          : record,
      ),
    );

    toast.success("Reminder sent successfully");
    setIsReminderDialogOpen(false);
    setReminderMessage("");
    setSelectedRecord(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "due":
        return "secondary";
      case "overdue":
        return "destructive";
      case "critical":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "due":
        return <Calendar className="h-4 w-4" />;
      case "overdue":
      case "critical":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  const getTotalStats = () => {
    const total = filteredRecords.reduce(
      (sum, record) => sum + record.feeAmount,
      0,
    );
    const overdue = filteredRecords.filter(
      (r) => r.status === "overdue" || r.status === "critical",
    ).length;
    const critical = filteredRecords.filter(
      (r) => r.status === "critical",
    ).length;

    return { total, overdue, critical, count: filteredRecords.length };
  };

  const stats = getTotalStats();
  const partners = Array.from(new Set(pendingFees.map((r) => r.partnerId)));

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Pending Fee Management
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Track and follow up on pending fee payments across partners
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
                  Total Pending
                </p>
                <p className="text-lg font-bold">
                  ₹{stats.total.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-xs font-medium text-gray-600">
                  Total Records
                </p>
                <p className="text-lg font-bold">{stats.count}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-xs font-medium text-gray-600">Overdue</p>
                <p className="text-lg font-bold">{stats.overdue}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-xs font-medium text-gray-600">Critical</p>
                <p className="text-lg font-bold">{stats.critical}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Fees Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5" />
            <span>Pending Fee Records</span>
          </CardTitle>
          <div className="flex space-x-2">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="due">Due</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
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
                <TableHead>Course</TableHead>
                <TableHead>Fee Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Reminder</TableHead>
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
                      <div>{record.course}</div>
                      <div className="text-sm text-gray-500">
                        Batch: {record.batch}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    ₹{record.feeAmount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>{record.dueDate}</div>
                      {record.daysOverdue > 0 && (
                        <div className="text-sm text-red-500">
                          {record.daysOverdue} days overdue
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(record.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(record.status)}
                        <span>{record.status}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm">{record.lastReminder}</div>
                      <div className="text-xs text-gray-500">
                        {record.reminderCount} reminders sent
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSendReminder(record)}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Send Reminder Dialog */}
      <Dialog
        open={isReminderDialogOpen}
        onOpenChange={setIsReminderDialogOpen}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Send Fee Reminder</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedRecord && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium">{selectedRecord.studentName}</h4>
                <p className="text-sm text-gray-600">
                  Fee Amount: ₹{selectedRecord.feeAmount.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  Due Date: {selectedRecord.dueDate}
                </p>
                <p className="text-sm text-gray-600">
                  Contact: {selectedRecord.contactNo}
                </p>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="reminderMessage">Reminder Message</Label>
              <Textarea
                id="reminderMessage"
                value={reminderMessage}
                onChange={(e) => setReminderMessage(e.target.value)}
                rows={4}
                placeholder="Enter reminder message..."
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsReminderDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={sendReminder}>
                <Send className="h-4 w-4 mr-2" />
                Send Reminder
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
