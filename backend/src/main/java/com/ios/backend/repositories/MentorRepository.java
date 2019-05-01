package com.ios.backend.repositories;

import java.util.List;
import java.util.Set;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ios.backend.entities.Mentor;

@Repository
public interface MentorRepository extends CrudRepository<Mentor, Long> {
  
  List<Mentor> findByProgram(long program);
  
  Mentor findByUsername(String username);
  
  String findPasswordByUsername(String username);
  
  Set<Long> findProgramById(long id);
}
