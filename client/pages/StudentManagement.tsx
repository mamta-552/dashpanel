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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  UserPlus,
  BookOpen,
  Award,
  FileText,
  Upload,
  Eye,
  Edit,
  Trash2,
  Download,
  Video,
  HelpCircle,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";

interface Student {
  id: string;
  enrollmentNo: string;
  name: string;
  fatherName: string;
  motherName: string;
  email: string;
  contact: string;
  address: string;
  dob: string;
  gender: string;
  category: string;
  course: string;
  batch: string;
  admissionDate: string;
  feeStatus: "paid" | "pending" | "overdue";
  status: "active" | "inactive" | "graduated";
  photo: string;
}

interface Book {
  id: string;
  title: string;
  author: string;
  subject: string;
  price: number;
  image: string;
  pdfUrl: string;
  status: "available" | "borrowed";
}

interface Result {
  id: string;
  studentId: string;
  examName: string;
  subject: string;
  marks: number;
  totalMarks: number;
  grade: string;
  examDate: string;
}

interface Scholarship {
  id: string;
  studentId: string;
  scholarshipName: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
  appliedDate: string;
}

const mockStudents: Student[] = [
  {
    id: "1",
    enrollmentNo: "EDU2024001",
    name: "Aarav Sharma",
    fatherName: "Rajesh Sharma",
    motherName: "Priya Sharma",
    email: "aarav@student.com",
    contact: "+91 9876543210",
    address: "New Delhi, India",
    dob: "2000-05-15",
    gender: "Male",
    category: "General",
    course: "Computer Science",
    batch: "2024-A",
    admissionDate: "2024-01-15",
    feeStatus: "paid",
    status: "active",
    photo: "/placeholder.svg",
  },
  {
    id: "2",
    enrollmentNo: "EDU2024002",
    name: "Priya Patel",
    fatherName: "Kiran Patel",
    motherName: "Sita Patel",
    email: "priya@student.com",
    contact: "+91 9876543211",
    address: "Mumbai, India",
    dob: "2001-03-20",
    gender: "Female",
    category: "OBC",
    course: "Digital Marketing",
    batch: "2024-B",
    admissionDate: "2024-01-16",
    feeStatus: "pending",
    status: "active",
    photo: "/placeholder.svg",
  },
];

const mockBooks: Book[] = [
  {
    id: "1",
    title: "Introduction to Programming",
    author: "John Doe",
    subject: "Computer Science",
    price: 599,
    image: "/placeholder.svg",
    pdfUrl: "/books/programming.pdf",
    status: "available",
  },
  {
    id: "2",
    title: "Digital Marketing Fundamentals",
    author: "Jane Smith",
    subject: "Marketing",
    price: 799,
    image: "/placeholder.svg",
    pdfUrl: "/books/marketing.pdf",
    status: "available",
  },
];

export default function StudentManagement() {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [activeTab, setActiveTab] = useState("students");
  const [isStudentDialogOpen, setIsStudentDialogOpen] = useState(false);
  const [isBookDialogOpen, setIsBookDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const [studentForm, setStudentForm] = useState({
    enrollmentNo: "",
    name: "",
    fatherName: "",
    motherName: "",
    email: "",
    contact: "",
    address: "",
    dob: "",
    gender: "",
    category: "",
    course: "",
    batch: "",
  });

  const [bookForm, setBookForm] = useState({
    title: "",
    author: "",
    subject: "",
    price: "",
  });

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStudent) {
      setStudents(
        students.map((student) =>
          student.id === editingStudent.id
            ? { ...student, ...studentForm }
            : student,
        ),
      );
      toast.success("Student updated successfully");
    } else {
      const newStudent: Student = {
        id: Date.now().toString(),
        ...studentForm,
        price: parseFloat(bookForm.price),
        admissionDate: new Date().toISOString().split("T")[0],
        feeStatus: "pending",
        status: "active",
        photo: "/placeholder.svg",
      };
      setStudents([...students, newStudent]);
      toast.success("Student added successfully");
    }
    resetStudentForm();
  };

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBook) {
      setBooks(
        books.map((book) =>
          book.id === editingBook.id
            ? { ...book, ...bookForm, price: parseFloat(bookForm.price) }
            : book,
        ),
      );
      toast.success("Book updated successfully");
    } else {
      const newBook: Book = {
        id: Date.now().toString(),
        ...bookForm,
        price: parseFloat(bookForm.price),
        image: "/placeholder.svg",
        pdfUrl: "/books/default.pdf",
        status: "available",
      };
      setBooks([...books, newBook]);
      toast.success("Book added successfully");
    }
    resetBookForm();
  };

  const resetStudentForm = () => {
    setStudentForm({
      enrollmentNo: "",
      name: "",
      fatherName: "",
      motherName: "",
      email: "",
      contact: "",
      address: "",
      dob: "",
      gender: "",
      category: "",
      course: "",
      batch: "",
    });
    setEditingStudent(null);
    setIsStudentDialogOpen(false);
  };

  const resetBookForm = () => {
    setBookForm({
      title: "",
      author: "",
      subject: "",
      price: "",
    });
    setEditingBook(null);
    setIsBookDialogOpen(false);
  };

  const editStudent = (student: Student) => {
    setStudentForm({
      enrollmentNo: student.enrollmentNo,
      name: student.name,
      fatherName: student.fatherName,
      motherName: student.motherName,
      email: student.email,
      contact: student.contact,
      address: student.address,
      dob: student.dob,
      gender: student.gender,
      category: student.category,
      course: student.course,
      batch: student.batch,
    });
    setEditingStudent(student);
    setIsStudentDialogOpen(true);
  };

  const editBook = (book: Book) => {
    setBookForm({
      title: book.title,
      author: book.author,
      subject: book.subject,
      price: book.price.toString(),
    });
    setEditingBook(book);
    setIsBookDialogOpen(true);
  };

  const deleteStudent = (id: string) => {
    setStudents(students.filter((student) => student.id !== id));
    toast.success("Student deleted successfully");
  };

  const deleteBook = (id: string) => {
    setBooks(books.filter((book) => book.id !== id));
    toast.success("Book deleted successfully");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Student Management System
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive student management and educational resources
          </p>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="books">Books</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
          <TabsTrigger value="tests">Tests</TabsTrigger>
          <TabsTrigger value="live-classes">Live Classes</TabsTrigger>
          <TabsTrigger value="self-learning">Self Learning</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        {/* Students Tab */}
        <TabsContent value="students">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Student Records</span>
              </CardTitle>
              <Dialog
                open={isStudentDialogOpen}
                onOpenChange={setIsStudentDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingStudent(null)}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Student
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingStudent
                        ? "Edit Student"
                        : "New Student Registration"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleStudentSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="enrollmentNo">Enrollment Number</Label>
                        <Input
                          id="enrollmentNo"
                          value={studentForm.enrollmentNo}
                          onChange={(e) =>
                            setStudentForm({
                              ...studentForm,
                              enrollmentNo: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="name">Student Name</Label>
                        <Input
                          id="name"
                          value={studentForm.name}
                          onChange={(e) =>
                            setStudentForm({
                              ...studentForm,
                              name: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fatherName">Father's Name</Label>
                        <Input
                          id="fatherName"
                          value={studentForm.fatherName}
                          onChange={(e) =>
                            setStudentForm({
                              ...studentForm,
                              fatherName: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="motherName">Mother's Name</Label>
                        <Input
                          id="motherName"
                          value={studentForm.motherName}
                          onChange={(e) =>
                            setStudentForm({
                              ...studentForm,
                              motherName: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={studentForm.email}
                          onChange={(e) =>
                            setStudentForm({
                              ...studentForm,
                              email: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact">Contact</Label>
                        <Input
                          id="contact"
                          value={studentForm.contact}
                          onChange={(e) =>
                            setStudentForm({
                              ...studentForm,
                              contact: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input
                          id="dob"
                          type="date"
                          value={studentForm.dob}
                          onChange={(e) =>
                            setStudentForm({
                              ...studentForm,
                              dob: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select
                          value={studentForm.gender}
                          onValueChange={(value) =>
                            setStudentForm({ ...studentForm, gender: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={studentForm.category}
                          onValueChange={(value) =>
                            setStudentForm({ ...studentForm, category: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="General">General</SelectItem>
                            <SelectItem value="OBC">OBC</SelectItem>
                            <SelectItem value="SC">SC</SelectItem>
                            <SelectItem value="ST">ST</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="course">Course</Label>
                        <Select
                          value={studentForm.course}
                          onValueChange={(value) =>
                            setStudentForm({ ...studentForm, course: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select course" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Computer Science">
                              Computer Science
                            </SelectItem>
                            <SelectItem value="Digital Marketing">
                              Digital Marketing
                            </SelectItem>
                            <SelectItem value="Web Development">
                              Web Development
                            </SelectItem>
                            <SelectItem value="Data Science">
                              Data Science
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="batch">Batch</Label>
                        <Input
                          id="batch"
                          value={studentForm.batch}
                          onChange={(e) =>
                            setStudentForm({
                              ...studentForm,
                              batch: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        value={studentForm.address}
                        onChange={(e) =>
                          setStudentForm({
                            ...studentForm,
                            address: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={resetStudentForm}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingStudent ? "Update" : "Register"} Student
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
                    <TableHead>Enrollment No</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Batch</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Fee Status</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        {student.enrollmentNo}
                      </TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.course}</TableCell>
                      <TableCell>{student.batch}</TableCell>
                      <TableCell>{student.contact}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            student.feeStatus === "paid"
                              ? "default"
                              : student.feeStatus === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                          className={
                            student.feeStatus === "paid"
                              ? "bg-success text-white"
                              : ""
                          }
                        >
                          {student.feeStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            student.status === "active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {student.status}
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
                            onClick={() => editStudent(student)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteStudent(student.id)}
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

        {/* Books & Library Tab */}
        <TabsContent value="books">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Books & Library Management</span>
              </CardTitle>
              <Dialog
                open={isBookDialogOpen}
                onOpenChange={setIsBookDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingBook(null)}>
                    <Upload className="h-4 w-4 mr-2" />
                    Add Book
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingBook ? "Edit Book" : "Add New Book"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleBookSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Book Title</Label>
                      <Input
                        id="title"
                        value={bookForm.title}
                        onChange={(e) =>
                          setBookForm({ ...bookForm, title: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="author">Author</Label>
                      <Input
                        id="author"
                        value={bookForm.author}
                        onChange={(e) =>
                          setBookForm({ ...bookForm, author: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={bookForm.subject}
                        onChange={(e) =>
                          setBookForm({ ...bookForm, subject: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (₹)</Label>
                      <Input
                        id="price"
                        type="number"
                        value={bookForm.price}
                        onChange={(e) =>
                          setBookForm({ ...bookForm, price: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Book Cover Image</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-500">
                          Upload book cover image
                        </p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Choose Image
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Book PDF</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <FileText className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-500">Upload book PDF</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Choose PDF
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={resetBookForm}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingBook ? "Update" : "Add"} Book
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book) => (
                  <Card key={book.id} className="overflow-hidden">
                    <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-800 relative">
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge
                        className="absolute top-2 right-2"
                        variant={
                          book.status === "available" ? "default" : "secondary"
                        }
                      >
                        {book.status}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-1">
                        {book.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        by {book.author}
                      </p>
                      <p className="text-sm text-gray-500 mb-2">
                        {book.subject}
                      </p>
                      <p className="text-lg font-bold text-primary mb-3">
                        ₹{book.price}
                      </p>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => editBook(book)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteBook(book.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Results Tab */}
        <TabsContent value="results">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>Result Management</span>
              </CardTitle>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Results
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Award className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 dark:text-gray-400">
                  Results management functionality will be available here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tabs with placeholder content */}
        <TabsContent value="scholarships">
          <Card>
            <CardHeader>
              <CardTitle>Scholarship Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Award className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 dark:text-gray-400">
                  Scholarship management functionality coming soon
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tests">
          <Card>
            <CardHeader>
              <CardTitle>Test & Quiz Builder</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <HelpCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 dark:text-gray-400">
                  Test and quiz builder functionality coming soon
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="live-classes">
          <Card>
            <CardHeader>
              <CardTitle>Live Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Video className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 dark:text-gray-400">
                  Live classes management functionality coming soon
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="self-learning">
          <Card>
            <CardHeader>
              <CardTitle>Self Learning Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 dark:text-gray-400">
                  Self learning resources functionality coming soon
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Student Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 dark:text-gray-400">
                  Document management functionality coming soon
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
