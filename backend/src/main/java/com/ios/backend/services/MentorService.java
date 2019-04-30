package com.ios.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ios.backend.dto.LoginDTO;
import com.ios.backend.entities.Mentor;
import com.ios.backend.repositories.MentorRepository;
import com.ios.backend.repositories.ProgramRepository;
import com.ios.backend.repositories.TaskRecordRepository;
import com.ios.backend.repositories.TaskRespository;
import com.ios.backend.repositories.TraineeRepository;
import com.ios.backend.utils.AuthUtils;

@Service
public class MentorService {
  @Autowired
  private TaskRespository taskRepository;
  @Autowired
  private TraineeRepository traineeRepository;
  @Autowired
  private MentorRepository mentorRepository;
  @Autowired
  private TaskRecordRepository taskRecordRepository;
  @Autowired
  private ProgramRepository programRepository;
  
  
  
  public void createMentor(Mentor mentor) {
    Mentor savedMentor = null;
    if(AuthUtils.validatePassword(mentor.getPassword())) {
      savedMentor = this.mentorRepository.save(mentor);
    }
    if(savedMentor.getIsAdmin().equals("Y") || savedMentor.getIsAdmin().equals("y")) {
      // TODO
    }
  }
  
  public boolean login(LoginDTO loginInfo) {
    String searchedPassword = mentorRepository.findPasswordByUsername(loginInfo.getUsername());
    if(searchedPassword== null){
      return false;
    }else if(searchedPassword.equals(loginInfo.getPassword()) ){
      return true;
    }
    return false;
  }
  
  public List<Mentor> getAllMentorByProgram(long programId){
    return this.mentorRepository.findByProgram(programId);
  }
  
  public List<Mentor> getAllMentor() {
    return (List<Mentor>)this.mentorRepository.findAll();
  }
}
