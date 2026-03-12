package group3.tgif_backend.Controller;

import group3.tgif_backend.Services.VolunteerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class VolunteerController {

    @Autowired
    private VolunteerService volunteerService;

    private VolunteerService volunteerServices = new VolunteerService();
}
