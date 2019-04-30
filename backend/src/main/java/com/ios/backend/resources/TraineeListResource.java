package com.ios.backend.resources;

import java.util.List;

import com.ios.backend.entities.Trainee;

public class TraineeListResource {

  private List<Trainee> traineeList;

  public List<Trainee> getTraineeList() {
    return traineeList;
  }

  public void setTraineeList(List<Trainee> traineeList) {
    this.traineeList = traineeList;
  }
}
