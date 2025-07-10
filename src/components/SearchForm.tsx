
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';

interface SearchFormProps {
  onSearch: (name: string) => Promise<void>;
  isSearching: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isSearching }) => {
  const [searchName, setSearchName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchName.trim()) {
      setError('Please enter a name to search');
      return;
    }

    setError('');
    await onSearch(searchName.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="searchName" className="text-sm font-medium text-gray-700">
          Search by Name
        </Label>
        <div className="flex gap-3">
          <div className="flex-1">
            <Input
              id="searchName"
              type="text"
              value={searchName}
              onChange={(e) => {
                setSearchName(e.target.value);
                setError('');
              }}
              placeholder="Enter a name to search for..."
              className={`transition-colors ${
                error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
              }`}
              disabled={isSearching}
            />
            {error && (
              <p className="text-sm text-red-600 mt-1">{error}</p>
            )}
          </div>
          <Button
            type="submit"
            disabled={isSearching}
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            {isSearching ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Searching...
              </>
            ) : (
              <>
                <Search size={18} />
                Search
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};
