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
    justifyContent: 'space-between',
    borderWidth: 1,

    width: 'auto',
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
    }),
    paddingBottom: 20
    },
    image: {
        height: 70,
        width: 70,
        paddingHorizontal: 5
    },

    menu: {
        paddingLeft: 25,
        paddingRight: 25,
        paddingBottom:20
    }
})


