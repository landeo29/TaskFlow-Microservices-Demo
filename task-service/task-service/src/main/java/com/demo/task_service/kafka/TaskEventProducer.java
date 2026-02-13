package com.demo.task_service.kafka;

import com.demo.task_service.model.Task;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class TaskEventProducer {

    private final KafkaTemplate<String, String> kafkaTemplate;

    private static final String TOPIC_TASK_CREATED = "tarea creada";
    private static final String TOPIC_TASK_COMPLETED = "tarea completa";

    public void publishTaskCreated(Task task) {
        try {
            kafkaTemplate.send(TOPIC_TASK_CREATED, task.getId().toString(), buildJson(task));
        } catch (Exception e) {
        }
    }

    public void publishTaskCompleted(Task task) {
        try {
            kafkaTemplate.send(TOPIC_TASK_COMPLETED, task.getId().toString(), buildJson(task));
        } catch (Exception e) {
            log.error("Error ", e);
        }
    }
    public void publishTaskUpdated(Task task) {
        String json = buildJson(task);
        kafkaTemplate.send("tarea actualizada", json);
    }
    private String buildJson(Task task) {
        return "{" +
                "\"id\":" + task.getId() + "," +
                "\"title\":\"" + task.getTitle() + "\"," +
                "\"description\":\"" + task.getDescription() + "\"," +
                "\"status\":\"" + task.getStatus().name() + "\"" +
                "}";
    }
}