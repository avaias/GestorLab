package br.edu.ifgoiano.GestorLab.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.edu.ifgoiano.GestorLab.entity.TarefaEntity;
import br.edu.ifgoiano.GestorLab.projection.TarefaProjection;

public interface TarefaRepository extends JpaRepository<TarefaEntity, Long> {
	
	@Query(value="select ta.id, ta.titulo, ta.descricao from tarefa ta inner join funcionario fu on ta.funcionario_id = fu.id where fu.email = :funcionarioEmail", nativeQuery = true)
	List<TarefaProjection> findAllByFuncionarioEmail(@Param(value = "funcionarioEmail") String funcionarioEmail);

}
