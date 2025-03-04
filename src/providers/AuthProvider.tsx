import { AuthContext } from "@/context/AuthContext";
import { NetworkData } from "@/lib/network-data";
import { User } from "@/types";
import PropTypes from "prop-types";
import { ReactNode, useCallback, useEffect, useState } from "react";

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      const accessToken = NetworkData.getAccessToken();
      if (!accessToken) {
        setLoading(false);
        return;
      }

      try {
        const { error, data } = await NetworkData.getUserLogged();
        if (error || !data) {
          NetworkData.putAccessToken("");
          setUser(null);
          setLoading(false);
        } else {
          setUser(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        NetworkData.putAccessToken("");
        setUser(null);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { error, data } = await NetworkData.login({
      email,
      password,
    });

    if (!error && data) {
      NetworkData.putAccessToken(data.accessToken);

      const { error: userError, data: userData } =
        await NetworkData.getUserLogged();

      if (!userError && userData) {
        setUser({ ...userData });
        return true;
      }
    } else {
      console.error("Login failed: No accessToken found");
    }

    return false;
  }, []);

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      const { error } = await NetworkData.register({
        name,
        email,
        password,
      });

      return !error;
    },
    [],
  );

  const logout = useCallback(() => {
    NetworkData.putAccessToken("");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
