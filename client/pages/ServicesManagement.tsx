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
  Briefcase,
  Plus,
  Edit,
  Trash2,
  Eye,
  Upload,
  Save,
  DollarSign,
  Clock,
  Users,
  Star,
  FileText,
} from "lucide-react";
import { toast } from "sonner";

interface Service {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  duration: string;
  category: string;
  image: string;
  status: "active" | "inactive" | "draft";
  featured: boolean;
  rating: number;
  enrollments: number;
  instructor: string;
  prerequisites: string[];
  benefits: string[];
  syllabus: string[];
  createdDate: string;
  updatedDate: string;
}

interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  serviceCount: number;
  isActive: boolean;
}

interface ServicePage {
  id: string;
  serviceId: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  lastUpdated: string;
}

const mockServices: Service[] = [
  {
    id: "1",
    title: "Full Stack Web Development",
    description:
      "Comprehensive web development course covering frontend and backend technologies including React, Node.js, databases, and deployment strategies.",
    shortDescription: "Learn complete web development from scratch",
    price: 15999,
    duration: "6 months",
    category: "Web Development",
    image: "/placeholder.svg",
    status: "active",
    featured: true,
    rating: 4.8,
    enrollments: 245,
    instructor: "John Doe",
    prerequisites: ["Basic Computer Knowledge", "HTML/CSS Basics"],
    benefits: [
      "Industry-ready skills",
      "Portfolio projects",
      "Job placement assistance",
      "Lifetime access",
    ],
    syllabus: [
      "HTML5 & CSS3 Fundamentals",
      "JavaScript ES6+",
      "React.js Development",
      "Node.js & Express",
      "Database Design & Management",
      "API Development",
      "Testing & Deployment",
    ],
    createdDate: "2024-01-15",
    updatedDate: "2024-01-20",
  },
  {
    id: "2",
    title: "Digital Marketing Mastery",
    description:
      "Master digital marketing strategies including SEO, social media marketing, content marketing, email marketing, and paid advertising.",
    shortDescription: "Complete digital marketing course for businesses",
    price: 12999,
    duration: "4 months",
    category: "Marketing",
    image: "/placeholder.svg",
    status: "active",
    featured: false,
    rating: 4.6,
    enrollments: 189,
    instructor: "Jane Smith",
    prerequisites: ["Basic Internet Knowledge"],
    benefits: [
      "Practical marketing skills",
      "Real campaign experience",
      "Certification",
      "Career support",
    ],
    syllabus: [
      "Digital Marketing Fundamentals",
      "Search Engine Optimization",
      "Social Media Marketing",
      "Content Marketing Strategy",
      "Email Marketing",
      "Paid Advertising (PPC)",
      "Analytics & Reporting",
    ],
    createdDate: "2024-01-10",
    updatedDate: "2024-01-18",
  },
];

const mockCategories: ServiceCategory[] = [
  {
    id: "1",
    name: "Web Development",
    description: "Frontend and backend web development services",
    icon: "code",
    color: "#3B82F6",
    serviceCount: 12,
    isActive: true,
  },
  {
    id: "2",
    name: "Marketing",
    description: "Digital marketing and business promotion services",
    icon: "megaphone",
    color: "#10B981",
    serviceCount: 8,
    isActive: true,
  },
  {
    id: "3",
    name: "Data Science",
    description: "Data analysis and machine learning services",
    icon: "bar-chart",
    color: "#F59E0B",
    serviceCount: 6,
    isActive: true,
  },
];

export default function ServicesManagement() {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [categories, setCategories] =
    useState<ServiceCategory[]>(mockCategories);
  const [activeTab, setActiveTab] = useState("services");
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isPageDialogOpen, setIsPageDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingCategory, setEditingCategory] =
    useState<ServiceCategory | null>(null);
  const [viewingService, setViewingService] = useState<Service | null>(null);

  const [serviceForm, setServiceForm] = useState({
    title: "",
    description: "",
    shortDescription: "",
    price: "",
    duration: "",
    category: "",
    instructor: "",
    prerequisites: "",
    benefits: "",
    syllabus: "",
  });

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
    color: "#3B82F6",
  });

  const [pageContent, setPageContent] = useState({
    content: "",
    metaTitle: "",
    metaDescription: "",
    keywords: "",
  });

  const handleServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prerequisitesArray = serviceForm.prerequisites
      .split("\n")
      .filter((item) => item.trim());
    const benefitsArray = serviceForm.benefits
      .split("\n")
      .filter((item) => item.trim());
    const syllabusArray = serviceForm.syllabus
      .split("\n")
      .filter((item) => item.trim());

    if (editingService) {
      setServices(
        services.map((service) =>
          service.id === editingService.id
            ? {
                ...service,
                ...serviceForm,
                price: parseFloat(serviceForm.price),
                prerequisites: prerequisitesArray,
                benefits: benefitsArray,
                syllabus: syllabusArray,
                updatedDate: new Date().toISOString().split("T")[0],
              }
            : service,
        ),
      );
      toast.success("Service updated successfully");
    } else {
      const newService: Service = {
        id: Date.now().toString(),
        ...serviceForm,
        price: parseFloat(serviceForm.price),
        prerequisites: prerequisitesArray,
        benefits: benefitsArray,
        syllabus: syllabusArray,
        image: "/placeholder.svg",
        status: "draft",
        featured: false,
        rating: 0,
        enrollments: 0,
        createdDate: new Date().toISOString().split("T")[0],
        updatedDate: new Date().toISOString().split("T")[0],
      };
      setServices([...services, newService]);
      toast.success("Service created successfully");
    }
    resetServiceForm();
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
      const newCategory: ServiceCategory = {
        id: Date.now().toString(),
        ...categoryForm,
        icon: "briefcase",
        serviceCount: 0,
        isActive: true,
      };
      setCategories([...categories, newCategory]);
      toast.success("Category created successfully");
    }
    resetCategoryForm();
  };

  const resetServiceForm = () => {
    setServiceForm({
      title: "",
      description: "",
      shortDescription: "",
      price: "",
      duration: "",
      category: "",
      instructor: "",
      prerequisites: "",
      benefits: "",
      syllabus: "",
    });
    setEditingService(null);
    setIsServiceDialogOpen(false);
  };

  const resetCategoryForm = () => {
    setCategoryForm({
      name: "",
      description: "",
      color: "#3B82F6",
    });
    setEditingCategory(null);
    setIsCategoryDialogOpen(false);
  };

  const editService = (service: Service) => {
    setServiceForm({
      title: service.title,
      description: service.description,
      shortDescription: service.shortDescription,
      price: service.price.toString(),
      duration: service.duration,
      category: service.category,
      instructor: service.instructor,
      prerequisites: service.prerequisites.join("\n"),
      benefits: service.benefits.join("\n"),
      syllabus: service.syllabus.join("\n"),
    });
    setEditingService(service);
    setIsServiceDialogOpen(true);
  };

  const deleteService = (id: string) => {
    setServices(services.filter((service) => service.id !== id));
    toast.success("Service deleted successfully");
  };

  const toggleServiceFeatured = (id: string) => {
    setServices(
      services.map((service) =>
        service.id === id
          ? { ...service, featured: !service.featured }
          : service,
      ),
    );
    toast.success("Service featured status updated");
  };

  const updateServiceStatus = (id: string, status: Service["status"]) => {
    setServices(
      services.map((service) =>
        service.id === id ? { ...service, status } : service,
      ),
    );
    toast.success(`Service ${status} successfully`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Services Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage educational services, courses, and offerings
          </p>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="pages">Service Pages</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Services Tab */}
        <TabsContent value="services">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5" />
                <span>Service Catalog</span>
              </CardTitle>
              <Dialog
                open={isServiceDialogOpen}
                onOpenChange={setIsServiceDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingService(null)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Service
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingService ? "Edit Service" : "Create New Service"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleServiceSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="title">Service Title</Label>
                        <Input
                          id="title"
                          value={serviceForm.title}
                          onChange={(e) =>
                            setServiceForm({
                              ...serviceForm,
                              title: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="shortDescription">
                          Short Description
                        </Label>
                        <Input
                          id="shortDescription"
                          value={serviceForm.shortDescription}
                          onChange={(e) =>
                            setServiceForm({
                              ...serviceForm,
                              shortDescription: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={serviceForm.category}
                          onValueChange={(value) =>
                            setServiceForm({ ...serviceForm, category: value })
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
                        <Label htmlFor="instructor">Instructor</Label>
                        <Input
                          id="instructor"
                          value={serviceForm.instructor}
                          onChange={(e) =>
                            setServiceForm({
                              ...serviceForm,
                              instructor: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="price">Price (₹)</Label>
                        <Input
                          id="price"
                          type="number"
                          value={serviceForm.price}
                          onChange={(e) =>
                            setServiceForm({
                              ...serviceForm,
                              price: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration</Label>
                        <Input
                          id="duration"
                          value={serviceForm.duration}
                          onChange={(e) =>
                            setServiceForm({
                              ...serviceForm,
                              duration: e.target.value,
                            })
                          }
                          placeholder="e.g., 6 months"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Detailed Description</Label>
                      <Textarea
                        id="description"
                        value={serviceForm.description}
                        onChange={(e) =>
                          setServiceForm({
                            ...serviceForm,
                            description: e.target.value,
                          })
                        }
                        rows={4}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="prerequisites">
                        Prerequisites (one per line)
                      </Label>
                      <Textarea
                        id="prerequisites"
                        value={serviceForm.prerequisites}
                        onChange={(e) =>
                          setServiceForm({
                            ...serviceForm,
                            prerequisites: e.target.value,
                          })
                        }
                        rows={3}
                        placeholder="Enter each prerequisite on a new line"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="benefits">Benefits (one per line)</Label>
                      <Textarea
                        id="benefits"
                        value={serviceForm.benefits}
                        onChange={(e) =>
                          setServiceForm({
                            ...serviceForm,
                            benefits: e.target.value,
                          })
                        }
                        rows={3}
                        placeholder="Enter each benefit on a new line"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="syllabus">
                        Syllabus (one topic per line)
                      </Label>
                      <Textarea
                        id="syllabus"
                        value={serviceForm.syllabus}
                        onChange={(e) =>
                          setServiceForm({
                            ...serviceForm,
                            syllabus: e.target.value,
                          })
                        }
                        rows={5}
                        placeholder="Enter each topic on a new line"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Service Image</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-500">
                          Upload service image
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
                        onClick={resetServiceForm}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingService ? "Update" : "Create"} Service
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
                    <TableHead>Service</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Enrollments</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-medium flex items-center space-x-2">
                              <span>{service.title}</span>
                              {service.featured && (
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              )}
                            </div>
                            <div className="text-sm text-gray-500">
                              {service.shortDescription}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          style={{
                            backgroundColor: categories.find(
                              (c) => c.name === service.category,
                            )?.color,
                          }}
                        >
                          {service.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4" />
                          <span>₹{service.price.toLocaleString()}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{service.enrollments}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span>{service.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={service.status}
                          onValueChange={(value: Service["status"]) =>
                            updateServiceStatus(service.id, value)
                          }
                        >
                          <SelectTrigger className="w-32">
                            <Badge
                              variant={
                                service.status === "active"
                                  ? "default"
                                  : service.status === "inactive"
                                    ? "destructive"
                                    : "secondary"
                              }
                            >
                              {service.status}
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
                            onClick={() => setViewingService(service)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => editService(service)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleServiceFeatured(service.id)}
                          >
                            <Star className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteService(service.id)}
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

        {/* Categories Tab */}
        <TabsContent value="categories">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Service Categories</CardTitle>
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
                    <div className="space-y-2">
                      <Label htmlFor="color">Color</Label>
                      <Input
                        id="color"
                        type="color"
                        value={categoryForm.color}
                        onChange={(e) =>
                          setCategoryForm({
                            ...categoryForm,
                            color: e.target.value,
                          })
                        }
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
                      <div className="flex items-center space-x-3 mb-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        <h3 className="text-lg font-semibold">
                          {category.name}
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">
                          {category.serviceCount} services
                        </Badge>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
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
        </TabsContent>

        {/* Service Pages Tab */}
        <TabsContent value="pages">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Service Detail Pages</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {services.map((service) => (
                  <Card key={service.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {service.title}
                          </h3>
                          <p className="text-gray-500">
                            Service detail page content and SEO settings
                          </p>
                        </div>
                        <Dialog
                          open={isPageDialogOpen}
                          onOpenChange={setIsPageDialogOpen}
                        >
                          <DialogTrigger asChild>
                            <Button variant="outline">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Page
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>
                                Edit Service Page: {service.title}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="pageContent">
                                  Page Content
                                </Label>
                                <Textarea
                                  id="pageContent"
                                  value={pageContent.content}
                                  onChange={(e) =>
                                    setPageContent({
                                      ...pageContent,
                                      content: e.target.value,
                                    })
                                  }
                                  rows={10}
                                  placeholder="Enter detailed service page content..."
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="metaTitle">Meta Title</Label>
                                  <Input
                                    id="metaTitle"
                                    value={pageContent.metaTitle}
                                    onChange={(e) =>
                                      setPageContent({
                                        ...pageContent,
                                        metaTitle: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="keywords">Keywords</Label>
                                  <Input
                                    id="keywords"
                                    value={pageContent.keywords}
                                    onChange={(e) =>
                                      setPageContent({
                                        ...pageContent,
                                        keywords: e.target.value,
                                      })
                                    }
                                    placeholder="Comma separated keywords"
                                  />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="metaDescription">
                                  Meta Description
                                </Label>
                                <Textarea
                                  id="metaDescription"
                                  value={pageContent.metaDescription}
                                  onChange={(e) =>
                                    setPageContent({
                                      ...pageContent,
                                      metaDescription: e.target.value,
                                    })
                                  }
                                  rows={3}
                                />
                              </div>
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline">Cancel</Button>
                                <Button>
                                  <Save className="h-4 w-4 mr-2" />
                                  Save Page
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <div className="text-sm text-gray-500">
                        Last updated: {service.updatedDate}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
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
                      Total Services
                    </p>
                    <p className="text-3xl font-bold">{services.length}</p>
                  </div>
                  <Briefcase className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Enrollments
                    </p>
                    <p className="text-3xl font-bold">
                      {services.reduce((sum, s) => sum + s.enrollments, 0)}
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Revenue
                    </p>
                    <p className="text-3xl font-bold">
                      ₹
                      {services
                        .reduce((sum, s) => sum + s.price * s.enrollments, 0)
                        .toLocaleString()}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Avg Rating
                    </p>
                    <p className="text-3xl font-bold">
                      {(
                        services.reduce((sum, s) => sum + s.rating, 0) /
                        services.length
                      ).toFixed(1)}
                    </p>
                  </div>
                  <Star className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* View Service Dialog */}
      {viewingService && (
        <Dialog
          open={!!viewingService}
          onOpenChange={() => setViewingService(null)}
        >
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{viewingService.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <img
                  src={viewingService.image}
                  alt={viewingService.title}
                  className="w-32 h-32 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {viewingService.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Category:</strong> {viewingService.category}
                    </div>
                    <div>
                      <strong>Instructor:</strong> {viewingService.instructor}
                    </div>
                    <div>
                      <strong>Duration:</strong> {viewingService.duration}
                    </div>
                    <div>
                      <strong>Price:</strong> ₹
                      {viewingService.price.toLocaleString()}
                    </div>
                    <div>
                      <strong>Enrollments:</strong> {viewingService.enrollments}
                    </div>
                    <div>
                      <strong>Rating:</strong> {viewingService.rating}/5.0
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Prerequisites</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {viewingService.prerequisites.map((prereq, index) => (
                    <li key={index}>{prereq}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Benefits</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {viewingService.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Syllabus</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {viewingService.syllabus.map((topic, index) => (
                    <li key={index}>{topic}</li>
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
