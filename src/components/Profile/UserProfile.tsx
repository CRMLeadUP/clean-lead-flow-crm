
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { userMock } from '../../data/MockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  User, Lock, Bell, Globe, Smartphone, Palette, CircleHelp, Languages,
  Shield, CreditCard, LucideIcon, LogOut, Upload, Camera
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface ProfileTabProps {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
  active?: boolean;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ icon: Icon, title, children, active }) => {
  return (
    <div className={`p-4 rounded-lg border ${active ? 'border-primary/30 bg-primary/5' : 'border-gray-200'}`}>
      <div className="flex items-center mb-4">
        <Icon className={`mr-2 h-5 w-5 ${active ? 'text-primary' : 'text-gray-500'}`} />
        <h3 className="font-medium">{title}</h3>
      </div>
      {children}
    </div>
  );
};

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: userMock.name,
    email: userMock.email,
    role: userMock.role,
    phone: '+55 11 98765-4321',
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    notifyEmail: true,
    notifyPush: true,
    darkMode: false,
    twoFactor: false,
  });
  
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Perfil atualizado com sucesso!');
    }, 1000);
  };
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword) {
      toast.error('Preencha todos os campos');
      return;
    }
    
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setPasswords({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      toast.success('Senha atualizada com sucesso!');
    }, 1000);
  };
  
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header with Avatar */}
      <div className="flex flex-col sm:flex-row gap-6 items-center justify-between bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src={userMock.avatar} alt={userData.name} />
              <AvatarFallback className="text-2xl">{userData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="absolute -right-1 -bottom-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full">
                    <Camera className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Upload className="mr-2 h-4 w-4" />
                    <span>Fazer upload</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Camera className="mr-2 h-4 w-4" />
                    <span>Tirar foto</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold">{userData.name}</h2>
            <p className="text-gray-500">{userData.email}</p>
            <div className="flex items-center justify-center sm:justify-start mt-1">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                {userData.role}
              </Badge>
            </div>
          </div>
        </div>
        
        <Button variant="outline" className="flex gap-2">
          <LogOut className="h-4 w-4" />
          Sair
        </Button>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* Sidebar with options */}
        <div className="md:col-span-1 space-y-3">
          <ProfileTab 
            icon={User} 
            title="Dados Pessoais"
            active={activeTab === 'profile'}
          >
            <p className="text-sm text-gray-500">Gerencie suas informações pessoais e dados de contato</p>
            <Button 
              variant="ghost" 
              className="w-full justify-start mt-2 text-primary"
              onClick={() => setActiveTab('profile')}
            >
              Editar
            </Button>
          </ProfileTab>
          
          <ProfileTab 
            icon={Lock} 
            title="Segurança"
            active={activeTab === 'password'}
          >
            <p className="text-sm text-gray-500">Altere sua senha e configure a autenticação</p>
            <Button 
              variant="ghost" 
              className="w-full justify-start mt-2 text-primary"
              onClick={() => setActiveTab('password')}
            >
              Gerenciar
            </Button>
          </ProfileTab>
          
          <ProfileTab 
            icon={Bell} 
            title="Notificações" 
          >
            <p className="text-sm text-gray-500">Configure quais notificações deseja receber</p>
            <Button 
              variant="ghost" 
              className="w-full justify-start mt-2 text-primary"
              onClick={() => toast.info('Configurações de notificações em breve')}
            >
              Configurar
            </Button>
          </ProfileTab>
          
          <ProfileTab 
            icon={CreditCard} 
            title="Assinatura e Pagamento" 
          >
            <p className="text-sm text-gray-500">Gerencie seu plano atual e métodos de pagamento</p>
            <Button 
              variant="ghost" 
              className="w-full justify-start mt-2 text-primary"
              onClick={() => window.location.href = '/subscription'}
            >
              Ver planos
            </Button>
          </ProfileTab>
        </div>
        
        {/* Main content area */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>
                {activeTab === 'profile' ? 'Editar Perfil' : 'Configurações de Segurança'}
              </CardTitle>
              <CardDescription>
                {activeTab === 'profile' 
                  ? 'Atualize suas informações pessoais e preferências'
                  : 'Altere sua senha e configure métodos de autenticação'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {activeTab === 'profile' ? (
                <form onSubmit={handleProfileSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome completo</Label>
                      <Input
                        id="name"
                        value={userData.name}
                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        value={userData.phone}
                        onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="role">Função</Label>
                      <Input
                        id="role"
                        value={userData.role}
                        onChange={(e) => setUserData({ ...userData, role: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">Idioma</Label>
                      <Select 
                        value={userData.language} 
                        onValueChange={(value) => setUserData({ ...userData, language: value })}
                      >
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Selecione um idioma" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                          <SelectItem value="en-US">English (US)</SelectItem>
                          <SelectItem value="es-ES">Español</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Fuso Horário</Label>
                      <Select 
                        value={userData.timezone} 
                        onValueChange={(value) => setUserData({ ...userData, timezone: value })}
                      >
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Selecione um fuso horário" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/Sao_Paulo">Brasília (GMT-3)</SelectItem>
                          <SelectItem value="America/New_York">New York (GMT-4)</SelectItem>
                          <SelectItem value="Europe/London">London (GMT+1)</SelectItem>
                          <SelectItem value="Asia/Tokyo">Tokyo (GMT+9)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Notificações por E-mail</h3>
                        <p className="text-sm text-gray-500">Receba atualizações importantes por e-mail</p>
                      </div>
                      <Switch
                        checked={userData.notifyEmail}
                        onCheckedChange={(checked) => setUserData({ ...userData, notifyEmail: checked })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Tema Escuro</h3>
                        <p className="text-sm text-gray-500">Ativar modo escuro na interface</p>
                      </div>
                      <Switch
                        checked={userData.darkMode}
                        onCheckedChange={(checked) => setUserData({ ...userData, darkMode: checked })}
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
                      {isLoading ? 'Salvando...' : 'Salvar Alterações'}
                    </Button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Senha Atual</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={passwords.currentPassword}
                        onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                        placeholder="••••••••"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Nova Senha</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={passwords.newPassword}
                        onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                        placeholder="••••••••"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={passwords.confirmPassword}
                        onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Autenticação de Dois Fatores</h3>
                        <p className="text-sm text-gray-500">Adicione uma camada extra de segurança</p>
                      </div>
                      <Switch
                        checked={userData.twoFactor}
                        onCheckedChange={(checked) => {
                          setUserData({ ...userData, twoFactor: checked });
                          if (checked) {
                            toast.success("Autenticação de dois fatores ativada!");
                          } else {
                            toast.info("Autenticação de dois fatores desativada");
                          }
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
                      {isLoading ? 'Atualizando...' : 'Atualizar Senha'}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
