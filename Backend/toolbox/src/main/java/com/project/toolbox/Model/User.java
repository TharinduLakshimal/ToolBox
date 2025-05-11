package com.project.toolbox.Model;

import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="users")
public class User {
    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 
    private String name;
    @Column(unique=true)
    private String email; 
    private String passwordHash; 
    private String phone; 
    private String address;
    @Enumerated(EnumType.STRING)
    private Role role;
    private LocalDateTime createdAt;
}