
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageCircle, Phone, Mail, Video, HelpCircle, Book } from 'lucide-react';

const Help = () => {
  const faqs = [
    {
      question: "How do I add a new tenant?",
      answer: "Go to the Tenants page and click 'Add New Tenant'. Fill in their basic information, assign them to a room, and set their rent details. The system will guide you through each step."
    },
    {
      question: "How can I track rent payments?",
      answer: "Visit the Payments page to see all rent payments. You can filter by tenant, month, or payment status. Mark payments as received when tenants pay their rent."
    },
    {
      question: "How do I manage room occupancy?",
      answer: "Use the Rooms page to see the interactive floor plan. Each bed shows its current status - available, occupied, or reserved. Click on any bed to view details or book it for a new tenant."
    },
    {
      question: "Can I generate monthly reports?",
      answer: "Yes! Go to the Reports page where you can generate and download monthly revenue reports, occupancy analytics, and tenant demographics. Reports are automatically generated each month."
    },
    {
      question: "How do I set up payment reminders?",
      answer: "In Settings, enable SMS and WhatsApp notifications. The system will automatically send payment reminders to tenants when rent is due."
    },
    {
      question: "What if I forget my login details?",
      answer: "Click 'Forgot Password' on the login page. You'll receive an OTP on your registered mobile number to reset your password. No need to remember complex passwords!"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Help & Support</h2>
        <p className="text-slate-600">Get help with using PG Manager effectively</p>
      </div>

      {/* Quick Help Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
          <CardContent className="pt-6 text-center">
            <div className="p-3 bg-blue-100 rounded-lg w-fit mx-auto mb-3">
              <Video className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-medium text-slate-800 mb-1">Video Tutorials</h3>
            <p className="text-sm text-slate-500">Step-by-step guides</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
          <CardContent className="pt-6 text-center">
            <div className="p-3 bg-green-100 rounded-lg w-fit mx-auto mb-3">
              <MessageCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-medium text-slate-800 mb-1">Live Chat</h3>
            <p className="text-sm text-slate-500">Instant support</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
          <CardContent className="pt-6 text-center">
            <div className="p-3 bg-purple-100 rounded-lg w-fit mx-auto mb-3">
              <Phone className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-medium text-slate-800 mb-1">Phone Support</h3>
            <p className="text-sm text-slate-500">Call us anytime</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
          <CardContent className="pt-6 text-center">
            <div className="p-3 bg-orange-100 rounded-lg w-fit mx-auto mb-3">
              <Book className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="font-medium text-slate-800 mb-1">User Guide</h3>
            <p className="text-sm text-slate-500">Complete documentation</p>
          </CardContent>
        </Card>
      </div>

      {/* Getting Started */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="font-medium text-slate-800 mb-2">Set Up Your Property</h3>
              <p className="text-sm text-slate-600">Add rooms, set capacity, and configure your property details in Settings.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="font-medium text-slate-800 mb-2">Add Your Tenants</h3>
              <p className="text-sm text-slate-600">Register existing tenants with their room assignments and rent details.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="font-medium text-slate-800 mb-2">Start Managing</h3>
              <p className="text-sm text-slate-600">Track payments, manage bookings, and generate reports effortlessly.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-slate-200">
                <AccordionTrigger className="text-slate-800 hover:text-slate-900">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Need More Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <Phone className="h-6 w-6 text-blue-600" />
              <div className="text-center">
                <h4 className="font-medium">Call Support</h4>
                <p className="text-sm text-slate-500">+91 1800-123-4567</p>
                <Badge className="mt-2 bg-green-100 text-green-700 hover:bg-green-200">24/7 Available</Badge>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <Mail className="h-6 w-6 text-purple-600" />
              <div className="text-center">
                <h4 className="font-medium">Email Support</h4>
                <p className="text-sm text-slate-500">support@pgmanager.com</p>
                <Badge className="mt-2 bg-blue-100 text-blue-700 hover:bg-blue-200">Response in 2hrs</Badge>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <MessageCircle className="h-6 w-6 text-green-600" />
              <div className="text-center">
                <h4 className="font-medium">WhatsApp</h4>
                <p className="text-sm text-slate-500">+91 98765-43210</p>
                <Badge className="mt-2 bg-orange-100 text-orange-700 hover:bg-orange-200">Quick Response</Badge>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Help;
