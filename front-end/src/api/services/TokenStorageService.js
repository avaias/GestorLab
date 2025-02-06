import AsyncStorage from "@react-native-async-storage/async-storage";

const storagedTokenAcessKey = "1JLXiWTnHWR0DkztG9wgKM0eCihJJUOl8VeMqfYbMyUNcliu18";

export const getTokenFromStorage = async () => {
    const token = await AsyncStorage.getItem(storagedTokenAcessKey);
    
    if(token){
        return token;
    }else{
        console.error("Não foi possível obter o token");
    }
};

export const setTokenInStorage = async (token) => {
    try{
        await AsyncStorage.setItem(storagedTokenAcessKey, token);
    }catch(error){
        console.error("Erro de armazenamento do token");
    }
};