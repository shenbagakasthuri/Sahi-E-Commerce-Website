package com.sahi.backend.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.sahi.backend.dto.RegisterRequest;
import com.sahi.backend.entity.Role;
import com.sahi.backend.entity.User;
import com.sahi.backend.repository.UserRepository;


@Service
public class UserService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder encoder =
            new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email already exists";
        }

        User user = new User(
                request.getName(),
                request.getEmail(),
                encoder.encode(request.getPassword()),
                Role.USER
        );

        userRepository.save(user);

        return "User registered successfully";
    }
    public User findByEmail(String email) {
        return userRepository
                .findByEmail(email)
                .orElse(null);
    }

}