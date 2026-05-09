package com.sahi.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sahi.backend.entity.WishlistItem;

public interface WishlistRepository
        extends JpaRepository<
                WishlistItem,
                Long> {

    List<WishlistItem>
    findByUserId(
            Long userId
    );
}

