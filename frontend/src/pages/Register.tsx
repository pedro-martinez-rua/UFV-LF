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
        title: "Email inválido",
        description: "Debes usar tu email institucional UFV (@ufv.es o @ufv.edu.es)",
        variant: "destructive",
      });
      return;
    }

    if (!validatePassword(formData.password)) {
      toast({
        title: "Contraseña inválida",
        description: "Debe tener mínimo 8 caracteres, 1 mayúscula, 1 número y 1 símbolo",
        variant: "destructive",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Las contraseñas no coinciden",
        description: "Por favor, verifica que ambas contraseñas sean iguales",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      toast({
        title: "¡Cuenta creada! 🤝",
        description: "Tu cuenta se ha creado con éxito",
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
        <button onClick={() => navigate("/login")} className="mb-6 text-white hover:text-white/80 transition-smooth">
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="text-center mb-8 animate-fade-in">
          <img src={logoUFV} alt="UFV Logo" className="h-20 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Crear cuenta UFV</h1>
          <p className="text-white/90">Únete a la comunidad Lost&Found</p>
        </div>

        <div className="bg-card rounded-2xl shadow-elevated p-8 border-0">
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">📧 Email institucional</Label>
              <Input
                id="email"
                type="email"
                placeholder="nombre@ufv.es"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`h-12 ${!validateEmail(formData.email) && formData.email ? 'border-destructive' : ''}`}
                required
              />
              {!validateEmail(formData.email) && formData.email && (
                <p className="text-xs text-destructive">Debe ser un email @ufv.es o @ufv.edu.es</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Rol en la universidad</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value })}
                required
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Selecciona tu rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Estudiante</SelectItem>
                  <SelectItem value="teacher">Profesor</SelectItem>
                  <SelectItem value="staff">Personal de servicios</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">🔒 Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="Mínimo 8 caracteres"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="h-12"
                required
              />
              {!validatePassword(formData.password) && formData.password && (
                <p className="text-xs text-destructive">
                  Mín. 8 caracteres, 1 mayúscula, 1 número, 1 símbolo
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">🔒 Confirmar contraseña</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Repite tu contraseña"
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
              {isLoading ? "Creando cuenta..." : "Crear cuenta"}
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                ¿Ya tienes cuenta?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-primary hover:underline"
                >
                  Inicia sesión
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
