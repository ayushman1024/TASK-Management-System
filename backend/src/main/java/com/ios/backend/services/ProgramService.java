package com.ios.backend.services;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ios.backend.dto.NewProgramDTO;
import com.ios.backend.dto.ProgramListDTO;
import com.ios.backend.entities.Mentor;
import com.ios.backend.entities.Program;
import com.ios.backend.entities.Trainee;
import com.ios.backend.repositories.MentorRepository;
import com.ios.backend.repositories.ProgramRepository;
import com.ios.backend.repositories.TaskRecordRepository;
import com.ios.backend.repositories.TaskRespository;
import com.ios.backend.repositories.TraineeRepository;

@Service
public class ProgramService {

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
  
  public void addTrainee(Program program, long[] traineeIdList) {
    List<Trainee> trainees = new ArrayList<Trainee>();
    for(long id: traineeIdList) {
      Trainee t = traineeRepository.findById(id).get();
      if(t != null) {
        trainees.add(t);
      }
    }
    program.setTrainees(trainees);
  }

  public void addMentor(Program program, long[] mentorIdList) {
    List<Mentor> mentors = new ArrayList<Mentor>();
    for(long id: mentorIdList) {
      Mentor t = mentorRepository.findById(id).get();
      if(t != null) {
        mentors.add(t);
      }
    }
    program.setMentors(mentors);
  }

  public void createProgram(NewProgramDTO newProgramDto) {
    Program program = new Program();
    program.setId(newProgramDto.getId());
    program.setName(newProgramDto.getName());
    program.setDescription(newProgramDto.getDescription());
    addMentor(program, newProgramDto.getMentors());
    addTrainee(program, newProgramDto.getTrainees());
    Program savedProgram = programRepository.save(program);
  }
  
  public ProgramListDTO getAll() {
    ProgramListDTO list = new ProgramListDTO();
    list.setProgramList((List<Program>)programRepository.findAll());
    return list;
  }
}
