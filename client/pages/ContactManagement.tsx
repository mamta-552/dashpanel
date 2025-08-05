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
  Contact,
  Plus,
  Edit,
  Trash2,
  Eye,
  MapPin,
  Phone,
  Mail,
  Globe,
  Upload,
  Save,
  MessageCircle,
  Reply,
} from "lucide-react";
import { toast } from "sonner";

interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  website: string;
  image: string;
  workingHours: string;
  emergencyContact: string;
}

interface GetInTouchSection {
  heading: string;
  description: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    youtube: string;
  };
}

interface Branch {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  image: string;
  manager: string;
  status: "active" | "inactive";
}

interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "new" | "replied" | "resolved" | "spam";
  priority: "low" | "medium" | "high";
  source: "website" | "phone" | "email" | "social";
  createdDate: string;
  repliedBy?: string;
  reply?: string;
}

const mockContactInfo: ContactInfo = {
  address: "123 Education Street, Learning City, State 12345",
  phone: "+91 9876543210",
  email: "info@eduadmin.com",
  website: "www.eduadmin.com",
  image: "/placeholder.svg",
  workingHours: "Monday to Friday: 9:00 AM - 6:00 PM",
  emergencyContact: "+91 9876543211",
};

const mockGetInTouch: GetInTouchSection = {
  heading: "Get in Touch",
  description:
    "We're here to help you with any questions or concerns you may have. Feel free to reach out to us through any of the following channels.",
  socialLinks: {
    facebook: "https://facebook.com/eduadmin",
    twitter: "https://twitter.com/eduadmin",
    instagram: "https://instagram.com/eduadmin",
    linkedin: "https://linkedin.com/company/eduadmin",
    youtube: "https://youtube.com/@eduadmin",
  },
};

const mockBranches: Branch[] = [
  {
    id: "1",
    name: "EduAdmin Main Campus",
    description: "Our flagship campus with state-of-the-art facilities",
    address: "123 Education Street, Learning City, State 12345",
    phone: "+91 9876543210",
    email: "main@eduadmin.com",
    image: "/placeholder.svg",
    manager: "Dr. Sarah Johnson",
    status: "active",
  },
  {
    id: "2",
    name: "EduAdmin North Branch",
    description: "Modern learning center in the northern district",
    address: "456 Knowledge Avenue, North City, State 67890",
    phone: "+91 9876543211",
    email: "north@eduadmin.com",
    image: "/placeholder.svg",
    manager: "Prof. Mike Chen",
    status: "active",
  },
];

const mockInquiries: ContactInquiry[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 9876543212",
    subject: "Course Information Request",
    message:
      "I would like to know more about your web development courses and admission process.",
    status: "new",
    priority: "medium",
    source: "website",
    createdDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+91 9876543213",
    subject: "Partnership Inquiry",
    message:
      "We are interested in establishing a partnership with your institution.",
    status: "replied",
    priority: "high",
    source: "email",
    createdDate: "2024-01-14",
    repliedBy: "Admin Team",
    reply:
      "Thank you for your interest. We have sent you detailed information about our partnership programs.",
  },
];

export default function ContactManagement() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>(mockContactInfo);
  const [getInTouch, setGetInTouch] =
    useState<GetInTouchSection>(mockGetInTouch);
  const [branches, setBranches] = useState<Branch[]>(mockBranches);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>(mockInquiries);
  const [activeTab, setActiveTab] = useState("info");
  const [isBranchDialogOpen, setIsBranchDialogOpen] = useState(false);
  const [isInquiryDialogOpen, setIsInquiryDialogOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [viewingInquiry, setViewingInquiry] = useState<ContactInquiry | null>(
    null,
  );

  const [branchForm, setBranchForm] = useState({
    name: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    manager: "",
  });

  const [replyForm, setReplyForm] = useState({
    reply: "",
    repliedBy: "Admin Team",
  });

  const saveContactInfo = () => {
    toast.success("Contact information updated successfully");
  };

  const saveGetInTouch = () => {
    toast.success("Get in Touch section updated successfully");
  };

  const handleBranchSubmit = () => {
    if (editingBranch) {
      setBranches(
        branches.map((branch) =>
          branch.id === editingBranch.id
            ? { ...branch, ...branchForm }
            : branch,
        ),
      );
      toast.success("Branch updated successfully");
    } else {
      const newBranch: Branch = {
        id: Date.now().toString(),
        ...branchForm,
        image: "/placeholder.svg",
        status: "active",
      };
      setBranches([...branches, newBranch]);
      toast.success("Branch added successfully");
    }
    resetBranchForm();
  };

  const resetBranchForm = () => {
    setBranchForm({
      name: "",
      description: "",
      address: "",
      phone: "",
      email: "",
      manager: "",
    });
    setEditingBranch(null);
    setIsBranchDialogOpen(false);
  };

  const editBranch = (branch: Branch) => {
    setBranchForm({
      name: branch.name,
      description: branch.description,
      address: branch.address,
      phone: branch.phone,
      email: branch.email,
      manager: branch.manager,
    });
    setEditingBranch(branch);
    setIsBranchDialogOpen(true);
  };

  const deleteBranch = (id: string) => {
    setBranches(branches.filter((branch) => branch.id !== id));
    toast.success("Branch deleted successfully");
  };

  const updateInquiryStatus = (
    id: string,
    status: ContactInquiry["status"],
  ) => {
    setInquiries(
      inquiries.map((inquiry) =>
        inquiry.id === id ? { ...inquiry, status } : inquiry,
      ),
    );
    toast.success(`Inquiry marked as ${status}`);
  };

  const replyToInquiry = () => {
    if (viewingInquiry) {
      setInquiries(
        inquiries.map((inquiry) =>
          inquiry.id === viewingInquiry.id
            ? {
                ...inquiry,
                status: "replied",
                reply: replyForm.reply,
                repliedBy: replyForm.repliedBy,
              }
            : inquiry,
        ),
      );
      toast.success("Reply sent successfully");
      setReplyForm({ reply: "", repliedBy: "Admin Team" });
      setViewingInquiry(null);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Contact Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage contact information, branches, and inquiries
          </p>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="info">Contact Info</TabsTrigger>
          <TabsTrigger value="branches">Branches</TabsTrigger>
          <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
          <TabsTrigger value="social">Get in Touch</TabsTrigger>
        </TabsList>

        {/* Contact Information Tab */}
        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Contact className="h-5 w-5" />
                <span>Contact Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={contactInfo.address}
                      onChange={(e) =>
                        setContactInfo({
                          ...contactInfo,
                          address: e.target.value,
                        })
                      }
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={contactInfo.phone}
                      onChange={(e) =>
                        setContactInfo({
                          ...contactInfo,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={contactInfo.email}
                      onChange={(e) =>
                        setContactInfo({
                          ...contactInfo,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={contactInfo.website}
                      onChange={(e) =>
                        setContactInfo({
                          ...contactInfo,
                          website: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="workingHours">Working Hours</Label>
                    <Input
                      id="workingHours"
                      value={contactInfo.workingHours}
                      onChange={(e) =>
                        setContactInfo({
                          ...contactInfo,
                          workingHours: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">Emergency Contact</Label>
                    <Input
                      id="emergencyContact"
                      value={contactInfo.emergencyContact}
                      onChange={(e) =>
                        setContactInfo({
                          ...contactInfo,
                          emergencyContact: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Contact Image</Label>
                    <div className="flex items-center space-x-4">
                      <img
                        src={contactInfo.image}
                        alt="Contact"
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <Button variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Image
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <Button onClick={saveContactInfo}>
                <Save className="h-4 w-4 mr-2" />
                Save Contact Information
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Branches Tab */}
        <TabsContent value="branches">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Our Branches</span>
              </CardTitle>
              <Dialog
                open={isBranchDialogOpen}
                onOpenChange={setIsBranchDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingBranch(null)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Branch
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingBranch ? "Edit Branch" : "Add New Branch"}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="branchName">Branch Name</Label>
                        <Input
                          id="branchName"
                          value={branchForm.name}
                          onChange={(e) =>
                            setBranchForm({
                              ...branchForm,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="manager">Branch Manager</Label>
                        <Input
                          id="manager"
                          value={branchForm.manager}
                          onChange={(e) =>
                            setBranchForm({
                              ...branchForm,
                              manager: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="branchDescription">Description</Label>
                      <Textarea
                        id="branchDescription"
                        value={branchForm.description}
                        onChange={(e) =>
                          setBranchForm({
                            ...branchForm,
                            description: e.target.value,
                          })
                        }
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="branchAddress">Address</Label>
                      <Textarea
                        id="branchAddress"
                        value={branchForm.address}
                        onChange={(e) =>
                          setBranchForm({
                            ...branchForm,
                            address: e.target.value,
                          })
                        }
                        rows={2}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="branchPhone">Phone</Label>
                        <Input
                          id="branchPhone"
                          value={branchForm.phone}
                          onChange={(e) =>
                            setBranchForm({
                              ...branchForm,
                              phone: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="branchEmail">Email</Label>
                        <Input
                          id="branchEmail"
                          type="email"
                          value={branchForm.email}
                          onChange={(e) =>
                            setBranchForm({
                              ...branchForm,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Branch Image</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-500">
                          Upload branch image
                        </p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Choose Image
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={resetBranchForm}>
                        Cancel
                      </Button>
                      <Button onClick={handleBranchSubmit}>
                        {editingBranch ? "Update" : "Add"} Branch
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {branches.map((branch) => (
                  <Card key={branch.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <img
                          src={branch.image}
                          alt={branch.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold">
                              {branch.name}
                            </h3>
                            <Badge
                              variant={
                                branch.status === "active"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {branch.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {branch.description}
                          </p>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-3 w-3" />
                              <span>{branch.address}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="h-3 w-3" />
                              <span>{branch.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Mail className="h-3 w-3" />
                              <span>{branch.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Contact className="h-3 w-3" />
                              <span>Manager: {branch.manager}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2 mt-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => editBranch(branch)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteBranch(branch.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Inquiries Tab */}
        <TabsContent value="inquiries">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <span>Contact Inquiries</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contact</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inquiries.map((inquiry) => (
                    <TableRow key={inquiry.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{inquiry.name}</div>
                          <div className="text-sm text-gray-500">
                            {inquiry.email}
                          </div>
                          <div className="text-sm text-gray-500">
                            {inquiry.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{inquiry.subject}</div>
                        <div className="text-sm text-gray-500">
                          {inquiry.message.substring(0, 50)}...
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            inquiry.priority === "high"
                              ? "destructive"
                              : inquiry.priority === "medium"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {inquiry.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{inquiry.source}</Badge>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={inquiry.status}
                          onValueChange={(value: ContactInquiry["status"]) =>
                            updateInquiryStatus(inquiry.id, value)
                          }
                        >
                          <SelectTrigger className="w-32">
                            <Badge
                              variant={
                                inquiry.status === "new"
                                  ? "destructive"
                                  : inquiry.status === "replied"
                                    ? "default"
                                    : inquiry.status === "resolved"
                                      ? "outline"
                                      : "secondary"
                              }
                            >
                              {inquiry.status}
                            </Badge>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="replied">Replied</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                            <SelectItem value="spam">Spam</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        {new Date(inquiry.createdDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setViewingInquiry(inquiry)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setViewingInquiry(inquiry)}
                          >
                            <Reply className="h-4 w-4" />
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

        {/* Get in Touch Tab */}
        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Get in Touch Section</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="heading">Section Heading</Label>
                  <Input
                    id="heading"
                    value={getInTouch.heading}
                    onChange={(e) =>
                      setGetInTouch({ ...getInTouch, heading: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={getInTouch.description}
                    onChange={(e) =>
                      setGetInTouch({
                        ...getInTouch,
                        description: e.target.value,
                      })
                    }
                    rows={4}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Social Media Links</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(getInTouch.socialLinks).map(
                    ([platform, url]) => (
                      <div key={platform} className="space-y-2">
                        <Label htmlFor={platform} className="capitalize">
                          {platform}
                        </Label>
                        <Input
                          id={platform}
                          value={url}
                          onChange={(e) =>
                            setGetInTouch({
                              ...getInTouch,
                              socialLinks: {
                                ...getInTouch.socialLinks,
                                [platform]: e.target.value,
                              },
                            })
                          }
                          placeholder={`${platform} URL`}
                        />
                      </div>
                    ),
                  )}
                </div>
              </div>

              <Button onClick={saveGetInTouch}>
                <Save className="h-4 w-4 mr-2" />
                Save Get in Touch Section
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View/Reply Inquiry Dialog */}
      {viewingInquiry && (
        <Dialog
          open={!!viewingInquiry}
          onOpenChange={() => setViewingInquiry(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Inquiry Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <strong>Name:</strong> {viewingInquiry.name}
                </div>
                <div>
                  <strong>Email:</strong> {viewingInquiry.email}
                </div>
                <div>
                  <strong>Phone:</strong> {viewingInquiry.phone}
                </div>
                <div>
                  <strong>Priority:</strong> {viewingInquiry.priority}
                </div>
              </div>
              <div>
                <strong>Subject:</strong> {viewingInquiry.subject}
              </div>
              <div>
                <strong>Message:</strong>
                <p className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                  {viewingInquiry.message}
                </p>
              </div>

              {viewingInquiry.reply && (
                <div>
                  <strong>Previous Reply:</strong>
                  <p className="mt-2 p-3 bg-blue-50 dark:bg-blue-900 rounded">
                    {viewingInquiry.reply}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Replied by: {viewingInquiry.repliedBy}
                  </p>
                </div>
              )}

              {viewingInquiry.status !== "resolved" && (
                <div className="space-y-4 border-t pt-4">
                  <h3 className="font-semibold">Send Reply</h3>
                  <div className="space-y-2">
                    <Label htmlFor="replyBy">Reply By</Label>
                    <Input
                      id="replyBy"
                      value={replyForm.repliedBy}
                      onChange={(e) =>
                        setReplyForm({
                          ...replyForm,
                          repliedBy: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="replyMessage">Reply Message</Label>
                    <Textarea
                      id="replyMessage"
                      value={replyForm.reply}
                      onChange={(e) =>
                        setReplyForm({ ...replyForm, reply: e.target.value })
                      }
                      rows={4}
                      placeholder="Type your reply here..."
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setViewingInquiry(null)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={replyToInquiry}>
                      <Reply className="h-4 w-4 mr-2" />
                      Send Reply
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
