import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Filter, MapPin, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";

const mockItems = [
  {
    id: 1,
    title: "AirPods Pro",
    description: "White AirPods Pro with charging case. Lost in the library",
    category: "Electronics",
    location: "Library",
    date: "Today, 10:30",
    image: "📱",
  },
  {
    id: 2,
    title: "Black Wallet",
    description: "Black leather wallet with ID and cards. Last seen in the cafeteria",
    category: "Documents",
    location: "Cafeteria",
    date: "Yesterday, 14:00",
    image: "👛",
  },
  {
    id: 3,
    title: "MacBook Laptop",
    description: 'Space gray 14" MacBook Pro with blue case',
    category: "Electronics",
    location: "Building A",
    date: "2 days ago",
    image: "💻",
  },
  {
    id: 4,
    title: "Car Keys",
    description: "Keychain with Toyota keys and a red USB",
    category: "Keys",
    location: "Parking lot",
    date: "3 days ago",
    image: "🔑",
  },
];

const LostBoard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 gradient-primary text-primary-foreground shadow-elevated">
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-6 h-6 text-primary-foreground" />
            </button>
            <h1 className="text-xl font-bold">Lost Items Board</h1>
          </div>

          {/* Search */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-foreground/80" />
              <Input
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Button variant="outline" size="icon" className="h-12 w-12 flex-shrink-0">
              <Filter className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 w-full px-4 pt-4 pb-24">
        {/* Contenido centrado */}
        <div className="max-w-md mx-auto">
          {/* Filters */}
          <div className="mb-4">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <Badge variant="default" className="px-4 py-2 cursor-pointer whitespace-nowrap">
                All
              </Badge>
              <Badge variant="outline" className="px-4 py-2 cursor-pointer whitespace-nowrap">
                📱 Electronics
              </Badge>
              <Badge variant="outline" className="px-4 py-2 cursor-pointer whitespace-nowrap">
                📄 Documents
              </Badge>
              <Badge variant="outline" className="px-4 py-2 cursor-pointer whitespace-nowrap">
                🔑 Keys
              </Badge>
              <Badge variant="outline" className="px-4 py-2 cursor-pointer whitespace-nowrap">
                👕 Clothes
              </Badge>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              {mockItems.length} reported lost items
            </p>
          </div>

          {/* Items List */}
          <div className="space-y-4">
            {mockItems.map((item) => (
              <Card
                key={item.id}
                className="p-4 shadow-card border-0 transition-smooth hover:shadow-elevated cursor-pointer animate-fade-in"
                onClick={() => navigate(`/item/${item.id}`)}
              >
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-primary-lighter rounded-xl flex items-center justify-center text-4xl flex-shrink-0">
                    {item.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 truncate">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {item.location}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {item.date}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer full-width dentro de main */}
        <div className="-mx-4 mt-8">
          <Footer />
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default LostBoard;
