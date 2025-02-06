import {getTokenFromStorage} from "./TokenStorageService";
import {jwtDecode} from "jwt-decode";


export const getFuncionarioList = async (nome) => {
    const token = await getTokenFromStorage();
    const fetchConfig = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };

    if((nome != "") && (nome != undefined)){
        const response = await fetch(`http://localhost:8080/funcionario/listar/filtro?funcionario_nome=${nome}`, fetchConfig);
        return await response.json();
    }else{
        const response = await fetch("http://localhost:8080/funcionario/listar",fetchConfig);
        return await response.json();
    }
}

export const getFuncionario = async(id)=>{
    const token = await getTokenFromStorage();

    const fetchConfig = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };
    const response = await fetch(`http://localhost:8080/funcionario/${id}`, fetchConfig);
    return await response.json();
}
export const submitFuncionarioEdit = async(funcionario) =>{
    const token = await getTokenFromStorage();

    const fetchConfig = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(funcionario)
    };

    const response = await fetch("http://localhost:8080/funcionario/editar/admin", fetchConfig);

    if(await response.status === 400){
        return "Ocorreu um erro na edição do usuário."
    }else{
        return "";
    }
}

export const deleteFuncionario = async(funcionarioID) =>{
    const token = await getTokenFromStorage();

    const fetchConfig = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };
    const response = await fetch(`http://localhost:8080/funcionario/excluir/${funcionarioID}`,fetchConfig);
    return await response.status;
}