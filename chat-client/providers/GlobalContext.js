import {createContext, useState} from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const GlobalContext = createContext(null);

export const GlobalProvider = (props) =>  {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedUser, setLoggedUser] = useState('');

    const toggleLogin = () => {
        if (isLoggedIn) {
            AsyncStorage.setItem('userLoggedIn', 'none', () => {
                setIsLoggedIn(false);
                setLoggedUser('');
                Alert.alert('User logged out');
            })
        }
        else {
            router.push('/Login');
        }    
    };

    const getUser = () => {
        AsyncStorage.getItem('userLoggedIn', (err, result) => {
            if (result==='none') {
                console.log('No one logged in');
            }
            else if (result===null) {
                AsyncStorage.setItem('userLoggedIn', 'none', () => {
                    console.log('Set user to NONE');
                });
            }
            else {
                setIsLoggedIn(true);
                setLoggedUser(result);
                console.log('Logged in user: ',loggedUser);
            } 
        });    
    };

    const getChatUser = () => {
        AsyncStorage.getItem('userLoggedIn', (err, result) => {
            if (result==='none') {
                console.log('No one logged in');
                Alert.alert('You need to Login to Chat');
                router.push('/Login');
            }
            else {
                console.log('logged in user: ', loggedUser)
            }
        });    
    };

    return (
        <GlobalContext.Provider 
            value={{
                toggleLogin,
                getUser, 
                isLoggedIn, 
                setIsLoggedIn, 
                loggedUser,
	            getChatUser,
            }}
        >
          {props.children}
        </GlobalContext.Provider>
      );

};