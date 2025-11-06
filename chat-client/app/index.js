import { Image, StyleSheet, Text, View } from "react-native";
import { GlobalContext } from "../providers/GlobalContext";
import { useContext } from "react";
import { useEffect } from "react";

function Home() {
    const {isConnected, chatDisconnect} = useContext(GlobalContext);
    useEffect(() => {
        if(isConnected) {
            console.log("Disconnecting from chat server");
            chatDisconnect();
        } else {
            console.log("Not connected to chat server");
        }
    },[])
    return( 
        <View>
            <Text>Home Page</Text>
            <Image source={require("../assets/wallpaperflare.com_wallpaper_old.jpg")} style={styles.backImage}/>
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    backImage: {
        width: '100%',
        height: 300,
        resizeMode: 'stretch'
    }
})