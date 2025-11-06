import { Button } from "@/components/ui/button";
import { Search, PackageSearch, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logoUFV from "@/assets/logo-ufv-new.png";
import campusUFV from "@/assets/campus-ufv.png";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen flex flex-col relative"
      style={{
        backgroundImage: `url(${campusUFV})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm" />
      
      {/* Header */}
      <header className="px-6 py-8 relative z-10">
        <div className="max-w-md mx-auto text-center">
          <img src={logoUFV} alt="UFV Logo" className="h-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Lost&Found</h1>
          <p className="text-white/90 text-lg">Universidad Francisco de Vitoria</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 relative z-10">
        <div className="max-w-md w-full bg-card rounded-2xl shadow-elevated p-8 border-0">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <PackageSearch className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Encuentra lo que perdiste
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Sistema digital de objetos perdidos y encontrados de la UFV. 
              Tu comunidad te ayuda a recuperar lo que es tuyo.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-accent font-bold">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Seguro y confiable</h3>
                <p className="text-sm text-muted-foreground">Solo accesible con credenciales UFV</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-accent font-bold">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Rápido y fácil</h3>
                <p className="text-sm text-muted-foreground">Publica y busca objetos en segundos</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-accent font-bold">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Comunidad activa</h3>
                <p className="text-sm text-muted-foreground">Estudiantes y personal ayudándose entre sí</p>
              </div>
            </div>
          </div>

          <Button 
            className="w-full h-14 text-lg font-semibold"
            onClick={() => navigate('/login')}
          >
            Acceder con credenciales UFV
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Welcome;
