import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Plus,
  Edit,
  Save,
  Trash2,
  Clock,
  Users,
  Star,
  Upload,
} from "lucide-react";
import { toast } from "sonner";

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  level: "beginner" | "intermediate" | "advanced";
  price: string;
  instructor: string;
  image: string;
  syllabus: string[];
  features: string[];
  rating: number;
  studentsEnrolled: number;
  status: "active" | "inactive" | "coming-soon";
}

interface CourseCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Full Stack Web Development",
    description:
      "Complete web development course covering both frontend and backend technologies.",
    category: "Web Development",
    duration: "6 months",
    level: "intermediate",
    price: "₹25,000",
    instructor: "John Doe",
    image: "/placeholder.svg",
    syllabus: ["HTML/CSS", "JavaScript", "React", "Node.js", "Database"],
    features: ["Live Projects", "24/7 Support", "Job Assistance"],
    rating: 4.8,
    studentsEnrolled: 1250,
    status: "active",
  },
  {
    id: "2",
    title: "Data Science & Analytics",
    description:
      "Comprehensive data science course with Python, ML, and AI concepts.",
    category: "Data Science",
    duration: "8 months",
    level: "advanced",
    price: "₹35,000",
    instructor: "Jane Smith",
    image: "/placeholder.svg",
    syllabus: ["Python", "Statistics", "Machine Learning", "Deep Learning"],
    features: ["Industry Projects", "Certification", "Placement Support"],
    rating: 4.9,
    studentsEnrolled: 850,
    status: "active",
  },
];

const mockCategories: CourseCategory[] = [
  {
    id: "1",
    name: "Web Development",
    description: "Frontend and backend web development courses",
    icon: "💻",
  },
  {
    id: "2",
    name: "Data Science",
    description: "Data analysis, machine learning, and AI courses",
    icon: "📊",
  },
  {
    id: "3",
    name: "Mobile Development",
    description: "iOS and Android app development courses",
    icon: "📱",
  },
];

export default function OurCoursesPage() {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [categories, setCategories] =
    useState<CourseCategory[]>(mockCategories);
  const [isCourseDialogOpen, setIsCourseDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);

  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    category: "",
    duration: "",
    level: "beginner" as Course["level"],
    price: "",
    instructor: "",
    syllabus: "",
    features: "",
  });

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
    icon: "",
  });

  const [pageContent, setPageContent] = useState({
    pageTitle: "Our Courses",
    pageDescription:
      "Explore our comprehensive range of courses designed to help you achieve your career goals.",
    heroContent:
      "Transform your career with our industry-leading courses taught by expert instructors.",
  });

  const addCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      ...courseForm,
      syllabus: courseForm.syllabus.split(",").map((s) => s.trim()),
      features: courseForm.features.split(",").map((f) => f.trim()),
      image: "/placeholder.svg",
      rating: 0,
      studentsEnrolled: 0,
      status: "active",
    };
    setCourses([...courses, newCourse]);
    setCourseForm({
      title: "",
      description: "",
      category: "",
      duration: "",
      level: "beginner",
      price: "",
      instructor: "",
      syllabus: "",
      features: "",
    });
    setIsCourseDialogOpen(false);
    toast.success("Course added successfully");
  };

  const addCategory = () => {
    const newCategory: CourseCategory = {
      id: Date.now().toString(),
      ...categoryForm,
    };
    setCategories([...categories, newCategory]);
    setCategoryForm({ name: "", description: "", icon: "" });
    setIsCategoryDialogOpen(false);
    toast.success("Category added successfully");
  };

  const removeCourse = (courseId: string) => {
    setCourses(courses.filter((course) => course.id !== courseId));
    toast.success("Course removed successfully");
  };

  const removeCategory = (categoryId: string) => {
    setCategories(categories.filter((category) => category.id !== categoryId));
    toast.success("Category removed successfully");
  };

  const updateCourseStatus = (courseId: string, status: Course["status"]) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId ? { ...course, status } : course,
      ),
    );
    toast.success("Course status updated successfully");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Our Courses Page Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage course catalog, categories, and course page content
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Page Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>Page Content</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pageTitle">Page Title</Label>
              <Input
                id="pageTitle"
                value={pageContent.pageTitle}
                onChange={(e) =>
                  setPageContent({
                    ...pageContent,
                    pageTitle: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pageDescription">Page Description</Label>
              <Textarea
                id="pageDescription"
                value={pageContent.pageDescription}
                onChange={(e) =>
                  setPageContent({
                    ...pageContent,
                    pageDescription: e.target.value,
                  })
                }
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="heroContent">Hero Section Content</Label>
              <Textarea
                id="heroContent"
                value={pageContent.heroContent}
                onChange={(e) =>
                  setPageContent({
                    ...pageContent,
                    heroContent: e.target.value,
                  })
                }
                rows={3}
              />
            </div>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Page Content
            </Button>
          </CardContent>
        </Card>

        {/* Course Categories */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Course Categories</CardTitle>
            <Dialog
              open={isCategoryDialogOpen}
              onOpenChange={setIsCategoryDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Category</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="categoryName">Category Name</Label>
                    <Input
                      id="categoryName"
                      value={categoryForm.name}
                      onChange={(e) =>
                        setCategoryForm({
                          ...categoryForm,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="categoryIcon">Icon (emoji)</Label>
                    <Input
                      id="categoryIcon"
                      value={categoryForm.icon}
                      onChange={(e) =>
                        setCategoryForm({
                          ...categoryForm,
                          icon: e.target.value,
                        })
                      }
                      placeholder="e.g., 💻"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="categoryDescription">Description</Label>
                    <Textarea
                      id="categoryDescription"
                      value={categoryForm.description}
                      onChange={(e) =>
                        setCategoryForm({
                          ...categoryForm,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsCategoryDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={addCategory}>Add Category</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {categories.map((category) => (
                <Card key={category.id} className="border">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {category.description}
                    </p>
                    <div className="flex justify-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeCategory(category.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Courses */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Course Catalog</CardTitle>
            <Dialog
              open={isCourseDialogOpen}
              onOpenChange={setIsCourseDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Course
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Course</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="courseTitle">Course Title</Label>
                      <Input
                        id="courseTitle"
                        value={courseForm.title}
                        onChange={(e) =>
                          setCourseForm({
                            ...courseForm,
                            title: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="courseCategory">Category</Label>
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
                            <SelectItem key={category.id} value={category.name}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="courseDescription">Description</Label>
                    <Textarea
                      id="courseDescription"
                      value={courseForm.description}
                      onChange={(e) =>
                        setCourseForm({
                          ...courseForm,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
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
                      />
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
                      <Label htmlFor="price">Price</Label>
                      <Input
                        id="price"
                        value={courseForm.price}
                        onChange={(e) =>
                          setCourseForm({
                            ...courseForm,
                            price: e.target.value,
                          })
                        }
                        placeholder="e.g., ₹25,000"
                      />
                    </div>
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
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="syllabus">Syllabus (comma separated)</Label>
                    <Textarea
                      id="syllabus"
                      value={courseForm.syllabus}
                      onChange={(e) =>
                        setCourseForm({
                          ...courseForm,
                          syllabus: e.target.value,
                        })
                      }
                      rows={2}
                      placeholder="e.g., HTML/CSS, JavaScript, React"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="features">Features (comma separated)</Label>
                    <Textarea
                      id="features"
                      value={courseForm.features}
                      onChange={(e) =>
                        setCourseForm({
                          ...courseForm,
                          features: e.target.value,
                        })
                      }
                      rows={2}
                      placeholder="e.g., Live Projects, 24/7 Support"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsCourseDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={addCourse}>Add Course</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courses.map((course) => (
                <Card key={course.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex space-x-4">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div>
                          <h3 className="font-semibold text-lg">
                            {course.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {course.description}
                          </p>
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{course.duration}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Users className="h-4 w-4" />
                              <span>{course.studentsEnrolled} students</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Star className="h-4 w-4" />
                              <span>{course.rating}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            course.status === "active" ? "default" : "secondary"
                          }
                        >
                          {course.status}
                        </Badge>
                        <Select
                          value={course.status}
                          onValueChange={(value: Course["status"]) =>
                            updateCourseStatus(course.id, value)
                          }
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="coming-soon">
                              Coming Soon
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-lg font-semibold text-primary">
                        {course.price}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeCourse(course.id)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
