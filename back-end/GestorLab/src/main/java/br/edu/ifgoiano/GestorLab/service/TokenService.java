package br.edu.ifgoiano.GestorLab.service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import javax.management.RuntimeErrorException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;

import br.edu.ifgoiano.GestorLab.entity.FuncionarioEntity;
import br.edu.ifgoiano.GestorLab.enumerator.FuncionarioRole;

@Service
public class TokenService {
	
	private final String EMISSOR_DO_TOKEN = "gestor-lab";
	
	@Value("${api.security.token.secret}")
	private String chave;
	
	public String gerarToken(FuncionarioEntity funcionario) {
		boolean isAdmin;
		if(funcionario.getRole().equals(FuncionarioRole.ADMIN)) {
			isAdmin = true;
		}else {
			isAdmin = false;
		}
		
		try {
			Algorithm algorithm =  Algorithm.HMAC256(chave);
			String token = JWT.create()
					.withIssuer(EMISSOR_DO_TOKEN)
					.withSubject(funcionario.getEmail())
					.withClaim("admin", isAdmin)
					.sign(algorithm);
			return token;
		} catch (JWTCreationException e) {
			throw new RuntimeException("Erro na geração do token", e);
		}
	}
	
	public String validarToken(String token) {
		try {
			Algorithm algorithm =  Algorithm.HMAC256(chave);
			return JWT.require(algorithm)
					.withIssuer(EMISSOR_DO_TOKEN)
					.build()
					.verify(token)
					.getSubject();
		} catch (JWTVerificationException e) {
			return "";
		}
	}
	
}
