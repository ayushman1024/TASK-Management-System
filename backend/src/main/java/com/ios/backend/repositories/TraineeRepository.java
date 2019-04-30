package com.ios.backend.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.ios.backend.entities.Trainee;

@Repository
public interface TraineeRepository extends CrudRepository<Trainee, Long>  {
}
