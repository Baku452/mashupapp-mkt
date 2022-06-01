import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export function UserContextProvider({children}) {
  const [token, setTokenState] = useState();
  const [userID, setUserID] = useState();

  const setToken = async tokenData => {
    if (tokenData === null) {
      try {
        await AsyncStorage.removeItem('@token');
        setTokenState(tokenData);
      } catch (error) {
        Promise.reject(error);
      }
    } else {
      try {
        await AsyncStorage.setItem('@token', tokenData);
        setTokenState(tokenData);
      } catch (error) {
        Promise.reject(error);
      }
    }
  };
  useEffect(() => {
    AsyncStorage.getItem('@token')
      .then(value => {
        if (value) {
          setToken(value);
        }
      })
      .catch(e => {
        throw new Error('No token saved', e);
      });

    AsyncStorage.getItem('@userID')
      .then(value => {
        if (value) {
          setUserID(value);
        }
      })
      .catch(e => {
        throw new Error('No User saved', e);
      });
  }, []);
  return (
    <UserContext.Provider
      value={{
        token,
        userID,
        setUserID,
        setToken,
      }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
