"use client";

import React, { useState, useEffect } from "react";
import { 
  MessageCircle, 
  Phone, 
  Clock,
  CheckCheck,
  User,
  AlertCircle
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  timestamp: string;
  sender: "customer" | "agent";
  status?: "sent" | "delivered" | "read";
}

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
    assignedAgent: "Sarah"
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
    assignedAgent: "Omar"
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
    assignedAgent: "Fatima"
  },
  {
    id: "4",
    name: "Zara Khalid",
    company: "Sharjah Innovations",
    avatar: "ZK",
    lastMessage: "Hi, interested in your WhatsApp CRM",
    timestamp: "22 min ago",
    unreadCount: 3,
    priority: "medium",
    status: "new"
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
    assignedAgent: "Alex"
  }
];

const conversationMessages: { [key: string]: Message[] } = {
  "1": [
    {
      id: "1-1",
      text: "Hi! I need help setting up a CRM system for my team of 20 people",
      timestamp: "14:30",
      sender: "customer",
      status: "delivered"
    },
    {
      id: "1-2", 
      text: "Hello Ahmed! I'm Sarah from our sales team. I'd be happy to help you. What's your main challenge with customer management right now?",
      timestamp: "14:32",
      sender: "agent",
      status: "read"
    },
    {
      id: "1-3",
      text: "We're losing track of leads from different channels. WhatsApp, email, phone calls - it's chaos!",
      timestamp: "14:35",
      sender: "customer", 
      status: "delivered"
    },
    {
      id: "1-4",
      text: "I completely understand! Our WhatsApp CRM consolidates all channels into one team inbox. Can you help with team management?",
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
  "2": [
    {
      id: "2-1",
      text: "Hello! I saw your WhatsApp CRM solution. Can you tell me about pricing?",
      timestamp: "13:45",
      sender: "customer",
      status: "delivered"
    },
    {
      id: "2-2",
      text: "Hi Layla! I'm Omar from XMA Agency. Our pricing depends on team size and features. How many team members would be using the system?",
      timestamp: "13:50",
      sender: "agent", 
      status: "read"
    },
    {
      id: "2-3",
      text: "We have about 12 people handling customer inquiries across different departments",
      timestamp: "13:55",
      sender: "customer",
      status: "delivered"
    },
    {
      id: "2-4",
      text: "Perfect! For a 12-person team, our Professional plan would be ideal. I'll send the pricing details now",
      timestamp: "13:58",
      sender: "agent",
      status: "read"
    }
  ],
  "3": [
    {
      id: "3-1",
      text: "Good morning! I'm interested in scheduling a demo for your CRM solution",
      timestamp: "12:20",
      sender: "customer",
      status: "delivered"
    },
    {
      id: "3-2",
      text: "Good morning Mohammed! I'm Fatima from our demo team. I'd love to show you how our system works. What times work best for you?",
      timestamp: "12:25",
      sender: "agent",
      status: "read"
    },
    {
      id: "3-3", 
      text: "Tomorrow afternoon would be great. Around 3 PM?",
      timestamp: "12:30",
      sender: "customer",
      status: "delivered"
    },
    {
      id: "3-4",
      text: "Perfect! Tomorrow at 3 PM works. I'll send you a calendar invite with the demo link",
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
  "4": [
    {
      id: "4-1",
      text: "Hi there! I found your website and I'm interested in your WhatsApp CRM solution",
      timestamp: "13:15",
      sender: "customer",
      status: "delivered"
    },
    {
      id: "4-2",
      text: "We handle a lot of customer inquiries and need better organization",
      timestamp: "13:16",
      sender: "customer",
      status: "delivered"
    },
    {
      id: "4-3",
      text: "Can someone please help me understand how this works?",
      timestamp: "13:25",
      sender: "customer",
      status: "delivered"
    }
  ],
  "5": [
    {
      id: "5-1",
      text: "Hello! I'd like to book a consultation for our growing business",
      timestamp: "12:00",
      sender: "customer",
      status: "delivered"
    },
    {
      id: "5-2",
      text: "Hi Omar! I'm Alex from our consultation team. What kind of business are you running?",
      timestamp: "12:10",
      sender: "agent",
      status: "read"
    },
    {
      id: "5-3",
      text: "We provide home maintenance services across Al Ain. Growing fast and need better customer management",
      timestamp: "12:15",
      sender: "customer",
      status: "delivered"
    },
    {
      id: "5-4",
      text: "That's fantastic! Let me check our availability for a consultation call",
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

export const WhatsAppInboxDemo: React.FC = () => {
  const [customers] = useState(initialCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]);
  const [messages, setMessages] = useState(conversationMessages[customers[0].id] || []);

  useEffect(() => {
    // Update messages when customer selection changes
    setMessages(conversationMessages[selectedCustomer?.id] || []);
  }, [selectedCustomer]);

  return (
    <div className="w-full h-full bg-white dark:bg-zinc-900 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-emerald-500 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-6 h-6" />
            <div>
              <h3 className="font-semibold text-lg">Conversations</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="flex min-h-[800px]">
        {/* Customer List */}
        <div className="w-2/5 border-r border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800">
          <div className="p-3 border-b border-slate-200 dark:border-zinc-700">
            <h4 className="font-medium text-slate-900 dark:text-white">Conversations</h4>
          </div>
          
          <div className="overflow-y-auto">
            {customers.map((customer) => (
              <div
                key={customer.id}
                onClick={() => setSelectedCustomer(customer)}
                className={`p-3 border-b border-slate-100 dark:border-zinc-700 cursor-pointer hover:bg-white dark:hover:bg-zinc-700 transition-colors ${
                  selectedCustomer?.id === customer.id ? "bg-white dark:bg-zinc-700" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center text-white font-medium text-sm relative">
                    {customer.avatar}
                    {customer.unreadCount > 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
                        {customer.unreadCount}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="font-medium text-slate-900 dark:text-white text-sm truncate">
                        {customer.name}
                      </h5>
                      <div className="flex items-center gap-1">
                        <div className={`px-1.5 py-0.5 rounded text-xs ${getPriorityColor(customer.priority)}`}>
                          {customer.priority}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-xs text-slate-600 dark:text-zinc-400 mb-1">
                      {customer.company}
                    </p>
                    
                    <p className="text-xs text-slate-500 dark:text-zinc-500 truncate mb-1">
                      {customer.lastMessage}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400 dark:text-zinc-500">
                        {customer.timestamp}
                      </span>
                      <div className={`px-2 py-0.5 rounded text-xs ${getStatusColor(customer.status)}`}>
                        {customer.assignedAgent ? `${customer.status} • ${customer.assignedAgent}` : customer.status}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center text-white font-medium">
                  {selectedCustomer?.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    {selectedCustomer?.name}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-zinc-400">
                    {selectedCustomer?.company} • {selectedCustomer?.status}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-slate-400 cursor-pointer hover:text-emerald-500" />
                <User className="w-5 h-5 text-slate-400 cursor-pointer hover:text-emerald-500" />
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-slate-50 dark:bg-zinc-800">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.sender === "agent" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl ${
                    message.sender === "agent"
                      ? "bg-emerald-500 text-white rounded-br-sm"
                      : "bg-white dark:bg-zinc-700 text-slate-900 dark:text-white border border-slate-200 dark:border-zinc-600 rounded-bl-sm"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <div className={`flex items-center gap-1 mt-1 justify-end ${
                    message.sender === "agent" ? "text-emerald-100" : "text-slate-400 dark:text-zinc-500"
                  }`}>
                    <span className="text-xs">{message.timestamp}</span>
                    {message.sender === "agent" && (
                      <CheckCheck className="w-3 h-3" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppInboxDemo;
