
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Download, Plus, Filter } from 'lucide-react';

const Payments = () => {
  const payments = [
    {
      id: '1',
      tenant: 'Rahul Kumar',
      room: '101',
      month: 'May 2024',
      amount: 8000,
      status: 'paid',
      date: '2024-05-01',
      method: 'UPI'
    },
    {
      id: '2',
      tenant: 'Priya Sharma',
      room: '102',
      month: 'May 2024',
      amount: 7500,
      status: 'due',
      date: null,
      method: null
    },
    {
      id: '3',
      tenant: 'Amit Singh',
      room: '102',
      month: 'May 2024',
      amount: 7500,
      status: 'paid',
      date: '2024-05-03',
      method: 'Cash'
    },
    {
      id: '4',
      tenant: 'Sneha Patel',
      room: '201',
      month: 'May 2024',
      amount: 8500,
      status: 'partial',
      date: '2024-05-02',
      method: 'Bank Transfer'
    }
  ];

  const getStatusBadge = (status: string) => {
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
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Payment Management</h2>
          <p className="text-slate-600">Track rent payments and generate receipts</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-blue-500 to-purple-500">
            <Plus className="h-4 w-4" />
            Record Payment
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search by tenant name or room number..." 
                className="pl-10 border-slate-200 focus:border-blue-300"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Payment Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Tenant</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Room</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Month</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Method</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr 
                    key={payment.id} 
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-800">{payment.tenant}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{payment.room}</td>
                    <td className="py-3 px-4 text-slate-600">{payment.month}</td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-800">₹{payment.amount.toLocaleString()}</span>
                    </td>
                    <td className="py-3 px-4">{getStatusBadge(payment.status)}</td>
                    <td className="py-3 px-4 text-slate-600">
                      {payment.date ? new Date(payment.date).toLocaleDateString() : '-'}
                    </td>
                    <td className="py-3 px-4 text-slate-600">{payment.method || '-'}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" className="h-8 px-2">
                          View
                        </Button>
                        {payment.status !== 'paid' && (
                          <Button size="sm" className="h-8 px-2 bg-green-500 hover:bg-green-600">
                            Mark Paid
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payments;
