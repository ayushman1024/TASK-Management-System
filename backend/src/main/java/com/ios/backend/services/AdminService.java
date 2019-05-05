package com.ios.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ios.backend.repositories.ProgramRepository;
import com.ios.backend.repositories.TaskRecordRepository;
import com.ios.backend.repositories.TaskRespository;
import com.ios.backend.repositories.UserRepository;

@Service
public class AdminService {
  @Autowired
  private TaskRecordRepository taskRecordRepository;
  @Autowired
  private ProgramRepository programRepository;
  @Autowired
  private TaskRespository taskRepository;
  @Autowired
  private UserRepository userRepository;

}
