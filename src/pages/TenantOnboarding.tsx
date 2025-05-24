
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, User, Calendar, Phone, FileText, Home } from 'lucide-react';
import { toast } from 'sonner';

const TenantOnboarding = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    idProof: null as File | null,
    services: {
      food: false,
      laundry: false,
      wifi: false
    },
    roomPreference: ''
  });

  const handleServiceChange = (service: keyof typeof formData.services, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      services: {
        ...prev.services,
        [service]: checked
      }
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, idProof: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.dateOfBirth || !formData.gender || 
        !formData.emergencyContactName || !formData.emergencyContactPhone) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      toast.success('Onboarding completed successfully!');
      
      // Navigate to a success page or back to login
      setTimeout(() => {
        navigate('/auth');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mx-auto flex items-center justify-center mb-4">
            <span className="text-white font-bold text-2xl">P</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Complete Your Onboarding</h1>
          <p className="text-slate-600">Please fill in your details to complete the registration process</p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800">Tenant Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-slate-800 border-b border-slate-200 pb-2">
                  Personal Details
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                        className="pl-10 h-12"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select value={formData.gender} onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-slate-800 border-b border-slate-200 pb-2">
                  Emergency Contact
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContactName">Contact Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        id="emergencyContactName"
                        placeholder="Emergency contact name"
                        value={formData.emergencyContactName}
                        onChange={(e) => setFormData(prev => ({ ...prev, emergencyContactName: e.target.value }))}
                        className="pl-10 h-12"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergencyContactPhone">Contact Phone *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        id="emergencyContactPhone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.emergencyContactPhone}
                        onChange={(e) => setFormData(prev => ({ ...prev, emergencyContactPhone: e.target.value }))}
                        className="pl-10 h-12"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ID Proof Upload */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-slate-800 border-b border-slate-200 pb-2">
                  Identity Verification
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="idProof">ID Proof (Aadhaar, PAN, Driving License)</Label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-600 mb-2">
                      {formData.idProof ? formData.idProof.name : 'Click to upload or drag and drop'}
                    </p>
                    <Input
                      id="idProof"
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('idProof')?.click()}
                    >
                      Choose File
                    </Button>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-slate-800 border-b border-slate-200 pb-2">
                  PG Services
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="food"
                      checked={formData.services.food}
                      onCheckedChange={(checked) => handleServiceChange('food', checked as boolean)}
                    />
                    <Label htmlFor="food" className="text-sm font-medium">
                      Food Service (₹2,000/month)
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="laundry"
                      checked={formData.services.laundry}
                      onCheckedChange={(checked) => handleServiceChange('laundry', checked as boolean)}
                    />
                    <Label htmlFor="laundry" className="text-sm font-medium">
                      Laundry Service (₹500/month)
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="wifi"
                      checked={formData.services.wifi}
                      onCheckedChange={(checked) => handleServiceChange('wifi', checked as boolean)}
                    />
                    <Label htmlFor="wifi" className="text-sm font-medium">
                      WiFi (₹300/month)
                    </Label>
                  </div>
                </div>
              </div>

              {/* Room Preference */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-slate-800 border-b border-slate-200 pb-2">
                  Room Preference
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="roomPreference">Any specific room requirements?</Label>
                  <div className="relative">
                    <Home className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Textarea
                      id="roomPreference"
                      placeholder="e.g., Ground floor, near window, quiet area..."
                      value={formData.roomPreference}
                      onChange={(e) => setFormData(prev => ({ ...prev, roomPreference: e.target.value }))}
                      className="pl-10 min-h-20"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-lg"
              >
                {loading ? 'Submitting...' : 'Complete Onboarding'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TenantOnboarding;
