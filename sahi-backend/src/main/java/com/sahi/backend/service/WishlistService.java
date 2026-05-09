package com.sahi.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.sahi.backend.entity.Product;
import com.sahi.backend.entity.User;
import com.sahi.backend.entity.WishlistItem;

import com.sahi.backend.repository.ProductRepository;
import com.sahi.backend.repository.UserRepository;
import com.sahi.backend.repository.WishlistRepository;

@Service
public class WishlistService {

    private final WishlistRepository
            wishlistRepository;

    private final UserRepository
            userRepository;

    private final ProductRepository
            productRepository;


    public WishlistService(

            WishlistRepository
                    wishlistRepository,

            UserRepository
                    userRepository,

            ProductRepository
                    productRepository) {

        this.wishlistRepository =
                wishlistRepository;

        this.userRepository =
                userRepository;

        this.productRepository =
                productRepository;
    }


    public WishlistItem addToWishlist(

            Long userId,

            Long productId) {


        User user =
                userRepository
                        .findById(userId)
                        .orElse(null);


        Product product =
                productRepository
                        .findById(productId)
                        .orElse(null);


        WishlistItem item =
                new WishlistItem();

        item.setUser(user);

        item.setProduct(
                product
        );


        return wishlistRepository
                .save(item);
    }


    public List<WishlistItem>
    getWishlist(
            Long userId) {

        return wishlistRepository
                .findByUserId(
                        userId
                );
    }


    public void removeItem(
            Long id) {

        wishlistRepository
                .deleteById(id);
    }
}