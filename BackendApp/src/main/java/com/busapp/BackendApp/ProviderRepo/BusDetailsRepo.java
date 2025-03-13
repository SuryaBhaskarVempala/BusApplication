package com.busapp.BackendApp.ProviderRepo;

import com.busapp.BackendApp.Model.BusDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BusDetailsRepo extends JpaRepository<BusDetails,String> {

    @Query(value = "SELECT * FROM bus_details WHERE bus_number = :busNumber", nativeQuery = true)
    BusDetails findByBusNumber(@Param("busNumber") String busNumber);
}
