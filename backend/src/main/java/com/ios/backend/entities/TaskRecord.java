package com.ios.backend.entities;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * 7 fields
 * 
 * @author Ayushman.Srivastava
 *
 */
@Entity
public class TaskRecord {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private long trainee;
  private long task;
  private String status;
  private double score;
  private double max;
  private String remarks;

  public long getId() {
    return id;
  }

  public long getTrainee() {
    return trainee;
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

  public void setId(long id) {
    this.id = id;
  }

  public void setTrainee(long trainee) {
    this.trainee = trainee;
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
}
