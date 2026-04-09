package group3.tgif_backend.Model;

import jakarta.persistence.*;
import jakarta.persistence.MappedSuperclass;
import lombok.*;

@MappedSuperclass
@Getter @Setter
public abstract class BaseModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id; //

    @Column(name = "created_at", updatable = false)
    private java.time.ZonedDateTime createdAt; //

    @Column(name = "updated_at")
    private java.time.ZonedDateTime updatedAt; //
}