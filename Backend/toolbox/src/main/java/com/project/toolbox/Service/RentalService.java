package com.project.toolbox.Service;

import com.project.toolbox.Controller.RentalController.RentalRequest;
import com.project.toolbox.Model.*;
import com.project.toolbox.Repository.RentalRepository;
import com.project.toolbox.Repository.ToolRepository;
import com.project.toolbox.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class RentalService {

    @Autowired
    private RentalRepository rentalRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ToolRepository toolRepository;

    public Tool createRental(RentalRequest request) {
        Rental rental = new Rental(null, null, null, null, null, null, null, null, null);

        User user = userRepository.findById(request.userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Tool tool = toolRepository.findById(request.toolId)
                .orElseThrow(() -> new RuntimeException("Tool not found"));

        // 🔽 Check if the tool is available
        if (tool.getQuantity() < request.quantity || !tool.getIsAvailable()) {
            throw new RuntimeException("Tool not available or insufficient quantity");
        }

        // 🔽 Reduce quantity
        int updatedQty = tool.getQuantity() - request.quantity;
        tool.setQuantity(updatedQty);

        // 🔽 Set availability to false if quantity becomes zero
        if (updatedQty == 0) {
            tool.setIsAvailable(false);
        }

        toolRepository.save(tool); // ✅ Save updated tool

        rental.setUser(user);
        rental.setTool(tool);
        rental.setStartDate(LocalDate.parse(request.startDate));
        rental.setEndDate(LocalDate.parse(request.endDate));
        rental.setTotalAmount(BigDecimal.valueOf(request.amount));
        rental.setStatus(RentalStatus.CONFIRMED);
        rental.setCreatedAt(LocalDateTime.now());
        rental.setQuantity(request.quantity); // ✅ Save rented quantity

        rentalRepository.save(rental); // ✅ Save rental

        return tool; // Optional: return updated tool object if needed
    }
}
