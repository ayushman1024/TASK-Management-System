package com.ios.backend.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ios.backend.entities.Invites;

@Repository
public interface InvitesRepository extends CrudRepository<Invites, Long>{

  Boolean existsByUid(long uid);
  
  @Query("SELECT i.pid FROM Invites i WHERE i.uid=:uid")
  long getPidByUid(@Param("uid") long uid);
  
  Invites findByUid(long uid);
  Invites findByPid(long pid);
}
