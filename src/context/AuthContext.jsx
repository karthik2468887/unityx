import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async (sessionUser) => {
      try {
        if (sessionUser) {
          const { data: profile, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", sessionUser.id)
            .single();

          if (error) {
            console.warn("Could not fetch user profile (maybe table/row missing):", error);
          }

          setUser({
            uid: sessionUser.id,
            email: sessionUser.email,
            role: profile?.role || sessionUser.user_metadata?.role || "student",
            name: profile?.name || sessionUser.user_metadata?.name || ""
          });
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Auth fetchUser error:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    // Check active sessions
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        fetchUser(session?.user);
      })
      .catch((err) => {
        console.error("Failed to get Supabase session:", err);
        setLoading(false);
      });

    // Listen for changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      fetchUser(session?.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    // setUser(null) is handled by onAuthStateChange event 'SIGNED_OUT' passing session=null
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        isMentor: user?.role === "mentor" || user?.role === "admin",
        logout
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);