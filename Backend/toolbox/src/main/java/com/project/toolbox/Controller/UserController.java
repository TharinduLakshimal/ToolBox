package com.project.toolbox.Controller;

import com.project.toolbox.Model.User;
import com.project.toolbox.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    // Get all users
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Get user by email
    @GetMapping("/by-email")
    public ResponseEntity<User> getUserByEmail(@RequestParam String email) {
        Optional<User> userOptional = userService.getUserByEmail(email);

        if (userOptional.isPresent()) {
            return ResponseEntity.ok(userOptional.get());
        } else {
            System.err.println("User not found with email: " + email);
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ Get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> userOptional = userService.getUserById(id);

        if (userOptional.isPresent()) {
            return ResponseEntity.ok(userOptional.get());
        } else {
            System.err.println("User not found with ID: " + id);
            return ResponseEntity.notFound().build();
        }
    }
}
