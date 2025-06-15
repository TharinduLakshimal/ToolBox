package com.project.toolbox.Controller;

import com.project.toolbox.Service.RentalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    public static class RentalRequest {
        public Long userId;
        public Long toolId;
        public String startDate;
        public String endDate;
        public Double amount;
        public Integer quantity; 
    }
}
