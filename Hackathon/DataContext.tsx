import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the state
interface AppContextType {
  isAuthenticated: number;
  setAuthenticated: (auth: number) => void;
}

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create the provider component
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<number>(1);

  const setAuthenticated = (auth: number) => {
    setIsAuthenticated(auth);
  };

  return (
    <AppContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {children}
    </AppContext.Provider>
  );
};

// Create a custom hook to use the context
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
