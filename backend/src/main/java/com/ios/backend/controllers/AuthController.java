package com.ios.backend.controllers;

import java.util.HashSet;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ios.backend.message.request.LoginForm;
import com.ios.backend.message.request.SignUpForm;
import com.ios.backend.message.response.JwtResponse;
import com.ios.backend.entities.Role;
import com.ios.backend.entities.RoleName;
import com.ios.backend.entities.User;
import com.ios.backend.repositories.RoleRepository;
import com.ios.backend.repositories.UserRepository;
import com.ios.backend.security.jwt.JwtProvider;
import com.ios.backend.services.MailService;
import com.ios.backend.utils.Client;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {

  final String clientUrl = Client.clientUrl;
  
  @Autowired
  MailService s;

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtProvider jwtProvider;

	@PostMapping("/signin")
	@CrossOrigin(origins = clientUrl)
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginForm loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);

		String jwt = jwtProvider.generateJwtToken(authentication);
		UserDetails userDetails = (UserDetails) authentication.getPrincipal();
		long id = userRepository.getIdByUsername(userDetails.getUsername());
		JwtResponse jwtRes = new JwtResponse(jwt, userDetails.getUsername(), userDetails.getAuthorities(), id);
		return ResponseEntity.ok(jwtRes);
	}

	@PostMapping("/signup")
	@CrossOrigin(origins = clientUrl)
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpForm signUpRequest) {

		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
		}

		User user = new User(signUpRequest.getName(), signUpRequest.getUsername(), signUpRequest.getEmail(),
				encoder.encode(signUpRequest.getPassword()));

		Set<Role> roles = new HashSet<>();

		if( signUpRequest.getUser().equalsIgnoreCase("U")) {
		  Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
	        .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
	        roles.add(userRole);
	    
		} else if( signUpRequest.getUser().equalsIgnoreCase("A")) {
		  Role adminRole = roleRepository.findByName(RoleName.ROLE_ADMIN)
          .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
      roles.add(adminRole);
		}

		user.setRoles(roles);
		userRepository.save(user);
		return new ResponseEntity<>(true, HttpStatus.OK);
	}
}