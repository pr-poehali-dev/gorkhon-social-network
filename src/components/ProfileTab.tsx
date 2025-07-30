import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface User {
  name: string;
  email: string;
  id: number;
  avatar: string;
  nickname?: string;
  verified?: boolean;
  bio?: string;
  postsCount?: number;
  followersCount?: number;
  followingCount?: number;
}

interface ProfileTabProps {
  currentUser: User | null;
  setActiveTab: (tab: string) => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({
  currentUser,
  setActiveTab
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Заголовок профиля */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-6">
          <Avatar className="w-32 h-32">
            <AvatarImage src={currentUser?.avatar} />
            <AvatarFallback className="text-2xl">
              {currentUser?.name?.[0] || 'У'}
            </AvatarFallback>
          </Avatar>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-light">
                  {currentUser?.nickname || currentUser?.name || 'username'}
                </h1>
                {currentUser?.verified && (
                  <img 
                    src="https://cdn.poehali.dev/files/f9a889a9-0bb8-4046-94e8-6e92e9f09742.png" 
                    alt="Verified" 
                    className="w-5 h-5"
                  />
                )}
              </div>
              <Button 
                variant="outline" 
                className="px-6"
                onClick={() => setActiveTab('settings')}
              >
                Редактировать профиль
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="Settings" size={20} />
              </Button>
            </div>

            {/* Статистика */}
            <div className="flex space-x-8">
              <div className="text-center">
                <span className="font-semibold text-lg block">
                  {currentUser?.postsCount || 0}
                </span>
                <span className="text-sm text-gray-600">публикаций</span>
              </div>
              <div className="text-center">
                <span className="font-semibold text-lg block">
                  {currentUser?.followersCount || 0}
                </span>
                <span className="text-sm text-gray-600">подписчиков</span>
              </div>
              <div className="text-center">
                <span className="font-semibold text-lg block">
                  {currentUser?.followingCount || 0}
                </span>
                <span className="text-sm text-gray-600">подписок</span>
              </div>
            </div>

            {/* Информация о пользователе */}
            <div className="space-y-1">
              <h2 className="font-semibold">{currentUser?.name}</h2>
              {currentUser?.bio && (
                <p className="text-sm">{currentUser.bio}</p>
              )}
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Icon name="MapPin" size={14} />
                <span>Горхон, Забайкальский край</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Вкладки */}
      <div className="border-t">
        <div className="flex justify-center space-x-16 pt-4">
          <Button variant="ghost" className="flex items-center space-x-2 text-sm font-medium">
            <Icon name="Grid3X3" size={16} />
            <span>ПУБЛИКАЦИИ</span>
          </Button>
          <Button variant="ghost" className="flex items-center space-x-2 text-sm font-medium text-gray-400">
            <Icon name="Bookmark" size={16} />
            <span>СОХРАНЕННОЕ</span>
          </Button>
          <Button variant="ghost" className="flex items-center space-x-2 text-sm font-medium text-gray-400">
            <Icon name="User" size={16} />
            <span>ОТМЕТКИ</span>
          </Button>
        </div>
      </div>

      {/* Пустое состояние для публикаций */}
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 border-2 border-gray-300 rounded-full flex items-center justify-center">
          <Icon name="Camera" size={32} className="text-gray-400" />
        </div>
        <h3 className="text-xl font-light mb-2">Поделитесь фотографиями</h3>
        <p className="text-gray-600 mb-6">
          Когда вы поделитесь фотографиями, они появятся в вашем профиле.
        </p>
        <Button 
          className="text-blue-500 hover:text-blue-600 font-semibold"
          variant="ghost"
          onClick={() => setActiveTab('feed')}
        >
          Поделиться первой фотографией
        </Button>
      </div>
    </div>
  );
};

export default ProfileTab;