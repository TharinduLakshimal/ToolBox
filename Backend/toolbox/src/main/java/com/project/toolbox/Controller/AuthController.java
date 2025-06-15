package com.project.toolbox.Controller;

import com.project.toolbox.Model.User;
import com.project.toolbox.Service.UserService;
import com.project.toolbox.Util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest request) {
        User user = userService.authenticate(request.getEmail(), request.getPassword());
        if (user != null) {
            String token = JwtUtil.generateToken(user.getEmail());

            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            return ResponseEntity.ok(response);
        } else {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Invalid email or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        User createdUser = userService.registerUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    static class LoginRequest {
        private String email;
        private String password;

        // getters and setters

        public String getEmail() {
            return email;
        }
        public void setEmail(String email) {
            this.email = email;
        }
        public String getPassword() {
            return password;
        }
        public void setPassword(String password) {
            this.password = password;
        }
    }
}
