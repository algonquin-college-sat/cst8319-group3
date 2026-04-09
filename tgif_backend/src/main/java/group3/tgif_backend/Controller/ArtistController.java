package group3.tgif_backend.Controller;


import group3.tgif_backend.DTO.ArtistDTO;
import group3.tgif_backend.Model.Artist;
import group3.tgif_backend.Services.ArtistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/artist")
@CrossOrigin
public class ArtistController {

    @Autowired
    ArtistService artistService;


    @GetMapping()
    public List<Artist> getList(){
        return artistService.getList();
    }

    @PostMapping()
    public Artist create(@RequestBody ArtistDTO dto){
        return artistService.create(dto);
    }

}
