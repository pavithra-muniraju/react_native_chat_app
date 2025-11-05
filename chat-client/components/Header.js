import { Image, StyleSheet, Text, View } from "react-native";
import { FontAwesome6  } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../providers/GlobalContext";

function Header() {

    const router = useRouter();

    const {toggleLogin, getUser, isLoggedIn} = useContext(GlobalContext);

    useEffect(() => {
        getUser();
        
    }, [isLoggedIn])


    const userDisplay = isLoggedIn? <FontAwesome6 name="user-circle" size={24} color="black" /> :  <FontAwesome6 name="user-circle" size={24} color="blue" /> ;
    return (
        <View style={styles.header}>
            <Image source={require("../assets/facet.jpg")} style={styles.image} />
            <Text style={styles.menu}>Brands</Text>
            <Text style={styles.menu}>Globochat</Text>
            <Text style={styles.menu} onPress={()=> router.push("/Register")}>Register</Text>
            <Text style={styles.menu} onPress={toggleLogin}>{userDisplay}</Text>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#2121221',
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
    justifyContent: 'space-between',
        paddingHorizontal: 5,
    },
    image: {
        width: 50,
        height: 50,
        resizeMode: 'stretch'
    },
    menu: {
        color: 'blue',
        fontSize: 16,
        alignSelf: 'center',
        paddingHorizontal: 5
    }
})