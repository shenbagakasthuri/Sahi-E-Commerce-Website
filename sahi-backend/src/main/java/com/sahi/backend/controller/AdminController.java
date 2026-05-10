package com.sahi.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;

import org.springframework.security.access.prepost.PreAuthorize;

import org.springframework.web.bind.annotation.*;

import org.springframework.web.server.ResponseStatusException;

import com.sahi.backend.dto.AdminDashboardResponse;

import com.sahi.backend.entity.Product;

import com.sahi.backend.entity.Role;

import com.sahi.backend.entity.User;

import com.sahi.backend.repository.OrderRepository;

import com.sahi.backend.repository.ProductRepository;

import com.sahi.backend.repository.UserRepository;


@RestController

@RequestMapping("/api/admin")

@PreAuthorize("hasRole('ADMIN')")
public class AdminController {


    private final UserRepository
            userRepository;


    private final ProductRepository
            productRepository;


    private final OrderRepository
            orderRepository;



    public AdminController(

            UserRepository userRepository,

            ProductRepository productRepository,

            OrderRepository orderRepository) {


        this.userRepository =
                userRepository;


        this.productRepository =
                productRepository;


        this.orderRepository =
                orderRepository;
    }






    /* =========================
       DASHBOARD
    ========================= */

    @GetMapping("/dashboard")
    public AdminDashboardResponse dashboard() {


        Double revenue =
                orderRepository
                        .getTotalRevenue();


        if (revenue == null) {

            revenue = 0.0;
        }


        return new AdminDashboardResponse(

                userRepository.count(),

                productRepository.count(),

                orderRepository.count(),

                revenue);
    }








    /* =========================
       LOW STOCK
    ========================= */

    @GetMapping("/low-stock")
    public List<Product> lowStock() {


        return productRepository
                .findByStockLessThanEqual(
                        5);
    }








    /* =========================
       ALL USERS
    ========================= */

    @GetMapping("/users")
    public List<User> getUsers() {


        return userRepository
                .findAll();
    }








    /* =========================
       UPDATE USER ROLE
    ========================= */

    @PutMapping("/users/{id}/role")
    public User updateRole(

            @PathVariable Long id,

            @RequestParam Role role) {


        User user =
                userRepository
                        .findById(id)

                        .orElseThrow(

                                () ->

                                new ResponseStatusException(

                                        HttpStatus.NOT_FOUND,

                                        "User not found"
                                ));


        user.setRole(
                role);


        return userRepository
                .save(user);
    }

}