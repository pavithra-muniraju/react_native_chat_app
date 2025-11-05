import { Image, StyleSheet, Text, View } from "react-native";

function Home() {
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