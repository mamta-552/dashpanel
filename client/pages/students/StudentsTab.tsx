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
  UserPlus,
  Upload,
  Edit,
  Trash2,
  Eye,
  Users,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

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

interface StudentRegistration {
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
  photo?: File | null;
  signature?: File | null;
  thumbImage?: File | null;
  selfDeclaration: boolean;
  paymentStatus: "paid" | "pending" | "failed";
  registrationStatus: "submitted" | "approved" | "rejected" | "draft";
  registeredDate: string;
  course: string;
  batch: string;
  enrollmentNo?: string;
}

const mockRegistrations: StudentRegistration[] = [
  {
    id: "1",
    studentName: "Aarav Sharma",
    fatherName: "Rajesh Sharma",
    motherName: "Sunita Sharma",
    dob: "2000-05-15",
    gender: "Male",
    contactNo: "9876543210",
    category: "General",
    emailId: "aarav.sharma@email.com",
    pppId: "PPP123456",
    maritalStatus: "Single",
    fullAddress: "123 Main St, Delhi, India",
    nationality: "Indian",
    aadharNo: "1234-5678-9012",
    fatherHusbandOccupation: "Engineer",
    course: "Web Development",
    batch: "2024-A",
    enrollmentNo: "WD2024001",
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
    registrationStatus: "approved",
    registeredDate: "2024-01-15",
  },
];

export default function StudentsTab() {
  const [registrations, setRegistrations] =
    useState<StudentRegistration[]>(mockRegistrations);
  const [isRegistrationDialogOpen, setIsRegistrationDialogOpen] =
    useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [editingRegistration, setEditingRegistration] =
    useState<StudentRegistration | null>(null);

  const [registrationForm, setRegistrationForm] = useState({
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
    course: "",
    batch: "",
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

  const [uploadedFiles, setUploadedFiles] = useState({
    photo: null as File | null,
    signature: null as File | null,
    thumbImage: null as File | null,
  });

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

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileType: "photo" | "signature" | "thumbImage",
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFiles({ ...uploadedFiles, [fileType]: file });
    }
  };

  const handleSubmitRegistration = () => {
    if (!registrationForm.selfDeclaration) {
      toast.error("Please accept the self-declaration to proceed");
      return;
    }

    const newRegistration: StudentRegistration = {
      id: Date.now().toString(),
      ...registrationForm,
      qualifications,
      photo: uploadedFiles.photo,
      signature: uploadedFiles.signature,
      thumbImage: uploadedFiles.thumbImage,
      paymentStatus: "pending",
      registrationStatus: "draft",
      registeredDate: new Date().toISOString().split("T")[0],
      enrollmentNo: `${registrationForm.course.substring(0, 2).toUpperCase()}${new Date().getFullYear()}${(registrations.length + 1).toString().padStart(3, "0")}`,
    };

    setRegistrations([...registrations, newRegistration]);
    toast.success("Registration submitted successfully! Proceed to payment.");
    setIsRegistrationDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setRegistrationForm({
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
      course: "",
      batch: "",
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
    setUploadedFiles({
      photo: null,
      signature: null,
      thumbImage: null,
    });
    setCurrentStep(1);
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const processPayment = (registrationId: string) => {
    setRegistrations(
      registrations.map((reg) =>
        reg.id === registrationId
          ? { ...reg, paymentStatus: "paid", registrationStatus: "submitted" }
          : reg,
      ),
    );
    toast.success("Payment processed successfully! Registration submitted.");
  };

  const approveRegistration = (registrationId: string) => {
    setRegistrations(
      registrations.map((reg) =>
        reg.id === registrationId
          ? { ...reg, registrationStatus: "approved" }
          : reg,
      ),
    );
    toast.success("Registration approved successfully");
  };

  const rejectRegistration = (registrationId: string) => {
    setRegistrations(
      registrations.map((reg) =>
        reg.id === registrationId
          ? { ...reg, registrationStatus: "rejected" }
          : reg,
      ),
    );
    toast.success("Registration rejected");
  };

  const deleteRegistration = (registrationId: string) => {
    setRegistrations(registrations.filter((reg) => reg.id !== registrationId));
    toast.success("Registration deleted successfully");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Student Registration
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage student registrations and enrollment process
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <UserPlus className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <h3 className="font-semibold">Total Applications</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {registrations.length} submitted
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <h3 className="font-semibold">Approved</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {
                registrations.filter((r) => r.registrationStatus === "approved")
                  .length
              }{" "}
              students
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <h3 className="font-semibold">Pending</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {
                registrations.filter(
                  (r) => r.registrationStatus === "submitted",
                ).length
              }{" "}
              applications
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <CreditCard className="h-8 w-8 mx-auto mb-2 text-orange-500" />
            <h3 className="font-semibold">Payment Pending</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {
                registrations.filter((r) => r.paymentStatus === "pending")
                  .length
              }{" "}
              payments
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Student Registrations</span>
          </CardTitle>
          <Dialog
            open={isRegistrationDialogOpen}
            onOpenChange={setIsRegistrationDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                New Registration
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Student Registration Form</DialogTitle>
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
                      ? "Contact & Course Details"
                      : currentStep === 3
                        ? "Educational Qualifications & Documents"
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
                          value={registrationForm.studentName}
                          onChange={(e) =>
                            setRegistrationForm({
                              ...registrationForm,
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
                          value={registrationForm.fatherName}
                          onChange={(e) =>
                            setRegistrationForm({
                              ...registrationForm,
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
                          value={registrationForm.motherName}
                          onChange={(e) =>
                            setRegistrationForm({
                              ...registrationForm,
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
                          value={registrationForm.dob}
                          onChange={(e) =>
                            setRegistrationForm({
                              ...registrationForm,
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
                          value={registrationForm.gender}
                          onValueChange={(value) =>
                            setRegistrationForm({
                              ...registrationForm,
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
                          value={registrationForm.category}
                          onValueChange={(value) =>
                            setRegistrationForm({
                              ...registrationForm,
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
                          value={registrationForm.maritalStatus}
                          onValueChange={(value) =>
                            setRegistrationForm({
                              ...registrationForm,
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
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nationality">Nationality *</Label>
                        <Input
                          id="nationality"
                          value={registrationForm.nationality}
                          onChange={(e) =>
                            setRegistrationForm({
                              ...registrationForm,
                              nationality: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fatherHusbandOccupation">
                          Father/Husband Occupation *
                        </Label>
                        <Input
                          id="fatherHusbandOccupation"
                          value={registrationForm.fatherHusbandOccupation}
                          onChange={(e) =>
                            setRegistrationForm({
                              ...registrationForm,
                              fatherHusbandOccupation: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Contact & Course Details */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Contact & Course Details
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contactNo">Contact Number *</Label>
                        <Input
                          id="contactNo"
                          value={registrationForm.contactNo}
                          onChange={(e) =>
                            setRegistrationForm({
                              ...registrationForm,
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
                          value={registrationForm.emailId}
                          onChange={(e) =>
                            setRegistrationForm({
                              ...registrationForm,
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
                          value={registrationForm.pppId}
                          onChange={(e) =>
                            setRegistrationForm({
                              ...registrationForm,
                              pppId: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="aadharNo">Aadhar Number *</Label>
                        <Input
                          id="aadharNo"
                          value={registrationForm.aadharNo}
                          onChange={(e) =>
                            setRegistrationForm({
                              ...registrationForm,
                              aadharNo: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fullAddress">Full Address *</Label>
                      <Textarea
                        id="fullAddress"
                        value={registrationForm.fullAddress}
                        onChange={(e) =>
                          setRegistrationForm({
                            ...registrationForm,
                            fullAddress: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="course">Course *</Label>
                        <Select
                          value={registrationForm.course}
                          onValueChange={(value) =>
                            setRegistrationForm({
                              ...registrationForm,
                              course: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select course" />
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
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="batch">Batch *</Label>
                        <Select
                          value={registrationForm.batch}
                          onValueChange={(value) =>
                            setRegistrationForm({
                              ...registrationForm,
                              batch: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select batch" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2024-A">2024-A</SelectItem>
                            <SelectItem value="2024-B">2024-B</SelectItem>
                            <SelectItem value="2024-C">2024-C</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Educational Qualifications & Documents */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Educational Qualifications & Documents
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-base">
                          Educational Qualifications
                        </Label>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={addQualification}
                        >
                          Add Qualification
                        </Button>
                      </div>

                      {qualifications.map((qualification, index) => (
                        <div
                          key={qualification.id}
                          className="border p-4 rounded-lg space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <Label>Qualification {index + 1}</Label>
                            {qualifications.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  removeQualification(qualification.id)
                                }
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                            <div className="space-y-2">
                              <Label>Exam Name</Label>
                              <Input
                                value={qualification.examName}
                                onChange={(e) =>
                                  updateQualification(
                                    qualification.id,
                                    "examName",
                                    e.target.value,
                                  )
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Roll Number</Label>
                              <Input
                                value={qualification.rollNo}
                                onChange={(e) =>
                                  updateQualification(
                                    qualification.id,
                                    "rollNo",
                                    e.target.value,
                                  )
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Passing Year</Label>
                              <Input
                                value={qualification.passingYear}
                                onChange={(e) =>
                                  updateQualification(
                                    qualification.id,
                                    "passingYear",
                                    e.target.value,
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-4 gap-3">
                            <div className="space-y-2">
                              <Label>Marks Obtained</Label>
                              <Input
                                type="number"
                                value={qualification.marksObtained}
                                onChange={(e) => {
                                  updateQualification(
                                    qualification.id,
                                    "marksObtained",
                                    e.target.value,
                                  );
                                  calculatePercentage(
                                    qualification.id,
                                    e.target.value,
                                    qualification.totalMarks,
                                  );
                                }}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Total Marks</Label>
                              <Input
                                type="number"
                                value={qualification.totalMarks}
                                onChange={(e) => {
                                  updateQualification(
                                    qualification.id,
                                    "totalMarks",
                                    e.target.value,
                                  );
                                  calculatePercentage(
                                    qualification.id,
                                    qualification.marksObtained,
                                    e.target.value,
                                  );
                                }}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Board/University</Label>
                              <Input
                                value={qualification.boardName}
                                onChange={(e) =>
                                  updateQualification(
                                    qualification.id,
                                    "boardName",
                                    e.target.value,
                                  )
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Percentage</Label>
                              <Input
                                value={qualification.percentage}
                                readOnly
                                className="bg-gray-50"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-base font-semibold">
                        Document Uploads
                      </h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="photo">
                            Photo <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="photo"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, "photo")}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signature">
                            Signature <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="signature"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, "signature")}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="thumbImage">
                            Thumb Image <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="thumbImage"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, "thumbImage")}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Declaration & Payment */}
                {currentStep === 4 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Declaration & Payment
                    </h3>
                    <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                      <h4 className="font-semibold mb-3">Self Declaration</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        I hereby declare that all the information provided by me
                        in this application form is true, complete, and accurate
                        to the best of my knowledge. I understand that any false
                        information or concealment of facts may lead to
                        rejection of my application or cancellation of
                        admission.
                      </p>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="selfDeclaration"
                          checked={registrationForm.selfDeclaration}
                          onCheckedChange={(checked) =>
                            setRegistrationForm({
                              ...registrationForm,
                              selfDeclaration: checked as boolean,
                            })
                          }
                        />
                        <Label htmlFor="selfDeclaration" className="text-sm">
                          I accept the above declaration
                          <span className="text-red-500 ml-1">*</span>
                        </Label>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-3">Payment Details</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Registration Fee:</span>
                          <span>₹500</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Processing Fee:</span>
                          <span>₹100</span>
                        </div>
                        <hr />
                        <div className="flex justify-between font-semibold">
                          <span>Total Amount:</span>
                          <span>₹600</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </Button>
                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsRegistrationDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    {currentStep < 4 ? (
                      <Button type="button" onClick={nextStep}>
                        Next
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={handleSubmitRegistration}
                        disabled={!registrationForm.selfDeclaration}
                      >
                        Submit & Pay
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
                <TableHead>Student Name</TableHead>
                <TableHead>Enrollment No</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Registration Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {registrations.map((registration) => (
                <TableRow key={registration.id}>
                  <TableCell className="font-medium">
                    {registration.studentName}
                  </TableCell>
                  <TableCell>{registration.enrollmentNo}</TableCell>
                  <TableCell>{registration.course}</TableCell>
                  <TableCell>{registration.batch}</TableCell>
                  <TableCell>{registration.contactNo}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        registration.paymentStatus === "paid"
                          ? "default"
                          : registration.paymentStatus === "pending"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {registration.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        registration.registrationStatus === "approved"
                          ? "default"
                          : registration.registrationStatus === "rejected"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {registration.registrationStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {registration.paymentStatus === "pending" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => processPayment(registration.id)}
                        >
                          <CreditCard className="h-4 w-4 mr-1" />
                          Pay
                        </Button>
                      )}
                      {registration.registrationStatus === "submitted" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => approveRegistration(registration.id)}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => rejectRegistration(registration.id)}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteRegistration(registration.id)}
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
