import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('@token');
    return token;
  } catch (e) {
    throw new Error('No token saved', e);
  }
};

const getUserID = async () => {
  try {
    const userID = await AsyncStorage.getItem('@userID');
    return userID;
  } catch (e) {
    throw new Error('No userID saved', e);
  }
};

export function UserContextProvider({children}) {
  const [token, setToken] = useState();
  const [userID, setUserID] = useState(async () => await getUserID());
  const [val, setVal] = useState(0);

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
        val,
        setVal,
        setUserID,
        setToken,
      }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
