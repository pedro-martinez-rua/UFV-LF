import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import logoUFV from "@/assets/logo-ufv-new.png";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === "admin" && password === "admin") {
      toast({
        title: "Acceso concedido",
        description: "Bienvenido al modo administrador",
      });
      navigate("/admin");
    } else {
      toast({
        title: "Acceso denegado",
        description: "Usuario o contraseña incorrectos",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <Card className="w-full max-w-md p-8 shadow-elevated border-0">
        <button 
          onClick={() => navigate("/dashboard")} 
          className="mb-4 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth"
        >
          <ArrowLeft className="w-4 h-4" />
          Go back to Dashboard
        </button>
        
        <div className="flex flex-col items-center mb-6">
          <img src={logoUFV} alt="UFV Logo" className="h-16 mb-4" />
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-center">Admin Mode</h1>
          <p className="text-sm text-muted-foreground text-center mt-2">
            Restricted acces, only for admins
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="username">username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="h-12"
              required
            />
          </div>
          <div>
            <Label htmlFor="password">password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12"
              required
            />
          </div>
          <Button type="submit" className="w-full h-12 font-semibold">
            Access the panel
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AdminLogin;
