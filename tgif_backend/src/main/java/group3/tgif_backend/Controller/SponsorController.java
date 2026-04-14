package group3.tgif_backend.Controller;

import group3.tgif_backend.DTO.SponsorDTO;
import group3.tgif_backend.Model.Sponsor;
import group3.tgif_backend.Services.SponsorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sponsor")
@CrossOrigin
public class SponsorController {
    @Autowired
    private SponsorService sponsorService;


    @GetMapping()
    public List<Sponsor> getAll(){
        return sponsorService.getAll();
    }

    @PostMapping()
    public Sponsor create(@RequestBody SponsorDTO sponsorDTO){
        return sponsorService.createUser(sponsorDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSponsor(@PathVariable Long id) {
        System.out.println(id);
        sponsorService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
