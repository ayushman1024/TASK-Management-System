package com.ios.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ios.backend.entities.Task;

@Repository
public interface TaskRespository extends CrudRepository<Task, Long> {

  @Query("SELECT t.task FROM TaskRecord t WHERE t.trainee=:id")
  List<Task> getTaskByTrainee(@Param("id") long id);
  
  List<Task> findByProgramId(long programId);
}
