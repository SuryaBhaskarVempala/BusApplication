package com.busapp.BackendApp.Model;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
@Entity
@Component
public class BusProvider {

    @Id
    private String email;

    private String password;
    private String phone;

    @OneToMany(mappedBy = "busProvider", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BusDetails> busDetails;

    // Getters and Setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public List<BusDetails> getBusDetails() { return busDetails; }
    public void setBusDetails(List<BusDetails> busDetails) { this.busDetails = busDetails; }
    @Override
    public String toString() {
        return "BusProvider{" +
                "email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", phone='" + phone + '\'' +
                ", busDetails=" + busDetails +
                '}';
    }
}

