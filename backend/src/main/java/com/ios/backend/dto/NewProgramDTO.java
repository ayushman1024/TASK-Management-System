package com.ios.backend.dto;

public class NewProgramDTO {
  private long id;
  private String name;
  private String description;
  private long[] mentors;
  private long[] trainees;
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
  public long[] getMentors() {
    return mentors;
  }
  public void setMentors(long[] mentors) {
    this.mentors = mentors;
  }
  public long[] getTrainees() {
    return trainees;
  }
  public void setTrainees(long[] trainees) {
    this.trainees = trainees;
  }
  
}
