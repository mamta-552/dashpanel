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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Home,
  Info,
  Briefcase,
  Users,
  Plus,
  Edit,
  Upload,
  Image as ImageIcon,
  Save,
  Eye,
} from "lucide-react";
import { toast } from "sonner";

interface PageSection {
  id: string;
  title: string;
  content: string;
  image?: string;
  order: number;
}

interface TeamMember {
  id: string;
  name: string;
  designation: string;
  photo: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
}

interface Partner {
  id: string;
  name: string;
  description: string;
  logo: string;
  instituteInfo: string;
}

interface Recruiter {
  id: string;
  name: string;
  logo: string;
  description: string;
}

interface Slider {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  order: number;
}

interface CounterStats {
  totalStudents: number;
  passouts: number;
  scholarships: number;
  courses: number;
}

const mockHomeData = {
  logo: "/placeholder.svg",
  contactInfo: {
    phone: "+91 9876543210",
    email: "info@eduadmin.com",
    address: "123 Education Street, Learning City",
  },
  sliders: [
    {
      id: "1",
      image: "/placeholder.svg",
      title: "Welcome to EduAdmin",
      subtitle: "Empowering Education Through Technology",
      buttonText: "Get Started",
      buttonLink: "/courses",
      order: 1,
    },
    {
      id: "2",
      image: "/placeholder.svg",
      title: "Quality Education",
      subtitle: "Learn from Industry Experts",
      buttonText: "Explore Courses",
      buttonLink: "/courses",
      order: 2,
    },
  ] as Slider[],
  counter: {
    totalStudents: 10000,
    passouts: 8500,
    scholarships: 1200,
    courses: 45,
  } as CounterStats,
  socialLinks: {
    facebook: "https://facebook.com/eduadmin",
    twitter: "https://twitter.com/eduadmin",
    instagram: "https://instagram.com/eduadmin",
    linkedin: "https://linkedin.com/company/eduadmin",
  },
};

const mockAboutData = {
  directorMessage: {
    title: "Director's Message",
    image: "/placeholder.svg",
    content:
      "Welcome to our educational institution. We are committed to providing quality education...",
  },
  aboutUs: {
    title: "About Us",
    image: "/placeholder.svg",
    content:
      "Our institution has been at the forefront of educational excellence for over two decades...",
  },
  mission: {
    title: "Our Mission",
    image: "/placeholder.svg",
    content:
      "To provide world-class education and create future leaders who will contribute to society...",
  },
  vision: {
    title: "Our Vision",
    image: "/placeholder.svg",
    content:
      "To be the leading educational institution that transforms lives through innovative learning...",
  },
};

const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    designation: "Director",
    photo: "/placeholder.svg",
    socialLinks: {
      linkedin: "https://linkedin.com/in/sarah-johnson",
      twitter: "https://twitter.com/sarahjohnson",
    },
  },
  {
    id: "2",
    name: "Prof. Mike Chen",
    designation: "Academic Head",
    photo: "/placeholder.svg",
    socialLinks: {
      linkedin: "https://linkedin.com/in/mike-chen",
    },
  },
];

const mockPartners: Partner[] = [
  {
    id: "1",
    name: "Tech Corp",
    description: "Leading technology company",
    logo: "/placeholder.svg",
    instituteInfo: "Partnership since 2020",
  },
  {
    id: "2",
    name: "EduTech Solutions",
    description: "Educational technology provider",
    logo: "/placeholder.svg",
    instituteInfo: "Curriculum partner",
  },
];

const mockRecruiters: Recruiter[] = [
  {
    id: "1",
    name: "Google",
    logo: "/placeholder.svg",
    description: "Top technology recruiter",
  },
  {
    id: "2",
    name: "Microsoft",
    logo: "/placeholder.svg",
    description: "Leading software company",
  },
];

export default function PageManagement() {
  const [activeTab, setActiveTab] = useState("home");
  const [homeData, setHomeData] = useState(mockHomeData);
  const [aboutData, setAboutData] = useState(mockAboutData);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [partners, setPartners] = useState<Partner[]>(mockPartners);
  const [recruiters, setRecruiters] = useState<Recruiter[]>(mockRecruiters);
  const [isSliderDialogOpen, setIsSliderDialogOpen] = useState(false);
  const [isTeamDialogOpen, setIsTeamDialogOpen] = useState(false);
  const [isPartnerDialogOpen, setIsPartnerDialogOpen] = useState(false);
  const [isRecruiterDialogOpen, setIsRecruiterDialogOpen] = useState(false);

  const [sliderForm, setSliderForm] = useState({
    title: "",
    subtitle: "",
    buttonText: "",
    buttonLink: "",
  });

  const [teamForm, setTeamForm] = useState({
    name: "",
    designation: "",
    linkedin: "",
    twitter: "",
    facebook: "",
  });

  const [partnerForm, setPartnerForm] = useState({
    name: "",
    description: "",
    instituteInfo: "",
  });

  const [recruiterForm, setRecruiterForm] = useState({
    name: "",
    description: "",
  });

  const [footerContent, setFooterContent] = useState({
    description:
      "EduAdmin is a leading educational institution committed to excellence in learning and innovation.",
    copyright: "© 2024 EduAdmin. All rights reserved.",
    privacyPolicy:
      "Your privacy is important to us. This policy explains how we collect and use your information.",
    termsConditions:
      "By using our services, you agree to these terms and conditions.",
  });

  const updateCounterStats = (field: keyof CounterStats, value: number) => {
    setHomeData({
      ...homeData,
      counter: {
        ...homeData.counter,
        [field]: value,
      },
    });
    toast.success("Counter updated successfully");
  };

  const updateAboutSection = (
    section: keyof typeof aboutData,
    field: string,
    value: string,
  ) => {
    setAboutData({
      ...aboutData,
      [section]: {
        ...aboutData[section],
        [field]: value,
      },
    });
    toast.success("About section updated successfully");
  };

  const addSlider = () => {
    const newSlider: Slider = {
      id: Date.now().toString(),
      ...sliderForm,
      image: "/placeholder.svg",
      order: homeData.sliders.length + 1,
    };
    setHomeData({
      ...homeData,
      sliders: [...homeData.sliders, newSlider],
    });
    setSliderForm({ title: "", subtitle: "", buttonText: "", buttonLink: "" });
    setIsSliderDialogOpen(false);
    toast.success("Slider added successfully");
  };

  const addTeamMember = () => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: teamForm.name,
      designation: teamForm.designation,
      photo: "/placeholder.svg",
      socialLinks: {
        linkedin: teamForm.linkedin,
        twitter: teamForm.twitter,
        facebook: teamForm.facebook,
      },
    };
    setTeamMembers([...teamMembers, newMember]);
    setTeamForm({
      name: "",
      designation: "",
      linkedin: "",
      twitter: "",
      facebook: "",
    });
    setIsTeamDialogOpen(false);
    toast.success("Team member added successfully");
  };

  const addPartner = () => {
    const newPartner: Partner = {
      id: Date.now().toString(),
      ...partnerForm,
      logo: "/placeholder.svg",
    };
    setPartners([...partners, newPartner]);
    setPartnerForm({ name: "", description: "", instituteInfo: "" });
    setIsPartnerDialogOpen(false);
    toast.success("Partner added successfully");
  };

  const addRecruiter = () => {
    const newRecruiter: Recruiter = {
      id: Date.now().toString(),
      ...recruiterForm,
      logo: "/placeholder.svg",
    };
    setRecruiters([...recruiters, newRecruiter]);
    setRecruiterForm({ name: "", description: "" });
    setIsRecruiterDialogOpen(false);
    toast.success("Recruiter added successfully");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Page Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage website pages and content
          </p>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="home">Home Page</TabsTrigger>
          <TabsTrigger value="about">About Us</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
        </TabsList>

        {/* Home Page Tab */}
        <TabsContent value="home">
          <div className="space-y-6">
            {/* Header Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Home className="h-5 w-5" />
                  <span>Header Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Logo</Label>
                    <div className="flex items-center space-x-4">
                      <img
                        src={homeData.logo}
                        alt="Logo"
                        className="w-16 h-16 object-contain border rounded"
                      />
                      <Button variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Logo
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={homeData.contactInfo.phone}
                      onChange={(e) =>
                        setHomeData({
                          ...homeData,
                          contactInfo: {
                            ...homeData.contactInfo,
                            phone: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={homeData.contactInfo.email}
                      onChange={(e) =>
                        setHomeData({
                          ...homeData,
                          contactInfo: {
                            ...homeData.contactInfo,
                            email: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={homeData.contactInfo.address}
                      onChange={(e) =>
                        setHomeData({
                          ...homeData,
                          contactInfo: {
                            ...homeData.contactInfo,
                            address: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Header Settings
                </Button>
              </CardContent>
            </Card>

            {/* Sliders Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Hero Sliders</CardTitle>
                <Dialog
                  open={isSliderDialogOpen}
                  onOpenChange={setIsSliderDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Slider
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Slider</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="sliderTitle">Title</Label>
                        <Input
                          id="sliderTitle"
                          value={sliderForm.title}
                          onChange={(e) =>
                            setSliderForm({
                              ...sliderForm,
                              title: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sliderSubtitle">Subtitle</Label>
                        <Input
                          id="sliderSubtitle"
                          value={sliderForm.subtitle}
                          onChange={(e) =>
                            setSliderForm({
                              ...sliderForm,
                              subtitle: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="buttonText">Button Text</Label>
                        <Input
                          id="buttonText"
                          value={sliderForm.buttonText}
                          onChange={(e) =>
                            setSliderForm({
                              ...sliderForm,
                              buttonText: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="buttonLink">Button Link</Label>
                        <Input
                          id="buttonLink"
                          value={sliderForm.buttonLink}
                          onChange={(e) =>
                            setSliderForm({
                              ...sliderForm,
                              buttonLink: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Slider Image</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                          <ImageIcon className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                          <p className="text-sm text-gray-500">
                            Upload slider image
                          </p>
                          <Button variant="outline" size="sm" className="mt-2">
                            Choose Image
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsSliderDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={addSlider}>Add Slider</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {homeData.sliders.map((slider) => (
                    <Card key={slider.id}>
                      <CardContent className="p-4">
                        <img
                          src={slider.image}
                          alt={slider.title}
                          className="w-full h-32 object-cover rounded mb-4"
                        />
                        <h3 className="font-semibold">{slider.title}</h3>
                        <p className="text-sm text-gray-500 mb-2">
                          {slider.subtitle}
                        </p>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Counter Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Counter Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="totalStudents">Total Students</Label>
                    <Input
                      id="totalStudents"
                      type="number"
                      value={homeData.counter.totalStudents}
                      onChange={(e) =>
                        updateCounterStats(
                          "totalStudents",
                          parseInt(e.target.value),
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passouts">Passouts</Label>
                    <Input
                      id="passouts"
                      type="number"
                      value={homeData.counter.passouts}
                      onChange={(e) =>
                        updateCounterStats("passouts", parseInt(e.target.value))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="scholarships">Scholarships</Label>
                    <Input
                      id="scholarships"
                      type="number"
                      value={homeData.counter.scholarships}
                      onChange={(e) =>
                        updateCounterStats(
                          "scholarships",
                          parseInt(e.target.value),
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="courses">Total Courses</Label>
                    <Input
                      id="courses"
                      type="number"
                      value={homeData.counter.courses}
                      onChange={(e) =>
                        updateCounterStats("courses", parseInt(e.target.value))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Meet Our Team</CardTitle>
                <Dialog
                  open={isTeamDialogOpen}
                  onOpenChange={setIsTeamDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Team Member
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Team Member</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="memberName">Name</Label>
                        <Input
                          id="memberName"
                          value={teamForm.name}
                          onChange={(e) =>
                            setTeamForm({ ...teamForm, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="designation">Designation</Label>
                        <Input
                          id="designation"
                          value={teamForm.designation}
                          onChange={(e) =>
                            setTeamForm({
                              ...teamForm,
                              designation: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn URL</Label>
                        <Input
                          id="linkedin"
                          value={teamForm.linkedin}
                          onChange={(e) =>
                            setTeamForm({
                              ...teamForm,
                              linkedin: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="twitter">Twitter URL</Label>
                        <Input
                          id="twitter"
                          value={teamForm.twitter}
                          onChange={(e) =>
                            setTeamForm({
                              ...teamForm,
                              twitter: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Photo</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                          <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                          <p className="text-sm text-gray-500">
                            Upload member photo
                          </p>
                          <Button variant="outline" size="sm" className="mt-2">
                            Choose Photo
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsTeamDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={addTeamMember}>Add Member</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {teamMembers.map((member) => (
                    <Card key={member.id}>
                      <CardContent className="p-4 text-center">
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="w-20 h-20 rounded-full mx-auto mb-4"
                        />
                        <h3 className="font-semibold">{member.name}</h3>
                        <p className="text-sm text-gray-500 mb-2">
                          {member.designation}
                        </p>
                        <div className="flex justify-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Partners Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Our Partners</CardTitle>
                <Dialog
                  open={isPartnerDialogOpen}
                  onOpenChange={setIsPartnerDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Partner
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Partner</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="partnerName">Partner Name</Label>
                        <Input
                          id="partnerName"
                          value={partnerForm.name}
                          onChange={(e) =>
                            setPartnerForm({
                              ...partnerForm,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="partnerDescription">Description</Label>
                        <Textarea
                          id="partnerDescription"
                          value={partnerForm.description}
                          onChange={(e) =>
                            setPartnerForm({
                              ...partnerForm,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="instituteInfo">
                          Institute Information
                        </Label>
                        <Input
                          id="instituteInfo"
                          value={partnerForm.instituteInfo}
                          onChange={(e) =>
                            setPartnerForm({
                              ...partnerForm,
                              instituteInfo: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Partner Logo</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                          <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                          <p className="text-sm text-gray-500">
                            Upload partner logo
                          </p>
                          <Button variant="outline" size="sm" className="mt-2">
                            Choose Logo
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsPartnerDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={addPartner}>Add Partner</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {partners.map((partner) => (
                    <Card key={partner.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4 mb-4">
                          <img
                            src={partner.logo}
                            alt={partner.name}
                            className="w-16 h-16 object-contain"
                          />
                          <div>
                            <h3 className="font-semibold">{partner.name}</h3>
                            <p className="text-sm text-gray-500">
                              {partner.instituteInfo}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm mb-4">{partner.description}</p>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Prime Recruiters */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Prime Recruiters</CardTitle>
                <Dialog
                  open={isRecruiterDialogOpen}
                  onOpenChange={setIsRecruiterDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Recruiter
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Prime Recruiter</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="recruiterName">Company Name</Label>
                        <Input
                          id="recruiterName"
                          value={recruiterForm.name}
                          onChange={(e) =>
                            setRecruiterForm({
                              ...recruiterForm,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="recruiterDescription">
                          Description
                        </Label>
                        <Textarea
                          id="recruiterDescription"
                          value={recruiterForm.description}
                          onChange={(e) =>
                            setRecruiterForm({
                              ...recruiterForm,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Company Logo</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                          <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                          <p className="text-sm text-gray-500">
                            Upload company logo
                          </p>
                          <Button variant="outline" size="sm" className="mt-2">
                            Choose Logo
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsRecruiterDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={addRecruiter}>Add Recruiter</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {recruiters.map((recruiter) => (
                    <Card key={recruiter.id}>
                      <CardContent className="p-4 text-center">
                        <img
                          src={recruiter.logo}
                          alt={recruiter.name}
                          className="w-16 h-16 object-contain mx-auto mb-4"
                        />
                        <h3 className="font-semibold">{recruiter.name}</h3>
                        <p className="text-sm text-gray-500 mb-2">
                          {recruiter.description}
                        </p>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* About Us Tab */}
        <TabsContent value="about">
          <div className="space-y-6">
            {Object.entries(aboutData).map(([key, section]) => (
              <Card key={key}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Info className="h-5 w-5" />
                    <span>{section.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`${key}-title`}>Title</Label>
                      <Input
                        id={`${key}-title`}
                        value={section.title}
                        onChange={(e) =>
                          updateAboutSection(
                            key as keyof typeof aboutData,
                            "title",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Image</Label>
                      <div className="flex items-center space-x-4">
                        <img
                          src={section.image}
                          alt={section.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <Button variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Image
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`${key}-content`}>Content</Label>
                    <Textarea
                      id={`${key}-content`}
                      value={section.content}
                      onChange={(e) =>
                        updateAboutSection(
                          key as keyof typeof aboutData,
                          "content",
                          e.target.value,
                        )
                      }
                      rows={4}
                    />
                  </div>
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save {section.title}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5" />
                <span>Services Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Briefcase className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">
                  Services Management
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Manage your educational services, courses, and offerings from
                  the dedicated Services Management section.
                </p>
                <Button
                  onClick={() => window.open("/admin/services", "_blank")}
                  className="mt-4"
                >
                  <Briefcase className="h-4 w-4 mr-2" />
                  Go to Services Management
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Footer Tab */}
        <TabsContent value="footer">
          <Card>
            <CardHeader>
              <CardTitle>Footer Content Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="footerDescription">Footer Description</Label>
                <Textarea
                  id="footerDescription"
                  value={footerContent.description}
                  onChange={(e) =>
                    setFooterContent({
                      ...footerContent,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="copyright">Copyright Text</Label>
                <Input
                  id="copyright"
                  value={footerContent.copyright}
                  onChange={(e) =>
                    setFooterContent({
                      ...footerContent,
                      copyright: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="privacyPolicy">Privacy Policy</Label>
                <Textarea
                  id="privacyPolicy"
                  value={footerContent.privacyPolicy}
                  onChange={(e) =>
                    setFooterContent({
                      ...footerContent,
                      privacyPolicy: e.target.value,
                    })
                  }
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="termsConditions">Terms & Conditions</Label>
                <Textarea
                  id="termsConditions"
                  value={footerContent.termsConditions}
                  onChange={(e) =>
                    setFooterContent({
                      ...footerContent,
                      termsConditions: e.target.value,
                    })
                  }
                  rows={4}
                />
              </div>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Footer Content
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
