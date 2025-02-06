package br.edu.ifgoiano.GestorLab.entity;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import br.edu.ifgoiano.GestorLab.enumerator.Departamento;
import br.edu.ifgoiano.GestorLab.enumerator.FuncionarioRole;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "funcionario")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FuncionarioEntity implements UserDetails {
	
	public FuncionarioEntity(String nome, String email, Departamento departamento, String senha, FuncionarioRole role) {
		this.nome = nome;
		this.email = email;

		this.departamento = departamento;
		this.senha = senha;
		this.role = role;
	}
	
	
	public FuncionarioEntity(Long id, String nome, String email, Departamento departamento,
			FuncionarioRole role) {
		super();
		this.id = id;
		this.nome = nome;
		this.email = email;
		this.departamento = departamento;
		this.role = role;
	}	
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(columnDefinition = "serial")
	private Long id;
	
	@Column(nullable = false)
	private String nome;
	
	@Column(columnDefinition = "text", nullable = false)
	private String email;
		
	@Enumerated(EnumType.STRING)
	@Column(name = "departamento")
	private Departamento departamento;
	
	@Column(columnDefinition = "text", nullable = false)
	private String senha;
			
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private FuncionarioRole role;
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		if(this.role == FuncionarioRole.ADMIN) {
			return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_USER"));
		}else{
			return List.of(new SimpleGrantedAuthority("ROLE_USER"));
		}
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return senha;
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return email;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}


	public void setNome(String nome) {
		this.nome = nome;
	}


	public void setEmail(String email) {
		this.email = email;
	}

	public void setDepartamento(Departamento departamento) {
		this.departamento = departamento;
	}


	public void setSenha(String senha) {
		this.senha = senha;
	}

	public void setRole(FuncionarioRole role) {
		this.role = role;
	}
	
}
