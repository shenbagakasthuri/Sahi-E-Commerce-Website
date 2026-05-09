package com.sahi.backend.dto;

public class AdminDashboardResponse {

    private Long totalUsers;

    private Long totalProducts;

    private Long totalOrders;

    private Double totalRevenue;


    public AdminDashboardResponse(
            Long totalUsers,
            Long totalProducts,
            Long totalOrders,
            Double totalRevenue) {

        this.totalUsers =
                totalUsers;

        this.totalProducts =
                totalProducts;

        this.totalOrders =
                totalOrders;

        this.totalRevenue =
                totalRevenue;
    }


    public Long getTotalUsers() {
        return totalUsers;
    }


    public Long getTotalProducts() {
        return totalProducts;
    }


    public Long getTotalOrders() {
        return totalOrders;
    }


    public Double getTotalRevenue() {
        return totalRevenue;
    }
}