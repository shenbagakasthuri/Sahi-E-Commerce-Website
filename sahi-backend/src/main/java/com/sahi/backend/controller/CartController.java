package com.sahi.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.sahi.backend.entity.CartItem;
import com.sahi.backend.service.CartService;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService
            cartService;


    public CartController(
            CartService cartService) {

        this.cartService =
                cartService;
    }


    @PostMapping
    public CartItem addToCart(

            @RequestParam
            Long userId,

            @RequestParam
            Long productId,

            @RequestParam
            Integer quantity) {

        return cartService
                .addToCart(
                        userId,
                        productId,
                        quantity
                );
    }


    @GetMapping("/{userId}")
    public List<CartItem>
    getUserCart(

            @PathVariable
            Long userId) {

        return cartService
                .getUserCart(userId);
    }


    @DeleteMapping("/{cartItemId}")
    public String removeCartItem(

            @PathVariable
            Long cartItemId) {

        cartService
                .removeCartItem(
                        cartItemId
                );

        return "Item removed";
    }
}