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
                <TouchableOpacity style={styles.chatRoom} onPress={() => router.push({
                    pathname: '/ChatRoom',
                    params: {
                        room_id: item.item.roomId,
                        roomTitle: item.item.roomName,
                        sender: loggedUser
                    }
                }

                )}>
                    <Text style={styles.chatRoomTitle}>{item.item.roomName}</Text>
                    <Text style={styles.description}>{item.item.description}</Text>
                </TouchableOpacity>

            </View>
        )
    }

    const RoomComponent = ({roomId, roomName, description}) => {
        console.log(roomId, roomName, description);
        return (
            <View>
                <Text>{roomName}:{roomId}</Text>
                <Text>{description}</Text>
            </View>
        )
    }
    return (
        <View>
            {!isLoggedIn ? router.replace('/Login') : (
                <View>

                    <Text style={styles.title}>Welocme to Chat Page - {loggedUser}</Text>
                   <Text style={styles.title}>Status: {isConnected? 'connected' : 'not connected'} </Text>
                    <Text style={styles.title}>Transport Method used : {transport}</Text>
                    <Text style={styles.title}>List of Available Rooms :</Text>
                    <FlatList data={roomsListing} renderItem={avaialbleRoooms} keyExtractor={(item) => item.roomId} />

                    {/* <FlatList 
                    data={roomsListing} 
                    renderItem={({item}) => <RoomComponent {...item} /> } 
                    keyExtractor={(item) => item.roomId} /> */}
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
        marginHorizontal: 10,
        paddingVertical: 10,
        borderTopWidth: 1
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