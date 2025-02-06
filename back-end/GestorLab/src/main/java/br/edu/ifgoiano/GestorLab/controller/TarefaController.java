package br.edu.ifgoiano.GestorLab.controller;

import java.util.List;

import br.edu.ifgoiano.GestorLab.service.TarefaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.edu.ifgoiano.GestorLab.dto.TarefaDTO;
import br.edu.ifgoiano.GestorLab.entity.TarefaEntity;
import br.edu.ifgoiano.GestorLab.projection.TarefaProjection;
import br.edu.ifgoiano.GestorLab.repository.TarefaRepository;

@RestController
@RequestMapping("/tarefa")
public class TarefaController {
	
	@Autowired
	TarefaRepository repositorio;

	@Autowired
	TarefaService tarefaService;

	@GetMapping("/{tarefaID}")
	public TarefaEntity buscarTarefa(@PathVariable(name = "tarefaID") Long id){
		return this.repositorio.findById(id).get();
	}

	@GetMapping("/listar")
	public List<TarefaProjection> listarTarefas(@RequestParam("funcionario_email") String funcionarioEmail) {
		return this.repositorio.findAllByFuncionarioEmail(funcionarioEmail);
	}

	@PostMapping
	public ResponseEntity cadastrarTarefa(@RequestBody TarefaDTO data) {
		String validacao = this.tarefaService.cadastrarTarefa(data);
		if(!validacao.isBlank()) {
			return ResponseEntity.badRequest().body(validacao);
		}else {
			return ResponseEntity.ok().build();
		}
	}

	@PutMapping
    public ResponseEntity atualizarTarefa(@RequestBody TarefaEntity tarefa) {
		try{
			tarefaService.editarTarefa(tarefa);
			return ResponseEntity.ok().build();
		}catch(Exception e){
			return ResponseEntity.badRequest().build();
		}
    }
	@DeleteMapping("/excluir/{id}")
	public void removerTarefa(@PathVariable("id") Long id) {
        repositorio.deleteById(id);
    }
}
