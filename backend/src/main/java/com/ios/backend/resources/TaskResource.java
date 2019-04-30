package com.ios.backend.resources;

import java.time.LocalDateTime;
import java.util.List;

import com.ios.backend.entities.Trainee;

public class TaskResource {
  private long id;
  private long programId;
  private String name;
  private long createdBy;
  private LocalDateTime createdTime;
  private LocalDateTime deadline;
  private long modifiedBy;
  private LocalDateTime modifiedTime;
  private String status;
  private String description;
  private List<Trainee> assignedTo;

  public long getId() {
    return id;
  }

  public long getProgramId() {
    return programId;
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

  public List<Trainee> getAssignedTo() {
    return assignedTo;
  }

  public void setId(long id) {
    this.id = id;
  }

  public void setProgramId(long programId) {
    this.programId = programId;
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

  public void setAssignedTo(List<Trainee> assignedTo) {
    this.assignedTo = assignedTo;
  }
}
