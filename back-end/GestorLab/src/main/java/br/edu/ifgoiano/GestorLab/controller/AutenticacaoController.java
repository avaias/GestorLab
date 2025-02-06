package br.edu.ifgoiano.GestorLab.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import br.edu.ifgoiano.GestorLab.dto.AutenticacaoDTO;
import br.edu.ifgoiano.GestorLab.dto.CadastroDTO;
import br.edu.ifgoiano.GestorLab.dto.LoginResponseDTO;
import br.edu.ifgoiano.GestorLab.entity.FuncionarioEntity;
import br.edu.ifgoiano.GestorLab.enumerator.FuncionarioRole;
import br.edu.ifgoiano.GestorLab.repository.FuncionarioRepository;
import br.edu.ifgoiano.GestorLab.service.AutorizacaoService;
import br.edu.ifgoiano.GestorLab.service.TokenService;

@RestController
@RequestMapping("/autenticacao")
public class AutenticacaoController {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private AutorizacaoService autorizacaoService;
	
	@Autowired
	private FuncionarioRepository repositorio;
	
	@Autowired
	private TokenService tokenService;
	
	@PostMapping("/login")
	public ResponseEntity login(@RequestBody AutenticacaoDTO data) {
		var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.senha());
		var autenticacao = this.authenticationManager.authenticate(usernamePassword);
		
		var token = tokenService.gerarToken((FuncionarioEntity) autenticacao.getPrincipal());
		
		return ResponseEntity.ok(new LoginResponseDTO(token));
	}
	
	//Por fins de teste, na hora de cadastrar um funcionário, você pode enviar a "role" dele, que pode ser "admin" ou "user".
	@PostMapping("/cadastrar")
	public ResponseEntity cadastrar(@RequestBody CadastroDTO data) {
		String validacao = this.autorizacaoService.validarCadastro(data.email(), data.senhaUm(), data.senhaDois());
		
		if(!validacao.isBlank()) {
			return ResponseEntity.badRequest().body(validacao);
		}

		String senhaCriptografada = new BCryptPasswordEncoder().encode(data.senhaUm());
		//FuncionarioEntity funcionario = new FuncionarioEntity(data.nome(), data.email(), data.departamento(), senhaCriptografada, FuncionarioRole.USER);
		FuncionarioEntity funcionario = new FuncionarioEntity(data.nome(), data.email(), data.departamento(), senhaCriptografada, data.role());
		this.repositorio.save(funcionario);
		
		return ResponseEntity.ok().build();
	}
}
