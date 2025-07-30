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
}

interface Post {
  id: number;
  author: string;
  avatar: string;
  time: string;
  content: string;
  image: string;
  likes: number;
  comments: number;
  liked: boolean;
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
      <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
        <CardContent className="p-6">
          <div className="flex space-x-4">
            <Avatar>
              <AvatarImage src={currentUser?.avatar} />
              <AvatarFallback>{currentUser?.name?.[0] || 'У'}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <Textarea 
                placeholder="Что нового в Горхоне?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[80px]"
              />
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Icon name="Image" size={18} className="mr-1" />
                    Фото
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Icon name="MapPin" size={18} className="mr-1" />
                    Место
                  </Button>
                </div>
                <Button 
                  className="bg-gradient-to-r from-coral to-turquoise text-white"
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

      {/* Посты */}
      {postsData.map((post) => (
        <Card key={post.id} className="bg-white/90 backdrop-blur-sm shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Avatar>
                <AvatarImage src={post.avatar} />
                <AvatarFallback>{post.author[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">{post.author}</h4>
                <p className="text-sm text-muted-foreground">{post.time}</p>
              </div>
            </div>
            <p className="mb-4">{post.content}</p>
            <img 
              src={post.image} 
              alt="Post" 
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <div className="flex items-center justify-between">
              <div className="flex space-x-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={post.liked ? "text-red-500 hover:text-red-600" : "text-coral hover:text-coral/80"}
                  onClick={() => handleLike(post.id)}
                >
                  <Icon name="Heart" size={18} className={`mr-1 ${post.liked ? 'fill-current' : ''}`} />
                  {post.likes}
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="MessageCircle" size={18} className="mr-1" />
                  {post.comments}
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="Share2" size={18} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeedTab;