package com.sahi.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(
            strategy =
                    GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


    private Double totalAmount;


    private String status;


    public Long getId() {
        return id;
    }

    public void setId(
            Long id) {
        this.id = id;
    }


    public User getUser() {
        return user;
    }

    public void setUser(
            User user) {
        this.user = user;
    }


    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(
            Double totalAmount) {

        this.totalAmount =
                totalAmount;
    }


    public String getStatus() {
        return status;
    }

    public void setStatus(
            String status) {

        this.status = status;
    }
}