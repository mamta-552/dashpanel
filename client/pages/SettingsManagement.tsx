import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings,
  Palette,
  Database,
  Mail,
  Shield,
  Bell,
  Globe,
  Save,
  Upload,
  Download,
  Trash2,
  RefreshCw,
  Users,
  MessageSquare,
} from "lucide-react";
import { toast } from "sonner";

interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  mode: "light" | "dark" | "auto";
  customCSS: string;
}

interface SystemSettings {
  siteName: string;
  siteDescription: string;
  adminEmail: string;
  maintenanceMode: boolean;
  registrationEnabled: boolean;
  emailVerification: boolean;
  chatEnabled: boolean;
  timezone: string;
  language: string;
  dateFormat: string;
  currency: string;
}

interface EmailSettings {
  smtpHost: string;
  smtpPort: string;
  smtpUsername: string;
  smtpPassword: string;
  fromEmail: string;
  fromName: string;
  encryption: "tls" | "ssl" | "none";
  testEmail: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  newUserRegistration: boolean;
  courseCompletion: boolean;
  paymentReceived: boolean;
  systemAlerts: boolean;
  dailyReports: boolean;
}

interface BackupSettings {
  autoBackup: boolean;
  backupFrequency: "daily" | "weekly" | "monthly";
  retentionDays: number;
  lastBackup: string;
  backupLocation: string;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  sessionTimeout: number;
  passwordMinLength: number;
  requireSpecialChars: boolean;
  maxLoginAttempts: number;
  ipWhitelist: string[];
}

const mockThemeSettings: ThemeSettings = {
  primaryColor: "#7C3AED",
  secondaryColor: "#F3F4F6",
  accentColor: "#F59E0B",
  backgroundColor: "#FFFFFF",
  textColor: "#1F2937",
  mode: "light",
  customCSS: "",
};

const mockSystemSettings: SystemSettings = {
  siteName: "EduAdmin",
  siteDescription: "Complete Educational Management System",
  adminEmail: "admin@eduadmin.com",
  maintenanceMode: false,
  registrationEnabled: true,
  emailVerification: true,
  chatEnabled: true,
  timezone: "Asia/Kolkata",
  language: "en",
  dateFormat: "DD/MM/YYYY",
  currency: "INR",
};

const mockEmailSettings: EmailSettings = {
  smtpHost: "smtp.gmail.com",
  smtpPort: "587",
  smtpUsername: "",
  smtpPassword: "",
  fromEmail: "noreply@eduadmin.com",
  fromName: "EduAdmin",
  encryption: "tls",
  testEmail: "",
};

const mockNotificationSettings: NotificationSettings = {
  emailNotifications: true,
  pushNotifications: true,
  smsNotifications: false,
  newUserRegistration: true,
  courseCompletion: true,
  paymentReceived: true,
  systemAlerts: true,
  dailyReports: false,
};

const mockBackupSettings: BackupSettings = {
  autoBackup: true,
  backupFrequency: "daily",
  retentionDays: 30,
  lastBackup: "2024-01-15 02:00:00",
  backupLocation: "/backups/",
};

const mockSecuritySettings: SecuritySettings = {
  twoFactorAuth: false,
  sessionTimeout: 30,
  passwordMinLength: 8,
  requireSpecialChars: true,
  maxLoginAttempts: 5,
  ipWhitelist: [],
};

export default function SettingsManagement() {
  const [themeSettings, setThemeSettings] =
    useState<ThemeSettings>(mockThemeSettings);
  const [systemSettings, setSystemSettings] =
    useState<SystemSettings>(mockSystemSettings);
  const [emailSettings, setEmailSettings] =
    useState<EmailSettings>(mockEmailSettings);
  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>(mockNotificationSettings);
  const [backupSettings, setBackupSettings] =
    useState<BackupSettings>(mockBackupSettings);
  const [securitySettings, setSecuritySettings] =
    useState<SecuritySettings>(mockSecuritySettings);
  const [activeTab, setActiveTab] = useState("theme");

  const saveThemeSettings = () => {
    toast.success("Theme settings saved successfully");
  };

  const saveSystemSettings = () => {
    toast.success("System settings saved successfully");
  };

  const saveEmailSettings = () => {
    toast.success("Email settings saved successfully");
  };

  const testEmailConnection = () => {
    toast.success("Test email sent successfully");
  };

  const saveNotificationSettings = () => {
    toast.success("Notification settings saved successfully");
  };

  const saveBackupSettings = () => {
    toast.success("Backup settings saved successfully");
  };

  const createBackup = () => {
    toast.success("Backup created successfully");
  };

  const saveSecuritySettings = () => {
    toast.success("Security settings saved successfully");
  };

  const resetToDefaults = () => {
    setThemeSettings(mockThemeSettings);
    toast.success("Settings reset to defaults");
  };

  const exportSettings = () => {
    const settings = {
      theme: themeSettings,
      system: systemSettings,
      email: emailSettings,
      notifications: notificationSettings,
      backup: backupSettings,
      security: securitySettings,
    };
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "eduadmin-settings.json";
    link.click();
    toast.success("Settings exported successfully");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            System Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Configure system preferences and administration settings
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={exportSettings}>
            <Download className="h-4 w-4 mr-2" />
            Export Settings
          </Button>
          <Button variant="outline" onClick={resetToDefaults}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Theme Settings Tab */}
        <TabsContent value="theme">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5" />
                <span>Theme & Appearance</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex items-center space-x-4">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={themeSettings.primaryColor}
                        onChange={(e) =>
                          setThemeSettings({
                            ...themeSettings,
                            primaryColor: e.target.value,
                          })
                        }
                        className="w-20 h-10"
                      />
                      <Input
                        value={themeSettings.primaryColor}
                        onChange={(e) =>
                          setThemeSettings({
                            ...themeSettings,
                            primaryColor: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <div className="flex items-center space-x-4">
                      <Input
                        id="secondaryColor"
                        type="color"
                        value={themeSettings.secondaryColor}
                        onChange={(e) =>
                          setThemeSettings({
                            ...themeSettings,
                            secondaryColor: e.target.value,
                          })
                        }
                        className="w-20 h-10"
                      />
                      <Input
                        value={themeSettings.secondaryColor}
                        onChange={(e) =>
                          setThemeSettings({
                            ...themeSettings,
                            secondaryColor: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accentColor">Accent Color</Label>
                    <div className="flex items-center space-x-4">
                      <Input
                        id="accentColor"
                        type="color"
                        value={themeSettings.accentColor}
                        onChange={(e) =>
                          setThemeSettings({
                            ...themeSettings,
                            accentColor: e.target.value,
                          })
                        }
                        className="w-20 h-10"
                      />
                      <Input
                        value={themeSettings.accentColor}
                        onChange={(e) =>
                          setThemeSettings({
                            ...themeSettings,
                            accentColor: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mode">Theme Mode</Label>
                    <Select
                      value={themeSettings.mode}
                      onValueChange={(value: "light" | "dark" | "auto") =>
                        setThemeSettings({ ...themeSettings, mode: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="auto">Auto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Theme Preview</Label>
                    <div className="border rounded-lg p-4 space-y-4">
                      <div
                        className="h-12 rounded flex items-center px-4 text-white"
                        style={{ backgroundColor: themeSettings.primaryColor }}
                      >
                        Primary Color Example
                      </div>
                      <div
                        className="h-8 rounded flex items-center px-4"
                        style={{
                          backgroundColor: themeSettings.secondaryColor,
                          color: themeSettings.textColor,
                        }}
                      >
                        Secondary Color Example
                      </div>
                      <div
                        className="h-8 rounded flex items-center px-4 text-white"
                        style={{ backgroundColor: themeSettings.accentColor }}
                      >
                        Accent Color Example
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="customCSS">Custom CSS</Label>
                <Textarea
                  id="customCSS"
                  value={themeSettings.customCSS}
                  onChange={(e) =>
                    setThemeSettings({
                      ...themeSettings,
                      customCSS: e.target.value,
                    })
                  }
                  rows={6}
                  placeholder="Enter custom CSS here..."
                />
              </div>
              <Button onClick={saveThemeSettings}>
                <Save className="h-4 w-4 mr-2" />
                Save Theme Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings Tab */}
        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>System Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      value={systemSettings.siteName}
                      onChange={(e) =>
                        setSystemSettings({
                          ...systemSettings,
                          siteName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="adminEmail">Admin Email</Label>
                    <Input
                      id="adminEmail"
                      type="email"
                      value={systemSettings.adminEmail}
                      onChange={(e) =>
                        setSystemSettings({
                          ...systemSettings,
                          adminEmail: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={systemSettings.timezone}
                      onValueChange={(value) =>
                        setSystemSettings({
                          ...systemSettings,
                          timezone: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Kolkata">
                          Asia/Kolkata
                        </SelectItem>
                        <SelectItem value="America/New_York">
                          America/New_York
                        </SelectItem>
                        <SelectItem value="Europe/London">
                          Europe/London
                        </SelectItem>
                        <SelectItem value="Asia/Tokyo">Asia/Tokyo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select
                      value={systemSettings.language}
                      onValueChange={(value) =>
                        setSystemSettings({
                          ...systemSettings,
                          language: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">Hindi</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <Select
                      value={systemSettings.dateFormat}
                      onValueChange={(value) =>
                        setSystemSettings({
                          ...systemSettings,
                          dateFormat: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select
                      value={systemSettings.currency}
                      onValueChange={(value) =>
                        setSystemSettings({
                          ...systemSettings,
                          currency: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INR">INR (₹)</SelectItem>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                      <Switch
                        id="maintenanceMode"
                        checked={systemSettings.maintenanceMode}
                        onCheckedChange={(checked) =>
                          setSystemSettings({
                            ...systemSettings,
                            maintenanceMode: checked,
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="registrationEnabled">
                        User Registration
                      </Label>
                      <Switch
                        id="registrationEnabled"
                        checked={systemSettings.registrationEnabled}
                        onCheckedChange={(checked) =>
                          setSystemSettings({
                            ...systemSettings,
                            registrationEnabled: checked,
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="emailVerification">
                        Email Verification
                      </Label>
                      <Switch
                        id="emailVerification"
                        checked={systemSettings.emailVerification}
                        onCheckedChange={(checked) =>
                          setSystemSettings({
                            ...systemSettings,
                            emailVerification: checked,
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="chatEnabled">Live Chat</Label>
                      <Switch
                        id="chatEnabled"
                        checked={systemSettings.chatEnabled}
                        onCheckedChange={(checked) =>
                          setSystemSettings({
                            ...systemSettings,
                            chatEnabled: checked,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={systemSettings.siteDescription}
                  onChange={(e) =>
                    setSystemSettings({
                      ...systemSettings,
                      siteDescription: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>
              <Button onClick={saveSystemSettings}>
                <Save className="h-4 w-4 mr-2" />
                Save System Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings Tab */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Email Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtpHost">SMTP Host</Label>
                    <Input
                      id="smtpHost"
                      value={emailSettings.smtpHost}
                      onChange={(e) =>
                        setEmailSettings({
                          ...emailSettings,
                          smtpHost: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPort">SMTP Port</Label>
                    <Input
                      id="smtpPort"
                      value={emailSettings.smtpPort}
                      onChange={(e) =>
                        setEmailSettings({
                          ...emailSettings,
                          smtpPort: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpUsername">Username</Label>
                    <Input
                      id="smtpUsername"
                      value={emailSettings.smtpUsername}
                      onChange={(e) =>
                        setEmailSettings({
                          ...emailSettings,
                          smtpUsername: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPassword">Password</Label>
                    <Input
                      id="smtpPassword"
                      type="password"
                      value={emailSettings.smtpPassword}
                      onChange={(e) =>
                        setEmailSettings({
                          ...emailSettings,
                          smtpPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fromEmail">From Email</Label>
                    <Input
                      id="fromEmail"
                      type="email"
                      value={emailSettings.fromEmail}
                      onChange={(e) =>
                        setEmailSettings({
                          ...emailSettings,
                          fromEmail: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fromName">From Name</Label>
                    <Input
                      id="fromName"
                      value={emailSettings.fromName}
                      onChange={(e) =>
                        setEmailSettings({
                          ...emailSettings,
                          fromName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="encryption">Encryption</Label>
                    <Select
                      value={emailSettings.encryption}
                      onValueChange={(value: "tls" | "ssl" | "none") =>
                        setEmailSettings({
                          ...emailSettings,
                          encryption: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tls">TLS</SelectItem>
                        <SelectItem value="ssl">SSL</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="testEmail">Test Email</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="testEmail"
                        type="email"
                        value={emailSettings.testEmail}
                        onChange={(e) =>
                          setEmailSettings({
                            ...emailSettings,
                            testEmail: e.target.value,
                          })
                        }
                        placeholder="Enter email to test"
                      />
                      <Button onClick={testEmailConnection}>Test</Button>
                    </div>
                  </div>
                </div>
              </div>
              <Button onClick={saveEmailSettings}>
                <Save className="h-4 w-4 mr-2" />
                Save Email Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Notification Channels
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="emailNotifications">
                        Email Notifications
                      </Label>
                      <Switch
                        id="emailNotifications"
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            emailNotifications: checked,
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="pushNotifications">
                        Push Notifications
                      </Label>
                      <Switch
                        id="pushNotifications"
                        checked={notificationSettings.pushNotifications}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            pushNotifications: checked,
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="smsNotifications">
                        SMS Notifications
                      </Label>
                      <Switch
                        id="smsNotifications"
                        checked={notificationSettings.smsNotifications}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            smsNotifications: checked,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Event Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="newUserRegistration">
                        New User Registration
                      </Label>
                      <Switch
                        id="newUserRegistration"
                        checked={notificationSettings.newUserRegistration}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            newUserRegistration: checked,
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="courseCompletion">
                        Course Completion
                      </Label>
                      <Switch
                        id="courseCompletion"
                        checked={notificationSettings.courseCompletion}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            courseCompletion: checked,
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="paymentReceived">Payment Received</Label>
                      <Switch
                        id="paymentReceived"
                        checked={notificationSettings.paymentReceived}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            paymentReceived: checked,
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="systemAlerts">System Alerts</Label>
                      <Switch
                        id="systemAlerts"
                        checked={notificationSettings.systemAlerts}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            systemAlerts: checked,
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="dailyReports">Daily Reports</Label>
                      <Switch
                        id="dailyReports"
                        checked={notificationSettings.dailyReports}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            dailyReports: checked,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Button onClick={saveNotificationSettings}>
                <Save className="h-4 w-4 mr-2" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Backup Tab */}
        <TabsContent value="backup">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>Backup & Recovery</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="autoBackup">Auto Backup</Label>
                    <Switch
                      id="autoBackup"
                      checked={backupSettings.autoBackup}
                      onCheckedChange={(checked) =>
                        setBackupSettings({
                          ...backupSettings,
                          autoBackup: checked,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="backupFrequency">Backup Frequency</Label>
                    <Select
                      value={backupSettings.backupFrequency}
                      onValueChange={(value: "daily" | "weekly" | "monthly") =>
                        setBackupSettings({
                          ...backupSettings,
                          backupFrequency: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="retentionDays">Retention Days</Label>
                    <Input
                      id="retentionDays"
                      type="number"
                      value={backupSettings.retentionDays}
                      onChange={(e) =>
                        setBackupSettings({
                          ...backupSettings,
                          retentionDays: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Last Backup</Label>
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                      {backupSettings.lastBackup}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="backupLocation">Backup Location</Label>
                    <Input
                      id="backupLocation"
                      value={backupSettings.backupLocation}
                      onChange={(e) =>
                        setBackupSettings({
                          ...backupSettings,
                          backupLocation: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Manual Backup</Label>
                    <Button onClick={createBackup} className="w-full">
                      <Database className="h-4 w-4 mr-2" />
                      Create Backup Now
                    </Button>
                  </div>
                </div>
              </div>
              <Button onClick={saveBackupSettings}>
                <Save className="h-4 w-4 mr-2" />
                Save Backup Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="twoFactorAuth">
                      Two-Factor Authentication
                    </Label>
                    <Switch
                      id="twoFactorAuth"
                      checked={securitySettings.twoFactorAuth}
                      onCheckedChange={(checked) =>
                        setSecuritySettings({
                          ...securitySettings,
                          twoFactorAuth: checked,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">
                      Session Timeout (minutes)
                    </Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          sessionTimeout: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passwordMinLength">
                      Minimum Password Length
                    </Label>
                    <Input
                      id="passwordMinLength"
                      type="number"
                      value={securitySettings.passwordMinLength}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          passwordMinLength: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="requireSpecialChars">
                      Require Special Characters
                    </Label>
                    <Switch
                      id="requireSpecialChars"
                      checked={securitySettings.requireSpecialChars}
                      onCheckedChange={(checked) =>
                        setSecuritySettings({
                          ...securitySettings,
                          requireSpecialChars: checked,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                    <Input
                      id="maxLoginAttempts"
                      type="number"
                      value={securitySettings.maxLoginAttempts}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          maxLoginAttempts: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>IP Whitelist</Label>
                    <Textarea
                      placeholder="Enter IP addresses (one per line)"
                      rows={4}
                    />
                  </div>
                </div>
              </div>
              <Button onClick={saveSecuritySettings}>
                <Save className="h-4 w-4 mr-2" />
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
