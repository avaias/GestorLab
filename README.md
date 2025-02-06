# Gestor Lab  

**Gestor Lab** é um sistema de gestão de tarefas que foi desenvolvido como projeto acadêmico para a disciplina de Programação para Web do meu curso técnico. Esta solução foi implementada em aproximadamente 1 semana no final de 2023. O desenvolvimento desse projeto contou com a colaboração do @VictorGSB.

## 🎯 Objetivo  
Simular um ambiente profissional de gestão de equipes, oferecendo:  
✅ Atribuição dinâmica de tarefas  
✅ Controle de responsabilidades por funcionário  
✅ Interface intuitiva para marcar tarefas como concluídas  
✅ Sistema seguro de autenticação de usuários  

## 🛠 Arquitetura e Tecnologias  
Durante o desenvolvimento do projeto, foram aplicadas as seguintes tecnologias:  

### Back-end (Java)  
- **Spring Boot 3**: Framework utilizado para a API REST  
- **Spring Security**: Autenticação JWT e controle de acesso  
- **PostgreSQL**: Banco de dados relacional para persistência de dados  

### Front-end (JavaScript)  
- **React Native**: Framework utilizado para o desenvolvimento da aplicação móvel


## 🚀 Como Executar o Projeto  
**Pré-requisitos:**  
- Java JDK 17+  
- Node.js 16+ 
- Maven (caso o back-end seja executado pelo terminal)
- PostgreSQL

**Passos:**  
1. Clonar o repositório:  
   ```bash
   git clone https://github.com/avaias/GestorLab.git
   ```

2. Configurar o banco de dados:  
   ```sql
   CREATE DATABASE gestorlab;
   ```
    **Informações do banco de dados:** 
    * **Username:** postgres
    * **Password:** postgres
    * **Porta:** 5432

3. Executar o back-end:  
   ```bash
   cd backend
   cd GestorLab
   mvn spring-boot:run
   ```

4. Executar o front-end mobile no navegador:  
   ```bash
   cd front-end
   npm install
   npm run web
   ```

## Observações:
* Por fins de teste, o sistema permite com que um admininistrador seja criado na hora de cadastrar um novo usuário.








