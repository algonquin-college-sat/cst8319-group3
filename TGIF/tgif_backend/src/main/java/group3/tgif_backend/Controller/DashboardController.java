package group3.tgif_backend.Controller;

import group3.tgif_backend.DTO.DashboardStats;
import group3.tgif_backend.Model.User;
import group3.tgif_backend.Services.DashboardService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping
    public DashboardStats getDashboardStats(
            @RequestAttribute("currentUser") User currentUser
    ) {

        // 🔒 Admin check
        if (!"admin".equalsIgnoreCase(currentUser.getRole())) {
            throw new RuntimeException("Admin access required");
        }

        return dashboardService.getDashboardStats();
    }
}
