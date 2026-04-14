package group3.tgif_backend.Model;


import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Getter
@Setter
public class SocialLink {

        private String instagram;
        private String website;
        // getters & setters
}
