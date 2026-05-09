package com.sahi.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.sahi.backend.entity.Product;

import com.sahi.backend.repository.ProductRepository;

@Service
public class ProductService {

        private final ProductRepository productRepository;

        public ProductService(
                        ProductRepository productRepository) {

                this.productRepository = productRepository;
        }

        public Product addProduct(
                        Product product) {

                return productRepository
                                .save(product);
        }

        public List<Product> getAllProducts() {

                return productRepository
                                .findAll();
        }

        public Product getProductById(
                        Long id) {

                return productRepository
                                .findById(id)
                                .orElse(null);
        }

        public List<Product> searchProducts(
                        String keyword) {

                return productRepository
                                .findByNameContainingIgnoreCase(
                                                keyword);
        }

        public List<Product> filterByCategory(
                        String category) {

                return productRepository
                                .findByCategoryIgnoreCase(
                                                category);
        }

        public List<Product> filterByPrice(
                        Double min,
                        Double max) {

                return productRepository
                                .findByPriceBetween(
                                                min,
                                                max);
        }

        // UPDATE
        public Product updateProduct(

                        Long id,

                        Product updatedProduct) {

                Product product = productRepository
                                .findById(id)
                                .orElse(null);

                if (product == null) {
                        return null;
                }

                product.setName(
                                updatedProduct.getName());

                product.setCategory(
                                updatedProduct.getCategory());

                product.setPrice(
                                updatedProduct.getPrice());

                product.setStock(
                                updatedProduct.getStock());

                product.setImageUrl(
                                updatedProduct.getImageUrl());

                return productRepository
                                .save(product);
        }

        // DELETE
        public void deleteProduct(
                        Long id) {

                productRepository
                                .deleteById(id);
        }
}