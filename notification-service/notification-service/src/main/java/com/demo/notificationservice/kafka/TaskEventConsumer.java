package com.demo.notificationservice.kafka;

import com.demo.notificationservice.model.Notification;
import com.demo.notificationservice.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
@RequiredArgsConstructor
@Slf4j
public class TaskEventConsumer {

    private final NotificationRepository notificationRepository;

    @KafkaListener(topics = "task-created", groupId = "notification-group")
    public void handleTaskCreated(String message) {
        try {
            log.info("Received TASK_CREATED: {}", message);

            Notification notification = new Notification();
            notification.setEventType("TASK_CREATED");
            notification.setTaskId(extractLong(message, "id"));
            notification.setTaskTitle(extractString(message, "title"));
            notification.setMessage("New task created: " + extractString(message, "title"));
            notification.setTimestamp(LocalDateTime.now());

            notificationRepository.save(notification);
            log.info("Notification saved for TASK_CREATED event");
        } catch (Exception e) {
            log.error("Error processing TASK_CREATED event", e);
        }
    }

    @KafkaListener(topics = "task-completed", groupId = "notification-group")
    public void handleTaskCompleted(String message) {
        try {
            log.info("Received TASK_COMPLETED: {}", message);

            Notification notification = new Notification();
            notification.setEventType("TASK_COMPLETED");
            notification.setTaskId(extractLong(message, "id"));
            notification.setTaskTitle(extractString(message, "title"));
            notification.setMessage("Task completed: " + extractString(message, "title"));
            notification.setTimestamp(LocalDateTime.now());

            notificationRepository.save(notification);
            log.info("Notification saved for TASK_COMPLETED event");
        } catch (Exception e) {
            log.error("Error processing TASK_COMPLETED event", e);
        }
    }

    private Long extractLong(String json, String key) {
        Pattern p = Pattern.compile("\"" + key + "\"\\s*:\\s*(\\d+)");
        Matcher m = p.matcher(json);
        return m.find() ? Long.parseLong(m.group(1)) : null;
    }

    private String extractString(String json, String key) {
        Pattern p = Pattern.compile("\"" + key + "\"\\s*:\\s*\"([^\"]*)\"");
        Matcher m = p.matcher(json);
        return m.find() ? m.group(1) : null;
    }
}