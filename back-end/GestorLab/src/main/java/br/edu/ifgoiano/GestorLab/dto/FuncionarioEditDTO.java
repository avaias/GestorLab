package br.edu.ifgoiano.GestorLab.dto;

import br.edu.ifgoiano.GestorLab.enumerator.Departamento;
import br.edu.ifgoiano.GestorLab.enumerator.FuncionarioRole;

public record FuncionarioEditDTO(Long id, String nome, String email, Departamento departamento, FuncionarioRole role) {

}
