import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Phone, MessageCircle, Eye, Plus, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import AddTenantModal from "@/components/AddTenantModal";

const Tenants = () => {
  const [showAddTenantModal, setShowAddTenantModal] = useState(false);

  const tenants = [
    {
      id: '1',
      name: 'Rahul Kumar',
      room: '101',
      phone: '+91 98765 43210',
      rentStatus: 'paid',
      checkIn: '2024-01-15',
      rent: 8000,
      initials: 'RK'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      room: '102',
      phone: '+91 87654 32109',
      rentStatus: 'due',
      checkIn: '2024-02-01',
      rent: 7500,
      initials: 'PS'
    },
    {
      id: '3',
      name: 'Amit Singh',
      room: '102',
      phone: '+91 76543 21098',
      rentStatus: 'paid',
      checkIn: '2024-01-20',
      rent: 7500,
      initials: 'AS'
    },
    {
      id: '4',
      name: 'Sneha Patel',
      room: '201',
      phone: '+91 65432 10987',
      rentStatus: 'partial',
      checkIn: '2024-03-01',
      rent: 8500,
      initials: 'SP'
    }
  ];

  const getRentStatusBadge = (status: string) => {
    switch (status) {
      case 'paid': return <Badge className="bg-green-500 hover:bg-green-600">Paid</Badge>;
      case 'due': return <Badge className="bg-red-500 hover:bg-red-600">Due</Badge>;
      case 'partial': return <Badge className="bg-yellow-500 hover:bg-yellow-600">Partial</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Tenant Management</h2>
          <p className="text-slate-600">Manage all your tenants and their information</p>
        </div>
        
        <Button 
          onClick={() => setShowAddTenantModal(true)}
          className="gap-2 bg-gradient-to-r from-blue-500 to-purple-500"
        >
          <Plus className="h-4 w-4" />
          Add New Tenant
        </Button>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search tenants by name, room, or phone..." 
                className="pl-10 border-slate-200 focus:border-blue-300"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">All Status</Button>
              <Button variant="outline" size="sm">All Rooms</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tenants.map((tenant, index) => (
          <Card 
            key={tenant.id} 
            className="border-0 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium">
                    {tenant.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-800 truncate">{tenant.name}</h3>
                  <p className="text-sm text-slate-600">Room {tenant.room}</p>
                  <p className="text-xs text-slate-500">Since {new Date(tenant.checkIn).toLocaleDateString()}</p>
                </div>
                {getRentStatusBadge(tenant.rentStatus)}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Monthly Rent</span>
                <span className="font-semibold text-slate-800">₹{tenant.rent.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Phone</span>
                <span className="text-sm text-slate-800">{tenant.phone}</span>
              </div>

              <div className="flex gap-2 pt-4 border-t border-slate-100">
                <Button size="sm" variant="outline" className="flex-1 gap-2">
                  <Phone className="h-4 w-4" />
                  Call
                </Button>
                <Button size="sm" variant="outline" className="flex-1 gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Message
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AddTenantModal 
        open={showAddTenantModal} 
        onOpenChange={setShowAddTenantModal} 
      />
    </div>
  );
};

export default Tenants;
