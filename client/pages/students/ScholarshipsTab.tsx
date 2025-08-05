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
import {
  Award,
  Plus,
  Edit,
  Trash2,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

interface ScholarshipApplication {
  id: string;
  studentName: string;
  fatherName: string;
  motherName: string;
  dob: string;
  gender: string;
  contactNo: string;
  category: string;
  emailId: string;
  pppId: string;
  maritalStatus: string;
  fullAddress: string;
  nationality: string;
  aadharNo: string;
  fatherHusbandOccupation: string;
  qualifications: QualificationDetail[];
  selfDeclaration: boolean;
  paymentStatus: "pending" | "paid" | "failed";
  applicationStatus:
    | "draft"
    | "submitted"
    | "under-review"
    | "approved"
    | "rejected";
  appliedDate: string;
  scholarshipType: string;
}

interface QualificationDetail {
  id: string;
  examName: string;
  rollNo: string;
  passingYear: string;
  marksObtained: string;
  totalMarks: string;
  boardName: string;
  percentage: string;
}

const mockApplications: ScholarshipApplication[] = [
  {
    id: "1",
    studentName: "Aarav Sharma",
    fatherName: "Rajesh Sharma",
    motherName: "Priya Sharma",
    dob: "2000-05-15",
    gender: "Male",
    contactNo: "+91 9876543210",
    category: "General",
    emailId: "aarav@example.com",
    pppId: "PPP123456",
    maritalStatus: "Single",
    fullAddress: "123 Main Street, New Delhi, India - 110001",
    nationality: "Indian",
    aadharNo: "1234-5678-9012",
    fatherHusbandOccupation: "Government Employee",
    qualifications: [
      {
        id: "1",
        examName: "Class 12th",
        rollNo: "12345",
        passingYear: "2018",
        marksObtained: "450",
        totalMarks: "500",
        boardName: "CBSE",
        percentage: "90",
      },
    ],
    selfDeclaration: true,
    paymentStatus: "paid",
    applicationStatus: "submitted",
    appliedDate: "2024-01-15",
    scholarshipType: "Merit-based Scholarship",
  },
];

export default function ScholarshipsTab() {
  const [applications, setApplications] =
    useState<ScholarshipApplication[]>(mockApplications);
  const [isApplicationDialogOpen, setIsApplicationDialogOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [editingApplication, setEditingApplication] =
    useState<ScholarshipApplication | null>(null);

  const [applicationForm, setApplicationForm] = useState({
    studentName: "",
    fatherName: "",
    motherName: "",
    dob: "",
    gender: "",
    contactNo: "",
    category: "",
    emailId: "",
    pppId: "",
    maritalStatus: "",
    fullAddress: "",
    nationality: "Indian",
    aadharNo: "",
    fatherHusbandOccupation: "",
    scholarshipType: "",
    selfDeclaration: false,
  });

  const [qualifications, setQualifications] = useState<QualificationDetail[]>([
    {
      id: "1",
      examName: "",
      rollNo: "",
      passingYear: "",
      marksObtained: "",
      totalMarks: "",
      boardName: "",
      percentage: "",
    },
  ]);

  const addQualification = () => {
    const newQualification: QualificationDetail = {
      id: Date.now().toString(),
      examName: "",
      rollNo: "",
      passingYear: "",
      marksObtained: "",
      totalMarks: "",
      boardName: "",
      percentage: "",
    };
    setQualifications([...qualifications, newQualification]);
  };

  const updateQualification = (
    id: string,
    field: keyof QualificationDetail,
    value: string,
  ) => {
    setQualifications(
      qualifications.map((qual) =>
        qual.id === id ? { ...qual, [field]: value } : qual,
      ),
    );
  };

  const removeQualification = (id: string) => {
    if (qualifications.length > 1) {
      setQualifications(qualifications.filter((qual) => qual.id !== id));
    }
  };

  const calculatePercentage = (
    id: string,
    marksObtained: string,
    totalMarks: string,
  ) => {
    if (marksObtained && totalMarks) {
      const percentage = (
        (parseFloat(marksObtained) / parseFloat(totalMarks)) *
        100
      ).toFixed(2);
      updateQualification(id, "percentage", percentage);
    }
  };

  const handleSubmitApplication = () => {
    if (!applicationForm.selfDeclaration) {
      toast.error("Please accept the self-declaration to proceed");
      return;
    }

    const newApplication: ScholarshipApplication = {
      id: Date.now().toString(),
      ...applicationForm,
      qualifications,
      paymentStatus: "pending",
      applicationStatus: "draft",
      appliedDate: new Date().toISOString().split("T")[0],
    };

    setApplications([...applications, newApplication]);
    toast.success("Application submitted successfully! Proceed to payment.");
    setIsApplicationDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setApplicationForm({
      studentName: "",
      fatherName: "",
      motherName: "",
      dob: "",
      gender: "",
      contactNo: "",
      category: "",
      emailId: "",
      pppId: "",
      maritalStatus: "",
      fullAddress: "",
      nationality: "Indian",
      aadharNo: "",
      fatherHusbandOccupation: "",
      scholarshipType: "",
      selfDeclaration: false,
    });
    setQualifications([
      {
        id: "1",
        examName: "",
        rollNo: "",
        passingYear: "",
        marksObtained: "",
        totalMarks: "",
        boardName: "",
        percentage: "",
      },
    ]);
    setCurrentStep(1);
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const processPayment = (applicationId: string) => {
    setApplications(
      applications.map((app) =>
        app.id === applicationId
          ? { ...app, paymentStatus: "paid", applicationStatus: "submitted" }
          : app,
      ),
    );
    toast.success("Payment processed successfully! Application submitted.");
  };

  const deleteApplication = (applicationId: string) => {
    setApplications(applications.filter((app) => app.id !== applicationId));
    toast.success("Application deleted successfully");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Scholarship Applications
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage scholarship applications and financial aid programs
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Award className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <h3 className="font-semibold">Merit-based</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Academic excellence
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Award className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <h3 className="font-semibold">Need-based</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Financial assistance
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Award className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <h3 className="font-semibold">Special Category</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Reserved categories
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5" />
            <span>Scholarship Applications</span>
          </CardTitle>
          <Dialog
            open={isApplicationDialogOpen}
            onOpenChange={setIsApplicationDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Apply for Scholarship
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Scholarship Application Form</DialogTitle>
                <div className="flex items-center space-x-2 mt-4">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={`flex items-center justify-center w-8 h-8 rounded-full text-sm ${
                        currentStep >= step
                          ? "bg-primary text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {step}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  Step {currentStep} of 4:{" "}
                  {currentStep === 1
                    ? "Personal Information"
                    : currentStep === 2
                      ? "Contact & Address Details"
                      : currentStep === 3
                        ? "Educational Qualifications"
                        : "Declaration & Payment"}
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="studentName">Student Name *</Label>
                        <Input
                          id="studentName"
                          value={applicationForm.studentName}
                          onChange={(e) =>
                            setApplicationForm({
                              ...applicationForm,
                              studentName: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fatherName">Father's Name *</Label>
                        <Input
                          id="fatherName"
                          value={applicationForm.fatherName}
                          onChange={(e) =>
                            setApplicationForm({
                              ...applicationForm,
                              fatherName: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="motherName">Mother's Name *</Label>
                        <Input
                          id="motherName"
                          value={applicationForm.motherName}
                          onChange={(e) =>
                            setApplicationForm({
                              ...applicationForm,
                              motherName: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dob">Date of Birth *</Label>
                        <Input
                          id="dob"
                          type="date"
                          value={applicationForm.dob}
                          onChange={(e) =>
                            setApplicationForm({
                              ...applicationForm,
                              dob: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender *</Label>
                        <Select
                          value={applicationForm.gender}
                          onValueChange={(value) =>
                            setApplicationForm({
                              ...applicationForm,
                              gender: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category *</Label>
                        <Select
                          value={applicationForm.category}
                          onValueChange={(value) =>
                            setApplicationForm({
                              ...applicationForm,
                              category: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="General">General</SelectItem>
                            <SelectItem value="SC">SC</SelectItem>
                            <SelectItem value="ST">ST</SelectItem>
                            <SelectItem value="OBC">OBC</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maritalStatus">Marital Status *</Label>
                        <Select
                          value={applicationForm.maritalStatus}
                          onValueChange={(value) =>
                            setApplicationForm({
                              ...applicationForm,
                              maritalStatus: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Single">Single</SelectItem>
                            <SelectItem value="Married">Married</SelectItem>
                            <SelectItem value="Divorced">Divorced</SelectItem>
                            <SelectItem value="Widowed">Widowed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fatherHusbandOccupation">
                        Father's/Husband's Occupation *
                      </Label>
                      <Input
                        id="fatherHusbandOccupation"
                        value={applicationForm.fatherHusbandOccupation}
                        onChange={(e) =>
                          setApplicationForm({
                            ...applicationForm,
                            fatherHusbandOccupation: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Contact & Address Details */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Contact & Address Details
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contactNo">Contact Number *</Label>
                        <Input
                          id="contactNo"
                          value={applicationForm.contactNo}
                          onChange={(e) =>
                            setApplicationForm({
                              ...applicationForm,
                              contactNo: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emailId">Email ID *</Label>
                        <Input
                          id="emailId"
                          type="email"
                          value={applicationForm.emailId}
                          onChange={(e) =>
                            setApplicationForm({
                              ...applicationForm,
                              emailId: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="pppId">PPP ID</Label>
                        <Input
                          id="pppId"
                          value={applicationForm.pppId}
                          onChange={(e) =>
                            setApplicationForm({
                              ...applicationForm,
                              pppId: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="aadharNo">Aadhar Number *</Label>
                        <Input
                          id="aadharNo"
                          value={applicationForm.aadharNo}
                          onChange={(e) =>
                            setApplicationForm({
                              ...applicationForm,
                              aadharNo: e.target.value,
                            })
                          }
                          placeholder="1234-5678-9012"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nationality">Nationality *</Label>
                        <Input
                          id="nationality"
                          value={applicationForm.nationality}
                          onChange={(e) =>
                            setApplicationForm({
                              ...applicationForm,
                              nationality: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="scholarshipType">
                          Scholarship Type *
                        </Label>
                        <Select
                          value={applicationForm.scholarshipType}
                          onValueChange={(value) =>
                            setApplicationForm({
                              ...applicationForm,
                              scholarshipType: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select scholarship type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Merit-based Scholarship">
                              Merit-based Scholarship
                            </SelectItem>
                            <SelectItem value="Need-based Scholarship">
                              Need-based Scholarship
                            </SelectItem>
                            <SelectItem value="Special Category Scholarship">
                              Special Category Scholarship
                            </SelectItem>
                            <SelectItem value="Sports Scholarship">
                              Sports Scholarship
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fullAddress">Full Address *</Label>
                      <Textarea
                        id="fullAddress"
                        value={applicationForm.fullAddress}
                        onChange={(e) =>
                          setApplicationForm({
                            ...applicationForm,
                            fullAddress: e.target.value,
                          })
                        }
                        rows={3}
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Educational Qualifications */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">
                        Educational Qualifications
                      </h3>
                      <Button
                        type="button"
                        onClick={addQualification}
                        size="sm"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Qualification
                      </Button>
                    </div>
                    {qualifications.map((qual, index) => (
                      <Card key={qual.id} className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium">
                            Qualification {index + 1}
                          </h4>
                          {qualifications.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeQualification(qual.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Name of Exam *</Label>
                            <Input
                              value={qual.examName}
                              onChange={(e) =>
                                updateQualification(
                                  qual.id,
                                  "examName",
                                  e.target.value,
                                )
                              }
                              placeholder="e.g., Class 12th, Graduation"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Roll Number *</Label>
                            <Input
                              value={qual.rollNo}
                              onChange={(e) =>
                                updateQualification(
                                  qual.id,
                                  "rollNo",
                                  e.target.value,
                                )
                              }
                              required
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-4">
                          <div className="space-y-2">
                            <Label>Passing Year *</Label>
                            <Input
                              value={qual.passingYear}
                              onChange={(e) =>
                                updateQualification(
                                  qual.id,
                                  "passingYear",
                                  e.target.value,
                                )
                              }
                              placeholder="2023"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Marks Obtained *</Label>
                            <Input
                              type="number"
                              value={qual.marksObtained}
                              onChange={(e) => {
                                updateQualification(
                                  qual.id,
                                  "marksObtained",
                                  e.target.value,
                                );
                                calculatePercentage(
                                  qual.id,
                                  e.target.value,
                                  qual.totalMarks,
                                );
                              }}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Total Marks *</Label>
                            <Input
                              type="number"
                              value={qual.totalMarks}
                              onChange={(e) => {
                                updateQualification(
                                  qual.id,
                                  "totalMarks",
                                  e.target.value,
                                );
                                calculatePercentage(
                                  qual.id,
                                  qual.marksObtained,
                                  e.target.value,
                                );
                              }}
                              required
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div className="space-y-2">
                            <Label>Name of Board/University *</Label>
                            <Input
                              value={qual.boardName}
                              onChange={(e) =>
                                updateQualification(
                                  qual.id,
                                  "boardName",
                                  e.target.value,
                                )
                              }
                              placeholder="e.g., CBSE, State Board"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Percentage</Label>
                            <Input
                              value={qual.percentage}
                              onChange={(e) =>
                                updateQualification(
                                  qual.id,
                                  "percentage",
                                  e.target.value,
                                )
                              }
                              placeholder="Auto-calculated"
                              readOnly
                            />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Step 4: Declaration & Payment */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold">
                      Self-Declaration & Payment
                    </h3>
                    <Card className="p-4 bg-yellow-50 dark:bg-yellow-900/20">
                      <h4 className="font-semibold mb-3">Self-Declaration</h4>
                      <div className="space-y-3 text-sm">
                        <p>I hereby declare that:</p>
                        <ul className="list-disc list-inside space-y-2">
                          <li>
                            All the information provided in this application is
                            true and correct to the best of my knowledge.
                          </li>
                          <li>
                            I understand that any false information may lead to
                            rejection of my application.
                          </li>
                          <li>
                            I am eligible for the scholarship as per the terms
                            and conditions.
                          </li>
                          <li>
                            I will use the scholarship amount solely for
                            educational purposes.
                          </li>
                          <li>
                            I will maintain the required academic standards
                            throughout the scholarship period.
                          </li>
                        </ul>
                      </div>
                      <div className="flex items-center space-x-2 mt-4">
                        <Checkbox
                          id="declaration"
                          checked={applicationForm.selfDeclaration}
                          onCheckedChange={(checked) =>
                            setApplicationForm({
                              ...applicationForm,
                              selfDeclaration: checked as boolean,
                            })
                          }
                        />
                        <Label htmlFor="declaration" className="text-sm">
                          I accept the above declaration and agree to the terms
                          and conditions *
                        </Label>
                      </div>
                    </Card>

                    <Card className="p-4">
                      <h4 className="font-semibold mb-3">
                        Payment Information
                      </h4>
                      <div className="text-sm space-y-2">
                        <p>
                          <strong>Application Fee:</strong> ₹500
                        </p>
                        <p>
                          <strong>Processing Fee:</strong> ₹100
                        </p>
                        <p className="text-lg font-semibold">
                          <strong>Total Amount:</strong> ₹600
                        </p>
                      </div>
                      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          <CheckCircle className="h-4 w-4 inline mr-1" />
                          Payment will be processed after submitting the
                          application. You will be redirected to a secure
                          payment gateway.
                        </p>
                      </div>
                    </Card>
                  </div>
                )}

                <div className="flex justify-between pt-6">
                  <div>
                    {currentStep > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                      >
                        Previous
                      </Button>
                    )}
                  </div>
                  <div className="space-x-2">
                    {currentStep < 4 ? (
                      <Button type="button" onClick={nextStep}>
                        Next
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={handleSubmitApplication}
                        disabled={!applicationForm.selfDeclaration}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Submit Application & Pay
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Application ID</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Scholarship Type</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Application Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className="font-medium">
                    APP{application.id}
                  </TableCell>
                  <TableCell>{application.studentName}</TableCell>
                  <TableCell>{application.scholarshipType}</TableCell>
                  <TableCell>{application.appliedDate}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        application.paymentStatus === "paid"
                          ? "default"
                          : application.paymentStatus === "pending"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {application.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        application.applicationStatus === "approved"
                          ? "default"
                          : application.applicationStatus === "rejected"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {application.applicationStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {application.paymentStatus === "pending" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => processPayment(application.id)}
                        >
                          <CreditCard className="h-4 w-4 mr-1" />
                          Pay
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteApplication(application.id)}
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
