import {View, Text, FlatList, ImageBackground, StyleSheet} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {DataTable, Portal, TouchableRipple, Searchbar, Menu, Provider} from 'react-native-paper';
import {useEffect, useState} from "react";
import {deleteFuncionario, getFuncionarioList} from "../../api/services/FuncionarioService";
import {useNavigation, useIsFocused} from "@react-navigation/native";

//Sim, eu mudei de ideia e decidi fazer com uma tabela. Na hora da apresentação nós vamos mostrar essa parte com a tela na horizontal.
export default function HomeADM(props) {
    const navigation = useNavigation();
    const [nomeSearchInput, setNomeSearchInput] = useState("");
    const [funcionariosData, setFuncionariosData] = useState([]);
    const [funcionarioID, setFuncionarioID] = useState(0);
    const isFocused = useIsFocused();

    const CONSTANTS = {
        NORMAL: "normal",
        SEARCH: "search"
    };

    const fetchData = async(type)=> {
        let funcionario = [];
        if(CONSTANTS.NORMAL == type) {
            funcionario = (await getFuncionarioList()).map((value) => (
                {...value, visible: false}
            ))
        }
        if(CONSTANTS.SEARCH == type){
            funcionario = (await getFuncionarioList(nomeSearchInput)).map((value) => (
                {...value, visible: false}
            ))
        }

        setFuncionariosData(funcionario);
    }

    const showMenu = (index)=>{
        const funcionarioArray = [...funcionariosData];
        funcionarioArray[index] = {...funcionarioArray[index], visible: true};
        setFuncionariosData(funcionarioArray);
    };
    const hideMenu = (index)=>{
        const funcionarioArray = [...funcionariosData];
        funcionarioArray[index] = {...funcionarioArray[index], visible: false};
        setFuncionariosData(funcionarioArray);
    };

    useEffect(()=>{
        fetchData(CONSTANTS.NORMAL);
    },[isFocused]);

    const departamentoObject = {
        ADMINISTRACAO: 'Administração',
        MARKETING: 'Marketing',
        RH: 'Recursos Humanos',
        FINANCEIRO:'Financeiro',
        LOGISTICA:'Logística',
        JURIDICO:'Jurídico'
    }

    return (
        <Provider>
            <ImageBackground source={require("../../../assets/logo.svg")} style = {{resizeMode:"cover", flex: 1, backgroundColor: "#202730"}} imageStyle = {{opacity: 0.05}}>

                <View style = {{ alignItems: "center", padding: 8}}>
                    <Searchbar
                        style = {styles.input}
                        placeholder={"Filtrar por nome"}
                        value={nomeSearchInput}
                        onChangeText={(value)=>{setNomeSearchInput(value)}}
                        onIconPress={async ()=>{
                            await fetchData(CONSTANTS.SEARCH)
                        }}
                    />
                </View>

                <DataTable style={styles.container}>
                    <DataTable.Header>
                        <DataTable.Title><Text style={styles.titleStyle}>Nome</Text></DataTable.Title>
                        <DataTable.Title><Text style={styles.titleStyle}>Departamento</Text></DataTable.Title>
                        <DataTable.Title></DataTable.Title>
                    </DataTable.Header>
                    <FlatList
                        data={funcionariosData}
                        renderItem={ ({index}) => (
                            <DataTable.Row>
                                <DataTable.Cell textStyle = {styles.textStyle}>{funcionariosData[index].nome}</DataTable.Cell>
                                <DataTable.Cell textStyle = {styles.textStyle}>{departamentoObject[funcionariosData[index].departamento]}</DataTable.Cell>
                                <DataTable.Cell style={styles.iconCellStyle}>
                                    <Menu
                                        visible={funcionariosData[index].visible}
                                        onDismiss={()=>{hideMenu(index)}}
                                        anchor={
                                            <TouchableRipple
                                                onPress={()=>{
                                                    showMenu(index);
                                                    setFuncionarioID(funcionariosData[index].id);
                                                }}
                                                pointerEvents={"auto"}
                                            >
                                                <FontAwesome5 name="ellipsis-v" size={20} color={'#ffffff'}/>
                                            </TouchableRipple>
                                        }
                                    >
                                        <Menu.Item
                                            leadingIcon={"clipboard-multiple-outline"}
                                            onPress={()=>{
                                                hideMenu(index);
                                                navigation.navigate('AddTask', {funcionario_id: funcionarioID});
                                            }}
                                            title={"Adicionar tarefa"}/>
                                        <Menu.Item
                                            leadingIcon={"account-edit-outline"}
                                            onPress={()=>{
                                                hideMenu(index);
                                                navigation.navigate('Editor', {funcionario_id: funcionarioID});
                                            }}
                                            title={"Editar Funcionário"}/>
                                        <Menu.Item
                                            leadingIcon={"account-remove-outline"}
                                            onPress={async ()=>{
                                                const status = await deleteFuncionario(funcionarioID);
                                                if(status === 200){
                                                   fetchData(CONSTANTS.NORMAL);
                                                }
                                            }}
                                            title={"Demitir Funcionário"}/>
                                    </Menu>

                                </DataTable.Cell>
                            </DataTable.Row>
                        )}
                    />
                </DataTable>
            </ImageBackground>
        </Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    },
    titleCellStyle:{
      justifyContent:"center"
    },
    titleStyle:{
        color: "#ffffff",
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16
    },
    textStyle:{
        color: "#ffffff"
    },
    modalStyle:{
        backgroundColor: '#ffffff',
        overflow: 'auto',
        width: "90%",
        alignSelf: "center",
        borderRadius: 35,
        maxWidth: 500,

        padding: 15
    },
    iconCellStyle: {
        justifyContent: 'flex-end'
    },
    input: {
        backgroundColor: "rgb(255, 255, 255)",
        width: "100%",
        borderWidth: 1,
        borderColor: "#4c4c4c"
    }
})