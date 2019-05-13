package com.ios.backend.resources;

import com.ios.backend.entities.Program;

public class ProgramResource {

  private long id;
  private String name;
  private String description;
  private long admin;

  public ProgramResource(Program program) {
    this.id = program.getId();
    this.name = program.getName();
    this.description = program.getDescription();
    this.admin = program.getAdmin();
  }
  
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
  public long getAdmin() {
    return admin;
  }
  public void setAdmin(long admin) {
    this.admin = admin;
  }
  
  
}
