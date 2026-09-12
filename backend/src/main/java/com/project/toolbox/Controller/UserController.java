package com.project.toolbox.Controller;

import com.project.toolbox.Model.User;
import com.project.toolbox.Service.UserService;
import com.project.toolbox.dto.UserProfileResponse;
import com.project.toolbox.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping({"/api/users", "/api/user"})
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserProfileResponse> getCurrentUserProfile(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).build();
        }
        User user = userService.getUserByEmail(principal.getName())
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + principal.getName()));

        return ResponseEntity.ok(UserProfileResponse.fromUser(user));
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserProfileResponse> getAllUsers() {
        return userService.getAllUsers().stream()
                .map(UserProfileResponse::fromUser)
                .toList();
    }

    @GetMapping("/by-email")
    public ResponseEntity<UserProfileResponse> getUserByEmail(@RequestParam String email, Authentication authentication) {
        boolean isAdmin = authentication != null && authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        boolean isSelf = authentication != null && authentication.getName().equalsIgnoreCase(email);

        if (!isAdmin && !isSelf) {
            return ResponseEntity.status(403).build();
        }

        User user = userService.getUserByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        return ResponseEntity.ok(UserProfileResponse.fromUser(user));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserProfileResponse> getUserById(@PathVariable Long id, Authentication authentication) {
        User user = userService.getUserById(id);

        boolean isAdmin = authentication != null && authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        boolean isSelf = authentication != null && authentication.getName().equalsIgnoreCase(user.getEmail());

        if (!isAdmin && !isSelf) {
            return ResponseEntity.status(403).build();
        }

        return ResponseEntity.ok(UserProfileResponse.fromUser(user));
    }
}
