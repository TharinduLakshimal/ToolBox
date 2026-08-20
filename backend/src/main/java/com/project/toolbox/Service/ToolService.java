package com.project.toolbox.Service;

import java.util.List;
import com.project.toolbox.Model.Tool;

public interface ToolService {
    List<Tool> getAllTools();
    Tool getToolById(Long id);
    List<Tool> searchTools(String keyword);
    Tool saveTool(Tool tool);           // ✅ Add tool or update tool
    void deleteTool(Long id);           // ✅ Delete tool
}
