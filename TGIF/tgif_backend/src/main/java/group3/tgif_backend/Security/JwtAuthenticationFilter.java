package group3.tgif_backend.Security;

import group3.tgif_backend.Model.User;
import group3.tgif_backend.Services.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;
    private final UserService userService;

    public JwtAuthenticationFilter(@Lazy UserService userService) {
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String path = request.getRequestURI();

        // ✅ Bypass public endpoints
        if (path.startsWith("/api/auth") || (path.equals("/api/users/profile") && request.getMethod().equals("POST"))) {
            filterChain.doFilter(request, response);
            return;
        }

        String header = request.getHeader("Authorization");

        if (header != null && header.startsWith("Bearer ")) {

            String token = header.substring(7);

            if (jwtUtil.validateToken(token)) {

                String userId = jwtUtil.extractUserId(token);

                User user = userService.getUserProfile(userId).orElse(null);

                if (user != null) {
                    request.setAttribute("currentUser", user);
                    request.setAttribute("currentUserId", user.getId());
                }
            }
        }

        filterChain.doFilter(request, response);
    }
}