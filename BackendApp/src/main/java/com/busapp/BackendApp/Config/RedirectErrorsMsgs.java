package com.busapp.BackendApp.Config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
class RedirectErrorsMsgs implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception)
            throws IOException, ServletException {
        if (exception instanceof org.springframework.security.core.userdetails.UsernameNotFoundException) {
            // Handle UserNotFoundException
            System.out.println("User Not Found");
            response.sendRedirect("/login?error=User+Not+Found");
        } else if (exception instanceof BadCredentialsException) {
            // Handle BadCredentialsException
            System.out.println("Bad Credentials");
            response.sendRedirect("/login?error=Bad+Credentials");
        } else {
            // Handle any other authentication failure
            System.out.println("Authentication Failed");
            response.sendRedirect("/login?error=authenticationfailed");
        }
    }
}
