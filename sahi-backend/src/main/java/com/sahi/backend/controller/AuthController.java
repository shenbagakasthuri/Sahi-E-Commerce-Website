package com.sahi.backend.controller;

import com.sahi.backend.dto.LoginRequest;
import com.sahi.backend.dto.RegisterRequest;
import com.sahi.backend.entity.User;
import com.sahi.backend.security.JwtUtil;
import com.sahi.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder encoder;

    public AuthController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.encoder = new BCryptPasswordEncoder();
    }

    // =========================
    // REGISTER
    // =========================
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {

        try {
            String result = userService.register(request);

            return ResponseEntity.ok(
                    Map.of(
                            "message", result
                    )
            );

        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of(
                            "message", e.getMessage()
                    ));
        }
    }

    // =========================
    // LOGIN
    // =========================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        User user = userService.findByEmail(request.getEmail());

        // ❌ User not found
        if (user == null) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of(
                            "message", "User not found"
                    ));
        }

        // ❌ Wrong password
        if (!encoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of(
                            "message", "Invalid password"
                    ));
        }

        // ✅ Generate JWT
        String token = jwtUtil.generateToken(user.getEmail());

        // ✅ Return full structured response
        return ResponseEntity.ok(
                Map.of(
                        "token", token,
                        "user", Map.of(
                                "id", user.getId(),
                                "name", user.getName(),
                                "email", user.getEmail(),
                                "role", user.getRole()
                        )
                )
        );
    }
}