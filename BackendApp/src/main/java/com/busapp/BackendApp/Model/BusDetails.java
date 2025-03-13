package com.busapp.BackendApp.Model;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

@Entity
@Component
public class BusDetails {

    @Id
    private String busNumber;

    private String busImage;
    private String busRc;
    private String busInsurance;
    private String status;

    @ManyToOne
    @JoinColumn(name = "provider_email")
    private BusProvider busProvider;

    // Getters and Setters
    public String getBusNumber() { return busNumber; }
    public void setBusNumber(String busNumber) { this.busNumber = busNumber; }
    public String getBusImage() { return busImage; }
    public void setBusImage(String busImage) { this.busImage = busImage; }
    public String getBusRc() { return busRc; }
    public void setBusRc(String busRc) { this.busRc = busRc; }
    public String getBusInsurance() { return busInsurance; }
    public void setBusInsurance(String busInsurance) { this.busInsurance = busInsurance; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public BusProvider getBusProvider() { return busProvider; }
    public void setBusProvider(BusProvider busProvider) { this.busProvider = busProvider; }
}
