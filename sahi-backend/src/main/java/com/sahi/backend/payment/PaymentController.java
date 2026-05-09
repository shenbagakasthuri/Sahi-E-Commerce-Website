package com.sahi.backend.payment;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;

import org.json.JSONObject;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import com.razorpay.Utils;
import org.json.JSONObject;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;


    @PostMapping("/create-order")
    public String createOrder(
            @RequestBody
            PaymentRequest request
    ) throws Exception {


        RazorpayClient client =
                new RazorpayClient(
                        keyId,
                        keySecret
                );


        JSONObject options =
                new JSONObject();


        options.put(
                "amount",
                request.getAmount() * 100
        );

        options.put(
                "currency",
                "INR"
        );

        options.put(
                "receipt",
                "txn_123"
        );


        Order order =
                client.orders.create(
                        options
                );


        return order.toString();
    }

    @PostMapping("/verify")
    public String verifyPayment(

        @RequestBody
        VerifyPaymentRequest request

    ) throws Exception {


    JSONObject options =
            new JSONObject();


    options.put(
            "razorpay_order_id",
            request.getRazorpayOrderId()
    );


    options.put(
            "razorpay_payment_id",
            request.getRazorpayPaymentId()
    );


    options.put(
            "razorpay_signature",
            request.getRazorpaySignature()
    );


    boolean verified =
            Utils.verifyPaymentSignature(
                    options,
                    keySecret
            );


    if (verified) {
        return "PAYMENT VERIFIED ✅";
    }


    return "INVALID PAYMENT ❌";
    }
}