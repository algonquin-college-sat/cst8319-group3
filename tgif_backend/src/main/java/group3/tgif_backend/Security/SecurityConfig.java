package group3.tgif_backend.Security;

import group3.tgif_backend.Services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfig {

    @Autowired
    @Lazy
    private UserService userService;  // inject UserService

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter(userService);  // pass it here
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/api/users/**").permitAll()
                        .requestMatchers("/api/event").permitAll()
                        .requestMatchers("/api/dashboard").permitAll()
                        .requestMatchers("/api/registration").permitAll()
                        .requestMatchers(HttpMethod.GET,"/api/event/**").permitAll()
                        .requestMatchers("/api/artist").permitAll()
                        .requestMatchers("/api/sponsor").permitAll()
                        .requestMatchers(HttpMethod.POST,"/api/registration/**").permitAll()
                        .requestMatchers(HttpMethod.POST,"/api/volunteer").permitAll()
                        .requestMatchers(HttpMethod.GET,"/api/volunteer/all").permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}