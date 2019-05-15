package com.ios.backend.resources;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

public class CalendarResource {

  private String title;

  @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
  private LocalDateTime start;

  @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
  private LocalDateTime end;

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public LocalDateTime getStart() {
    return start;
  }

  public void setStart(LocalDateTime start) {
    this.start = start;
  }

  public LocalDateTime getEnd() {
    return end;
  }

  public void setEnd(LocalDateTime end) {
    this.end = end;
  }
  
}
