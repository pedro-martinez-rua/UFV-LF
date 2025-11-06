import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Download,
  Users,
  FileText,
  Activity,
  ArrowLeft,
  Phone,
  Mail,
  User
} from "lucide-react";
import Footer from "@/components/Footer";
import logoUFV from "@/assets/logo-ufv-new.png";

const Admin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("sensitive");

  const mockCases = [
    {
      id: "1",
      title: "DNI - María García López",
      category: "Documentos",
      status: "Pendiente revisión",
      reporter: "Juan Pérez",
      phone: "+34 612 345 678",
      email: "juan.perez@ufv.es",
      date: "2025-11-05",
      location: "Biblioteca",
      isSensitive: true
    },
    {
      id: "2",
      title: "Llaves del coche BMW",
      category: "Llaves",
      status: "En revisión",
      reporter: "Ana Martínez",
      phone: "+34 623 456 789",
      email: "ana.martinez@ufv.es",
      date: "2025-11-04",
      location: "Parking Este",
      isSensitive: true
    },
    {
      id: "3",
      title: "Tarjeta bancaria BBVA",
      category: "Documentos",
      status: "Pendiente revisión",
      reporter: "Carlos Ruiz",
      phone: "+34 634 567 890",
      email: "carlos.ruiz@ufv.es",
      date: "2025-11-03",
      location: "Cafetería",
      isSensitive: true
    },
    {
      id: "4",
      title: "AirPods Pro",
      category: "Electrónica",
      status: "Abierto",
      reporter: "Laura Torres",
      phone: "+34 645 678 901",
      email: "laura.torres@ufv.es",
      date: "2025-11-05",
      location: "Aula 301",
      isSensitive: false
    },
    {
      id: "5",
      title: "Cartera de cuero marrón",
      category: "Documentos",
      status: "Cerrado",
      reporter: "Miguel Sánchez",
      phone: "+34 656 789 012",
      email: "miguel.sanchez@ufv.es",
      date: "2025-11-02",
      location: "Gimnasio",
      isSensitive: false
    }
  ];

  const handleApprove = (caseId: string) => {
    toast({
      title: "Caso aprobado",
      description: `El caso ${caseId} ha sido marcado como resuelto`,
    });
  };

  const handleReject = (caseId: string) => {
    toast({
      title: "Caso rechazado",
      description: `El caso ${caseId} ha sido rechazado`,
      variant: "destructive",
    });
  };

  const handleExport = () => {
    toast({
      title: "Exportando informe",
      description: "El informe se descargará en breve",
    });
  };

  const handleContact = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const sensitiveCases = mockCases.filter(c => c.isSensitive);
  const activeCases = mockCases.filter(c => c.status !== "Cerrado");
  const stats = {
    active: activeCases.length,
    sensitive: sensitiveCases.length,
    closed: mockCases.filter(c => c.status === "Cerrado").length
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header */}
      <header className="gradient-primary text-primary-foreground p-6 shadow-elevated">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <img src={logoUFV} alt="UFV Logo" className="h-10" />
              <div>
                <h1 className="text-2xl font-bold">Mediation pannel</h1>
                <p className="text-sm text-primary-foreground/80">UFV Administration </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="bg-primary-foreground/20 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/30"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go back to Dashboard
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-primary-foreground/10 border-0 p-4">
              <div className="flex items-center gap-3">
                <Activity className="w-6 h-6" />
                <div>
                  <p className="text-2xl font-bold">{stats.active}</p>
                  <p className="text-sm text-primary-foreground/80">Active cases</p>
                </div>
              </div>
            </Card>
            <Card className="bg-destructive/20 border-0 p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6" />
                <div>
                  <p className="text-2xl font-bold">{stats.sensitive}</p>
                  <p className="text-sm text-primary-foreground/80">Sensible Cases</p>
                </div>
              </div>
            </Card>
            <Card className="bg-success/20 border-0 p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6" />
                <div>
                  <p className="text-2xl font-bold">{stats.closed}</p>
                  <p className="text-sm text-primary-foreground/80">Closed Cases</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <Card className="lg:col-span-1 p-6 h-fit shadow-card border-0">
            <h2 className="font-bold mb-4">Navegación</h2>
            <div className="space-y-2">
              <Button
                variant={activeSection === "sensitive" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveSection("sensitive")}
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Casos sensibles
              </Button>
              <Button
                variant={activeSection === "active" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveSection("active")}
              >
                <Activity className="w-4 h-4 mr-2" />
                Casos activos
              </Button>
              <Button
                variant={activeSection === "reports" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveSection("reports")}
              >
                <FileText className="w-4 h-4 mr-2" />
                Reportes
              </Button>
              <Button
                variant={activeSection === "users" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveSection("users")}
              >
                <Users className="w-4 h-4 mr-2" />
                Usuarios
              </Button>
            </div>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">
                {activeSection === "sensitive" && "Casos Sensibles"}
                {activeSection === "active" && "Todos los Casos"}
                {activeSection === "reports" && "Reportes"}
                {activeSection === "users" && "Gestión de Usuarios"}
              </h2>
              <Button variant="outline" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>

            {/* Cases List */}
            {(activeSection === "sensitive" || activeSection === "active") && (
              <div className="space-y-4">
                {(activeSection === "sensitive" ? sensitiveCases : mockCases).map((item) => (
                  <Card 
                    key={item.id} 
                    className={`p-4 shadow-card ${item.isSensitive ? 'border-l-4 border-l-destructive' : ''}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3 flex-1">
                        {item.isSensitive && <AlertTriangle className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />}
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-bold text-lg">{item.title}</h3>
                            {item.isSensitive && (
                              <Badge variant="destructive" className="flex-shrink-0">SENSIBLE</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {item.category} · {item.location} · {item.date}
                          </p>
                          <div className="space-y-1 text-sm">
                            <p className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              <span className="font-semibold">Reportado por:</span> {item.reporter}
                            </p>
                            <p className="flex items-center gap-2">
                              <Phone className="w-4 h-4" />
                              <span className="font-semibold">Teléfono:</span> {item.phone}
                            </p>
                            <p className="flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              <span className="font-semibold">Email:</span> 
                              <a href={`mailto:${item.email}`} className="text-primary hover:underline">
                                {item.email}
                              </a>
                            </p>
                            <p className="flex items-center gap-2">
                              <Activity className="w-4 h-4" />
                              <span className="font-semibold">Estado:</span> 
                              <Badge variant="outline">{item.status}</Badge>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" onClick={() => toast({ title: "Ver detalles", description: `Abriendo detalles del caso ${item.id}` })}>
                        Ver detalles
                      </Button>
                      <Button size="sm" onClick={() => handleApprove(item.id)}>
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Marcar resuelto
                      </Button>
                      <Button size="sm" variant="secondary" onClick={() => handleContact(item.email)}>
                        <Mail className="w-4 h-4 mr-1" />
                        Contactar
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {activeSection === "reports" && (
              <Card className="p-6">
                <p className="text-muted-foreground text-center py-8">
                  Funcionalidad de reportes en desarrollo
                </p>
              </Card>
            )}

            {activeSection === "users" && (
              <Card className="p-6">
                <p className="text-muted-foreground text-center py-8">
                  Gestión de usuarios en desarrollo
                </p>
              </Card>
            )}
          </div>

          {/* Notifications Panel */}
          <Card className="lg:col-span-1 p-6 h-fit shadow-card border-0">
            <h2 className="font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Notificaciones
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-destructive/10 rounded-lg">
                <p className="text-xs font-semibold text-destructive mb-1">🔴 ALTA PRIORIDAD</p>
                <p className="text-sm">{stats.sensitive} casos sensibles requieren revisión</p>
              </div>
              <div className="p-3 bg-yellow-500/10 rounded-lg">
                <p className="text-xs font-semibold text-yellow-600 mb-1">⚠️ PENDIENTE</p>
                <p className="text-sm">
                  {mockCases.filter(c => c.status === "Pendiente revisión").length} publicaciones esperan verificación
                </p>
              </div>
              <div className="p-3 bg-accent/10 rounded-lg">
                <p className="text-xs font-semibold text-accent mb-1">ℹ️ INFO</p>
                <p className="text-sm">{stats.active} casos activos en proceso</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Admin;
