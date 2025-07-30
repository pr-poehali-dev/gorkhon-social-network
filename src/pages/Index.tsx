import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [newPost, setNewPost] = useState('');

  const posts = [
    {
      id: 1,
      author: 'Анна Петрова',
      avatar: '/img/a34c9c60-b1fd-40fb-9711-2a46ec701434.jpg',
      time: '2 часа назад',
      content: 'Какая красота в нашем Горхоне сегодня! Солнце светит, птички поют 🌞',
      image: '/img/a34c9c60-b1fd-40fb-9711-2a46ec701434.jpg',
      likes: 24,
      comments: 8
    },
    {
      id: 2,
      author: 'Михаил Сидоров',
      avatar: '/img/fc06f7ea-92cf-4e5f-8641-5230751df945.jpg',
      time: '4 часа назад',
      content: 'Отличный семейный пикник получился! Спасибо всем соседям за компанию!',
      image: '/img/fc06f7ea-92cf-4e5f-8641-5230751df945.jpg',
      likes: 31,
      comments: 12
    },
    {
      id: 3,
      author: 'Елена Васильева',
      avatar: '/img/8c9dbc3f-89a6-4fa3-a5b2-bd7fd99a847b.jpg',
      time: '6 часов назад',
      content: 'Подготовка к летнему фестивалю идет полным ходом! Приходите все 15 августа!',
      image: '/img/8c9dbc3f-89a6-4fa3-a5b2-bd7fd99a847b.jpg',
      likes: 47,
      comments: 18
    }
  ];

  const messages = [
    { id: 1, name: 'Анна Петрова', message: 'Привет! Как дела?', time: '10:30', unread: 2 },
    { id: 2, name: 'Соседский чат', message: 'Кто идет на собрание?', time: '09:15', unread: 5 },
    { id: 3, name: 'Михаил Сидоров', message: 'Спасибо за фото!', time: 'вчера', unread: 0 }
  ];

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
              <Avatar>
                <AvatarImage src="/img/a34c9c60-b1fd-40fb-9711-2a46ec701434.jpg" />
                <AvatarFallback>ВЫ</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Левая панель - Профиль */}
          <div className="lg:col-span-1">
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <CardHeader className="text-center">
                <Avatar className="mx-auto mb-4 w-20 h-20">
                  <AvatarImage src="/img/a34c9c60-b1fd-40fb-9711-2a46ec701434.jpg" />
                  <AvatarFallback>ВЫ</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg">Ваш профиль</h3>
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
                    Рилс
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Центральная часть */}
          <div className="lg:col-span-2">
            {activeTab === 'feed' && (
              <div className="space-y-6">
                {/* Создать пост */}
                <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex space-x-4">
                      <Avatar>
                        <AvatarImage src="/img/a34c9c60-b1fd-40fb-9711-2a46ec701434.jpg" />
                        <AvatarFallback>ВЫ</AvatarFallback>
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
                          <Button className="bg-gradient-to-r from-coral to-turquoise text-white">
                            Опубликовать
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Посты */}
                {posts.map((post) => (
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
                          <Button variant="ghost" size="sm" className="text-coral hover:text-coral/80">
                            <Icon name="Heart" size={18} className="mr-1" />
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
            )}

            {activeTab === 'messages' && (
              <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <h3 className="text-xl font-semibold">Сообщения</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div key={msg.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                        <Avatar>
                          <AvatarFallback>{msg.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">{msg.name}</h4>
                            <span className="text-xs text-muted-foreground">{msg.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{msg.message}</p>
                        </div>
                        {msg.unread > 0 && (
                          <Badge variant="default" className="bg-coral text-white">
                            {msg.unread}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'reels' && (
              <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <h3 className="text-xl font-semibold">Рилс Горхона</h3>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Icon name="Play" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <h4 className="text-lg font-semibold mb-2">Скоро здесь появятся рилс!</h4>
                    <p className="text-muted-foreground">
                      Жители Горхона смогут делиться короткими видео о жизни поселка
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Правая панель */}
          <div className="lg:col-span-1">
            {/* Новости поселка */}
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg mb-4">
              <CardHeader>
                <h3 className="font-semibold text-lg">Новости Горхона</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Летний фестиваль 2024</h4>
                  <p className="text-xs text-muted-foreground">15 августа в центральном парке</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Ремонт дороги</h4>
                  <p className="text-xs text-muted-foreground">Начало работ с 1 сентября</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Субботник</h4>
                  <p className="text-xs text-muted-foreground">Каждую субботу в 9:00</p>
                </div>
              </CardContent>
            </Card>

            {/* Активные соседи */}
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <h3 className="font-semibold text-lg">Активные соседи</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['Анна Петрова', 'Михаил Сидоров', 'Елена Васильева'].map((name) => (
                    <div key={name} className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs">{name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{name}</p>
                      </div>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;