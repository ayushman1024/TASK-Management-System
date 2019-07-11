package com.ios.backend.utils;

import org.apache.commons.lang3.RandomStringUtils;

public class AuthUtils {

	public static boolean validatePassword(String password) {
		if (password != null && password.matches("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$")) {
			return true;
		}
		return false;
	}

	public static String OTP(int len) {
	  // RandomStringUtils.random(len, "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
	  String numbers = "0123456789#$&*!";
	  String alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return RandomStringUtils.random(8, numbers+alpha);
  }
}
