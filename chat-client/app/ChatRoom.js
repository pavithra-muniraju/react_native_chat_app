import { useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { GlobalContext } from "../providers/GlobalContext";

function ChatRoom() {
    const { room_id, roomTitle, sender } = useLocalSearchParams();

    const { chatMessages, joinRoom, userMessage, roomsListing,
        setUSerMessage, sendMessages, handleChatMessages, socket
    } = useContext(GlobalContext);

    const selectedRoom = roomsListing.filter((room) => room.roomId === room_id)[0];
    console.log(selectedRoom);

    const flatListRef = useRef();

    useLayoutEffect(() => {
        joinRoom(room_id, sender);
        flatListRef.current?.scrollToEnd({ animated: true });
    }, []);

    useEffect(() => {
        socket.on('newMessage', handleChatMessages)
    }, [socket]);

    const sendPost = () => {
        sendMessages(userMessage, room_id, sender);

    }

    const MessageComponent = ({ content, sent, user, sender }) => {
        const origin = user != sender;

        return (
            <View style={origin ? styles.roomMsgsContainer : styles.myMsgsConstainer}>
                <View style={origin ? styles.roomMsgs : styles.myMsgs}>
                    <View style={origin ? styles.roomTexts : styles.myText}>
                        <Text>{content}</Text>
                    </View>
                </View>
                <View>
                    <Text>{user} ------ {sent}</Text>
                </View>
            </View>
        )
    }

    return (
        <View>
            <Text style={styles.user}>Chat Room for: {roomTitle} - current user: {sender}</Text>
        
            <View>
                <FlatList style={styles.list}
                ref={flatListRef}
                data={chatMessages}
                renderItem={({item}) => <MessageComponent {...item} sender={sender}/>}
                keyExtractor={(item) => item.id}
                inverted={true}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                />
            </View>

            <View>
                <Text>Your Message:</Text>
                <TextInput value={userMessage} onChangeText={setUSerMessage} style={styles.input}/>
                <TouchableOpacity onPress={() => sendPost}><Text>Send Message</Text></TouchableOpacity>
            </View>
        </View>
    )
}

export default ChatRoom;

const styles = StyleSheet.create({
    roomMsgsContainer: {
padding: 10,
    },
    myMsgsConstainer: {
padding: 10,
    },
    roomMsgs: {
padding: 10,
    },
    myMsgs: {
padding: 10,
    },
    roomTexts: {
padding: 10,
    },
    myText: {
padding: 10,
    },
    list: {
        height: 300,
        margin: 20,
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
    },
    user: {
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'italic',
    }
})