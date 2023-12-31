import React, { createContext, useContext, useState, type ReactNode, useEffect, useRef } from 'react';

type User = string;

interface UserContextValue {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const defaultUser = '[type your username here]';

const UserContext = createContext<UserContextValue | undefined>({
  user: defaultUser,
  setUser: () => console.warn('setUser was called without UserProvider')
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(defaultUser);

  useEffect(() => {
    const localUser = localStorage.getItem('user');
    if (user === defaultUser && localUser){
      setUser(localUser)
      return;
    }
    localStorage.setItem('user', user);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = (): UserContextValue => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
