package com.project.toolbox.Controller;

import com.project.toolbox.Model.User;
import com.project.toolbox.Service.UserService;
import com.project.toolbox.Util.JwtUtil;
import com.project.toolbox.dto.AuthResponse;
import com.project.toolbox.dto.LoginRequest;
import com.project.toolbox.dto.RegisterRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        User user = userService.authenticate(request.getEmail(), request.getPassword());
        if (user == null) {
            throw new BadCredentialsException("Invalid email or password");
        }

        String role = user.getRole() != null ? user.getRole().name() : "USER";
        String token = JwtUtil.generateToken(user.getEmail(), role, user.getId());

        AuthResponse response = new AuthResponse(
                token,
                role,
                user.getEmail(),
                user.getId(),
                user.getName()
        );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        User createdUser = userService.registerUser(request);

        String role = createdUser.getRole() != null ? createdUser.getRole().name() : "USER";
        String token = JwtUtil.generateToken(createdUser.getEmail(), role, createdUser.getId());

        AuthResponse response = new AuthResponse(
                token,
                role,
                createdUser.getEmail(),
                createdUser.getId(),
                createdUser.getName()
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
