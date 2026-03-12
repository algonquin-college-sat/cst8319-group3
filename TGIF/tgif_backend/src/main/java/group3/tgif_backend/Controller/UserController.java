package group3.tgif_backend.Controller;

import group3.tgif_backend.DTO.UpdateProfileRequest;
import group3.tgif_backend.Model.User;
import group3.tgif_backend.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    // 1:1 with @router.get("/profile")
    @GetMapping("/profile")
    public User getProfile(@RequestAttribute("currentUser") User currentUser) {
        return userService.getUserProfile(currentUser.getId())
                .orElseThrow(() -> new RuntimeException("Profile not found"));
    }

    // 1:1 with @router.put("/profile")
    @PutMapping("/profile")
    public User updateProfile(
            @RequestAttribute("currentUser") User currentUser,
            @RequestBody UpdateProfileRequest request) {
        return userService.updateUserProfile(currentUser.getId(), request.getName())
                .orElseThrow(() -> new RuntimeException("Update failed"));
    }
}
