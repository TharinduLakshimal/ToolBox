package com.project.toolbox.Service;

import java.util.List;
import com.project.toolbox.Model.Tool;

public interface ToolService {
    List<Tool> getAllTools();
    Tool getToolById(Long id); // ✅ Add this
}
