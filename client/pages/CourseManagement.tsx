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
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Eye,
  Users,
  Clock,
  DollarSign,
  Upload,
  Star,
} from "lucide-react";
import { toast } from "sonner";

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  instructor: string;
  duration: string;
  price: number;
  level: "beginner" | "intermediate" | "advanced";
  status: "active" | "inactive" | "draft";
  image: string;
  enrolledStudents: number;
  rating: number;
  createdDate: string;
  syllabus: string[];
  prerequisites: string[];
}

interface CourseCategory {
  id: string;
  name: string;
  description: string;
  courseCount: number;
}

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Full Stack Web Development",
    description:
      "Complete web development course covering frontend and backend technologies",
    category: "Web Development",
    instructor: "John Doe",
    duration: "6 months",
    price: 15999,
    level: "intermediate",
    status: "active",
    image: "/placeholder.svg",
    enrolledStudents: 245,
    rating: 4.8,
    createdDate: "2024-01-15",
    syllabus: [
      "HTML, CSS, JavaScript",
      "React.js Fundamentals",
      "Node.js & Express",
      "Database Design",
      "API Development",
      "Deployment & DevOps",
    ],
    prerequisites: ["Basic computer knowledge", "HTML/CSS basics"],
  },
  {
    id: "2",
    title: "Digital Marketing Mastery",
    description: "Comprehensive digital marketing course for modern businesses",
    category: "Marketing",
    instructor: "Jane Smith",
    duration: "4 months",
    price: 12999,
    level: "beginner",
    status: "active",
    image: "/placeholder.svg",
    enrolledStudents: 189,
    rating: 4.6,
    createdDate: "2024-02-01",
    syllabus: [
      "SEO Fundamentals",
      "Social Media Marketing",
      "Content Marketing",
      "Email Marketing",
      "PPC Advertising",
      "Analytics & Reporting",
    ],
    prerequisites: ["Basic internet knowledge"],
  },
];

const mockCategories: CourseCategory[] = [
  {
    id: "1",
    name: "Web Development",
    description: "Frontend and backend web development courses",
    courseCount: 12,
  },
  {
    id: "2",
    name: "Marketing",
    description: "Digital marketing and business courses",
    courseCount: 8,
  },
  {
    id: "3",
    name: "Data Science",
    description: "Data analysis and machine learning courses",
    courseCount: 6,
  },
];

export default function CourseManagement() {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [categories, setCategories] =
    useState<CourseCategory[]>(mockCategories);
  const [activeTab, setActiveTab] = useState("courses");
  const [isCourseDialogOpen, setIsCourseDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editingCategory, setEditingCategory] = useState<CourseCategory | null>(
    null,
  );
  const [viewingCourse, setViewingCourse] = useState<Course | null>(null);

  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    category: "",
    instructor: "",
    duration: "",
    price: "",
    level: "beginner" as Course["level"],
    syllabus: "",
    prerequisites: "",
  });

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
  });

  const handleCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const syllabusArray = courseForm.syllabus
      .split("\n")
      .filter((item) => item.trim());
    const prerequisitesArray = courseForm.prerequisites
      .split("\n")
      .filter((item) => item.trim());

    if (editingCourse) {
      setCourses(
        courses.map((course) =>
          course.id === editingCourse.id
            ? {
                ...course,
                ...courseForm,
                price: parseFloat(courseForm.price),
                syllabus: syllabusArray,
                prerequisites: prerequisitesArray,
              }
            : course,
        ),
      );
      toast.success("Course updated successfully");
    } else {
      const newCourse: Course = {
        id: Date.now().toString(),
        ...courseForm,
        price: parseFloat(courseForm.price),
        syllabus: syllabusArray,
        prerequisites: prerequisitesArray,
        status: "draft",
        image: "/placeholder.svg",
        enrolledStudents: 0,
        rating: 0,
        createdDate: new Date().toISOString().split("T")[0],
      };
      setCourses([...courses, newCourse]);
      toast.success("Course created successfully");
    }
    resetCourseForm();
  };

  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      setCategories(
        categories.map((category) =>
          category.id === editingCategory.id
            ? { ...category, ...categoryForm }
            : category,
        ),
      );
      toast.success("Category updated successfully");
    } else {
      const newCategory: CourseCategory = {
        id: Date.now().toString(),
        ...categoryForm,
        courseCount: 0,
      };
      setCategories([...categories, newCategory]);
      toast.success("Category created successfully");
    }
    resetCategoryForm();
  };

  const resetCourseForm = () => {
    setCourseForm({
      title: "",
      description: "",
      category: "",
      instructor: "",
      duration: "",
      price: "",
      level: "beginner",
      syllabus: "",
      prerequisites: "",
    });
    setEditingCourse(null);
    setIsCourseDialogOpen(false);
  };

  const resetCategoryForm = () => {
    setCategoryForm({
      name: "",
      description: "",
    });
    setEditingCategory(null);
    setIsCategoryDialogOpen(false);
  };

  const editCourse = (course: Course) => {
    setCourseForm({
      title: course.title,
      description: course.description,
      category: course.category,
      instructor: course.instructor,
      duration: course.duration,
      price: course.price.toString(),
      level: course.level,
      syllabus: course.syllabus.join("\n"),
      prerequisites: course.prerequisites.join("\n"),
    });
    setEditingCourse(course);
    setIsCourseDialogOpen(true);
  };

  const editCategory = (category: CourseCategory) => {
    setCategoryForm({
      name: category.name,
      description: category.description,
    });
    setEditingCategory(category);
    setIsCategoryDialogOpen(true);
  };

  const deleteCourse = (id: string) => {
    setCourses(courses.filter((course) => course.id !== id));
    toast.success("Course deleted successfully");
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter((category) => category.id !== id));
    toast.success("Category deleted successfully");
  };

  const updateCourseStatus = (id: string, status: Course["status"]) => {
    setCourses(
      courses.map((course) =>
        course.id === id ? { ...course, status } : course,
      ),
    );
    toast.success(
      `Course ${status === "active" ? "activated" : status === "inactive" ? "deactivated" : "saved as draft"} successfully`,
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Course Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create and manage educational courses and categories
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
        <button
          onClick={() => setActiveTab("courses")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
            activeTab === "courses"
              ? "bg-white dark:bg-gray-700 text-primary shadow-sm"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>Courses</span>
        </button>
        <button
          onClick={() => setActiveTab("categories")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
            activeTab === "categories"
              ? "bg-white dark:bg-gray-700 text-primary shadow-sm"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          <Plus className="h-4 w-4" />
          <span>Categories</span>
        </button>
      </div>

      {/* Courses Tab */}
      {activeTab === "courses" && (
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Course Catalog</span>
              </CardTitle>
              <Dialog
                open={isCourseDialogOpen}
                onOpenChange={setIsCourseDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingCourse(null)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Course
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingCourse ? "Edit Course" : "Create New Course"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleCourseSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Course Title</Label>
                        <Input
                          id="title"
                          value={courseForm.title}
                          onChange={(e) =>
                            setCourseForm({
                              ...courseForm,
                              title: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="instructor">Instructor</Label>
                        <Input
                          id="instructor"
                          value={courseForm.instructor}
                          onChange={(e) =>
                            setCourseForm({
                              ...courseForm,
                              instructor: e.target.value,
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
                        value={courseForm.description}
                        onChange={(e) =>
                          setCourseForm({
                            ...courseForm,
                            description: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={courseForm.category}
                          onValueChange={(value) =>
                            setCourseForm({ ...courseForm, category: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem
                                key={category.id}
                                value={category.name}
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration</Label>
                        <Input
                          id="duration"
                          value={courseForm.duration}
                          onChange={(e) =>
                            setCourseForm({
                              ...courseForm,
                              duration: e.target.value,
                            })
                          }
                          placeholder="e.g., 6 months"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="price">Price (₹)</Label>
                        <Input
                          id="price"
                          type="number"
                          value={courseForm.price}
                          onChange={(e) =>
                            setCourseForm({
                              ...courseForm,
                              price: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="level">Level</Label>
                      <Select
                        value={courseForm.level}
                        onValueChange={(value: Course["level"]) =>
                          setCourseForm({ ...courseForm, level: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">
                            Intermediate
                          </SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="syllabus">
                        Syllabus (one topic per line)
                      </Label>
                      <Textarea
                        id="syllabus"
                        value={courseForm.syllabus}
                        onChange={(e) =>
                          setCourseForm({
                            ...courseForm,
                            syllabus: e.target.value,
                          })
                        }
                        placeholder="Enter each topic on a new line"
                        rows={5}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="prerequisites">
                        Prerequisites (one per line)
                      </Label>
                      <Textarea
                        id="prerequisites"
                        value={courseForm.prerequisites}
                        onChange={(e) =>
                          setCourseForm({
                            ...courseForm,
                            prerequisites: e.target.value,
                          })
                        }
                        placeholder="Enter each prerequisite on a new line"
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Course Image</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-500">
                          Upload course thumbnail
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
                        onClick={resetCourseForm}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingCourse ? "Update" : "Create"} Course
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
                    <TableHead>Course</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Instructor</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-medium">{course.title}</div>
                            <div className="text-sm text-gray-500 capitalize">
                              {course.level}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{course.category}</TableCell>
                      <TableCell>{course.instructor}</TableCell>
                      <TableCell>{course.duration}</TableCell>
                      <TableCell>₹{course.price.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{course.enrolledStudents}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span>{course.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={course.status}
                          onValueChange={(value: Course["status"]) =>
                            updateCourseStatus(course.id, value)
                          }
                        >
                          <SelectTrigger className="w-32">
                            <Badge
                              variant={
                                course.status === "active"
                                  ? "default"
                                  : course.status === "inactive"
                                    ? "destructive"
                                    : "secondary"
                              }
                            >
                              {course.status}
                            </Badge>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setViewingCourse(course)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => editCourse(course)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteCourse(course.id)}
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
      )}

      {/* Categories Tab */}
      {activeTab === "categories" && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Course Categories</CardTitle>
            <Dialog
              open={isCategoryDialogOpen}
              onOpenChange={setIsCategoryDialogOpen}
            >
              <DialogTrigger asChild>
                <Button onClick={() => setEditingCategory(null)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingCategory ? "Edit Category" : "Add New Category"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCategorySubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Category Name</Label>
                    <Input
                      id="name"
                      value={categoryForm.name}
                      onChange={(e) =>
                        setCategoryForm({
                          ...categoryForm,
                          name: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={categoryForm.description}
                      onChange={(e) =>
                        setCategoryForm({
                          ...categoryForm,
                          description: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetCategoryForm}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingCategory ? "Update" : "Add"} Category
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Card key={category.id}>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">
                        {category.courseCount} courses
                      </Badge>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => editCategory(category)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteCategory(category.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Course Detail Dialog */}
      {viewingCourse && (
        <Dialog
          open={!!viewingCourse}
          onOpenChange={() => setViewingCourse(null)}
        >
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{viewingCourse.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <img
                  src={viewingCourse.image}
                  alt={viewingCourse.title}
                  className="w-32 h-32 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {viewingCourse.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Instructor:</strong> {viewingCourse.instructor}
                    </div>
                    <div>
                      <strong>Duration:</strong> {viewingCourse.duration}
                    </div>
                    <div>
                      <strong>Level:</strong> {viewingCourse.level}
                    </div>
                    <div>
                      <strong>Price:</strong> ₹
                      {viewingCourse.price.toLocaleString()}
                    </div>
                    <div>
                      <strong>Students:</strong>{" "}
                      {viewingCourse.enrolledStudents}
                    </div>
                    <div>
                      <strong>Rating:</strong> {viewingCourse.rating}/5.0
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Course Syllabus</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {viewingCourse.syllabus.map((topic, index) => (
                    <li key={index}>{topic}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Prerequisites</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {viewingCourse.prerequisites.map((prerequisite, index) => (
                    <li key={index}>{prerequisite}</li>
                  ))}
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
