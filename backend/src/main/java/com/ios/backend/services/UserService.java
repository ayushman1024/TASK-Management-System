package com.ios.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ios.backend.entities.Program;
import com.ios.backend.entities.User;
import com.ios.backend.repositories.ProgramRepository;
import com.ios.backend.repositories.TaskRecordRepository;
import com.ios.backend.repositories.TaskRespository;
import com.ios.backend.repositories.UserRepository;

@Service
public class UserService {

  @Autowired
  private TaskRecordRepository taskRecordRepository;
  @Autowired
  private ProgramRepository programRepository;
  @Autowired
  private TaskRespository taskRepository;
  @Autowired
  private UserRepository userRepository;
 
  public List<User> getAllUser() {
    return (List<User>) userRepository.findAll();
  }
  
  public List<User> getAllUserByProgram(long programId) {
    return programRepository.findById(programId).get().getUsers();
  }
  
  public List<Program> getAllProgramByUser(long uid) {
    return userRepository.findProgramById(uid);
  }
  
  public User getUser(long id) {
    return userRepository.findById(id).get();
  }
}
