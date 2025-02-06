export const submitLogin = async (inputEmail, inputSenha) => {
    const loginJSON = JSON.stringify({
        email: inputEmail,
        senha: inputSenha
    });

    try {
        const fetchConfig = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: loginJSON
        };

        const response = await fetch("http://localhost:8080/autenticacao/login", fetchConfig)

        const responseJSON = await response.json();
        return responseJSON.token;

    } catch (error) {
        throw new Error("Erro de autenticação. O email ou a senha informados estão incorretos.")
    }
};

export const submitRegister = async (funcionario) => {
    const fetchConfig = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify(funcionario)
    };

    const response = await fetch("http://localhost:8080/autenticacao/cadastrar", fetchConfig);

    if(await response.status === 400){
        throw new Error(await response.text());
    }
}








