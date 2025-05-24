
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { User, Building, Bell, Globe, Shield } from 'lucide-react';

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Settings</h2>
        <p className="text-slate-600">Manage your property and account preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="Rajesh Kumar" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="rajesh@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" defaultValue="+91 98765 43210" />
            </div>
            <Button className="w-full">Update Profile</Button>
          </CardContent>
        </Card>

        {/* Property Settings */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Property Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="property-name">Property Name</Label>
              <Input id="property-name" defaultValue="Sunrise PG & Hostel" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" defaultValue="123 Main Street, Bangalore" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="total-rooms">Total Rooms</Label>
                <Input id="total-rooms" type="number" defaultValue="30" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="total-beds">Total Beds</Label>
                <Input id="total-beds" type="number" defaultValue="60" />
              </div>
            </div>
            <Button className="w-full">Update Property</Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>SMS Notifications</Label>
                <p className="text-sm text-slate-500">Receive SMS for rent reminders</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>WhatsApp Notifications</Label>
                <p className="text-sm text-slate-500">Get WhatsApp updates</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm text-slate-500">Monthly reports via email</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Payment Alerts</Label>
                <p className="text-sm text-slate-500">Instant payment notifications</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              System Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <select className="w-full p-2 border border-slate-200 rounded-md">
                <option>English</option>
                <option>Hindi</option>
                <option>Bengali</option>
                <option>Tamil</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <select className="w-full p-2 border border-slate-200 rounded-md">
                <option>Indian Rupee (₹)</option>
                <option>US Dollar ($)</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <select className="w-full p-2 border border-slate-200 rounded-md">
                <option>Asia/Kolkata (IST)</option>
                <option>Asia/Mumbai</option>
              </select>
            </div>
            <Button className="w-full">Save Preferences</Button>
          </CardContent>
        </Card>
      </div>

      {/* Security Section */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security & Privacy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex-col">
              <h4 className="font-medium">Change Password</h4>
              <p className="text-sm text-slate-500 mt-1">Update your login credentials</p>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <h4 className="font-medium">Two-Factor Auth</h4>
              <p className="text-sm text-slate-500 mt-1">Enable 2FA for extra security</p>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <h4 className="font-medium">Export Data</h4>
              <p className="text-sm text-slate-500 mt-1">Download your data backup</p>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
