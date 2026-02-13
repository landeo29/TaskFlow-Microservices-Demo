package com.demo.notificationservice.repository;

import com.demo.notificationservice.model.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends MongoRepository<Notification, String> {


    List<Notification> findByEventType(String eventType);
    List<Notification> findByTaskId(Long taskId);
}