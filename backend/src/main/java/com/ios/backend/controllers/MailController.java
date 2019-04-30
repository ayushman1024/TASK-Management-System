package com.ios.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MailController {
  
  @Autowired
  JavaMailSender mailSender;
}
