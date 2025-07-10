
import React, { useState } from 'react';
import { MessageForm } from '../components/MessageForm';
import { SearchForm } from '../components/SearchForm';
import { MessageCard } from '../components/MessageCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

interface SearchResult {
  found: boolean;
  message?: Message;
}

const Index = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string>('');

  const handleSubmitMessage = async (name: string, message: string) => {
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, message }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit message');
      }

      toast({
        title: "Success!",
        description: "Your message has been added to the guestbook.",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSearch = async (name: string) => {
    setIsSearching(true);
    setError('');
    setSearchResult(null);
    
    try {
      const response = await fetch(`/api/messages?name=${encodeURIComponent(name)}`);
      
      if (!response.ok) {
        throw new Error('Failed to search messages');
      }

      const data = await response.json();
      setSearchResult(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      toast({
        title: "Search Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome to Our Guestbook
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Share your thoughts and messages with our community. Leave your mark and discover what others have to say!
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-8">
            <ErrorMessage message={error} />
          </div>
        )}

        {/* Message Form */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Leave a Message
            </h2>
            <MessageForm 
              onSubmit={handleSubmitMessage} 
              isSubmitting={isSubmitting}
            />
          </div>
        </div>

        {/* Search Form */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Search Messages
            </h2>
            <SearchForm 
              onSearch={handleSearch} 
              isSearching={isSearching}
            />
          </div>
        </div>

        {/* Search Results */}
        {isSearching && (
          <div className="flex justify-center mb-8">
            <LoadingSpinner />
          </div>
        )}

        {searchResult && (
          <div className="mb-8">
            {searchResult.found && searchResult.message ? (
              <MessageCard message={searchResult.message} />
            ) : (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
                <div className="text-amber-600 text-lg font-medium">
                  Person not found
                </div>
                <p className="text-amber-500 mt-2">
                  No messages found for that name. Try searching for someone else!
                </p>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500">
          <p>&copy; 2025 Guestbook App. Built with React, Express, and Supabase.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
