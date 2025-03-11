package com.busapp.BackendApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin
public class BackendAppApplication
{

	public static void main(String[] args)
	{
		SpringApplication.run(BackendAppApplication.class, args);
	}

}
