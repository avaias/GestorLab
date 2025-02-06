package br.edu.ifgoiano.GestorLab.projection;

import br.edu.ifgoiano.GestorLab.enumerator.Departamento;
import br.edu.ifgoiano.GestorLab.enumerator.FuncionarioRole;

public interface FuncionarioFilterProjection {
	Long getId();
	String getNome(); 
	String getEmail(); 
	Departamento getDepartamento();
	FuncionarioRole getRole();
}
