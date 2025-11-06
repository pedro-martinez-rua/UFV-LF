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
        title: "Invalid Email",
        description: "You must use your institutional UFV email(@ufv.es o @ufv.edu.es)",
        variant: "destructive",
      });
      return;
    }

    if (!validatePassword(password)) {
      toast({
        title: "Invalid Password",
        description: "It must have a minimum of 8 characters, 1 uppercase letter, 1 number, and 1 symbol.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simular autenticación
    setTimeout(() => {
      toast({
        title: "Welcome to Lost&Found UFV!",
        description: "You have log in succesfully",
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
          <h2 className="text-2xl font-bold text-foreground mb-2">Log in</h2>
          <p className="text-muted-foreground mb-6">
            Acces with your UFV credentials to help and recover items on your campus
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">📧 Institutional email</Label>
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
                <p className="text-xs text-destructive">It has to be an institutional email: @ufv.es o @ufv.edu.es</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">🔒 Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Minumum 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12"
                required
              />
              {!validatePassword(password) && password && (
                <p className="text-xs text-destructive">
                  Minimum. 8 characters, 1 upper case, 1 number, 1 simbol
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
                🔒 Remember me
              </label>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-lg font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Login in..." : "🔵 Log in"}
            </Button>

            <div className="space-y-3 text-center">
              <Button
                type="button"
                variant="outline"
                className="w-full h-12"
                onClick={() => navigate("/register")}
              >
                ⚪ Create account UFV
              </Button>
              
              <button
                type="button"
                className="text-sm text-primary hover:underline"
                onClick={() => toast({
                  title: "Recover your password",
                  description: "Contact with UFV IT to recover your password.",
                })}
              >
                🔗 Did you forget your password?
              </button>
            </div>
          </form>
        </div>

        <p className="text-center text-xs text-white mt-6">
          when logging in, you agree to the terms of use of the Lost&Found UFV system
        </p>
      </div>
    </div>
  );
};

export default Login;
