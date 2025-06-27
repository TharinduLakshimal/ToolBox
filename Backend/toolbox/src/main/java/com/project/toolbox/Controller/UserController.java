package com.project.toolbox.Controller;

import com.project.toolbox.Model.User;
import com.project.toolbox.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")  // allow React app to access
public class UserController {

    @Autowired
    private UserService userService;

    // Endpoint to get all users
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
}