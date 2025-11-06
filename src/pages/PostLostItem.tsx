import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, Camera, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";

const PostLostItem = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    date: "",
  });

  const handleSubmit = () => {
    if (formData.description.length < 20) {
      toast.error("La descripción debe tener al menos 20 caracteres");
      return;
    }
    setStep(4);
    setTimeout(() => {
      navigate('/lost-board');
      toast.success("¡Objeto publicado! Te notificaremos si alguien lo encuentra");
    }, 2000);
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-2">¿Qué has perdido?</h2>
              <p className="text-muted-foreground">Describe el objeto con el máximo detalle posible</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Título del objeto</Label>
                <Input 
                  id="title"
                  placeholder="Ej: AirPods Pro blancos"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="h-12"
                />
              </div>

              <div>
                <Label htmlFor="description">Descripción detallada (mín. 20 caracteres)</Label>
                <Textarea 
                  id="description"
                  placeholder="Incluye marca, color, características únicas, accesorios..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="min-h-32 resize-none"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.description.length}/20 caracteres
                </p>
              </div>

              <div>
                <Label htmlFor="category">Categoría</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">📱 Electrónica</SelectItem>
                    <SelectItem value="clothing">👕 Ropa y accesorios</SelectItem>
                    <SelectItem value="documents">📄 Documentos</SelectItem>
                    <SelectItem value="keys">🔑 Llaves y tarjetas</SelectItem>
                    <SelectItem value="bags">🎒 Mochilas y bolsas</SelectItem>
                    <SelectItem value="other">📦 Otros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              className="w-full h-12"
              onClick={() => setStep(2)}
              disabled={!formData.title || !formData.category}
            >
              Continuar
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-2">¿Dónde y cuándo?</h2>
              <p className="text-muted-foreground">Ayúdanos a ubicar mejor tu objeto</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="location">Zona del campus</Label>
                <Select value={formData.location} onValueChange={(value) => setFormData({...formData, location: value})}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="¿Dónde crees que lo perdiste?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="library">📚 Biblioteca</SelectItem>
                    <SelectItem value="cafeteria">☕ Cafetería</SelectItem>
                    <SelectItem value="building-a">🏢 Edificio A</SelectItem>
                    <SelectItem value="building-b">🏢 Edificio B</SelectItem>
                    <SelectItem value="gym">💪 Gimnasio</SelectItem>
                    <SelectItem value="parking">🚗 Parking</SelectItem>
                    <SelectItem value="other">📍 Otra zona</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="date">Fecha aproximada</Label>
                <Input 
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="h-12"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1 h-12"
                onClick={() => setStep(1)}
              >
                Atrás
              </Button>
              <Button 
                className="flex-1 h-12"
                onClick={() => setStep(3)}
                disabled={!formData.location || !formData.date}
              >
                Continuar
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-2">Añade fotos (opcional)</h2>
              <p className="text-muted-foreground">Las fotos aumentan un 70% las posibilidades de recuperación</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Card className="aspect-square border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/50 transition-smooth">
                <Upload className="w-8 h-8 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Subir imagen</p>
              </Card>
              <Card className="aspect-square border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/50 transition-smooth">
                <Camera className="w-8 h-8 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Tomar foto</p>
              </Card>
            </div>

            <div className="bg-primary-lighter p-4 rounded-lg">
              <p className="text-sm text-primary font-medium">💡 Consejo</p>
              <p className="text-sm text-muted-foreground mt-1">
                Incluye fotos desde diferentes ángulos y muestra detalles únicos que te ayuden a identificarlo
              </p>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1 h-12"
                onClick={() => setStep(2)}
              >
                Atrás
              </Button>
              <Button 
                className="flex-1 h-12"
                onClick={handleSubmit}
              >
                Publicar
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 animate-fade-in flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-success" />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-primary mb-2">¡Publicado con éxito!</h2>
              <p className="text-muted-foreground">Tu objeto ya está en el tablón. Te avisaremos si alguien lo encuentra</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-card border-b border-border p-4 z-10">
        <div className="max-w-md mx-auto flex items-center gap-4">
          <button onClick={() => step > 1 && step < 4 ? setStep(step - 1) : navigate('/dashboard')}>
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <div className="flex-1">
            <h1 className="font-semibold text-foreground">Publicar objeto perdido</h1>
            {step < 4 && (
              <p className="text-xs text-muted-foreground">Paso {step} de 3</p>
            )}
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      {step < 4 && (
        <div className="max-w-md mx-auto px-4 pt-4">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-smooth"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Content */}
      <main className="max-w-md mx-auto px-6 py-8 pb-24">
        {renderStep()}
      </main>

      {step < 4 && <Footer />}
      {step < 4 && <BottomNav />}
    </div>
  );
};

export default PostLostItem;
