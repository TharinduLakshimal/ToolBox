package com.project.toolbox.Service;

import com.project.toolbox.Model.User;
import com.project.toolbox.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;


import java.time.LocalDateTime;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Register a new user with encoded password
    public User registerUser(User user) {
        String rawPassword = user.getPassword(); // Get plain password
        String encodedPassword = passwordEncoder.encode(rawPassword); // Encode it
        user.setPasswordHash(encodedPassword); // Store encoded password in DB
        user.setCreatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }

    // Authenticate user by checking raw password against stored hash
    public User authenticate(String email, String rawPassword) {
        return userRepository.findByEmail(email)
                .filter(user -> passwordEncoder.matches(rawPassword, user.getPasswordHash()))
                .orElse(null);
    }
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
}
