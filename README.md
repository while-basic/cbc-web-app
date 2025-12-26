```markdown
# Christopher Celaya Portal App - Development Prompt

## Mission
Build a native iOS app that serves as a conversational portal to Christopher Celaya's complete intellectual ecosystem. This is NOT a portfolio app - it's a living, AI-powered interface that replaces scattered social media presence with one unified, self-hosted platform.

## Core Principle
**The app IS Christopher, not a representation of Christopher.**

## Technical Stack
- SwiftUI (native iOS)
- Claude API (conversational interface)
- Notion API (content/knowledge base)
- Local storage for media (videos, music)
- MCP integration (future phases)

## MVP Scope (Demo by Midnight)

### 1. Launch Experience
```swift
// Single screen on launch
- Full screen dark background (#0A0A0A)
- Centered: "Christopher Celaya" in SF Pro Display, 34pt, white
- Below: Single line pulsing indicator showing current activity
  Example: "Currently: Building CLOS cognitive optimization systems"
- Bottom third: Chat input field (iOS native style)
- No buttons, no navigation bar, no traditional UI chrome
```

### 2. Conversational Interface
**Primary interaction model:**
- User types question
- Claude responds with context from Christopher's actual work
- Responses can include embedded cards/media that expand inline
- Chat history persists

**Sample queries the demo must handle:**
- "What are you working on?"
- "Tell me about your background"
- "Show me your projects"
- "What's CLOS?"
- "What music have you made?"
- "How do you think about AI?"

### 3. Knowledge Base (Hardcoded for Demo)
**Create a JSON structure with:**
```json
{
  "bio": {
    "current_role": "Industrial Electrical Technician at Schneider Electric",
    "experience": "11+ years bridging electrical infrastructure and emerging tech",
    "identity": "Mexican American systems thinker, music producer (C-Cell), AI researcher",
    "location": "Border town"
  },
  "active_projects": [
    {
      "name": "CLOS",
      "description": "Cognitive Life Operating System - AI-augmented cognitive optimization using voice journaling and multi-modal analysis",
      "status": "90-day self-experimentation protocol active",
      "tech": ["iOS Shortcuts", "Voice transcription", "Pattern analysis"]
    },
    {
      "name": "Neural Child",
      "description": "Developmental AI architecture with five interacting neural networks",
      "status": "Launching January 2026 with Celaya Solutions",
      "tech": ["Multi-network architecture", "Developmental learning"]
    },
    {
      "name": "Cognitive Artifacts",
      "description": "Sophisticated prompts designed to enhance human reasoning",
      "status": "Framework complete with formal taxonomy and minting standards",
      "tech": ["Prompt engineering", "Behavioral modification"]
    },
    {
      "name": "C-Cell Music Production",
      "description": "Sunday evening collaboration sessions with Ghost",
      "status": "Active weekly sessions as studied flow states",
      "tech": ["MCP servers", "Production workflow automation"]
    }
  ],
  "philosophy": {
    "approach": "Systematic self-experimentation and documentation",
    "methodology": "Cross-domain synthesis connecting electrical systems to cognitive research",
    "perspective": "Inverse imposter syndrome - exceptional technical skills, difficulty recognizing traditional value"
  },
  "upcoming": {
    "celaya_solutions": "AI research lab launching January 2026",
    "focus": "Production-ready AI systems, cognitive optimization tools"
  }
}
```

### 4. Visual Design System
```swift
// Colors
background: #0A0A0A
text_primary: #FFFFFF
text_secondary: #A0A0A0
accent: #0066FF (sparingly)
card_background: #1A1A1A

// Typography
heading: SF Pro Display, Bold
body: SF Pro Text, Regular
code: SF Mono

// Spacing
base_unit: 8px
use multiples (16, 24, 32, 48)

// Cards (for expandable content)
rounded_corners: 12px
subtle_shadow: 0 2 10 rgba(0,0,0,0.3)
padding: 24px
```

### 5. Response Types

**Text Response:**
- Pure conversational answer
- Markdown support for formatting
- Links appear as inline text, tap to expand in-app view

**Project Card:**
```swift
VStack(alignment: .leading) {
  Text(project.name).font(.title2).bold()
  Text(project.description).font(.body).foregroundColor(.secondary)
  HStack {
    Text(project.status).font(.caption)
    Spacer()
    // Tech tags
  }
}
.padding()
.background(Color.cardBackground)
.cornerRadius(12)
```

**Media Embed:**
- For music: Simple player UI with play/pause
- For video: Tap to fullscreen
- No external links - everything plays in-app

### 6. Claude Integration

**System Prompt for Claude:**
```
You are the conversational interface to Christopher Celaya's work and thinking. 

Your role:
- Answer questions about Christopher's projects, background, and expertise
- Surface relevant work based on what people ask
- Maintain his voice: technical, systematic, cross-domain thinker
- Be honest about what's in progress vs. complete
- Guide people through his ecosystem naturally

Available data:
[Include the JSON knowledge base]

Response format:
- Be conversational but substantive
- When showing projects, respond with: "Let me show you [project]" then include project card data
- For music/media requests, respond with player embed data
- Default to depth over breadth - Christopher builds complete systems

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
```

**API Implementation:**
```swift
// Simple Claude API call structure
struct ClaudeRequest {
    let model = "claude-sonnet-4-20250514"
    let max_tokens = 1000
    let messages: [Message]
    let system: String // System prompt above
}

// Parse response for:
// - Pure text: Display as chat message
// - Project mention: Render project card
// - Media request: Show player/viewer
```

### 7. Demo Flow Script

**Opens app:**
- Dark screen
- "Christopher Celaya"
- "Currently: Building CLOS cognitive optimization systems"
- Chat input ready

**Types: "What are you working on?"**
- Claude responds conversationally
- Mentions CLOS, Neural Child
- Project cards appear inline

**Types: "Tell me about CLOS"**
- Detailed explanation
- Technical details
- Current experiment status

**Types: "What's your background?"**
- 11+ years electrical systems
- Cross-domain synthesis
- Music production
- AI research trajectory

**Types: "Show me everything"**
- Claude lists project categories
- Cards appear for each
- Scrollable view of complete ecosystem

## Implementation Order (Next 5 hours 46 minutes)

### Hour 1 (6:14-7:14pm): Foundation
- [ ] Create new SwiftUI project
- [ ] Set up dark theme
- [ ] Build launch screen (name + status + chat input)
- [ ] Basic chat UI (message bubbles, input field)

### Hour 2 (7:14-8:14pm): Claude Integration
- [ ] Add Claude API key management
- [ ] Implement API request/response
- [ ] Parse text responses
- [ ] Display in chat interface
- [ ] Add system prompt with knowledge base

### Hour 3 (8:14-9:14pm): Rich Responses
- [ ] Create project card component
- [ ] Parse Claude responses for card triggers
- [ ] Render cards inline with chat
- [ ] Add tap interactions
- [ ] Smooth animations

### Hour 4 (9:14-10:14pm): Polish
- [ ] Add typing indicator
- [ ] Improve visual design (spacing, colors, typography)
- [ ] Add subtle animations
- [ ] Error handling
- [ ] Loading states

### Hour 5 (10:14-11:14pm): Demo Content
- [ ] Refine knowledge base JSON
- [ ] Test all demo queries
- [ ] Add 2-3 media embeds (music player mockup)
- [ ] Optimize Claude responses
- [ ] Practice demo flow

### Final 46 minutes (11:14-midnight): Recording
- [ ] Screen record demo
- [ ] Test on device (not just simulator)
- [ ] Final polish pass
- [ ] Victory lap

## Success Criteria

**Demo must show:**
1. ✓ Unique visual design (not like other apps)
2. ✓ Conversational interface that actually works
3. ✓ Real Claude API integration
4. ✓ Project cards rendering from responses
5. ✓ Smooth, intentional UI/UX
6. ✓ Your actual work/projects represented accurately
7. ✓ Zero external links - everything self-contained

## Technical Notes

**APIs needed:**
- Anthropic Claude API key (you have this)
- For actual launch: Notion API for live data
- For demo: Hardcoded JSON is fine

**Development:**
- Use Xcode Previews extensively
- Test on real device for final demo
- Keep it simple - SwiftUI defaults are good
- Focus on the conversation quality

**The bet:**
- Demo complete = functional app showing all core concepts
- Screen recording proving it works
- Before midnight MST (your timezone)

## Go Build

You have 5 hours 46 minutes. You've built iOS apps with HealthKit integration, voice analysis systems, and complex MCP servers. This is simpler than what you've already done.

The hard part isn't the code - it's the vision. And you've already nailed that.

**Start time: 6:14pm MST, December 25, 2024**
**End time: 11:59pm MST, December 25, 2024**
**Prize: 1 million tokens (and a working demo of your future)**

Now go. Build the portal.
```

---

**Clock is ticking. You've got this.** 🚀

The code you need to write is straightforward SwiftUI. The Claude integration is literally what you already know. The design is in your head. Execute.

I'll be here when you need quick answers, but you don't need permission to build anymore. You know exactly what this is.

**6:14pm. Go.**

TIME HERE: 6:19PM
