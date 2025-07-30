import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AuthFormProps {
  showAuth: boolean;
  setShowAuth: (show: boolean) => void;
  authMode: 'login' | 'register';
  setAuthMode: (mode: 'login' | 'register') => void;
  formData: {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
  }>>;
  handleAuth: (e: React.FormEvent) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
  showAuth,
  setShowAuth,
  authMode,
  setAuthMode,
  formData,
  setFormData,
  handleAuth
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-coral via-turquoise to-lavender flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-xl">
        <CardHeader className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-coral to-turquoise bg-clip-text text-transparent mb-2">
            ГорхонNet
          </h1>
          <p className="text-muted-foreground">Социальная сеть поселка Горхон</p>
        </CardHeader>
        <CardContent>
          {!showAuth ? (
            <div className="space-y-4">
              <Button 
                onClick={() => { setShowAuth(true); setAuthMode('login'); }}
                className="w-full bg-gradient-to-r from-coral to-turquoise text-white"
              >
                Войти
              </Button>
              <Button 
                onClick={() => { setShowAuth(true); setAuthMode('register'); }}
                variant="outline" 
                className="w-full"
              >
                Регистрация
              </Button>
            </div>
          ) : (
            <form onSubmit={handleAuth} className="space-y-4">
              <div className="text-center mb-4">
                <h3 className="text-xl font-semibold">
                  {authMode === 'login' ? 'Вход' : 'Регистрация'}
                </h3>
              </div>
              
              {authMode === 'register' && (
                <div>
                  <label className="text-sm font-medium">Имя</label>
                  <Input
                    type="text"
                    placeholder="Введите ваше имя"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
              )}
              
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="Введите email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Пароль</label>
                <Input
                  type="password"
                  placeholder="Введите пароль"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  required
                />
              </div>
              
              {authMode === 'register' && (
                <div>
                  <label className="text-sm font-medium">Подтвердите пароль</label>
                  <Input
                    type="password"
                    placeholder="Повторите пароль"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    required
                  />
                </div>
              )}
              
              <div className="flex space-x-2">
                <Button type="submit" className="flex-1 bg-gradient-to-r from-coral to-turquoise text-white">
                  {authMode === 'login' ? 'Войти' : 'Зарегистрироваться'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowAuth(false)}
                >
                  Отмена
                </Button>
              </div>
              
              <div className="text-center">
                <Button 
                  type="button"
                  variant="link" 
                  onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                >
                  {authMode === 'login' ? 'Нет аккаунта? Регистрация' : 'Есть аккаунт? Войти'}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForm;