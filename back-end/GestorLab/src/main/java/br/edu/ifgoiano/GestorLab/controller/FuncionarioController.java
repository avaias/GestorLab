package br.edu.ifgoiano.GestorLab.controller;

import java.util.List;

import br.edu.ifgoiano.GestorLab.entity.FuncionarioEntity;
import br.edu.ifgoiano.GestorLab.service.FuncionarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.edu.ifgoiano.GestorLab.dto.FuncionarioEditDTO;
import br.edu.ifgoiano.GestorLab.enumerator.Departamento;
import br.edu.ifgoiano.GestorLab.repository.FuncionarioRepository;
import br.edu.ifgoiano.GestorLab.projection.FuncionarioFilterProjection;
import br.edu.ifgoiano.GestorLab.projection.FuncionarioProjection;

@RestController
@RequestMapping("/funcionario")
public class FuncionarioController {

	@Autowired
	FuncionarioRepository repositorio;
	
	@Autowired
	FuncionarioService funcionarioService;
	
	@GetMapping(value = "/{funcionarioID}")
	public FuncionarioFilterProjection encontrarFuncionario(@PathVariable(name = "funcionarioID") Long id){
		return this.repositorio.filteredFindByID(id);
	}
	
	@GetMapping(value = "/listar")
	public List<FuncionarioProjection> listarFuncionarios(){
		return this.repositorio.findAllFuncionarios();
	}
	
	@GetMapping(value = "/listar/filtro")
	public List<FuncionarioProjection> listarFuncionariosPorNome(@RequestParam(name = "funcionario_nome", defaultValue = "") String funcionarioNome){
		return this.repositorio.findAllFuncionariosByDepartamentoAndNome(funcionarioNome);
	}

	@PutMapping ("/editar/admin")
	public ResponseEntity alterarFuncionario(@RequestBody FuncionarioEditDTO data) {
		try{
			this.funcionarioService.edicaoFuncionarioAdmin(data);
			return ResponseEntity.ok().build();
			
		}catch(Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}

	@DeleteMapping("/excluir/{funcionarioID}")
	public ResponseEntity excluirFuncionario(@PathVariable(name = "funcionarioID") Long id){
		try {
			this.repositorio.deleteById(id);
			return ResponseEntity.ok().build();
		}catch (Exception e){
			return ResponseEntity.badRequest().build();
		}
	}
}
