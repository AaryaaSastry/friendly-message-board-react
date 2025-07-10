
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { User, Calendar } from 'lucide-react';

interface Message {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

interface MessageCardProps {
  message: Message;
}

export const MessageCard: React.FC<MessageCardProps> = ({ message }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="text-blue-600" size={20} />
            <h3 className="text-lg font-semibold text-gray-900">{message.name}</h3>
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <Calendar size={16} />
            <span>{formatDate(message.created_at)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 leading-relaxed">{message.message}</p>
      </CardContent>
    </Card>
  );
};
