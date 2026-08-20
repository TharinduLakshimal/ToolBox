package com.project.toolbox.Controller;

import com.project.toolbox.Model.Rental;
import com.project.toolbox.Service.RentalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rental")
@CrossOrigin(origins = "http://localhost:3000")
public class RentalController {

    @Autowired
    private RentalService rentalService;

    @PostMapping("/create")
    public ResponseEntity<String> createRental(@RequestBody RentalRequest request) {
        rentalService.createRental(request);
        return ResponseEntity.ok("Rental saved successfully");
    }

    @GetMapping("/all")
    public ResponseEntity<List<Rental>> getAllRentals() {
        return ResponseEntity.ok(rentalService.getAllRentals());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rental> getRentalById(@PathVariable Long id) {
        return ResponseEntity.ok(rentalService.getRentalById(id));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Rental> updateRental(@PathVariable Long id, @RequestBody RentalRequest request) {
        return ResponseEntity.ok(rentalService.updateRental(id, request));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteRental(@PathVariable Long id) {
        rentalService.deleteRental(id);
        return ResponseEntity.ok("Rental deleted successfully");
    }

    public static class RentalRequest {
        public Long userId;
        public Long toolId;
        public String startDate;
        public String endDate;
        public Double amount;
        public Integer quantity;
        public String status; // For updating rental
    }
}
