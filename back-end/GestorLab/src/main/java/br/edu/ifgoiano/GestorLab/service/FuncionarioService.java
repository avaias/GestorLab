package br.edu.ifgoiano.GestorLab.service;

import br.edu.ifgoiano.GestorLab.dto.FuncionarioEditDTO;
import br.edu.ifgoiano.GestorLab.entity.FuncionarioEntity;
import br.edu.ifgoiano.GestorLab.enumerator.FuncionarioRole;
import br.edu.ifgoiano.GestorLab.repository.FuncionarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FuncionarioService {

    @Autowired
    FuncionarioRepository repositorio;
    
    @Autowired
    TokenService tokenService;
    
    public void edicaoFuncionarioAdmin(FuncionarioEditDTO data){
        FuncionarioEntity funcionario = this.repositorio.findById(data.id()).get();

        if(data.nome() != null){
            funcionario.setNome(data.nome());
        }
        if(data.email() != null){
            funcionario.setEmail(data.email());
        }
        if(data.departamento() != null){
            funcionario.setDepartamento(data.departamento());
        }
        if(data.role() != null){
            funcionario.setRole(data.role());
        }

        this.repositorio.save(funcionario);
    }

}
