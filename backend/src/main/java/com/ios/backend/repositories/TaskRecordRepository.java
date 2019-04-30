package com.ios.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ios.backend.entities.Task;
import com.ios.backend.entities.TaskRecord;
import com.ios.backend.entities.Trainee;

@Repository
public interface TaskRecordRepository extends CrudRepository<TaskRecord, Long> {

  @Query("SELECT t FROM TaskRecord t WHERE t.trainee=:id")
  List<TaskRecord> getTaskRecordByTrainee(@Param("id") long trainee);
}
