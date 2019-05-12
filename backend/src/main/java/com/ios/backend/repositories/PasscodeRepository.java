package com.ios.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.ios.backend.entities.Passcode;

@Repository
public interface PasscodeRepository extends JpaRepository<Passcode, Long> {

  @Query("SELECT p.pid FROM Passcode p WHERE p.code=:code")
  long getPidByCode(@Param("code") String code);
}
