import {View, Text, StyleSheet, ImageBackground, FlatList, Modal, TouchableOpacity} from "react-native";
import { CheckBox } from 'react-native';
import {useEffect, useState} from "react";
import {getListOfTarefasFromDatabase} from "../../api/services/TarefasService";
import {getTokenFromStorage} from "../../api/services/TokenStorageService";
export default function HomeUser() {
    const [tarefasData, setTarefasData] = useState([]);

    useEffect(() => {
        const fetchTarefas = async ()=>{
            const tarefas = (await getListOfTarefasFromDatabase()).map((value) =>(
                {...value, checked: false}
            ))
            setTarefasData(tarefas)
        }
        fetchTarefas();
    }, []);

    return (
        <ImageBackground
            source={require("../../../assets/logo.svg")}
            style={styles.imageStyle}
            imageStyle={{opacity: 0.2}}
        >
            <View>
                <View style={styles.viewContainer}>
                    {tarefasData.length ===0?
                            <Text style={{color: 'white', padding: 8, textAlign: "center" }}>Você não tem nenhuma tarefa disponível no momento</Text>
                        :
                            <View>
                                <Text style={styles.titleStyle}>
                                    Tarefas
                                </Text>

                                <FlatList
                                    data={tarefasData}
                                    renderItem={({index})=>(
                                        <TouchableOpacity style={styles.taskContainer}>
                                            <CheckBox
                                                value ={tarefasData[index].checked}
                                                onValueChange = {(newValue) => {
                                                    const tarefasArray = [...tarefasData];
                                                    tarefasArray[index] = {...tarefasArray[index], checked: newValue};
                                                    setTarefasData(tarefasArray);
                                                }}
                                            />
                                            <Text style={tarefasData[index].checked === true? [styles.textStyle,{textDecorationLine: "line-through"}]:styles.textStyle}>{tarefasData[index].titulo}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                    }
                </View>
            </View>
        </ImageBackground>

    )


}
const styles = StyleSheet.create({
    imageStyle: {
        flex: 1,
        resizeMode: "cover",
        backgroundColor: "#202730",
        padding: 10
    },

    viewContainer: {
        marginTop: '10%',
        padding: '1%',
        borderColor: '#ffffff',
        borderRadius: 10,
        borderWidth: 2
    },

    textStyle: {
        fontSize: 16,
        color: "#ffffff",
        overflow: 'auto',
        marginLeft: 10,
        textAlign: 'justify'
    },

    titleStyle: {
        fontSize: 20,
        color: '#ac7aff',
        fontWeight: '600',
        textAlign: 'center',
    },

    taskContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10
    }

})