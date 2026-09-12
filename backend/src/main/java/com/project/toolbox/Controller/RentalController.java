package com.project.toolbox.Controller;

import com.project.toolbox.Model.Rental;
import com.project.toolbox.Service.RentalService;
import com.project.toolbox.dto.RentalRequestDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rental")
public class RentalController {

    @Autowired
    private RentalService rentalService;

    @PostMapping("/create")
    public ResponseEntity<Rental> createRental(@Valid @RequestBody RentalRequestDto request, Authentication authentication) {
        String email = authentication != null ? authentication.getName() : null;
        boolean isAdmin = authentication != null && authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        Rental rental = rentalService.createRental(request, email, isAdmin);
        return ResponseEntity.ok(rental);
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Rental>> getAllRentals() {
        return ResponseEntity.ok(rentalService.getAllRentals());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Rental>> getRentalsByUser(@PathVariable Long userId, Authentication authentication) {
        boolean isAdmin = authentication != null && authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        List<Rental> rentals = rentalService.getRentalsByUserId(userId);
        if (!isAdmin && !rentals.isEmpty()) {
            boolean isOwner = rentals.get(0).getUser() != null &&
                    authentication != null &&
                    authentication.getName().equalsIgnoreCase(rentals.get(0).getUser().getEmail());
            if (!isOwner) {
                return ResponseEntity.status(403).build();
            }
        }

        return ResponseEntity.ok(rentals);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rental> getRentalById(@PathVariable Long id, Authentication authentication) {
        Rental rental = rentalService.getRentalById(id);
        boolean isAdmin = authentication != null && authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        boolean isOwner = rental.getUser() != null &&
                authentication != null &&
                authentication.getName().equalsIgnoreCase(rental.getUser().getEmail());

        if (!isAdmin && !isOwner) {
            return ResponseEntity.status(403).build();
        }

        return ResponseEntity.ok(rental);
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Rental> updateRental(@PathVariable Long id, @RequestBody RentalRequestDto request) {
        return ResponseEntity.ok(rentalService.updateRental(id, request));
    }

    @PutMapping("/{id}/extend")
    public ResponseEntity<Rental> extendRental(@PathVariable Long id, @RequestParam int days, Authentication authentication) {
        String email = authentication != null ? authentication.getName() : null;
        boolean isAdmin = authentication != null && authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        return ResponseEntity.ok(rentalService.extendRental(id, days, email, isAdmin));
    }

    @PutMapping("/{id}/return")
    public ResponseEntity<Rental> returnRental(@PathVariable Long id, Authentication authentication) {
        String email = authentication != null ? authentication.getName() : null;
        boolean isAdmin = authentication != null && authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        return ResponseEntity.ok(rentalService.returnRental(id, email, isAdmin));
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteRental(@PathVariable Long id) {
        rentalService.deleteRental(id);
        return ResponseEntity.ok("Rental deleted successfully");
    }
}
