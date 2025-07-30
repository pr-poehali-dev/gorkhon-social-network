import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

import AuthForm from '@/components/AuthForm';
import UserProfile from '@/components/UserProfile';
import FeedTab from '@/components/FeedTab';
import MessagesTab from '@/components/MessagesTab';
import ReelsTab from '@/components/ReelsTab';
import Sidebar from '@/components/Sidebar';

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

interface Message {
  id: number;
  name: string;
  message: string;
  time: string;
  unread: number;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [newPost, setNewPost] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({ email: '', password: '', name: '', confirmPassword: '' });
  const [postsData, setPostsData] = useState<Post[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const initialPosts: Post[] = [
    {
      id: 1,
      author: 'Анна Петрова',
      avatar: '/img/a34c9c60-b1fd-40fb-9711-2a46ec701434.jpg',
      time: '2 часа назад',
      content: 'Какая красота в нашем Горхоне сегодня! Солнце светит, птички поют 🌞',
      image: '/img/a34c9c60-b1fd-40fb-9711-2a46ec701434.jpg',
      likes: 24,
      comments: 8,
      liked: false
    },
    {
      id: 2,
      author: 'Михаил Сидоров',
      avatar: '/img/fc06f7ea-92cf-4e5f-8641-5230751df945.jpg',
      time: '4 часа назад',
      content: 'Отличный семейный пикник получился! Спасибо всем соседям за компанию!',
      image: '/img/fc06f7ea-92cf-4e5f-8641-5230751df945.jpg',
      likes: 31,
      comments: 12,
      liked: false
    },
    {
      id: 3,
      author: 'Елена Васильева',
      avatar: '/img/8c9dbc3f-89a6-4fa3-a5b2-bd7fd99a847b.jpg',
      time: '6 часов назад',
      content: 'Подготовка к летнему фестивалю идет полным ходом! Приходите все 15 августа!',
      image: '/img/8c9dbc3f-89a6-4fa3-a5b2-bd7fd99a847b.jpg',
      likes: 47,
      comments: 18,
      liked: false
    }
  ];

  const messages: Message[] = [
    { id: 1, name: 'Анна Петрова', message: 'Привет! Как дела?', time: '10:30', unread: 2 },
    { id: 2, name: 'Соседский чат', message: 'Кто идет на собрание?', time: '09:15', unread: 5 },
    { id: 3, name: 'Михаил Сидоров', message: 'Спасибо за фото!', time: 'вчера', unread: 0 }
  ];

  useEffect(() => {
    setPostsData(initialPosts);
    // Проверяем, есть ли сохраненная сессия
    const savedUser = localStorage.getItem('gorkhonUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLike = (postId: number) => {
    setPostsData(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likes: post.liked ? post.likes - 1 : post.likes + 1, liked: !post.liked }
        : post
    ));
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'register') {
      if (formData.password !== formData.confirmPassword) {
        alert('Пароли не совпадают!');
        return;
      }
      const newUser: User = { 
        name: formData.name, 
        email: formData.email,
        id: Date.now(),
        avatar: '/img/a34c9c60-b1fd-40fb-9711-2a46ec701434.jpg'
      };
      localStorage.setItem('gorkhonUser', JSON.stringify(newUser));
      setCurrentUser(newUser);
      setIsLoggedIn(true);
      setShowAuth(false);
      alert('Регистрация успешна!');
    } else {
      // Простая авторизация
      const user: User = { 
        name: 'Житель Горхона', 
        email: formData.email,
        id: Date.now(),
        avatar: '/img/a34c9c60-b1fd-40fb-9711-2a46ec701434.jpg'
      };
      localStorage.setItem('gorkhonUser', JSON.stringify(user));
      setCurrentUser(user);
      setIsLoggedIn(true);
      setShowAuth(false);
    }
    setFormData({ email: '', password: '', name: '', confirmPassword: '' });
  };

  const handleLogout = () => {
    localStorage.removeItem('gorkhonUser');
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const handleCreatePost = () => {
    if (!newPost.trim()) return;
    const post: Post = {
      id: Date.now(),
      author: currentUser?.name || 'Неизвестный',
      avatar: currentUser?.avatar || '/img/a34c9c60-b1fd-40fb-9711-2a46ec701434.jpg',
      time: 'только что',
      content: newPost,
      image: '/img/a34c9c60-b1fd-40fb-9711-2a46ec701434.jpg',
      likes: 0,
      comments: 0,
      liked: false
    };
    setPostsData(prev => [post, ...prev]);
    setNewPost('');
  };

  if (!isLoggedIn) {
    return (
      <AuthForm
        showAuth={showAuth}
        setShowAuth={setShowAuth}
        authMode={authMode}
        setAuthMode={setAuthMode}
        formData={formData}
        setFormData={setFormData}
        handleAuth={handleAuth}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-coral via-turquoise to-lavender">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-coral to-turquoise bg-clip-text text-transparent font-mono">
                ГорхонNet
              </h1>
              <Badge variant="secondary" className="bg-gradient-to-r from-turquoise to-lavender text-white">
                Социальная сеть поселка Горхон
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Icon name="Bell" size={20} />
              </Button>
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src={currentUser?.avatar} />
                  <AvatarFallback>{currentUser?.name?.[0] || 'У'}</AvatarFallback>
                </Avatar>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <Icon name="LogOut" size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Левая панель - Профиль */}
          <UserProfile
            currentUser={currentUser}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* Центральная часть */}
          <div className="lg:col-span-2">
            {activeTab === 'feed' && (
              <FeedTab
                currentUser={currentUser}
                newPost={newPost}
                setNewPost={setNewPost}
                handleCreatePost={handleCreatePost}
                postsData={postsData}
                handleLike={handleLike}
              />
            )}

            {activeTab === 'messages' && (
              <MessagesTab messages={messages} />
            )}

            {activeTab === 'reels' && (
              <ReelsTab />
            )}
          </div>

          {/* Правая панель */}
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Index;