package com.project.toolbox.Model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "payments")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private Rental rental;

    private String paymentMethod;
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    private PaymentStatus status; // SUCCESS, FAILED

    private LocalDateTime paidAt;
    private String stripeTransactionId;
    public Payment(Long id, Rental rental, String paymentMethod, BigDecimal amount, PaymentStatus status,
            LocalDateTime paidAt, String stripeTransactionId) {
        this.id = id;
        this.rental = rental;
        this.paymentMethod = paymentMethod;
        this.amount = amount;
        this.status = status;
        this.paidAt = paidAt;
        this.stripeTransactionId = stripeTransactionId;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Rental getRental() {
        return rental;
    }
    public void setRental(Rental rental) {
        this.rental = rental;
    }
    public String getPaymentMethod() {
        return paymentMethod;
    }
    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
    public BigDecimal getAmount() {
        return amount;
    }
    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
    public PaymentStatus getStatus() {
        return status;
    }
    public void setStatus(PaymentStatus status) {
        this.status = status;
    }
    public LocalDateTime getPaidAt() {
        return paidAt;
    }
    public void setPaidAt(LocalDateTime paidAt) {
        this.paidAt = paidAt;
    }
    public String getStripeTransactionId() {
        return stripeTransactionId;
    }
    public void setStripeTransactionId(String stripeTransactionId) {
        this.stripeTransactionId = stripeTransactionId;
    }

    
}
