package com.boxinator.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.boxinator.backend.model.Box;

public interface BoxRepository extends JpaRepository<Box,Integer>{

}
