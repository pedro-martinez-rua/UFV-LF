import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ArrowLeft, MapPin, Calendar, User, CheckCircle2, MessageCircle, Upload } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";

const ItemDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [claimData, setClaimData] = useState({
    color: "",
    brand: "",
    detail: "",
    photo: null as File | null,
  });

  const handleClaim = () => {
    setShowClaimModal(true);
  };

  const handleSubmitClaim = () => {
    toast({
      title: "¡Solicitud enviada! 🤝",
      description: "El propietario recibirá tu mensaje. Te notificaremos pronto.",
    });
    setShowClaimModal(false);
    navigate("/messages?chat=1");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 bg-card border-b border-border p-4 z-10">
        <div className="max-w-md mx-auto flex items-center gap-4">
          <button onClick={() => navigate('/lost-board')}>
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="font-semibold text-foreground">Object details</h1>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Image */}
        <div className="w-full aspect-video bg-primary-lighter rounded-2xl flex items-center justify-center text-8xl animate-fade-in">
          📱
        </div>

        {/* Title and Category */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-3xl font-bold text-primary">AirPods Pro</h1>
            <Badge variant="default">Electronics</Badge>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            White AirPods Pro with charging case. Includes all ear tips in different sizes.
            Last seen on the second floor of the library, near the study area.
          </p>
        </div>

        {/* Details */}
        <Card className="p-4 shadow-card border-0 space-y-3">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Location</p>
              <p className="text-sm text-muted-foreground">Library - 2º floor</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Date</p>
              <p className="text-sm text-muted-foreground">Today, 10:30 AM</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Published by</p>
              <p className="text-sm text-muted-foreground">UFV student (verified)</p>
            </div>
          </div>
        </Card>

        {/* Help Box */}
        <Card className="p-4 bg-accent/10 border-accent/20">
          <div className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm mb-1">Did you find it?</p>
              <p className="text-sm text-muted-foreground">
              By pressing "I've got it!", you can answer a few verification questions
              and open a private chat with the person who lost it.
              </p>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="space-y-3 pt-4">
          <Button 
            className="w-full h-14 text-lg font-semibold gap-2"
            onClick={handleClaim}
          >
            <CheckCircle2 className="w-6 h-6" />
            I've got it!
          </Button>
          <Button 
            variant="outline" 
            className="w-full h-14 text-lg font-semibold gap-2"
          >
            <MessageCircle className="w-6 h-6" />
            Make a question
          </Button>
        </div>

        {/* Safety Notice */}
        <div className="pt-4 text-center">
          <p className="text-xs text-muted-foreground">
            🔒 Your contact details will only be shared if both parties agree to connect.
          </p>
        </div>
      </div>

      {/* Claim Modal */}
      <Dialog open={showClaimModal} onOpenChange={setShowClaimModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Verify that it's yours</DialogTitle>
            <DialogDescription>
              Answer these questions to confirm that the item belongs to you.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="color">What color is it?</Label>
              <Input
                id="color"
                placeholder="Ej: Blanco"
                value={claimData.color}
                onChange={(e) => setClaimData({ ...claimData, color: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="brand">What brand is it?</Label>
              <Input
                id="brand"
                placeholder="Ej: Apple"
                value={claimData.brand}
                onChange={(e) => setClaimData({ ...claimData, brand: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="detail">Is there a unique detail to identifiy it?</Label>
              <Textarea
                id="detail"
                placeholder="Ej: It has a scratch on the left earbud"
                value={claimData.detail}
                onChange={(e) => setClaimData({ ...claimData, detail: e.target.value })}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="photo">Photo (optional)</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-smooth">
                <input
                  id="photo"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setClaimData({ ...claimData, photo: e.target.files?.[0] || null })}
                />
                <label htmlFor="photo" className="cursor-pointer flex flex-col items-center gap-2">
                  <Upload className="w-8 h-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {claimData.photo ? claimData.photo.name : "Add a photo to help verify"}
                  </p>
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowClaimModal(false)}
              >
                Cancell
              </Button>
              <Button
                className="flex-1"
                onClick={handleSubmitClaim}
                disabled={!claimData.color || !claimData.brand || !claimData.detail}
              >
                Send
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
};

export default ItemDetail;
