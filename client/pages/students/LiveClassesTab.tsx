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
  Users,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Clock,
  Video,
} from "lucide-react";
import { toast } from "sonner";

interface LiveClass {
  id: string;
  className: string;
  description: string;
  date: string;
  time: string;
  duration: number; // in minutes
  instructor: string;
  subject: string;
  maxStudents: number;
  registeredStudents: number;
  status: "scheduled" | "live" | "completed" | "cancelled";
  meetingLink?: string;
  recordingLink?: string;
  image?: string;
}

const mockClasses: LiveClass[] = [
  {
    id: "1",
    className: "React Fundamentals",
    description: "Introduction to React components and hooks",
    date: "2024-02-20",
    time: "10:00",
    duration: 90,
    instructor: "Dr. Priya Sharma",
    subject: "Web Development",
    maxStudents: 50,
    registeredStudents: 35,
    status: "scheduled",
    meetingLink: "https://meet.google.com/abc-defg-hij",
  },
  {
    id: "2",
    className: "Data Science Workshop",
    description: "Hands-on Python for data analysis",
    date: "2024-02-22",
    time: "14:00",
    duration: 120,
    instructor: "Prof. Rajesh Kumar",
    subject: "Data Science",
    maxStudents: 30,
    registeredStudents: 28,
    status: "scheduled",
    meetingLink: "https://meet.google.com/xyz-uvw-rst",
  },
];

export default function LiveClassesTab() {
  const [classes, setClasses] = useState<LiveClass[]>(mockClasses);
  const [isClassDialogOpen, setIsClassDialogOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<LiveClass | null>(null);

  const [classForm, setClassForm] = useState({
    className: "",
    description: "",
    date: "",
    time: "",
    duration: "",
    instructor: "",
    subject: "",
    maxStudents: "",
    image: null as File | null,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setClassForm({ ...classForm, image: file });
    }
  };

  const handleClassSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingClass) {
      setClasses(
        classes.map((cls) =>
          cls.id === editingClass.id
            ? {
                ...cls,
                className: classForm.className,
                description: classForm.description,
                date: classForm.date,
                time: classForm.time,
                duration: parseInt(classForm.duration),
                instructor: classForm.instructor,
                subject: classForm.subject,
                maxStudents: parseInt(classForm.maxStudents),
              }
            : cls,
        ),
      );
      toast.success("Live class updated successfully");
    } else {
      const newClass: LiveClass = {
        id: Date.now().toString(),
        className: classForm.className,
        description: classForm.description,
        date: classForm.date,
        time: classForm.time,
        duration: parseInt(classForm.duration),
        instructor: classForm.instructor,
        subject: classForm.subject,
        maxStudents: parseInt(classForm.maxStudents),
        registeredStudents: 0,
        status: "scheduled",
        meetingLink: `https://meet.google.com/${Math.random().toString(36).substr(2, 9)}`,
      };
      setClasses([...classes, newClass]);
      toast.success("Live class created successfully");
    }
    resetClassForm();
  };

  const resetClassForm = () => {
    setClassForm({
      className: "",
      description: "",
      date: "",
      time: "",
      duration: "",
      instructor: "",
      subject: "",
      maxStudents: "",
      image: null,
    });
    setEditingClass(null);
    setIsClassDialogOpen(false);
  };

  const editClass = (liveClass: LiveClass) => {
    setClassForm({
      className: liveClass.className,
      description: liveClass.description,
      date: liveClass.date,
      time: liveClass.time,
      duration: liveClass.duration.toString(),
      instructor: liveClass.instructor,
      subject: liveClass.subject,
      maxStudents: liveClass.maxStudents.toString(),
      image: null,
    });
    setEditingClass(liveClass);
    setIsClassDialogOpen(true);
  };

  const deleteClass = (classId: string) => {
    setClasses(classes.filter((cls) => cls.id !== classId));
    toast.success("Live class deleted successfully");
  };

  const startClass = (classId: string) => {
    setClasses(
      classes.map((cls) =>
        cls.id === classId ? { ...cls, status: "live" } : cls,
      ),
    );
    toast.success("Live class started");
  };

  const endClass = (classId: string) => {
    setClasses(
      classes.map((cls) =>
        cls.id === classId ? { ...cls, status: "completed" } : cls,
      ),
    );
    toast.success("Live class ended");
  };

  const cancelClass = (classId: string) => {
    setClasses(
      classes.map((cls) =>
        cls.id === classId ? { ...cls, status: "cancelled" } : cls,
      ),
    );
    toast.success("Live class cancelled");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "default";
      case "completed":
        return "secondary";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Live Classes Management
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Schedule and manage live educational sessions
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Calendar className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <h3 className="font-semibold">Scheduled</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {classes.filter((c) => c.status === "scheduled").length} classes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Video className="h-8 w-8 mx-auto mb-2 text-red-500" />
            <h3 className="font-semibold">Live</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {classes.filter((c) => c.status === "live").length} ongoing
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <h3 className="font-semibold">Completed</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {classes.filter((c) => c.status === "completed").length} finished
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <h3 className="font-semibold">Total Students</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {classes.reduce((sum, c) => sum + c.registeredStudents, 0)}{" "}
              enrolled
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Live Classes</span>
          </CardTitle>
          <Dialog open={isClassDialogOpen} onOpenChange={setIsClassDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Schedule Class
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingClass ? "Edit Live Class" : "Schedule New Live Class"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleClassSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="className">Class Name *</Label>
                  <Input
                    id="className"
                    value={classForm.className}
                    onChange={(e) =>
                      setClassForm({ ...classForm, className: e.target.value })
                    }
                    required
                  />
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
                    placeholder="Brief description of the class content"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={classForm.date}
                      onChange={(e) =>
                        setClassForm({ ...classForm, date: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time *</Label>
                    <Input
                      id="time"
                      type="time"
                      value={classForm.time}
                      onChange={(e) =>
                        setClassForm({ ...classForm, time: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes) *</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={classForm.duration}
                      onChange={(e) =>
                        setClassForm({ ...classForm, duration: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxStudents">Max Students *</Label>
                    <Input
                      id="maxStudents"
                      type="number"
                      value={classForm.maxStudents}
                      onChange={(e) =>
                        setClassForm({
                          ...classForm,
                          maxStudents: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="instructor">Instructor *</Label>
                    <Select
                      value={classForm.instructor}
                      onValueChange={(value) =>
                        setClassForm({ ...classForm, instructor: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select instructor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Dr. Priya Sharma">
                          Dr. Priya Sharma
                        </SelectItem>
                        <SelectItem value="Prof. Rajesh Kumar">
                          Prof. Rajesh Kumar
                        </SelectItem>
                        <SelectItem value="Ms. Anita Singh">
                          Ms. Anita Singh
                        </SelectItem>
                        <SelectItem value="Mr. Vikram Joshi">
                          Mr. Vikram Joshi
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Select
                      value={classForm.subject}
                      onValueChange={(value) =>
                        setClassForm({ ...classForm, subject: value })
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
                        <SelectItem value="Mobile Development">
                          Mobile Development
                        </SelectItem>
                        <SelectItem value="UI/UX Design">
                          UI/UX Design
                        </SelectItem>
                        <SelectItem value="Python Programming">
                          Python Programming
                        </SelectItem>
                        <SelectItem value="JavaScript">JavaScript</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Class Image</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  <p className="text-sm text-gray-500">
                    Upload an image for the class (optional)
                  </p>
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
                    {editingClass ? "Update Class" : "Schedule Class"}
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
                <TableHead>Class Name</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes.map((liveClass) => (
                <TableRow key={liveClass.id}>
                  <TableCell className="font-medium">
                    {liveClass.className}
                  </TableCell>
                  <TableCell>{liveClass.subject}</TableCell>
                  <TableCell>{liveClass.instructor}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{liveClass.date}</span>
                      <span className="text-sm text-gray-500">
                        {liveClass.time}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{liveClass.duration} min</TableCell>
                  <TableCell>
                    {liveClass.registeredStudents}/{liveClass.maxStudents}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(liveClass.status)}>
                      {liveClass.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {liveClass.status === "scheduled" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => startClass(liveClass.id)}
                        >
                          <Video className="h-4 w-4 mr-1" />
                          Start
                        </Button>
                      )}
                      {liveClass.status === "live" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => endClass(liveClass.id)}
                        >
                          End
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editClass(liveClass)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {liveClass.status === "scheduled" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => cancelClass(liveClass.id)}
                        >
                          Cancel
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteClass(liveClass.id)}
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
