package group3.tgif_backend.Controller;

import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:3001")

@RestController
@RequestMapping("")
public class TestController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello from Spring Boot!";

    }


    @GetMapping("/")
    public String sayhi(){
        return "Hi, guys";
    }

    @PostMapping("/echo")
    public String echogreeting(@RequestBody String username){
        return "You are highly welcome: " + username;
    }

}

