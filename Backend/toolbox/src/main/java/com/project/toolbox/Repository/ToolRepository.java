package com.project.toolbox.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.toolbox.Model.Tool;

public interface ToolRepository extends JpaRepository<Tool, Long> {
    
}