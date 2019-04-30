package com.ios.backend.dto;

import java.util.List;
import com.ios.backend.entities.Mentor;
import com.ios.backend.entities.Trainee;

public class ProgramDTO {
  
  private long id;
  private String name;
  private String description;
  private List<Mentor> mentors;
  private List<Trainee> trainees;
  
  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public List<Mentor> getMentors() {
    return mentors;
  }

  public void setMentors(List<Mentor> mentors) {
    this.mentors = mentors;
  }

  public List<Trainee> getTrainees() {
    return trainees;
  }

  public void setTrainees(List<Trainee> trainees) {
    this.trainees = trainees;
  }
}
