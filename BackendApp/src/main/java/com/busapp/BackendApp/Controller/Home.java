package com.busapp.BackendApp.Controller;//package com.busapp.BackendApp.Controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin
public class Home {

    @Value("${file.upload-dir}")
    private String uploadDir;

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
            saveFile(busImages.get(i), generateFileName(busNumbers.get(i),email, busImages.get(i),"BusImage"));
            saveFile(busRCs.get(i), generateFileName(busNumbers.get(i),email, busRCs.get(i),"BusRc"));
            saveFile(busInsurances.get(i), generateFileName(busNumbers.get(i),email, busInsurances.get(i),"BusINsurance"));
        }
    }



    private String generateFileName(String busNumber,String email, MultipartFile file,String name) {
//        String currentDate = new SimpleDateFormat("yyyyMMddHHmmssSSS").format(new Date());
        String extension = getFileExtension(file);
        return busNumber + "_" + email+ "_" +name+ extension;
    }

    private String getFileExtension(MultipartFile file) {
        String originalFileName = file.getOriginalFilename();
        if (originalFileName != null) {
            return originalFileName.substring(originalFileName.lastIndexOf("."));
        }
        return ".unknown"; // Default extension if none is found
    }

    private void saveFile(MultipartFile file, String fileName) {
        try {
            File dest = new File(uploadDir + File.separator + fileName);
            file.transferTo(dest);
            System.out.println("Saved file: " + dest.getAbsolutePath());
            // Save the file URL in your database
            saveFileUrlToDatabase(dest.getAbsolutePath());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void saveFileUrlToDatabase(String fileUrl) {
        // Implement your logic to save the file URL in the database
        System.out.println("File URL saved to database: " + fileUrl);
    }
}
