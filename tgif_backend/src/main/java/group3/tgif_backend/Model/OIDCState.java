package group3.tgif_backend.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import java.time.ZonedDateTime;

@Entity
@Table(name = "oidc_states")
@Getter @Setter
public class OIDCState {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id; // Matches Integer primary key

    @Column(name = "state", unique = true, nullable = false, length = 255)
    private String state; // Matches unique=True, index=True

    @Column(name = "nonce", nullable = false, length = 255)
    private String nonce; // Matches nullable=False

    @Column(name = "code_verifier", nullable = false, length = 255)
    private String codeVerifier; // Matches nullable=False

    @Column(name = "expires_at", nullable = false)
    private ZonedDateTime expiresAt; // Matches nullable=False

    @CreationTimestamp
    @Column(name = "created_at")
    private ZonedDateTime createdAt; // Matches server_default=func.now()
}
