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
              <h2 className="text-2xl font-bold text-primary mb-2">What did you lost?</h2>
              <p className="text-muted-foreground">Describe the object with the maximum possible detail</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Object name</Label>
                <Input 
                  id="title"
                  placeholder="Ej: AirPods Pro blancos"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="h-12"
                />
              </div>

              <div>
                <Label htmlFor="description">Detailed description (min 20 characters)</Label>
                <Textarea 
                  id="description"
                  placeholder="Include brand, colour, characteristics, accesories..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="min-h-32 resize-none"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.description.length}/20 Characters
                </p>
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">📱 Electronics</SelectItem>
                    <SelectItem value="clothing">👕 Clothes and accesories</SelectItem>
                    <SelectItem value="documents">📄 Documents</SelectItem>
                    <SelectItem value="keys">🔑 Keys and cards</SelectItem>
                    <SelectItem value="bags">🎒 Bags and backpacks</SelectItem>
                    <SelectItem value="other">📦 Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              className="w-full h-12"
              onClick={() => setStep(2)}
              disabled={!formData.title || !formData.category}
            >
              Continue
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-2">Where and when?</h2>
              <p className="text-muted-foreground">Help us to ubicate better your object</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="location">Campus zone</Label>
                <Select value={formData.location} onValueChange={(value) => setFormData({...formData, location: value})}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="¿Dónde crees que lo perdiste?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="library">📚 Library</SelectItem>
                    <SelectItem value="cafeteria">☕ Cafeteria</SelectItem>
                    <SelectItem value="building-a">🏢 A Building</SelectItem>
                    <SelectItem value="building-b">🏢 B Building</SelectItem>
                    <SelectItem value="gym">💪 Gym</SelectItem>
                    <SelectItem value="parking">🚗 Parking</SelectItem>
                    <SelectItem value="other">📍 Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="date">Date</Label>
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
                Continue
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-2">Add photos (optional)</h2>
              <p className="text-muted-foreground">Photos add a 70% of possibilities of finding it</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Card className="aspect-square border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/50 transition-smooth">
                <Upload className="w-8 h-8 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Add image</p>
              </Card>
              <Card className="aspect-square border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/50 transition-smooth">
                <Camera className="w-8 h-8 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Take a photo</p>
              </Card>
            </div>

            <div className="bg-primary-lighter p-4 rounded-lg">
              <p className="text-sm text-primary font-medium">💡 Hint</p>
              <p className="text-sm text-muted-foreground mt-1">
                Add photos from different angles and show unique details that help you identify it
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
              <h2 className="text-2xl font-bold text-primary mb-2">¡Published correctly!</h2>
              <p className="text-muted-foreground">Your item is now on the board. We will notify you if someone finds it</p>
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
            <h1 className="font-semibold text-foreground">Add a lost object</h1>
            {step < 4 && (
              <p className="text-xs text-muted-foreground">Step {step} of 3</p>
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
