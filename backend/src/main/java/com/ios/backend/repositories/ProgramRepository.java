package com.ios.backend.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.ios.backend.entities.Program;

@Repository
public interface ProgramRepository extends CrudRepository<Program, Long> {

}