import { Image, StyleSheet, Text, View } from "react-native";

function Header() {
    const userDisplay = "Pavi"
    return (
        <View style={styles.header}>
            <Image source={require("../assets/facet.jpg")} style={styles.image} />
            <Text style={styles.menu}>Brands</Text>
            <Text style={styles.menu}>Globochat</Text>
            <Text style={styles.menu}>Register</Text>
            <Text style={styles.menu}>{userDisplay}</Text>
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