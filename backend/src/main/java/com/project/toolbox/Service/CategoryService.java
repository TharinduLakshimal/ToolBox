package com.project.toolbox.Service;

import com.project.toolbox.Model.Category;

import java.util.List;

public interface CategoryService {
    List<Category> getAllCategories();
    Category saveCategory(Category category);
    void deleteCategory(Long id);
}
