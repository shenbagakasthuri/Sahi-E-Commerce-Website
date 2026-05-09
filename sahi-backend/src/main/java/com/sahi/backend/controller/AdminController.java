package com.sahi.backend.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.sahi.backend.dto.AdminDashboardResponse;

import com.sahi.backend.repository.UserRepository;
import com.sahi.backend.repository.ProductRepository;
import com.sahi.backend.repository.OrderRepository;
import java.util.List;
import com.sahi.backend.entity.Product;
import com.sahi.backend.entity.User;
import com.sahi.backend.entity.Role;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserRepository userRepository;

    private final ProductRepository productRepository;

    private final OrderRepository orderRepository;

    public AdminController(

            UserRepository userRepository,

            ProductRepository productRepository,

            OrderRepository orderRepository) {

        this.userRepository = userRepository;

        this.productRepository = productRepository;

        this.orderRepository = orderRepository;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/dashboard")
    public AdminDashboardResponse dashboard() {

        return new AdminDashboardResponse(

                userRepository.count(),

                productRepository.count(),

                orderRepository.count(),

                orderRepository
                        .getTotalRevenue());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/low-stock")
    public List<Product> lowStock() {

        return productRepository
                .findByStockLessThanEqual(
                        5);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/users")
    public List<User> getUsers() {

        return userRepository
                .findAll();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/users/{id}/role")
    public User updateRole(

            @PathVariable Long id,

            @RequestParam Role role) {

        User user = userRepository
                .findById(id)
                .orElseThrow();

        user.setRole(
                role);

        return userRepository
                .save(user);
    }

}