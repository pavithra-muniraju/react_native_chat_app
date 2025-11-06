import {createContext, useState} from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { socket } from '../utils/socket';

export const GlobalContext = createContext(null);

export const GlobalProvider = (props) =>  {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedUser, setLoggedUser] = useState('');

    const [isConnected, setIsConnected] = useState(false);
    const [transport, setTransport] = useState('N/A');
    const [roomsListing, setRoomsListing] = useState([]);
    const [chatMessages, getChatMessages] = useState([]);
    const [userMessage, setUSerMessage] = useState('');

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

    const chatConnect = () => {
        setIsConnected(true);
        setTransport(socket.io.engine.transport.name);
        socket.io.engine.on('upgrade', (transport) => {
            setTransport(transport);
        });
    }

    const chatDisconnect = () => {
        socket.disconnect();
        setIsConnected(false);
        setTransport('N/A');
    };

    const globalConnection = () => {
        if(socket.connected) {
            chatConnect();
        } else {
           socket.connect();
        }
        socket.on('connect', chatConnect);
        socket.on('disconnect', chatDisconnect);

        return() => {
            socket.off('connect', chatConnect);
            socket.off('disconnect', chatDisconnect);
        }
    }

    const fetchRooms = () => {
        socket.emit('getRooms');
    }

    const listRooms = () => {
        socket.on('returnRooms', (rooms)=> {
            setRoomsListing(rooms);
        });
    }

    const joinRoom = (room, user) => {
        const messageTime = new Date().toLocaleString();
        let joinMessage = `${user} has joined the room. @ ${messageTime}`;
        socket.emit('connectRoom', room);
        socket.on('joinedRoom', (roomMessage) => getChatMessages(roomMessage)); 
        sendMessages(joinMessage, room, user);
    }

    const handleChatMessages = (value) => {
        console.log(value)
        getChatMessages(value)
    }

    const sendMessages = (userMessage, room_id, sender) => {
        if(userMessage) {
            const messageTime = new Date().toLocaleString();
            socket.emit('newPost', { userMessage, room_id, sender, messageTime});
            setUSerMessage('');
        } else {
            Alert.alert('Please enter a msg to send');
        }
    }
    return (
        <GlobalContext.Provider 
            value={{
                toggleLogin,
                getUser, 
                isLoggedIn, 
                setIsLoggedIn, 
                loggedUser,
	            getChatUser,
                isConnected,
                transport,
                roomsListing,
                chatConnect,
                chatDisconnect,globalConnection, 
                fetchRooms, listRooms, chatMessages, joinRoom, userMessage, 
                setUSerMessage, sendMessages, socket, handleChatMessages
            }}
        >
          {props.children}
        </GlobalContext.Provider>
      );

};