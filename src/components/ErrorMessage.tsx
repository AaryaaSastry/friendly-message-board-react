
import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
      <AlertCircle className="text-red-600 mt-0.5 flex-shrink-0" size={20} />
      <div>
        <h4 className="text-red-800 font-medium">Error</h4>
        <p className="text-red-700 mt-1">{message}</p>
      </div>
    </div>
  );
};
