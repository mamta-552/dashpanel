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
  Video,
  Plus,
  Edit,
  Trash2,
  Eye,
  Play,
  Pause,
  Users,
  Clock,
  Calendar,
  Link,
  Copy,
  Download,
  Upload,
  MessageCircle,
  Share,
} from "lucide-react";
import { toast } from "sonner";

interface LiveClass {
  id: string;
  title: string;
  description: string;
  topic: string;
  instructor: string;
  course: string;
  scheduledDate: string;
  scheduledTime: string;
  duration: number; // in minutes
  joinLink: string;
  password?: string;
  status: "scheduled" | "live" | "completed" | "cancelled";
  maxParticipants: number;
  registeredParticipants: number;
  attendees: number;
  recording?: string;
  materials: string[];
  chatEnabled: boolean;
  screenShareEnabled: boolean;
  recordingEnabled: boolean;
  createdDate: string;
}

interface ClassAttendee {
  id: string;
  classId: string;
  studentId: string;
  studentName: string;
  email: string;
  joinedAt: string;
  leftAt?: string;
  duration: number;
  status: "attended" | "absent" | "late";
}

interface ClassMaterial {
  id: string;
  classId: string;
  name: string;
  type: "pdf" | "ppt" | "doc" | "video" | "image";
  url: string;
  uploadedAt: string;
  size: string;
}

const mockClasses: LiveClass[] = [
  {
    id: "1",
    title: "Introduction to React Hooks",
    description: "Learn about useState, useEffect, and custom hooks",
    topic: "React Fundamentals",
    instructor: "John Doe",
    course: "Web Development",
    scheduledDate: "2024-01-25",
    scheduledTime: "14:00",
    duration: 90,
    joinLink: "https://meet.google.com/abc-defg-hij",
    password: "ReactClass2024",
    status: "scheduled",
    maxParticipants: 50,
    registeredParticipants: 42,
    attendees: 0,
    materials: ["react-hooks-slides.pdf", "code-examples.zip"],
    chatEnabled: true,
    screenShareEnabled: true,
    recordingEnabled: true,
    createdDate: "2024-01-20",
  },
  {
    id: "2",
    title: "Advanced JavaScript Concepts",
    description: "Closures, prototypes, and asynchronous programming",
    topic: "JavaScript Advanced",
    instructor: "Jane Smith",
    course: "Web Development",
    scheduledDate: "2024-01-22",
    scheduledTime: "16:00",
    duration: 120,
    joinLink: "https://zoom.us/j/123456789",
    status: "completed",
    maxParticipants: 30,
    registeredParticipants: 28,
    attendees: 25,
    recording: "https://recordings.com/js-advanced-session",
    materials: ["js-advanced.pdf", "exercises.js"],
    chatEnabled: true,
    screenShareEnabled: true,
    recordingEnabled: true,
    createdDate: "2024-01-15",
  },
];

const mockAttendees: ClassAttendee[] = [
  {
    id: "1",
    classId: "2",
    studentId: "STU001",
    studentName: "Alice Johnson",
    email: "alice@student.com",
    joinedAt: "2024-01-22 16:05",
    leftAt: "2024-01-22 17:58",
    duration: 113,
    status: "attended",
  },
  {
    id: "2",
    classId: "2",
    studentId: "STU002",
    studentName: "Bob Wilson",
    email: "bob@student.com",
    joinedAt: "2024-01-22 16:15",
    leftAt: "2024-01-22 18:00",
    duration: 105,
    status: "late",
  },
];

const mockMaterials: ClassMaterial[] = [
  {
    id: "1",
    classId: "1",
    name: "React Hooks Guide.pdf",
    type: "pdf",
    url: "/materials/react-hooks-guide.pdf",
    uploadedAt: "2024-01-20 10:30",
    size: "2.5 MB",
  },
  {
    id: "2",
    classId: "1",
    name: "Code Examples.zip",
    type: "doc",
    url: "/materials/code-examples.zip",
    uploadedAt: "2024-01-20 11:00",
    size: "1.8 MB",
  },
];

export default function LiveClassesManagement() {
  const [classes, setClasses] = useState<LiveClass[]>(mockClasses);
  const [attendees, setAttendees] = useState<ClassAttendee[]>(mockAttendees);
  const [materials, setMaterials] = useState<ClassMaterial[]>(mockMaterials);
  const [activeTab, setActiveTab] = useState("classes");
  const [isClassDialogOpen, setIsClassDialogOpen] = useState(false);
  const [isMaterialDialogOpen, setIsMaterialDialogOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<LiveClass | null>(null);
  const [viewingClass, setViewingClass] = useState<LiveClass | null>(null);
  const [selectedClassId, setSelectedClassId] = useState<string>("");

  const [classForm, setClassForm] = useState({
    title: "",
    description: "",
    topic: "",
    instructor: "",
    course: "",
    scheduledDate: "",
    scheduledTime: "",
    duration: "",
    joinLink: "",
    password: "",
    maxParticipants: "",
    chatEnabled: true,
    screenShareEnabled: true,
    recordingEnabled: true,
  });

  const [materialForm, setMaterialForm] = useState({
    name: "",
    type: "pdf" as ClassMaterial["type"],
  });

  const handleClassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingClass) {
      setClasses(
        classes.map((cls) =>
          cls.id === editingClass.id
            ? {
                ...cls,
                ...classForm,
                duration: parseInt(classForm.duration),
                maxParticipants: parseInt(classForm.maxParticipants),
              }
            : cls,
        ),
      );
      toast.success("Live class updated successfully");
    } else {
      const newClass: LiveClass = {
        id: Date.now().toString(),
        ...classForm,
        duration: parseInt(classForm.duration),
        maxParticipants: parseInt(classForm.maxParticipants),
        status: "scheduled",
        registeredParticipants: 0,
        attendees: 0,
        materials: [],
        createdDate: new Date().toISOString().split("T")[0],
      };
      setClasses([...classes, newClass]);
      toast.success("Live class created successfully");
    }
    resetClassForm();
  };

  const resetClassForm = () => {
    setClassForm({
      title: "",
      description: "",
      topic: "",
      instructor: "",
      course: "",
      scheduledDate: "",
      scheduledTime: "",
      duration: "",
      joinLink: "",
      password: "",
      maxParticipants: "",
      chatEnabled: true,
      screenShareEnabled: true,
      recordingEnabled: true,
    });
    setEditingClass(null);
    setIsClassDialogOpen(false);
  };

  const editClass = (cls: LiveClass) => {
    setClassForm({
      title: cls.title,
      description: cls.description,
      topic: cls.topic,
      instructor: cls.instructor,
      course: cls.course,
      scheduledDate: cls.scheduledDate,
      scheduledTime: cls.scheduledTime,
      duration: cls.duration.toString(),
      joinLink: cls.joinLink,
      password: cls.password || "",
      maxParticipants: cls.maxParticipants.toString(),
      chatEnabled: cls.chatEnabled,
      screenShareEnabled: cls.screenShareEnabled,
      recordingEnabled: cls.recordingEnabled,
    });
    setEditingClass(cls);
    setIsClassDialogOpen(true);
  };

  const deleteClass = (id: string) => {
    setClasses(classes.filter((cls) => cls.id !== id));
    toast.success("Live class deleted successfully");
  };

  const updateClassStatus = (id: string, status: LiveClass["status"]) => {
    setClasses(
      classes.map((cls) => (cls.id === id ? { ...cls, status } : cls)),
    );
    toast.success(`Class ${status} successfully`);
  };

  const copyJoinLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success("Join link copied to clipboard");
  };

  const generateJoinLink = () => {
    const randomId = Math.random().toString(36).substring(2, 15);
    const link = `https://meet.eduadmin.com/${randomId}`;
    setClassForm({ ...classForm, joinLink: link });
    toast.success("Join link generated");
  };

  const uploadMaterial = () => {
    if (!selectedClassId) {
      toast.error("Please select a class first");
      return;
    }

    const newMaterial: ClassMaterial = {
      id: Date.now().toString(),
      classId: selectedClassId,
      name: materialForm.name,
      type: materialForm.type,
      url: `/materials/${materialForm.name}`,
      uploadedAt: new Date().toISOString(),
      size: "0 MB",
    };

    setMaterials([...materials, newMaterial]);
    setMaterialForm({ name: "", type: "pdf" });
    setIsMaterialDialogOpen(false);
    toast.success("Material uploaded successfully");
  };

  const getStatusColor = (status: LiveClass["status"]) => {
    switch (status) {
      case "scheduled":
        return "secondary";
      case "live":
        return "destructive";
      case "completed":
        return "default";
      case "cancelled":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Live Classes Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Schedule and manage live virtual classes
          </p>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="classes">Live Classes</TabsTrigger>
          <TabsTrigger value="attendees">Attendees</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="recordings">Recordings</TabsTrigger>
        </TabsList>

        {/* Live Classes Tab */}
        <TabsContent value="classes">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Video className="h-5 w-5" />
                <span>Virtual Classes</span>
              </CardTitle>
              <Dialog
                open={isClassDialogOpen}
                onOpenChange={setIsClassDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingClass(null)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Schedule Class
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingClass ? "Edit Live Class" : "Schedule New Class"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleClassSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="title">Class Title</Label>
                        <Input
                          id="title"
                          value={classForm.title}
                          onChange={(e) =>
                            setClassForm({
                              ...classForm,
                              title: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="topic">Topic</Label>
                        <Input
                          id="topic"
                          value={classForm.topic}
                          onChange={(e) =>
                            setClassForm({
                              ...classForm,
                              topic: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="instructor">Instructor</Label>
                        <Input
                          id="instructor"
                          value={classForm.instructor}
                          onChange={(e) =>
                            setClassForm({
                              ...classForm,
                              instructor: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="course">Course</Label>
                        <Input
                          id="course"
                          value={classForm.course}
                          onChange={(e) =>
                            setClassForm({
                              ...classForm,
                              course: e.target.value,
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
                          value={classForm.duration}
                          onChange={(e) =>
                            setClassForm({
                              ...classForm,
                              duration: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="scheduledDate">Date</Label>
                        <Input
                          id="scheduledDate"
                          type="date"
                          value={classForm.scheduledDate}
                          onChange={(e) =>
                            setClassForm({
                              ...classForm,
                              scheduledDate: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="scheduledTime">Time</Label>
                        <Input
                          id="scheduledTime"
                          type="time"
                          value={classForm.scheduledTime}
                          onChange={(e) =>
                            setClassForm({
                              ...classForm,
                              scheduledTime: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maxParticipants">
                          Max Participants
                        </Label>
                        <Input
                          id="maxParticipants"
                          type="number"
                          value={classForm.maxParticipants}
                          onChange={(e) =>
                            setClassForm({
                              ...classForm,
                              maxParticipants: e.target.value,
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
                        value={classForm.description}
                        onChange={(e) =>
                          setClassForm({
                            ...classForm,
                            description: e.target.value,
                          })
                        }
                        rows={3}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="joinLink">Join Link</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="joinLink"
                          value={classForm.joinLink}
                          onChange={(e) =>
                            setClassForm({
                              ...classForm,
                              joinLink: e.target.value,
                            })
                          }
                          required
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={generateJoinLink}
                        >
                          Generate
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">
                        Meeting Password (Optional)
                      </Label>
                      <Input
                        id="password"
                        value={classForm.password}
                        onChange={(e) =>
                          setClassForm({
                            ...classForm,
                            password: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="chatEnabled"
                          checked={classForm.chatEnabled}
                          onChange={(e) =>
                            setClassForm({
                              ...classForm,
                              chatEnabled: e.target.checked,
                            })
                          }
                        />
                        <Label htmlFor="chatEnabled">Enable Chat</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="screenShareEnabled"
                          checked={classForm.screenShareEnabled}
                          onChange={(e) =>
                            setClassForm({
                              ...classForm,
                              screenShareEnabled: e.target.checked,
                            })
                          }
                        />
                        <Label htmlFor="screenShareEnabled">
                          Enable Screen Share
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="recordingEnabled"
                          checked={classForm.recordingEnabled}
                          onChange={(e) =>
                            setClassForm({
                              ...classForm,
                              recordingEnabled: e.target.checked,
                            })
                          }
                        />
                        <Label htmlFor="recordingEnabled">
                          Enable Recording
                        </Label>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={resetClassForm}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingClass ? "Update" : "Schedule"} Class
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
                    <TableHead>Class Details</TableHead>
                    <TableHead>Instructor</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Participants</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classes.map((cls) => (
                    <TableRow key={cls.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{cls.title}</div>
                          <div className="text-sm text-gray-500">
                            {cls.topic} - {cls.course}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{cls.instructor}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">
                            {new Date(cls.scheduledDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm">
                            {cls.scheduledTime} ({cls.duration} min)
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>
                            {cls.registeredParticipants}/{cls.maxParticipants}
                          </span>
                        </div>
                        {cls.status === "completed" && (
                          <div className="text-sm text-gray-500">
                            {cls.attendees} attended
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={cls.status}
                          onValueChange={(value: LiveClass["status"]) =>
                            updateClassStatus(cls.id, value)
                          }
                        >
                          <SelectTrigger className="w-32">
                            <Badge variant={getStatusColor(cls.status)}>
                              {cls.status}
                            </Badge>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="scheduled">Scheduled</SelectItem>
                            <SelectItem value="live">Live</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setViewingClass(cls)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => editClass(cls)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyJoinLink(cls.joinLink)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          {cls.status === "scheduled" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateClassStatus(cls.id, "live")}
                            >
                              <Play className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteClass(cls.id)}
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

        {/* Attendees Tab */}
        <TabsContent value="attendees">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Class Attendees</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Select
                  value={selectedClassId}
                  onValueChange={setSelectedClassId}
                >
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Select a class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls.id} value={cls.id}>
                        {cls.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Joined At</TableHead>
                    <TableHead>Left At</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendees
                    .filter(
                      (attendee) =>
                        !selectedClassId ||
                        attendee.classId === selectedClassId,
                    )
                    .map((attendee) => (
                      <TableRow key={attendee.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {attendee.studentName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {attendee.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{attendee.joinedAt}</TableCell>
                        <TableCell>
                          {attendee.leftAt || "Still in class"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{attendee.duration} min</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              attendee.status === "attended"
                                ? "default"
                                : attendee.status === "late"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {attendee.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Materials Tab */}
        <TabsContent value="materials">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Class Materials</span>
              </CardTitle>
              <Dialog
                open={isMaterialDialogOpen}
                onOpenChange={setIsMaterialDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Upload Material
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload Class Material</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Select Class</Label>
                      <Select
                        value={selectedClassId}
                        onValueChange={setSelectedClassId}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a class" />
                        </SelectTrigger>
                        <SelectContent>
                          {classes.map((cls) => (
                            <SelectItem key={cls.id} value={cls.id}>
                              {cls.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="materialName">Material Name</Label>
                      <Input
                        id="materialName"
                        value={materialForm.name}
                        onChange={(e) =>
                          setMaterialForm({
                            ...materialForm,
                            name: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="materialType">Type</Label>
                      <Select
                        value={materialForm.type}
                        onValueChange={(value: ClassMaterial["type"]) =>
                          setMaterialForm({ ...materialForm, type: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="ppt">PowerPoint</SelectItem>
                          <SelectItem value="doc">Document</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="image">Image</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>File Upload</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-500">
                          Click to upload file
                        </p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Choose File
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsMaterialDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={uploadMaterial}>Upload Material</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Select
                  value={selectedClassId}
                  onValueChange={setSelectedClassId}
                >
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Select a class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls.id} value={cls.id}>
                        {cls.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {materials
                  .filter(
                    (material) =>
                      !selectedClassId || material.classId === selectedClassId,
                  )
                  .map((material) => (
                    <Card key={material.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Upload className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{material.name}</h3>
                            <p className="text-sm text-gray-500">
                              {material.type.toUpperCase()} • {material.size}
                            </p>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 mb-3">
                          Uploaded: {material.uploadedAt}
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
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

        {/* Recordings Tab */}
        <TabsContent value="recordings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Video className="h-5 w-5" />
                <span>Class Recordings</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {classes
                  .filter((cls) => cls.recording)
                  .map((cls) => (
                    <Card key={cls.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                            <Video className="h-6 w-6 text-red-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{cls.title}</h3>
                            <p className="text-sm text-gray-500">
                              {new Date(cls.scheduledDate).toLocaleDateString()}{" "}
                              • {cls.duration} min
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div>
                            <strong>Instructor:</strong> {cls.instructor}
                          </div>
                          <div>
                            <strong>Attendees:</strong> {cls.attendees}
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            <Play className="h-4 w-4 mr-2" />
                            Play Recording
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View Class Dialog */}
      {viewingClass && (
        <Dialog
          open={!!viewingClass}
          onOpenChange={() => setViewingClass(null)}
        >
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{viewingClass.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Topic:</strong> {viewingClass.topic}
                </div>
                <div>
                  <strong>Instructor:</strong> {viewingClass.instructor}
                </div>
                <div>
                  <strong>Course:</strong> {viewingClass.course}
                </div>
                <div>
                  <strong>Duration:</strong> {viewingClass.duration} minutes
                </div>
                <div>
                  <strong>Date:</strong>{" "}
                  {new Date(viewingClass.scheduledDate).toLocaleDateString()}
                </div>
                <div>
                  <strong>Time:</strong> {viewingClass.scheduledTime}
                </div>
                <div>
                  <strong>Max Participants:</strong>{" "}
                  {viewingClass.maxParticipants}
                </div>
                <div>
                  <strong>Registered:</strong>{" "}
                  {viewingClass.registeredParticipants}
                </div>
              </div>

              <div>
                <strong>Description:</strong>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {viewingClass.description}
                </p>
              </div>

              <div>
                <strong>Join Link:</strong>
                <div className="flex items-center space-x-2 mt-2">
                  <Input value={viewingClass.joinLink} readOnly />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyJoinLink(viewingClass.joinLink)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {viewingClass.password && (
                <div>
                  <strong>Meeting Password:</strong>
                  <Input
                    value={viewingClass.password}
                    readOnly
                    className="mt-2"
                  />
                </div>
              )}

              <div>
                <strong>Features:</strong>
                <div className="mt-2 space-y-1 text-sm">
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="h-4 w-4" />
                    <span>
                      Chat: {viewingClass.chatEnabled ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Share className="h-4 w-4" />
                    <span>
                      Screen Share:{" "}
                      {viewingClass.screenShareEnabled ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Video className="h-4 w-4" />
                    <span>
                      Recording:{" "}
                      {viewingClass.recordingEnabled ? "Enabled" : "Disabled"}
                    </span>
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
