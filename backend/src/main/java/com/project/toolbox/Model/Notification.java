package com.project.toolbox.Model;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "notifications")
public class Notification {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long id; 
    
    @ManyToOne 
    private User user; 
    
    private String message; 
    private Boolean isRead; 
    private LocalDateTime createdAt;
    public Notification(Long id, User user, String message, Boolean isRead, LocalDateTime createdAt) {
        this.id = id;
        this.user = user;
        this.message = message;
        this.isRead = isRead;
        this.createdAt = createdAt;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public Boolean getIsRead() {
        return isRead;
    }
    public void setIsRead(Boolean isRead) {
        this.isRead = isRead;
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
}
