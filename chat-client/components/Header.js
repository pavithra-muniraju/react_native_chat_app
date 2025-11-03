import { Image, StyleSheet, Text, View } from "react-native";

function Header() {
    const userDisplay = "Pavi"
    return (
        <View>
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
        alignItems: 'center',
        backgroundColor: '#2121221',
        height: 120,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'stretch'
    },
    menu: {
        color: 'blue',
        fontSize: 16,
        alignSelf: 'center',
        paddingHorizontal: 5
    }
})