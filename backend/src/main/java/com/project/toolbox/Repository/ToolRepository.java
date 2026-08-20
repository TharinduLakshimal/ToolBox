package com.project.toolbox.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.toolbox.Model.Tool;

import java.util.List;

public interface ToolRepository extends JpaRepository<Tool, Long> {
    List<Tool> findByNameContainingIgnoreCase(String keyword);
}
