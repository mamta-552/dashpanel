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
import { Info, Plus, Edit, Upload, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";

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

interface AboutSection {
  title: string;
  content: string;
  image?: string;
}

const mockAboutData = {
  mission: {
    title: "Our Mission",
    content:
      "To provide world-class education and empower students with knowledge and skills for the future.",
    image: "/placeholder.svg",
  } as AboutSection,
  vision: {
    title: "Our Vision",
    content:
      "To be the leading educational institution that transforms lives through innovative learning.",
    image: "/placeholder.svg",
  } as AboutSection,
  values: {
    title: "Our Values",
    content:
      "Excellence, Innovation, Integrity, and Student Success are at the core of everything we do.",
    image: "/placeholder.svg",
  } as AboutSection,
};

const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Dr. Rajesh Kumar",
    designation: "Director",
    photo: "/placeholder.svg",
    socialLinks: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    id: "2",
    name: "Prof. Priya Sharma",
    designation: "Academic Head",
    photo: "/placeholder.svg",
    socialLinks: {
      linkedin: "https://linkedin.com",
    },
  },
];

export default function AboutPage() {
  const [aboutData, setAboutData] = useState(mockAboutData);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [isTeamDialogOpen, setIsTeamDialogOpen] = useState(false);
  const [teamForm, setTeamForm] = useState({
    name: "",
    designation: "",
    linkedin: "",
    twitter: "",
    facebook: "",
  });

  const updateAboutSection = (
    key: keyof typeof aboutData,
    field: keyof AboutSection,
    value: string,
  ) => {
    setAboutData({
      ...aboutData,
      [key]: {
        ...aboutData[key],
        [field]: value,
      },
    });
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

  const removeTeamMember = (memberId: string) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== memberId));
    toast.success("Team member removed successfully");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            About Us Page Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage about us content, mission, vision, and team members
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* About Sections */}
        {Object.entries(aboutData).map(([key, section]) => (
          <Card key={key}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Info className="h-5 w-5" />
                <span>{section.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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

        {/* Team Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Meet Our Team</CardTitle>
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
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn URL</Label>
                    <Input
                      id="linkedin"
                      value={teamForm.linkedin}
                      onChange={(e) =>
                        setTeamForm({ ...teamForm, linkedin: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter URL</Label>
                    <Input
                      id="twitter"
                      value={teamForm.twitter}
                      onChange={(e) =>
                        setTeamForm({ ...teamForm, twitter: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook URL</Label>
                    <Input
                      id="facebook"
                      value={teamForm.facebook}
                      onChange={(e) =>
                        setTeamForm({ ...teamForm, facebook: e.target.value })
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
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeTeamMember(member.id)}
                      >
                        <Trash2 className="h-4 w-4" />
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
