import { useState, useEffect, useRef } from "react";
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
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const chats = [
    {
      id: "1",
      name: "Carlos Martínez",
      item: "AirPods Pro",
      time: "10:30",
      unread: 2,
    },
    {
      id: "2",
      name: "Ana López",
      item: "Black wallet",
      time: "Yesterday",
      unread: 0,
    },
    {
      id: "3",
      name: "Pedro Sánchez",
      item: "MacBook laptop",
      time: "2 days ago",
      unread: 0,
    },
  ];

  // "me" = student who lost the item
  // "other" = person who found it or is helping
  const chatMessagesById: Record<
    string,
    { id: number; sender: "me" | "other"; text: string; time: string }[]
  > = {
    "1": [
      { id: 1, sender: "other", text: "Hi, I think I found your AirPods.", time: "10:12" },
      { id: 2, sender: "me", text: "Hi! Where did you find them?", time: "10:13" },
      {
        id: 3,
        sender: "other",
        text: "Near the library entrance, AirPods Pro with a small scratch on the case.",
        time: "10:14",
      },
      { id: 4, sender: "me", text: "Yes, those are mine.", time: "10:16" },
      { id: 5, sender: "me", text: "Can we meet at the reception desk?", time: "10:20" },
      { id: 6, sender: "other", text: "Sure, see you there at 10:30.", time: "10:30" },
    ],
    "2": [
      { id: 2, sender: "other", text: "Hi, I think I picked one up there.", time: "18:06" },
      { id: 1, sender: "me", text: "A big black wallet?.", time: "18:05" },
      {
        id: 3,
        sender: "me",
        text: "Does it have a blue card holder inside?",
        time: "18:07",
      },
      {
        id: 4,
        sender: "other",
        text: "Yes, and there is a student ID as well.",
        time: "18:08",
      },
      { id: 5, sender: "me", text: "That’s mine, thank you so much!", time: "18:10" },
      {
        id: 6,
        sender: "me",
        text: "I have a photo if you need it.",
        time: "18:15",
      },
    ],
    "3": [
      { id: 1, sender: "me", text: "Hi Pedro, I found a MacBook on campus.", time: "09:10" },
      {
        id: 2,
        sender: "other",
        text: "Hi! Is it a 14 MacBook Pro with a blue cover",
        time: "09:12",
      },
      {
        id: 3,
        sender: "me",
        text: "Yes, that’s the one. It was left in a classroom",
        time: "09:13",
      },
      {
        id: 4,
        sender: "other",
        text: "Perfect, thank you so much!.",
        time: "09:15",
      },
      { id: 5, sender: "me", text: "No problem, happy to help", time: "09:18" },
      {
        id: 6,
        sender: "other",
        text: "Can we meet at the sqare at 10.00?.",
        time: "09:20",
      },
      { id: 7, sender: "me", text: "Sure! I'll be there", time: "09:25" },
    ],
  };

  const currentChat = chats.find((c) => c.id === selectedChatId);
  const chatMessages = selectedChatId ? chatMessagesById[selectedChatId] ?? [] : [];

  const getLastMessageText = (chatId: string): string => {
    const msgs = chatMessagesById[chatId];
    if (!msgs || msgs.length === 0) return "";
    return msgs[msgs.length - 1].text;
  };

  const quickReplies = [
    "We can meet at the Central Building reception desk.",
    "Can you confirm it is really yours?",
    "Do you have a photo of the item?",
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Here you would normally push the new message to state or backend.
      setMessage("");
    }
  };

  // Scroll to last message when opening a chat or when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatId, chatMessages.length]);

  // LIST VIEW (no chat selected)
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
          {chats.map((chat) => {
            const lastMessage = getLastMessageText(chat.id);
            return (
              <Card
                key={chat.id}
                className="p-4 mb-3 shadow-card border-0 transition-smooth hover:shadow-elevated cursor-pointer"
                onClick={() => navigate(`/messages?chat=${chat.id}`)}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {chat.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-foreground truncate">{chat.name}</h3>
                      <span className="text-xs text-muted-foreground">{chat.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1 truncate">
                      {chat.item} · Lost item
                    </p>
                    <p className="text-sm text-foreground truncate">
                      {lastMessage || "No messages yet"}
                    </p>
                  </div>
                  {chat.unread > 0 && (
                    <div className="w-6 h-6 rounded-full bg-destructive text-white text-xs flex items-center justify-center flex-shrink-0">
                      {chat.unread}
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        <Footer />
        <BottomNav />
      </div>
    );
  }

  // CHAT VIEW (chat selected)
  const lastMessageInCurrentChat =
    chatMessages.length > 0 ? chatMessages[chatMessages.length - 1].text : "";

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      <header className="gradient-primary text-primary-foreground p-4 shadow-elevated">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <button onClick={() => navigate("/messages")}>
            <ArrowLeft className="w-6 h-6 text-primary-foreground" />
          </button>
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground">
              {currentChat?.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
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
            className={`flex mb-4 ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                msg.sender === "me"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <p
                className={`text-xs mt-1 ${
                  msg.sender === "me"
                    ? "text-primary-foreground/70"
                    : "text-muted-foreground"
                }`}
              >
                {msg.time}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
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
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type a message..."
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
