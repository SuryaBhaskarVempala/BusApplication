package com.busapp.BackendApp.Config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.LogoutConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationFailureHandler authenticationFailureHandler;  // Autowire custom failure handler

    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests((requests) -> requests
                .requestMatchers( "/signup", "/login").permitAll()
                .anyRequest().authenticated());

        http.formLogin((form) -> form
                .loginPage("/login")
                .failureHandler(authenticationFailureHandler) // Use the custom failure handler here
                .defaultSuccessUrl("/", true)
                .permitAll());

        http.logout(LogoutConfigurer::permitAll);
        http.csrf(AbstractHttpConfigurer::disable);
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        System.out.println("AuthProvider");
        DaoAuthenticationProvider dao = new DaoAuthenticationProvider();
        System.out.println("Dao Provider");
        dao.setUserDetailsService(userDetailsService);
        System.out.println("Set UserDetails");
        dao.setPasswordEncoder(new BCryptPasswordEncoder(10));
        return dao;
    }
}
