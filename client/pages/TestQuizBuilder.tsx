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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  HelpCircle,
  Plus,
  Edit,
  Trash2,
  Eye,
  Upload,
  Save,
  Clock,
  Users,
  Award,
  BarChart,
  FileText,
  Play,
  Copy,
} from "lucide-react";
import { toast } from "sonner";

interface Question {
  id: string;
  text: string;
  type: "single" | "multiple" | "true-false" | "fill-blank";
  options: string[];
  correctAnswers: number[];
  points: number;
  explanation: string;
  image?: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  course: string;
  category: string;
  duration: number; // in minutes
  totalMarks: number;
  passingMarks: number;
  questions: Question[];
  status: "draft" | "published" | "archived";
  attempts: number;
  averageScore: number;
  createdDate: string;
  startDate: string;
  endDate: string;
  randomizeQuestions: boolean;
  showResults: boolean;
  allowRetake: boolean;
  instructions: string;
}

interface QuizAttempt {
  id: string;
  quizId: string;
  studentId: string;
  studentName: string;
  score: number;
  percentage: number;
  timeSpent: number;
  answers: Record<string, any>;
  submittedAt: string;
  status: "completed" | "in-progress" | "not-started";
}

const mockQuestions: Question[] = [
  {
    id: "1",
    text: "What is React.js?",
    type: "single",
    options: [
      "A JavaScript library for building user interfaces",
      "A database management system",
      "A server-side programming language",
      "A CSS framework",
    ],
    correctAnswers: [0],
    points: 5,
    explanation:
      "React is a JavaScript library developed by Facebook for building user interfaces, particularly web applications.",
    category: "Web Development",
    difficulty: "easy",
  },
  {
    id: "2",
    text: "Which of the following are JavaScript frameworks? (Select all that apply)",
    type: "multiple",
    options: ["Angular", "Vue.js", "Python", "React", "Django"],
    correctAnswers: [0, 1, 3],
    points: 10,
    explanation:
      "Angular, Vue.js, and React are JavaScript frameworks/libraries. Python is a programming language and Django is a Python framework.",
    category: "Web Development",
    difficulty: "medium",
  },
];

const mockQuizzes: Quiz[] = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    description: "Test your knowledge of JavaScript basics",
    course: "Web Development",
    category: "Programming",
    duration: 60,
    totalMarks: 100,
    passingMarks: 60,
    questions: mockQuestions,
    status: "published",
    attempts: 45,
    averageScore: 72.5,
    createdDate: "2024-01-15",
    startDate: "2024-01-20",
    endDate: "2024-02-20",
    randomizeQuestions: true,
    showResults: true,
    allowRetake: false,
    instructions:
      "Read each question carefully. You have 60 minutes to complete this quiz. Once submitted, you cannot retake the quiz.",
  },
];

const mockAttempts: QuizAttempt[] = [
  {
    id: "1",
    quizId: "1",
    studentId: "STU001",
    studentName: "John Doe",
    score: 85,
    percentage: 85,
    timeSpent: 45,
    answers: {},
    submittedAt: "2024-01-21 14:30:00",
    status: "completed",
  },
  {
    id: "2",
    quizId: "1",
    studentId: "STU002",
    studentName: "Jane Smith",
    score: 92,
    percentage: 92,
    timeSpent: 38,
    answers: {},
    submittedAt: "2024-01-21 16:15:00",
    status: "completed",
  },
];

export default function TestQuizBuilder() {
  const [quizzes, setQuizzes] = useState<Quiz[]>(mockQuizzes);
  const [questions, setQuestions] = useState<Question[]>(mockQuestions);
  const [attempts, setAttempts] = useState<QuizAttempt[]>(mockAttempts);
  const [activeTab, setActiveTab] = useState("quizzes");
  const [isQuizDialogOpen, setIsQuizDialogOpen] = useState(false);
  const [isQuestionDialogOpen, setIsQuestionDialogOpen] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [viewingQuiz, setViewingQuiz] = useState<Quiz | null>(null);

  const [quizForm, setQuizForm] = useState({
    title: "",
    description: "",
    course: "",
    category: "",
    duration: "",
    totalMarks: "",
    passingMarks: "",
    startDate: "",
    endDate: "",
    instructions: "",
    randomizeQuestions: false,
    showResults: false,
    allowRetake: false,
  });

  const [questionForm, setQuestionForm] = useState({
    text: "",
    type: "single" as Question["type"],
    options: ["", "", "", ""],
    correctAnswers: [] as number[],
    points: "",
    explanation: "",
    category: "",
    difficulty: "easy" as Question["difficulty"],
  });

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingQuiz) {
      setQuizzes(
        quizzes.map((quiz) =>
          quiz.id === editingQuiz.id
            ? {
                ...quiz,
                ...quizForm,
                duration: parseInt(quizForm.duration),
                totalMarks: parseInt(quizForm.totalMarks),
                passingMarks: parseInt(quizForm.passingMarks),
              }
            : quiz,
        ),
      );
      toast.success("Quiz updated successfully");
    } else {
      const newQuiz: Quiz = {
        id: Date.now().toString(),
        ...quizForm,
        duration: parseInt(quizForm.duration),
        totalMarks: parseInt(quizForm.totalMarks),
        passingMarks: parseInt(quizForm.passingMarks),
        questions: [],
        status: "draft",
        attempts: 0,
        averageScore: 0,
        createdDate: new Date().toISOString().split("T")[0],
      };
      setQuizzes([...quizzes, newQuiz]);
      toast.success("Quiz created successfully");
    }
    resetQuizForm();
  };

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validOptions = questionForm.options.filter((opt) => opt.trim());

    if (editingQuestion) {
      setQuestions(
        questions.map((question) =>
          question.id === editingQuestion.id
            ? {
                ...question,
                ...questionForm,
                options: validOptions,
                points: parseInt(questionForm.points),
              }
            : question,
        ),
      );
      toast.success("Question updated successfully");
    } else {
      const newQuestion: Question = {
        id: Date.now().toString(),
        ...questionForm,
        options: validOptions,
        points: parseInt(questionForm.points),
      };
      setQuestions([...questions, newQuestion]);
      toast.success("Question created successfully");
    }
    resetQuestionForm();
  };

  const resetQuizForm = () => {
    setQuizForm({
      title: "",
      description: "",
      course: "",
      category: "",
      duration: "",
      totalMarks: "",
      passingMarks: "",
      startDate: "",
      endDate: "",
      instructions: "",
      randomizeQuestions: false,
      showResults: false,
      allowRetake: false,
    });
    setEditingQuiz(null);
    setIsQuizDialogOpen(false);
  };

  const resetQuestionForm = () => {
    setQuestionForm({
      text: "",
      type: "single",
      options: ["", "", "", ""],
      correctAnswers: [],
      points: "",
      explanation: "",
      category: "",
      difficulty: "easy",
    });
    setEditingQuestion(null);
    setIsQuestionDialogOpen(false);
  };

  const editQuiz = (quiz: Quiz) => {
    setQuizForm({
      title: quiz.title,
      description: quiz.description,
      course: quiz.course,
      category: quiz.category,
      duration: quiz.duration.toString(),
      totalMarks: quiz.totalMarks.toString(),
      passingMarks: quiz.passingMarks.toString(),
      startDate: quiz.startDate,
      endDate: quiz.endDate,
      instructions: quiz.instructions,
      randomizeQuestions: quiz.randomizeQuestions,
      showResults: quiz.showResults,
      allowRetake: quiz.allowRetake,
    });
    setEditingQuiz(quiz);
    setIsQuizDialogOpen(true);
  };

  const editQuestion = (question: Question) => {
    setQuestionForm({
      text: question.text,
      type: question.type,
      options: [...question.options, "", "", "", ""].slice(0, 4),
      correctAnswers: question.correctAnswers,
      points: question.points.toString(),
      explanation: question.explanation,
      category: question.category,
      difficulty: question.difficulty,
    });
    setEditingQuestion(question);
    setIsQuestionDialogOpen(true);
  };

  const deleteQuiz = (id: string) => {
    setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
    toast.success("Quiz deleted successfully");
  };

  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter((question) => question.id !== id));
    toast.success("Question deleted successfully");
  };

  const duplicateQuiz = (quiz: Quiz) => {
    const newQuiz = {
      ...quiz,
      id: Date.now().toString(),
      title: `${quiz.title} (Copy)`,
      status: "draft" as const,
      attempts: 0,
      averageScore: 0,
      createdDate: new Date().toISOString().split("T")[0],
    };
    setQuizzes([...quizzes, newQuiz]);
    toast.success("Quiz duplicated successfully");
  };

  const updateQuizStatus = (id: string, status: Quiz["status"]) => {
    setQuizzes(
      quizzes.map((quiz) => (quiz.id === id ? { ...quiz, status } : quiz)),
    );
    toast.success(`Quiz ${status} successfully`);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...questionForm.options];
    newOptions[index] = value;
    setQuestionForm({ ...questionForm, options: newOptions });
  };

  const handleCorrectAnswerChange = (index: number, checked: boolean) => {
    let newCorrectAnswers = [...questionForm.correctAnswers];

    if (questionForm.type === "single") {
      newCorrectAnswers = checked ? [index] : [];
    } else {
      if (checked) {
        newCorrectAnswers = [...newCorrectAnswers, index];
      } else {
        newCorrectAnswers = newCorrectAnswers.filter((i) => i !== index);
      }
    }

    setQuestionForm({ ...questionForm, correctAnswers: newCorrectAnswers });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Test & Quiz Builder
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create and manage tests, quizzes, and assessments
          </p>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
          <TabsTrigger value="questions">Question Bank</TabsTrigger>
          <TabsTrigger value="attempts">Student Attempts</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Quizzes Tab */}
        <TabsContent value="quizzes">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <HelpCircle className="h-5 w-5" />
                <span>Quiz Management</span>
              </CardTitle>
              <Dialog
                open={isQuizDialogOpen}
                onOpenChange={setIsQuizDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingQuiz(null)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Quiz
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingQuiz ? "Edit Quiz" : "Create New Quiz"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleQuizSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="title">Quiz Title</Label>
                        <Input
                          id="title"
                          value={quizForm.title}
                          onChange={(e) =>
                            setQuizForm({ ...quizForm, title: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="course">Course</Label>
                        <Input
                          id="course"
                          value={quizForm.course}
                          onChange={(e) =>
                            setQuizForm({ ...quizForm, course: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input
                          id="category"
                          value={quizForm.category}
                          onChange={(e) =>
                            setQuizForm({
                              ...quizForm,
                              category: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration (minutes)</Label>
                        <Input
                          id="duration"
                          type="number"
                          value={quizForm.duration}
                          onChange={(e) =>
                            setQuizForm({
                              ...quizForm,
                              duration: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="totalMarks">Total Marks</Label>
                        <Input
                          id="totalMarks"
                          type="number"
                          value={quizForm.totalMarks}
                          onChange={(e) =>
                            setQuizForm({
                              ...quizForm,
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
                          value={quizForm.passingMarks}
                          onChange={(e) =>
                            setQuizForm({
                              ...quizForm,
                              passingMarks: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={quizForm.startDate}
                          onChange={(e) =>
                            setQuizForm({
                              ...quizForm,
                              startDate: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endDate">End Date</Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={quizForm.endDate}
                          onChange={(e) =>
                            setQuizForm({
                              ...quizForm,
                              endDate: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={quizForm.description}
                        onChange={(e) =>
                          setQuizForm({
                            ...quizForm,
                            description: e.target.value,
                          })
                        }
                        rows={3}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instructions">Instructions</Label>
                      <Textarea
                        id="instructions"
                        value={quizForm.instructions}
                        onChange={(e) =>
                          setQuizForm({
                            ...quizForm,
                            instructions: e.target.value,
                          })
                        }
                        rows={4}
                        required
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="randomizeQuestions"
                          checked={quizForm.randomizeQuestions}
                          onCheckedChange={(checked) =>
                            setQuizForm({
                              ...quizForm,
                              randomizeQuestions: checked as boolean,
                            })
                          }
                        />
                        <Label htmlFor="randomizeQuestions">
                          Randomize Questions
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="showResults"
                          checked={quizForm.showResults}
                          onCheckedChange={(checked) =>
                            setQuizForm({
                              ...quizForm,
                              showResults: checked as boolean,
                            })
                          }
                        />
                        <Label htmlFor="showResults">
                          Show Results After Submission
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="allowRetake"
                          checked={quizForm.allowRetake}
                          onCheckedChange={(checked) =>
                            setQuizForm({
                              ...quizForm,
                              allowRetake: checked as boolean,
                            })
                          }
                        />
                        <Label htmlFor="allowRetake">Allow Retake</Label>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={resetQuizForm}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingQuiz ? "Update" : "Create"} Quiz
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
                    <TableHead>Quiz Title</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Questions</TableHead>
                    <TableHead>Attempts</TableHead>
                    <TableHead>Avg Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quizzes.map((quiz) => (
                    <TableRow key={quiz.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{quiz.title}</div>
                          <div className="text-sm text-gray-500">
                            {quiz.description.substring(0, 50)}...
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{quiz.course}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{quiz.duration} min</span>
                        </div>
                      </TableCell>
                      <TableCell>{quiz.questions.length}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{quiz.attempts}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Award className="h-4 w-4" />
                          <span>{quiz.averageScore}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={quiz.status}
                          onValueChange={(value: Quiz["status"]) =>
                            updateQuizStatus(quiz.id, value)
                          }
                        >
                          <SelectTrigger className="w-32">
                            <Badge
                              variant={
                                quiz.status === "published"
                                  ? "default"
                                  : quiz.status === "draft"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {quiz.status}
                            </Badge>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setViewingQuiz(quiz)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => editQuiz(quiz)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => duplicateQuiz(quiz)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteQuiz(quiz.id)}
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
        </TabsContent>

        {/* Questions Tab */}
        <TabsContent value="questions">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Question Bank</span>
              </CardTitle>
              <Dialog
                open={isQuestionDialogOpen}
                onOpenChange={setIsQuestionDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingQuestion(null)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Question
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingQuestion ? "Edit Question" : "Add New Question"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleQuestionSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="questionText">Question Text</Label>
                      <Textarea
                        id="questionText"
                        value={questionForm.text}
                        onChange={(e) =>
                          setQuestionForm({
                            ...questionForm,
                            text: e.target.value,
                          })
                        }
                        rows={3}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="questionType">Question Type</Label>
                        <Select
                          value={questionForm.type}
                          onValueChange={(value: Question["type"]) =>
                            setQuestionForm({ ...questionForm, type: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single">
                              Single Correct
                            </SelectItem>
                            <SelectItem value="multiple">
                              Multiple Correct
                            </SelectItem>
                            <SelectItem value="true-false">
                              True/False
                            </SelectItem>
                            <SelectItem value="fill-blank">
                              Fill in the Blank
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="points">Points</Label>
                        <Input
                          id="points"
                          type="number"
                          value={questionForm.points}
                          onChange={(e) =>
                            setQuestionForm({
                              ...questionForm,
                              points: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="difficulty">Difficulty</Label>
                        <Select
                          value={questionForm.difficulty}
                          onValueChange={(value: Question["difficulty"]) =>
                            setQuestionForm({
                              ...questionForm,
                              difficulty: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {(questionForm.type === "single" ||
                      questionForm.type === "multiple") && (
                      <div className="space-y-4">
                        <Label>Answer Options</Label>
                        {questionForm.options.map((option, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            {questionForm.type === "single" ? (
                              <RadioGroup
                                value={questionForm.correctAnswers[0]?.toString()}
                                onValueChange={(value) =>
                                  handleCorrectAnswerChange(
                                    parseInt(value),
                                    true,
                                  )
                                }
                              >
                                <RadioGroupItem
                                  value={index.toString()}
                                  id={`option-${index}`}
                                />
                              </RadioGroup>
                            ) : (
                              <Checkbox
                                id={`option-${index}`}
                                checked={questionForm.correctAnswers.includes(
                                  index,
                                )}
                                onCheckedChange={(checked) =>
                                  handleCorrectAnswerChange(
                                    index,
                                    checked as boolean,
                                  )
                                }
                              />
                            )}
                            <Input
                              value={option}
                              onChange={(e) =>
                                handleOptionChange(index, e.target.value)
                              }
                              placeholder={`Option ${index + 1}`}
                              className="flex-1"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="explanation">Explanation</Label>
                      <Textarea
                        id="explanation"
                        value={questionForm.explanation}
                        onChange={(e) =>
                          setQuestionForm({
                            ...questionForm,
                            explanation: e.target.value,
                          })
                        }
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="questionCategory">Category</Label>
                      <Input
                        id="questionCategory"
                        value={questionForm.category}
                        onChange={(e) =>
                          setQuestionForm({
                            ...questionForm,
                            category: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Question Image (Optional)</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-500">
                          Upload question image
                        </p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Choose Image
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={resetQuestionForm}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingQuestion ? "Update" : "Add"} Question
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
                    <TableHead>Question</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {questions.map((question) => (
                    <TableRow key={question.id}>
                      <TableCell>
                        <div className="max-w-md">
                          <p className="font-medium">
                            {question.text.substring(0, 100)}...
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{question.type}</Badge>
                      </TableCell>
                      <TableCell>{question.category}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            question.difficulty === "easy"
                              ? "default"
                              : question.difficulty === "medium"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {question.difficulty}
                        </Badge>
                      </TableCell>
                      <TableCell>{question.points}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => editQuestion(question)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteQuestion(question.id)}
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
        </TabsContent>

        {/* Student Attempts Tab */}
        <TabsContent value="attempts">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Student Attempts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Quiz</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Percentage</TableHead>
                    <TableHead>Time Spent</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted At</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attempts.map((attempt) => (
                    <TableRow key={attempt.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {attempt.studentName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {attempt.studentId}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {quizzes.find((q) => q.id === attempt.quizId)?.title}
                      </TableCell>
                      <TableCell>{attempt.score}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            attempt.percentage >= 80
                              ? "default"
                              : attempt.percentage >= 60
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {attempt.percentage}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{attempt.timeSpent} min</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            attempt.status === "completed"
                              ? "default"
                              : attempt.status === "in-progress"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {attempt.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{attempt.submittedAt}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Quizzes
                    </p>
                    <p className="text-3xl font-bold">{quizzes.length}</p>
                  </div>
                  <HelpCircle className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Questions
                    </p>
                    <p className="text-3xl font-bold">{questions.length}</p>
                  </div>
                  <FileText className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Attempts
                    </p>
                    <p className="text-3xl font-bold">{attempts.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Avg Success Rate
                    </p>
                    <p className="text-3xl font-bold">
                      {attempts.length > 0
                        ? Math.round(
                            attempts.reduce((sum, a) => sum + a.percentage, 0) /
                              attempts.length,
                          )
                        : 0}
                      %
                    </p>
                  </div>
                  <BarChart className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* View Quiz Dialog */}
      {viewingQuiz && (
        <Dialog open={!!viewingQuiz} onOpenChange={() => setViewingQuiz(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{viewingQuiz.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Course:</strong> {viewingQuiz.course}
                </div>
                <div>
                  <strong>Duration:</strong> {viewingQuiz.duration} minutes
                </div>
                <div>
                  <strong>Total Marks:</strong> {viewingQuiz.totalMarks}
                </div>
                <div>
                  <strong>Passing Marks:</strong> {viewingQuiz.passingMarks}
                </div>
                <div>
                  <strong>Questions:</strong> {viewingQuiz.questions.length}
                </div>
                <div>
                  <strong>Attempts:</strong> {viewingQuiz.attempts}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {viewingQuiz.description}
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Instructions</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {viewingQuiz.instructions}
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Settings</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={viewingQuiz.randomizeQuestions}
                      disabled
                    />
                    <span>Randomize Questions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox checked={viewingQuiz.showResults} disabled />
                    <span>Show Results After Submission</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox checked={viewingQuiz.allowRetake} disabled />
                    <span>Allow Retake</span>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
