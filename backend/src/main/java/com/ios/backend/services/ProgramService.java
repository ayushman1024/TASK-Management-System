package com.ios.backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ios.backend.dto.NewProgramDTO;
import com.ios.backend.dto.ProgramListDTO;
import com.ios.backend.entities.Invites;
import com.ios.backend.entities.Program;
import com.ios.backend.entities.User;
import com.ios.backend.repositories.InvitesRepository;
import com.ios.backend.repositories.PasscodeRepository;
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
  @Autowired
  private PasscodeRepository passcodeRepository;
  @Autowired
  private InvitesRepository invitesRepository;
  @Autowired
  private MailService mailService;
  
  public boolean addUser(long uid, String code) {
    boolean invited = false;
    User user = userRepository.findById(uid).get();
    Long pidv = passcodeRepository.getPidByCode(code);
    if(! Objects.isNull(pidv)) {
      long pid = pidv.longValue();
      boolean ifInvited = invitesRepository.existsByUid(uid);
      long invitedPid = invitesRepository.findByUid(uid).getPid();

      if( ifInvited && pid == invitedPid) {
        invited = true;
        Program p = programRepository.findById(pid).get();
        List<User> users = p.getUsers();
        users.add(user);
        p.setUsers(users);
        programRepository.save(p);
      } else {
        invited = false;
      }
    } else {
      invited = false;
    }
    return invited;
  }

  public long createProgram(NewProgramDTO newProgramDto, long admin) {
    Program program = new Program();
    program.setId(newProgramDto.getId());
    program.setName(newProgramDto.getName());
    program.setDescription(newProgramDto.getDescription());
    program.setAdmin(admin);
    Program savedProgram = programRepository.save(program);

    String code = mailService.generatePasscodeForProgram(savedProgram.getId());
    long[] users = newProgramDto.getUsers();
    inviteUsers(users, code, savedProgram.getId());
    
    return savedProgram.getId();
  }
  
  public void inviteUsers(long[] users, String code, long pid) {
    
    for( long uid: users) {
      String email = userRepository.findById(uid).get().getEmail();
      mailService.sendPasscode(email, code, programRepository.findById(pid).get());
      Invites invites = new Invites();
      invites.setPid(pid);
      invites.setUid(uid);
      invitesRepository.save(invites);
    }
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
