package com.ios.backend.dto;

public class NewTaskDTO {
  private TaskDTO task;
  private long[] user;

  public TaskDTO getTask() {
    return task;
  }

  public void setTask(TaskDTO task) {
    this.task = task;
  }

  public long[] getUser() {
    return user;
  }

  public void setTrainee(long[] user) {
    this.user = user;
  }
}