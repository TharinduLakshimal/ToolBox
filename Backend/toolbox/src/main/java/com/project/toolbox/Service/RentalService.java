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
import java.util.List;

@Service
public class RentalService {

    @Autowired
    private RentalRepository rentalRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ToolRepository toolRepository;

    public Tool createRental(RentalRequest request) {
        Rental rental = new Rental();

        User user = userRepository.findById(request.userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Tool tool = toolRepository.findById(request.toolId)
                .orElseThrow(() -> new RuntimeException("Tool not found"));

        if (tool.getQuantity() < request.quantity || !tool.getIsAvailable()) {
            throw new RuntimeException("Tool not available or insufficient quantity");
        }

        int updatedQty = tool.getQuantity() - request.quantity;
        tool.setQuantity(updatedQty);
        if (updatedQty == 0) tool.setIsAvailable(false);

        toolRepository.save(tool);

        rental.setUser(user);
        rental.setTool(tool);
        rental.setStartDate(LocalDate.parse(request.startDate));
        rental.setEndDate(LocalDate.parse(request.endDate));
        rental.setTotalAmount(BigDecimal.valueOf(request.amount));
        rental.setStatus(RentalStatus.CONFIRMED);
        rental.setCreatedAt(LocalDateTime.now());
        rental.setQuantity(request.quantity);

        rentalRepository.save(rental);
        return tool;
    }

    public List<Rental> getAllRentals() {
        return rentalRepository.findAll();
    }

    public Rental updateRental(Long id, RentalRequest request) {
        Rental rental = rentalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rental not found"));

        User user = userRepository.findById(request.userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Tool tool = toolRepository.findById(request.toolId)
                .orElseThrow(() -> new RuntimeException("Tool not found"));

        rental.setUser(user);
        rental.setTool(tool);
        rental.setStartDate(LocalDate.parse(request.startDate));
        rental.setEndDate(LocalDate.parse(request.endDate));
        rental.setTotalAmount(BigDecimal.valueOf(request.amount));
        rental.setQuantity(request.quantity);
        rental.setStatus(RentalStatus.valueOf(request.status)); // status as string
        rentalRepository.save(rental);
        return rental;
    }

    public void deleteRental(Long id) {
        rentalRepository.deleteById(id);
    }

    public Rental getRentalById(Long id) {
        return rentalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rental not found"));
    }
}
