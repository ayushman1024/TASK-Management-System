package com.ios.backend.controllers;

import org.springframework.beans.BeanUtils;
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

import com.ios.backend.dto.TraineeDTO;
import com.ios.backend.entities.Trainee;
import com.ios.backend.resources.TraineeListResource;
import com.ios.backend.resources.TraineeResource;
import com.ios.backend.services.TraineeService;
import com.ios.backend.utils.Client;

@RestController
public class TraineeController {

  final String clientUrl = Client.clientUrl;

  @Autowired
  private TraineeService service;

  @PostMapping("/createTrainee")
  @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
  @CrossOrigin(origins = clientUrl)
  public ResponseEntity<Boolean> createTrainee(@RequestBody TraineeDTO newTraineeDto) {
    Trainee trainee = new Trainee();
    BeanUtils.copyProperties(newTraineeDto, trainee);
    service.createTrainee(trainee);
    return new ResponseEntity<Boolean>(HttpStatus.OK);
  }

  @GetMapping("/getAllTrainee")
  @CrossOrigin(origins = clientUrl)
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<TraineeListResource> getAllTrainee() {
    TraineeListResource tlr = new TraineeListResource();
    tlr.setTraineeList(service.getAllTrainee());
    return new ResponseEntity<TraineeListResource>(tlr, HttpStatus.OK);
  }

  @GetMapping("/getAllTrainee/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  @CrossOrigin(origins = clientUrl)
  public ResponseEntity<TraineeListResource> getAllTrainee(@PathVariable("id") Long id) {
    TraineeListResource tlr = new TraineeListResource();
    tlr.setTraineeList(service.getAllTraineeByProgram(id));
    return new ResponseEntity<TraineeListResource>(tlr, HttpStatus.OK);
  }
  @GetMapping("/getTrainee/{id}")
  @CrossOrigin(origins = clientUrl)
  @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
  public ResponseEntity<TraineeResource> getTraineeById(@PathVariable("id") Long id) {
    TraineeResource tr = new TraineeResource();
    BeanUtils.copyProperties(service.getTrainee(id), tr);
    return new ResponseEntity<TraineeResource>(tr, HttpStatus.OK);
  }
}
