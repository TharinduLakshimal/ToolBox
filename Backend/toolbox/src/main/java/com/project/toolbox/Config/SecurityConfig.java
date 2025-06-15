package com.project.toolbox.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
public class SecurityConfig {

    // Inject your JWT filter if you're using one (example: JwtAuthFilter)
    // @Autowired
    // private JwtAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors()
            .and()
            .csrf().disable()
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .requestMatchers("/api/auth/register", "/api/auth/login").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/tools/getTools").permitAll()
                .requestMatchers("/api/payment/**", "/api/rental/**", "/api/tools/**").permitAll()
                .requestMatchers("/api/user/profile").authenticated()
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .httpBasic(); // Optional: replace with JWT filter if using tokens

        // If using JWT, add this line:
        // http.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
