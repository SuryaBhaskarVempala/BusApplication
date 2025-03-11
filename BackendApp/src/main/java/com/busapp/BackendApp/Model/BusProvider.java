package com.busapp.BackendApp.Model;

import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.util.List;

@Entity
public class BusProvider {

    @Id
    private String email;
    private String password;
    private String phone;
    @Embedded
    private List<BusDetails> busDetails;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<BusDetails> getBusDetails() {
        return busDetails;
    }

    public void setBusDetails(List<BusDetails> busDetails) {
        this.busDetails = busDetails;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
