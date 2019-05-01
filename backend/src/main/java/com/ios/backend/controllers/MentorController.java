package com.ios.backend.controllers;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ios.backend.dto.LoginDTO;
import com.ios.backend.dto.MentorDTO;
import com.ios.backend.dto.NewTaskDTO;
import com.ios.backend.dto.TraineeDTO;
import com.ios.backend.entities.Mentor;
import com.ios.backend.entities.Task;
import com.ios.backend.entities.Trainee;
import com.ios.backend.services.MentorService;
import com.ios.backend.utils.Client;

@RestController
public class MentorController {

  final String clientUrl = Client.clientUrl;
  
  @Autowired
  private MentorService service;
  
  @PostMapping("/createMentor")
  @CrossOrigin(origins = clientUrl)
  public ResponseEntity<Boolean> createMentor(@RequestBody MentorDTO mentorDTO) {
    Mentor mentor = new Mentor();
    BeanUtils.copyProperties(mentorDTO, mentor);
    service.createMentor(mentor);
    return new ResponseEntity<Boolean>(true,HttpStatus.OK);
  }
}
