import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Save } from "lucide-react";
import { toast } from "sonner";

export default function FooterPage() {
  const [footerContent, setFooterContent] = useState({
    description:
      "EduAdmin is a leading educational institution committed to excellence in learning and innovation.",
    copyright: "© 2024 EduAdmin. All rights reserved.",
    privacyPolicy:
      "Your privacy is important to us. This policy explains how we collect and use your information.",
    termsConditions:
      "By using our services, you agree to these terms and conditions.",
    contactEmail: "info@eduadmin.com",
    contactPhone: "+91 9876543210",
    address: "123 Education Street, Learning City",
  });

  const saveFooterContent = () => {
    toast.success("Footer content saved successfully");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Footer Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage footer content, policies, and contact information
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Footer Content Management</span>
          </CardTitle>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                value={footerContent.contactEmail}
                onChange={(e) =>
                  setFooterContent({
                    ...footerContent,
                    contactEmail: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPhone">Contact Phone</Label>
              <Input
                id="contactPhone"
                value={footerContent.contactPhone}
                onChange={(e) =>
                  setFooterContent({
                    ...footerContent,
                    contactPhone: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={footerContent.address}
                onChange={(e) =>
                  setFooterContent({
                    ...footerContent,
                    address: e.target.value,
                  })
                }
              />
            </div>
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
          <Button onClick={saveFooterContent}>
            <Save className="h-4 w-4 mr-2" />
            Save Footer Content
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
