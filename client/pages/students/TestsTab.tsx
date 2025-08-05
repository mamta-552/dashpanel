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
import { FileText, Plus, Edit, Trash2, Eye, Upload } from "lucide-react";
import { toast } from "sonner";

interface Question {
  id: string;
  question: string;
  type: "multiple-choice" | "true-false" | "short-answer" | "essay";
  options?: string[];
  correctAnswer: string;
  marks: number;
}

interface Test {
  id: string;
  title: string;
  description: string;
  subject: string;
  duration: number; // in minutes
  totalMarks: number;
  questions: Question[];
  createdDate: string;
  status: "draft" | "published" | "completed";
  type: "test" | "quiz" | "assignment";
}

const mockTests: Test[] = [
  {
    id: "1",
    title: "Web Development Basics",
    description: "Fundamental concepts of web development",
    subject: "Web Development",
    duration: 60,
    totalMarks: 50,
    questions: [],
    createdDate: "2024-01-15",
    status: "published",
    type: "test",
  },
  {
    id: "2",
    title: "JavaScript Quiz",
    description: "Quick assessment on JavaScript concepts",
    subject: "JavaScript",
    duration: 30,
    totalMarks: 25,
    questions: [],
    createdDate: "2024-01-20",
    status: "draft",
    type: "quiz",
  },
];

export default function TestsTab() {
  const [tests, setTests] = useState<Test[]>(mockTests);
  const [isTestDialogOpen, setIsTestDialogOpen] = useState(false);
  const [isBulkDialogOpen, setIsBulkDialogOpen] = useState(false);
  const [isBulkQuestionsDialogOpen, setIsBulkQuestionsDialogOpen] =
    useState(false);
  const [editingTest, setEditingTest] = useState<Test | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [testForm, setTestForm] = useState({
    title: "",
    description: "",
    subject: "",
    duration: "",
    type: "test",
  });

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      question: "",
      type: "multiple-choice",
      options: ["", "", "", ""],
      correctAnswer: "",
      marks: 1,
    },
  ]);

  const [bulkForm, setBulkForm] = useState({
    count: "",
    subjects: "",
    duration: "",
    questionsPerTest: "",
    type: "test",
  });

  const [bulkQuestionsForm, setBulkQuestionsForm] = useState({
    testId: "",
    questionsCount: "",
    subject: "",
    difficulty: "medium",
    questionsText: "",
  });

  const [isQuizDialogOpen, setIsQuizDialogOpen] = useState(false);
  const [quizForm, setQuizForm] = useState({
    title: "",
    description: "",
    subject: "",
    difficulty: "medium",
    timeLimit: "",
    questionsCount: "",
    passingScore: "",
    attempts: "",
    showResults: true,
    shuffleQuestions: false,
    category: "assessment",
  });

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      question: "",
      type: "multiple-choice",
      options: ["", "", "", ""],
      correctAnswer: "",
      marks: 1,
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (index: number, field: keyof Question, value: any) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    setQuestions(updatedQuestions);
  };

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const handleTestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);

    if (editingTest) {
      setTests(
        tests.map((test) =>
          test.id === editingTest.id
            ? {
                ...test,
                ...testForm,
                duration: parseInt(testForm.duration),
                questions,
                totalMarks,
              }
            : test,
        ),
      );
      toast.success("Test updated successfully");
    } else {
      const newTest: Test = {
        id: Date.now().toString(),
        ...testForm,
        duration: parseInt(testForm.duration),
        questions,
        totalMarks,
        createdDate: new Date().toISOString().split("T")[0],
        status: "draft",
      };
      setTests([...tests, newTest]);
      toast.success("Test created successfully");
    }
    resetTestForm();
  };

  const handleBulkCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const count = parseInt(bulkForm.count);
    const subjects = bulkForm.subjects.split(",").map((s) => s.trim());
    const questionsPerTest = parseInt(bulkForm.questionsPerTest);
    const duration = parseInt(bulkForm.duration);

    const newTests: Test[] = [];

    for (let i = 0; i < count; i++) {
      const subject = subjects[i % subjects.length];
      const newTest: Test = {
        id: (Date.now() + i).toString(),
        title: `${bulkForm.type === "test" ? "Test" : "Quiz"} ${i + 1} - ${subject}`,
        description: `Auto-generated ${bulkForm.type} for ${subject}`,
        subject,
        duration,
        totalMarks: questionsPerTest,
        questions: Array.from({ length: questionsPerTest }, (_, qIndex) => ({
          id: `${Date.now()}_${i}_${qIndex}`,
          question: `Question ${qIndex + 1}`,
          type: "multiple-choice" as const,
          options: ["Option A", "Option B", "Option C", "Option D"],
          correctAnswer: "Option A",
          marks: 1,
        })),
        createdDate: new Date().toISOString().split("T")[0],
        status: "draft",
        type: bulkForm.type as "test" | "quiz",
      };
      newTests.push(newTest);
    }

    setTests([...tests, ...newTests]);
    toast.success(`${count} ${bulkForm.type}s created successfully`);
    resetBulkForm();
  };

  const resetTestForm = () => {
    setTestForm({
      title: "",
      description: "",
      subject: "",
      duration: "",
      type: "test",
    });
    setQuestions([
      {
        id: "1",
        question: "",
        type: "multiple-choice",
        options: ["", "", "", ""],
        correctAnswer: "",
        marks: 1,
      },
    ]);
    setEditingTest(null);
    setIsTestDialogOpen(false);
    setCurrentQuestionIndex(0);
  };

  const resetBulkForm = () => {
    setBulkForm({
      count: "",
      subjects: "",
      duration: "",
      questionsPerTest: "",
      type: "test",
    });
    setIsBulkDialogOpen(false);
  };

  const handleBulkQuestionsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const questionsLines = bulkQuestionsForm.questionsText
      .split("\n")
      .filter((line) => line.trim());
    const newQuestions: Question[] = [];

    questionsLines.forEach((line, index) => {
      const parts = line.split("|");
      if (parts.length >= 6) {
        const question = parts[0].trim();
        const options = [
          parts[1].trim(),
          parts[2].trim(),
          parts[3].trim(),
          parts[4].trim(),
        ];
        const correctAnswer = parts[5].trim();

        newQuestions.push({
          id: `${Date.now()}_${index}`,
          question,
          type: "multiple-choice",
          options,
          correctAnswer,
          marks: 1,
        });
      }
    });

    const selectedTest = tests.find((t) => t.id === bulkQuestionsForm.testId);
    if (selectedTest) {
      setTests(
        tests.map((test) =>
          test.id === bulkQuestionsForm.testId
            ? {
                ...test,
                questions: [...test.questions, ...newQuestions],
                totalMarks: test.totalMarks + newQuestions.length,
              }
            : test,
        ),
      );
      toast.success(`${newQuestions.length} questions added successfully`);
    }

    resetBulkQuestionsForm();
  };

  const resetBulkQuestionsForm = () => {
    setBulkQuestionsForm({
      testId: "",
      questionsCount: "",
      subject: "",
      difficulty: "medium",
      questionsText: "",
    });
    setIsBulkQuestionsDialogOpen(false);
  };

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newQuiz: Test = {
      id: Date.now().toString(),
      title: quizForm.title,
      description: quizForm.description,
      subject: quizForm.subject,
      duration: parseInt(quizForm.timeLimit),
      totalMarks: parseInt(quizForm.questionsCount),
      questions: generateSampleQuestions(
        parseInt(quizForm.questionsCount),
        quizForm.difficulty,
      ),
      createdDate: new Date().toISOString().split("T")[0],
      status: "draft",
      type: "quiz",
    };

    setTests([...tests, newQuiz]);
    toast.success("Quiz created successfully");
    resetQuizForm();
  };

  const resetQuizForm = () => {
    setQuizForm({
      title: "",
      description: "",
      subject: "",
      difficulty: "medium",
      timeLimit: "",
      questionsCount: "",
      passingScore: "",
      attempts: "",
      showResults: true,
      shuffleQuestions: false,
      category: "assessment",
    });
    setIsQuizDialogOpen(false);
  };

  const generateSampleQuestions = (
    count: number,
    difficulty: string,
  ): Question[] => {
    const sampleQuestions = [];
    for (let i = 0; i < count; i++) {
      sampleQuestions.push({
        id: `${Date.now()}_${i}`,
        question: `Sample ${difficulty} question ${i + 1}`,
        type: "multiple-choice" as const,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: "Option A",
        marks: 1,
      });
    }
    return sampleQuestions;
  };

  const editTest = (test: Test) => {
    setTestForm({
      title: test.title,
      description: test.description,
      subject: test.subject,
      duration: test.duration.toString(),
      type: test.type,
    });
    setQuestions(
      test.questions.length > 0
        ? test.questions
        : [
            {
              id: "1",
              question: "",
              type: "multiple-choice",
              options: ["", "", "", ""],
              correctAnswer: "",
              marks: 1,
            },
          ],
    );
    setEditingTest(test);
    setIsTestDialogOpen(true);
  };

  const deleteTest = (testId: string) => {
    setTests(tests.filter((test) => test.id !== testId));
    toast.success("Test deleted successfully");
  };

  const publishTest = (testId: string) => {
    setTests(
      tests.map((test) =>
        test.id === testId ? { ...test, status: "published" } : test,
      ),
    );
    toast.success("Test published successfully");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Tests & Quizzes Management
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Create and manage tests, quizzes, and assessments
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <FileText className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <h3 className="font-semibold">Tests</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {tests.filter((t) => t.type === "test").length} created
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <FileText className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <h3 className="font-semibold">Quizzes</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {tests.filter((t) => t.type === "quiz").length} created
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <FileText className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <h3 className="font-semibold">Published</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {tests.filter((t) => t.status === "published").length} active
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Tests & Quizzes</span>
          </CardTitle>
          <div className="flex space-x-2">
            <Dialog open={isQuizDialogOpen} onOpenChange={setIsQuizDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Quick Quiz
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create Quick Quiz</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleQuizSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quizTitle">Quiz Title</Label>
                      <Input
                        id="quizTitle"
                        value={quizForm.title}
                        onChange={(e) =>
                          setQuizForm({ ...quizForm, title: e.target.value })
                        }
                        placeholder="Enter quiz title"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quizSubject">Subject</Label>
                      <Select
                        value={quizForm.subject}
                        onValueChange={(value) =>
                          setQuizForm({ ...quizForm, subject: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Web Development">
                            Web Development
                          </SelectItem>
                          <SelectItem value="Data Science">
                            Data Science
                          </SelectItem>
                          <SelectItem value="JavaScript">JavaScript</SelectItem>
                          <SelectItem value="Python">Python</SelectItem>
                          <SelectItem value="React">React</SelectItem>
                          <SelectItem value="Node.js">Node.js</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quizDescription">Description</Label>
                    <Textarea
                      id="quizDescription"
                      value={quizForm.description}
                      onChange={(e) =>
                        setQuizForm({
                          ...quizForm,
                          description: e.target.value,
                        })
                      }
                      placeholder="Brief description of the quiz"
                      rows={2}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quizDifficulty">Difficulty</Label>
                      <Select
                        value={quizForm.difficulty}
                        onValueChange={(value) =>
                          setQuizForm({ ...quizForm, difficulty: value })
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
                    <div className="space-y-2">
                      <Label htmlFor="quizTimeLimit">Time Limit (min)</Label>
                      <Input
                        id="quizTimeLimit"
                        type="number"
                        value={quizForm.timeLimit}
                        onChange={(e) =>
                          setQuizForm({
                            ...quizForm,
                            timeLimit: e.target.value,
                          })
                        }
                        placeholder="30"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quizQuestionsCount">Questions</Label>
                      <Input
                        id="quizQuestionsCount"
                        type="number"
                        value={quizForm.questionsCount}
                        onChange={(e) =>
                          setQuizForm({
                            ...quizForm,
                            questionsCount: e.target.value,
                          })
                        }
                        placeholder="10"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quizPassingScore">
                        Passing Score (%)
                      </Label>
                      <Input
                        id="quizPassingScore"
                        type="number"
                        value={quizForm.passingScore}
                        onChange={(e) =>
                          setQuizForm({
                            ...quizForm,
                            passingScore: e.target.value,
                          })
                        }
                        placeholder="60"
                        min="0"
                        max="100"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quizAttempts">Max Attempts</Label>
                      <Input
                        id="quizAttempts"
                        type="number"
                        value={quizForm.attempts}
                        onChange={(e) =>
                          setQuizForm({ ...quizForm, attempts: e.target.value })
                        }
                        placeholder="3"
                        min="1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quizCategory">Category</Label>
                      <Select
                        value={quizForm.category}
                        onValueChange={(value) =>
                          setQuizForm({ ...quizForm, category: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="assessment">Assessment</SelectItem>
                          <SelectItem value="practice">Practice</SelectItem>
                          <SelectItem value="certification">
                            Certification
                          </SelectItem>
                          <SelectItem value="entrance">Entrance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label>Quiz Settings</Label>
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="showResults"
                          checked={quizForm.showResults}
                          onChange={(e) =>
                            setQuizForm({
                              ...quizForm,
                              showResults: e.target.checked,
                            })
                          }
                          className="h-4 w-4"
                        />
                        <Label htmlFor="showResults" className="text-sm">
                          Show results after completion
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="shuffleQuestions"
                          checked={quizForm.shuffleQuestions}
                          onChange={(e) =>
                            setQuizForm({
                              ...quizForm,
                              shuffleQuestions: e.target.checked,
                            })
                          }
                          className="h-4 w-4"
                        />
                        <Label htmlFor="shuffleQuestions" className="text-sm">
                          Shuffle questions
                        </Label>
                      </div>
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
                    <Button type="submit">Create Quiz</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
            <Dialog
              open={isBulkQuestionsDialogOpen}
              onOpenChange={setIsBulkQuestionsDialogOpen}
            >
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Bulk Questions
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Add Bulk Objective Questions</DialogTitle>
                </DialogHeader>
                <form
                  onSubmit={handleBulkQuestionsSubmit}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="testSelect">Select Test</Label>
                      <Select
                        value={bulkQuestionsForm.testId}
                        onValueChange={(value) =>
                          setBulkQuestionsForm({
                            ...bulkQuestionsForm,
                            testId: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a test" />
                        </SelectTrigger>
                        <SelectContent>
                          {tests.map((test) => (
                            <SelectItem key={test.id} value={test.id}>
                              {test.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="difficulty">Difficulty Level</Label>
                      <Select
                        value={bulkQuestionsForm.difficulty}
                        onValueChange={(value) =>
                          setBulkQuestionsForm({
                            ...bulkQuestionsForm,
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
                  <div className="space-y-2">
                    <Label htmlFor="questionsText">
                      Questions (One per line)
                    </Label>
                    <Textarea
                      id="questionsText"
                      value={bulkQuestionsForm.questionsText}
                      onChange={(e) =>
                        setBulkQuestionsForm({
                          ...bulkQuestionsForm,
                          questionsText: e.target.value,
                        })
                      }
                      placeholder="Format: Question | Option A | Option B | Option C | Option D | Correct Answer&#10;Example: What is 2+2? | 3 | 4 | 5 | 6 | 4"
                      rows={12}
                      className="font-mono text-sm"
                      required
                    />
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold mb-2 text-blue-800">
                      Format Instructions:
                    </h4>
                    <div className="space-y-1 text-sm text-blue-700">
                      <p>
                        <strong>Format:</strong> Question | Option A | Option B
                        | Option C | Option D | Correct Answer
                      </p>
                      <p>
                        <strong>Example:</strong> What is 2+2? | 2 | 4 | 6 | 8 |
                        4
                      </p>
                      <p>
                        <strong>Tips:</strong>
                      </p>
                      <ul className="list-disc list-inside ml-2 space-y-1">
                        <li>Use the pipe symbol (|) to separate each part</li>
                        <li>
                          Ensure the correct answer matches exactly one of the
                          options
                        </li>
                        <li>Each question should be on a new line</li>
                        <li>
                          Avoid using | symbol within questions or options
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetBulkQuestionsForm}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Add Questions</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
            <Dialog open={isBulkDialogOpen} onOpenChange={setIsBulkDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Bulk Create
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Bulk Create Tests/Quizzes</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleBulkCreate} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="count">Number to Create</Label>
                      <Input
                        id="count"
                        type="number"
                        value={bulkForm.count}
                        onChange={(e) =>
                          setBulkForm({ ...bulkForm, count: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bulkType">Type</Label>
                      <Select
                        value={bulkForm.type}
                        onValueChange={(value) =>
                          setBulkForm({ ...bulkForm, type: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="test">Test</SelectItem>
                          <SelectItem value="quiz">Quiz</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subjects">Subjects (comma-separated)</Label>
                    <Input
                      id="subjects"
                      value={bulkForm.subjects}
                      onChange={(e) =>
                        setBulkForm({ ...bulkForm, subjects: e.target.value })
                      }
                      placeholder="Web Development, Data Science, JavaScript"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bulkDuration">Duration (minutes)</Label>
                      <Input
                        id="bulkDuration"
                        type="number"
                        value={bulkForm.duration}
                        onChange={(e) =>
                          setBulkForm({ ...bulkForm, duration: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="questionsPerTest">
                        Questions per Test
                      </Label>
                      <Input
                        id="questionsPerTest"
                        type="number"
                        value={bulkForm.questionsPerTest}
                        onChange={(e) =>
                          setBulkForm({
                            ...bulkForm,
                            questionsPerTest: e.target.value,
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
                      onClick={resetBulkForm}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Create Tests</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
            <Dialog open={isTestDialogOpen} onOpenChange={setIsTestDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Test
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingTest ? "Edit Test/Quiz" : "Create New Test/Quiz"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleTestSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={testForm.title}
                        onChange={(e) =>
                          setTestForm({ ...testForm, title: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Type</Label>
                      <Select
                        value={testForm.type}
                        onValueChange={(value) =>
                          setTestForm({ ...testForm, type: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="test">Test</SelectItem>
                          <SelectItem value="quiz">Quiz</SelectItem>
                          <SelectItem value="assignment">Assignment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={testForm.description}
                      onChange={(e) =>
                        setTestForm({
                          ...testForm,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select
                        value={testForm.subject}
                        onValueChange={(value) =>
                          setTestForm({ ...testForm, subject: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Web Development">
                            Web Development
                          </SelectItem>
                          <SelectItem value="Data Science">
                            Data Science
                          </SelectItem>
                          <SelectItem value="JavaScript">JavaScript</SelectItem>
                          <SelectItem value="Python">Python</SelectItem>
                          <SelectItem value="React">React</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (minutes)</Label>
                      <Input
                        id="duration"
                        type="number"
                        value={testForm.duration}
                        onChange={(e) =>
                          setTestForm({ ...testForm, duration: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-lg">Questions</Label>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addQuestion}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Question
                      </Button>
                    </div>

                    {questions.map((question, index) => (
                      <div key={question.id} className="border p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <Label>Question {index + 1}</Label>
                          {questions.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeQuestion(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        <div className="space-y-3">
                          <div className="space-y-2">
                            <Label>Question Text</Label>
                            <Textarea
                              value={question.question}
                              onChange={(e) =>
                                updateQuestion(
                                  index,
                                  "question",
                                  e.target.value,
                                )
                              }
                              placeholder="Enter your question here..."
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Question Type</Label>
                              <Select
                                value={question.type}
                                onValueChange={(value) =>
                                  updateQuestion(index, "type", value)
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="multiple-choice">
                                    Multiple Choice
                                  </SelectItem>
                                  <SelectItem value="true-false">
                                    True/False
                                  </SelectItem>
                                  <SelectItem value="short-answer">
                                    Short Answer
                                  </SelectItem>
                                  <SelectItem value="essay">Essay</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Marks</Label>
                              <Input
                                type="number"
                                value={question.marks}
                                onChange={(e) =>
                                  updateQuestion(
                                    index,
                                    "marks",
                                    parseInt(e.target.value) || 1,
                                  )
                                }
                                min="1"
                              />
                            </div>
                          </div>

                          {question.type === "multiple-choice" && (
                            <div className="space-y-2">
                              <Label>Options</Label>
                              {question.options?.map((option, optIndex) => (
                                <Input
                                  key={optIndex}
                                  value={option}
                                  onChange={(e) => {
                                    const newOptions = [
                                      ...(question.options || []),
                                    ];
                                    newOptions[optIndex] = e.target.value;
                                    updateQuestion(
                                      index,
                                      "options",
                                      newOptions,
                                    );
                                  }}
                                  placeholder={`Option ${optIndex + 1}`}
                                />
                              ))}
                              <div className="space-y-2">
                                <Label>Correct Answer</Label>
                                <Select
                                  value={question.correctAnswer}
                                  onValueChange={(value) =>
                                    updateQuestion(
                                      index,
                                      "correctAnswer",
                                      value,
                                    )
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select correct answer" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {question.options?.map(
                                      (option, optIndex) => (
                                        <SelectItem
                                          key={optIndex}
                                          value={option}
                                        >
                                          {option || `Option ${optIndex + 1}`}
                                        </SelectItem>
                                      ),
                                    )}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          )}

                          {question.type === "true-false" && (
                            <div className="space-y-2">
                              <Label>Correct Answer</Label>
                              <Select
                                value={question.correctAnswer}
                                onValueChange={(value) =>
                                  updateQuestion(index, "correctAnswer", value)
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="True">True</SelectItem>
                                  <SelectItem value="False">False</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          )}

                          {(question.type === "short-answer" ||
                            question.type === "essay") && (
                            <div className="space-y-2">
                              <Label>Sample Answer/Keywords</Label>
                              <Textarea
                                value={question.correctAnswer}
                                onChange={(e) =>
                                  updateQuestion(
                                    index,
                                    "correctAnswer",
                                    e.target.value,
                                  )
                                }
                                placeholder="Enter sample answer or keywords for evaluation"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetTestForm}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingTest ? "Update Test" : "Create Test"}
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
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Questions</TableHead>
                <TableHead>Total Marks</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tests.map((test) => (
                <TableRow key={test.id}>
                  <TableCell className="font-medium">{test.title}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        test.type === "test"
                          ? "default"
                          : test.type === "quiz"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {test.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{test.subject}</TableCell>
                  <TableCell>{test.duration} min</TableCell>
                  <TableCell>{test.questions.length}</TableCell>
                  <TableCell>{test.totalMarks}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        test.status === "published"
                          ? "default"
                          : test.status === "completed"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {test.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editTest(test)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {test.status === "draft" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => publishTest(test.id)}
                        >
                          Publish
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteTest(test.id)}
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
