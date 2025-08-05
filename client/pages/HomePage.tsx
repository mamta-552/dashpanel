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
  Home,
  Plus,
  Edit,
  Upload,
  Save,
  Trash2,
  Star,
  Award,
  Building,
  Users,
} from "lucide-react";
import { toast } from "sonner";

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

interface FeaturedCourse {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  price: string;
  image: string;
  rating: number;
  studentsEnrolled: number;
}

interface TeamMember {
  id: string;
  name: string;
  designation: string;
  photo: string;
  experience: string;
  specialization: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}

interface Partner {
  id: string;
  name: string;
  logo: string;
  description: string;
  type: "education" | "technology" | "corporate";
}

interface Recruiter {
  id: string;
  companyName: string;
  logo: string;
  description: string;
  averagePackage: string;
  hiringCount: number;
}

interface PlacementHighlight {
  id: string;
  title: string;
  description: string;
  icon: string;
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
  ] as Slider[],
  counter: {
    totalStudents: 3248,
    passouts: 2150,
    scholarships: 185,
    courses: 45,
  } as CounterStats,
};

const mockFeaturedCourses: FeaturedCourse[] = [
  {
    id: "1",
    title: "Full Stack Web Development",
    description: "Complete web development course with modern technologies",
    instructor: "John Doe",
    duration: "6 months",
    price: "₹25,000",
    image: "/placeholder.svg",
    rating: 4.8,
    studentsEnrolled: 1250,
  },
  {
    id: "2",
    title: "Data Science & AI",
    description:
      "Comprehensive data science and artificial intelligence course",
    instructor: "Jane Smith",
    duration: "8 months",
    price: "₹35,000",
    image: "/placeholder.svg",
    rating: 4.9,
    studentsEnrolled: 850,
  },
];

const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Dr. Rajesh Kumar",
    designation: "Director & CEO",
    photo: "/placeholder.svg",
    experience: "15+ years",
    specialization: "Educational Leadership",
    socialLinks: {
      instagram: "https://instagram.com/rajeshkumar",
      facebook: "https://facebook.com/rajeshkumar",
      twitter: "https://twitter.com/rajeshkumar",
    },
  },
  {
    id: "2",
    name: "Prof. Priya Sharma",
    designation: "Academic Head",
    photo: "/placeholder.svg",
    experience: "12+ years",
    specialization: "Computer Science",
    socialLinks: {
      instagram: "https://instagram.com/priyasharma",
      facebook: "https://facebook.com/priyasharma",
      twitter: "https://twitter.com/priyasharma",
    },
  },
];

const mockPartners: Partner[] = [
  {
    id: "1",
    name: "Tech Mahindra",
    logo: "/placeholder.svg",
    description: "Leading technology partner",
    type: "technology",
  },
  {
    id: "2",
    name: "IIT Delhi",
    logo: "/placeholder.svg",
    description: "Academic collaboration partner",
    type: "education",
  },
];

const mockRecruiters: Recruiter[] = [
  {
    id: "1",
    companyName: "Google",
    logo: "/placeholder.svg",
    description: "Top technology recruiter",
    averagePackage: "₹25 LPA",
    hiringCount: 45,
  },
  {
    id: "2",
    companyName: "Microsoft",
    logo: "/placeholder.svg",
    description: "Leading software company",
    averagePackage: "₹22 LPA",
    hiringCount: 38,
  },
];

const mockPlacementHighlights: PlacementHighlight[] = [
  {
    id: "1",
    title: "Best in Class Curriculum",
    description: "Industry-aligned curriculum designed by experts",
    icon: "📚",
  },
  {
    id: "2",
    title: "Placement Assistance",
    description: "Dedicated placement support and career guidance",
    icon: "💼",
  },
  {
    id: "3",
    title: "Online Learning",
    description: "Flexible online learning with live interactive sessions",
    icon: "💻",
  },
];

export default function HomePage() {
  const [homeData, setHomeData] = useState(mockHomeData);
  const [featuredCourses, setFeaturedCourses] =
    useState<FeaturedCourse[]>(mockFeaturedCourses);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [partners, setPartners] = useState<Partner[]>(mockPartners);
  const [recruiters, setRecruiters] = useState<Recruiter[]>(mockRecruiters);
  const [placementHighlights, setPlacementHighlights] = useState<
    PlacementHighlight[]
  >(mockPlacementHighlights);

  const [isSliderDialogOpen, setIsSliderDialogOpen] = useState(false);
  const [isCourseDialogOpen, setIsCourseDialogOpen] = useState(false);
  const [isTeamDialogOpen, setIsTeamDialogOpen] = useState(false);
  const [isPartnerDialogOpen, setIsPartnerDialogOpen] = useState(false);
  const [isRecruiterDialogOpen, setIsRecruiterDialogOpen] = useState(false);

  const [sliderForm, setSliderForm] = useState({
    title: "",
    subtitle: "",
    buttonText: "",
    buttonLink: "",
  });

  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    instructor: "",
    duration: "",
    price: "",
  });

  const [teamForm, setTeamForm] = useState({
    name: "",
    designation: "",
    experience: "",
    specialization: "",
    instagram: "",
    facebook: "",
    twitter: "",
  });

  const [partnerForm, setPartnerForm] = useState({
    name: "",
    description: "",
    type: "technology" as Partner["type"],
  });

  const [recruiterForm, setRecruiterForm] = useState({
    companyName: "",
    description: "",
    averagePackage: "",
    hiringCount: 0,
  });

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

  const updateCounterStats = (key: keyof CounterStats, value: number) => {
    setHomeData({
      ...homeData,
      counter: {
        ...homeData.counter,
        [key]: value,
      },
    });
  };

  const removeSlider = (sliderId: string) => {
    setHomeData({
      ...homeData,
      sliders: homeData.sliders.filter((slider) => slider.id !== sliderId),
    });
    toast.success("Slider removed successfully");
  };

  const addFeaturedCourse = () => {
    const newCourse: FeaturedCourse = {
      id: Date.now().toString(),
      ...courseForm,
      image: "/placeholder.svg",
      rating: 0,
      studentsEnrolled: 0,
    };
    setFeaturedCourses([...featuredCourses, newCourse]);
    setCourseForm({
      title: "",
      description: "",
      instructor: "",
      duration: "",
      price: "",
    });
    setIsCourseDialogOpen(false);
    toast.success("Featured course added successfully");
  };

  const addTeamMember = () => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: teamForm.name,
      designation: teamForm.designation,
      experience: teamForm.experience,
      specialization: teamForm.specialization,
      photo: "/placeholder.svg",
      socialLinks: {
        instagram: teamForm.instagram,
        facebook: teamForm.facebook,
        twitter: teamForm.twitter,
      },
    };
    setTeamMembers([...teamMembers, newMember]);
    setTeamForm({
      name: "",
      designation: "",
      experience: "",
      specialization: "",
      instagram: "",
      facebook: "",
      twitter: "",
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
    setPartnerForm({
      name: "",
      description: "",
      type: "technology",
    });
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
    setRecruiterForm({
      companyName: "",
      description: "",
      averagePackage: "",
      hiringCount: 0,
    });
    setIsRecruiterDialogOpen(false);
    toast.success("Recruiter added successfully");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Home Page Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage home page content, sliders, and statistics
          </p>
        </div>
      </div>

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
                        setSliderForm({ ...sliderForm, title: e.target.value })
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
                    <Label>Background Image</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {homeData.sliders.map((slider) => (
                <Card key={slider.id} className="border">
                  <CardContent className="p-4">
                    <img
                      src={slider.image}
                      alt={slider.title}
                      className="w-full h-32 object-cover rounded mb-3"
                    />
                    <h3 className="font-semibold text-lg mb-1">
                      {slider.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {slider.subtitle}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        Button: {slider.buttonText}
                      </span>
                      <div className="flex space-x-1">
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeSlider(slider.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Counter Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Counter Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                    updateCounterStats("scholarships", parseInt(e.target.value))
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
            <Button className="mt-4">
              <Save className="h-4 w-4 mr-2" />
              Save Statistics
            </Button>
          </CardContent>
        </Card>

        {/* Featured Courses Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5" />
              <span>Featured Courses</span>
            </CardTitle>
            <Dialog
              open={isCourseDialogOpen}
              onOpenChange={setIsCourseDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Featured Course
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Featured Course</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="courseTitle">Course Title</Label>
                    <Input
                      id="courseTitle"
                      value={courseForm.title}
                      onChange={(e) =>
                        setCourseForm({ ...courseForm, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="courseDescription">Description</Label>
                    <Textarea
                      id="courseDescription"
                      value={courseForm.description}
                      onChange={(e) =>
                        setCourseForm({
                          ...courseForm,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="instructor">Instructor</Label>
                      <Input
                        id="instructor"
                        value={courseForm.instructor}
                        onChange={(e) =>
                          setCourseForm({
                            ...courseForm,
                            instructor: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Input
                        id="duration"
                        value={courseForm.duration}
                        onChange={(e) =>
                          setCourseForm({
                            ...courseForm,
                            duration: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      value={courseForm.price}
                      onChange={(e) =>
                        setCourseForm({ ...courseForm, price: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsCourseDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={addFeaturedCourse}>Add Course</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featuredCourses.map((course) => (
                <Card key={course.id} className="border">
                  <CardContent className="p-4">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-32 object-cover rounded mb-3"
                    />
                    <h3 className="font-semibold text-lg mb-1">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {course.description}
                    </p>
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span>Instructor: {course.instructor}</span>
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-primary">
                        {course.price}
                      </span>
                      <div className="flex space-x-1">
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Our Team Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Our Team</span>
            </CardTitle>
            <Dialog open={isTeamDialogOpen} onOpenChange={setIsTeamDialogOpen}>
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
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="experience">Experience</Label>
                      <Input
                        id="experience"
                        value={teamForm.experience}
                        onChange={(e) =>
                          setTeamForm({
                            ...teamForm,
                            experience: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialization">Specialization</Label>
                      <Input
                        id="specialization"
                        value={teamForm.specialization}
                        onChange={(e) =>
                          setTeamForm({
                            ...teamForm,
                            specialization: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Social Media Links</Label>
                    <div className="grid grid-cols-1 gap-2">
                      <Input
                        placeholder="Instagram URL"
                        value={teamForm.instagram}
                        onChange={(e) =>
                          setTeamForm({
                            ...teamForm,
                            instagram: e.target.value,
                          })
                        }
                      />
                      <Input
                        placeholder="Facebook URL"
                        value={teamForm.facebook}
                        onChange={(e) =>
                          setTeamForm({ ...teamForm, facebook: e.target.value })
                        }
                      />
                      <Input
                        placeholder="Twitter URL"
                        value={teamForm.twitter}
                        onChange={(e) =>
                          setTeamForm({ ...teamForm, twitter: e.target.value })
                        }
                      />
                    </div>
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
                    <p className="text-sm text-gray-500 mb-1">
                      {member.designation}
                    </p>
                    <p className="text-xs text-gray-500 mb-1">
                      {member.experience}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                      {member.specialization}
                    </p>
                    <div className="flex justify-center space-x-2 mb-3">
                      {member.socialLinks.instagram && (
                        <a
                          href={member.socialLinks.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-pink-500 hover:text-pink-600"
                        >
                          📷
                        </a>
                      )}
                      {member.socialLinks.facebook && (
                        <a
                          href={member.socialLinks.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          📘
                        </a>
                      )}
                      {member.socialLinks.twitter && (
                        <a
                          href={member.socialLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-500"
                        >
                          🐦
                        </a>
                      )}
                    </div>
                    <div className="flex justify-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
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

        {/* Our Partners Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Building className="h-5 w-5" />
              <span>Our Partners</span>
            </CardTitle>
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
                        setPartnerForm({ ...partnerForm, name: e.target.value })
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
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="partnerType">Partner Type</Label>
                    <select
                      id="partnerType"
                      value={partnerForm.type}
                      onChange={(e) =>
                        setPartnerForm({
                          ...partnerForm,
                          type: e.target.value as Partner["type"],
                        })
                      }
                      className="w-full p-2 border rounded"
                    >
                      <option value="technology">Technology</option>
                      <option value="education">Education</option>
                      <option value="corporate">Corporate</option>
                    </select>
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {partners.map((partner) => (
                <Card key={partner.id} className="border">
                  <CardContent className="p-4 text-center">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-16 h-16 mx-auto mb-3"
                    />
                    <h3 className="font-semibold mb-1">{partner.name}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      {partner.description}
                    </p>
                    <div className="flex justify-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Prime Recruiters Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5" />
              <span>Prime Recruiters</span>
            </CardTitle>
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
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={recruiterForm.companyName}
                      onChange={(e) =>
                        setRecruiterForm({
                          ...recruiterForm,
                          companyName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recruiterDescription">Description</Label>
                    <Textarea
                      id="recruiterDescription"
                      value={recruiterForm.description}
                      onChange={(e) =>
                        setRecruiterForm({
                          ...recruiterForm,
                          description: e.target.value,
                        })
                      }
                      rows={2}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="averagePackage">Average Package</Label>
                      <Input
                        id="averagePackage"
                        value={recruiterForm.averagePackage}
                        onChange={(e) =>
                          setRecruiterForm({
                            ...recruiterForm,
                            averagePackage: e.target.value,
                          })
                        }
                        placeholder="e.g., ₹12 LPA"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hiringCount">Students Hired</Label>
                      <Input
                        id="hiringCount"
                        type="number"
                        value={recruiterForm.hiringCount}
                        onChange={(e) =>
                          setRecruiterForm({
                            ...recruiterForm,
                            hiringCount: parseInt(e.target.value),
                          })
                        }
                      />
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recruiters.map((recruiter) => (
                <Card key={recruiter.id} className="border">
                  <CardContent className="p-4 text-center">
                    <img
                      src={recruiter.logo}
                      alt={recruiter.companyName}
                      className="w-16 h-16 mx-auto mb-3"
                    />
                    <h3 className="font-semibold mb-1">
                      {recruiter.companyName}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      {recruiter.description}
                    </p>
                    <div className="text-xs space-y-1 mb-3">
                      <p>
                        <strong>Avg Package:</strong> {recruiter.averagePackage}
                      </p>
                      <p>
                        <strong>Students Hired:</strong> {recruiter.hiringCount}
                      </p>
                    </div>
                    <div className="flex justify-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Placement Highlights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5" />
              <span>Key Highlights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {placementHighlights.map((highlight) => (
                <Card key={highlight.id} className="border-2 border-dashed">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{highlight.icon}</div>
                    <h3 className="font-semibold text-lg mb-2">
                      {highlight.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {highlight.description}
                    </p>
                    <div className="flex justify-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-6">
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Highlights
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
