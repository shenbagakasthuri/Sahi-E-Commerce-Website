package com.sahi.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.sahi.backend.entity.CartItem;
import com.sahi.backend.entity.Product;
import com.sahi.backend.entity.User;

import com.sahi.backend.repository.CartItemRepository;
import com.sahi.backend.repository.ProductRepository;
import com.sahi.backend.repository.UserRepository;

@Service
public class CartService {

    private final CartItemRepository
            cartItemRepository;

    private final UserRepository
            userRepository;

    private final ProductRepository
            productRepository;


    public CartService(
            CartItemRepository cartItemRepository,
            UserRepository userRepository,
            ProductRepository productRepository) {

        this.cartItemRepository =
                cartItemRepository;

        this.userRepository =
                userRepository;

        this.productRepository =
                productRepository;
    }


    public CartItem addToCart(
            Long userId,
            Long productId,
            Integer quantity) {

        User user =
                userRepository
                        .findById(userId)
                        .orElse(null);

        Product product =
                productRepository
                        .findById(productId)
                        .orElse(null);

        CartItem cartItem =
                new CartItem();

        cartItem.setUser(user);
        cartItem.setProduct(product);
        cartItem.setQuantity(quantity);

        return cartItemRepository
                .save(cartItem);
    }


    public List<CartItem>
    getUserCart(Long userId) {

        return cartItemRepository
                .findByUserId(userId);
    }


    public void removeCartItem(
            Long cartItemId) {

        cartItemRepository
                .deleteById(cartItemId);
    }
}