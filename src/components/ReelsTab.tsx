import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface Reel {
  id: number;
  author: string;
  username: string;
  avatar: string;
  description: string;
  video: string;
  likes: number;
  comments: number;
  shares: number;
  liked: boolean;
  verified?: boolean;
}

interface ReelsTabProps {
  currentUser?: any;
}

const ReelsTab: React.FC<ReelsTabProps> = ({ currentUser }) => {
  const [reels, setReels] = useState<Reel[]>([
    {
      id: 1,
      author: 'Михаил Сидоров',
      username: '@mikhail_sidorov',
      avatar: '/img/fc06f7ea-92cf-4e5f-8641-5230751df945.jpg',
      description: 'Семейный пикник в Горхоне! Какой прекрасный день для отдыха на природе 🌳 #Горхон #семья #пикник',
      video: '/img/fc06f7ea-92cf-4e5f-8641-5230751df945.jpg',
      likes: 124,
      comments: 23,
      shares: 8,
      liked: false,
      verified: false
    }
  ]);
  
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newReelDescription, setNewReelDescription] = useState('');
  const [currentReelIndex, setCurrentReelIndex] = useState(0);

  const handleLike = (reelId: number) => {
    setReels(prev => prev.map(reel => 
      reel.id === reelId 
        ? { ...reel, likes: reel.liked ? reel.likes - 1 : reel.likes + 1, liked: !reel.liked }
        : reel
    ));
  };

  const handleCreateReel = () => {
    if (!newReelDescription.trim()) return;
    
    const newReel: Reel = {
      id: Date.now(),
      author: currentUser?.name || 'Вы',
      username: `@${currentUser?.nickname || 'user'}`,
      avatar: currentUser?.avatar || '/img/a34c9c60-b1fd-40fb-9711-2a46ec701434.jpg',
      description: newReelDescription,
      video: '/img/a34c9c60-b1fd-40fb-9711-2a46ec701434.jpg', // В реальном приложении здесь было бы видео
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false,
      verified: currentUser?.verified || false
    };
    
    setReels(prev => [newReel, ...prev]);
    setNewReelDescription('');
    setShowCreateForm(false);
  };

  if (showCreateForm) {
    return (
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowCreateForm(false)}
            className="p-2"
          >
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <h2 className="text-xl font-semibold">Создать Reels</h2>
          <div></div>
        </div>

        <Card className="bg-white shadow-sm">
          <CardContent className="p-6 space-y-4">
            {/* Превью */}
            <div className="bg-black rounded-lg aspect-[9/16] max-w-xs mx-auto relative overflow-hidden">
              <img 
                src={currentUser?.avatar || '/img/a34c9c60-b1fd-40fb-9711-2a46ec701434.jpg'}
                alt="Preview" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-white text-center">
                  <Icon name="Video" size={32} className="mx-auto mb-2" />
                  <p className="text-sm">Добавьте видео</p>
                </div>
              </div>
            </div>

            {/* Форма */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Opisание
                </label>
                <Textarea
                  placeholder="Расскажите о своем видео... #хештеги"
                  value={newReelDescription}
                  onChange={(e) => setNewReelDescription(e.target.value)}
                  className="min-h-[100px]"
                  maxLength={2200}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {newReelDescription.length}/2200 символов
                </p>
              </div>

              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  <Icon name="Upload" size={16} className="mr-2" />
                  Загрузить видео
                </Button>
                <Button variant="outline" className="w-full">
                  <Icon name="Camera" size={16} className="mr-2" />
                  Записать видео
                </Button>
              </div>

              <Button 
                onClick={handleCreateReel}
                disabled={!newReelDescription.trim()}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                Опубликовать Reels
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (reels.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <Icon name="Play" size={32} className="text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Нет Reels</h3>
        <p className="text-gray-600 mb-6">
          Создайте свой первый Reels и поделитесь моментами из жизни Горхона
        </p>
        <Button 
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          <Icon name="Plus" size={16} className="mr-2" />
          Создать Reels
        </Button>
      </div>
    );
  }

  const currentReel = reels[currentReelIndex];

  return (
    <div className="max-w-md mx-auto h-[80vh] bg-black rounded-lg overflow-hidden relative">
      {/* Видео/изображение */}
      <div className="h-full relative">
        <img 
          src={currentReel.video}
          alt="Reel"
          className="w-full h-full object-cover"
        />
        
        {/* Градиент для текста */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Кнопка воспроизведения */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Button size="lg" className="rounded-full bg-white/20 hover:bg-white/30 border-0">
            <Icon name="Play" size={32} className="text-white" />
          </Button>
        </div>

        {/* Информация об авторе и описание */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="text-xs text-black">
                {currentReel.author[0]}
              </AvatarFallback>
            </Avatar>
            <span className="font-semibold text-sm">{currentReel.username}</span>
            {currentReel.verified && (
              <img 
                src="https://cdn.poehali.dev/files/f9a889a9-0bb8-4046-94e8-6e92e9f09742.png" 
                alt="Verified" 
                className="w-4 h-4"
              />
            )}
            <Button variant="outline" size="sm" className="ml-auto text-white border-white hover:bg-white hover:text-black">
              Подписаться
            </Button>
          </div>
          <p className="text-sm mb-2">{currentReel.description}</p>
        </div>

        {/* Боковая панель с действиями */}
        <div className="absolute right-3 bottom-20 space-y-4">
          <div className="text-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white p-0"
              onClick={() => handleLike(currentReel.id)}
            >
              <Icon 
                name="Heart" 
                size={24} 
                className={currentReel.liked ? "fill-red-500 text-red-500" : "text-white"} 
              />
            </Button>
            <p className="text-xs text-white mt-1">{currentReel.likes}</p>
          </div>
          
          <div className="text-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white p-0"
            >
              <Icon name="MessageCircle" size={24} />
            </Button>
            <p className="text-xs text-white mt-1">{currentReel.comments}</p>
          </div>
          
          <div className="text-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white p-0"
            >
              <Icon name="Share2" size={24} />
            </Button>
            <p className="text-xs text-white mt-1">{currentReel.shares}</p>
          </div>
          
          <div className="text-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white p-0"
            >
              <Icon name="MoreHorizontal" size={24} />
            </Button>
          </div>
        </div>
      </div>

      {/* Индикаторы и навигация */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
        {reels.map((_, index) => (
          <div
            key={index}
            className={`w-8 h-1 rounded-full ${
              index === currentReelIndex ? 'bg-white' : 'bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* Навигация между Reels */}
      {currentReelIndex > 0 && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white p-2"
          onClick={() => setCurrentReelIndex(prev => Math.max(0, prev - 1))}
        >
          <Icon name="ChevronUp" size={24} />
        </Button>
      )}
      
      {currentReelIndex < reels.length - 1 && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute left-2 bottom-1/2 transform translate-y-1/2 text-white p-2"
          onClick={() => setCurrentReelIndex(prev => Math.min(reels.length - 1, prev + 1))}
        >
          <Icon name="ChevronDown" size={24} />
        </Button>
      )}

      {/* Кнопка создания */}
      <Button
        onClick={() => setShowCreateForm(true)}
        className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full w-10 h-10 p-0"
      >
        <Icon name="Plus" size={20} />
      </Button>
    </div>
  );
};

export default ReelsTab;