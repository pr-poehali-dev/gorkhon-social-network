import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface User {
  name: string;
  email: string;
  id: number;
  avatar: string;
  nickname?: string;
  verified?: boolean;
  bio?: string;
}

interface SettingsTabProps {
  currentUser: User | null;
  updateUser: (updates: Partial<User>) => void;
  setActiveTab: (tab: string) => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({
  currentUser,
  updateUser,
  setActiveTab
}) => {
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    nickname: currentUser?.nickname || '',
    bio: currentUser?.bio || '',
    email: currentUser?.email || '',
    verified: currentUser?.verified || false
  });

  const [showVerificationRequest, setShowVerificationRequest] = useState(false);

  const handleSave = () => {
    updateUser({
      name: formData.name,
      nickname: formData.nickname,
      bio: formData.bio,
      email: formData.email,
      verified: formData.verified
    });
    setActiveTab('profile');
  };

  const handleVerificationRequest = () => {
    setShowVerificationRequest(true);
    setTimeout(() => {
      setFormData(prev => ({ ...prev, verified: true }));
      updateUser({ verified: true });
      setShowVerificationRequest(false);
      alert('Поздравляем! Ваш аккаунт верифицирован! ✅');
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Заголовок */}
      <div className="flex items-center space-x-4 mb-8">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setActiveTab('profile')}
          className="p-2"
        >
          <Icon name="ArrowLeft" size={20} />
        </Button>
        <h1 className="text-2xl font-semibold">Настройки профиля</h1>
      </div>

      {/* Основная информация */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Основная информация</h2>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Аватар */}
          <div className="flex items-center space-x-6">
            <Avatar className="w-20 h-20">
              <AvatarImage src={currentUser?.avatar} />
              <AvatarFallback className="text-lg">
                {formData.name?.[0] || 'У'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium mb-1">{formData.nickname || formData.name}</h3>
              <Button variant="link" className="text-blue-500 p-0 h-auto">
                Изменить фото профиля
              </Button>
            </div>
          </div>

          {/* Поля формы */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium">
                Имя
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Введите ваше имя"
              />
            </div>

            <div>
              <Label htmlFor="nickname" className="text-sm font-medium">
                Имя пользователя
              </Label>
              <Input
                id="nickname"
                value={formData.nickname}
                onChange={(e) => setFormData(prev => ({ ...prev, nickname: e.target.value }))}
                placeholder="Введите никнейм"
              />
              <p className="text-xs text-gray-500 mt-1">
                Это имя будет отображаться в профиле и постах
              </p>
            </div>

            <div>
              <Label htmlFor="bio" className="text-sm font-medium">
                О себе
              </Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Расскажите о себе"
                className="min-h-[80px]"
                maxLength={150}
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.bio.length}/150 символов
              </p>
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium">
                Электронная почта
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="email@example.com"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Верификация */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Верификация аккаунта</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <Icon name="CheckCircle" size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-medium">
                  Верифицированный аккаунт
                  {formData.verified && (
                    <Icon name="CheckCircle" size={16} className="text-blue-500 inline ml-2" />
                  )}
                </h3>
                <p className="text-sm text-gray-600">
                  {formData.verified 
                    ? 'Ваш аккаунт верифицирован' 
                    : 'Подтвердите подлинность вашего аккаунта'
                  }
                </p>
              </div>
            </div>
            {!formData.verified && (
              <Button 
                onClick={handleVerificationRequest}
                disabled={showVerificationRequest}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                {showVerificationRequest ? 'Проверяем...' : 'Подать заявку'}
              </Button>
            )}
            {formData.verified && (
              <div className="flex items-center space-x-2 text-green-600">
                <Icon name="CheckCircle" size={20} />
                <span className="text-sm font-medium">Верифицирован</span>
              </div>
            )}
          </div>
          
          {showVerificationRequest && (
            <div className="text-center py-4">
              <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Проверяем ваш аккаунт...</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Конфиденциальность */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Конфиденциальность</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="private-account" className="text-sm font-medium">
                Закрытый аккаунт
              </Label>
              <p className="text-xs text-gray-500">
                Только подписчики могут видеть ваши публикации
              </p>
            </div>
            <Switch id="private-account" />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="show-activity" className="text-sm font-medium">
                Показывать активность
              </Label>
              <p className="text-xs text-gray-500">
                Другие пользователи увидят, когда вы были в сети
              </p>
            </div>
            <Switch id="show-activity" defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Кнопки действий */}
      <div className="flex space-x-4 pt-6">
        <Button 
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8"
        >
          Сохранить изменения
        </Button>
        <Button 
          variant="outline" 
          onClick={() => setActiveTab('profile')}
        >
          Отмена
        </Button>
      </div>
    </div>
  );
};

export default SettingsTab;