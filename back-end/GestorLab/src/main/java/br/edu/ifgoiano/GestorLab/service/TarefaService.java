package br.edu.ifgoiano.GestorLab.service;

import br.edu.ifgoiano.GestorLab.dto.TarefaDTO;
import br.edu.ifgoiano.GestorLab.entity.FuncionarioEntity;
import br.edu.ifgoiano.GestorLab.entity.TarefaEntity;
import br.edu.ifgoiano.GestorLab.repository.FuncionarioRepository;
import br.edu.ifgoiano.GestorLab.repository.TarefaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TarefaService {
	@Autowired
	private FuncionarioRepository funcionarioRepositorio;
	
    @Autowired
    private TarefaRepository tarefaRepositorio;

    public void editarTarefa(TarefaEntity data){
        TarefaEntity tarefaBase = this.tarefaRepositorio.findById(data.getId()).get();

        if(data.getTitulo() != null){
            tarefaBase.setTitulo(data.getTitulo());
        }
        if(data.getDescricao() != null){
            tarefaBase.setDescricao(data.getDescricao());
        }

        this.tarefaRepositorio.save(tarefaBase);
    }
    
    public String cadastrarTarefa(TarefaDTO data) {
    	if(data.titulo().isBlank()) {
    		return "O preenchimento do campo de título é obrigatório.";
    	}
    	
    	FuncionarioEntity funcionario = this.funcionarioRepositorio.findById(data.funcionario_id()).get();
    	
    	TarefaEntity tarefa = new TarefaEntity(data.titulo(), data.descricao(), funcionario);
    	this.tarefaRepositorio.save(tarefa);
    	
    	return "";
    }
}
