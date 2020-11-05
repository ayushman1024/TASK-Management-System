package com.ios.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ios.backend.dto.CodeDTO;
import com.ios.backend.dto.NewProgramDTO;
import com.ios.backend.resources.ProgramListResource;
import com.ios.backend.services.ProgramService;
import com.ios.backend.services.UserService;
import com.ios.backend.utils.Client;

@RestController
public class ProgramController {
  final String clientUrl = Client.clientUrl;
  
  @Autowired
  private ProgramService service;
  
  @Autowired
  private UserService userService;
  
  @PostMapping("/createProgram/{uid}")
  @CrossOrigin(origins = clientUrl)
  @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
  public ResponseEntity<Boolean> createProgram(@PathVariable("uid") Long uid, @RequestBody NewProgramDTO newProgramDto) {
    service.createProgram(newProgramDto, uid);
    return new ResponseEntity<Boolean>(true,HttpStatus.OK);
  }
  
  @GetMapping("/getAllProgram")
  @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
  @CrossOrigin(origins = clientUrl)
  public ResponseEntity<ProgramListResource> getAllProgram() {
    return new ResponseEntity<ProgramListResource>(service.getAll(), HttpStatus.OK);
  }
  
  @GetMapping("/getAllProgramByAdmin/{id}")
  @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
  @CrossOrigin(origins = clientUrl)
  public ResponseEntity<ProgramListResource> getAllProgramByAdmin(@PathVariable("id") Long id) {
    ProgramListResource dto = service.getAllByAdmin(id);
    return new ResponseEntity<ProgramListResource>(dto, HttpStatus.OK);
  }
  
  @GetMapping("/getAllProgramByUser/{uid}")
  @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
  @CrossOrigin(origins = clientUrl)
  public ResponseEntity<ProgramListResource> getAllProgramByUser(@PathVariable("uid") Long uid) {
    ProgramListResource dto = new ProgramListResource();
    dto.setProgramList(userService.getAllProgramByUser(uid));
    return new ResponseEntity<ProgramListResource>(dto, HttpStatus.OK);
  }
  
  @PostMapping("/enterPrg")
  @CrossOrigin(origins = clientUrl)
  @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
  public ResponseEntity<Boolean> enterProgram(@RequestBody CodeDTO code) {
    service.addUser(code.getUid(), code.getCode());
    return new ResponseEntity<Boolean>(true,HttpStatus.OK);
  }
}
