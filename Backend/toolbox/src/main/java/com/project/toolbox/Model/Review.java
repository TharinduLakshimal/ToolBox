package com.project.toolbox.Model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "reviews")

public class Review {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY) 
private Long id; 

@ManyToOne
private User user;

@ManyToOne 
private Tool tool; 

private Integer rating; 
private String comment; 
private LocalDateTime createdAt;
public Review(Long id, User user, Tool tool, Integer rating, String comment, LocalDateTime createdAt) {
    this.id = id;
    this.user = user;
    this.tool = tool;
    this.rating = rating;
    this.comment = comment;
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
public Tool getTool() {
    return tool;
}
public void setTool(Tool tool) {
    this.tool = tool;
}
public Integer getRating() {
    return rating;
}
public void setRating(Integer rating) {
    this.rating = rating;
}
public String getComment() {
    return comment;
}
public void setComment(String comment) {
    this.comment = comment;
}
public LocalDateTime getCreatedAt() {
    return createdAt;
}
public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
}


}