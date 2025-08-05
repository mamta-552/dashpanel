import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";

export default function NotificationsManagement() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Notifications Management
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Send or schedule partner-wise notifications
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notification Center</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Bell className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">
              Notification Management
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Send targeted notifications to partners and manage communication.
            </p>
            <div className="flex justify-center space-x-4">
              <Badge variant="secondary">Broadcasts</Badge>
              <Badge variant="secondary">Targeted</Badge>
              <Badge variant="secondary">Scheduled</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
