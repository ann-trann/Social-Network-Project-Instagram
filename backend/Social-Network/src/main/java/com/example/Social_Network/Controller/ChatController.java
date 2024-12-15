package com.example.Social_Network.Controller;

import com.example.Social_Network.DTO.Request.ApiResponse;
import com.example.Social_Network.DTO.Response.ChatMessageResponse;
import com.example.Social_Network.DTO.Response.ConversationResponse;
import com.example.Social_Network.Exception.AppRuntimeException;
import com.example.Social_Network.Service.ChatService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/messages")
public class ChatController {
    ChatService chatService;

    @PostMapping("/{recipientId}")
    public void sendMessage(@PathVariable String recipientId, @RequestBody String content) {
        ChatMessageResponse messageResponse = chatService.sendMessage(recipientId, content);

    }

    @GetMapping("/")
    public ApiResponse<List<ConversationResponse>> getAllConversation() {
        List<ConversationResponse> result = chatService.getAllConversation();
        return ApiResponse.<List<ConversationResponse>>builder().result(result).build();
    }

    @GetMapping("/{recipientId}")
    public ApiResponse<List<ChatMessageResponse>> getMessageWithUser(@PathVariable String recipientId
            , @RequestParam int offset
            , @RequestParam int limit) throws AppRuntimeException {
        List<ChatMessageResponse> result = chatService.getMessageWithUser(recipientId, offset, limit);
        return ApiResponse.<List<ChatMessageResponse>>builder().result(result).build();
    }
}
