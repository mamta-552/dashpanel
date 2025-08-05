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
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building,
  UserPlus,
  FileText,
  Upload,
  MapPin,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

interface PartnerApplication {
  id: string;
  applicantName: string;
  fatherName: string;
  gender: string;
  dob: string;
  contact: string;
  email: string;
  aadhar: string;
  address: string;
  qualification: string;
  centerName: string;
  centerAddress: string;
  regNo: string;
  regDate: string;
  panNo: string;
  registrationType: string;
  requirements: {
    desktops: boolean;
    printer: boolean;
    officeRoom: boolean;
    classRoom: boolean;
    computerLab: boolean;
    reception: boolean;
    washroom: boolean;
    drinkingWater: boolean;
    internet: boolean;
    powerBackup: boolean;
    otherRequirements: string;
  };
  documents: {
    photo: string;
    signature: string;
    aadharDoc: string;
    pan: string;
    qualification: string;
    bankCopy: string;
    rentAgreement: string;
    interiorPhotos: string[];
    exteriorPhotos: string[];
  };
  geoLocation: {
    latitude: number;
    longitude: number;
  };
  termsAccepted: boolean;
  applicationStatus: "pending" | "approved" | "rejected";
  paymentStatus: "pending" | "paid" | "failed";
  documentVerification: "pending" | "verified" | "rejected";
  siteVisit: "pending" | "completed" | "scheduled";
  finalVerification: "pending" | "approved" | "rejected";
  centerCode: string;
  submissionDate: string;
}

const mockApplications: PartnerApplication[] = [
  {
    id: "1",
    applicantName: "Rajesh Kumar",
    fatherName: "Ram Kumar",
    gender: "Male",
    dob: "1985-05-15",
    contact: "+91 9876543210",
    email: "rajesh@example.com",
    aadhar: "1234-5678-9012",
    address: "123 Main Street, New Delhi",
    qualification: "MBA",
    centerName: "Delhi Learning Center",
    centerAddress: "Connaught Place, New Delhi",
    regNo: "DL123456",
    regDate: "2024-01-15",
    panNo: "ABCDE1234F",
    registrationType: "Proprietorship",
    requirements: {
      desktops: true,
      printer: true,
      officeRoom: true,
      classRoom: true,
      computerLab: true,
      reception: true,
      washroom: true,
      drinkingWater: true,
      internet: true,
      powerBackup: false,
      otherRequirements: "UPS backup system planned",
    },
    documents: {
      photo: "uploaded",
      signature: "uploaded",
      aadharDoc: "uploaded",
      pan: "uploaded",
      qualification: "uploaded",
      bankCopy: "uploaded",
      rentAgreement: "uploaded",
      interiorPhotos: ["photo1.jpg", "photo2.jpg"],
      exteriorPhotos: ["exterior1.jpg"],
    },
    geoLocation: {
      latitude: 28.6139,
      longitude: 77.209,
    },
    termsAccepted: true,
    applicationStatus: "approved",
    paymentStatus: "paid",
    documentVerification: "verified",
    siteVisit: "completed",
    finalVerification: "approved",
    centerCode: "EDU001",
    submissionDate: "2024-01-15",
  },
];

export default function PartnerManagement() {
  const [applications, setApplications] =
    useState<PartnerApplication[]>(mockApplications);
  const [isNewApplicationOpen, setIsNewApplicationOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [viewingApplication, setViewingApplication] =
    useState<PartnerApplication | null>(null);

  const [formData, setFormData] = useState({
    // Partner Details
    applicantName: "",
    fatherName: "",
    gender: "",
    dob: "",
    contact: "",
    email: "",
    aadhar: "",
    address: "",
    qualification: "",

    // Center Details
    centerName: "",
    centerAddress: "",
    regNo: "",
    regDate: "",
    centerEmail: "",
    centerContact: "",
    panNo: "",
    registrationType: "",
    otherType: "",

    // Requirements
    requirements: {
      desktops: false,
      printer: false,
      officeRoom: false,
      classRoom: false,
      computerLab: false,
      reception: false,
      washroom: false,
      drinkingWater: false,
      internet: false,
      powerBackup: false,
      otherRequirements: "",
    },

    // Terms
    termsAccepted: false,
  });

  const steps = [
    { title: "Partner Details", icon: UserPlus },
    { title: "Center Details", icon: Building },
    { title: "Requirements", icon: CheckCircle },
    { title: "Documents", icon: Upload },
    { title: "Location", icon: MapPin },
    { title: "Terms & Submit", icon: FileText },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "secondary";
      case "approved":
      case "verified":
      case "completed":
      case "paid":
        return "default";
      case "rejected":
      case "failed":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const handleSubmitApplication = () => {
    const newApplication: PartnerApplication = {
      id: Date.now().toString(),
      ...formData,
      documents: {
        photo: "pending",
        signature: "pending",
        aadharDoc: "pending",
        pan: "pending",
        qualification: "pending",
        bankCopy: "pending",
        rentAgreement: "pending",
        interiorPhotos: [],
        exteriorPhotos: [],
      },
      geoLocation: {
        latitude: 0,
        longitude: 0,
      },
      applicationStatus: "pending",
      paymentStatus: "pending",
      documentVerification: "pending",
      siteVisit: "pending",
      finalVerification: "pending",
      centerCode: "",
      submissionDate: new Date().toISOString().split("T")[0],
    };

    setApplications([...applications, newApplication]);
    setIsNewApplicationOpen(false);
    setCurrentStep(0);
    toast.success("Partner application submitted successfully");
  };

  const updateApplicationStatus = (
    id: string,
    field: string,
    value: string,
  ) => {
    setApplications(
      applications.map((app) =>
        app.id === id ? { ...app, [field]: value } : app,
      ),
    );
    toast.success("Status updated successfully");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Partner Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage partner registrations and applications
          </p>
        </div>
        <Dialog
          open={isNewApplicationOpen}
          onOpenChange={setIsNewApplicationOpen}
        >
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              New Partner Application
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Partner Registration Application</DialogTitle>
            </DialogHeader>

            {/* Progress Bar */}
            <div className="mb-6">
              <Progress
                value={(currentStep / (steps.length - 1)) * 100}
                className="mb-4"
              />
              <div className="flex justify-between text-sm">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-1 ${
                      index <= currentStep ? "text-primary" : "text-gray-400"
                    }`}
                  >
                    <step.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{step.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <Tabs value={currentStep.toString()} className="w-full">
              {/* Step 0: Partner Details */}
              <TabsContent value="0" className="space-y-4">
                <h3 className="text-lg font-semibold">Partner Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="applicantName">Applicant Name</Label>
                    <Input
                      id="applicantName"
                      value={formData.applicantName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          applicantName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fatherName">Father/Mother Name</Label>
                    <Input
                      id="fatherName"
                      value={formData.fatherName}
                      onChange={(e) =>
                        setFormData({ ...formData, fatherName: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) =>
                        setFormData({ ...formData, gender: value })
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
                      value={formData.dob}
                      onChange={(e) =>
                        setFormData({ ...formData, dob: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact">Contact</Label>
                    <Input
                      id="contact"
                      value={formData.contact}
                      onChange={(e) =>
                        setFormData({ ...formData, contact: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aadhar">Aadhar Number</Label>
                    <Input
                      id="aadhar"
                      value={formData.aadhar}
                      onChange={(e) =>
                        setFormData({ ...formData, aadhar: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="qualification">Last Qualification</Label>
                    <Input
                      id="qualification"
                      value={formData.qualification}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          qualification: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </div>
              </TabsContent>

              {/* Step 1: Center Details */}
              <TabsContent value="1" className="space-y-4">
                <h3 className="text-lg font-semibold">Center Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="centerName">Center Name</Label>
                    <Input
                      id="centerName"
                      value={formData.centerName}
                      onChange={(e) =>
                        setFormData({ ...formData, centerName: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="regNo">Registration Number</Label>
                    <Input
                      id="regNo"
                      value={formData.regNo}
                      onChange={(e) =>
                        setFormData({ ...formData, regNo: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="regDate">Registration Date</Label>
                    <Input
                      id="regDate"
                      type="date"
                      value={formData.regDate}
                      onChange={(e) =>
                        setFormData({ ...formData, regDate: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="centerEmail">Center Email</Label>
                    <Input
                      id="centerEmail"
                      type="email"
                      value={formData.centerEmail}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          centerEmail: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="centerContact">Center Contact</Label>
                    <Input
                      id="centerContact"
                      value={formData.centerContact}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          centerContact: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="panNo">PAN Number</Label>
                    <Input
                      id="panNo"
                      value={formData.panNo}
                      onChange={(e) =>
                        setFormData({ ...formData, panNo: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="centerAddress">Center Address</Label>
                  <Textarea
                    id="centerAddress"
                    value={formData.centerAddress}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        centerAddress: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registrationType">Registration Type</Label>
                  <Select
                    value={formData.registrationType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, registrationType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select registration type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="proprietorship">
                        Proprietorship
                      </SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="company">Company</SelectItem>
                      <SelectItem value="trust">Trust</SelectItem>
                      <SelectItem value="ngo">NGO</SelectItem>
                      <SelectItem value="society">Society</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {formData.registrationType === "other" && (
                  <div className="space-y-2">
                    <Label htmlFor="otherType">Please specify</Label>
                    <Input
                      id="otherType"
                      value={formData.otherType}
                      onChange={(e) =>
                        setFormData({ ...formData, otherType: e.target.value })
                      }
                    />
                  </div>
                )}
              </TabsContent>

              {/* Step 2: Requirements */}
              <TabsContent value="2" className="space-y-4">
                <h3 className="text-lg font-semibold">Minimum Requirements</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries({
                      desktops: "5× Desktop (i5 6th Gen, 8GB RAM)",
                      printer: "Printer",
                      officeRoom: "Office Room",
                      classRoom: "Class Room",
                      computerLab: "Computer Lab",
                      reception: "Reception",
                      washroom: "Washroom",
                      drinkingWater: "Drinking Water",
                      internet: "100 Mbps Internet",
                      powerBackup: "Power Backup",
                    }).map(([key, label]) => (
                      <div key={key} className="flex items-center space-x-2">
                        <Checkbox
                          id={key}
                          checked={
                            formData.requirements[
                              key as keyof typeof formData.requirements
                            ]
                          }
                          onCheckedChange={(checked) =>
                            setFormData({
                              ...formData,
                              requirements: {
                                ...formData.requirements,
                                [key]: checked,
                              },
                            })
                          }
                        />
                        <Label htmlFor={key}>{label}</Label>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="otherRequirements">
                      Other Requirements
                    </Label>
                    <Textarea
                      id="otherRequirements"
                      value={formData.requirements.otherRequirements}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          requirements: {
                            ...formData.requirements,
                            otherRequirements: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Step 3: Documents */}
              <TabsContent value="3" className="space-y-4">
                <h3 className="text-lg font-semibold">Document Upload</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Applicant Photo",
                    "Signature",
                    "Aadhar Card",
                    "PAN Card",
                    "Last Qualification Certificate",
                    "Bank Copy",
                    "Rent Agreement",
                    "Interior Photos (Class, Office, Lab, Reception)",
                    "Exterior Photos",
                  ].map((doc) => (
                    <div key={doc} className="space-y-2">
                      <Label>{doc}</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-500">
                          Click to upload {doc}
                        </p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Choose File
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Step 4: Location */}
              <TabsContent value="4" className="space-y-4">
                <h3 className="text-lg font-semibold">Geo Location</h3>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
                  <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Click the button below to capture your center's location
                  </p>
                  <Button>
                    <MapPin className="h-4 w-4 mr-2" />
                    Get Current Location
                  </Button>
                </div>
              </TabsContent>

              {/* Step 5: Terms & Submit */}
              <TabsContent value="5" className="space-y-4">
                <h3 className="text-lg font-semibold">Terms & Conditions</h3>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 max-h-40 overflow-y-auto">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        termsAccepted: checked as boolean,
                      })
                    }
                  />
                  <Label htmlFor="terms">
                    I agree to the terms and conditions
                  </Label>
                </div>
              </TabsContent>
            </Tabs>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              {currentStep < steps.length - 1 ? (
                <Button onClick={() => setCurrentStep(currentStep + 1)}>
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSubmitApplication}
                  disabled={!formData.termsAccepted}
                >
                  Submit Application
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Partner Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>Center</TableHead>
                <TableHead>Application Status</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Document Verification</TableHead>
                <TableHead>Site Visit</TableHead>
                <TableHead>Final Verification</TableHead>
                <TableHead>Center Code</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{app.applicantName}</div>
                      <div className="text-sm text-gray-500">{app.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{app.centerName}</div>
                      <div className="text-sm text-gray-500">
                        {app.centerAddress}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={app.applicationStatus}
                      onValueChange={(value) =>
                        updateApplicationStatus(
                          app.id,
                          "applicationStatus",
                          value,
                        )
                      }
                    >
                      <SelectTrigger className="w-32">
                        <Badge variant={getStatusColor(app.applicationStatus)}>
                          {app.applicationStatus}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={app.paymentStatus}
                      onValueChange={(value) =>
                        updateApplicationStatus(app.id, "paymentStatus", value)
                      }
                    >
                      <SelectTrigger className="w-32">
                        <Badge variant={getStatusColor(app.paymentStatus)}>
                          {app.paymentStatus}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={app.documentVerification}
                      onValueChange={(value) =>
                        updateApplicationStatus(
                          app.id,
                          "documentVerification",
                          value,
                        )
                      }
                    >
                      <SelectTrigger className="w-32">
                        <Badge
                          variant={getStatusColor(app.documentVerification)}
                        >
                          {app.documentVerification}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="verified">Verified</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={app.siteVisit}
                      onValueChange={(value) =>
                        updateApplicationStatus(app.id, "siteVisit", value)
                      }
                    >
                      <SelectTrigger className="w-32">
                        <Badge variant={getStatusColor(app.siteVisit)}>
                          {app.siteVisit}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={app.finalVerification}
                      onValueChange={(value) =>
                        updateApplicationStatus(
                          app.id,
                          "finalVerification",
                          value,
                        )
                      }
                    >
                      <SelectTrigger className="w-32">
                        <Badge variant={getStatusColor(app.finalVerification)}>
                          {app.finalVerification}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-sm">
                      {app.centerCode || "Not Assigned"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setViewingApplication(app)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
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

      {/* View Application Dialog */}
      {viewingApplication && (
        <Dialog
          open={!!viewingApplication}
          onOpenChange={() => setViewingApplication(null)}
        >
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Application Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Personal Information</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Name:</strong> {viewingApplication.applicantName}
                    </p>
                    <p>
                      <strong>Father's Name:</strong>{" "}
                      {viewingApplication.fatherName}
                    </p>
                    <p>
                      <strong>Email:</strong> {viewingApplication.email}
                    </p>
                    <p>
                      <strong>Contact:</strong> {viewingApplication.contact}
                    </p>
                    <p>
                      <strong>Qualification:</strong>{" "}
                      {viewingApplication.qualification}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Center Information</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Center Name:</strong>{" "}
                      {viewingApplication.centerName}
                    </p>
                    <p>
                      <strong>Address:</strong>{" "}
                      {viewingApplication.centerAddress}
                    </p>
                    <p>
                      <strong>Registration No:</strong>{" "}
                      {viewingApplication.regNo}
                    </p>
                    <p>
                      <strong>PAN No:</strong> {viewingApplication.panNo}
                    </p>
                    <p>
                      <strong>Type:</strong>{" "}
                      {viewingApplication.registrationType}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Requirements Checklist</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {Object.entries(viewingApplication.requirements).map(
                    ([key, value]) =>
                      key !== "otherRequirements" && (
                        <div key={key} className="flex items-center space-x-2">
                          {typeof value === "boolean" ? (
                            value ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )
                          ) : null}
                          <span className="capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </span>
                        </div>
                      ),
                  )}
                </div>
                {viewingApplication.requirements.otherRequirements && (
                  <div className="mt-2">
                    <strong>Other Requirements:</strong>{" "}
                    {viewingApplication.requirements.otherRequirements}
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
