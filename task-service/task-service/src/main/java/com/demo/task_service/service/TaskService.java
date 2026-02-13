package com.demo.task_service.service;


import com.demo.task_service.kafka.TaskEventProducer;
import com.demo.task_service.model.Task;
import com.demo.task_service.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class TaskService {

    private final TaskRepository taskRepository;
    private final TaskEventProducer taskEventProducer;


    public Task createTask(Task task) {

        if (task.getTitle() == null || task.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("El titulo no puede estar vacio");
        }

        task.setCreatedAt(LocalDateTime.now());
        task.setUpdatedAt(LocalDateTime.now());
        task.setStatus(Task.TaskStatus.PENDING);

        Task savedTask = taskRepository.save(task);

        taskEventProducer.publishTaskCreated(savedTask);



        return savedTask;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public List<Task> getTasksByStatus(Task.TaskStatus status) {
        return taskRepository.findByStatus(status);
    }

    public List<Task> searchTasksByTitle(String keyword) {
        return taskRepository.findByTitleContainingIgnoreCase(keyword);
    }

    public Task updateTask(Long id, Task taskDetails) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tarea no encontrada con ID->  " + id));

        if (taskDetails.getTitle() != null) {
            task.setTitle(taskDetails.getTitle());
        }
        if (taskDetails.getDescription() != null) {
            task.setDescription(taskDetails.getDescription());
        }
        if (taskDetails.getStatus() != null) {
            task.setStatus(taskDetails.getStatus());
        }

        task.setUpdatedAt(LocalDateTime.now());

        Task updatedTask = taskRepository.save(task);



        return updatedTask;
    }
    public Task startTask(Long id) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tarea no encontrada con ID-> " + id));

        task.setStatus(Task.TaskStatus.IN_PROGRESS);
        task.setUpdatedAt(LocalDateTime.now());

        Task updatedTask = taskRepository.save(task);


        return updatedTask;
    }
    public Task completeTask(Long id) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tarea no encontrada con ID-> " + id));

        task.setStatus(Task.TaskStatus.COMPLETED);
        task.setUpdatedAt(LocalDateTime.now());

        Task completedTask = taskRepository.save(task);
        taskEventProducer.publishTaskCompleted(completedTask);


        return completedTask;
    }

    public void deleteTask(Long id) {

        if (!taskRepository.existsById(id)) {
            throw new RuntimeException("Tarea no encontrada con ID-> " + id);
        }

        taskRepository.deleteById(id);
    }
}