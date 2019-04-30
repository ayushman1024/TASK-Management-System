package com.ios.backend.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ios.backend.entities.Trainee;
import com.ios.backend.repositories.MentorRepository;
import com.ios.backend.repositories.ProgramRepository;
import com.ios.backend.repositories.TaskRecordRepository;
import com.ios.backend.repositories.TaskRespository;
import com.ios.backend.repositories.TraineeRepository;
@Service
public class TraineeService {
  
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
    
    public void createTrainee(Trainee trainee) {
      traineeRepository.save(trainee);
    }
    
    public List<Trainee> getAllTrainee() {
      return (List<Trainee>) traineeRepository.findAll();
    }
    
    public List<Trainee> getAllTraineeByProgram(long programId) {
      return programRepository.findById(programId).get().getTrainees();
    }
    
    public Trainee getTrainee(long id) {
      return traineeRepository.findById(id).get();
    }
}
