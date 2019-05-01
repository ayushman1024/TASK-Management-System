package com.ios.backend.services;

import java.util.List;
import java.util.Set;

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
    savedMentor = mentorRepository.save(mentor);
//    if(savedMentor.getIsAdmin().equals("Y") || savedMentor.getIsAdmin().equals("y")) {
//      // TODO
//    }
  }
  
  public List<Mentor> getAllMentorByProgram(long programId){
    return this.mentorRepository.findByProgram(programId);
  }
  
  public List<Mentor> getAllMentor() {
    return (List<Mentor>)this.mentorRepository.findAll();
  }
  
  public void addProgramToMentor(long mid,long pid) {
    Mentor mentor = mentorRepository.findById(mid).get();
    Set<Long> programSet = mentor.getProgram();
    programSet.add(pid);
    mentor.setProgram(programSet);
    mentorRepository.save(mentor);
  }
}
