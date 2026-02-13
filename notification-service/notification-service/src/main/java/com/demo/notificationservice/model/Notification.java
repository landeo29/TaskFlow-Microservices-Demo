package com.demo.notificationservice.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

@Document(collection = "notifications")
@Data
@NoArgsConstructor
public class Notification {

    @Id
    private String id;

    @Field("event_type")
    private String eventType;

    @Field("task_id")
    private Long taskId;

    @Field("task_title")
    private String taskTitle;

    @Field("message")
    private String message;

    @Field("timestamp")
    private LocalDateTime timestamp;
}