package com.sahi.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.sahi.backend.entity.WishlistItem;
import com.sahi.backend.service.WishlistService;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    private final WishlistService
            wishlistService;


    public WishlistController(
            WishlistService
                    wishlistService) {

        this.wishlistService =
                wishlistService;
    }


    @PostMapping
    public WishlistItem add(

            @RequestParam
            Long userId,

            @RequestParam
            Long productId) {

        return wishlistService
                .addToWishlist(
                        userId,
                        productId
                );
    }



    @GetMapping("/{userId}")
    public List<WishlistItem>
    getWishlist(

            @PathVariable
            Long userId) {

        return wishlistService
                .getWishlist(
                        userId
                );
    }



    @DeleteMapping("/{id}")
    public String remove(

            @PathVariable
            Long id) {

        wishlistService
                .removeItem(
                        id
                );

        return "Removed";
    }
}