import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const ReelsTab: React.FC = () => {
  return (
    <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <h3 className="text-xl font-semibold">Reels Горхона</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-black rounded-lg aspect-[9/16] max-w-xs mx-auto relative overflow-hidden">
            <img 
              src="/img/fc06f7ea-92cf-4e5f-8641-5230751df945.jpg" 
              alt="Reels" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <Button size="lg" className="rounded-full bg-white/20 hover:bg-white/30">
                <Icon name="Play" size={32} className="text-white" />
              </Button>
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="text-sm font-medium">Семейный пикник в Горхоне</p>
              <p className="text-xs opacity-80">@михаил_сидоров</p>
            </div>
          </div>
          <div className="text-center">
            <Button className="bg-gradient-to-r from-coral to-turquoise text-white">
              <Icon name="Plus" size={18} className="mr-2" />
              Создать Reels
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReelsTab;