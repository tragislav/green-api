import { useContext } from 'react';
import { ChatContext } from '../components/HOCs/ChatProvider';

export function useChat() {
  return useContext(ChatContext);
}
