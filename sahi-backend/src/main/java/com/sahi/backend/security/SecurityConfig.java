package com.sahi.backend.security;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;

import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    private final CustomUserDetailsService
            customUserDetailsService;


    public SecurityConfig(
            JwtFilter jwtFilter,

            CustomUserDetailsService
                    customUserDetailsService) {

        this.jwtFilter =
                jwtFilter;

        this.customUserDetailsService =
                customUserDetailsService;
    }


    // PASSWORD ENCODER
    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }


    // AUTH PROVIDER
    @Bean
    public AuthenticationProvider
    authenticationProvider() {

        DaoAuthenticationProvider provider =
                new DaoAuthenticationProvider();

        provider.setUserDetailsService(
                customUserDetailsService
        );

        provider.setPasswordEncoder(
                passwordEncoder()
        );

        return provider;
    }


    // SECURITY
    @Bean
    public SecurityFilterChain
    filterChain(
            HttpSecurity http)
            throws Exception {

        http

            .cors(cors -> {})

            .csrf(csrf ->
                    csrf.disable())

            .sessionManagement(session ->

                    session.sessionCreationPolicy(
                            SessionCreationPolicy.STATELESS
                    )
            )

            .authenticationProvider(
                    authenticationProvider()
            )

            .authorizeHttpRequests(auth -> auth

                    // PUBLIC
                    .requestMatchers(
                            "/api/auth/**"
                    ).permitAll()

                    .requestMatchers(
                            "/api/products/**"
                    ).permitAll()


                    // SWAGGER
                    .requestMatchers(
                            "/swagger-ui/**",
                            "/v3/api-docs/**"
                    ).permitAll()


                    // OPTIONS
                    .requestMatchers(
                            HttpMethod.OPTIONS,
                            "/**"
                    ).permitAll()


                    // PROTECTED
                    .requestMatchers(
                            "/api/cart/**"
                    ).authenticated()

                    .requestMatchers(
                            "/api/wishlist/**"
                    ).authenticated()

                    .requestMatchers(
                            "/api/orders/**"
                    ).authenticated()


                    .anyRequest()
                    .authenticated()
            )

            .addFilterBefore(

                    jwtFilter,

                    UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }



    // CORS
    @Bean
    public CorsConfigurationSource
    corsConfigurationSource() {

        CorsConfiguration config =
                new CorsConfiguration();


        // 🔥 IMPORTANT
        config.setAllowedOriginPatterns(
                List.of("*")
        );


        config.setAllowedMethods(
                List.of("*")
        );


        config.setAllowedHeaders(
                List.of("*")
        );


        config.setAllowCredentials(
                true
        );


        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();


        source.registerCorsConfiguration(
                "/**",
                config
        );


        return source;
    }
}