import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MessageCircle,
  Send,
  Paperclip,
  Search,
  MoreVertical,
  Phone,
  Video,
  Users,
} from "lucide-react";

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: string;
  type: "text" | "file" | "image";
  status: "sent" | "delivered" | "seen";
}

interface ChatThread {
  id: string;
  partnerId: string;
  partnerName: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  avatar?: string;
}

const mockChatThreads: ChatThread[] = [
  {
    id: "1",
    partnerId: "ALC001",
    partnerName: "ABC Learning Center",
    lastMessage: "Thank you for the quick response!",
    lastMessageTime: "2024-01-20 10:30",
    unreadCount: 2,
    isOnline: true,
    avatar: "/placeholder.svg",
  },
  {
    id: "2",
    partnerId: "ALC002",
    partnerName: "XYZ Education Hub",
    lastMessage: "When will the next batch start?",
    lastMessageTime: "2024-01-20 09:15",
    unreadCount: 0,
    isOnline: false,
    avatar: "/placeholder.svg",
  },
  {
    id: "3",
    partnerId: "ALC003",
    partnerName: "Tech Skills Institute",
    lastMessage: "Student enrollment documents attached",
    lastMessageTime: "2024-01-19 16:45",
    unreadCount: 5,
    isOnline: true,
    avatar: "/placeholder.svg",
  },
];

const mockMessages: ChatMessage[] = [
  {
    id: "1",
    senderId: "ALC001",
    senderName: "ABC Learning Center",
    message: "Hello! I need help with student enrollment process.",
    timestamp: "2024-01-20 10:00",
    type: "text",
    status: "seen",
  },
  {
    id: "2",
    senderId: "super-admin",
    senderName: "Super Admin",
    message:
      "Hi! I'll be happy to help you with that. What specific issue are you facing?",
    timestamp: "2024-01-20 10:05",
    type: "text",
    status: "seen",
  },
  {
    id: "3",
    senderId: "ALC001",
    senderName: "ABC Learning Center",
    message: "The application form is not submitting for some students.",
    timestamp: "2024-01-20 10:07",
    type: "text",
    status: "seen",
  },
  {
    id: "4",
    senderId: "super-admin",
    senderName: "Super Admin",
    message:
      "Let me check the system. Can you share the enrollment numbers that are having issues?",
    timestamp: "2024-01-20 10:10",
    type: "text",
    status: "seen",
  },
  {
    id: "5",
    senderId: "ALC001",
    senderName: "ABC Learning Center",
    message: "WD2024001, DS2024003, UI2024005",
    timestamp: "2024-01-20 10:12",
    type: "text",
    status: "delivered",
  },
];

export default function LiveChat() {
  const [chatThreads] = useState<ChatThread[]>(mockChatThreads);
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [selectedThread, setSelectedThread] = useState<ChatThread | null>(
    chatThreads[0],
  );
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredThreads = chatThreads.filter((thread) =>
    thread.partnerName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedThread) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      senderId: "super-admin",
      senderName: "Super Admin",
      message: newMessage,
      timestamp: new Date().toISOString(),
      type: "text",
      status: "sent",
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return "✓";
      case "delivered":
        return "✓✓";
      case "seen":
        return "✓✓";
      default:
        return "";
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Live Chat
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Real-time communication with partners
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Chat Threads List */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5" />
              <span>Conversations</span>
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-350px)]">
              {filteredThreads.map((thread) => (
                <div
                  key={thread.id}
                  className={`p-4 border-b border-gray-200 cursor-pointer transition-colors ${
                    selectedThread?.id === thread.id
                      ? "bg-blue-50 border-blue-200"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedThread(thread)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={thread.avatar}
                          alt={thread.partnerName}
                        />
                        <AvatarFallback>
                          {thread.partnerName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {thread.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {thread.partnerName}
                        </h4>
                        <span className="text-xs text-gray-500">
                          {formatTime(thread.lastMessageTime)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-gray-600 truncate">
                          {thread.lastMessage}
                        </p>
                        {thread.unreadCount > 0 && (
                          <Badge className="ml-2 min-w-[20px] h-5 text-xs">
                            {thread.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2 flex flex-col">
          {selectedThread ? (
            <>
              {/* Chat Header */}
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={selectedThread.avatar}
                          alt={selectedThread.partnerName}
                        />
                        <AvatarFallback>
                          {selectedThread.partnerName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {selectedThread.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {selectedThread.partnerName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {selectedThread.isOnline ? "Online" : "Offline"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-[calc(100vh-450px)] p-4">
                  <div className="space-y-4">
                    {messages.map((message) => {
                      const isFromAdmin = message.senderId === "super-admin";
                      return (
                        <div
                          key={message.id}
                          className={`flex ${
                            isFromAdmin ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg px-3 py-2 ${
                              isFromAdmin
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 text-gray-900"
                            }`}
                          >
                            <p className="text-sm">{message.message}</p>
                            <div
                              className={`flex items-center justify-between mt-1 text-xs ${
                                isFromAdmin ? "text-blue-100" : "text-gray-500"
                              }`}
                            >
                              <span>{formatTime(message.timestamp)}</span>
                              {isFromAdmin && (
                                <span
                                  className={`ml-2 ${
                                    message.status === "seen"
                                      ? "text-blue-200"
                                      : "text-blue-300"
                                  }`}
                                >
                                  {getStatusIcon(message.status)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </CardContent>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        sendMessage();
                      }
                    }}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Select a conversation
                </h3>
                <p className="text-gray-500">
                  Choose a partner from the list to start chatting
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Chat Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-xs font-medium text-gray-600">
                  Total Conversations
                </p>
                <p className="text-lg font-bold">{chatThreads.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-xs font-medium text-gray-600">
                  Online Partners
                </p>
                <p className="text-lg font-bold">
                  {chatThreads.filter((t) => t.isOnline).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Badge className="h-5 w-5 bg-red-500" />
              <div>
                <p className="text-xs font-medium text-gray-600">
                  Unread Messages
                </p>
                <p className="text-lg font-bold">
                  {chatThreads.reduce((sum, t) => sum + t.unreadCount, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-xs font-medium text-gray-600">
                  Messages Today
                </p>
                <p className="text-lg font-bold">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
