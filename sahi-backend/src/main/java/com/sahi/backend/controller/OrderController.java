package com.sahi.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.sahi.backend.entity.Order;
import com.sahi.backend.service.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService
            orderService;


    public OrderController(
            OrderService orderService) {

        this.orderService =
                orderService;
    }


    @PostMapping("/{userId}")
    public Order placeOrder(

            @PathVariable
            Long userId) {

        return orderService
                .placeOrder(
                        userId
                );
    }



    @GetMapping("/{userId}")
    public List<Order>
    getOrderHistory(

            @PathVariable
            Long userId) {

        return orderService
                .getOrderHistory(
                        userId
                );
    }
}