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
  FileText,
  Calendar,
  Users,
  Award,
  Plus,
  Edit,
  Trash2,
  Eye,
  Play,
  Square,
} from "lucide-react";
import { toast } from "sonner";

interface PartnerExam {
  id: string;
  examName: string;
  examCode: string;
  partnerId: string;
  partnerName: string;
  course: string;
  batch: string;
  examDate: string;
  startTime: string;
  duration: number; // minutes
  totalMarks: number;
  passingMarks: number;
  instructions: string;
  status: "scheduled" | "active" | "completed" | "cancelled";
  registeredStudents: number;
  completedStudents: number;
  createdDate: string;
}

const mockExams: PartnerExam[] = [
  {
    id: "1",
    examName: "Web Development Final Exam",
    examCode: "WD-FINAL-2024",
    partnerId: "ALC001",
    partnerName: "ABC Learning Center",
    course: "Web Development",
    batch: "2024-A",
    examDate: "2024-02-15",
    startTime: "10:00",
    duration: 180,
    totalMarks: 100,
    passingMarks: 40,
    instructions: "Answer all questions. No external help allowed.",
    status: "scheduled",
    registeredStudents: 25,
    completedStudents: 0,
    createdDate: "2024-01-20",
  },
  {
    id: "2",
    examName: "Data Science Mid-Term",
    examCode: "DS-MID-2024",
    partnerId: "ALC002",
    partnerName: "XYZ Education Hub",
    course: "Data Science",
    batch: "2024-B",
    examDate: "2024-02-10",
    startTime: "14:00",
    duration: 120,
    totalMarks: 80,
    passingMarks: 32,
    instructions: "Calculator allowed. Show all working.",
    status: "active",
    registeredStudents: 18,
    completedStudents: 12,
    createdDate: "2024-01-18",
  },
  {
    id: "3",
    examName: "UI/UX Design Assessment",
    examCode: "UI-ASSESS-2024",
    partnerId: "ALC003",
    partnerName: "Tech Skills Institute",
    course: "UI/UX Design",
    batch: "2024-A",
    examDate: "2024-01-25",
    startTime: "09:00",
    duration: 150,
    totalMarks: 75,
    passingMarks: 30,
    instructions: "Design tools allowed. Submit all deliverables.",
    status: "completed",
    registeredStudents: 15,
    completedStudents: 15,
    createdDate: "2024-01-15",
  },
];

export default function ExamsManagement() {
  const [exams, setExams] = useState<PartnerExam[]>(mockExams);
  const [isExamDialogOpen, setIsExamDialogOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<PartnerExam | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPartner, setFilterPartner] = useState("all");

  const [examForm, setExamForm] = useState({
    examName: "",
    examCode: "",
    partnerId: "",
    course: "",
    batch: "",
    examDate: "",
    startTime: "",
    duration: "",
    totalMarks: "",
    passingMarks: "",
    instructions: "",
  });

  const filteredExams = exams.filter((exam) => {
    if (filterStatus !== "all" && exam.status !== filterStatus) return false;
    if (filterPartner !== "all" && exam.partnerId !== filterPartner)
      return false;
    return true;
  });

  const handleExamSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingExam) {
      setExams(
        exams.map((exam) =>
          exam.id === editingExam.id
            ? {
                ...exam,
                ...examForm,
                duration: parseInt(examForm.duration),
                totalMarks: parseInt(examForm.totalMarks),
                passingMarks: parseInt(examForm.passingMarks),
              }
            : exam,
        ),
      );
      toast.success("Exam updated successfully");
    } else {
      const newExam: PartnerExam = {
        id: Date.now().toString(),
        ...examForm,
        partnerName: getPartnerName(examForm.partnerId),
        duration: parseInt(examForm.duration),
        totalMarks: parseInt(examForm.totalMarks),
        passingMarks: parseInt(examForm.passingMarks),
        status: "scheduled",
        registeredStudents: 0,
        completedStudents: 0,
        createdDate: new Date().toISOString().split("T")[0],
      };
      setExams([...exams, newExam]);
      toast.success("Exam created successfully");
    }
    resetExamForm();
  };

  const resetExamForm = () => {
    setExamForm({
      examName: "",
      examCode: "",
      partnerId: "",
      course: "",
      batch: "",
      examDate: "",
      startTime: "",
      duration: "",
      totalMarks: "",
      passingMarks: "",
      instructions: "",
    });
    setEditingExam(null);
    setIsExamDialogOpen(false);
  };

  const editExam = (exam: PartnerExam) => {
    setExamForm({
      examName: exam.examName,
      examCode: exam.examCode,
      partnerId: exam.partnerId,
      course: exam.course,
      batch: exam.batch,
      examDate: exam.examDate,
      startTime: exam.startTime,
      duration: exam.duration.toString(),
      totalMarks: exam.totalMarks.toString(),
      passingMarks: exam.passingMarks.toString(),
      instructions: exam.instructions,
    });
    setEditingExam(exam);
    setIsExamDialogOpen(true);
  };

  const deleteExam = (examId: string) => {
    setExams(exams.filter((exam) => exam.id !== examId));
    toast.success("Exam deleted successfully");
  };

  const startExam = (examId: string) => {
    setExams(
      exams.map((exam) =>
        exam.id === examId ? { ...exam, status: "active" } : exam,
      ),
    );
    toast.success("Exam started successfully");
  };

  const endExam = (examId: string) => {
    setExams(
      exams.map((exam) =>
        exam.id === examId
          ? {
              ...exam,
              status: "completed",
              completedStudents: exam.registeredStudents,
            }
          : exam,
      ),
    );
    toast.success("Exam ended successfully");
  };

  const cancelExam = (examId: string) => {
    setExams(
      exams.map((exam) =>
        exam.id === examId ? { ...exam, status: "cancelled" } : exam,
      ),
    );
    toast.success("Exam cancelled successfully");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "secondary";
      case "active":
        return "default";
      case "completed":
        return "outline";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getPartnerName = (partnerId: string) => {
    const partnerMap: Record<string, string> = {
      ALC001: "ABC Learning Center",
      ALC002: "XYZ Education Hub",
      ALC003: "Tech Skills Institute",
    };
    return partnerMap[partnerId] || partnerId;
  };

  const getStats = () => {
    const scheduled = filteredExams.filter(
      (e) => e.status === "scheduled",
    ).length;
    const active = filteredExams.filter((e) => e.status === "active").length;
    const completed = filteredExams.filter(
      (e) => e.status === "completed",
    ).length;
    const total = filteredExams.length;
    return { scheduled, active, completed, total };
  };

  const stats = getStats();
  const partners = Array.from(new Set(exams.map((e) => e.partnerId)));

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Exams Management
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Create, update, and manage exams per partner
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-xs font-medium text-gray-600">Scheduled</p>
                <p className="text-lg font-bold">{stats.scheduled}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-green-500" />
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
              <Award className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-xs font-medium text-gray-600">Completed</p>
                <p className="text-lg font-bold">{stats.completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-xs font-medium text-gray-600">Total</p>
                <p className="text-lg font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Exams Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Partner Exams</span>
          </CardTitle>
          <div className="flex space-x-2">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
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
            <Dialog open={isExamDialogOpen} onOpenChange={setIsExamDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Exam
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingExam ? "Edit Exam" : "Create New Exam"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleExamSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="examName">Exam Name</Label>
                      <Input
                        id="examName"
                        value={examForm.examName}
                        onChange={(e) =>
                          setExamForm({ ...examForm, examName: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="examCode">Exam Code</Label>
                      <Input
                        id="examCode"
                        value={examForm.examCode}
                        onChange={(e) =>
                          setExamForm({ ...examForm, examCode: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="partnerId">Partner</Label>
                      <Select
                        value={examForm.partnerId}
                        onValueChange={(value) =>
                          setExamForm({ ...examForm, partnerId: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select partner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ALC001">
                            ABC Learning Center
                          </SelectItem>
                          <SelectItem value="ALC002">
                            XYZ Education Hub
                          </SelectItem>
                          <SelectItem value="ALC003">
                            Tech Skills Institute
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="course">Course</Label>
                      <Select
                        value={examForm.course}
                        onValueChange={(value) =>
                          setExamForm({ ...examForm, course: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select course" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Web Development">
                            Web Development
                          </SelectItem>
                          <SelectItem value="Data Science">
                            Data Science
                          </SelectItem>
                          <SelectItem value="UI/UX Design">
                            UI/UX Design
                          </SelectItem>
                          <SelectItem value="Mobile Development">
                            Mobile Development
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="batch">Batch</Label>
                      <Select
                        value={examForm.batch}
                        onValueChange={(value) =>
                          setExamForm({ ...examForm, batch: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select batch" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2024-A">2024-A</SelectItem>
                          <SelectItem value="2024-B">2024-B</SelectItem>
                          <SelectItem value="2024-C">2024-C</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="examDate">Exam Date</Label>
                      <Input
                        id="examDate"
                        type="date"
                        value={examForm.examDate}
                        onChange={(e) =>
                          setExamForm({ ...examForm, examDate: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="startTime">Start Time</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={examForm.startTime}
                        onChange={(e) =>
                          setExamForm({
                            ...examForm,
                            startTime: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (minutes)</Label>
                      <Input
                        id="duration"
                        type="number"
                        value={examForm.duration}
                        onChange={(e) =>
                          setExamForm({ ...examForm, duration: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="totalMarks">Total Marks</Label>
                      <Input
                        id="totalMarks"
                        type="number"
                        value={examForm.totalMarks}
                        onChange={(e) =>
                          setExamForm({
                            ...examForm,
                            totalMarks: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="passingMarks">Passing Marks</Label>
                      <Input
                        id="passingMarks"
                        type="number"
                        value={examForm.passingMarks}
                        onChange={(e) =>
                          setExamForm({
                            ...examForm,
                            passingMarks: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instructions">Instructions</Label>
                    <Textarea
                      id="instructions"
                      value={examForm.instructions}
                      onChange={(e) =>
                        setExamForm({
                          ...examForm,
                          instructions: e.target.value,
                        })
                      }
                      placeholder="Enter exam instructions..."
                      rows={3}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetExamForm}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingExam ? "Update Exam" : "Create Exam"}
                    </Button>
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
                <TableHead>Exam Details</TableHead>
                <TableHead>Partner</TableHead>
                <TableHead>Course & Batch</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExams.map((exam) => (
                <TableRow key={exam.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{exam.examName}</div>
                      <div className="text-sm text-gray-500">
                        {exam.examCode}
                      </div>
                      <div className="text-sm text-gray-500">
                        {exam.totalMarks} marks
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{exam.partnerName}</div>
                      <div className="text-sm text-gray-500">
                        {exam.partnerId}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>{exam.course}</div>
                      <div className="text-sm text-gray-500">
                        Batch: {exam.batch}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>{exam.examDate}</div>
                      <div className="text-sm text-gray-500">
                        {exam.startTime}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{exam.duration} min</TableCell>
                  <TableCell>
                    <div>
                      <div>
                        {exam.completedStudents}/{exam.registeredStudents}
                      </div>
                      <div className="text-sm text-gray-500">completed</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(exam.status)}>
                      {exam.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editExam(exam)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {exam.status === "scheduled" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => startExam(exam.id)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      )}
                      {exam.status === "active" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => endExam(exam.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Square className="h-4 w-4" />
                        </Button>
                      )}
                      {exam.status === "scheduled" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteExam(exam.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
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
    </div>
  );
}
