package com.demo.notificationservice.service;


import com.demo.notificationservice.model.Notification;
import com.demo.notificationservice.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll(Sort.by(Sort.Direction.DESC, "timestamp"));
    }

    public List<Notification> getNotificationsByEventType(String eventType) {
        return notificationRepository.findByEventType(eventType);
    }

    public List<Notification> getNotificationsByTaskId(Long taskId) {
        return notificationRepository.findByTaskId(taskId);
    }

    public long getNotificationCount() {
        return notificationRepository.count();
    }
}