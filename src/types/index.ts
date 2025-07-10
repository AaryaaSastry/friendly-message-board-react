
export interface Message {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

export interface CreateMessageRequest {
  name: string;
  message: string;
}

export interface CreateMessageResponse {
  success: boolean;
  message?: Message;
  error?: string;
}

export interface SearchMessageResponse {
  found: boolean;
  message?: Message;
  error?: string;
}

export interface ApiError {
  error: string;
  details?: string;
}
