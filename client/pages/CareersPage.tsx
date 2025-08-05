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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap as UserGraduationCap,
  Plus,
  Edit,
  Save,
  Trash2,
  MapPin,
  Clock,
  DollarSign,
} from "lucide-react";
import { toast } from "sonner";

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "internship";
  salaryRange: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  postedDate: string;
  deadline: string;
  status: "active" | "inactive" | "closed";
}

interface CareerBenefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const mockJobPostings: JobPosting[] = [
  {
    id: "1",
    title: "Senior Software Developer",
    department: "Technology",
    location: "New Delhi",
    type: "full-time",
    salaryRange: "₹8-12 LPA",
    description:
      "We are looking for an experienced software developer to join our technology team.",
    requirements: ["5+ years experience", "React.js", "Node.js", "TypeScript"],
    responsibilities: [
      "Develop applications",
      "Code reviews",
      "Mentoring junior developers",
    ],
    postedDate: "2024-01-15",
    deadline: "2024-02-15",
    status: "active",
  },
  {
    id: "2",
    title: "Academic Coordinator",
    department: "Academic",
    location: "Mumbai",
    type: "full-time",
    salaryRange: "₹5-8 LPA",
    description: "Coordinate academic activities and support faculty members.",
    requirements: [
      "Masters degree",
      "5+ years in education",
      "Leadership skills",
    ],
    responsibilities: [
      "Coordinate curriculum",
      "Faculty support",
      "Student guidance",
    ],
    postedDate: "2024-01-10",
    deadline: "2024-02-10",
    status: "active",
  },
];

const mockBenefits: CareerBenefit[] = [
  {
    id: "1",
    title: "Health Insurance",
    description: "Comprehensive health coverage for you and your family",
    icon: "🏥",
  },
  {
    id: "2",
    title: "Flexible Working",
    description: "Work-life balance with flexible hours and remote options",
    icon: "⏰",
  },
  {
    id: "3",
    title: "Professional Development",
    description: "Continuous learning opportunities and skill development",
    icon: "📚",
  },
];

export default function CareersPage() {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>(mockJobPostings);
  const [benefits, setBenefits] = useState<CareerBenefit[]>(mockBenefits);
  const [isJobDialogOpen, setIsJobDialogOpen] = useState(false);
  const [isBenefitDialogOpen, setIsBenefitDialogOpen] = useState(false);

  const [jobForm, setJobForm] = useState({
    title: "",
    department: "",
    location: "",
    type: "full-time" as JobPosting["type"],
    salaryRange: "",
    description: "",
    requirements: "",
    responsibilities: "",
    deadline: "",
  });

  const [benefitForm, setBenefitForm] = useState({
    title: "",
    description: "",
    icon: "",
  });

  const [careerContent, setCareerContent] = useState({
    pageTitle: "Join Our Team",
    pageDescription:
      "Build your career with us and make a difference in education.",
    whyJoinUs:
      "We offer a dynamic work environment where innovation thrives and every team member contributes to shaping the future of education.",
  });

  const addJobPosting = () => {
    const newJob: JobPosting = {
      id: Date.now().toString(),
      ...jobForm,
      requirements: jobForm.requirements.split(",").map((r) => r.trim()),
      responsibilities: jobForm.responsibilities
        .split(",")
        .map((r) => r.trim()),
      postedDate: new Date().toISOString().split("T")[0],
      status: "active",
    };
    setJobPostings([...jobPostings, newJob]);
    setJobForm({
      title: "",
      department: "",
      location: "",
      type: "full-time",
      salaryRange: "",
      description: "",
      requirements: "",
      responsibilities: "",
      deadline: "",
    });
    setIsJobDialogOpen(false);
    toast.success("Job posting added successfully");
  };

  const addBenefit = () => {
    const newBenefit: CareerBenefit = {
      id: Date.now().toString(),
      ...benefitForm,
    };
    setBenefits([...benefits, newBenefit]);
    setBenefitForm({ title: "", description: "", icon: "" });
    setIsBenefitDialogOpen(false);
    toast.success("Benefit added successfully");
  };

  const removeJobPosting = (jobId: string) => {
    setJobPostings(jobPostings.filter((job) => job.id !== jobId));
    toast.success("Job posting removed successfully");
  };

  const removeBenefit = (benefitId: string) => {
    setBenefits(benefits.filter((benefit) => benefit.id !== benefitId));
    toast.success("Benefit removed successfully");
  };

  const updateJobStatus = (jobId: string, status: JobPosting["status"]) => {
    setJobPostings(
      jobPostings.map((job) => (job.id === jobId ? { ...job, status } : job)),
    );
    toast.success("Job status updated successfully");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Careers Page Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage job postings, benefits, and career page content
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Page Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <UserGraduationCap className="h-5 w-5" />
              <span>Page Content</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pageTitle">Page Title</Label>
              <Input
                id="pageTitle"
                value={careerContent.pageTitle}
                onChange={(e) =>
                  setCareerContent({
                    ...careerContent,
                    pageTitle: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pageDescription">Page Description</Label>
              <Textarea
                id="pageDescription"
                value={careerContent.pageDescription}
                onChange={(e) =>
                  setCareerContent({
                    ...careerContent,
                    pageDescription: e.target.value,
                  })
                }
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whyJoinUs">Why Join Us</Label>
              <Textarea
                id="whyJoinUs"
                value={careerContent.whyJoinUs}
                onChange={(e) =>
                  setCareerContent({
                    ...careerContent,
                    whyJoinUs: e.target.value,
                  })
                }
                rows={4}
              />
            </div>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Page Content
            </Button>
          </CardContent>
        </Card>

        {/* Job Postings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Job Postings</CardTitle>
            <Dialog open={isJobDialogOpen} onOpenChange={setIsJobDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Job Posting
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Job Posting</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <Input
                        id="jobTitle"
                        value={jobForm.title}
                        onChange={(e) =>
                          setJobForm({ ...jobForm, title: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        value={jobForm.department}
                        onChange={(e) =>
                          setJobForm({ ...jobForm, department: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={jobForm.location}
                        onChange={(e) =>
                          setJobForm({ ...jobForm, location: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="jobType">Job Type</Label>
                      <Select
                        value={jobForm.type}
                        onValueChange={(value: JobPosting["type"]) =>
                          setJobForm({ ...jobForm, type: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">Full Time</SelectItem>
                          <SelectItem value="part-time">Part Time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="salaryRange">Salary Range</Label>
                      <Input
                        id="salaryRange"
                        value={jobForm.salaryRange}
                        onChange={(e) =>
                          setJobForm({
                            ...jobForm,
                            salaryRange: e.target.value,
                          })
                        }
                        placeholder="e.g., ₹5-8 LPA"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deadline">Application Deadline</Label>
                      <Input
                        id="deadline"
                        type="date"
                        value={jobForm.deadline}
                        onChange={(e) =>
                          setJobForm({ ...jobForm, deadline: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Job Description</Label>
                    <Textarea
                      id="description"
                      value={jobForm.description}
                      onChange={(e) =>
                        setJobForm({ ...jobForm, description: e.target.value })
                      }
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="requirements">
                      Requirements (comma separated)
                    </Label>
                    <Textarea
                      id="requirements"
                      value={jobForm.requirements}
                      onChange={(e) =>
                        setJobForm({ ...jobForm, requirements: e.target.value })
                      }
                      rows={2}
                      placeholder="e.g., 5+ years experience, React.js, Node.js"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="responsibilities">
                      Responsibilities (comma separated)
                    </Label>
                    <Textarea
                      id="responsibilities"
                      value={jobForm.responsibilities}
                      onChange={(e) =>
                        setJobForm({
                          ...jobForm,
                          responsibilities: e.target.value,
                        })
                      }
                      rows={2}
                      placeholder="e.g., Develop applications, Code reviews"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsJobDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={addJobPosting}>Add Job Posting</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {jobPostings.map((job) => (
                <Card key={job.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{job.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {job.department} • {job.location}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            job.status === "active" ? "default" : "secondary"
                          }
                        >
                          {job.status}
                        </Badge>
                        <Select
                          value={job.status}
                          onValueChange={(value: JobPosting["status"]) =>
                            updateJobStatus(job.id, value)
                          }
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-4 w-4" />
                        <span>{job.salaryRange}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>Deadline: {job.deadline}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {job.description}
                    </p>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeJobPosting(job.id)}
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Benefits Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Career Benefits</CardTitle>
            <Dialog
              open={isBenefitDialogOpen}
              onOpenChange={setIsBenefitDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Benefit
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Benefit</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="benefitTitle">Benefit Title</Label>
                    <Input
                      id="benefitTitle"
                      value={benefitForm.title}
                      onChange={(e) =>
                        setBenefitForm({
                          ...benefitForm,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="benefitIcon">Icon (emoji or text)</Label>
                    <Input
                      id="benefitIcon"
                      value={benefitForm.icon}
                      onChange={(e) =>
                        setBenefitForm({ ...benefitForm, icon: e.target.value })
                      }
                      placeholder="e.g., 🏥 or 💼"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="benefitDescription">Description</Label>
                    <Textarea
                      id="benefitDescription"
                      value={benefitForm.description}
                      onChange={(e) =>
                        setBenefitForm({
                          ...benefitForm,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsBenefitDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={addBenefit}>Add Benefit</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {benefits.map((benefit) => (
                <Card key={benefit.id} className="border">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl mb-3">{benefit.icon}</div>
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {benefit.description}
                    </p>
                    <div className="flex justify-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeBenefit(benefit.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
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
