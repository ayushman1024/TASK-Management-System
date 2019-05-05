package com.ios.backend.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ios.backend.dto.NewProgramDTO;
import com.ios.backend.dto.ProgramListDTO;
import com.ios.backend.entities.Program;
import com.ios.backend.entities.User;
import com.ios.backend.repositories.ProgramRepository;
import com.ios.backend.repositories.TaskRecordRepository;
import com.ios.backend.repositories.TaskRespository;
import com.ios.backend.repositories.UserRepository;

@Service
public class ProgramService {

  @Autowired
  private TaskRespository taskRepository;
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private TaskRecordRepository taskRecordRepository;
  @Autowired
  private ProgramRepository programRepository;
  
  public void addUser(Program program, long[] userIdList) {
    List<User> users = new ArrayList<User>();
    for(long id: userIdList) {
      User u = userRepository.findById(id).get();
      if(u != null) {
        users.add(u);
      }
    }
    program.setUsers(users);
  }

  public void createProgram(NewProgramDTO newProgramDto, long mid) {
    Program program = new Program();
    program.setId(newProgramDto.getId());
    program.setName(newProgramDto.getName());
    program.setDescription(newProgramDto.getDescription());
    addUser(program, newProgramDto.getUsers());
    Program savedProgram = programRepository.save(program);
  }
  
  public ProgramListDTO getAll() {
    ProgramListDTO list = new ProgramListDTO();
    list.setProgramList((List<Program>)programRepository.findAll());
    return list;
  }
  
  public ProgramListDTO getAllByAdmin(long id) {
    ProgramListDTO listDTO = new ProgramListDTO();
    listDTO.setProgramList(programRepository.findByAdmin(id));
    return listDTO;
  }
}
