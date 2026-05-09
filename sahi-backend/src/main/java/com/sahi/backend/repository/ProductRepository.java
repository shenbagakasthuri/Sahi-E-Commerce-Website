package com.sahi.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sahi.backend.entity.Product;

public interface ProductRepository
        extends JpaRepository<Product, Long> {


    List<Product>
    findByNameContainingIgnoreCase(
            String keyword
    );


    List<Product>
    findByCategoryIgnoreCase(
            String category
    );


    List<Product>
    findByPriceBetween(
            Double min,
            Double max
    );


    List<Product>
    findByStockLessThanEqual(
        Integer stock
  );
}