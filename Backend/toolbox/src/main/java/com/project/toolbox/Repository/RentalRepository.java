package com.project.toolbox.Repository;

import com.project.toolbox.Model.Rental;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RentalRepository extends JpaRepository<Rental, Long> {
}
