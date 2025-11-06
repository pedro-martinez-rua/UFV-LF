import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import campusUFV from "@/assets/campus-ufv.png";
import logoUFV from "@/assets/logo-ufv-new.png";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const ufvEmailRegex = /@ufv\.(es|edu\.es)$/;
    return ufvEmailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return hasMinLength && hasUpperCase && hasNumber && hasSymbol;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(formData.email)) {
      toast({
        title: "Invalid email",
        description: "You must use your institutional UFV email (@ufv.es or @ufv.edu.es)",
        variant: "destructive",
      });
      return;
    }

    if (!validatePassword(formData.password)) {
      toast({
        title: "Invalid password",
        description: "It must have at least 8 characters, 1 uppercase letter, 1 number and 1 symbol",
        variant: "destructive",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure both passwords are the same",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      toast({
        title: "Account created! 🤝",
        description: "Your account has been successfully created",
      });
      navigate("/login");
    }, 1500);
  };

  return (
    <div 
      className="min-h-screen flex flex-col px-6 py-12 relative"
      style={{
        backgroundImage: `url(${campusUFV})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm" />
      
      <div className="w-full max-w-md mx-auto relative z-10">
        <button onClick={() => navigate("/login")} className="mb-6 text-white hover:text.white/80 transition-smooth">
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="text-center mb-8 animate-fade-in">
          <img src={logoUFV} alt="UFV Logo" className="h-20 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Create UFV account</h1>
          <p className="text-white/90">Join the Lost&Found community</p>
        </div>

        <div className="bg-card rounded-2xl shadow-elevated p-8 border-0">
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">📧 Institutional email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@ufv.es"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`h-12 ${!validateEmail(formData.email) && formData.email ? 'border-destructive' : ''}`}
                required
              />
              {!validateEmail(formData.email) && formData.email && (
                <p className="text-xs text-destructive">Must be an @ufv.es or @ufv.edu.es email</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role at the university</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value })}
                required
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">🔒 Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Minimum 8 characters"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="h-12"
                required
              />
              {!validatePassword(formData.password) && formData.password && (
                <p className="text-xs text-destructive">
                  Min. 8 characters, 1 uppercase, 1 number, 1 symbol
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">🔒 Confirm password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Repeat your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="h-12"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-lg font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-primary hover:underline"
                >
                  Log in
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
