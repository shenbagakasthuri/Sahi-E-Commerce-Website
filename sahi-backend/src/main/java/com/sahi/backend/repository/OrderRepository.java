package com.sahi.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sahi.backend.entity.Order;

import org.springframework.data.jpa.repository.Query;


public interface OrderRepository
        extends JpaRepository<Order, Long> {

    List<Order> findByUserId(Long userId);
    @Query( "SELECT COALESCE(SUM(o.totalAmount),0) FROM Order o") Double getTotalRevenue();
}