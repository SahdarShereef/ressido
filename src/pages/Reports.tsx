
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Calendar, TrendingUp, Users, CreditCard } from 'lucide-react';

const Reports = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Reports & Analytics</h2>
          <p className="text-slate-600">Track performance and generate insights</p>
        </div>
        
        <Button className="gap-2 bg-gradient-to-r from-blue-500 to-purple-500">
          <Download className="h-4 w-4" />
          Export All Reports
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-slate-800">₹1,24,000</p>
                <p className="text-sm text-green-600">+12% from last month</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Occupancy Rate</p>
                <p className="text-2xl font-bold text-slate-800">85%</p>
                <p className="text-sm text-blue-600">24 of 28 beds</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Collection Rate</p>
                <p className="text-2xl font-bold text-slate-800">92%</p>
                <p className="text-sm text-purple-600">On-time payments</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <CreditCard className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Monthly Reports
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "May 2024 Revenue Report", status: "Ready", date: "June 1, 2024" },
              { name: "April 2024 Revenue Report", status: "Downloaded", date: "May 1, 2024" },
              { name: "March 2024 Revenue Report", status: "Downloaded", date: "April 1, 2024" },
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
                <div>
                  <h4 className="font-medium text-slate-800">{report.name}</h4>
                  <p className="text-sm text-slate-500">{report.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={report.status === "Ready" ? "default" : "secondary"}>
                    {report.status}
                  </Badge>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Analytics Reports
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Occupancy Trends", description: "Monthly occupancy analysis", type: "Chart" },
              { name: "Payment Patterns", description: "Payment behavior insights", type: "Analysis" },
              { name: "Tenant Demographics", description: "Age, profession breakdown", type: "Demographics" },
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
                <div>
                  <h4 className="font-medium text-slate-800">{report.name}</h4>
                  <p className="text-sm text-slate-500">{report.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{report.type}</Badge>
                  <Button size="sm" variant="outline">
                    Generate
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
