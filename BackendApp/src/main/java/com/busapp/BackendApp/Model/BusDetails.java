package com.busapp.BackendApp.Model;

import jakarta.persistence.Embeddable;

@Embeddable
public class BusDetails {

    private String busNumber;
    private String busImage;
    private String busRc;
    private String busInsurance;
    private String status;

    public String getBusNumber() {
        return busNumber;
    }

    public void setBusNumber(String busNumber) {
        this.busNumber = busNumber;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getBusInsurance() {
        return busInsurance;
    }

    public void setBusInsurance(String busInsurance) {
        this.busInsurance = busInsurance;
    }

    public String getBusRc() {
        return busRc;
    }

    public void setBusRc(String busRc) {
        this.busRc = busRc;
    }

    public String getBusImage() {
        return busImage;
    }

    public void setBusImage(String busImage) {
        this.busImage = busImage;
    }
}
