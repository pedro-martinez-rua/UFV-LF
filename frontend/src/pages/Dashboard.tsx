import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PackageSearch, Plus, ListFilter, User, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import logoUFV from "@/assets/logo-ufv-new.png";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="gradient-primary text-primary-foreground p-6 shadow-elevated">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <img src={logoUFV} alt="UFV Logo" className="h-10" />
              <div>
                <h1 className="text-2xl font-bold">Lost&Found</h1>
                <p className="text-sm text-primary-foreground/80">UFV</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => navigate("/admin-login")}
                className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-smooth"
                title="Modo administrador"
              >
                <Shield className="w-5 h-5" />
              </button>
              <button 
                onClick={() => navigate("/profile")}
                className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-smooth"
                title="Mi perfil"
              >
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-primary-foreground/10 rounded-xl p-4 backdrop-blur-sm">
              <p className="text-2xl font-bold">47</p>
              <p className="text-sm text-primary-foreground/80">Objetos encontrados hoy</p>
            </div>
            <div className="bg-primary-foreground/10 rounded-xl p-4 backdrop-blur-sm">
              <p className="text-2xl font-bold">92%</p>
              <p className="text-sm text-primary-foreground/80">Tasa de recuperación</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Actions */}
      <div className="max-w-md mx-auto px-6 -mt-6">
        <Card className="shadow-elevated bg-card border-0 p-6 space-y-4">
          <Button 
            className="w-full h-16 text-lg font-semibold gap-3"
            onClick={() => navigate('/post-lost-item')}
          >
            <Plus className="w-6 h-6" />
            I've lost something
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full h-16 text-lg font-semibold gap-3"
            onClick={() => navigate('/lost-board')}
          >
            <ListFilter className="w-6 h-6" />
            Lost Items Board
          </Button>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="max-w-md mx-auto px-6 mt-8">
        <h2 className="text-xl font-bold mb-4">Actividad reciente</h2>
        
        <div className="space-y-3">
          {[
            { title: "AirPods Pro encontrados", location: "Biblioteca", time: "Hace 15 min", type: "found" },
            { title: "Cartera negra perdida", location: "Cafetería", time: "Hace 1 hora", type: "lost" },
            { title: "Llaves recuperadas", location: "Edificio A", time: "Hace 2 horas", type: "recovered" }
          ].map((item, index) => (
            <Card key={index} className="p-4 shadow-card border-0 transition-smooth hover:shadow-elevated cursor-pointer">
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  item.type === 'found' ? 'bg-accent' : 
                  item.type === 'recovered' ? 'bg-success' : 'bg-destructive'
                }`} />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.location} · {item.time}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
      <BottomNav />
    </div>
  );
};

export default Dashboard;
