package br.edu.ifgoiano.GestorLab.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.edu.ifgoiano.GestorLab.repository.FuncionarioRepository;

@Service
public class AutorizacaoService implements UserDetailsService {
	
	@Autowired
	FuncionarioRepository repositorio;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		return repositorio.findByEmail(email);
	}
	
	public String validarCadastro(String email, String senhaUm, String senhaDois) {
		
		if(this.repositorio.findByEmail(email) != null) {
			return "O email informado já está cadastrado.";
		}
		
		if(!senhaUm.equals(senhaDois)) {
			return "As senhas não são iguais.";
		}
		
		return "";
	}
}
