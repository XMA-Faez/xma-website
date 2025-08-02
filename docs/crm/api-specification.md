# API Specification - CRM Solution Page

## Overview

This document defines the REST API endpoints required for the CRM solution page interactive features, including ROI calculation, lead capture, assessment tools, and content management integration.

## Base Configuration

### Base URL
- **Development**: `http://localhost:3000/api`
- **Production**: `https://xma.ae/api`

### Authentication
- **Type**: API Key (for internal requests)
- **Header**: `X-API-Key: {api_key}`
- **Rate Limiting**: 100 requests per minute per IP

### Content Type
- **Request**: `application/json`
- **Response**: `application/json`

### Standard Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "email",
      "issue": "Invalid email format"
    }
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## Lead Management API

### Create Lead
Captures lead information from various forms and interactive tools.

**Endpoint**: `POST /api/leads`

**Request Body**:
```json
{
  "email": "ahmed@company.ae",
  "companyName": "Premium Auto Services",
  "industry": "automotive",
  "employeesCount": 25,
  "monthlyLeads": 150,
  "currentTools": ["whatsapp", "excel", "email"],
  "painPoints": ["lost_leads", "slow_response", "no_tracking"],
  "assessmentScore": 75,
  "roiCalculation": {
    "businessSize": "medium",
    "currentConversionRate": 15,
    "projectedImprovement": 35,
    "monthlySavings": 2500,
    "yearlyROI": 30000
  },
  "locale": "en",
  "source": "roi_calculator",
  "utmSource": "google",
  "utmMedium": "cpc",
  "utmCampaign": "crm_solution"
}
```

**Validation Schema**:
```typescript
const createLeadSchema = z.object({
  email: z.string().email(),
  companyName: z.string().min(2).max(100).optional(),
  industry: z.enum(['automotive', 'beauty', 'real_estate', 'home_services', 'other']).optional(),
  employeesCount: z.number().int().min(1).max(1000).optional(),
  monthlyLeads: z.number().int().min(1).max(10000).optional(),
  currentTools: z.array(z.string()).optional(),
  painPoints: z.array(z.string()).optional(),
  assessmentScore: z.number().int().min(0).max(100).optional(),
  roiCalculation: z.object({
    businessSize: z.enum(['small', 'medium', 'large']),
    currentConversionRate: z.number().min(0).max(100),
    projectedImprovement: z.number().min(0),
    monthlySavings: z.number().min(0),
    yearlyROI: z.number().min(0)
  }).optional(),
  locale: z.enum(['en', 'ar']).default('en'),
  source: z.string().max(50),
  utmSource: z.string().max(100).optional(),
  utmMedium: z.string().max(100).optional(),
  utmCampaign: z.string().max(100).optional()
});
```

**Response**:
```json
{
  "success": true,
  "data": {
    "leadId": "clp123abc456def789",
    "email": "ahmed@company.ae",
    "createdAt": "2024-01-15T10:30:00Z",
    "nextSteps": {
      "bookDemo": "https://xma.ae/book?lead_id=clp123abc456def789",
      "whatsappChat": "https://wa.me/971501234567?text=Hi%20I%27m%20interested%20in%20the%20CRM%20solution"
    }
  },
  "message": "Lead created successfully"
}
```

**Status Codes**:
- `201`: Lead created successfully
- `400`: Invalid input data
- `409`: Email already exists
- `429`: Rate limit exceeded
- `500`: Internal server error

### Get Lead by ID
Retrieves lead information for follow-up processes.

**Endpoint**: `GET /api/leads/{leadId}`

**Parameters**:
- `leadId` (string): Unique lead identifier

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "clp123abc456def789",
    "email": "ahmed@company.ae",
    "companyName": "Premium Auto Services",
    "industry": "automotive",
    "assessmentScore": 75,
    "roiCalculation": {
      "monthlySavings": 2500,
      "yearlyROI": 30000
    },
    "createdAt": "2024-01-15T10:30:00Z",
    "interactions": [
      {
        "type": "roi_calculation",
        "timestamp": "2024-01-15T10:25:00Z"
      },
      {
        "type": "assessment_completed",
        "timestamp": "2024-01-15T10:28:00Z"
      }
    ]
  }
}
```

## ROI Calculator API

### Calculate ROI
Performs ROI calculations based on business parameters.

**Endpoint**: `POST /api/calculator/roi`

**Request Body**:
```json
{
  "businessSize": "medium",
  "industry": "automotive",
  "monthlyLeads": 150,
  "currentConversionRate": 15,
  "averageOrderValue": 800,
  "currentTools": ["whatsapp", "excel"],
  "teamSize": 5,
  "responseTime": 180,
  "workingHours": 8
}
```

**Validation Schema**:
```typescript
const roiCalculationSchema = z.object({
  businessSize: z.enum(['small', 'medium', 'large']),
  industry: z.enum(['automotive', 'beauty', 'real_estate', 'home_services', 'other']),
  monthlyLeads: z.number().int().min(1).max(10000),
  currentConversionRate: z.number().min(0).max(100),
  averageOrderValue: z.number().min(10).max(100000),
  currentTools: z.array(z.string()),
  teamSize: z.number().int().min(1).max(100),
  responseTime: z.number().int().min(1), // minutes
  workingHours: z.number().int().min(1).max(24)
});
```

**Response**:
```json
{
  "success": true,
  "data": {
    "inputs": {
      "businessSize": "medium",
      "monthlyLeads": 150,
      "currentConversionRate": 15,
      "averageOrderValue": 800
    },
    "currentState": {
      "monthlyConversions": 22,
      "monthlyRevenue": 17600,
      "yearlyRevenue": 211200,
      "timeSpentOnLeads": 45,
      "leadsLost": 8
    },
    "projectedState": {
      "monthlyConversions": 38,
      "monthlyRevenue": 30400,
      "yearlyRevenue": 364800,
      "timeSpentOnLeads": 15,
      "leadsLost": 2
    },
    "improvements": {
      "conversionRateIncrease": 25.3,
      "additionalMonthlyRevenue": 12800,
      "additionalYearlyRevenue": 153600,
      "timeSaved": 30,
      "leadsRecovered": 6
    },
    "roi": {
      "monthlySavings": 2650,
      "yearlySavings": 31800,
      "roiPercentage": 318,
      "paybackPeriod": 2.1,
      "breakEvenMonth": 3
    },
    "chartData": [
      {
        "month": "Month 1",
        "current": 17600,
        "projected": 30400,
        "savings": 12800
      },
      {
        "month": "Month 2",
        "current": 17600,
        "projected": 30400,
        "savings": 12800
      }
    ],
    "recommendations": [
      {
        "title": "Implement AI Chatbot",
        "description": "24/7 automated responses to capture more leads",
        "impact": "high",
        "timeToImplement": "1 week"
      },
      {
        "title": "WhatsApp Business Integration",
        "description": "Centralize communication in one platform",
        "impact": "high",
        "timeToImplement": "2 days"
      }
    ]
  }
}
```

**Caching**: Results cached for 1 hour with Redis key pattern: `roi:${hash(inputs)}`

### Get Industry Benchmarks
Provides industry-specific benchmarks for ROI calculations.

**Endpoint**: `GET /api/calculator/benchmarks?industry={industry}&size={businessSize}`

**Parameters**:
- `industry` (string): Business industry
- `businessSize` (string): Company size category

**Response**:
```json
{
  "success": true,
  "data": {
    "industry": "automotive",
    "businessSize": "medium",
    "benchmarks": {
      "averageConversionRate": 18.5,
      "averageOrderValue": 750,
      "averageResponseTime": 120,
      "leadLossRate": 35,
      "customerAcquisitionCost": 85
    },
    "industryInsights": [
      "Automotive businesses typically see 40% more leads during winter months",
      "WhatsApp is the preferred communication channel for 85% of UAE automotive customers"
    ]
  }
}
```

## Assessment Tool API

### Business Assessment
Evaluates business readiness for CRM implementation.

**Endpoint**: `POST /api/assessment/business`

**Request Body**:
```json
{
  "responses": [
    {
      "questionId": "q1_lead_volume",
      "answer": "150",
      "type": "number"
    },
    {
      "questionId": "q2_current_tools",
      "answer": ["whatsapp", "excel", "email"],
      "type": "multiple_choice"
    },
    {
      "questionId": "q3_team_size",
      "answer": "5",
      "type": "number"
    },
    {
      "questionId": "q4_pain_points",
      "answer": ["lost_leads", "slow_response", "no_tracking"],
      "type": "multiple_choice"
    },
    {
      "questionId": "q5_budget_range",
      "answer": "1000-2500",
      "type": "single_choice"
    },
    {
      "questionId": "q6_timeline",
      "answer": "within_month",
      "type": "single_choice"
    }
  ],
  "locale": "en"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "assessmentId": "assess_123abc456def789",
    "overallScore": 78,
    "categoryScores": {
      "readiness": 85,
      "urgency": 70,
      "fitScore": 80,
      "budgetAlignment": 75
    },
    "results": {
      "status": "high_potential",
      "priority": "hot_lead",
      "recommendedPlan": "professional",
      "estimatedImplementationTime": "2-3 weeks"
    },
    "insights": [
      {
        "category": "strengths",
        "points": [
          "Strong lead volume indicates active business",
          "Team size perfect for CRM adoption",
          "Clear pain points align with solution benefits"
        ]
      },
      {
        "category": "opportunities",
        "points": [
          "Current tools fragmentation causing lead loss",
          "Manual processes taking excessive time",
          "No automated follow-up system"
        ]
      },
      {
        "category": "recommendations",
        "points": [
          "Start with WhatsApp integration for immediate impact",
          "Implement automated lead scoring",
          "Set up team collaboration features"
        ]
      }
    ],
    "nextSteps": [
      {
        "action": "book_demo",
        "title": "Schedule Live Demo",
        "description": "See how the CRM handles your specific use cases",
        "priority": "high"
      },
      {
        "action": "roi_calculation",
        "title": "Calculate Your ROI",
        "description": "Get detailed financial projections",
        "priority": "medium"
      }
    ]
  }
}
```

### Get Assessment Questions
Retrieves assessment questions based on industry and locale.

**Endpoint**: `GET /api/assessment/questions?industry={industry}&locale={locale}`

**Response**:
```json
{
  "success": true,
  "data": {
    "questions": [
      {
        "id": "q1_lead_volume",
        "type": "number",
        "title": "How many leads do you receive monthly?",
        "description": "Include all channels: WhatsApp, calls, emails, walk-ins",
        "required": true,
        "validation": {
          "min": 1,
          "max": 10000
        },
        "category": "volume"
      },
      {
        "id": "q2_current_tools",
        "type": "multiple_choice",
        "title": "What tools do you currently use for lead management?",
        "options": [
          {
            "value": "whatsapp",
            "label": "WhatsApp",
            "popular": true
          },
          {
            "value": "excel",
            "label": "Excel Spreadsheets"
          },
          {
            "value": "email",
            "label": "Email"
          },
          {
            "value": "crm",
            "label": "CRM Software"
          },
          {
            "value": "none",
            "label": "No formal system"
          }
        ],
        "required": true,
        "category": "tools"
      }
    ],
    "categories": {
      "volume": "Lead Volume",
      "tools": "Current Tools",
      "pain_points": "Pain Points",
      "budget": "Budget & Timeline"
    },
    "estimatedTime": "3-5 minutes"
  }
}
```

## WhatsApp Simulator API

### Start Simulation
Initiates a WhatsApp conversation simulation.

**Endpoint**: `POST /api/simulator/whatsapp/start`

**Request Body**:
```json
{
  "scenario": "appointment_booking",
  "businessType": "automotive",
  "language": "en",
  "customerProfile": {
    "name": "Ahmed",
    "serviceNeeded": "car_repair",
    "urgency": "high"
  }
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "simulationId": "sim_123abc456def789",
    "initialMessage": {
      "id": "msg_001",
      "sender": "customer",
      "text": "Hi, I need to repair my car's air conditioning. Can you help?",
      "timestamp": "2024-01-15T10:30:00Z"
    },
    "aiResponse": {
      "id": "msg_002",
      "sender": "ai_bot",
      "text": "Hello Ahmed! I'd be happy to help you with your AC repair. What type of car do you have and what seems to be the issue?",
      "timestamp": "2024-01-15T10:30:05Z",
      "confidence": 0.95,
      "intent": "service_inquiry"
    },
    "suggestedResponses": [
      "My car is a 2019 Toyota Camry",
      "The AC is not cooling properly",
      "How much would it cost?"
    ]
  }
}
```

### Continue Conversation
Processes user input and returns AI response.

**Endpoint**: `POST /api/simulator/whatsapp/message`

**Request Body**:
```json
{
  "simulationId": "sim_123abc456def789",
  "message": {
    "text": "My car is a 2019 Toyota Camry, AC not cooling",
    "sender": "customer"
  }
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "aiResponse": {
      "id": "msg_003",
      "sender": "ai_bot",
      "text": "Thank you for the details! A 2019 Camry AC issue is typically related to refrigerant levels or compressor problems. I can book you an appointment for a diagnostic check. Are you available tomorrow between 9 AM - 5 PM?",
      "timestamp": "2024-01-15T10:30:10Z",
      "actions": [
        {
          "type": "calendar_availability",
          "data": {
            "service": "ac_diagnostic",
            "duration": 60,
            "price": 150
          }
        }
      ]
    },
    "conversationProgress": {
      "stage": "appointment_booking",
      "completionPercentage": 75,
      "nextExpectedIntent": "schedule_confirmation"
    },
    "suggestedResponses": [
      "Yes, tomorrow at 10 AM works",
      "Can you do it today?",
      "What's included in the diagnostic?"
    ]
  }
}
```

### Get Conversation History
Retrieves complete conversation for display.

**Endpoint**: `GET /api/simulator/whatsapp/{simulationId}/history`

**Response**:
```json
{
  "success": true,
  "data": {
    "simulationId": "sim_123abc456def789",
    "scenario": "appointment_booking",
    "messages": [
      {
        "id": "msg_001",
        "sender": "customer",
        "text": "Hi, I need to repair my car's air conditioning. Can you help?",
        "timestamp": "2024-01-15T10:30:00Z"
      },
      {
        "id": "msg_002",
        "sender": "ai_bot",
        "text": "Hello Ahmed! I'd be happy to help you with your AC repair...",
        "timestamp": "2024-01-15T10:30:05Z",
        "metadata": {
          "confidence": 0.95,
          "intent": "service_inquiry",
          "entities": ["car_repair", "air_conditioning"]
        }
      }
    ],
    "analytics": {
      "totalMessages": 8,
      "averageResponseTime": 3.2,
      "customerSatisfactionScore": 4.8,
      "appointmentBooked": true,
      "leadQualified": true
    }
  }
}
```

## Content Management API

### Get Localized Content
Retrieves page content from Contentful with fallback support.

**Endpoint**: `GET /api/content/crm-page?locale={locale}`

**Response**:
```json
{
  "success": true,
  "data": {
    "hero": {
      "title": "Stop Losing WhatsApp Leads to Poor Follow-Up",
      "subtitle": "The AI-powered CRM with advanced chatbot that connects WhatsApp...",
      "videoUrl": "https://videos.ctfassets.net/hero-video.mp4",
      "ctaButtons": [
        {
          "text": "Book Free Demo",
          "href": "/book",
          "variant": "primary"
        },
        {
          "text": "Chat on WhatsApp",
          "href": "https://wa.me/971501234567",
          "variant": "secondary"
        }
      ]
    },
    "features": [
      {
        "id": "whatsapp_integration",
        "title": "WhatsApp Business Integration",
        "description": "Connect your WhatsApp Business account and automate responses...",
        "icon": "message-square",
        "highlights": [
          "Two-way WhatsApp messaging",
          "Automated welcome messages",
          "Quick reply templates"
        ],
        "demoVideo": "https://videos.ctfassets.net/whatsapp-demo.mp4"
      }
    ],
    "testimonials": [
      {
        "name": "Ahmed Al Rashid",
        "business": "Premium Auto Services",
        "rating": 5,
        "text": "The AI chatbot handles customer questions better than my staff.",
        "industry": "automotive",
        "results": {
          "aiResponseRate": "100%",
          "autoBookings": "90%",
          "coverage": "24/7"
        }
      }
    ],
    "metadata": {
      "title": "AI-Powered CRM Solution for UAE Businesses | XMA",
      "description": "Transform your WhatsApp leads into paying customers with our AI chatbot CRM...",
      "keywords": ["CRM", "WhatsApp", "AI chatbot", "UAE business"],
      "lastUpdated": "2024-01-15T08:00:00Z"
    }
  }
}
```

## Analytics & Tracking API

### Track Page Interaction
Records user interactions for optimization analysis.

**Endpoint**: `POST /api/analytics/interaction`

**Request Body**:
```json
{
  "sessionId": "sess_123abc456def789",
  "component": "roi_calculator",
  "action": "calculation_completed",
  "data": {
    "businessSize": "medium",
    "calculationTime": 45,
    "roiResult": 318,
    "leadCaptured": true
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "userAgent": "Mozilla/5.0...",
  "referrer": "https://google.com"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Interaction tracked successfully"
}
```

### Get Analytics Dashboard
Retrieves performance metrics for the CRM page.

**Endpoint**: `GET /api/analytics/dashboard?period={period}&metric={metric}`

**Parameters**:
- `period`: `day`, `week`, `month`, `quarter`
- `metric`: `conversions`, `interactions`, `performance`

**Response**:
```json
{
  "success": true,
  "data": {
    "period": "week",
    "metrics": {
      "pageViews": 1247,
      "uniqueVisitors": 892,
      "bounceRate": 0.32,
      "averageTimeOnPage": 156,
      "conversionRate": 0.085
    },
    "interactions": {
      "roiCalculatorUsage": 234,
      "whatsappSimulatorUsage": 189,
      "assessmentCompletions": 167,
      "demoBookings": 78
    },
    "leadQuality": {
      "totalLeads": 106,
      "qualifiedLeads": 89,
      "averageAssessmentScore": 72,
      "highPotentialLeads": 34
    },
    "performance": {
      "averageLoadTime": 2.3,
      "lighthouseScore": 92,
      "coreWebVitals": {
        "fcp": 1.2,
        "lcp": 2.1,
        "cls": 0.08,
        "fid": 45
      }
    }
  }
}
```

## Error Handling

### Standard HTTP Status Codes
- `200`: Success
- `201`: Created successfully  
- `400`: Bad request / Validation error
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Resource not found
- `409`: Conflict (duplicate resource)
- `422`: Unprocessable entity
- `429`: Rate limit exceeded
- `500`: Internal server error
- `503`: Service unavailable

### Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": {
      "field": "email",
      "value": "invalid-email",
      "constraint": "Must be a valid email address",
      "received": "string",
      "expected": "email"
    }
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "requestId": "req_123abc456def789"
}
```

## Rate Limiting

### Limits by Endpoint
- **Lead Creation**: 5 requests per minute per IP
- **ROI Calculation**: 10 requests per minute per IP  
- **Assessment Submission**: 3 requests per minute per IP
- **WhatsApp Simulation**: 20 requests per minute per session
- **Content Retrieval**: 100 requests per minute per IP
- **Analytics Tracking**: 50 requests per minute per IP

### Rate Limit Headers
```
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 7
X-RateLimit-Reset: 1642248600
Retry-After: 60
```

## Security Considerations

### Input Validation
- All inputs validated with Zod schemas
- SQL injection prevention through Prisma ORM
- XSS protection with DOMPurify sanitization
- CSRF protection with Next.js tokens

### Data Privacy
- GDPR compliant data handling
- Email encryption at rest
- Personal data anonymization for analytics
- User consent tracking

### API Security
- Rate limiting per IP and endpoint
- Input sanitization and validation
- Secure headers (CORS, CSP, HSTS)
- API key authentication for internal requests

This API specification provides a comprehensive foundation for implementing all interactive features of the CRM solution page while maintaining security, performance, and scalability standards.