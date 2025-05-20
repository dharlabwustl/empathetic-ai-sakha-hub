
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, ExternalLink, Globe, Lock, RefreshCw, Shield, Trash2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

interface Domain {
  id: string;
  name: string;
  status: 'active' | 'pending' | 'error';
  isDefault: boolean;
  sslEnabled: boolean;
  lastVerified?: string;
  error?: string;
}

const MOCK_DOMAINS: Domain[] = [
  {
    id: '1',
    name: 'app.prepzr.com',
    status: 'active',
    isDefault: true,
    sslEnabled: true,
    lastVerified: '2025-05-01T12:00:00Z'
  },
  {
    id: '2',
    name: 'prepzr.edu',
    status: 'pending',
    isDefault: false,
    sslEnabled: false
  },
  {
    id: '3',
    name: 'learn.prepzrapp.com',
    status: 'error',
    isDefault: false,
    sslEnabled: true,
    error: 'DNS verification failed'
  }
];

const DomainManagementPage: React.FC = () => {
  const [domains, setDomains] = useState<Domain[]>(MOCK_DOMAINS);
  const [newDomain, setNewDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState<string | null>(null);

  const addDomain = () => {
    if (!newDomain || !newDomain.includes('.')) {
      toast.error('Please enter a valid domain name');
      return;
    }

    // In a real app, this would call an API
    setLoading(true);
    setTimeout(() => {
      const domain: Domain = {
        id: String(Date.now()),
        name: newDomain,
        status: 'pending',
        isDefault: domains.length === 0,
        sslEnabled: false
      };
      
      setDomains([...domains, domain]);
      setNewDomain('');
      setLoading(false);
      toast.success('Domain added successfully. Please verify DNS settings.');
    }, 1000);
  };

  const removeDomain = (id: string) => {
    if (domains.find(d => d.id === id)?.isDefault) {
      toast.error("Can't remove the default domain. Set another domain as default first.");
      return;
    }
    
    setDomains(domains.filter(domain => domain.id !== id));
    toast.success('Domain removed successfully');
  };

  const setDefaultDomain = (id: string) => {
    setDomains(domains.map(domain => ({
      ...domain,
      isDefault: domain.id === id
    })));
    toast.success('Default domain updated');
  };

  const toggleSSL = (id: string) => {
    setDomains(domains.map(domain => 
      domain.id === id ? { ...domain, sslEnabled: !domain.sslEnabled } : domain
    ));
  };

  const verifyDomain = (id: string) => {
    const domain = domains.find(d => d.id === id);
    if (!domain) return;
    
    setVerifying(id);
    
    // Simulate API call
    setTimeout(() => {
      if (domain.name === 'learn.prepzrapp.com') {
        setDomains(domains.map(d => 
          d.id === id ? { ...d, status: 'error', error: 'DNS verification failed' } : d
        ));
        toast.error(`Verification failed for ${domain.name}`);
      } else {
        setDomains(domains.map(d => 
          d.id === id ? { 
            ...d, 
            status: 'active', 
            error: undefined, 
            lastVerified: new Date().toISOString() 
          } : d
        ));
        toast.success(`${domain.name} verified successfully`);
      }
      setVerifying(null);
    }, 2000);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Domain Management</h1>
          <p className="text-muted-foreground mt-1">
            Connect custom domains to your Prepzr app
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Domain</CardTitle>
          <CardDescription>
            Enter a domain name that you own. You'll need to add DNS records to verify ownership.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); addDomain(); }}>
            <div className="flex-1">
              <Input
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value)}
                placeholder="example.com"
              />
            </div>
            <Button disabled={loading || !newDomain}>
              {loading ? 'Adding...' : 'Add Domain'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        <h2 className="text-lg font-medium">Your Domains</h2>
        
        {domains.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Globe className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-center text-muted-foreground">
                You haven't added any domains yet. Add your first custom domain above.
              </p>
            </CardContent>
          </Card>
        ) : (
          domains.map(domain => (
            <Card key={domain.id} className={domain.status === 'error' ? 'border-red-200 dark:border-red-800' : ''}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{domain.name}</CardTitle>
                    {domain.isDefault && (
                      <Badge variant="outline" className="ml-2">Default</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {domain.status === 'active' && (
                      <Badge variant="default" className="bg-green-500">Active</Badge>
                    )}
                    {domain.status === 'pending' && (
                      <Badge variant="outline" className="text-amber-500 border-amber-500">Pending</Badge>
                    )}
                    {domain.status === 'error' && (
                      <Badge variant="outline" className="text-red-500 border-red-500">Error</Badge>
                    )}
                  </div>
                </div>
                {domain.lastVerified && (
                  <CardDescription className="mt-1">
                    Last verified: {new Date(domain.lastVerified).toLocaleString()}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                {domain.status === 'pending' && (
                  <Alert className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Verification Required</AlertTitle>
                    <AlertDescription>
                      Add the following DNS records to verify domain ownership:
                      <div className="mt-2 bg-muted p-3 rounded-md font-mono text-sm">
                        CNAME record: {domain.name} → cdn.prepzr.com
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
                
                {domain.status === 'error' && domain.error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Verification Failed</AlertTitle>
                    <AlertDescription>
                      {domain.error}. Please check your DNS settings and try again.
                    </AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor={`ssl-${domain.id}`}>SSL Protection</Label>
                    </div>
                    <Switch
                      id={`ssl-${domain.id}`}
                      checked={domain.sslEnabled}
                      onCheckedChange={() => toggleSSL(domain.id)}
                      disabled={domain.status !== 'active'}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor={`default-${domain.id}`}>Set as Default</Label>
                    </div>
                    <Switch
                      id={`default-${domain.id}`}
                      checked={domain.isDefault}
                      onCheckedChange={() => setDefaultDomain(domain.id)}
                      disabled={domain.isDefault || domain.status !== 'active'}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between border-t pt-4 pb-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => verifyDomain(domain.id)}
                  disabled={verifying === domain.id}
                >
                  {verifying === domain.id ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Verifying...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" /> Verify DNS
                    </>
                  )}
                </Button>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <a href={`https://${domain.name}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" /> Visit
                    </a>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeDomain(domain.id)}
                    disabled={domain.isDefault}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default DomainManagementPage;
