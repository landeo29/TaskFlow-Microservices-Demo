package com.demo.notificationservice.controller;

import com.demo.notificationservice.model.Notification;
import com.demo.notificationservice.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    // get notificaciones
    @GetMapping
    public ResponseEntity<List<Notification>> getAllNotifications() {
        List<Notification> notifications = notificationService.getAllNotifications();
        return ResponseEntity.ok(notifications);
    }

    // get para tipo de evento
    @GetMapping("/event/{eventType}")
    public ResponseEntity<List<Notification>> getByEventType(@PathVariable String eventType) {
        List<Notification> notifications = notificationService.getNotificationsByEventType(eventType);
        return ResponseEntity.ok(notifications);
    }

    // get tipo id
    @GetMapping("/task/{taskId}")
    public ResponseEntity<List<Notification>> getByTaskId(@PathVariable Long taskId) {
        List<Notification> notifications = notificationService.getNotificationsByTaskId(taskId);
        return ResponseEntity.ok(notifications);
    }

    // get total
    @GetMapping("/count")
    public ResponseEntity<Map<String, Long>> getCount() {
        long count = notificationService.getNotificationCount();
        return ResponseEntity.ok(Map.of("total", count));
    }
}