import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable';
import { useNavigation } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";
import {useEffect, useRef, useState} from "react";
import Icon from "react-native-vector-icons/Feather";
import {getFuncionario, submitFuncionarioEdit} from "../../api/services/FuncionarioService";
import CustomButton from "../../components/CustomButton";
import {DangerAlert, SuccessAlert} from "../../components/AlertComponent";


export default function Editor(props) {
    const navigation = useNavigation();
    const [nomeInput, setNomeInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [departamento, setDepartamento] = useState("");
    const [permissao, setPermissao] = useState("");
    const [funcionarioEditError, setFuncionarioEditError] = useState("");
    
    useEffect(() => {
        const fetchData = async ()=>{
            const funcionario = await getFuncionario(props.route.params.funcionario_id);
            setNomeInput(funcionario.nome);
            setEmailInput(funcionario.email);
        }
        fetchData();

    }, []);

    const departamentoDropdown = [
        { key: 'ADMINISTRACAO', value: 'Administração' },
        { key: 'MARKETING', value: 'Marketing' },
        { key: 'RH', value: 'Recursos Humanos' },
        { key: 'FINANCEIRO', value: 'Financeiro' },
        { key: 'LOGISTICA', value: 'Logística' },
        { key: 'JURIDICO', value: 'Jurídico' }
    ]
    const permissaoDropdown = [
        { key: 'ADMIN', value: 'Administrador' },
        { key: 'USER', value: 'Usuario' }
    ]

    return (
        <View style={styles.container}>

            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.massage}>Edição de Funcionário</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerFor}>

                {funcionarioEditError? <DangerAlert text = {funcionarioEditError} style ={{marginTop: 15}}/>: null}
                <View style={styles.viewDirection}>
                    <Icon style={styles.icon} name="user" size={25} color={'#000'} />
                    <Text style={styles.title}>Nome</Text>
                </View>

                <TextInput
                    placeholder=" Digite seu nome"
                    style={styles.input}
                    onChangeText={setNomeInput}
                    value = {nomeInput}
                />
                <View style={styles.viewDirection}>
                    <Icon style={styles.icon} name="mail" size={25} color={'#000'} />
                    <Text style={styles.title}>E-mail</Text>
                </View>

                <TextInput
                    placeholder=" Digite seu Email"
                    style={styles.input}
                    onChangeText={setEmailInput}
                    value = {emailInput}
                />
                <View style={styles.viewDirection}>
                    <Icon style={styles.icon} name="briefcase" size={25} color={'#000'} />
                    <Text style={styles.title}>Selecione um Departamento</Text>
                </View>

                <SelectList
                    boxStyles={styles.listStyle}
                    setSelected={setDepartamento}
                    data={departamentoDropdown}
                    defaultOption={{ key: 'ADMINISTRACAO', value: 'Administração' }}
                    search={false}
                />
                <View style={styles.viewDirection}>
                    <Icon style={styles.icon} name="tool" size={25} color={'#000'} />
                    <Text style={styles.title}>Permissao</Text>
                </View>
                <SelectList
                    boxStyles={styles.listStyle}
                    setSelected={setPermissao}
                    data={permissaoDropdown}
                    defaultOption={{ key: 'ADMIN', value: 'Administrador' }}
                    search={false}
                />
                <View style={styles.viewDirection2}>

                <CustomButton
                    text = {"Voltar"}
                    style = {styles.button}
                    onPress={() => navigation.navigate('HomeADM')}
                />
                <CustomButton
                    text = {"Alterar"}
                    style = {styles.button}
                    onPress = {async()=>{
                        const funcionario = {
                            id: props.route.params.funcionario_id,
                            nome: nomeInput,
                            email: emailInput,
                            departamento: departamento,
                            role: permissao
                        }
                        const status = await submitFuncionarioEdit(funcionario);
                        
                        if(status != ""){
                            setFuncionarioEditError(status);
                        }else{
                            setFuncionarioEditError("");
                            navigation.navigate('HomeADM');
                        }

                    }}
                />

                </View>

            </Animatable.View>

        </View>
    );
}

const styles = StyleSheet.create({

    viewDirection: {
        flexDirection: 'row',
        
    },
    viewDirection2: {
        flexDirection: 'row',
        justifyContent: 'space-between'

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
        width: '30%',
        marginTop: 14,
        marginBottom: 10
    },
    buttonText: {
        color: '#FFF',
        fontSize: '90%',
        fontWeight: 'bold'
    },
}) 