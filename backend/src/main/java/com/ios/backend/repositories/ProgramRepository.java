package com.ios.backend.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.ios.backend.entities.Program;
import com.ios.backend.entities.Task;

@Repository
public interface ProgramRepository extends CrudRepository<Program, Long> {

  List<Program> findByAdmin(long admin);
}