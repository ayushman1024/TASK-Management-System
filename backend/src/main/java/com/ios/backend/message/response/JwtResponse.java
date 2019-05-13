package com.ios.backend.message.response;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

public class JwtResponse {
  private String token;
  private String type = "Bearer";
  private String username;
  public long uid;
  private Collection<? extends GrantedAuthority> authorities;

  public JwtResponse(String accessToken, String username, Collection<? extends GrantedAuthority> authorities,
      long uid) {
    this.token = accessToken;
    this.username = username;
    this.authorities = authorities;
    this.uid = uid;
  }

  public String getAccessToken() {
    return token;
  }

  public void setAccessToken(String accessToken) {
    this.token = accessToken;
  }

  public String getTokenType() {
    return type;
  }

  public void setTokenType(String tokenType) {
    this.type = tokenType;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  public long getId() {
    return uid;
  }

  public void setId(long uid) {
    this.uid = uid;
  }
}