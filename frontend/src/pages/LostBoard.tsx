import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Filter, MapPin, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";

type LostItem = {
  id: number;
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
};

const getIconForCategory = (category: string): string => {
  const value = (category || "").toLowerCase();

  if (value.includes("electr")) return "📱";
  if (value.includes("doc")) return "📄";
  if (value.includes("llave") || value.includes("keys")) return "🔑";
  if (value.includes("mochila") || value.includes("bag")) return "🎒";
  if (value.includes("cartera") || value.includes("wallet")) return "👛";

  return "📦";
};

const LostBoard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState<LostItem[]>([]);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const response = await fetch("/api/lost-items");
        if (!response.ok) {
          throw new Error("Failed to load items");
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          const mapped: LostItem[] = data.map((item: any) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            category: item.category,
            location: item.location,
            date: item.date,
          }));

          setItems(mapped);
        }
      } catch (error) {
        console.error("Error loading lost items from API:", error);
      }
    };

    loadItems();
  }, []);

  const filteredItems = items.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;

    return (
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

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
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 flex-shrink-0"
            >
              <Filter className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 w-full px-4 pt-4 pb-24 flex flex-col">
        {/* Contenido centrado */}
        <div className="max-w-md mx-auto w-full">
          {/* Results Count */}
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              {filteredItems.length} reported lost items
            </p>
          </div>

          {/* Items List */}
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="p-4 shadow-card border-0 transition-smooth hover:shadow-elevated cursor-pointer animate-fade-in"
                onClick={() => navigate(`/item/${item.id}`)}
              >
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-primary-lighter rounded-xl flex items-center justify-center text-4xl flex-shrink-0">
                    {getIconForCategory(item.category)}
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

            {filteredItems.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No items found with this search.
              </p>
            )}
          </div>
        </div>

        {/* Footer full-width pegado abajo */}
        <div className="-mx-4 mt-auto">
          <Footer />
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default LostBoard;
