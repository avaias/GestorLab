package br.edu.ifgoiano.GestorLab.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;

import br.edu.ifgoiano.GestorLab.dto.FuncionarioEditDTO;
import br.edu.ifgoiano.GestorLab.entity.FuncionarioEntity;
import br.edu.ifgoiano.GestorLab.enumerator.Departamento;
import br.edu.ifgoiano.GestorLab.projection.FuncionarioFilterProjection;
import br.edu.ifgoiano.GestorLab.projection.FuncionarioProjection;

public interface FuncionarioRepository extends JpaRepository<FuncionarioEntity, Long> {
	
	UserDetails findByEmail(String email);
	
	@Query(value = "SELECT f.id, f.nome, f.email, f.departamento FROM funcionario f WHERE nome ILIKE :funcionarionome% AND role = 'USER' ORDER BY f.id ", nativeQuery = true)
	List<FuncionarioProjection> findAllFuncionariosByDepartamentoAndNome(@Param("funcionarionome") String funcionarioNome);
	
	@Query(value = "SELECT f.id, f.nome, f.email, f.departamento FROM funcionario f WHERE role = 'USER' ORDER BY f.nome ", nativeQuery = true)
	List<FuncionarioProjection> findAllFuncionarios();
	
	@Query(value = "SELECT f.id, f.nome, f.email, f.departamento, f.role FROM funcionario f WHERE f.id = :funcionarioID ORDER BY f.nome ", nativeQuery = true)
	FuncionarioFilterProjection filteredFindByID(@Param("funcionarioID") Long id);
}
