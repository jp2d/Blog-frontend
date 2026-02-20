import React, { createContext, useState } from "react";

interface AuthContextType {
  logged: boolean;
  profile: any;
  login: (token: string, profile: any) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  logged: false,
  profile: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [logged, setLogged] = useState(!!localStorage.getItem("token"));
  const [profile, setProfile] = useState<any>(() => {
    const p = localStorage.getItem("profile");
    return p ? JSON.parse(p) : null;
  });

  const login = (token: string, profile: any) => {
    localStorage.setItem("token", token);
    localStorage.setItem("profile", JSON.stringify(profile));
    setLogged(true);
    setProfile(profile);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    setLogged(false);
    setProfile(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ logged, profile, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};