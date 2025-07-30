import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

import AuthForm from '@/components/AuthForm';
import UserProfile from '@/components/UserProfile';
import ProfileTab from '@/components/ProfileTab';
import FeedTab from '@/components/FeedTab';
import MessagesTab from '@/components/MessagesTab';
import ReelsTab from '@/components/ReelsTab';
import SettingsTab from '@/components/SettingsTab';

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

interface Message {
  id: number;
  name: string;
  message: string;
  time: string;
  unread: number;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [newPost, setNewPost] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({ email: '', password: '', name: '', confirmPassword: '' });
  const [postsData, setPostsData] = useState<Post[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const messages: Message[] = [
    { id: 1, name: 'Анна Петрова', message: 'Привет! Как дела?', time: '10:30', unread: 2 },
    { id: 2, name: 'Соседский чат', message: 'Кто идет на собрание?', time: '09:15', unread: 5 },
    { id: 3, name: 'Михаил Сидоров', message: 'Спасибо за фото!', time: 'вчера', unread: 0 }
  ];

  useEffect(() => {
    // Убираем инициализацию фейковых постов
    setPostsData([]);
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
        avatar: '/img/a34c9c60-b1fd-40fb-9711-2a46ec701434.jpg',
        nickname: formData.name.toLowerCase().replace(/\s+/g, '_'),
        verified: false,
        bio: '',
        postsCount: 0,
        followersCount: 0,
        followingCount: 0
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
        avatar: '/img/a34c9c60-b1fd-40fb-9711-2a46ec701434.jpg',
        nickname: 'gorkhon_user',
        verified: false,
        bio: 'Живу в прекрасном поселке Горхон',
        postsCount: 0,
        followersCount: 0,
        followingCount: 0
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
    setActiveTab('profile');
  };

  const handleCreatePost = () => {
    if (!newPost.trim()) return;
    const post: Post = {
      id: Date.now(),
      author: currentUser?.name || 'Неизвестный',
      nickname: currentUser?.nickname,
      avatar: currentUser?.avatar || '/img/a34c9c60-b1fd-40fb-9711-2a46ec701434.jpg',
      time: 'только что',
      content: newPost,
      likes: 0,
      comments: 0,
      liked: false,
      verified: currentUser?.verified || false
    };
    setPostsData(prev => [post, ...prev]);
    setNewPost('');
    
    // Обновляем счетчик постов пользователя
    if (currentUser) {
      const updatedUser = { ...currentUser, postsCount: (currentUser.postsCount || 0) + 1 };
      setCurrentUser(updatedUser);
      localStorage.setItem('gorkhonUser', JSON.stringify(updatedUser));
    }
  };

  const updateUser = (updates: Partial<User>) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      setCurrentUser(updatedUser);
      localStorage.setItem('gorkhonUser', JSON.stringify(updatedUser));
    }
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
    <div className="min-h-screen bg-gray-50">
      {/* Левая панель навигации */}
      <UserProfile
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Основной контент */}
      <div className="ml-64 min-h-screen">
        {/* Верхняя панель с кнопкой выхода */}
        <div className="sticky top-0 bg-white border-b border-gray-200 z-20 p-4">
          <div className="flex justify-end">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="flex items-center space-x-2"
            >
              <Icon name="LogOut" size={16} />
              <span>Выйти</span>
            </Button>
          </div>
        </div>

        {/* Контент страницы */}
        <div className="p-8">
          {activeTab === 'profile' && (
            <ProfileTab
              currentUser={currentUser}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'feed' && (
            <div className="max-w-2xl mx-auto">
              <FeedTab
                currentUser={currentUser}
                newPost={newPost}
                setNewPost={setNewPost}
                handleCreatePost={handleCreatePost}
                postsData={postsData}
                handleLike={handleLike}
              />
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="max-w-2xl mx-auto">
              <MessagesTab messages={messages} />
            </div>
          )}

          {activeTab === 'reels' && (
            <div className="max-w-2xl mx-auto">
              <ReelsTab />
            </div>
          )}

          {activeTab === 'settings' && (
            <SettingsTab
              currentUser={currentUser}
              updateUser={updateUser}
              setActiveTab={setActiveTab}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;