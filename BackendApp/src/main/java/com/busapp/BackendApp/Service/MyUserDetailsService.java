package com.busapp.BackendApp.Service;

import com.busapp.BackendApp.Model.BusProvider;
import com.busapp.BackendApp.Model.UserPrincipal;
import com.busapp.BackendApp.ProviderRepo.ProviderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private ProviderRepo repo;


    @Override
    public UserDetails loadUserByUsername(String name) {
        System.out.println("Checking user: " + name);
        BusProvider user = repo.findByEmail(name);

        if (user == null) {
            System.out.println("User not found, throwing AuthenticationException");
            throw new UsernameNotFoundException("User not found: " + name);
        }

        return new UserPrincipal(user);
    }
}
