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

    public List<Rental> getRentalsByUserId(Long userId) {
        return rentalRepository.findAll().stream()
                .filter(rental -> rental.getUser() != null && userId.equals(rental.getUser().getId()))
                .toList();
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

    public Rental extendRental(Long id, int days) {
        Rental rental = rentalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rental not found"));

        if (rental.getStatus() == RentalStatus.RETURNED || rental.getStatus() == RentalStatus.CANCELLED) {
            throw new RuntimeException("This rental cannot be extended");
        }

        LocalDate newEndDate = rental.getEndDate().plusDays(days);
        rental.setEndDate(newEndDate);

        if (rental.getTool() != null && rental.getQuantity() != null) {
            BigDecimal extraCharge = BigDecimal.valueOf(rental.getTool().getPricePerDay())
                    .multiply(BigDecimal.valueOf(days))
                    .multiply(BigDecimal.valueOf(rental.getQuantity()));
            rental.setTotalAmount(rental.getTotalAmount().add(extraCharge));
        }

        rental.setStatus(RentalStatus.CONFIRMED);
        return rentalRepository.save(rental);
    }

    public Rental returnRental(Long id) {
        Rental rental = rentalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rental not found"));

        if (rental.getTool() != null && rental.getQuantity() != null) {
            Tool tool = rental.getTool();
            tool.setQuantity(tool.getQuantity() + rental.getQuantity());
            tool.setIsAvailable(true);
            toolRepository.save(tool);
        }

        rental.setStatus(RentalStatus.RETURNED);
        return rentalRepository.save(rental);
    }

    public void deleteRental(Long id) {
        rentalRepository.deleteById(id);
    }

    public Rental getRentalById(Long id) {
        return rentalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rental not found"));
    }
}
