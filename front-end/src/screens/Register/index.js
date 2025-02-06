import { View, Text, StyleSheet, TextInput, TouchableOpacity, Linking } from "react-native";
import * as Animatable from 'react-native-animatable';
import { useNavigation } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";
import { useRef, useState} from "react";
import { CheckBox } from 'react-native';
import Icon from "react-native-vector-icons/Feather";
import CustomButton from "../../components/CustomButton";
import {submitRegister} from "../../api/services/AuthenticationService";
import {DangerAlert} from "../../components/AlertComponent";


export default function Register(props) {
    const navigation = useNavigation();
    const [departamento, setDepartamento] = useState("");
    const [alterarCheckBox, setAlterarCheckBox] = useState(false);
    const [permissaoAcesso, setPermissaoAcesso] = useState("");
    const nomeInput = useRef("");
    const emailInput = useRef("");
    const senhaUmInput = useRef("");
    const senhaDoisInput = useRef("");
    const [registerError, setRegisterError] = useState("");
    

    const departamentoDropdown = [
        { key: 'MARKETING', value: 'Marketing' },
        { key: 'RH', value: 'Recursos Humanos' },
        { key: 'FINANCEIRO', value: 'Financeiro' },
        { key: 'LOGISTICA', value: 'Logística' },
        { key: 'JURIDICO', value: 'Jurídico' }
    ]

    return (
        <View style={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.massage}>Cadastro de Funcionario</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerFor}>
                {registerError? <DangerAlert text = {registerError} style = {{marginTop: 15}}/>:null}

                <View style={styles.viewDirection}>
                    <Icon style={styles.icon} name="user" size={25} color={'#000'} />
                    <Text style={styles.title}>Nome</Text>
                </View>

                <TextInput
                    placeholder=" Digite seu nome"
                    style={styles.input}
                    onChangeText={(value) => { nomeInput.current = value }}
                />
                <View style={styles.viewDirection}>
                    <Icon style={styles.icon} name="mail" size={25} color={'#000'} />
                    <Text style={styles.title}>E-mail</Text>
                </View>

                <TextInput
                    placeholder=" Digite seu Email"
                    style={styles.input}
                    onChangeText={(value) => { emailInput.current = value }}
                />
                <View style={styles.viewDirection}>
                    <Icon style={styles.icon} name="briefcase" size={25} color={'#000'} />
                    <Text style={styles.title}>Selecione um Departamento</Text>
                </View>

                <SelectList
                    boxStyles={styles.listStyle}
                    setSelected={(departamento) => {setDepartamento(departamento)}}
                    data={departamentoDropdown}
                    placeholder={"Departamentos"}
                    defaultOption={{key: 'MARKETING', value: 'Marketing'}}
                    search={false}
                />
                <View style={styles.viewDirection}>
                    <Icon style={styles.icon} name="lock" size={25} color={'#000'} />
                    <Text style={styles.title}>Senha</Text>
                </View>

                <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    onChangeText={(value) => { senhaUmInput.current = value }}
                />
                <View style={styles.viewDirection}>
                    <Icon style={styles.icon} name="lock" size={25} color={'#000'} />
                    <Text style={styles.title}>Confimar Senha</Text>
                </View>

                <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    onChangeText={(value) => { senhaDoisInput.current = value }}
                />
                
                <View style={styles.viewDirection}>
                    <Icon style={styles.icon} name="user" size={25} color={'#000'} />
                    <Text style={styles.title}>Permissão de acesso</Text>
                </View>

                <SelectList
                    boxStyles={styles.listStyle}
                    setSelected={(permissaoAcesso) => {setPermissaoAcesso(permissaoAcesso)}}
                    data={[
                        {key:'USER', value:'Usuário'},
                        {key:'ADMIN', value: 'Administrador'}
                    ]}
                    placeholder={"Tipo de acesso"}
                    defaultOption={{key: 'user', value: 'Usuário'}}
                    search={false}
                />

                <View style={styles.ViewCheckBoxStyle}>
                    <CheckBox
                        value={alterarCheckBox}
                        onValueChange={(newValue) => setAlterarCheckBox(newValue)}
                    />
                    <Text style={styles.txtCheckBox}>Aceitar os </Text>
                    <TouchableOpacity onPress={(Termos)}>
                        <Text style={styles.txtCheckBox2}>termos e serviço </Text>
                    </TouchableOpacity>
                    <Text>do aplicativo</Text>
                </View>

                <CustomButton
                    text = {"Cadastrar"}
                    style = {{marginTop: 14}}
                    onPress = {async ()=>{
                        const funcionario = {
                            nome: nomeInput.current,
                            email: emailInput.current.trim(),
                            departamento: departamento,
                            senhaUm: senhaUmInput.current.trim(),
                            senhaDois: senhaDoisInput.current.trim(),
                            role: permissaoAcesso
                        }

                        try{
                            await submitRegister(funcionario);
                            navigation.navigate('SignIn');
                        }catch (error){
                            setRegisterError(error.message);
                        }

                    }}
                />

                <TouchableOpacity
                    style={styles.buttonRegister}
                    onPress={() => navigation.navigate('SignIn')}>
                    <Text style={styles.registerText}>Já possui uma conta ? Clique aqui!</Text>
                </TouchableOpacity>

            </Animatable.View>

        </View>
    );
}
function Termos() {
    //link do drive para os termos e serviços
    Linking.openURL('https://drive.google.com/file/d/1vD2IQNzKQNWdJj1PUUQvac1SX5rhyHLN/view?usp=sharing')
}

const styles = StyleSheet.create({

    txtCheckBox: {
        marginLeft: 10

    },
    txtCheckBox2: {
        color: '#6b3dcc'
    },

    viewDirection: {
        flexDirection: 'row',
    },
    ViewCheckBoxStyle: {
        marginTop: 20,
        flexDirection: 'row'
    },

    listStyle: {
        borderColor: '#000',
        marginTop: 10,
    },

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
        marginTop: 5,
        fontSize: 16,
        padding: 5
    },
    icon: {
        marginRight: 5,
        color: "#2f2f2f",
        fontSize: 22,
        alignSelf: 'flex-end'
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

    }
}) 