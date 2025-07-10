
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Send } from 'lucide-react';

interface MessageFormProps {
  onSubmit: (name: string, message: string) => Promise<void>;
  isSubmitting: boolean;
}

export const MessageForm: React.FC<MessageFormProps> = ({ onSubmit, isSubmitting }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({});

  const validateForm = () => {
    const newErrors: { name?: string; message?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!message.trim()) {
      newErrors.message = 'Message is required';
    } else if (message.trim().length < 5) {
      newErrors.message = 'Message must be at least 5 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    await onSubmit(name.trim(), message.trim());
    
    // Clear form on successful submission
    setName('');
    setMessage('');
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-gray-700">
            Your Name
          </Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className={`transition-colors ${
              errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
            }`}
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-sm font-medium text-gray-700">
          Your Message
        </Label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Share your thoughts..."
          rows={4}
          className={`transition-colors resize-none ${
            errors.message ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
          }`}
          disabled={isSubmitting}
        />
        {errors.message && (
          <p className="text-sm text-red-600">{errors.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
            Submitting...
          </>
        ) : (
          <>
            <Send size={18} />
            Submit Message
          </>
        )}
      </Button>
    </form>
  );
};
