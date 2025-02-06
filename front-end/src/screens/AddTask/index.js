import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable';
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import CustomButton from "../../components/CustomButton";
import {useRef, useState} from "react";
import {registerNewTarefa} from "../../api/services/TarefasService";
import {DangerAlert, SuccessAlert} from "../../components/AlertComponent";

export default function AddTask(props) {
    const navigation = useNavigation();
    const tituloInput = useRef("");
    const descricaoInput = useRef("");
    const [taskRegisterError, setTaskRegisterError] = useState("");
    const [taskRegisterSuccess, setTaskRegisterSuccess] = useState("");
    return (
        <View style={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Adicionar Tarefa</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerFor}>
                {taskRegisterError? <DangerAlert text = {taskRegisterError} style ={{marginTop: 15}}/>: null}
                {taskRegisterSuccess? <SuccessAlert text = {taskRegisterSuccess} style = {{marginTop: 15}}/>:null}
                <View style={styles.viewDirection}>
                    <Icon style={styles.icon} name="edit-3" size={25} color={'#000'} />
                    <Text style={styles.title}>Titulo</Text>
                </View>

                <TextInput
                    style={styles.input}
                    onChangeText={(value)=>{tituloInput.current=value}}
                />
                <View style={styles.viewDirection}>
                    <Icon style={styles.icon} name="file-text" size={25} color={'#000'} />
                    <Text style={styles.title}>Descrição</Text>
                </View>

                <TextInput
                    style={styles.input}
                    onChangeText={(value) => {descricaoInput.current = value}}
                />

                <View style={styles.viewDirection2}>
                    <CustomButton
                        text={"Voltar"}
                        style = {styles.button}
                        onPress = {()=>{navigation.navigate('HomeADM');}}
                    />
                    <CustomButton
                        text={"Adicionar"}
                        style = {styles.button}
                        onPress = {async ()=>{
                            const funcionarioID = props.route.params.funcionario_id;

                            const JSONObject = {
                                titulo: tituloInput.current,
                                descricao: descricaoInput.current,
                                funcionario_id: funcionarioID
                            }
                            try {
                                setTaskRegisterError("");
                                setTaskRegisterSuccess(await registerNewTarefa(JSONObject));
                            }catch(error){
                                setTaskRegisterSuccess("");
                                setTaskRegisterError(error.message);
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
    container: {
        flex: 1,
        backgroundColor: '#202730'
    },
    containerHeader: {
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%',
    },
    message: {
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
        marginTop: 14,
        width: "30%",
        marginBottom: 10
    }
}) 