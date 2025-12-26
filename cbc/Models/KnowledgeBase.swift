//
//  KnowledgeBase.swift
//  cbc
//
//  Created by Christopher Celaya on 12/25/25.
//
//  Description: Knowledge base model for Christopher Celaya's work and context
//  The knowledgebase is loaded from @knowledgebase/christopher_celaya_knowledge_base.json
//  This struct provides a simplified interface while the full JSON is available via KnowledgeBaseService
//

import Foundation

struct KnowledgeBase: Codable {
    let bio: Bio
    let activeProjects: [Project]
    let philosophy: Philosophy
    let upcoming: Upcoming

    struct Bio: Codable {
        let currentRole: String
        let experience: String
        let identity: String
        let location: String
    }

    struct Philosophy: Codable {
        let approach: String
        let methodology: String
        let perspective: String
    }

    struct Upcoming: Codable {
        let celayaSolutions: String
        let focus: String
    }

    // Fallback shared instance with simplified data
    // For full knowledgebase, use KnowledgeBaseService.shared.loadFullKnowledgeBase()
    static let shared = KnowledgeBase(
        bio: Bio(
            currentRole: "Industrial Electrical Technician at Schneider Electric",
            experience: "11+ years bridging electrical infrastructure and emerging tech",
            identity: "Mexican American systems thinker, music producer (C-Cell), AI researcher",
            location: "Border town"
        ),
        activeProjects: [
            Project(
                name: "CLOS",
                description: "Cognitive Life Operating System - AI-augmented cognitive optimization using voice journaling and multi-modal analysis",
                status: "90-day self-experimentation protocol active",
                tech: ["iOS Shortcuts", "Voice transcription", "Pattern analysis"]
            ),
            Project(
                name: "Neural Child",
                description: "Developmental AI architecture with five interacting neural networks",
                status: "Launching January 2026 with Celaya Solutions",
                tech: ["Multi-network architecture", "Developmental learning"]
            ),
            Project(
                name: "Cognitive Artifacts",
                description: "Sophisticated prompts designed to enhance human reasoning",
                status: "Framework complete with formal taxonomy and minting standards",
                tech: ["Prompt engineering", "Behavioral modification"]
            ),
            Project(
                name: "C-Cell Music Production",
                description: "Sunday evening collaboration sessions with Ghost",
                status: "Active weekly sessions as studied flow states",
                tech: ["MCP servers", "Production workflow automation"]
            )
        ],
        philosophy: Philosophy(
            approach: "Systematic self-experimentation and documentation",
            methodology: "Cross-domain synthesis connecting electrical systems to cognitive research",
            perspective: "Inverse imposter syndrome - exceptional technical skills, difficulty recognizing traditional value"
        ),
        upcoming: Upcoming(
            celayaSolutions: "AI research lab launching January 2026",
            focus: "Production-ready AI systems, cognitive optimization tools"
        )
    )

    // Cache the JSON string to avoid regenerating on every API call
    private static var _cachedJSONString: String?
    
    var jsonString: String {
        if let cached = KnowledgeBase._cachedJSONString {
            return cached
        }
        
        let encoder = JSONEncoder()
        encoder.outputFormatting = [.prettyPrinted, .sortedKeys]
        if let data = try? encoder.encode(self),
           let string = String(data: data, encoding: .utf8) {
            KnowledgeBase._cachedJSONString = string
            return string
        }
        return "{}"
    }
}

// Service to load the full knowledgebase from JSON file
// The JSON file should be bundled in the app resources as "christopher_celaya_knowledge_base.json"
class KnowledgeBaseService {
    static let shared = KnowledgeBaseService()
    
    private var fullKnowledgeBaseJSON: [String: Any]?
    private var cachedJSONString: String?
    
    private init() {}
    
    // Load the full knowledgebase JSON from bundled resource
    // Returns the full JSON as a dictionary for maximum flexibility
    func loadFullKnowledgeBase() -> [String: Any]? {
        if let cached = fullKnowledgeBaseJSON {
            return cached
        }
        
        guard let url = Bundle.main.url(
            forResource: "christopher_celaya_knowledge_base",
            withExtension: "json"
        ) else {
            print("⚠️ Could not find christopher_celaya_knowledge_base.json in bundle")
            return nil
        }
        
        do {
            let data = try Data(contentsOf: url)
            let json = try JSONSerialization.jsonObject(with: data) as? [String: Any]
            fullKnowledgeBaseJSON = json
            print("✅ Full knowledgebase loaded from JSON")
            return json
        } catch {
            print("❌ Error loading knowledgebase JSON: \(error)")
            return nil
        }
    }
    
    // Get the full knowledgebase as a JSON string for system prompts
    func getFullKnowledgeBaseJSONString() -> String {
        if let cached = cachedJSONString {
            return cached
        }
        
        guard let json = loadFullKnowledgeBase(),
              let data = try? JSONSerialization.data(withJSONObject: json, options: [.prettyPrinted, .sortedKeys]),
              let string = String(data: data, encoding: .utf8) else {
            // Fallback to simplified knowledgebase
            return KnowledgeBase.shared.jsonString
        }
        
        cachedJSONString = string
        return string
    }
}
