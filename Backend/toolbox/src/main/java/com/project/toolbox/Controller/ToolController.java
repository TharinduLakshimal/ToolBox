package com.project.toolbox.Controller;

import com.project.toolbox.Model.Tool;
import com.project.toolbox.Service.ToolServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tools")
@CrossOrigin(origins = "*")
public class ToolController {

    @Autowired
    private ToolServiceImpl toolService;

    @GetMapping("/getTools")
    public List<Tool> getAllTools() {
        return toolService.getAllTools();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tool> getToolById(@PathVariable Long id) {
        Tool tool = toolService.getToolById(id);
        if (tool != null) {
            return ResponseEntity.ok(tool);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
