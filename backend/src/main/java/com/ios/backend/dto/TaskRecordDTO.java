package com.ios.backend.dto;

public class TaskRecordDTO {
  private long id;
  private long user;
  private long program;
  private long task;
  private String status;
  private double score;
  private double max;
  private String remarks;
  private String work;
  
  public long getProgram() {
    return program;
  }

  public void setProgram(long program) {
    this.program = program;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public long getUser() {
    return user;
  }

  public void setUser(long user) {
    this.user = user;
  }

  public long getTask() {
    return task;
  }

  public String getStatus() {
    return status;
  }

  public double getScore() {
    return score;
  }

  public double getMax() {
    return max;
  }

  public String getRemarks() {
    return remarks;
  }

  public void setTask(long task) {
    this.task = task;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public void setScore(double score) {
    this.score = score;
  }

  public void setMax(double max) {
    this.max = max;
  }

  public void setRemarks(String remarks) {
    this.remarks = remarks;
  }

  public String getWork() {
    return work;
  }

  public void setWork(String work) {
    this.work = work;
  }
  
}
