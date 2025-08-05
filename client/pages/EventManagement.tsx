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
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  Plus,
  Edit,
  Trash2,
  Eye,
  Upload,
  MapPin,
  Clock,
  Users,
  Image as ImageIcon,
  Video,
} from "lucide-react";
import { toast } from "sonner";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  type:
    | "workshop"
    | "seminar"
    | "competition"
    | "cultural"
    | "sports"
    | "academic";
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  image: string;
  maxParticipants: number;
  registeredParticipants: number;
  registrationDeadline: string;
  organizer: string;
  contactEmail: string;
  contactPhone: string;
  gallery: string[];
  registrationFee: number;
  createdDate: string;
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Annual Tech Symposium 2024",
    description:
      "A comprehensive technology symposium featuring industry experts and innovative workshops on emerging technologies.",
    date: "2024-03-15",
    time: "09:00",
    venue: "Main Auditorium, EduAdmin Campus",
    type: "seminar",
    status: "upcoming",
    image: "/placeholder.svg",
    maxParticipants: 500,
    registeredParticipants: 387,
    registrationDeadline: "2024-03-10",
    organizer: "Tech Department",
    contactEmail: "tech@edu.com",
    contactPhone: "+91 9876543210",
    gallery: ["/placeholder.svg", "/placeholder.svg"],
    registrationFee: 500,
    createdDate: "2024-01-15",
  },
  {
    id: "2",
    title: "Digital Marketing Workshop",
    description:
      "Hands-on workshop covering latest digital marketing strategies and tools for business growth.",
    date: "2024-02-28",
    time: "10:00",
    venue: "Conference Room A",
    type: "workshop",
    status: "completed",
    image: "/placeholder.svg",
    maxParticipants: 50,
    registeredParticipants: 45,
    registrationDeadline: "2024-02-25",
    organizer: "Marketing Department",
    contactEmail: "marketing@edu.com",
    contactPhone: "+91 9876543211",
    gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    registrationFee: 0,
    createdDate: "2024-01-20",
  },
];

export default function EventManagement() {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [viewingEvent, setViewingEvent] = useState<Event | null>(null);
  const [isGalleryDialogOpen, setIsGalleryDialogOpen] = useState(false);

  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    type: "workshop" as Event["type"],
    maxParticipants: "",
    registrationDeadline: "",
    organizer: "",
    contactEmail: "",
    contactPhone: "",
    registrationFee: "",
  });

  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEvent) {
      setEvents(
        events.map((event) =>
          event.id === editingEvent.id
            ? {
                ...event,
                ...eventForm,
                maxParticipants: parseInt(eventForm.maxParticipants),
                registrationFee: parseFloat(eventForm.registrationFee),
              }
            : event,
        ),
      );
      toast.success("Event updated successfully");
    } else {
      const newEvent: Event = {
        id: Date.now().toString(),
        ...eventForm,
        maxParticipants: parseInt(eventForm.maxParticipants),
        registrationFee: parseFloat(eventForm.registrationFee),
        status: "upcoming",
        image: "/placeholder.svg",
        registeredParticipants: 0,
        gallery: [],
        createdDate: new Date().toISOString().split("T")[0],
      };
      setEvents([...events, newEvent]);
      toast.success("Event created successfully");
    }
    resetEventForm();
  };

  const resetEventForm = () => {
    setEventForm({
      title: "",
      description: "",
      date: "",
      time: "",
      venue: "",
      type: "workshop",
      maxParticipants: "",
      registrationDeadline: "",
      organizer: "",
      contactEmail: "",
      contactPhone: "",
      registrationFee: "",
    });
    setEditingEvent(null);
    setIsEventDialogOpen(false);
  };

  const editEvent = (event: Event) => {
    setEventForm({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      venue: event.venue,
      type: event.type,
      maxParticipants: event.maxParticipants.toString(),
      registrationDeadline: event.registrationDeadline,
      organizer: event.organizer,
      contactEmail: event.contactEmail,
      contactPhone: event.contactPhone,
      registrationFee: event.registrationFee.toString(),
    });
    setEditingEvent(event);
    setIsEventDialogOpen(true);
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
    toast.success("Event deleted successfully");
  };

  const updateEventStatus = (id: string, status: Event["status"]) => {
    setEvents(
      events.map((event) => (event.id === id ? { ...event, status } : event)),
    );
    toast.success(`Event status updated to ${status}`);
  };

  const getStatusColor = (status: Event["status"]) => {
    switch (status) {
      case "upcoming":
        return "default";
      case "ongoing":
        return "secondary";
      case "completed":
        return "outline";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getTypeColor = (type: Event["type"]) => {
    switch (type) {
      case "workshop":
        return "bg-blue-100 text-blue-800";
      case "seminar":
        return "bg-green-100 text-green-800";
      case "competition":
        return "bg-purple-100 text-purple-800";
      case "cultural":
        return "bg-pink-100 text-pink-800";
      case "sports":
        return "bg-orange-100 text-orange-800";
      case "academic":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Event Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Organize and manage educational events and activities
          </p>
        </div>
        <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingEvent(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingEvent ? "Edit Event" : "Create New Event"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEventSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    value={eventForm.title}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={eventForm.description}
                    onChange={(e) =>
                      setEventForm({
                        ...eventForm,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Event Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={eventForm.date}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, date: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Event Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={eventForm.time}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, time: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="venue">Venue</Label>
                  <Input
                    id="venue"
                    value={eventForm.venue}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, venue: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Event Type</Label>
                  <select
                    id="type"
                    value={eventForm.type}
                    onChange={(e) =>
                      setEventForm({
                        ...eventForm,
                        type: e.target.value as Event["type"],
                      })
                    }
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    required
                  >
                    <option value="workshop">Workshop</option>
                    <option value="seminar">Seminar</option>
                    <option value="competition">Competition</option>
                    <option value="cultural">Cultural</option>
                    <option value="sports">Sports</option>
                    <option value="academic">Academic</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxParticipants">Max Participants</Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    value={eventForm.maxParticipants}
                    onChange={(e) =>
                      setEventForm({
                        ...eventForm,
                        maxParticipants: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registrationDeadline">
                    Registration Deadline
                  </Label>
                  <Input
                    id="registrationDeadline"
                    type="date"
                    value={eventForm.registrationDeadline}
                    onChange={(e) =>
                      setEventForm({
                        ...eventForm,
                        registrationDeadline: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registrationFee">Registration Fee (₹)</Label>
                  <Input
                    id="registrationFee"
                    type="number"
                    value={eventForm.registrationFee}
                    onChange={(e) =>
                      setEventForm({
                        ...eventForm,
                        registrationFee: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organizer">Organizer</Label>
                  <Input
                    id="organizer"
                    value={eventForm.organizer}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, organizer: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={eventForm.contactEmail}
                    onChange={(e) =>
                      setEventForm({
                        ...eventForm,
                        contactEmail: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    value={eventForm.contactPhone}
                    onChange={(e) =>
                      setEventForm({
                        ...eventForm,
                        contactPhone: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Event Banner Image</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500">Upload event banner</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Choose Image
                  </Button>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetEventForm}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingEvent ? "Update" : "Create"} Event
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Events Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Event Calendar</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Venue</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-gray-500">
                          by {event.organizer}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>{event.time}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{event.venue}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(event.type)}>
                      {event.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>
                        {event.registeredParticipants}/{event.maxParticipants}
                      </span>
                    </div>
                    {event.registrationFee > 0 && (
                      <div className="text-sm text-gray-500">
                        ₹{event.registrationFee}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <select
                      value={event.status}
                      onChange={(e) =>
                        updateEventStatus(
                          event.id,
                          e.target.value as Event["status"],
                        )
                      }
                      className="rounded-md border border-input bg-background px-2 py-1 text-sm"
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setViewingEvent(event)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editEvent(event)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteEvent(event.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsGalleryDialogOpen(true)}
                      >
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Event Details Dialog */}
      {viewingEvent && (
        <Dialog
          open={!!viewingEvent}
          onOpenChange={() => setViewingEvent(null)}
        >
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{viewingEvent.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <img
                  src={viewingEvent.image}
                  alt={viewingEvent.title}
                  className="w-32 h-32 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {viewingEvent.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Date:</strong>{" "}
                      {new Date(viewingEvent.date).toLocaleDateString()}
                    </div>
                    <div>
                      <strong>Time:</strong> {viewingEvent.time}
                    </div>
                    <div>
                      <strong>Venue:</strong> {viewingEvent.venue}
                    </div>
                    <div>
                      <strong>Type:</strong> {viewingEvent.type}
                    </div>
                    <div>
                      <strong>Organizer:</strong> {viewingEvent.organizer}
                    </div>
                    <div>
                      <strong>Registration Fee:</strong> ₹
                      {viewingEvent.registrationFee}
                    </div>
                    <div>
                      <strong>Participants:</strong>{" "}
                      {viewingEvent.registeredParticipants}/
                      {viewingEvent.maxParticipants}
                    </div>
                    <div>
                      <strong>Deadline:</strong>{" "}
                      {new Date(
                        viewingEvent.registrationDeadline,
                      ).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Contact Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Email:</strong> {viewingEvent.contactEmail}
                  </div>
                  <div>
                    <strong>Phone:</strong> {viewingEvent.contactPhone}
                  </div>
                </div>
              </div>

              {viewingEvent.gallery.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Event Gallery</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {viewingEvent.gallery.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Gallery Management Dialog */}
      <Dialog open={isGalleryDialogOpen} onOpenChange={setIsGalleryDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Event Gallery Management</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Upload Images</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <ImageIcon className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500">Upload event images</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Choose Images
                  </Button>
                </div>
              </div>
              <div>
                <Label>Upload Videos</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Video className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500">Upload event videos</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Choose Videos
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsGalleryDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button>Upload Media</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
