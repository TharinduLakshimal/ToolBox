package com.project.toolbox.Model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity

@Table(name = "tools")
public class Tool{

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY) 
private Long id; 
private String name; 
private String category; 
private String description; 
private String imageUrl; 
private BigDecimal pricePerDay; 
private BigDecimal pricePerWeek; 
private Integer quantity; 
private Boolean isAvailable; 
private LocalDateTime createdAt;

public Tool() {
}

public Tool(Long id, String name, String category, String description, String imageUrl, BigDecimal pricePerDay,
        BigDecimal pricePerWeek, Integer quantity, Boolean isAvailable, LocalDateTime createdAt) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.description = description;
    this.imageUrl = imageUrl;
    this.pricePerDay = pricePerDay;
    this.pricePerWeek = pricePerWeek;
    this.quantity = quantity;
    this.isAvailable = isAvailable;
    this.createdAt = createdAt;
}
public Long getId() {
    return id;
}
public void setId(Long id) {
    this.id = id;
}
public String getName() {
    return name;
}
public void setName(String name) {
    this.name = name;
}
public String getCategory() {
    return category;
}
public void setCategory(String category) {
    this.category = category;
}
public String getDescription() {
    return description;
}
public void setDescription(String description) {
    this.description = description;
}
public String getImageUrl() {
    return imageUrl;
}
public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
}
public BigDecimal getPricePerDay() {
    return pricePerDay;
}
public void setPricePerDay(BigDecimal pricePerDay) {
    this.pricePerDay = pricePerDay;
}
public BigDecimal getPricePerWeek() {
    return pricePerWeek;
}
public void setPricePerWeek(BigDecimal pricePerWeek) {
    this.pricePerWeek = pricePerWeek;
}
public Integer getQuantity() {
    return quantity;
}
public void setQuantity(Integer quantity) {
    this.quantity = quantity;
}
public Boolean getIsAvailable() {
    return isAvailable;
}
public void setIsAvailable(Boolean isAvailable) {
    this.isAvailable = isAvailable;
}
public LocalDateTime getCreatedAt() {
    return createdAt;
}
public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
} 

}