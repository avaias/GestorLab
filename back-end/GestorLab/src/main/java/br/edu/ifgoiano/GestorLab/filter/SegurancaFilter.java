package br.edu.ifgoiano.GestorLab.filter;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import br.edu.ifgoiano.GestorLab.repository.FuncionarioRepository;
import br.edu.ifgoiano.GestorLab.service.TokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class SegurancaFilter extends OncePerRequestFilter {
	
	@Autowired
	TokenService tokenService;
	
	@Autowired
	FuncionarioRepository funcionarioRepository;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
		var token = this.recuperarToken(request);
		if(token != null) {
			String email = tokenService.validarToken(token);
			UserDetails funcionario = funcionarioRepository.findByEmail(email);
			
			var autenticacao = new UsernamePasswordAuthenticationToken(funcionario, null, funcionario.getAuthorities());
			SecurityContextHolder.getContext().setAuthentication(autenticacao);
		}
		
		filterChain.doFilter(request, response);
	}
	
	private String recuperarToken(HttpServletRequest request) {
		String autenticacaoHeader = request.getHeader("Authorization");
		
		if(autenticacaoHeader == null) {
			return null;
		}else {
			return autenticacaoHeader.replace("Bearer ", "");
		}
	}
}
