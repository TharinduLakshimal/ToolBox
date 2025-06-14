package com.project.toolbox.Service;

import com.project.toolbox.Model.Tool;
import com.project.toolbox.Repository.ToolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ToolServiceImpl {

    @Autowired
    private ToolRepository toolRepository;

    public List<Tool> getAllTools() {
        System.out.println("done");
        return toolRepository.findAll();
    }
}
