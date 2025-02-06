package br.edu.ifgoiano.GestorLab.entity;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tarefa")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TarefaEntity {
	
	public TarefaEntity(String titulo, String descricao, FuncionarioEntity funcionario) {
		this.titulo = titulo;
		this.descricao = descricao;
		this.funcionario = funcionario;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(columnDefinition = "serial")
	private long id;
	
	@Column(nullable = false)
	private String titulo;
	
	@Column(columnDefinition = "text")
	private String descricao;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "funcionario_id", referencedColumnName = "id")
	@OnDelete(action = OnDeleteAction.CASCADE)
	private FuncionarioEntity funcionario;
}
