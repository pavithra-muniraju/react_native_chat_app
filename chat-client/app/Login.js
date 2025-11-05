import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { Alert, Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { GlobalContext } from "../providers/GlobalContext";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";


const windowHeight = Dimensions.get('window').height;
function Login() {

    const { setIsLoggedIn } = useContext(GlobalContext)
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const cancelLogin = () => {
        router.replace("/")
    }

    const registerUser = () => {
        router.push("/Register");
    }

    const loginUser = () => {
        if (!userName) {
            Alert.alert('Please enter the username');
        }
        else if (!password) {
            Alert.alert('Please enter the password');
        } else {
            AsyncStorage.getItem('userLoggedIn', (err, res) => {
                if (res != 'none') {
                    Alert.alert('Someone already Logged in');
                    router.replace("/");
                } else {
                    AsyncStorage.getItem(userName, (err, res) => {
                        if (res != null) {
                            if (res != password) {
                                Alert.alert('Invalid password');
                            } else {
                                AsyncStorage.setItem('userLoggedIn', userName, () => {
                                    setIsLoggedIn(true);
                                    router.replace('/');
                                    Alert.alert('User logged in successfully');
                                })
                            }
                        } else {
                            Alert.alert(`${userName} does not exits`);
                        }
                    })
                }
            })
        }


    }
    return (
        <SafeAreaView>
            <View style={styles.container} >
                <ScrollView style={styles.formView}>
                    <Text style={styles.title}>Login</Text>
                    <Text style={styles.label}>User Name :</Text>
                    <TextInput value={userName} style={styles.input} onChange={setUserName} placeholder="Enter user name" />
                    <Text style={styles.label}>Password :</Text>
                    <TextInput value={password} style={styles.input} onChange={setPassword} placeholder="Enter password" />
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={loginUser}><Text style={styles.login}>Login</Text></TouchableOpacity>
                        <TouchableOpacity onPress={registerUser}><Text style={styles.register}>Register User</Text></TouchableOpacity>
                        <TouchableOpacity onPress={cancelLogin}><Text style={styles.cancel}>Cancel Login</Text></TouchableOpacity>

                    </View>
                </ScrollView>

            </View>
        </SafeAreaView>
    )
}

export default Login;

const styles = StyleSheet.create({

    container: {
        height: windowHeight,
        paddingBottom: 60
    },
    formView: {
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingVertical: 10
    },
    label: {
        fontSize: 18,
        paddingTop: 10
    },
    input: {
        width: 250,
        height: 70,
        borderWidth: 1,
        padding: 10
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    login: {
        color: 'green'
    },
    register: {
        color: 'blue',
    },
    cancel: {
        color: 'red'
    }
})