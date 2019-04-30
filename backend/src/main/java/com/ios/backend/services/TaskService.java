package com.ios.backend.services;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ios.backend.entities.Program;
import com.ios.backend.entities.Task;
import com.ios.backend.entities.TaskRecord;
import com.ios.backend.entities.Trainee;
import com.ios.backend.repositories.MentorRepository;
import com.ios.backend.repositories.ProgramRepository;
import com.ios.backend.repositories.TaskRecordRepository;
import com.ios.backend.repositories.TaskRespository;
import com.ios.backend.repositories.TraineeRepository;
import com.ios.backend.resources.TaskListResource;
import com.ios.backend.resources.TaskRecordListResource;

@Service
public class TaskService {
  @Autowired
  private TaskRespository taskRepository;
  @Autowired
  private TraineeRepository traineeRepository;
  @Autowired
  private MentorRepository mentorRepository;
  @Autowired
  private TaskRecordRepository taskRecordRepository;
  @Autowired
  private ProgramRepository programRepository;

  public void createTask(Task task, long[] trainees) {
    Task savedTask = taskRepository.save(task);
    this.initTaskRecords(trainees,savedTask.getId());
  }

  public void initTaskRecords(long[] trainees, long taskId) {
    // to be shifted to util
    for (long id : trainees) {
      TaskRecord taskRecord = new TaskRecord();
      taskRecord.setTrainee(id);
      taskRecord.setTask(taskId);
      taskRecordRepository.save(taskRecord);
    }
  }

  public List<Task> getTasksFromTaskRecord(List<TaskRecord> taskRecordList) {
    // to be shifted to util
    List<Task> tasks = new ArrayList<Task>();
    for (TaskRecord taskRecord : taskRecordList) {
      tasks.add(taskRepository.findById(taskRecord.getTask()).get());
    }
    return tasks;
  }
  
  public TaskListResource getAllTask() {
    List<Task> taskList = (List<Task>)taskRepository.findAll();
    TaskListResource tlr = new TaskListResource();
    tlr.setTaskList(taskList);
    return tlr;
  }
  
  public TaskRecordListResource getAllTaskRecord() {
    TaskRecordListResource trlr = new TaskRecordListResource();
    trlr.setTaskRecordList((List<TaskRecord>) taskRecordRepository.findAll());
    return trlr;
  }

  public TaskListResource getAllTaskByProgram(long pid) {
    List<Task> taskList = (List<Task>)taskRepository.findByProgramId(pid);
    TaskListResource tlr = new TaskListResource();
    tlr.setTaskList(taskList);
    return tlr;
  }

  public TaskRecordListResource getAllTaskRecordOfTrainee(long id) {
    TaskRecordListResource trlr = new TaskRecordListResource();
    List<TaskRecord> trl = taskRecordRepository.getTaskRecordByTrainee(id);
    trlr.setTaskRecordList(trl);
    return trlr;
  }
  
  public TaskListResource getAllTaskOfTrainee(long id) {
    TaskListResource tlr = new TaskListResource();
    List<Task> tl = this.getTasksFromTaskRecord(taskRecordRepository.getTaskRecordByTrainee(id));
    tlr.setTaskList(tl);
    return tlr;
  }
}
