import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Sidebar: React.FC = () => {
  return (
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
  );
};

export default Sidebar;