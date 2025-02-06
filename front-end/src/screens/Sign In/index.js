import React, {useEffect, useRef, useState} from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable';
import {jwtDecode} from "jwt-decode";
import { submitLogin } from "../../api/services/AuthenticationService";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { setTokenInStorage } from "../../api/services/TokenStorageService";
import { DangerAlert } from "../../components/AlertComponent";


export default function SignIn() {
    const emailInput = useRef("");
    const senhaInput = useRef("");
    const [loginError, setLoginError] = useState("");
    const navigation = useNavigation();


    return (
        <View style={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.massage}>Bem vindo(a)!</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerFor}>

                <View style={styles.viewDirection}>
                    <Icon style={styles.icon} name="mail" size={25} color={'#000'} />
                    <Text style={styles.title}>E-mail</Text>
                </View>

                <TextInput
                    placeholder="Digite um email..."
                    style={styles.input}
                    onChangeText={(text) => { emailInput.current = text; }}
                />

                <View style={styles.viewDirection}>
                    <Icon style={styles.icon} name="lock" size={25} color={'#000'} />
                    <Text style={styles.title}>Senha</Text>
                </View>

                <TextInput
                    secureTextEntry={true}
                    placeholder="Sua Senha"
                    style={styles.input}
                    onChangeText={(text) => { senhaInput.current = text; }}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={async () => {
                        try {
                            const token = await submitLogin(emailInput.current.trim(), senhaInput.current.trim());
                            await setTokenInStorage(token);
                            const userPermission = jwtDecode(token).admin;
                            if(userPermission === true){
                                navigation.navigate('HomeADM')
                            }else{
                                navigation.navigate('HomeUser')
                            }

                        } catch (error) {
                            setLoginError(error.message);
                        }
                    }}>

                    <Text style={styles.buttonText}>Acessar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonRegister}
                    onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.registerText}>Não posui uma conta? Cadastre-se</Text>
                </TouchableOpacity>

                {loginError ? <DangerAlert text={loginError} style={{ marginTop: 25 }} /> : <></>}


            </Animatable.View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#202730'
    },
    containerHeader: {
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%',
    },
    massage: {
        fontSize: 28,
        fontWeight: "bold",
        color: '#FFF'
    },
    containerFor: {
        backgroundColor: '#FFF',
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: "5%"
    },
    title: {
        fontSize: 20,
        marginTop: 25,
    },
    input: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#875AE6',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttonRegister: {
        marginTop: 14,
        alignSelf: 'center'
    },
    registerText: {
        color: '#6f706f'

    },
    icon: {
        marginRight: 5,
        color: "#2f2f2f",
        fontSize: 22,
        alignSelf: 'flex-end'

    },
    viewDirection: {
        flexDirection: 'row'
    },
}) 