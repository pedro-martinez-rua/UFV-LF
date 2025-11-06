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
    description: "AirPods Pro blancos con estuche de carga. Perdidos en la biblioteca",
    category: "Electrónica",
    location: "Biblioteca",
    date: "Hoy, 10:30",
    image: "📱",
  },
  {
    id: 2,
    title: "Cartera negra",
    description: "Cartera de cuero negro con DNI y tarjetas. Vista por última vez en cafetería",
    category: "Documentos",
    location: "Cafetería",
    date: "Ayer, 14:00",
    image: "👛",
  },
  {
    id: 3,
    title: "Portátil MacBook",
    description: "MacBook Pro 14\" gris espacial con funda azul",
    category: "Electrónica",
    location: "Edificio A",
    date: "Hace 2 días",
    image: "💻",
  },
  {
    id: 4,
    title: "Llaves del coche",
    description: "Llavero con llaves Toyota y un USB rojo",
    category: "Llaves",
    location: "Parking",
    date: "Hace 3 días",
    image: "🔑",
  },
];

const LostBoard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 bg-card border-b border-border z-10">
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="w-6 h-6 text-foreground" />
            </button>
            <h1 className="text-xl font-bold text-foreground">Tablón de Objetos</h1>
          </div>

          {/* Search */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Buscar objetos..."
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

      {/* Filters */}
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <Badge variant="default" className="px-4 py-2 cursor-pointer whitespace-nowrap">
            Todos
          </Badge>
          <Badge variant="outline" className="px-4 py-2 cursor-pointer whitespace-nowrap">
            📱 Electrónica
          </Badge>
          <Badge variant="outline" className="px-4 py-2 cursor-pointer whitespace-nowrap">
            📄 Documentos
          </Badge>
          <Badge variant="outline" className="px-4 py-2 cursor-pointer whitespace-nowrap">
            🔑 Llaves
          </Badge>
          <Badge variant="outline" className="px-4 py-2 cursor-pointer whitespace-nowrap">
            👕 Ropa
          </Badge>
        </div>
      </div>

      {/* Results Count */}
      <div className="max-w-md mx-auto px-4 pb-4">
        <p className="text-sm text-muted-foreground">
          {mockItems.length} objetos encontrados
        </p>
      </div>

      {/* Items Grid */}
      <div className="max-w-md mx-auto px-4 space-y-4">
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
                <h3 className="font-semibold text-foreground mb-1 truncate">{item.title}</h3>
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

      <Footer />
      <BottomNav />
    </div>
  );
};

export default LostBoard;
