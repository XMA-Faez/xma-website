"use client";

import React, { useState, useEffect } from "react";
import { 
  MessageCircle, 
  Phone, 
  Clock,
  CheckCheck,
  User,
  AlertCircle,
  Mail,
  Instagram,
  Send,
  Paperclip,
  Smile
} from "lucide-react";
import { FaWhatsapp, FaSms, FaInstagram, FaEnvelope } from "react-icons/fa";

interface Message {
  id: string;
  text: string;
  timestamp: string;
  sender: "customer" | "agent";
  status?: "sent" | "delivered" | "read";
}

type ChannelType = "whatsapp" | "instagram" | "email" | "sms";

interface Customer {
  id: string;
  name: string;
  company: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  priority: "high" | "medium" | "low";
  status: "new" | "assigned" | "active" | "qualified";
  assignedAgent?: string;
  channel: ChannelType;
}

const initialCustomers: Customer[] = [
  {
    id: "1",
    name: "Ahmed Hassan",
    company: "Dubai Tech Solutions",
    avatar: "AH",
    lastMessage: "Can you help with team management?",
    timestamp: "2 min ago",
    unreadCount: 1,
    priority: "high",
    status: "active",
    assignedAgent: "Sarah",
    channel: "whatsapp"
  },
  {
    id: "2", 
    name: "Layla Al-Mansoori",
    company: "Emirates Digital",
    avatar: "LA",
    lastMessage: "Omar: I'll send the pricing details now",
    timestamp: "8 min ago", 
    unreadCount: 0,
    priority: "medium",
    status: "active",
    assignedAgent: "Omar",
    channel: "instagram"
  },
  {
    id: "3",
    name: "Mohammed Rashid", 
    company: "Abu Dhabi Holdings",
    avatar: "MR",
    lastMessage: "Perfect! Tomorrow at 3 PM works",
    timestamp: "15 min ago",
    unreadCount: 0,
    priority: "high", 
    status: "qualified",
    assignedAgent: "Fatima",
    channel: "email"
  },
  {
    id: "4",
    name: "Zara Khalid",
    company: "Sharjah Innovations",
    avatar: "ZK",
    lastMessage: "Hi, interested in your CRM solution",
    timestamp: "22 min ago",
    unreadCount: 3,
    priority: "medium",
    status: "new",
    channel: "sms"
  },
  {
    id: "5",
    name: "Omar Abdullah",
    company: "Al Ain Services",
    avatar: "OA",
    lastMessage: "Alex: Let me check our availability",
    timestamp: "1 hr ago",
    unreadCount: 0,
    priority: "low",
    status: "active",
    assignedAgent: "Alex",
    channel: "whatsapp"
  }
];

const conversationMessages: { [key: string]: Message[] } = {
  "1": [ // WhatsApp conversation
    {
      id: "1-1",
      text: "Hi! 👋 I need help setting up a CRM system for my team of 20 people",
      timestamp: "14:30",
      sender: "customer",
      status: "delivered"
    },
    {
      id: "1-2", 
      text: "Hello Ahmed! I'm Sarah from our sales team. I'd be happy to help you 😊 What's your main challenge with customer management right now?",
      timestamp: "14:32",
      sender: "agent",
      status: "read"
    },
    {
      id: "1-3",
      text: "We're losing track of leads from different channels. WhatsApp, email, phone calls - it's chaos! 😅",
      timestamp: "14:35",
      sender: "customer", 
      status: "delivered"
    },
    {
      id: "1-4",
      text: "I completely understand! Our Omni-Channel CRM consolidates all channels into one team inbox 📱💼",
      timestamp: "14:37",
      sender: "agent",
      status: "read"
    },
    {
      id: "1-5",
      text: "Can you help with team management?",
      timestamp: "14:39",
      sender: "customer",
      status: "delivered"
    }
  ],
  "2": [ // Instagram DM conversation
    {
      id: "2-1",
      text: "Hey! 💜 Saw your post about CRM solutions. Can you tell me about pricing? Love your content btw! ✨",
      timestamp: "13:45",
      sender: "customer",
      status: "delivered"
    },
    {
      id: "2-2",
      text: "Hi Layla! Thank you so much! 🙏 I'm Omar from XMA Agency. Our pricing depends on team size and features. How many team members would be using the system?",
      timestamp: "13:50",
      sender: "agent", 
      status: "read"
    },
    {
      id: "2-3",
      text: "We have about 12 people handling customer inquiries across different departments 👥",
      timestamp: "13:55",
      sender: "customer",
      status: "delivered"
    },
    {
      id: "2-4",
      text: "Perfect! For a 12-person team, our Professional plan would be ideal 🚀 I'll send the pricing details now",
      timestamp: "13:58",
      sender: "agent",
      status: "read"
    }
  ],
  "3": [ // Email conversation
    {
      id: "3-1",
      text: "Subject: Demo Request - CRM Solution\n\nGood morning,\n\nI'm interested in scheduling a demo for your CRM solution. We're looking for a comprehensive system to manage our customer relationships.\n\nBest regards,\nMohammed Rashid",
      timestamp: "12:20",
      sender: "customer",
      status: "delivered"
    },
    {
      id: "3-2",
      text: "Subject: Re: Demo Request - CRM Solution\n\nGood morning Mohammed,\n\nThank you for your interest! I'm Fatima from our demo team. I'd love to show you how our omni-channel system works.\n\nWhat times work best for you this week?\n\nBest regards,\nFatima Al-Zahra",
      timestamp: "12:25",
      sender: "agent",
      status: "read"
    },
    {
      id: "3-3", 
      text: "Tomorrow afternoon would be great. Around 3 PM would be perfect if available.",
      timestamp: "12:30",
      sender: "customer",
      status: "delivered"
    },
    {
      id: "3-4",
      text: "Perfect! Tomorrow at 3 PM works. I'll send you a calendar invite with the demo link shortly.\n\nLooking forward to showing you our platform!",
      timestamp: "12:32",
      sender: "agent",
      status: "read"
    },
    {
      id: "3-5",
      text: "Perfect! Tomorrow at 3 PM works",
      timestamp: "12:35",
      sender: "customer",
      status: "delivered"
    }
  ],
  "4": [ // SMS conversation
    {
      id: "4-1",
      text: "Hi! Found your website. Interested in your CRM solution for our business.",
      timestamp: "13:15",
      sender: "customer",
      status: "delivered"
    },
    {
      id: "4-2",
      text: "We handle lots of customer inquiries and need better organization.",
      timestamp: "13:16",
      sender: "customer",
      status: "delivered"
    },
    {
      id: "4-3",
      text: "Can someone help me understand how this works?",
      timestamp: "13:25",
      sender: "customer",
      status: "delivered"
    },
    {
      id: "4-4",
      text: "Hi Zara! This is Alex from XMA Agency. Happy to help! Our CRM unifies all channels - SMS, WhatsApp, email, etc. into one inbox. Would you like a quick demo?",
      timestamp: "13:30",
      sender: "agent",
      status: "delivered"
    }
  ],
  "5": [ // WhatsApp Business conversation
    {
      id: "5-1",
      text: "Hello! I'd like to book a consultation for our growing business 📈",
      timestamp: "12:00",
      sender: "customer",
      status: "delivered"
    },
    {
      id: "5-2",
      text: "Hi Omar! I'm Alex from our consultation team. What kind of business are you running? 🏢",
      timestamp: "12:10",
      sender: "agent",
      status: "read"
    },
    {
      id: "5-3",
      text: "We provide home maintenance services across Al Ain. Growing fast and need better customer management 🔧🏠",
      timestamp: "12:15",
      sender: "customer",
      status: "delivered"
    },
    {
      id: "5-4",
      text: "That's fantastic! 🎉 Let me check our availability for a consultation call",
      timestamp: "12:20",
      sender: "agent",
      status: "read"
    }
  ]
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high": return "bg-red-100 text-red-700 border-red-200";
    case "medium": return "bg-yellow-100 text-yellow-700 border-yellow-200"; 
    case "low": return "bg-green-100 text-green-700 border-green-200";
    default: return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "new": return "bg-blue-100 text-blue-700";
    case "assigned": return "bg-purple-100 text-purple-700";
    case "active": return "bg-green-100 text-green-700";
    case "qualified": return "bg-emerald-100 text-emerald-700";
    default: return "bg-gray-100 text-gray-700";
  }
};

const getChannelIcon = (channel: ChannelType) => {
  switch (channel) {
    case "whatsapp": return <FaWhatsapp className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />;
    case "instagram": return <FaInstagram className="w-3 h-3 sm:w-4 sm:h-4 text-pink-600" />;
    case "email": return <FaEnvelope className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />;
    case "sms": return <FaSms className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />;
    default: return <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />;
  }
};

const getChannelColor = (channel: ChannelType) => {
  switch (channel) {
    case "whatsapp": return "from-green-500 to-green-600";
    case "instagram": return "from-pink-500 to-purple-600";
    case "email": return "from-blue-500 to-blue-600";
    case "sms": return "from-gray-500 to-gray-600";
    default: return "from-emerald-500 to-green-500";
  }
};

const WhatsAppInboxDemo: React.FC = () => {
  const [customers] = useState(initialCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]);
  const [messages, setMessages] = useState(conversationMessages[customers[0].id] || []);
  const [isMobile, setIsMobile] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Update messages when customer selection changes
    setMessages(conversationMessages[selectedCustomer?.id] || []);
  }, [selectedCustomer]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
    if (isMobile) {
      setShowChat(true);
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedCustomer) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: "agent",
      status: "sent"
    };

    setMessages(prev => [...prev, newMsg]);
    setNewMessage("");
    setIsTyping(false);

    // Simulate customer typing and response after a delay
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        const customerReply: Message = {
          id: `msg-${Date.now()}-reply`,
          text: "Thanks for your message! I'll get back to you soon.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sender: "customer",
          status: "delivered"
        };
        setMessages(prev => [...prev, customerReply]);
        setIsTyping(false);
      }, 2000);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="w-full h-full bg-white dark:bg-zinc-900 rounded-lg sm:rounded-xl overflow-hidden max-h-[500px] sm:max-h-[600px] md:max-h-[900px]">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            <div>
              <h3 className="font-semibold text-base sm:text-lg">Omni-Channel Inbox</h3>
              <div className="flex items-center gap-1 sm:gap-2 mt-1">
                <FaWhatsapp className="w-3 h-3 text-green-200" />
                <FaInstagram className="w-3 h-3 text-pink-200" />
                <FaEnvelope className="w-3 h-3 text-blue-200" />
                <FaSms className="w-3 h-3 text-gray-200" />
              </div>
            </div>
          </div>
          {isMobile && showChat && (
            <button
              onClick={() => setShowChat(false)}
              className="text-white text-sm"
            >
              Back
            </button>
          )}
        </div>
      </div>

      <div className="flex h-full">
        {/* Customer List */}
        <div className={`${isMobile ? (showChat ? 'hidden' : 'w-full') : 'w-2/5'} sm:w-2/5 sm:block border-r border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800`}>
          <div className="p-2 sm:p-3 border-b border-slate-200 dark:border-zinc-700">
            <h4 className="font-medium text-sm sm:text-base text-slate-900 dark:text-white">Conversations</h4>
          </div>
          
          <div className="overflow-y-auto">
            {customers.map((customer) => (
              <div
                key={customer.id}
                onClick={() => handleCustomerSelect(customer)}
                className={`p-2 sm:p-3 border-b border-slate-100 dark:border-zinc-700 cursor-pointer hover:bg-white dark:hover:bg-zinc-700 transition-colors ${
                  selectedCustomer?.id === customer.id ? "bg-white dark:bg-zinc-700" : ""
                }`}
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="relative">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${getChannelColor(customer.channel)} flex items-center justify-center text-white font-medium text-xs sm:text-sm flex-shrink-0`}>
                      {customer.avatar}
                      {customer.unreadCount > 0 && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] sm:text-xs text-white">
                          {customer.unreadCount}
                        </div>
                      )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-white dark:bg-zinc-800 rounded-full p-0.5">
                      {getChannelIcon(customer.channel)}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5 sm:mb-1">
                      <h5 className="font-medium text-slate-900 dark:text-white text-xs sm:text-sm truncate">
                        {customer.name}
                      </h5>
                      <div className="flex items-center gap-1">
                        <div className={`px-1 sm:px-1.5 py-0.5 rounded text-[10px] sm:text-xs ${getPriorityColor(customer.priority)}`}>
                          {customer.priority}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-[10px] sm:text-xs text-slate-600 dark:text-zinc-400 mb-0.5 sm:mb-1">
                      {customer.company}
                    </p>
                    
                    <p className="text-[10px] sm:text-xs text-slate-500 dark:text-zinc-500 truncate mb-0.5 sm:mb-1">
                      {customer.lastMessage}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] sm:text-xs text-slate-400 dark:text-zinc-500">
                        {customer.timestamp}
                      </span>
                      <div className={`px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs ${getStatusColor(customer.status)}`}>
                        <span className="hidden sm:inline">
                          {customer.assignedAgent ? `${customer.status} • ${customer.assignedAgent}` : customer.status}
                        </span>
                        <span className="sm:hidden">
                          {customer.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`${isMobile ? (showChat ? 'flex-1' : 'hidden') : 'flex-1'} sm:flex sm:flex-1 flex-col`}>
          {/* Chat Header */}
          <div className="p-3 sm:p-4 border-b border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${getChannelColor(selectedCustomer?.channel || 'whatsapp')} flex items-center justify-center text-white font-medium text-xs sm:text-base`}>
                    {selectedCustomer?.avatar}
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-white dark:bg-zinc-800 rounded-full p-0.5">
                    {selectedCustomer && getChannelIcon(selectedCustomer.channel)}
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white truncate">
                    {selectedCustomer?.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 truncate">
                    {selectedCustomer?.company} • {selectedCustomer?.status}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-1 sm:gap-2">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 cursor-pointer hover:text-emerald-500" />
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 cursor-pointer hover:text-emerald-500" />
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 sm:p-4 overflow-y-auto bg-slate-50 dark:bg-zinc-800">
            {messages.map((message) => {
              const getMessageStyle = () => {
                if (message.sender === "agent") {
                  // Agent messages use channel colors
                  switch (selectedCustomer?.channel) {
                    case "whatsapp": return "bg-green-500 text-white";
                    case "instagram": return "bg-gradient-to-r from-pink-500 to-purple-600 text-white";
                    case "email": return "bg-blue-500 text-white";
                    case "sms": return "bg-gray-600 text-white";
                    default: return "bg-emerald-500 text-white";
                  }
                } else {
                  // Customer messages remain neutral
                  return "bg-white dark:bg-zinc-700 text-slate-900 dark:text-white border border-slate-200 dark:border-zinc-600";
                }
              };

              const getMessageShape = () => {
                if (selectedCustomer?.channel === "email") {
                  return "rounded-lg"; // More formal for emails
                } else {
                  return message.sender === "agent" ? "rounded-2xl rounded-br-sm" : "rounded-2xl rounded-bl-sm";
                }
              };

              return (
                <div
                  key={message.id}
                  className={`mb-3 sm:mb-4 flex ${message.sender === "agent" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[75%] sm:max-w-xs px-3 sm:px-4 py-1.5 sm:py-2 ${getMessageShape()} ${getMessageStyle()}`}>
                    <p className={`text-xs sm:text-sm ${selectedCustomer?.channel === "email" ? "whitespace-pre-line" : ""}`}>
                      {message.text}
                    </p>
                    <div className={`flex items-center gap-1 mt-0.5 sm:mt-1 justify-end ${
                      message.sender === "agent" ? "text-white/70" : "text-slate-400 dark:text-zinc-500"
                    }`}>
                      <span className="text-[10px] sm:text-xs">{message.timestamp}</span>
                      {message.sender === "agent" && selectedCustomer?.channel !== "email" && selectedCustomer?.channel !== "sms" && (
                        <CheckCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      )}
                      {message.sender === "agent" && selectedCustomer?.channel === "sms" && (
                        <span className="text-[10px]">Delivered</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="mb-3 sm:mb-4 flex justify-start">
                <div className="bg-white dark:bg-zinc-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl rounded-bl-sm border border-slate-200 dark:border-zinc-600">
                  <div className="flex items-center gap-1">
                    <div className="flex gap-0.5 sm:gap-1">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                    </div>
                    <span className="text-xs text-gray-500 ml-2">typing...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="border-t border-slate-200 dark:border-zinc-700 p-3 sm:p-4 bg-white dark:bg-zinc-900">
            <div className="flex items-end gap-2 sm:gap-3">
              {/* Attachment button */}
              <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300 transition-colors">
                <Paperclip className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Message Input */}
              <div className="flex-1 relative">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Type a message to ${selectedCustomer?.name}...`}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-10 sm:pr-12 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-600 rounded-lg sm:rounded-xl resize-none text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent max-h-20 sm:max-h-24"
                  rows={1}
                  style={{ 
                    height: 'auto',
                    minHeight: '40px'
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = target.scrollHeight + 'px';
                  }}
                />
                
                {/* Emoji button */}
                <button className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300 transition-colors">
                  <Smile className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Send button */}
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className={`p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all ${
                  newMessage.trim()
                    ? `${selectedCustomer?.channel === 'whatsapp' ? 'bg-green-500 hover:bg-green-600' : 
                        selectedCustomer?.channel === 'instagram' ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700' :
                        selectedCustomer?.channel === 'email' ? 'bg-blue-500 hover:bg-blue-600' :
                        'bg-gray-600 hover:bg-gray-700'} text-white shadow-lg`
                    : 'bg-slate-200 dark:bg-zinc-700 text-slate-400 dark:text-zinc-500 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppInboxDemo;
