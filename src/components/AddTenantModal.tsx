
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageCircle, User, Phone } from 'lucide-react';
import { toast } from 'sonner';

interface AddTenantModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddTenantModal: React.FC<AddTenantModalProps> = ({ open, onOpenChange }) => {
  const [tenantName, setTenantName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!tenantName || !whatsappNumber) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    
    // Simulate saving tenant and sending WhatsApp message
    setTimeout(() => {
      const onboardingToken = Math.random().toString(36).substr(2, 9);
      const whatsappMessage = `Hi ${tenantName}, please complete your onboarding for PG Manager here: ${window.location.origin}/onboard/${onboardingToken}`;
      const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;
      
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
      
      toast.success('Tenant added! WhatsApp message sent for onboarding.');
      setLoading(false);
      onOpenChange(false);
      
      // Reset form
      setTenantName('');
      setWhatsappNumber('');
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-slate-800">
            Add New Tenant
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tenant-name" className="text-sm font-medium text-slate-700">
                Tenant Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="tenant-name"
                  placeholder="Enter full name"
                  value={tenantName}
                  onChange={(e) => setTenantName(e.target.value)}
                  className="pl-10 h-12 border-slate-200 focus:border-blue-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp-number" className="text-sm font-medium text-slate-700">
                WhatsApp Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="whatsapp-number"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  className="pl-10 h-12 border-slate-200 focus:border-blue-300"
                />
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <MessageCircle className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-800">
                  WhatsApp Onboarding
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  We'll send a WhatsApp message with an onboarding link to collect complete tenant details.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              {loading ? 'Adding...' : 'Add Tenant'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTenantModal;
