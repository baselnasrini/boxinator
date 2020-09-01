package com.boxinator.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.boxinator.backend.controller.MyDBInitialization;

@EnableJpaRepositories(basePackages="com.boxinator.backend.repository")
@SpringBootApplication
public class LuncherClass {

	public static void main(String[] args) {
		MyDBInitialization dbInit = new MyDBInitialization("root", "mysqlpass", "boxinator", "localhost", "3306" );
		dbInit.createDB();
		dbInit.closeConnection();

		SpringApplication.run(LuncherClass.class, args);
	}

}
