package com.ios.backend.dto;

public class NewTaskDTO {
  private TaskDTO task;
  private long[] trainee;

  public TaskDTO getTask() {
    return task;
  }

  public void setTask(TaskDTO task) {
    this.task = task;
  }

  public long[] getTrainee() {
    return trainee;
  }

  public void setTrainee(long[] trainee) {
    this.trainee = trainee;
  }
}