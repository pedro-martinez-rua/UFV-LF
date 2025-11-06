import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import campusUFV from "@/assets/campus-ufv.png";
import logoUFV from "@/assets/logo-ufv-new.png";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      toast({
        title: "Email inválido",
        description: "Debes usar tu email institucional UFV (@ufv.es o @ufv.edu.es)",
        variant: "destructive",
      });
      return;
    }

    if (!validatePassword(password)) {
      toast({
        title: "Contraseña inválida",
        description: "Debe tener mínimo 8 caracteres, 1 mayúscula, 1 número y 1 símbolo",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simular autenticación
    setTimeout(() => {
      toast({
        title: "¡Bienvenido a Lost&Found UFV!",
        description: "Has iniciado sesión correctamente",
      });
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative"
      style={{
        backgroundImage: `url(${campusUFV})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm" />
      
      {/* Logo UFV */}
      <div className="w-full max-w-md mb-8 text-center animate-fade-in relative z-10">
        <img src={logoUFV} alt="UFV Logo" className="h-20 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-white mb-2">Lost&Found UFV</h1>
        <p className="text-white/90">Universidad Francisco de Vitoria</p>
      </div>

      {/* Formulario de Login */}
      <div className="w-full max-w-md relative z-10">
        <div className="bg-card rounded-2xl shadow-elevated p-8 border-0">
          <h2 className="text-2xl font-bold text-foreground mb-2">Iniciar sesión</h2>
          <p className="text-muted-foreground mb-6">
            Accede con tus credenciales UFV para ayudar y recuperar objetos en tu campus
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">📧 Email institucional</Label>
              <Input
                id="email"
                type="email"
                placeholder="nombre@ufv.es"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`h-12 ${!validateEmail(email) && email ? 'border-destructive' : ''}`}
                required
              />
              {!validateEmail(email) && email && (
                <p className="text-xs text-destructive">Debe ser un email @ufv.es o @ufv.edu.es</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">🔒 Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="Mínimo 8 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12"
                required
              />
              {!validatePassword(password) && password && (
                <p className="text-xs text-destructive">
                  Mín. 8 caracteres, 1 mayúscula, 1 número, 1 símbolo
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={remember}
                onCheckedChange={(checked) => setRemember(checked as boolean)}
              />
              <label
                htmlFor="remember"
                className="text-sm text-muted-foreground cursor-pointer"
              >
                Recordar sesión
              </label>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-lg font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Iniciando sesión..." : "🔵 Iniciar sesión"}
            </Button>

            <div className="space-y-3 text-center">
              <Button
                type="button"
                variant="outline"
                className="w-full h-12"
                onClick={() => navigate("/register")}
              >
                ⚪ Crear cuenta UFV
              </Button>
              
              <button
                type="button"
                className="text-sm text-primary hover:underline"
                onClick={() => toast({
                  title: "Recuperar contraseña",
                  description: "Contacta con el servicio de IT de UFV para recuperar tu contraseña",
                })}
              >
                🔗 ¿Olvidaste tu contraseña?
              </button>
            </div>
          </form>
        </div>

        <p className="text-center text-xs text-white mt-6">
          Al iniciar sesión, aceptas los términos de uso del sistema Lost&Found UFV
        </p>
      </div>
    </div>
  );
};

export default Login;
