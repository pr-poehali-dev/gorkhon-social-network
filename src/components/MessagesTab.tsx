import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: number;
  name: string;
  message: string;
  time: string;
  unread: number;
}

interface MessagesTabProps {
  messages: Message[];
}

const MessagesTab: React.FC<MessagesTabProps> = ({ messages }) => {
  return (
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
  );
};

export default MessagesTab;