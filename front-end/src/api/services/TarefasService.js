import {jwtDecode} from "jwt-decode";
import {getTokenFromStorage} from "./TokenStorageService";
export const getListOfTarefasFromDatabase = async () => {
   const token = await getTokenFromStorage();
   const tokenEmail = jwtDecode(token).sub;
   const fetchConfig = {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${token}`
      }
   };
   const response = await fetch(`http://localhost:8080/tarefa/listar?funcionario_email=${tokenEmail.trim()}`, fetchConfig);
   return await response.json();
}

export const registerNewTarefa = async (tarefa) => {
   const token = await getTokenFromStorage();

   const fetchConfig = {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(tarefa)
   };
   const response = await fetch("http://localhost:8080/tarefa",fetchConfig);

   if(await response.status === 400){
      throw new Error(await response.text());
   }
   return "Cadastro efetuado."

}

