package com.project.toolbox.Controller;

import com.project.toolbox.Model.Category;
import com.project.toolbox.Service.CategoryServiceImpl;
import com.project.toolbox.dto.CategoryRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryServiceImpl categoryService;

    @GetMapping("/all")
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Category> addCategory(@Valid @RequestBody CategoryRequest request) {
        Category category = new Category();
        category.setName(request.getName().trim());
        category.setDescription(request.getDescription() != null ? request.getDescription().trim() : "");
        category.setCreatedAt(LocalDateTime.now());

        Category savedCategory = categoryService.saveCategory(category);
        return ResponseEntity.ok(savedCategory);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.ok().build();
    }
}
