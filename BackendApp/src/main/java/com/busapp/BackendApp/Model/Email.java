package com.busapp.BackendApp.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Email {
    @Id
    private  String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
