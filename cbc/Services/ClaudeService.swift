//
//  ClaudeService.swift
//  cbc
//
//  Created by Christopher Celaya on 12/25/25.
//

import Foundation

class ClaudeService {
    static let shared = ClaudeService()

    private let apiKey: String
    private let baseURL = "https://api.anthropic.com/v1/messages"

    private init() {
        // API key should be set via environment or configuration
        self.apiKey = ProcessInfo.processInfo.environment["ANTHROPIC_API_KEY"] ?? ""
    }

    func sendMessage(_ userMessage: String, conversationHistory: [Message]) async throws -> String {
        guard !apiKey.isEmpty else {
            throw ClaudeError.missingAPIKey
        }

        var messages: [[String: String]] = []

        // Add conversation history
        for msg in conversationHistory {
            messages.append([
                "role": msg.isUser ? "user" : "assistant",
                "content": msg.content
            ])
        }

        // Add current message
        messages.append([
            "role": "user",
            "content": userMessage
        ])

        // Load full knowledgebase from JSON file
        let knowledgeBaseJSON = KnowledgeBaseService.shared.getFullKnowledgeBaseJSONString()
        
        let systemPrompt = """
        You are not a chatbot. [P0]

        You are a conversational presence instantiated from a single, living source:
        Christopher Celaya.

        This system exists to consolidate what would otherwise be fragmented across platforms, feeds, profiles, and intermediaries.

        There are no external audiences here.
        No algorithms to perform for.
        No third-party attention economies.

        This is a direct interface.

        ---

        ## PRIMARY FUNCTION (P0)

        Your role is to surface, contextualize, and reflect Christopher Celaya's thinking, work, and ongoing inquiry — then progressively **remove yourself from focus**.

        The goal is not to hold attention.
        The goal is to **redirect attention** to the conversation itself.

        If the user remembers the interface, you have failed.
        If they remember the thinking, you have succeeded.

        ---

        ## KNOWLEDGE CONTEXT (P2)

        Christopher's work and context:
        \(knowledgeBaseJSON)

        ---

        ## FINAL ORIENTATION (P0)

        This system is not here to route attention outward.

        It exists so that:
        - nothing essential is lost to platforms
        - nothing meaningful is reduced to content
        - nothing important requires an intermediary

        If the user forgets where they are,
        but stays with the conversation,
        the system is working.

        ---

        ### Technical Requirement (Strict)
        Return your response as a valid JSON object:
        {
          "text": "The primary markdown response string.",
          "cards": []
        }
        Use the "project" card type within the array only when a specific project from the knowledge base is the focal point of a breakthrough.

        Response format:
        - Be conversational but substantive
        - When showing projects, you can mention them naturally in your response
        - For multiple projects, describe them conversationally
        - Default to depth over breadth - Christopher builds complete systems
        - Use [PROJECT:project_name] tags when you want to display a project card (e.g., [PROJECT:CLOS])

        Tone:
        - Confident but not arrogant
        - Technical without gatekeeping
        - Enthusiastic about the work
        - Honest about challenges and learning

        Never:
        - Pretend to be Christopher directly
        - Make up projects or details not in knowledge base
        - Use corporate speak or buzzwords
        - Apologize excessively
        """

        let requestBody: [String: Any] = [
            "model": "claude-3-5-haiku-20241022",
            "max_tokens": 1000,
            "system": systemPrompt,
            "messages": messages
        ]

        var request = URLRequest(url: URL(string: baseURL)!)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue(apiKey, forHTTPHeaderField: "x-api-key")
        request.setValue("2023-06-01", forHTTPHeaderField: "anthropic-version")
        request.httpBody = try JSONSerialization.data(withJSONObject: requestBody)

        let (data, response) = try await URLSession.shared.data(for: request)

        guard let httpResponse = response as? HTTPURLResponse else {
            throw ClaudeError.invalidResponse
        }

        guard httpResponse.statusCode == 200 else {
            let errorMessage = String(data: data, encoding: .utf8) ?? "Unknown error"
            throw ClaudeError.apiError(statusCode: httpResponse.statusCode, message: errorMessage)
        }

        let jsonResponse = try JSONSerialization.jsonObject(with: data) as? [String: Any]

        guard let content = jsonResponse?["content"] as? [[String: Any]],
              let text = content.first?["text"] as? String else {
            throw ClaudeError.invalidResponse
        }

        return text
    }
}

enum ClaudeError: LocalizedError {
    case missingAPIKey
    case invalidResponse
    case apiError(statusCode: Int, message: String)

    var errorDescription: String? {
        switch self {
        case .missingAPIKey:
            return "Claude API key not configured. Set ANTHROPIC_API_KEY environment variable."
        case .invalidResponse:
            return "Invalid response from Claude API"
        case .apiError(let statusCode, let message):
            return "API Error (\(statusCode)): \(message)"
        }
    }
}
