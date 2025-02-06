package br.edu.ifgoiano.GestorLab.dto;

import br.edu.ifgoiano.GestorLab.enumerator.Departamento;
import br.edu.ifgoiano.GestorLab.enumerator.FuncionarioRole;

public record CadastroDTO(String nome, String email, Departamento departamento, String senhaUm, String senhaDois, FuncionarioRole role) {
	
}
