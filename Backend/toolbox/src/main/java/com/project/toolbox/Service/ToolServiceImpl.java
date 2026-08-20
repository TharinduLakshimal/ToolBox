package com.project.toolbox.Service;

import com.project.toolbox.Model.Tool;
import com.project.toolbox.Repository.ToolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ToolServiceImpl implements ToolService {

    @Autowired
    private ToolRepository toolRepository;

    @Override
    public List<Tool> getAllTools() {
        return toolRepository.findAll();
    }

    @Override
    public Tool getToolById(Long id) {
        return toolRepository.findById(id).orElse(null);
    }

    @Override
    public List<Tool> searchTools(String keyword) {
        return toolRepository.findByNameContainingIgnoreCase(keyword);
    }

    @Override
    public Tool saveTool(Tool tool) {
        return toolRepository.save(tool);
    }

    @Override
    public void deleteTool(Long id) {
        toolRepository.deleteById(id);
    }
}
