package com.project.toolbox.Controller;

import com.project.toolbox.Model.Tool;
import com.project.toolbox.Service.ToolService;
import com.project.toolbox.Service.ToolServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tools")
@CrossOrigin(origins = "*") // Enable CORS for frontend
public class ToolController {

    // @Autowired
    // private ToolService toolService;

    @Autowired
    private ToolServiceImpl toolService;

    @GetMapping("/getTools")
    public List<Tool> getAllTools() {
        // return toolService.getAllTools();
        return toolService.getAllTools();
    }
}
