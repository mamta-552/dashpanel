import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Lock, Mail } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication - in real app, this would call an API
    if (email && password) {
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-admin-gradient-start to-admin-gradient-end flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">EduAdmin</h1>
          <p className="text-white/80">Super Admin Panel Login</p>
        </div>

        <Card className="backdrop-blur-sm bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle className="text-center text-white">
              Welcome Back
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@edu.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-white/90 border-white/30"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-white/90 border-white/30"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-white text-primary hover:bg-white/90"
              >
                Sign In to Dashboard
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/70 text-sm">
                Demo Credentials: admin@edu.com / password
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
