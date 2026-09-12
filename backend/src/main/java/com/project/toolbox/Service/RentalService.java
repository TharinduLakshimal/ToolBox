package com.project.toolbox.Service;

import com.project.toolbox.Model.Rental;
import com.project.toolbox.Model.RentalStatus;
import com.project.toolbox.Model.Tool;
import com.project.toolbox.Model.User;
import com.project.toolbox.Repository.RentalRepository;
import com.project.toolbox.Repository.ToolRepository;
import com.project.toolbox.Repository.UserRepository;
import com.project.toolbox.dto.RentalRequestDto;
import com.project.toolbox.exception.BadRequestException;
import com.project.toolbox.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class RentalService {

    @Autowired
    private RentalRepository rentalRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ToolRepository toolRepository;

    @Transactional
    public Rental createRental(RentalRequestDto request, String callerEmail, boolean isAdmin) {
        if (request.getQuantity() == null || request.getQuantity() <= 0) {
            throw new BadRequestException("Quantity must be at least 1");
        }

        User user;
        if (isAdmin && request.getUserId() != null) {
            user = userRepository.findById(request.getUserId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + request.getUserId()));
        } else {
            user = userRepository.findByEmail(callerEmail)
                    .orElseThrow(() -> new ResourceNotFoundException("Authenticated user not found with email: " + callerEmail));
        }

        Tool tool = toolRepository.findById(request.getToolId())
                .orElseThrow(() -> new ResourceNotFoundException("Tool not found with id: " + request.getToolId()));

        if (!Boolean.TRUE.equals(tool.getIsAvailable()) || tool.getQuantity() < request.getQuantity()) {
            throw new BadRequestException("Tool not available or insufficient quantity. Available: " + tool.getQuantity());
        }

        LocalDate start;
        LocalDate end;
        try {
            start = LocalDate.parse(request.getStartDate());
            end = LocalDate.parse(request.getEndDate());
        } catch (Exception e) {
            throw new BadRequestException("Invalid date format. Expected YYYY-MM-DD");
        }

        if (end.isBefore(start)) {
            throw new BadRequestException("End date cannot be earlier than start date");
        }

        long days = ChronoUnit.DAYS.between(start, end) + 1;
        if (days <= 0) days = 1;

        BigDecimal dailyPrice = tool.getPricePerDay() != null ? tool.getPricePerDay() : BigDecimal.ZERO;
        BigDecimal calculatedTotal = dailyPrice
                .multiply(BigDecimal.valueOf(days))
                .multiply(BigDecimal.valueOf(request.getQuantity()));

        // Debit inventory
        int updatedQty = tool.getQuantity() - request.getQuantity();
        tool.setQuantity(updatedQty);
        if (updatedQty == 0) {
            tool.setIsAvailable(false);
        }
        toolRepository.save(tool);

        Rental rental = new Rental();
        rental.setUser(user);
        rental.setTool(tool);
        rental.setStartDate(start);
        rental.setEndDate(end);
        rental.setTotalAmount(calculatedTotal);
        rental.setStatus(RentalStatus.CONFIRMED);
        rental.setCreatedAt(LocalDateTime.now());
        rental.setQuantity(request.getQuantity());

        return rentalRepository.save(rental);
    }

    public List<Rental> getAllRentals() {
        return rentalRepository.findAll();
    }

    public List<Rental> getRentalsByUserId(Long userId) {
        return rentalRepository.findAll().stream()
                .filter(rental -> rental.getUser() != null && userId.equals(rental.getUser().getId()))
                .toList();
    }

    @Transactional
    public Rental updateRental(Long id, RentalRequestDto request) {
        Rental rental = getRentalById(id);

        if (request.getUserId() != null) {
            User user = userRepository.findById(request.getUserId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found: " + request.getUserId()));
            rental.setUser(user);
        }

        if (request.getToolId() != null) {
            Tool tool = toolRepository.findById(request.getToolId())
                    .orElseThrow(() -> new ResourceNotFoundException("Tool not found: " + request.getToolId()));
            rental.setTool(tool);
        }

        if (request.getStartDate() != null) rental.setStartDate(LocalDate.parse(request.getStartDate()));
        if (request.getEndDate() != null) rental.setEndDate(LocalDate.parse(request.getEndDate()));
        if (request.getAmount() != null) rental.setTotalAmount(BigDecimal.valueOf(request.getAmount()));
        if (request.getQuantity() != null) rental.setQuantity(request.getQuantity());
        if (request.getStatus() != null) rental.setStatus(RentalStatus.valueOf(request.getStatus().toUpperCase()));

        return rentalRepository.save(rental);
    }

    @Transactional
    public Rental extendRental(Long id, int days, String callerEmail, boolean isAdmin) {
        if (days <= 0) {
            throw new BadRequestException("Extension days must be greater than 0");
        }

        Rental rental = getRentalById(id);
        verifyOwnershipOrAdmin(rental, callerEmail, isAdmin);

        if (rental.getStatus() == RentalStatus.RETURNED || rental.getStatus() == RentalStatus.CANCELLED) {
            throw new BadRequestException("This rental cannot be extended as it is already " + rental.getStatus());
        }

        LocalDate newEndDate = rental.getEndDate().plusDays(days);
        rental.setEndDate(newEndDate);

        if (rental.getTool() != null && rental.getQuantity() != null && rental.getTool().getPricePerDay() != null) {
            BigDecimal extraCharge = rental.getTool().getPricePerDay()
                    .multiply(BigDecimal.valueOf(days))
                    .multiply(BigDecimal.valueOf(rental.getQuantity()));
            rental.setTotalAmount(rental.getTotalAmount().add(extraCharge));
        }

        rental.setStatus(RentalStatus.CONFIRMED);
        return rentalRepository.save(rental);
    }

    @Transactional
    public Rental returnRental(Long id, String callerEmail, boolean isAdmin) {
        Rental rental = getRentalById(id);
        verifyOwnershipOrAdmin(rental, callerEmail, isAdmin);

        if (rental.getStatus() == RentalStatus.RETURNED) {
            throw new BadRequestException("Rental is already returned");
        }

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
        Rental rental = getRentalById(id);
        rentalRepository.delete(rental);
    }

    public Rental getRentalById(Long id) {
        return rentalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Rental not found with id: " + id));
    }

    private void verifyOwnershipOrAdmin(Rental rental, String callerEmail, boolean isAdmin) {
        if (isAdmin) return;
        if (rental.getUser() == null || !callerEmail.equalsIgnoreCase(rental.getUser().getEmail())) {
            throw new BadRequestException("You do not have permission to manage this rental");
        }
    }
}
