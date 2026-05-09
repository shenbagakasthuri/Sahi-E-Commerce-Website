package com.sahi.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.sahi.backend.entity.CartItem;
import com.sahi.backend.entity.Order;
import com.sahi.backend.entity.User;

import com.sahi.backend.repository.CartItemRepository;
import com.sahi.backend.repository.OrderRepository;
import com.sahi.backend.repository.UserRepository;

@Service
public class OrderService {

    private final OrderRepository
            orderRepository;

    private final CartItemRepository
            cartRepository;

    private final UserRepository
            userRepository;


    public OrderService(

            OrderRepository orderRepository,

            CartItemRepository cartRepository,

            UserRepository userRepository) {

        this.orderRepository =
                orderRepository;

        this.cartRepository =
                cartRepository;

        this.userRepository =
                userRepository;
    }


    public Order placeOrder(
            Long userId) {

        List<CartItem> cartItems =
                cartRepository
                        .findByUserId(
                                userId
                        );


        double total = 0;


        for (CartItem item :
                cartItems) {

            total +=

                    item.getProduct()
                            .getPrice()

                            *

                    item.getQuantity();
        }


        User user =
                userRepository
                        .findById(userId)
                        .orElse(null);


        Order order =
                new Order();

        order.setUser(user);

        order.setTotalAmount(
                total
        );

        order.setStatus(
                "PLACED"
        );


        Order savedOrder =
                orderRepository
                        .save(order);


        cartRepository
                .deleteByUserId(
                        userId
                );


        return savedOrder;
    }


    public List<Order>
    getOrderHistory(
            Long userId) {

        return orderRepository
                .findByUserId(
                        userId
                );
    }
}