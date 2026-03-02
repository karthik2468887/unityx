import { supabase } from '../lib/supabase';

export const signup = async (name, email, password, role = "student") => {
  if (role === "admin") {
    throw new Error("Admin signup not allowed");
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        role
      }
    }
  });

  if (error) {
    throw error;
  }

  if (data.user) {
    const { error: dbError } = await supabase
      .from('users')
      .insert([{ id: data.user.id, email, role, name: name }]);

    if (dbError) {
      console.error("Error inserting user into DB:", dbError);
    }
  }

  return data.user;
};

export const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    throw error;
  }

  return data;
};