import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Send, Paperclip, Smile } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import logoUFV from "@/assets/logo-ufv-new.png";

const Messages = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedChatId = searchParams.get("chat");
  const [message, setMessage] = useState("");

  const chats = [
    {
      id: "1",
      name: "Carlos Martínez",
      item: "AirPods Pro",
      lastMessage: "¿Podemos vernos en la conserjería?",
      time: "10:30",
      unread: 2,
    },
    {
      id: "2",
      name: "Ana López",
      item: "Cartera negra",
      lastMessage: "Sí, tengo una foto",
      time: "Ayer",
      unread: 0,
    },
    {
      id: "3",
      name: "Pedro Sánchez",
      item: "Portátil MacBook",
      lastMessage: "Gracias por encontrarlo 🙏",
      time: "2 días",
      unread: 0,
    },
  ];

  const currentChat = chats.find(c => c.id === selectedChatId);

  const chatMessages = [
    { id: 1, sender: "other", text: "Hola, creo que tengo tu objeto", time: "10:15" },
    { id: 2, sender: "me", text: "¡Genial! ¿Puedes confirmar que es mío?", time: "10:16" },
    { id: 3, sender: "other", text: "Es de color blanco y tiene tu nombre grabado", time: "10:17" },
    { id: 4, sender: "me", text: "Sí, ese es. ¿Dónde podemos vernos?", time: "10:20" },
    { id: 5, sender: "other", text: "¿Podemos vernos en la conserjería?", time: "10:30" },
  ];

  const quickReplies = [
    "Podemos vernos en la conserjería del Edificio Central.",
    "¿Puedes confirmar que es tuyo?",
    "¿Tienes una foto del objeto?",
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage("");
    }
  };

  if (!selectedChatId) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <header className="gradient-primary text-primary-foreground p-4 shadow-elevated">
          <div className="max-w-md mx-auto flex items-center justify-center gap-3">
            <img src={logoUFV} alt="UFV Logo" className="h-8" />
            <h1 className="text-xl font-bold">Lost&Found UFV</h1>
          </div>
        </header>

        <div className="max-w-md mx-auto px-4 py-4">
          {chats.map((chat) => (
            <Card
              key={chat.id}
              className="p-4 mb-3 shadow-card border-0 transition-smooth hover:shadow-elevated cursor-pointer"
              onClick={() => navigate(`/messages?chat=${chat.id}`)}
            >
              <div className="flex items-start gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {chat.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-foreground truncate">{chat.name}</h3>
                    <span className="text-xs text-muted-foreground">{chat.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1 truncate">{chat.item}</p>
                  <p className="text-sm text-foreground truncate">{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <div className="w-6 h-6 rounded-full bg-destructive text-white text-xs flex items-center justify-center flex-shrink-0">
                    {chat.unread}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        <Footer />
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      <header className="gradient-primary text-primary-foreground p-4 shadow-elevated">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <button onClick={() => navigate('/messages')}>
            <ArrowLeft className="w-6 h-6 text-primary-foreground" />
          </button>
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground">
              {currentChat?.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="font-semibold">{currentChat?.name}</h2>
            <p className="text-xs text-primary-foreground/80">{currentChat?.item}</p>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-4 max-w-md mx-auto w-full">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex mb-4 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                msg.sender === 'me'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <p className={`text-xs mt-1 ${
                msg.sender === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground'
              }`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-md mx-auto w-full px-4 pb-4">
        <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-hide">
          {quickReplies.map((reply, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="whitespace-nowrap text-xs"
              onClick={() => setMessage(reply)}
            >
              {reply}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2 bg-muted rounded-full p-2">
          <button className="p-2">
            <Paperclip className="w-5 h-5 text-muted-foreground" />
          </button>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Escribe un mensaje..."
            className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <button className="p-2">
            <Smile className="w-5 h-5 text-muted-foreground" />
          </button>
          <Button
            size="icon"
            className="rounded-full w-10 h-10"
            onClick={handleSendMessage}
            disabled={!message.trim()}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <Footer />
      <BottomNav />
    </div>
  );
};

export default Messages;
