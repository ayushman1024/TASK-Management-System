package com.ios.backend.resources;

import java.util.List;
import com.ios.backend.entities.User;

public class UserListResource {
  private List<User> userList;

  public List<User> getUserList() {
    return userList;
  }

  public void setUserList(List<User> userList) {
    this.userList = userList;
  }
}
