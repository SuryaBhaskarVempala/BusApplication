package com.busapp.BackendApp.Modules;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Component
public class Uploads {

    @Value("${file.upload-dir}")
    public  String uploadDir;

    public String generateFileName(String busNumber, String email, MultipartFile file, String name) {
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

    public void saveFile(MultipartFile file, String fileName) {
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

