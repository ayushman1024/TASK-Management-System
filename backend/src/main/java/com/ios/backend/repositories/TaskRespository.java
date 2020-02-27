package com.ios.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ios.backend.entities.Task;

@Repository
public interface TaskRespository extends JpaRepository<Task, Long> {
  List<Task> findByProgram(long program);
}
