package group3.tgif_backend.Services;

import group3.tgif_backend.DTO.ArtistDTO;
import group3.tgif_backend.Model.Artist;
import group3.tgif_backend.Model.Event;
import group3.tgif_backend.Repository.ArtistRepository;
import group3.tgif_backend.Repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;



@Service
@RequiredArgsConstructor
public class ArtistService {

    private final ArtistRepository artistRepository;
    private final EventRepository eventRepository;

    public List<Artist> getList (){
        return artistRepository.findAll();
    }

    public Artist create(ArtistDTO dto){
        Event event = eventRepository.findById(dto.getEventId())
                .orElseThrow(() -> new RuntimeException("Event not found"));

        Artist artist = Artist.builder()
                .name(dto.getName())
                .titleEn(dto.getTitleEn())
                .titleFr(dto.getTitleFr())
                .bioEn(dto.getBioEn())
                .bioFr(dto.getBioFr())
                .imageUrl(dto.getImageUrl())
                .event(event)
                .socialLink(dto.getSocialLink())
                .build();
         return artistRepository.save(artist);
    }
}
