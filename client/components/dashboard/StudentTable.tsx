import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";

const newStudents = [
  {
    enrollmentNo: "EDU2024001",
    name: "Aarav Sharma",
    fatherName: "Rajesh Sharma",
    address: "New Delhi",
    contact: "+91 9876543210",
    registrationDate: "2024-01-15",
    feeStatus: "paid",
  },
  {
    enrollmentNo: "EDU2024002",
    name: "Priya Patel",
    fatherName: "Kiran Patel",
    address: "Mumbai",
    contact: "+91 9876543211",
    registrationDate: "2024-01-16",
    feeStatus: "pending",
  },
  {
    enrollmentNo: "EDU2024003",
    name: "Arjun Singh",
    fatherName: "Vikram Singh",
    address: "Bangalore",
    contact: "+91 9876543212",
    registrationDate: "2024-01-17",
    feeStatus: "paid",
  },
  {
    enrollmentNo: "EDU2024004",
    name: "Ananya Gupta",
    fatherName: "Suresh Gupta",
    address: "Chennai",
    contact: "+91 9876543213",
    registrationDate: "2024-01-18",
    feeStatus: "overdue",
  },
  {
    enrollmentNo: "EDU2024005",
    name: "Rohan Kumar",
    fatherName: "Anil Kumar",
    address: "Kolkata",
    contact: "+91 9876543214",
    registrationDate: "2024-01-19",
    feeStatus: "paid",
  },
];

export function StudentTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>New Student Registrations</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Enrollment No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Father Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Registration Date</TableHead>
              <TableHead>Fee Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {newStudents.map((student) => (
              <TableRow key={student.enrollmentNo}>
                <TableCell className="font-medium">
                  {student.enrollmentNo}
                </TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.fatherName}</TableCell>
                <TableCell>{student.address}</TableCell>
                <TableCell>{student.contact}</TableCell>
                <TableCell>{student.registrationDate}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      student.feeStatus === "paid"
                        ? "default"
                        : student.feeStatus === "pending"
                          ? "secondary"
                          : "destructive"
                    }
                    className={
                      student.feeStatus === "paid"
                        ? "bg-success text-white"
                        : ""
                    }
                  >
                    {student.feeStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
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
  );
}
