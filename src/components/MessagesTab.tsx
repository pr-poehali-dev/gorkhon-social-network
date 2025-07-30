import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Message {
  id: number;
  name: string;
  message: string;
  time: string;
  unread: number;
}

interface ChatMessage {
  id: number;
  sender: string;
  message: string;
  time: string;
  isMe: boolean;
}

interface MessagesTabProps {
  messages: Message[];
  currentUser: any;
}

const MessagesTab: React.FC<MessagesTabProps> = ({ messages, currentUser }) => {
  const [selectedChat, setSelectedChat] = useState<Message | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: 'Анна Петрова',
      message: 'Привет! Как дела?',
      time: '10:30',
      isMe: false
    },
    {
      id: 2,
      sender: 'Вы',
      message: 'Привет! Все отлично, спасибо! А у тебя как?',
      time: '10:32',
      isMe: true
    },
    {
      id: 3,
      sender: 'Анна Петрова',
      message: 'Тоже хорошо! Завтра на субботник идешь?',
      time: '10:35',
      isMe: false
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;
    
    const message: ChatMessage = {
      id: Date.now(),
      sender: 'Вы',
      message: newMessage,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };
    
    setChatMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const handleChatSelect = (chat: Message) => {
    setSelectedChat(chat);
    // Имитируем загрузку сообщений для выбранного чата
    if (chat.name === 'Соседский чат') {
      setChatMessages([
        {
          id: 1,
          sender: 'Михаил Сидоров',
          message: 'Кто идет на собрание завтра?',
          time: '09:15',
          isMe: false
        },
        {
          id: 2,
          sender: 'Елена Васильева',
          message: 'Я буду! Важные вопросы обсуждать будем',
          time: '09:20',
          isMe: false
        },
        {
          id: 3,
          sender: 'Вы',
          message: 'И я приду, во сколько начинаем?',
          time: '09:25',
          isMe: true
        }
      ]);
    }
  };

  if (selectedChat) {
    return (
      <div className="flex flex-col h-[80vh] bg-white rounded-lg shadow-sm">
        {/* Заголовок чата */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSelectedChat(null)}
              className="p-2"
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <Avatar className="w-10 h-10">
              <AvatarFallback>{selectedChat.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{selectedChat.name}</h3>
              <p className="text-sm text-gray-500">в сети</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm">
              <Icon name="Phone" size={20} />
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="Video" size={20} />
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="Info" size={20} />
            </Button>
          </div>
        </div>

        {/* Сообщения */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatMessages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                msg.isMe 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p className="text-sm">{msg.message}</p>
                <p className={`text-xs mt-1 ${
                  msg.isMe ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Ввод сообщения */}
        <div className="p-4 border-t">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Icon name="Plus" size={20} />
            </Button>
            <div className="flex-1 relative">
              <Input
                placeholder="Напишите сообщение..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="pr-12"
              />
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute right-1 top-1/2 transform -translate-y-1/2"
              >
                <Icon name="Smile" size={16} />
              </Button>
            </div>
            <Button 
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Icon name="Send" size={16} />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Сообщения</h2>
        <Button variant="ghost" size="sm">
          <Icon name="Edit" size={20} />
        </Button>
      </div>

      {/* Поиск */}
      <div className="relative">
        <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input 
          placeholder="Поиск сообщений..." 
          className="pl-10"
        />
      </div>

      {/* Список чатов */}
      <Card className="bg-white shadow-sm">
        <CardContent className="p-0">
          <div className="space-y-1">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className="flex items-center space-x-3 p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                onClick={() => handleChatSelect(msg)}
              >
                <Avatar className="w-12 h-12">
                  <AvatarFallback>{msg.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium truncate">{msg.name}</h4>
                    <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{msg.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{msg.message}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {msg.unread > 0 && (
                    <Badge className="bg-blue-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center">
                      {msg.unread}
                    </Badge>
                  )}
                  <Icon name="ChevronRight" size={16} className="text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Пустое состояние, если нет сообщений */}
      {messages.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <Icon name="MessageCircle" size={32} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Нет сообщений</h3>
          <p className="text-gray-600 mb-6">
            Начните общение с соседями и друзьями из Горхона
          </p>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            <Icon name="Plus" size={16} className="mr-2" />
            Написать сообщение
          </Button>
        </div>
      )}
    </div>
  );
};

export default MessagesTab;