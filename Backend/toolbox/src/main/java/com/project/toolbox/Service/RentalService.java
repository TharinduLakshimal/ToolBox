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

    public void createRental(RentalRequest request) {
        Rental rental = new Rental(null, null, null, null, null, null, null, null);
        rental.setUser(userRepository.findById(request.userId).orElseThrow());
        rental.setTool(toolRepository.findById(request.toolId).orElseThrow());
        rental.setStartDate(LocalDate.parse(request.startDate));
        rental.setEndDate(LocalDate.parse(request.endDate));
        rental.setTotalAmount(BigDecimal.valueOf(request.amount));
        rental.setStatus(RentalStatus.CONFIRMED);
        rental.setCreatedAt(LocalDateTime.now());
        rentalRepository.save(rental);
    }
}