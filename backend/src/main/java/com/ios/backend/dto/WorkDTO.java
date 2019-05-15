package com.ios.backend.dto;

public class WorkDTO {

  String work;

  public WorkDTO(String work) {
    this.work = work;
  }

  public WorkDTO() {}

  public String getWork() {
    return work;
  }

  public void setWork(String work) {
    this.work = work;
  }
}
