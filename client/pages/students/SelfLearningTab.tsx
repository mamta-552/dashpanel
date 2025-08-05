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
  ExternalLink,
  Video,
  FileText,
  Link as LinkIcon,
} from "lucide-react";
import { toast } from "sonner";

interface LearningResource {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  type: "video" | "article" | "tutorial" | "documentation" | "course" | "other";
  difficulty: "beginner" | "intermediate" | "advanced";
  duration?: string; // For videos/courses
  subject: string;
  addedDate: string;
  isVerified: boolean;
  tags: string[];
}

const mockResources: LearningResource[] = [
  {
    id: "1",
    title: "React Official Documentation",
    description: "Complete guide to React concepts and API",
    url: "https://reactjs.org/docs",
    category: "Documentation",
    type: "documentation",
    difficulty: "intermediate",
    subject: "React",
    addedDate: "2024-01-15",
    isVerified: true,
    tags: ["react", "javascript", "frontend"],
  },
  {
    id: "2",
    title: "JavaScript ES6 Features",
    description: "Modern JavaScript features explained with examples",
    url: "https://javascript.info/es6",
    category: "Tutorial",
    type: "tutorial",
    difficulty: "intermediate",
    duration: "45 min",
    subject: "JavaScript",
    addedDate: "2024-01-20",
    isVerified: true,
    tags: ["javascript", "es6", "programming"],
  },
];

export default function SelfLearningTab() {
  const [resources, setResources] = useState<LearningResource[]>(mockResources);
  const [isResourceDialogOpen, setIsResourceDialogOpen] = useState(false);
  const [editingResource, setEditingResource] =
    useState<LearningResource | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");

  const [resourceForm, setResourceForm] = useState({
    title: "",
    description: "",
    url: "",
    category: "",
    type: "tutorial",
    difficulty: "beginner",
    duration: "",
    subject: "",
    tags: "",
  });

  const handleResourceSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingResource) {
      setResources(
        resources.map((resource) =>
          resource.id === editingResource.id
            ? {
                ...resource,
                title: resourceForm.title,
                description: resourceForm.description,
                url: resourceForm.url,
                category: resourceForm.category,
                type: resourceForm.type as LearningResource["type"],
                difficulty:
                  resourceForm.difficulty as LearningResource["difficulty"],
                duration: resourceForm.duration,
                subject: resourceForm.subject,
                tags: resourceForm.tags.split(",").map((tag) => tag.trim()),
              }
            : resource,
        ),
      );
      toast.success("Resource updated successfully");
    } else {
      const newResource: LearningResource = {
        id: Date.now().toString(),
        title: resourceForm.title,
        description: resourceForm.description,
        url: resourceForm.url,
        category: resourceForm.category,
        type: resourceForm.type as LearningResource["type"],
        difficulty: resourceForm.difficulty as LearningResource["difficulty"],
        duration: resourceForm.duration,
        subject: resourceForm.subject,
        addedDate: new Date().toISOString().split("T")[0],
        isVerified: false,
        tags: resourceForm.tags.split(",").map((tag) => tag.trim()),
      };
      setResources([...resources, newResource]);
      toast.success("Resource added successfully");
    }
    resetResourceForm();
  };

  const resetResourceForm = () => {
    setResourceForm({
      title: "",
      description: "",
      url: "",
      category: "",
      type: "tutorial",
      difficulty: "beginner",
      duration: "",
      subject: "",
      tags: "",
    });
    setEditingResource(null);
    setIsResourceDialogOpen(false);
  };

  const editResource = (resource: LearningResource) => {
    setResourceForm({
      title: resource.title,
      description: resource.description,
      url: resource.url,
      category: resource.category,
      type: resource.type,
      difficulty: resource.difficulty,
      duration: resource.duration || "",
      subject: resource.subject,
      tags: resource.tags.join(", "),
    });
    setEditingResource(resource);
    setIsResourceDialogOpen(true);
  };

  const deleteResource = (resourceId: string) => {
    setResources(resources.filter((resource) => resource.id !== resourceId));
    toast.success("Resource deleted successfully");
  };

  const verifyResource = (resourceId: string) => {
    setResources(
      resources.map((resource) =>
        resource.id === resourceId
          ? { ...resource, isVerified: true }
          : resource,
      ),
    );
    toast.success("Resource verified successfully");
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />;
      case "article":
      case "documentation":
        return <FileText className="h-4 w-4" />;
      default:
        return <LinkIcon className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "default";
      case "intermediate":
        return "secondary";
      case "advanced":
        return "destructive";
      default:
        return "outline";
    }
  };

  const filteredResources = resources.filter((resource) => {
    if (filterCategory !== "all" && resource.category !== filterCategory) {
      return false;
    }
    if (filterType !== "all" && resource.type !== filterType) {
      return false;
    }
    return true;
  });

  const categories = Array.from(
    new Set(resources.map((resource) => resource.category)),
  );
  const types = Array.from(new Set(resources.map((resource) => resource.type)));

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Self Learning Resources
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Curated learning materials and external resources
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <h3 className="font-semibold">Total Resources</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {resources.length} available
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Video className="h-8 w-8 mx-auto mb-2 text-red-500" />
            <h3 className="font-semibold">Videos</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {resources.filter((r) => r.type === "video").length} videos
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <FileText className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <h3 className="font-semibold">Articles</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {resources.filter((r) => r.type === "article").length} articles
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <LinkIcon className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <h3 className="font-semibold">Verified</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {resources.filter((r) => r.isVerified).length} verified
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center space-x-4">
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {types.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5" />
            <span>Learning Resources</span>
          </CardTitle>
          <Dialog
            open={isResourceDialogOpen}
            onOpenChange={setIsResourceDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Resource
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingResource ? "Edit Resource" : "Add New Resource"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleResourceSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={resourceForm.title}
                    onChange={(e) =>
                      setResourceForm({
                        ...resourceForm,
                        title: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={resourceForm.description}
                    onChange={(e) =>
                      setResourceForm({
                        ...resourceForm,
                        description: e.target.value,
                      })
                    }
                    placeholder="Brief description of the resource"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="url">URL *</Label>
                  <Input
                    id="url"
                    type="url"
                    value={resourceForm.url}
                    onChange={(e) =>
                      setResourceForm({ ...resourceForm, url: e.target.value })
                    }
                    placeholder="https://example.com"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Input
                      id="category"
                      value={resourceForm.category}
                      onChange={(e) =>
                        setResourceForm({
                          ...resourceForm,
                          category: e.target.value,
                        })
                      }
                      placeholder="e.g., Tutorial, Documentation"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type *</Label>
                    <Select
                      value={resourceForm.type}
                      onValueChange={(value) =>
                        setResourceForm({ ...resourceForm, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="article">Article</SelectItem>
                        <SelectItem value="tutorial">Tutorial</SelectItem>
                        <SelectItem value="documentation">
                          Documentation
                        </SelectItem>
                        <SelectItem value="course">Course</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty *</Label>
                    <Select
                      value={resourceForm.difficulty}
                      onValueChange={(value) =>
                        setResourceForm({ ...resourceForm, difficulty: value })
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
                    <Label htmlFor="duration">Duration (optional)</Label>
                    <Input
                      id="duration"
                      value={resourceForm.duration}
                      onChange={(e) =>
                        setResourceForm({
                          ...resourceForm,
                          duration: e.target.value,
                        })
                      }
                      placeholder="e.g., 30 min, 2 hours"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Select
                    value={resourceForm.subject}
                    onValueChange={(value) =>
                      setResourceForm({ ...resourceForm, subject: value })
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
                      <SelectItem value="JavaScript">JavaScript</SelectItem>
                      <SelectItem value="React">React</SelectItem>
                      <SelectItem value="Python">Python</SelectItem>
                      <SelectItem value="Node.js">Node.js</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={resourceForm.tags}
                    onChange={(e) =>
                      setResourceForm({ ...resourceForm, tags: e.target.value })
                    }
                    placeholder="react, javascript, frontend"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetResourceForm}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingResource ? "Update Resource" : "Add Resource"}
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
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResources.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(resource.type)}
                      <span>{resource.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{resource.type}</Badge>
                  </TableCell>
                  <TableCell>{resource.subject}</TableCell>
                  <TableCell>
                    <Badge variant={getDifficultyColor(resource.difficulty)}>
                      {resource.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell>{resource.duration || "N/A"}</TableCell>
                  <TableCell>
                    <Badge
                      variant={resource.isVerified ? "default" : "secondary"}
                    >
                      {resource.isVerified ? "Verified" : "Pending"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(resource.url, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editResource(resource)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {!resource.isVerified && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => verifyResource(resource.id)}
                        >
                          Verify
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteResource(resource.id)}
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
