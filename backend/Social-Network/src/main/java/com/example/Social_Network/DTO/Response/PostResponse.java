package com.example.Social_Network.DTO.Response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
// When click to watch post, include like, name, post, comment
public class PostResponse {
    String postImg;
    int numberOfLike;
    boolean isFollow;
    String userId;
    String userAvt;
    String username;
    List<CommentInPostResponse> commentInPostResponseList;
}
