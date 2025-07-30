import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-10">
      <div className="p-6">
        {/* Логотип */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-coral to-turquoise bg-clip-text text-transparent">
            ГорхонNet
          </h1>
        </div>

        {/* Навигация в стиле Instagram */}
        <nav className="space-y-2">
          <Button 
            variant={activeTab === 'profile' ? 'default' : 'ghost'} 
            className="w-full justify-start text-left p-3 h-auto"
            onClick={() => setActiveTab('profile')}
          >
            <Icon name="User" size={24} className="mr-4" />
            <span className="text-base">Профиль</span>
          </Button>
          
          <Button 
            variant={activeTab === 'feed' ? 'default' : 'ghost'} 
            className="w-full justify-start text-left p-3 h-auto"
            onClick={() => setActiveTab('feed')}
          >
            <Icon name="Home" size={24} className="mr-4" />
            <span className="text-base">Лента</span>
          </Button>
          
          <Button 
            variant={activeTab === 'messages' ? 'default' : 'ghost'} 
            className="w-full justify-start text-left p-3 h-auto"
            onClick={() => setActiveTab('messages')}
          >
            <Icon name="MessageCircle" size={24} className="mr-4" />
            <span className="text-base">Сообщения</span>
          </Button>
          
          <Button 
            variant={activeTab === 'reels' ? 'default' : 'ghost'} 
            className="w-full justify-start text-left p-3 h-auto"
            onClick={() => setActiveTab('reels')}
          >
            <Icon name="Play" size={24} className="mr-4" />
            <span className="text-base">Reels</span>
          </Button>

          <Button 
            variant={activeTab === 'settings' ? 'default' : 'ghost'} 
            className="w-full justify-start text-left p-3 h-auto"
            onClick={() => setActiveTab('settings')}
          >
            <Icon name="Settings" size={24} className="mr-4" />
            <span className="text-base">Настройки</span>
          </Button>
        </nav>

        {/* Профиль пользователя внизу */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Avatar className="w-10 h-10">
              <AvatarImage src={currentUser?.avatar} />
              <AvatarFallback>{currentUser?.name?.[0] || 'У'}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-1">
                <p className="text-sm font-medium truncate">
                  {currentUser?.nickname || currentUser?.name || 'Пользователь'}
                </p>
                {currentUser?.verified && (
                  <Icon name="CheckCircle" size={14} className="text-blue-500 flex-shrink-0" />
                )}
              </div>
              <p className="text-xs text-gray-500 truncate">{currentUser?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;