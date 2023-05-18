import { createContext, useState } from 'react';

export const ChatContext = createContext(null);

const ChatProvider = ({ children }) => {
  const [chat, setChat] = useState([]);

  const newMessage = (item) => {
    setChat([...chat, item]);
  };

  const value = { chat, newMessage };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatProvider;
