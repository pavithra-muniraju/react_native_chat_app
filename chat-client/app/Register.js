import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Alert, Dimensions, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

const windowHeight = Dimensions.get('window').height;
function Register() {
    const router = useRouter();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const cancelRegistration = () => {
        router.push("/");
    }

    const registerUser = () => {
        if (!userName) {
            Alert.alert('Please enter the username');
        }
        else if (!password) {
            Alert.alert('Please enter the password');
        }
        else if (!passwordConfirm) {
            Alert.alert('Please confirm the password');
        }
        else if (password !== passwordConfirm) {
            Alert.alert('Password do not match');
        } else {
            AsyncStorage.getItem(userName, (err, res) => {
                if(res !== null) {
                    Alert.alert('USer name alredt registerd');                    
                } else {
                    AsyncStorage.setItem(userName, password, () => {
                        Alert.alert('Account created for the user' + userName);
                    });
                    router.replace("/");
                }
            })
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.formView}>
                <Text style={styles.title}>User Registration</Text>
                <Text style={styles.label}>User Name :</Text>
                <TextInput value={userName} style={styles.input} onChange={setUserName} placeholder="Enter user name" />
                <Text style={styles.label}>Password :</Text>
                <TextInput value={password} style={styles.input} onChange={setPassword} placeholder="Enter password" />
                <Text style={styles.label}>Confirm Password :</Text>
                <TextInput value={passwordConfirm} style={styles.input} onChange={setPasswordConfirm} placeholder="Confirm Password" secureTextEntry={true} />
            
                <TouchableOpacity onPress={registerUser} ><Text style={styles.register}>Register the Account</Text></TouchableOpacity>
                <TouchableOpacity onPress={cancelRegistration} ><Text style={styles.cancel}>Cancel Registration</Text></TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default Register;

const styles= StyleSheet.create({
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
    register: {
        color: 'blue',
    },
    cancel: {
        color: 'red'
    }
})