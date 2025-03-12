package com.busapp.BackendApp.Controller;//package com.busapp.BackendApp.Controller;

import com.busapp.BackendApp.Modules.Uploads;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@CrossOrigin
public class Home {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Autowired
    private Uploads uploads;

    @PostMapping("/insert")
    @CrossOrigin
    public void upload(
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam("phone") String phone,
            @RequestParam("busNumber") List<String> busNumbers,
            @RequestPart("busImage") List<MultipartFile> busImages,
            @RequestPart("busRC") List<MultipartFile> busRCs,
            @RequestPart("busInsurance") List<MultipartFile> busInsurances) {

        System.out.println("Email: " + email);
        System.out.println("Password: " + password);
        System.out.println("Phone: " + phone);

        // Create the upload directory if it doesn't exist
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            try {
                Files.createDirectories(uploadPath);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        for (int i = 0; i < busNumbers.size(); i++) {
            System.out.println("Bus Number: " + busNumbers.get(i));
            uploads.saveFile(busImages.get(i), uploads.generateFileName(busNumbers.get(i),email, busImages.get(i),"BusImage"));
            uploads.saveFile(busRCs.get(i), uploads.generateFileName(busNumbers.get(i),email, busRCs.get(i),"BusRc"));
            uploads.saveFile(busInsurances.get(i), uploads.generateFileName(busNumbers.get(i),email, busInsurances.get(i),"BusINsurance"));
        }
    }
}