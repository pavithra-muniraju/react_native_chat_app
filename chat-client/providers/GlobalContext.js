import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { createContext, useState } from "react";
import { Alert } from "react-native";

export const GlobalContext = createContext(null);

export const GlobalProvider = (props) => {
    const router = useRouter();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState('');

    const toggleLogin = () => {
        if (isLoggedIn) {
            AsyncStorage.setItem('userLoggedIn', 'none', () => {
                setIsLoggedIn(false);
                setLoggedInUser('');
                Alert.alert('user logged out');
            })
        } else {
            router.push('/Login');
        }
    }

    const getLoggedInUser = () => {
        AsyncStorage.getItem('userLoggedIn', (err, res) => {
            if (res === 'none') {
                console.log('no user logged in');
            } else if (res === null) {
                AsyncStorage.setItem('userLoggedIn', 'none', () => {
                    console.log('user intialized to none');
                })
            } else {
                setIsLoggedIn(true);
                setLoggedInUser(res);
                console.log('logged in user: ' + res);
            }

        })
    }

    const getChatUser = () => {
        AsyncStorage.getItem('userLoggedIn', (err, res) => {
            if (res === 'none') {
                console.log('no user logged in');
                Alert.alert('Please log in to the chat');
                router.push('./Login')
            } else {
                console.log('chat user: ' + res);
            }
        })
    }

    return (
        <GlobalContext.Provider
            value={{
                toggleLogin,
                getChatUser,
                isLoggedIn,
                setIsLoggedIn,
                loggedInUser,
                setLoggedInUser
            }}
        >
            {props.childres}
        </GlobalContext.Provider>
    )
}