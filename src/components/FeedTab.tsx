import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface User {
  name: string;
  email: string;
  id: number;
  avatar: string;
  nickname?: string;
  verified?: boolean;
}

interface Post {
  id: number;
  author: string;
  avatar: string;
  time: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  liked: boolean;
  verified?: boolean;
  nickname?: string;
}

interface FeedTabProps {
  currentUser: User | null;
  newPost: string;
  setNewPost: (value: string) => void;
  handleCreatePost: () => void;
  postsData: Post[];
  handleLike: (postId: number) => void;
}

const FeedTab: React.FC<FeedTabProps> = ({
  currentUser,
  newPost,
  setNewPost,
  handleCreatePost,
  postsData,
  handleLike
}) => {
  return (
    <div className="space-y-6">
      {/* Создать пост */}
      <Card className="bg-white shadow-sm border">
        <CardContent className="p-6">
          <div className="flex space-x-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={currentUser?.avatar} />
              <AvatarFallback>{currentUser?.name?.[0] || 'У'}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <Textarea 
                placeholder="Что нового в Горхоне?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[80px] border-none resize-none focus:ring-0 focus:outline-none p-0 text-base"
              />
              <div className="flex justify-between items-center pt-3 border-t">
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-600">
                    <Icon name="Image" size={18} className="mr-1" />
                    Фото
                  </Button>
                  <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-600">
                    <Icon name="MapPin" size={18} className="mr-1" />
                    Место
                  </Button>
                </div>
                <Button 
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6"
                  onClick={handleCreatePost}
                  disabled={!newPost.trim()}
                >
                  Опубликовать
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Пустое состояние, если нет постов */}
      {postsData.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <Icon name="Users" size={32} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Добро пожаловать в ГорхонNet!</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Здесь будут отображаться посты ваших соседей и друзей. Начните делиться своими моментами!
          </p>
          <Button 
            className="bg-gradient-to-r from-coral to-turquoise text-white"
            onClick={() => document.querySelector('textarea')?.focus()}
          >
            Создать первый пост
          </Button>
        </div>
      )}

      {/* Посты */}
      {postsData.map((post) => (
        <Card key={post.id} className="bg-white shadow-sm border">
          <CardContent className="p-0">
            {/* Заголовок поста */}
            <div className="flex items-center space-x-3 p-4 pb-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={post.avatar} />
                <AvatarFallback>{(post.nickname || post.author)[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-1">
                  <h4 className="font-semibold text-sm">
                    {post.nickname || post.author}
                  </h4>
                  {post.verified && (
                    <Icon name="CheckCircle" size={14} className="text-blue-500" />
                  )}
                </div>
                <p className="text-xs text-gray-500">{post.time}</p>
              </div>
              <Button variant="ghost" size="sm" className="h-auto p-1">
                <Icon name="MoreHorizontal" size={20} />
              </Button>
            </div>

            {/* Контент поста */}
            {post.content && (
              <div className="px-4 pb-3">
                <p className="text-sm">{post.content}</p>
              </div>
            )}

            {/* Изображение поста */}
            {post.image && (
              <div className="w-full">
                <img 
                  src={post.image} 
                  alt="Post" 
                  className="w-full h-96 object-cover"
                />
              </div>
            )}

            {/* Действия с постом */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex space-x-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-auto p-0 hover:bg-transparent"
                    onClick={() => handleLike(post.id)}
                  >
                    <Icon 
                      name="Heart" 
                      size={24} 
                      className={post.liked ? "text-red-500 fill-current" : "text-gray-700"} 
                    />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-auto p-0 hover:bg-transparent">
                    <Icon name="MessageCircle" size={24} className="text-gray-700" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-auto p-0 hover:bg-transparent">
                    <Icon name="Share2" size={24} className="text-gray-700" />
                  </Button>
                </div>
                <Button variant="ghost" size="sm" className="h-auto p-0 hover:bg-transparent">
                  <Icon name="Bookmark" size={24} className="text-gray-700" />
                </Button>
              </div>
              
              {/* Количество лайков */}
              {post.likes > 0 && (
                <p className="text-sm font-semibold mb-1">
                  {post.likes} {post.likes === 1 ? 'отметка "Нравится"' : 'отметок "Нравится"'}
                </p>
              )}
              
              {/* Комментарии */}
              {post.comments > 0 && (
                <Button variant="ghost" size="sm" className="h-auto p-0 text-gray-500 hover:bg-transparent">
                  Посмотреть все комментарии ({post.comments})
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeedTab;