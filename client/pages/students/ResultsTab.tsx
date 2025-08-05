import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { FileText, Plus, Edit, Trash2, Download } from "lucide-react";
import { toast } from "sonner";

interface Result {
  id: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  examName: string;
  subject: string;
  marks: number;
  totalMarks: number;
  grade: string;
  examDate: string;
  percentage: number;
}

const mockResults: Result[] = [
  {
    id: "1",
    studentId: "1",
    studentName: "Aarav Sharma",
    rollNumber: "2024001",
    examName: "Mid-Term Exam",
    subject: "Web Development",
    marks: 85,
    totalMarks: 100,
    grade: "A",
    examDate: "2024-02-15",
    percentage: 85,
  },
  {
    id: "2",
    studentId: "2",
    studentName: "Priya Patel",
    rollNumber: "2024002",
    examName: "Final Exam",
    subject: "Data Science",
    marks: 92,
    totalMarks: 100,
    grade: "A+",
    examDate: "2024-02-20",
    percentage: 92,
  },
];

export default function ResultsTab() {
  const [results, setResults] = useState<Result[]>(mockResults);
  const [isResultDialogOpen, setIsResultDialogOpen] = useState(false);
  const [editingResult, setEditingResult] = useState<Result | null>(null);
  const [resultForm, setResultForm] = useState({
    studentName: "",
    rollNumber: "",
    examName: "",
    subject: "",
    marks: "",
    totalMarks: "",
    examDate: "",
  });

  const calculateGrade = (percentage: number): string => {
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B+";
    if (percentage >= 60) return "B";
    if (percentage >= 50) return "C";
    return "F";
  };

  const handleResultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const marks = parseInt(resultForm.marks);
    const totalMarks = parseInt(resultForm.totalMarks);
    const percentage = (marks / totalMarks) * 100;
    const grade = calculateGrade(percentage);

    if (editingResult) {
      setResults(
        results.map((result) =>
          result.id === editingResult.id
            ? {
                ...result,
                ...resultForm,
                marks,
                totalMarks,
                percentage,
                grade,
              }
            : result,
        ),
      );
      toast.success("Result updated successfully");
    } else {
      const newResult: Result = {
        id: Date.now().toString(),
        studentId: Date.now().toString(),
        ...resultForm,
        marks,
        totalMarks,
        percentage,
        grade,
      };
      setResults([...results, newResult]);
      toast.success("Result added successfully");
    }
    resetResultForm();
  };

  const resetResultForm = () => {
    setResultForm({
      studentName: "",
      rollNumber: "",
      examName: "",
      subject: "",
      marks: "",
      totalMarks: "",
      examDate: "",
    });
    setEditingResult(null);
    setIsResultDialogOpen(false);
  };

  const editResult = (result: Result) => {
    setResultForm({
      studentName: result.studentName,
      rollNumber: result.rollNumber,
      examName: result.examName,
      subject: result.subject,
      marks: result.marks.toString(),
      totalMarks: result.totalMarks.toString(),
      examDate: result.examDate,
    });
    setEditingResult(result);
    setIsResultDialogOpen(true);
  };

  const deleteResult = (resultId: string) => {
    setResults(results.filter((result) => result.id !== resultId));
    toast.success("Result deleted successfully");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Student Results
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage exam results, grades, and academic performance
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Exam Results</span>
          </CardTitle>
          <Dialog
            open={isResultDialogOpen}
            onOpenChange={setIsResultDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Result
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingResult ? "Edit Result" : "Add New Result"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleResultSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentName">Student Name</Label>
                    <Input
                      id="studentName"
                      value={resultForm.studentName}
                      onChange={(e) =>
                        setResultForm({
                          ...resultForm,
                          studentName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rollNumber">Roll Number</Label>
                    <Input
                      id="rollNumber"
                      value={resultForm.rollNumber}
                      onChange={(e) =>
                        setResultForm({
                          ...resultForm,
                          rollNumber: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="examName">Exam Name</Label>
                    <Input
                      id="examName"
                      value={resultForm.examName}
                      onChange={(e) =>
                        setResultForm({
                          ...resultForm,
                          examName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="examDate">Exam Date</Label>
                    <Input
                      id="examDate"
                      type="date"
                      value={resultForm.examDate}
                      onChange={(e) =>
                        setResultForm({
                          ...resultForm,
                          examDate: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select
                    value={resultForm.subject}
                    onValueChange={(value) =>
                      setResultForm({ ...resultForm, subject: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Web Development">
                        Web Development
                      </SelectItem>
                      <SelectItem value="Data Science">Data Science</SelectItem>
                      <SelectItem value="Mobile Development">
                        Mobile Development
                      </SelectItem>
                      <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="marks">Marks Obtained</Label>
                    <Input
                      id="marks"
                      type="number"
                      value={resultForm.marks}
                      onChange={(e) =>
                        setResultForm({ ...resultForm, marks: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalMarks">Total Marks</Label>
                    <Input
                      id="totalMarks"
                      type="number"
                      value={resultForm.totalMarks}
                      onChange={(e) =>
                        setResultForm({
                          ...resultForm,
                          totalMarks: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetResultForm}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingResult ? "Update Result" : "Add Result"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Roll Number</TableHead>
                <TableHead>Exam</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Marks</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result) => (
                <TableRow key={result.id}>
                  <TableCell className="font-medium">
                    {result.studentName}
                  </TableCell>
                  <TableCell>{result.rollNumber}</TableCell>
                  <TableCell>{result.examName}</TableCell>
                  <TableCell>{result.subject}</TableCell>
                  <TableCell>
                    {result.marks}/{result.totalMarks}
                  </TableCell>
                  <TableCell>{result.percentage.toFixed(1)}%</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        result.percentage >= 80
                          ? "default"
                          : result.percentage >= 60
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {result.grade}
                    </Badge>
                  </TableCell>
                  <TableCell>{result.examDate}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editResult(result)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteResult(result.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
