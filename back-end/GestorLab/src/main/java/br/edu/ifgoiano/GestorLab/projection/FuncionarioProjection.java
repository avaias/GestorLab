package br.edu.ifgoiano.GestorLab.projection;

import br.edu.ifgoiano.GestorLab.enumerator.Departamento;

public interface FuncionarioProjection {
	long getId();
	String getNome(); 
	String getEmail(); 
	Departamento getDepartamento(); 
}
