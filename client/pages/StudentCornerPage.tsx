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
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Plus,
  Edit,
  Save,
  Trash2,
  Trophy,
  FileText,
  Calendar,
  Download,
  Upload,
} from "lucide-react";
import { toast } from "sonner";

interface StudentResource {
  id: string;
  title: string;
  description: string;
  category: "notes" | "assignments" | "projects" | "videos" | "documents";
  fileUrl: string;
  uploadDate: string;
  downloadCount: number;
}

interface Achievement {
  id: string;
  studentName: string;
  achievement: string;
  category: "academic" | "sports" | "cultural" | "competition";
  date: string;
  description: string;
  image: string;
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: "high" | "medium" | "low";
  publishDate: string;
  expiryDate: string;
  targetAudience: "all" | "new-students" | "graduates" | "specific";
}

const mockResources: StudentResource[] = [
  {
    id: "1",
    title: "React.js Complete Notes",
    description: "Comprehensive React.js study material with examples",
    category: "notes",
    fileUrl: "/placeholder.pdf",
    uploadDate: "2024-01-15",
    downloadCount: 245,
  },
  {
    id: "2",
    title: "Full Stack Project Assignment",
    description: "Build a complete web application using MERN stack",
    category: "assignments",
    fileUrl: "/placeholder.pdf",
    uploadDate: "2024-01-10",
    downloadCount: 128,
  },
];

const mockAchievements: Achievement[] = [
  {
    id: "1",
    studentName: "Rahul Sharma",
    achievement: "First Prize in Coding Competition",
    category: "competition",
    date: "2024-01-20",
    description:
      "Won the inter-college coding competition with innovative solution",
    image: "/placeholder.svg",
  },
  {
    id: "2",
    studentName: "Priya Patel",
    achievement: "Best Academic Performance",
    category: "academic",
    date: "2024-01-18",
    description: "Achieved highest GPA in Computer Science department",
    image: "/placeholder.svg",
  },
];

const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "New Semester Registration Open",
    content:
      "Registration for the upcoming semester is now open. Please submit your forms by the deadline.",
    priority: "high",
    publishDate: "2024-01-15",
    expiryDate: "2024-02-15",
    targetAudience: "all",
  },
];

export default function StudentCornerPage() {
  const [resources, setResources] = useState<StudentResource[]>(mockResources);
  const [achievements, setAchievements] =
    useState<Achievement[]>(mockAchievements);
  const [announcements, setAnnouncements] =
    useState<Announcement[]>(mockAnnouncements);

  const [isResourceDialogOpen, setIsResourceDialogOpen] = useState(false);
  const [isAchievementDialogOpen, setIsAchievementDialogOpen] = useState(false);
  const [isAnnouncementDialogOpen, setIsAnnouncementDialogOpen] =
    useState(false);

  const [resourceForm, setResourceForm] = useState({
    title: "",
    description: "",
    category: "notes" as StudentResource["category"],
  });

  const [achievementForm, setAchievementForm] = useState({
    studentName: "",
    achievement: "",
    category: "academic" as Achievement["category"],
    date: "",
    description: "",
  });

  const [announcementForm, setAnnouncementForm] = useState({
    title: "",
    content: "",
    priority: "medium" as Announcement["priority"],
    expiryDate: "",
    targetAudience: "all" as Announcement["targetAudience"],
  });

  const [pageContent, setPageContent] = useState({
    welcomeMessage: "Welcome to Student Corner",
    description:
      "Your one-stop destination for academic resources, achievements, and important announcements.",
    guidelines:
      "Please follow the community guidelines and respect academic integrity while using these resources.",
  });

  const addResource = () => {
    const newResource: StudentResource = {
      id: Date.now().toString(),
      ...resourceForm,
      fileUrl: "/placeholder.pdf",
      uploadDate: new Date().toISOString().split("T")[0],
      downloadCount: 0,
    };
    setResources([...resources, newResource]);
    setResourceForm({
      title: "",
      description: "",
      category: "notes",
    });
    setIsResourceDialogOpen(false);
    toast.success("Resource added successfully");
  };

  const addAchievement = () => {
    const newAchievement: Achievement = {
      id: Date.now().toString(),
      ...achievementForm,
      image: "/placeholder.svg",
    };
    setAchievements([...achievements, newAchievement]);
    setAchievementForm({
      studentName: "",
      achievement: "",
      category: "academic",
      date: "",
      description: "",
    });
    setIsAchievementDialogOpen(false);
    toast.success("Achievement added successfully");
  };

  const addAnnouncement = () => {
    const newAnnouncement: Announcement = {
      id: Date.now().toString(),
      ...announcementForm,
      publishDate: new Date().toISOString().split("T")[0],
    };
    setAnnouncements([...announcements, newAnnouncement]);
    setAnnouncementForm({
      title: "",
      content: "",
      priority: "medium",
      expiryDate: "",
      targetAudience: "all",
    });
    setIsAnnouncementDialogOpen(false);
    toast.success("Announcement added successfully");
  };

  const removeResource = (resourceId: string) => {
    setResources(resources.filter((resource) => resource.id !== resourceId));
    toast.success("Resource removed successfully");
  };

  const removeAchievement = (achievementId: string) => {
    setAchievements(
      achievements.filter((achievement) => achievement.id !== achievementId),
    );
    toast.success("Achievement removed successfully");
  };

  const removeAnnouncement = (announcementId: string) => {
    setAnnouncements(
      announcements.filter(
        (announcement) => announcement.id !== announcementId,
      ),
    );
    toast.success("Announcement removed successfully");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Student Corner Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage student resources, achievements, and announcements
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Page Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Page Content</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="welcomeMessage">Welcome Message</Label>
              <Input
                id="welcomeMessage"
                value={pageContent.welcomeMessage}
                onChange={(e) =>
                  setPageContent({
                    ...pageContent,
                    welcomeMessage: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={pageContent.description}
                onChange={(e) =>
                  setPageContent({
                    ...pageContent,
                    description: e.target.value,
                  })
                }
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="guidelines">Guidelines</Label>
              <Textarea
                id="guidelines"
                value={pageContent.guidelines}
                onChange={(e) =>
                  setPageContent({
                    ...pageContent,
                    guidelines: e.target.value,
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

        {/* Student Resources */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Student Resources</CardTitle>
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
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Resource</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="resourceTitle">Title</Label>
                    <Input
                      id="resourceTitle"
                      value={resourceForm.title}
                      onChange={(e) =>
                        setResourceForm({
                          ...resourceForm,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="resourceCategory">Category</Label>
                    <select
                      id="resourceCategory"
                      value={resourceForm.category}
                      onChange={(e) =>
                        setResourceForm({
                          ...resourceForm,
                          category: e.target
                            .value as StudentResource["category"],
                        })
                      }
                      className="w-full p-2 border rounded"
                    >
                      <option value="notes">Notes</option>
                      <option value="assignments">Assignments</option>
                      <option value="projects">Projects</option>
                      <option value="videos">Videos</option>
                      <option value="documents">Documents</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="resourceDescription">Description</Label>
                    <Textarea
                      id="resourceDescription"
                      value={resourceForm.description}
                      onChange={(e) =>
                        setResourceForm({
                          ...resourceForm,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Upload File</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-500">
                        Upload resource file
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Choose File
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsResourceDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={addResource}>Add Resource</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {resources.map((resource) => (
                <Card key={resource.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {resource.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {resource.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          <Badge variant="secondary">{resource.category}</Badge>
                          <span className="flex items-center space-x-1">
                            <Download className="h-4 w-4" />
                            <span>{resource.downloadCount} downloads</span>
                          </span>
                          <span>Uploaded: {resource.uploadDate}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeResource(resource.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Student Achievements */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Student Achievements</CardTitle>
            <Dialog
              open={isAchievementDialogOpen}
              onOpenChange={setIsAchievementDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Achievement
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Achievement</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentName">Student Name</Label>
                    <Input
                      id="studentName"
                      value={achievementForm.studentName}
                      onChange={(e) =>
                        setAchievementForm({
                          ...achievementForm,
                          studentName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="achievement">Achievement</Label>
                    <Input
                      id="achievement"
                      value={achievementForm.achievement}
                      onChange={(e) =>
                        setAchievementForm({
                          ...achievementForm,
                          achievement: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="achievementCategory">Category</Label>
                    <select
                      id="achievementCategory"
                      value={achievementForm.category}
                      onChange={(e) =>
                        setAchievementForm({
                          ...achievementForm,
                          category: e.target.value as Achievement["category"],
                        })
                      }
                      className="w-full p-2 border rounded"
                    >
                      <option value="academic">Academic</option>
                      <option value="sports">Sports</option>
                      <option value="cultural">Cultural</option>
                      <option value="competition">Competition</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="achievementDate">Date</Label>
                    <Input
                      id="achievementDate"
                      type="date"
                      value={achievementForm.date}
                      onChange={(e) =>
                        setAchievementForm({
                          ...achievementForm,
                          date: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="achievementDescription">Description</Label>
                    <Textarea
                      id="achievementDescription"
                      value={achievementForm.description}
                      onChange={(e) =>
                        setAchievementForm({
                          ...achievementForm,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsAchievementDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={addAchievement}>Add Achievement</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <img
                        src={achievement.image}
                        alt={achievement.studentName}
                        className="w-16 h-16 object-cover rounded-full"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">
                          {achievement.studentName}
                        </h3>
                        <p className="text-sm font-medium text-primary mb-1">
                          {achievement.achievement}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                          {achievement.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary">
                            {achievement.category}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {achievement.date}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeAchievement(achievement.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Announcements */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Student Announcements</CardTitle>
            <Dialog
              open={isAnnouncementDialogOpen}
              onOpenChange={setIsAnnouncementDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Announcement
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Announcement</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="announcementTitle">Title</Label>
                    <Input
                      id="announcementTitle"
                      value={announcementForm.title}
                      onChange={(e) =>
                        setAnnouncementForm({
                          ...announcementForm,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="announcementContent">Content</Label>
                    <Textarea
                      id="announcementContent"
                      value={announcementForm.content}
                      onChange={(e) =>
                        setAnnouncementForm({
                          ...announcementForm,
                          content: e.target.value,
                        })
                      }
                      rows={4}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <select
                        id="priority"
                        value={announcementForm.priority}
                        onChange={(e) =>
                          setAnnouncementForm({
                            ...announcementForm,
                            priority: e.target
                              .value as Announcement["priority"],
                          })
                        }
                        className="w-full p-2 border rounded"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="targetAudience">Target Audience</Label>
                      <select
                        id="targetAudience"
                        value={announcementForm.targetAudience}
                        onChange={(e) =>
                          setAnnouncementForm({
                            ...announcementForm,
                            targetAudience: e.target
                              .value as Announcement["targetAudience"],
                          })
                        }
                        className="w-full p-2 border rounded"
                      >
                        <option value="all">All Students</option>
                        <option value="new-students">New Students</option>
                        <option value="graduates">Graduates</option>
                        <option value="specific">Specific Group</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      type="date"
                      value={announcementForm.expiryDate}
                      onChange={(e) =>
                        setAnnouncementForm({
                          ...announcementForm,
                          expiryDate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsAnnouncementDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={addAnnouncement}>Add Announcement</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <Card key={announcement.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {announcement.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {announcement.content}
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          <Badge
                            variant={
                              announcement.priority === "high"
                                ? "destructive"
                                : announcement.priority === "medium"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {announcement.priority} priority
                          </Badge>
                          <span>Target: {announcement.targetAudience}</span>
                          <span>Expires: {announcement.expiryDate}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeAnnouncement(announcement.id)}
                        >
                          <Trash2 className="h-3 w-3" />
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
