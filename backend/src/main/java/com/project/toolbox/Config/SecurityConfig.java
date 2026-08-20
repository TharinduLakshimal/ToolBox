package com.project.toolbox.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors()
            .and()
            .csrf().disable()
            .authorizeHttpRequests(auth -> auth
                // Allow login and register without authentication
                .requestMatchers("/api/auth/register", "/api/auth/login").permitAll()

                // Allow GET requests for tools (list, search, by id)
                .requestMatchers(HttpMethod.GET, "/api/tools/**").permitAll()

                // Allow POST to add tools
                .requestMatchers(HttpMethod.POST, "/api/tools/add").permitAll()

                // Allow PUT to update tools
                .requestMatchers(HttpMethod.PUT, "/api/tools/update/**").permitAll()

                // Allow DELETE to delete tools
                .requestMatchers(HttpMethod.DELETE, "/api/tools/delete/**").permitAll()

                // Allow rental and payment for now (optional)
                .requestMatchers("/api/payment/**", "/api/rental/**").permitAll()

                // **Allow getting all users without authentication**
                .requestMatchers(HttpMethod.GET, "/api/users/**").permitAll()

                // Protect user profile (authenticated only)
                .requestMatchers("/api/user/profile").authenticated()

                // All other requests need authentication
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .httpBasic(); // You can replace this with JWT if needed later

        return http.build();
    }
}
