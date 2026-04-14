package group3.tgif_backend.Services;


import group3.tgif_backend.DTO.SponsorDTO;
import group3.tgif_backend.Model.Sponsor;
import group3.tgif_backend.Repository.SponsorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class SponsorService {
    @Autowired
    private SponsorRepository sponsorRepository;

    public List<Sponsor> getAll(){
       return sponsorRepository.findAll();
    }


    public Sponsor createUser(@RequestBody SponsorDTO sponsorDTO){
        Sponsor sponsor = Sponsor.builder()
                .name(sponsorDTO.getName())
                .type(sponsorDTO.getType())
                .descEn(sponsorDTO.getDescEn())
                .descFr(sponsorDTO.getDecFr())
                .imageUrl(sponsorDTO.getImageUrl())
                .build();

        return sponsorRepository.save(sponsor);

    }


    public void deleteById(Long id) {
        sponsorRepository.deleteById(id);
    }
}
