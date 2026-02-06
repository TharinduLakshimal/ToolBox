package com.project.toolbox.Controller;

import com.project.toolbox.Model.Tool;
import com.project.toolbox.Service.ToolServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
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

    @GetMapping("/search")
    public List<Tool> searchTools(@RequestParam String keyword) {
        return toolService.searchTools(keyword);
    }

    @PostMapping("/add")
    public ResponseEntity<Tool> addTool(@RequestBody Tool tool) {
        tool.setCreatedAt(LocalDateTime.now());
        Tool savedTool = toolService.saveTool(tool);
        return ResponseEntity.ok(savedTool);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Tool> updateTool(@PathVariable Long id, @RequestBody Tool updatedTool) {
        Tool tool = toolService.getToolById(id);
        if (tool == null) {
            return ResponseEntity.notFound().build();
        }
        updatedTool.setId(id); // Ensure ID is same
        updatedTool.setCreatedAt(tool.getCreatedAt()); // Preserve original created date
        Tool savedTool = toolService.saveTool(updatedTool);
        return ResponseEntity.ok(savedTool);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteTool(@PathVariable Long id) {
        toolService.deleteTool(id);
        return ResponseEntity.ok().build();
    }
}
