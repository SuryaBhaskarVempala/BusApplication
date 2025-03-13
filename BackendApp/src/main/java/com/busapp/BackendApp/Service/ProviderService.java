package com.busapp.BackendApp.Service;

import com.busapp.BackendApp.Model.BusDetails;
import com.busapp.BackendApp.Model.BusProvider;
import com.busapp.BackendApp.ProviderRepo.BusDetailsRepo;
import com.busapp.BackendApp.ProviderRepo.ProviderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProviderService {

    @Autowired
    private ProviderRepo  repo;

    @Autowired
    private BusDetailsRepo detailsRepo;

    public boolean register(BusProvider busProvider) {
        BusProvider check = repo.save(busProvider);
        if(check != null)
            return true;
        System.out.println(check);
        return false;
    }

    public boolean checkBusNumber(String busDetails){
        BusDetails check_val = detailsRepo.findByBusNumber(busDetails);
        if(check_val != null)
            return true;
        return false;
    }

    public boolean emailPhoneCheck(String email, String phone) {
        BusProvider val = repo.findByEmailAndPhone(email,phone);
        if(val != null)
            return true;
        return false;


    }
}
