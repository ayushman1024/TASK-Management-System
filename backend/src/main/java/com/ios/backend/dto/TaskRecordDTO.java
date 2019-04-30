package com.ios.backend.dto;

public class TaskRecordDTO {
  private long id;
  private long traineeId;
  private long taskId;
  private String status;
  private double score;
  private double max;
  private String remarks;
  public long getId() {
    return id;
  }
  public long getTraineeId() {
    return traineeId;
  }
  public long getTaskId() {
    return taskId;
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
  public void setId(long id) {
    this.id = id;
  }
  public void setTraineeId(long traineeId) {
    this.traineeId = traineeId;
  }
  public void setTaskId(long taskId) {
    this.taskId = taskId;
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
}
