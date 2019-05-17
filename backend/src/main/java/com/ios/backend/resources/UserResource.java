package com.ios.backend.resources;

import com.ios.backend.entities.User;

public class UserResource {
  private long id;

  private String name;

  private String username;

  private String email;

  public UserResource() {}

  public UserResource(User user) {
    this.id = user.getId();
    this.name= user.getName();
    this.username = user.getUsername();
    this.email = user.getEmail();
  }

  public Long getId() {
      return id;
  }

  public void setId(long id) {
      this.id = id;
  }

  public String getUsername() {
      return username;
  }

  public void setUsername(String username) {
      this.username = username;
  }

  public String getName() {
      return name;
  }

  public void setName(String name) {
      this.name = name;
  }

  public String getEmail() {
      return email;
  }

  public void setEmail(String email) {
      this.email = email;
  }
}
