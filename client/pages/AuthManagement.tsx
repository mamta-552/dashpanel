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
import { UserPlus, Edit, Trash2, Shield, Users, Building } from "lucide-react";
import { toast } from "sonner";

interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
}

interface Admin {
  id: string;
  name: string;
  photo: string;
  education: string;
  designation: string;
  contact: string;
  email: string;
  description: string;
  role: "main" | "sub";
  status: "active" | "inactive";
  permissions: string[];
}

interface Partner {
  id: string;
  partnerName: string;
  alcId: string;
  password: string;
  centerName: string;
  centerAddress: string;
  education: string;
  contact: string;
  email: string;
  status: "active" | "pending" | "suspended";
  permissions: string[];
}

const permissions: Permission[] = [
  {
    id: "1",
    name: "Dashboard View",
    description: "View dashboard analytics",
    module: "Dashboard",
  },
  {
    id: "2",
    name: "Student Management",
    description: "Manage students and registrations",
    module: "Students",
  },
  {
    id: "3",
    name: "Course Management",
    description: "Create and manage courses",
    module: "Courses",
  },
  {
    id: "4",
    name: "Test Management",
    description: "Create and manage tests",
    module: "Tests",
  },
  {
    id: "5",
    name: "Partner Management",
    description: "Manage partner accounts",
    module: "Partners",
  },
  {
    id: "6",
    name: "User Management",
    description: "Manage admin users",
    module: "Users",
  },
  {
    id: "7",
    name: "Settings Management",
    description: "System settings access",
    module: "Settings",
  },
  {
    id: "8",
    name: "Reports View",
    description: "View and export reports",
    module: "Reports",
  },
];

const mockAdmins: Admin[] = [
  {
    id: "1",
    name: "John Doe",
    photo: "/placeholder.svg",
    education: "MBA in Education Management",
    designation: "Main Administrator",
    contact: "+91 9876543210",
    email: "john@edu.com",
    description: "Main administrator with full system access",
    role: "main",
    status: "active",
    permissions: ["1", "2", "3", "4", "5", "6", "7", "8"],
  },
  {
    id: "2",
    name: "Jane Smith",
    photo: "/placeholder.svg",
    education: "M.Ed in Educational Technology",
    designation: "Academic Coordinator",
    contact: "+91 9876543211",
    email: "jane@edu.com",
    description: "Handles academic operations and course management",
    role: "sub",
    status: "active",
    permissions: ["1", "2", "3", "4"],
  },
];

const mockPartners: Partner[] = [
  {
    id: "1",
    partnerName: "ABC Learning Center",
    alcId: "ALC001",
    password: "abc@123",
    centerName: "ABC Center Delhi",
    centerAddress: "New Delhi, India",
    education: "B.Ed, M.A English",
    contact: "+91 9876543212",
    email: "abc@partner.com",
    status: "active",
    permissions: ["1", "2", "4"],
  },
  {
    id: "2",
    partnerName: "XYZ Education Hub",
    alcId: "ALC002",
    password: "xyz@456",
    centerName: "XYZ Hub Mumbai",
    centerAddress: "Mumbai, India",
    education: "M.Sc Computer Science",
    contact: "+91 9876543213",
    email: "xyz@partner.com",
    status: "pending",
    permissions: ["1", "2"],
  },
];

export default function AuthManagement() {
  const [admins, setAdmins] = useState<Admin[]>(mockAdmins);
  const [partners, setPartners] = useState<Partner[]>(mockPartners);
  const [activeTab, setActiveTab] = useState<"admins" | "partners">("admins");
  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState(false);
  const [isPartnerDialogOpen, setIsPartnerDialogOpen] = useState(false);
  const [isPermissionDialogOpen, setIsPermissionDialogOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [selectedUser, setSelectedUser] = useState<{
    type: "admin" | "partner";
    id: string;
  } | null>(null);

  const [adminForm, setAdminForm] = useState({
    name: "",
    education: "",
    designation: "",
    contact: "",
    email: "",
    description: "",
    role: "sub" as "main" | "sub",
    permissions: [] as string[],
  });

  const [partnerForm, setPartnerForm] = useState({
    // Personal Information
    partnerName: "",
    fatherName: "",
    motherName: "",
    gender: "",
    dob: "",
    email: "",
    contact: "",
    alternateContact: "",
    aadharNumber: "",
    panNumber: "",
    address: "",
    city: "",
    state: "",
    pincode: "",

    // Educational Qualifications
    highestQualification: "",
    university: "",
    passingYear: "",
    percentage: "",
    specialization: "",
    additionalCertifications: "",

    // Center Information
    centerName: "",
    centerAddress: "",
    centerCity: "",
    centerState: "",
    centerPincode: "",
    centerEmail: "",
    centerContact: "",
    centerType: "",
    establishedYear: "",

    // Authentication Details
    alcId: "",
    password: "",
    confirmPassword: "",

    // Additional Information
    experience: "",
    previousInstitution: "",
    registrationNumber: "",
    gstNumber: "",
    bankAccountNumber: "",
    ifscCode: "",
    bankName: "",
    branchName: "",
  });

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAdmin) {
      setAdmins(
        admins.map((admin) =>
          admin.id === editingAdmin.id ? { ...admin, ...adminForm } : admin,
        ),
      );
      toast.success("Admin updated successfully");
    } else {
      const newAdmin: Admin = {
        id: Date.now().toString(),
        ...adminForm,
        photo: "/placeholder.svg",
        status: "active",
      };
      setAdmins([...admins, newAdmin]);
      toast.success("Admin created successfully");
    }
    resetAdminForm();
  };

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPartner) {
      setPartners(
        partners.map((partner) =>
          partner.id === editingPartner.id
            ? { ...partner, ...partnerForm }
            : partner,
        ),
      );
      toast.success("Partner updated successfully");
    } else {
      const newPartner: Partner = {
        id: Date.now().toString(),
        ...partnerForm,
        status: "pending",
        permissions: [],
      };
      setPartners([...partners, newPartner]);
      toast.success("Partner created successfully");
    }
    resetPartnerForm();
  };

  const resetAdminForm = () => {
    setAdminForm({
      name: "",
      education: "",
      designation: "",
      contact: "",
      email: "",
      description: "",
      role: "sub",
    });
    setEditingAdmin(null);
    setIsAdminDialogOpen(false);
  };

  const resetPartnerForm = () => {
    setPartnerForm({
      // Personal Information
      partnerName: "",
      fatherName: "",
      motherName: "",
      gender: "",
      dob: "",
      email: "",
      contact: "",
      alternateContact: "",
      aadharNumber: "",
      panNumber: "",
      address: "",
      city: "",
      state: "",
      pincode: "",

      // Educational Qualifications
      highestQualification: "",
      university: "",
      passingYear: "",
      percentage: "",
      specialization: "",
      additionalCertifications: "",

      // Center Information
      centerName: "",
      centerAddress: "",
      centerCity: "",
      centerState: "",
      centerPincode: "",
      centerEmail: "",
      centerContact: "",
      centerType: "",
      establishedYear: "",

      // Authentication Details
      alcId: "",
      password: "",
      confirmPassword: "",

      // Additional Information
      experience: "",
      previousInstitution: "",
      registrationNumber: "",
      gstNumber: "",
      bankAccountNumber: "",
      ifscCode: "",
      bankName: "",
      branchName: "",
    });
    setEditingPartner(null);
    setIsPartnerDialogOpen(false);
  };

  const editAdmin = (admin: Admin) => {
    setAdminForm({
      name: admin.name,
      education: admin.education,
      designation: admin.designation,
      contact: admin.contact,
      email: admin.email,
      description: admin.description,
      role: admin.role,
    });
    setEditingAdmin(admin);
    setIsAdminDialogOpen(true);
  };

  const editPartner = (partner: Partner) => {
    setPartnerForm({
      // Personal Information
      partnerName: partner.partnerName || "",
      fatherName: "",
      motherName: "",
      gender: "",
      dob: "",
      email: partner.email || "",
      contact: partner.contact || "",
      alternateContact: "",
      aadharNumber: "",
      panNumber: "",
      address: "",
      city: "",
      state: "",
      pincode: "",

      // Educational Qualifications
      highestQualification: "",
      university: "",
      passingYear: "",
      percentage: "",
      specialization: "",
      additionalCertifications: "",

      // Center Information
      centerName: partner.centerName || "",
      centerAddress: partner.centerAddress || "",
      centerCity: "",
      centerState: "",
      centerPincode: "",
      centerEmail: partner.email || "",
      centerContact: partner.contact || "",
      centerType: "",
      establishedYear: "",

      // Authentication Details
      alcId: partner.alcId || "",
      password: "",
      confirmPassword: "",

      // Additional Information
      experience: "",
      previousInstitution: "",
      registrationNumber: "",
      gstNumber: "",
      bankAccountNumber: "",
      ifscCode: "",
      bankName: "",
      branchName: "",
    });
    setEditingPartner(partner);
    setIsPartnerDialogOpen(true);
  };

  const deleteAdmin = (id: string) => {
    setAdmins(admins.filter((admin) => admin.id !== id));
    toast.success("Admin deleted successfully");
  };

  const deletePartner = (id: string) => {
    setPartners(partners.filter((partner) => partner.id !== id));
    toast.success("Partner deleted successfully");
  };

  const openPermissionDialog = (type: "admin" | "partner", id: string) => {
    setSelectedUser({ type, id });
    setIsPermissionDialogOpen(true);
  };

  const updatePermissions = (newPermissions: string[]) => {
    if (!selectedUser) return;

    if (selectedUser.type === "admin") {
      setAdmins(
        admins.map((admin) =>
          admin.id === selectedUser.id
            ? { ...admin, permissions: newPermissions }
            : admin,
        ),
      );
    } else {
      setPartners(
        partners.map((partner) =>
          partner.id === selectedUser.id
            ? { ...partner, permissions: newPermissions }
            : partner,
        ),
      );
    }

    toast.success("Permissions updated successfully");
    setIsPermissionDialogOpen(false);
    setSelectedUser(null);
  };

  const getCurrentPermissions = (): string[] => {
    if (!selectedUser) return [];

    if (selectedUser.type === "admin") {
      const admin = admins.find((a) => a.id === selectedUser.id);
      return admin?.permissions || [];
    } else {
      const partner = partners.find((p) => p.id === selectedUser.id);
      return partner?.permissions || [];
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Authentication Management
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage system administrators, partner accounts and permissions
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
        <button
          onClick={() => setActiveTab("admins")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
            activeTab === "admins"
              ? "bg-white dark:bg-gray-700 text-primary shadow-sm"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          <Shield className="h-4 w-4" />
          <span>System Admins</span>
        </button>
        <button
          onClick={() => setActiveTab("partners")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
            activeTab === "partners"
              ? "bg-white dark:bg-gray-700 text-primary shadow-sm"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          <Building className="h-4 w-4" />
          <span>Partner Accounts</span>
        </button>
      </div>

      {/* Admins Tab */}
      {activeTab === "admins" && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>System Administrators</span>
            </CardTitle>
            <Dialog
              open={isAdminDialogOpen}
              onOpenChange={setIsAdminDialogOpen}
            >
              <DialogTrigger asChild>
                <Button onClick={() => setEditingAdmin(null)}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Admin
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingAdmin ? "Edit Admin" : "Add New Admin"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAdminSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={adminForm.name}
                        onChange={(e) =>
                          setAdminForm({ ...adminForm, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={adminForm.email}
                        onChange={(e) =>
                          setAdminForm({ ...adminForm, email: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="designation">Designation</Label>
                      <Input
                        id="designation"
                        value={adminForm.designation}
                        onChange={(e) =>
                          setAdminForm({
                            ...adminForm,
                            designation: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact">Contact</Label>
                      <Input
                        id="contact"
                        value={adminForm.contact}
                        onChange={(e) =>
                          setAdminForm({
                            ...adminForm,
                            contact: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="education">Education</Label>
                      <Input
                        id="education"
                        value={adminForm.education}
                        onChange={(e) =>
                          setAdminForm({
                            ...adminForm,
                            education: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select
                        value={adminForm.role}
                        onValueChange={(value: "main" | "sub") =>
                          setAdminForm({ ...adminForm, role: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sub">Sub Admin</SelectItem>
                          <SelectItem value="main">Main Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={adminForm.description}
                      onChange={(e) =>
                        setAdminForm({
                          ...adminForm,
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
                      onClick={resetAdminForm}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingAdmin ? "Update" : "Create"} Admin
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
                  <TableHead>Name</TableHead>
                  <TableHead>Education</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admins.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell className="font-medium">{admin.name}</TableCell>
                    <TableCell>{admin.education}</TableCell>
                    <TableCell>{admin.designation}</TableCell>
                    <TableCell>{admin.contact}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          admin.role === "main" ? "default" : "secondary"
                        }
                      >
                        {admin.role === "main" ? "Main Admin" : "Sub Admin"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          admin.status === "active" ? "default" : "destructive"
                        }
                      >
                        {admin.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => editAdmin(admin)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            openPermissionDialog("admin", admin.id)
                          }
                        >
                          <Shield className="h-4 w-4" />
                        </Button>
                        {admin.role !== "main" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteAdmin(admin.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Partners Tab */}
      {activeTab === "partners" && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Building className="h-5 w-5" />
              <span>Partner Accounts</span>
            </CardTitle>
            <Dialog
              open={isPartnerDialogOpen}
              onOpenChange={setIsPartnerDialogOpen}
            >
              <DialogTrigger asChild>
                <Button onClick={() => setEditingPartner(null)}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Partner
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingPartner ? "Edit Partner" : "Add New Partner"}
                  </DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="personal">Personal Info</TabsTrigger>
                    <TabsTrigger value="education">Education</TabsTrigger>
                    <TabsTrigger value="center">Center Details</TabsTrigger>
                    <TabsTrigger value="auth">Authentication</TabsTrigger>
                    <TabsTrigger value="banking">Banking Info</TabsTrigger>
                  </TabsList>

                  <form
                    onSubmit={handlePartnerSubmit}
                    className="space-y-6 mt-6"
                  >
                    {/* Personal Information Tab */}
                    <TabsContent value="personal" className="space-y-4">
                      <h3 className="text-lg font-semibold">
                        Personal Information
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="partnerName">Full Name</Label>
                          <Input
                            id="partnerName"
                            value={partnerForm.partnerName}
                            onChange={(e) =>
                              setPartnerForm({
                                ...partnerForm,
                                partnerName: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="fatherName">Father's Name</Label>
                          <Input
                            id="fatherName"
                            value={partnerForm.fatherName}
                            onChange={(e) =>
                              setPartnerForm({
                                ...partnerForm,
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
                            value={partnerForm.motherName}
                            onChange={(e) =>
                              setPartnerForm({
                                ...partnerForm,
                                motherName: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="gender">Gender</Label>
                          <Select
                            value={partnerForm.gender}
                            onValueChange={(value) =>
                              setPartnerForm({ ...partnerForm, gender: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dob">Date of Birth</Label>
                          <Input
                            id="dob"
                            type="date"
                            value={partnerForm.dob}
                            onChange={(e) =>
                              setPartnerForm({
                                ...partnerForm,
                                dob: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={partnerForm.email}
                            onChange={(e) =>
                              setPartnerForm({
                                ...partnerForm,
                                email: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contact">Primary Contact</Label>
                          <Input
                            id="contact"
                            value={partnerForm.contact}
                            onChange={(e) =>
                              setPartnerForm({
                                ...partnerForm,
                                contact: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="alternateContact">
                            Alternate Contact
                          </Label>
                          <Input
                            id="alternateContact"
                            value={partnerForm.alternateContact}
                            onChange={(e) =>
                              setPartnerForm({
                                ...partnerForm,
                                alternateContact: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="aadharNumber">Aadhar Number</Label>
                          <Input
                            id="aadharNumber"
                            value={partnerForm.aadharNumber}
                            onChange={(e) =>
                              setPartnerForm({
                                ...partnerForm,
                                aadharNumber: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="panNumber">PAN Number</Label>
                          <Input
                            id="panNumber"
                            value={partnerForm.panNumber}
                            onChange={(e) =>
                              setPartnerForm({
                                ...partnerForm,
                                panNumber: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Complete Address</Label>
                        <Textarea
                          id="address"
                          value={partnerForm.address}
                          onChange={(e) =>
                            setPartnerForm({
                              ...partnerForm,
                              address: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={partnerForm.city}
                            onChange={(e) =>
                              setPartnerForm({
                                ...partnerForm,
                                city: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            value={partnerForm.state}
                            onChange={(e) =>
                              setPartnerForm({
                                ...partnerForm,
                                state: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pincode">Pin Code</Label>
                          <Input
                            id="pincode"
                            value={partnerForm.pincode}
                            onChange={(e) =>
                              setPartnerForm({
                                ...partnerForm,
                                pincode: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>
                    </TabsContent>

                    {/* Education Tab */}
                    <TabsContent value="education" className="space-y-4">
                      <h3 className="text-lg font-semibold">
                        Educational Qualifications
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="highestQualification">
                            Highest Qualification
                          </Label>
                          <Select
                            value={partnerForm.highestQualification}
                            onValueChange={(value) =>
                              setPartnerForm({
                                ...partnerForm,
                                highestQualification: value,
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select qualification" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="10th">10th Grade</SelectItem>
                              <SelectItem value="12th">12th Grade</SelectItem>
                              <SelectItem value="diploma">Diploma</SelectItem>
                              <SelectItem value="graduation">
                                Graduation
                              </SelectItem>
                              <SelectItem value="postgraduate">
                                Post Graduate
                              </SelectItem>
                              <SelectItem value="doctorate">
                                Doctorate
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="university">University/Board</Label>
                          <Input
                            id="university"
                            value={partnerForm.university}
                            onChange={(e) =>
                              setPartnerForm({
                                ...partnerForm,
                                university: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="passingYear">Passing Year</Label>
                          <Input
                            id="passingYear"
                            type="number"
                            value={partnerForm.passingYear}
                            onChange={(e) =>
                              setPartnerForm({
                                ...partnerForm,
                                passingYear: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="percentage">Percentage/CGPA</Label>
                          <Input
                            id="percentage"
                            value={partnerForm.percentage}
                            onChange={(e) =>
                              setPartnerForm({
                                ...partnerForm,
                                percentage: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="specialization">Specialization</Label>
                          <Input
                            id="specialization"
                            value={partnerForm.specialization}
                            onChange={(e) =>
                              setPartnerForm({
                                ...partnerForm,
                                specialization: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="experience">Experience (Years)</Label>
                          <Input
                            id="experience"
                            type="number"
                            value={partnerForm.experience}
                            onChange={(e) =>
                              setPartnerForm({
                                ...partnerForm,
                                experience: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="additionalCertifications">
                          Additional Certifications
                        </Label>
                        <Textarea
                          id="additionalCertifications"
                          value={partnerForm.additionalCertifications}
                          onChange={(e) =>
                            setPartnerForm({
                              ...partnerForm,
                              additionalCertifications: e.target.value,
                            })
                          }
                          placeholder="List any additional certifications, courses, or training"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="previousInstitution">
                          Previous Institution (if any)
                        </Label>
                        <Input
                          id="previousInstitution"
                          value={partnerForm.previousInstitution}
                          onChange={(e) =>
                            setPartnerForm({
                              ...partnerForm,
                              previousInstitution: e.target.value,
                            })
                          }
                        />
                      </div>
                    </TabsContent>

                    {/* Center Details Tab */}
                    <TabsContent value="center" className="space-y-4">
                      <h3 className="text-lg font-semibold">
                        Center Information
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="centerName">Center Name</Label>
                          <Input
                            id="centerName"
                            value={partnerForm.centerName}
                            onChange={(e) =>
                              setPartnerForm({
                                ...partnerForm,
                                centerName: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="centerType">Center Type</Label>
                          <Select
                            value={partnerForm.centerType}
                            onValueChange={(value) =>
                              setPartnerForm({
                                ...partnerForm,
                                centerType: value,
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select center type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="franchise">
                                Franchise
                              </SelectItem>
                              <SelectItem value="owned">Owned</SelectItem>
                              <SelectItem value="rented">Rented</SelectItem>
                              <SelectItem value="partnership">
                                Partnership
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="establishedYear">
                            Established Year
                          </Label>
                          <Input
                            id="establishedYear"
                            type="number"
                            value={partnerForm.establishedYear}
                            onChange={(e) =>
                              setPartnerForm({
                                ...partnerForm,
                                establishedYear: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="registrationNumber">
                            Registration Number
                          </Label>
                          <Input
                            id="registrationNumber"
                            value={partnerForm.registrationNumber}
                            onChange={(e) =>
                              setPartnerForm({
                                ...partnerForm,
                                registrationNumber: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="gstNumber">GST Number</Label>
                          <Input
                            id="gstNumber"
                            value={partnerForm.gstNumber}
                            onChange={(e) =>
                              setPartnerForm({
                                ...partnerForm,
                                gstNumber: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="centerEmail">Center Email</Label>
                          <Input
                            id="centerEmail"
                            type="email"
                            value={partnerForm.centerEmail}
                            onChange={(e) =>
                              setPartnerForm({
                                ...partnerForm,
                                centerEmail: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="centerContact">Center Contact</Label>
                          <Input
                            id="centerContact"
                            value={partnerForm.centerContact}
                            onChange={(e) =>
                              setPartnerForm({
                                ...partnerForm,
                                centerContact: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="centerAddress">Center Address</Label>
                        <Textarea
                          id="centerAddress"
                          value={partnerForm.centerAddress}
                          onChange={(e) =>
                            setPartnerForm({
                              ...partnerForm,
                              centerAddress: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="centerCity">City</Label>
                          <Input
                            id="centerCity"
                            value={partnerForm.centerCity}
                            onChange={(e) =>
                              setPartnerForm({
                                ...partnerForm,
                                centerCity: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="centerState">State</Label>
                          <Input
                            id="centerState"
                            value={partnerForm.centerState}
                            onChange={(e) =>
                              setPartnerForm({
                                ...partnerForm,
                                centerState: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="centerPincode">Pin Code</Label>
                          <Input
                            id="centerPincode"
                            value={partnerForm.centerPincode}
                            onChange={(e) =>
                              setPartnerForm({
                                ...partnerForm,
                                centerPincode: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>
                    </TabsContent>

                    {/* Authentication Tab */}
                    <TabsContent value="auth" className="space-y-4">
                      <h3 className="text-lg font-semibold">
                        Authentication Details
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="alcId">ALC ID</Label>
                          <Input
                            id="alcId"
                            value={partnerForm.alcId}
                            onChange={(e) =>
                              setPartnerForm({
                                ...partnerForm,
                                alcId: e.target.value,
                              })
                            }
                            placeholder="Auto-generated or custom ALC ID"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">
                            {editingPartner
                              ? "New Password (optional)"
                              : "Password"}
                          </Label>
                          <Input
                            id="password"
                            type="password"
                            value={partnerForm.password}
                            onChange={(e) =>
                              setPartnerForm({
                                ...partnerForm,
                                password: e.target.value,
                              })
                            }
                            required={!editingPartner}
                          />
                        </div>
                        {!editingPartner && (
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword">
                              Confirm Password
                            </Label>
                            <Input
                              id="confirmPassword"
                              type="password"
                              value={partnerForm.confirmPassword}
                              onChange={(e) =>
                                setPartnerForm({
                                  ...partnerForm,
                                  confirmPassword: e.target.value,
                                })
                              }
                              required={!editingPartner}
                            />
                          </div>
                        )}
                      </div>
                    </TabsContent>

                    {/* Banking Information Tab */}
                    <TabsContent value="banking" className="space-y-4">
                      <h3 className="text-lg font-semibold">
                        Banking Information
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="bankAccountNumber">
                            Bank Account Number
                          </Label>
                          <Input
                            id="bankAccountNumber"
                            value={partnerForm.bankAccountNumber}
                            onChange={(e) =>
                              setPartnerForm({
                                ...partnerForm,
                                bankAccountNumber: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ifscCode">IFSC Code</Label>
                          <Input
                            id="ifscCode"
                            value={partnerForm.ifscCode}
                            onChange={(e) =>
                              setPartnerForm({
                                ...partnerForm,
                                ifscCode: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bankName">Bank Name</Label>
                          <Input
                            id="bankName"
                            value={partnerForm.bankName}
                            onChange={(e) =>
                              setPartnerForm({
                                ...partnerForm,
                                bankName: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="branchName">Branch Name</Label>
                          <Input
                            id="branchName"
                            value={partnerForm.branchName}
                            onChange={(e) =>
                              setPartnerForm({
                                ...partnerForm,
                                branchName: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </TabsContent>

                    <div className="flex justify-end space-x-2 mt-6">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={resetPartnerForm}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingPartner ? "Update" : "Create"} Partner
                      </Button>
                    </div>
                  </form>
                </Tabs>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Partner Name</TableHead>
                  <TableHead>ALC ID</TableHead>
                  <TableHead>Password</TableHead>
                  <TableHead>Center Info</TableHead>
                  <TableHead>Education</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {partners.map((partner) => (
                  <TableRow key={partner.id}>
                    <TableCell className="font-medium">
                      {partner.partnerName}
                    </TableCell>
                    <TableCell>{partner.alcId}</TableCell>
                    <TableCell>
                      <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                        {partner.password}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{partner.centerName}</div>
                        <div className="text-sm text-gray-500">
                          {partner.centerAddress}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{partner.education}</TableCell>
                    <TableCell>{partner.contact}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          partner.status === "active"
                            ? "default"
                            : partner.status === "pending"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {partner.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => editPartner(partner)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            openPermissionDialog("partner", partner.id)
                          }
                        >
                          <Shield className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deletePartner(partner.id)}
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
      )}

      {/* Permission Management Dialog */}
      <Dialog
        open={isPermissionDialogOpen}
        onOpenChange={setIsPermissionDialogOpen}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Manage Permissions</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {permissions.map((permission) => {
                const currentPermissions = getCurrentPermissions();
                const isChecked = currentPermissions.includes(permission.id);

                return (
                  <div
                    key={permission.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id={`permission-${permission.id}`}
                          checked={isChecked}
                          onChange={(e) => {
                            const current = getCurrentPermissions();
                            let newPermissions;
                            if (e.target.checked) {
                              newPermissions = [...current, permission.id];
                            } else {
                              newPermissions = current.filter(
                                (p) => p !== permission.id,
                              );
                            }
                            updatePermissions(newPermissions);
                          }}
                          className="h-4 w-4"
                        />
                        <div>
                          <label
                            htmlFor={`permission-${permission.id}`}
                            className="font-medium cursor-pointer"
                          >
                            {permission.name}
                          </label>
                          <p className="text-sm text-gray-600">
                            {permission.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="ml-4">
                      {permission.module}
                    </Badge>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsPermissionDialogOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
