package com.ios.backend.resources;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

public class TaskResource {
  private long id;
  private long program;
  private String name;
  private long createdBy;
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
  private LocalDateTime createdTime;
  
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
  private LocalDateTime startTime;
  
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
  private LocalDateTime deadline;
  
  private long modifiedBy;

  @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
  private LocalDateTime modifiedTime;
  private String status;

  private String description;
  
  public long getId() {
    return id;
  }

  public long getProgram() {
    return program;
  }

  public String getName() {
    return name;
  }

  public long getCreatedBy() {
    return createdBy;
  }

  public LocalDateTime getCreatedTime() {
    return createdTime;
  }
  
  public LocalDateTime getStartTime() {
    return startTime;
  }
  
  public LocalDateTime getDeadline() {
    return deadline;
  }

  public long getModifiedBy() {
    return modifiedBy;
  }

  public LocalDateTime getModifiedTime() {
    return modifiedTime;
  }

  public String getStatus() {
    return status;
  }

  public String getDescription() {
    return description;
  }

  public void setId(long id) {
    this.id = id;
  }

  public void setProgram(long program) {
    this.program = program;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setCreatedBy(long createdBy) {
    this.createdBy = createdBy;
  }

  public void setCreatedTime(LocalDateTime createdTime) {
    this.createdTime = createdTime;
  }

  public void setStartTime(LocalDateTime startTime) {
    this.startTime = startTime;
  }

  public void setDeadline(LocalDateTime deadline) {
    this.deadline = deadline;
  }

  public void setModifiedBy(long modifiedBy) {
    this.modifiedBy = modifiedBy;
  }

  public void setModifiedTime(LocalDateTime modifiedTime) {
    this.modifiedTime = modifiedTime;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public void setDescription(String description) {
    this.description = description;
  }
}
