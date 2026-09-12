package com.project.toolbox.Controller;

import com.project.toolbox.Model.Tool;
import com.project.toolbox.Service.ToolServiceImpl;
import com.project.toolbox.dto.ToolRequest;
import com.project.toolbox.exception.ResourceNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/tools")
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
            throw new ResourceNotFoundException("Tool not found with id: " + id);
        }
    }

    @GetMapping("/search")
    public List<Tool> searchTools(@RequestParam String keyword) {
        return toolService.searchTools(keyword);
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Tool> addTool(@Valid @RequestBody ToolRequest request) {
        Tool tool = new Tool();
        tool.setName(request.getName());
        tool.setCategory(request.getCategory());
        tool.setDescription(request.getDescription());
        tool.setImageUrl(request.getImageUrl());
        tool.setPricePerDay(request.getPricePerDay());
        tool.setPricePerWeek(request.getPricePerWeek());
        tool.setQuantity(request.getQuantity());
        tool.setIsAvailable(request.getIsAvailable() != null ? request.getIsAvailable() : true);
        tool.setCreatedAt(LocalDateTime.now());

        Tool savedTool = toolService.saveTool(tool);
        return ResponseEntity.ok(savedTool);
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Tool> updateTool(@PathVariable Long id, @Valid @RequestBody ToolRequest request) {
        Tool existingTool = toolService.getToolById(id);
        if (existingTool == null) {
            throw new ResourceNotFoundException("Tool not found with id: " + id);
        }

        existingTool.setName(request.getName());
        existingTool.setCategory(request.getCategory());
        existingTool.setDescription(request.getDescription());
        existingTool.setImageUrl(request.getImageUrl());
        existingTool.setPricePerDay(request.getPricePerDay());
        existingTool.setPricePerWeek(request.getPricePerWeek());
        existingTool.setQuantity(request.getQuantity());
        existingTool.setIsAvailable(request.getIsAvailable() != null ? request.getIsAvailable() : existingTool.getQuantity() > 0);

        Tool savedTool = toolService.saveTool(existingTool);
        return ResponseEntity.ok(savedTool);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteTool(@PathVariable Long id) {
        Tool existingTool = toolService.getToolById(id);
        if (existingTool == null) {
            throw new ResourceNotFoundException("Tool not found with id: " + id);
        }
        toolService.deleteTool(id);
        return ResponseEntity.ok().build();
    }
}
