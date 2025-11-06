import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { View } from "react-native";
import { GlobalContext } from "../providers/GlobalContext";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";

function Chat() {
    const router = useRouter();
    const { isLoggedIn, loggedUser, isConnected, transport, roomsListing,
        getChatUser, globalConnection, fetchRooms, listRooms } = useContext(GlobalContext);

    useEffect(() => {
        getChatUser(); // get current logged in user
        globalConnection(); // connect user ti server and update the changes
        fetchRooms(); // fetch available chat rooms from server
        listRooms();

    }, [isLoggedIn]);

    const avaialbleRoooms = (item) => {
        return (
            <View>
                 {/* onPress={() => router.push(`/ChatRoom/${item.item.roomId}`)} */}
                <TouchableOpacity style={styles.chatRoom} >
                    <Text style={styles.chatRoomTitle}>{item.item.roomName}</Text>
                    <Text style={styles.description}>{item.item.description}</Text>
                </TouchableOpacity>

            </View>
        )
    }

    return (
        <View>
            {!isLoggedIn ? router.replace('/Login') : (
                <View>

                    <Text style={styles.title}>Welocme to Chat Page - {loggedUser}</Text>
                    {isLoggedIn ? <Text style={styles.title}> Status: Connected</Text> : <Text style={styles.title}> Status: Not Connected</Text>}

                    <Text style={styles.title}>List of Available Rooms :</Text>
                    <FlatList data={roomsListing} renderItem={avaialbleRoooms} keyExtractor={(item) => item.roomId} />
                </View>
            )}


        </View>
    )
}

export default Chat;

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },

    chatRoomTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'underline',
        padding: 5,
        marginVertical: 10,
        paddingHorizontal: 10
    },
    description: {
        fontSize: 14,
        fontStyle: 'italic',
        textAlign: 'center',
        marginBottom: 10
    },
    chatRoom: {
        // borderWidth: 1,
        borderBottomColor: '#ccc',
        borderTopColor: '#ccc',
        // marginHorizontal: 20,
        
    }
})