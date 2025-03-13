package com.busapp.BackendApp.ProviderRepo;

import com.busapp.BackendApp.Model.BusProvider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

@Repository
public interface ProviderRepo extends JpaRepository<BusProvider,String> {

    BusProvider findByEmail(String name);


    @Query(value = "SELECT * FROM bus_provider WHERE email = :email AND phone = :phone", nativeQuery = true)
    BusProvider findByEmailAndPhone(@Param("email") String email, @Param("phone") String phone);

}
