package br.edu.ifgoiano.GestorLab.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import br.edu.ifgoiano.GestorLab.filter.SegurancaFilter;

@Configuration
@EnableWebSecurity
public class SegurancaConfig {
	@Autowired
	SegurancaFilter segurancaFilter;
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
		return httpSecurity
				.csrf(csrf -> csrf.disable())
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authorizeHttpRequests(authorize -> authorize
						.requestMatchers(HttpMethod.POST, "/autenticacao/login").permitAll()
						.requestMatchers(HttpMethod.POST, "/autenticacao/cadastrar").permitAll()
						.requestMatchers(HttpMethod.GET, "/funcionario/listar").hasRole("ADMIN")
						.requestMatchers(HttpMethod.PUT, "/funcionario/editar/admin").hasRole("ADMIN")
						.requestMatchers(HttpMethod.DELETE, "/funcionario/excluir").hasRole("ADMIN")
						.requestMatchers(HttpMethod.POST, "/tarefa").hasRole("ADMIN")
						.requestMatchers(HttpMethod.PUT, "/tarefa").hasRole("ADMIN")
						.anyRequest().authenticated()
				)
				.addFilterBefore(segurancaFilter, UsernamePasswordAuthenticationFilter.class)
				.build();
	}
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception{
		return authenticationConfiguration.getAuthenticationManager();
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}