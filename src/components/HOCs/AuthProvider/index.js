import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [chat, setChat] = useState([]);

  const signIn = (newUser, cb) => {
    setUser(newUser);
    cb();
  };
  const signOut = (cb) => {
    setUser(null);
    cb();
  };

  const newMessage = (item) => {
    setChat([...chat, item]);
  };

  const value = { user, signIn, signOut, chat, newMessage };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
