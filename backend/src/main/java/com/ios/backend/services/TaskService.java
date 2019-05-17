package com.ios.backend.services;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ios.backend.dto.WorkDTO;
import com.ios.backend.entities.Task;
import com.ios.backend.entities.TaskRecord;
import com.ios.backend.repositories.TaskRecordRepository;
import com.ios.backend.repositories.TaskRespository;
import com.ios.backend.resources.TaskListResource;
import com.ios.backend.resources.TaskRecordListResource;

@Service
public class TaskService {
  @Autowired
  private TaskRespository taskRepository;
  @Autowired
  private TaskRecordRepository taskRecordRepository;

  public void createTask(Task task, long[] trainees) {
    Task savedTask = taskRepository.save(task);
    long program = savedTask.getProgram();
    this.initTaskRecords(trainees,savedTask.getId(), program);
  }

  public void initTaskRecords(long[] trainees, long taskId, long program) {
    // to be shifted to util
    for (long id : trainees) {
      TaskRecord taskRecord = new TaskRecord();
      taskRecord.setUser(id);
      taskRecord.setTask(taskId);
      taskRecord.setProgram(program);
      taskRecord.setWork("NO WORK DONE YET !!");
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
    List<Task> taskList = (List<Task>)taskRepository.findByProgram(pid);
    TaskListResource tlr = new TaskListResource();
    tlr.setTaskList(taskList);
    return tlr;
  }

  public TaskRecordListResource getAllTaskRecordOfUserAndProgram(long uid, long pid) {
    TaskRecordListResource trlr = new TaskRecordListResource();
    List<TaskRecord> trl = taskRecordRepository.findByProgramAndUser(pid, uid);
    trlr.setTaskRecordList(trl);
    return trlr;
  }
  
  public TaskListResource getAllTaskOfUserAndProgram(long uid, long pid) {
    TaskListResource tlr = new TaskListResource();
    List<Task> tl = this.getTasksFromTaskRecord(taskRecordRepository.findByProgramAndUser(pid, uid));
    tlr.setTaskList(tl);
    return tlr;
  }

  public WorkDTO getWork(long uid, long pid, long tid) {
    TaskRecord tr = taskRecordRepository.findByProgramAndUserAndTask(pid, uid, tid);
    WorkDTO dto = new WorkDTO();
    dto.setWork(tr.getWork() != null ? tr.getWork() : "");
    
    return dto;
  }

  public void addWork(long uid, long pid, long tid, String work) {
    TaskRecord tr = taskRecordRepository.findByProgramAndUserAndTask(pid, uid, tid);
    tr.setWork(work);
    taskRecordRepository.save(tr);
  }
}
