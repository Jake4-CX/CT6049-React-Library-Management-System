import React, { useEffect, ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, setTokens } from '../redux/features/user-slice';
import { getLocalStoredTokens, validateUserAccessToken } from '../api/authentication';
// Additional imports if needed

type AppInitializerProps = {
  children: ReactNode;
};

const AppInitializer: React.FC<AppInitializerProps> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {

    const initializeAuth = async () => {
      const userTokens = getLocalStoredTokens();

      if (userTokens) {
        const accessToken = userTokens.accessToken;

        try {
          // Verify accessToken logic
          const userDataResponse = await validateUserAccessToken(accessToken);
          const userData: { data: UserDataType } = userDataResponse.data;

          // Dispatch actions to set user data and tokens
          dispatch(setUser(userData.data));
          dispatch(setTokens(userTokens));
        } catch (error) {
          console.error("Error validating access token:", error);
          // Handle error (e.g., clear tokens, redirect to login, etc.)
        }
      }

    };

    initializeAuth();
  }, [dispatch]);

  return children;
};

export default AppInitializer;