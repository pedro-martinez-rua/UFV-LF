import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, MapPin, Calendar, CheckCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import logoUFV from "@/assets/logo-ufv-new.png";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Maria Garcia");
  const [avatar, setAvatar] = useState("");

  const userPosts = [
    { id: 1, title: "AirPods Pro", status: "open", date: "2 hours ago", location: "Library" },
    { id: 2, title: "Black Wallet", status: "contact", date: "Yesterday", location: "Cafeteria" },
  ];

  const closedCases = [
    { id: 1, title: "Car Keys", date: "3 days ago", rating: 5 },
    { id: 2, title: "MacBook Laptop", date: "1 week ago", rating: 5 },
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your changes have been saved successfully",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have logged out successfully",
    });
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 gradient-primary text-primary-foreground p-6 shadow-elevated">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src={logoUFV} alt="UFV Logo" className="h-8" />
            <h1 className="text-2xl font-bold">Lost&Found UFV</h1>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-smooth"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to home
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 w-full px-6 pt-4 pb-24">
        {/* Contenido centrado */}
        <div className="max-w-md mx-auto">
          <div className="-mt-8">
            {/* Profile Card */}
            <Card className="shadow-elevated bg-card border-0 p-6 mb-6">
              <div className="flex flex-col items-center text-center mb-6">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src={avatar} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>

                {isEditing ? (
                  <div className="w-full space-y-4">
                    <div>
                      <Label htmlFor="name">Visible name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="text-center"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSaveProfile} className="flex-1">
                        Save
                      </Button>
                      <Button
                        onClick={() => setIsEditing(false)}
                        variant="outline"
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-bold text-foreground mb-1">{name}</h2>
                    <p className="text-sm text-muted-foreground mb-2">maria.garcia@ufv.es</p>
                    <Badge className="mb-4">Student</Badge>
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      className="gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit profile
                    </Button>
                  </>
                )}
              </div>
            </Card>

            {/* My Posts */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-foreground mb-4">My posts</h3>
              <div className="space-y-3">
                {userPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="p-4 shadow-card border-0 transition-smooth hover:shadow-elevated cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-foreground">{post.title}</h4>
                          {post.status === "open" ? (
                            <Badge
                              variant="outline"
                              className="bg-success/10 text-success border-success"
                            >
                              🟢 Open
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="bg-warning/10 text-warning border-warning"
                            >
                              🟡 In contact
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {post.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {post.date}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Closed Cases */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Closed cases</h3>
              <div className="space-y-3">
                {closedCases.map((case_) => (
                  <Card key={case_.id} className="p-4 shadow-card border-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-4 h-4 text-success" />
                          <h4 className="font-semibold text-foreground">{case_.title}</h4>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {case_.date}
                          </div>
                          <div className="flex items-center gap-1">
                            {"⭐".repeat(case_.rating)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Logout Button */}
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="w-full h-12 font-semibold"
            >
              Log out
            </Button>
          </div>
        </div>

        {/* Footer full-width */}
        <div className="-mx-6 mt-8">
          <Footer />
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Profile;
