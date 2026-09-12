package com.project.toolbox.Service;

import com.project.toolbox.Model.Role;
import com.project.toolbox.Model.User;
import com.project.toolbox.Repository.UserRepository;
import com.project.toolbox.dto.RegisterRequest;
import com.project.toolbox.exception.BadRequestException;
import com.project.toolbox.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail().trim().toLowerCase()).isPresent()) {
            throw new BadRequestException("Email is already in use: " + request.getEmail());
        }

        User user = new User();
        user.setName(request.getName().trim());
        user.setEmail(request.getEmail().trim().toLowerCase());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());
        user.setRole(Role.USER);
        user.setCreatedAt(LocalDateTime.now());

        return userRepository.save(user);
    }

    public User authenticate(String email, String rawPassword) {
        if (email == null || rawPassword == null) return null;
        return userRepository.findByEmail(email.trim().toLowerCase())
                .filter(user -> passwordEncoder.matches(rawPassword, user.getPasswordHash()))
                .orElse(null);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserByEmail(String email) {
        if (email == null) return Optional.empty();
        return userRepository.findByEmail(email.trim().toLowerCase());
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }
}
