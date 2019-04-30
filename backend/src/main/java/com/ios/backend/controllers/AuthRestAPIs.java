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
import com.ios.backend.message.response.ResponseMessage;
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
public class AuthRestAPIs {

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

		return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername(), userDetails.getAuthorities()));
	}

	@PostMapping("/signup")
	@CrossOrigin(origins = clientUrl)
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpForm signUpRequest) {

    s.sendPasscode("ayushman1024@gmail.com", "Demo-Program");
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return new ResponseEntity<>(new ResponseMessage("Fail -> Username is already taken!"),
					HttpStatus.BAD_REQUEST);
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return new ResponseEntity<>(new ResponseMessage("Fail -> Email is already in use!"),
					HttpStatus.BAD_REQUEST);
		}

		// Creating user's account
		User user = new User(signUpRequest.getName(), signUpRequest.getUsername(), signUpRequest.getEmail(),
				encoder.encode(signUpRequest.getPassword()));

		Set<String> strRoles = signUpRequest.getRole();
		Set<Role> roles = new HashSet<>();

		strRoles.forEach(role -> {
			switch (role) {
			case "admin":
				Role adminRole = roleRepository.findByName(RoleName.ROLE_ADMIN)
						.orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
				roles.add(adminRole);
				break;
			case "user":
			  Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
        .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
			  roles.add(userRole);
				break;
			default:
			  Role pmRole = roleRepository.findByName(RoleName.ROLE_PUBLIC)
        .orElseThrow(() -> new RuntimeException("Fail! -> Cause: Public Role not find."));
			  roles.add(pmRole);
			}
		});

		user.setRoles(roles);
		userRepository.save(user);

		return new ResponseEntity<>(new ResponseMessage("User registered successfully!"), HttpStatus.OK);
	}
}