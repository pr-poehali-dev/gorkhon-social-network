import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface User {
  name: string;
  email: string;
  id: number;
  avatar: string;
}

interface UserProfileProps {
  currentUser: User | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
  currentUser,
  activeTab,
  setActiveTab
}) => {
  return (
    <div className="lg:col-span-1">
      <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
        <CardHeader className="text-center">
          <Avatar className="mx-auto mb-4 w-20 h-20">
            <AvatarImage src={currentUser?.avatar} />
            <AvatarFallback>{currentUser?.name?.[0] || 'У'}</AvatarFallback>
          </Avatar>
          <h3 className="font-semibold text-lg">{currentUser?.name || 'Ваш профиль'}</h3>
          <p className="text-sm text-muted-foreground">Житель Горхона</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-sm">
            <span>Публикации</span>
            <span className="font-semibold text-primary">12</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Соседи</span>
            <span className="font-semibold text-primary">48</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Подписчики</span>
            <span className="font-semibold text-primary">67</span>
          </div>
          <Button className="w-full bg-gradient-to-r from-coral to-turquoise hover:from-coral/80 hover:to-turquoise/80 text-white">
            Редактировать профиль
          </Button>
        </CardContent>
      </Card>

      {/* Навигация */}
      <Card className="mt-4 bg-white/90 backdrop-blur-sm shadow-lg">
        <CardContent className="p-4">
          <nav className="space-y-2">
            <Button 
              variant={activeTab === 'feed' ? 'default' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => setActiveTab('feed')}
            >
              <Icon name="Home" size={18} className="mr-2" />
              Лента
            </Button>
            <Button 
              variant={activeTab === 'messages' ? 'default' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => setActiveTab('messages')}
            >
              <Icon name="MessageCircle" size={18} className="mr-2" />
              Сообщения
            </Button>
            <Button 
              variant={activeTab === 'reels' ? 'default' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => setActiveTab('reels')}
            >
              <Icon name="Play" size={18} className="mr-2" />
              Reels
            </Button>
          </nav>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;