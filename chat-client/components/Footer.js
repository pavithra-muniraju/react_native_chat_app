import { Image, StyleSheet, Text, View, Dimensions, Platform } from "react-native";

const windowSize = Dimensions.get('window');
const windowHeight = windowSize.height;

function Footer() {
    return (
        <View style={styles.footer}>
           <Image source={require("../assets/google.png")} style={styles.image} />
           <Text style={styles.menu}> Our Story</Text>
           <Text style={styles.menu}> Robotics</Text>
           <Text style={styles.menu}> Careers</Text>
        </View>
    )
}

export default Footer;

const styles = StyleSheet.create({
    footer: {
    alignItems: 'center',
    justifyContent: "center",
    borderWidth: 1,
    width: '100%',
    flexDirection: 'row',
    ...Platform.select({
        android: {
            position: 'absolute',
            top: windowHeight - 50,
        },
        default: {
            position: 'relative',
            bottom: 0,
        }
    })
    },
    image: {
        height: 20,
        width: '100%',
        paddingHorizontal: 5
    },

    menu: {
        paddingLeft: 25,
        paddingRight: 25
    }
})


