package com.sahi.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import org.springframework.security.access.prepost.PreAuthorize;

import com.sahi.backend.entity.Product;
import com.sahi.backend.service.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;


    public ProductController(
            ProductService productService) {

        this.productService =
                productService;
    }


    // ADMIN ONLY
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Product addProduct(
            @RequestBody Product product) {

        return productService
                .addProduct(product);
    }


    // ADMIN ONLY
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public Product updateProduct(

            @PathVariable Long id,

            @RequestBody Product product) {

        return productService
                .updateProduct(
                        id,
                        product
                );
    }


    // ADMIN ONLY
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteProduct(
            @PathVariable Long id) {

        productService
                .deleteProduct(id);

        return "Deleted";
    }


    // PUBLIC
    @GetMapping
    public List<Product>
    getAllProducts() {

        return productService
                .getAllProducts();
    }


    // PUBLIC
    @GetMapping("/{id}")
    public Product getProductById(
            @PathVariable Long id) {

        return productService
                .getProductById(id);
    }


    // PUBLIC
    @GetMapping("/search")
    public List<Product>
    searchProducts(

            @RequestParam
            String keyword) {

        return productService
                .searchProducts(
                        keyword
                );
    }


    // PUBLIC
    @GetMapping("/filter/category")
    public List<Product>
    filterByCategory(

            @RequestParam
            String category) {

        return productService
                .filterByCategory(
                        category
                );
    }


    // PUBLIC
    @GetMapping("/filter/price")
    public List<Product>
    filterByPrice(

            @RequestParam
            Double min,

            @RequestParam
            Double max) {

        return productService
                .filterByPrice(
                        min,
                        max
                );
    }
}