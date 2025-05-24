
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Bed, CreditCard, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: "Total Tenants",
      value: "24",
      change: "+2 this month",
      icon: Users,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
    },
    {
      title: "Available Rooms",
      value: "6",
      change: "out of 30 rooms",
      icon: Bed,
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
    },
    {
      title: "Rent Collected",
      value: "₹1,24,000",
      change: "85% this month",
      icon: CreditCard,
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
    },
    {
      title: "Pending Dues",
      value: "₹18,500",
      change: "4 tenants",
      icon: AlertTriangle,
      color: "from-orange-500 to-orange-600",
      bgColor: "from-orange-50 to-orange-100",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Dashboard Overview</h2>
        <p className="text-slate-600">Welcome back! Here's what's happening with your property.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card 
            key={stat.title} 
            className="relative overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-50`} />
            <CardHeader className="relative pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-slate-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-2xl font-bold text-slate-800 mb-1">
                {stat.value}
              </div>
              <p className="text-xs text-slate-500">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-800">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { action: "New tenant check-in", detail: "Room 101 - Rahul Kumar", time: "2 hours ago", type: "check-in" },
              { action: "Rent payment received", detail: "₹8,000 - Room 203", time: "5 hours ago", type: "payment" },
              { action: "Maintenance request", detail: "AC repair - Room 105", time: "1 day ago", type: "maintenance" },
              { action: "Tenant check-out", detail: "Room 302 - Priya Sharma", time: "2 days ago", type: "check-out" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'check-in' ? 'bg-green-500' :
                  activity.type === 'payment' ? 'bg-blue-500' :
                  activity.type === 'maintenance' ? 'bg-orange-500' : 'bg-red-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">{activity.action}</p>
                  <p className="text-xs text-slate-500">{activity.detail}</p>
                </div>
                <span className="text-xs text-slate-400">{activity.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-800">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { title: "Add New Tenant", desc: "Register a new tenant to a room", color: "from-blue-500 to-blue-600" },
              { title: "Record Payment", desc: "Mark rent or deposit as received", color: "from-green-500 to-green-600" },
              { title: "Room Maintenance", desc: "Log maintenance requests or issues", color: "from-orange-500 to-orange-600" },
              { title: "Generate Report", desc: "Download monthly reports", color: "from-purple-500 to-purple-600" },
            ].map((action, index) => (
              <button
                key={index}
                className="w-full text-left p-4 rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all duration-200 group"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800 group-hover:text-slate-900">{action.title}</h4>
                    <p className="text-sm text-slate-500">{action.desc}</p>
                  </div>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
