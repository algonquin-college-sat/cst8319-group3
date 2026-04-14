package group3.tgif_backend.Controller;

import group3.tgif_backend.DTO.UpdateProfileRequest;
import group3.tgif_backend.Model.User;
import group3.tgif_backend.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    // 🔹 Create new user
    @PostMapping("/profile")
    public User createUser(@RequestBody User user) {
        if (user.getId() == null || user.getId().isEmpty()) {
            user.setId(UUID.randomUUID().toString());
        }
        return userService.createUser(user);
    }

    // Get current user's profile
    @GetMapping("/profile")
    public User getProfile(@RequestAttribute("currentUser") User currentUser) {
        return userService.getUserProfile(currentUser.getId())
                .orElseThrow(() -> new RuntimeException("Profile not found"));
    }

    // Update current user's profile
    @PutMapping("/profile")
    public User updateProfile(
            @RequestAttribute("currentUser") User currentUser,
            @RequestBody UpdateProfileRequest request
    ) {
        return userService.updateUserProfile(currentUser.getId(), request.getName())
                .orElseThrow(() -> new RuntimeException("Update failed"));
    }

    // Get all users (admin)
    @GetMapping
    public Iterable<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Delete user by ID (admin)
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
    }
}