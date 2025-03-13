package com.busapp.BackendApp.Controller;//package com.busapp.BackendApp.Controller;


import com.busapp.BackendApp.Model.BusDetails;
import com.busapp.BackendApp.Model.BusProvider;
import com.busapp.BackendApp.Modules.Uploads;
import com.busapp.BackendApp.Service.ProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Controller
public class Home {


    @Value("${file.upload-dir}")
    private String uploadDir;

    @Autowired
    private Uploads uploads;

    @Autowired
    private ProviderService service;

    @GetMapping("/login")
    public String login(@RequestParam(value = "error", required = false) String error,Model m){
        m.addAttribute("error",error);
        return "login";
    }

    @GetMapping("/signup")
    public String signup(@RequestParam(value = "error", required = false) String error,Model m){
        m.addAttribute("error",error);
        return "signup";
    }

    @PostMapping("/signup")
    public String upload(
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam("phone") String phone,
            @RequestParam("busNumber") List<String> busNumbers,
            @RequestPart("busImage") List<MultipartFile> busImages,
            @RequestPart("busRC") List<MultipartFile> busRCs,
            @RequestPart("busInsurance") List<MultipartFile> busInsurances, Model model) throws Exception {

        BusProvider busProvider = new BusProvider();

        System.out.println("Email: " + email);
        System.out.println("Password: " + password);
        System.out.println("Phone: " + phone);


        if(service.emailPhoneCheck(email,phone)){
            System.out.println("not sucess");
            return "redirect:/signup?error=Email OR Phone Already Exists!";
        }

        // Create the upload directory if it doesn't exist
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            try {
                Files.createDirectories(uploadPath);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(10);

        busProvider.setEmail(email);
        busProvider.setPassword(bCryptPasswordEncoder.encode(password));
        busProvider.setPhone(phone);

        List<BusDetails> busDetails_List = new ArrayList<>();

        //DB LEVEL
        for(int i = 0; i < busNumbers.size(); i++) {
            System.out.println("busNumber Checking..."+busNumbers.get(i));
            if(service.checkBusNumber(busNumbers.get(i))){
                String value = "Bus is already Exists";
                System.out.println("Bus is already Registered.");
                return "redirect:/signup?error="+value;
            }
        }


        for (int i = 0; i < busNumbers.size(); i++) {
            BusDetails busDetails = new BusDetails();
            busDetails.setBusNumber(busNumbers.get(i));

            busDetails.setBusImage(uploads.generateFileName(busNumbers.get(i),email, busImages.get(i),"BusImage"));
            busDetails.setBusRc(uploads.generateFileName(busNumbers.get(i),email, busRCs.get(i),"BusRc"));
            busDetails.setBusInsurance(uploads.generateFileName(busNumbers.get(i),email, busInsurances.get(i),"BusINsurance"));
            busDetails.setStatus("N");
            busDetails.setBusProvider(busProvider);

            System.out.println("Bus Number: " + busNumbers.get(i));
            uploads.saveFile(busImages.get(i), uploads.generateFileName(busNumbers.get(i),email, busImages.get(i),"BusImage"));
            uploads.saveFile(busRCs.get(i), uploads.generateFileName(busNumbers.get(i),email, busRCs.get(i),"BusRc"));
            uploads.saveFile(busInsurances.get(i), uploads.generateFileName(busNumbers.get(i),email, busInsurances.get(i),"BusINsurance"));

            busDetails_List.add(busDetails);
        }

        busProvider.setBusDetails(busDetails_List);


        if(service.register(busProvider)){
            String value = "Provider Successfully Registered Please Login!";
            System.out.println("Bus is already Registered.");
            return "redirect:/login?error="+value;
        }
        else{
            System.out.println("not sucess");
            return "redirect:/signup?error=Provider Not Successfully Registered";
        }

    }

    @GetMapping("/")
    public Integer home(){
        return 10;
    }
}