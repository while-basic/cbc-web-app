<<<<<<< HEAD
//----------------------------------------------------------------------------
//File:       MessageBubbleView.swift
//Project:     cbc
//Created by:  Celaya Solutions, 2025
//Author:      Christopher Celaya <chris@chriscelaya.com>
//Description: Message bubble view with improved styling and animations
//Version:     1.0.0
//License:     MIT
//Last Update: November 2025
//----------------------------------------------------------------------------
=======
//
//  MessageBubbleView.swift
//  cbc
//
//  Created by Christopher Celaya on 12/25/25.
//
>>>>>>> c5852787698c13ce07da0d9357cc236b6527617f

import SwiftUI

struct MessageBubbleView: View {
    let message: Message
    let isActive: Bool
    let onTap: () -> Void

    var body: some View {
<<<<<<< HEAD
        VStack(alignment: message.isUser ? .trailing : .leading, spacing: 16) {
            // Message text
            HStack {
                if message.isUser {
                    Spacer(minLength: 60)
                }
                
                Text(message.content)
                    .font(.system(size: 15, weight: .regular, design: .default))
                    .foregroundColor(message.isUser ? .white : Color(hex: "E0E0E0"))
                    .lineSpacing(4)
                    .padding(.horizontal, 18)
                    .padding(.vertical, 14)
                    .background(
                        Group {
                            if message.isUser {
                                LinearGradient(
                                    gradient: Gradient(colors: [
                                        Color(hex: "0066FF"),
                                        Color(hex: "0052CC")
                                    ]),
                                    startPoint: .topLeading,
                                    endPoint: .bottomTrailing
                                )
                            } else {
                                Color(hex: "1A1A1A")
                            }
                        }
                    )
                    .cornerRadius(20)
                    .shadow(
                        color: message.isUser ? Color(hex: "0066FF").opacity(0.3) : Color.black.opacity(0.2),
                        radius: message.isUser ? 8 : 4,
                        x: 0,
                        y: 2
                    )
                
                if !message.isUser {
                    Spacer(minLength: 60)
                }
            }

            // Project cards if any
            if isActive, let projects = message.projectCards, !projects.isEmpty {
                LazyVStack(spacing: 12) {
=======
        VStack(alignment: message.isUser ? .trailing : .leading, spacing: 12) {
            // Message text
            Text(message.content)
                .font(.body)
                .foregroundColor(.white)
                .padding(16)
                .background(message.isUser ? Color(hex: "0066FF") : Color(hex: "1A1A1A"))
                .cornerRadius(16)
                .frame(maxWidth: .infinity, alignment: message.isUser ? .trailing : .leading)

            // Project cards if any
            if isActive, let projects = message.projectCards, !projects.isEmpty {
                LazyVStack(spacing: 16) {
>>>>>>> c5852787698c13ce07da0d9357cc236b6527617f
                    ForEach(projects) { project in
                        ProjectCardView(project: project)
                    }
                }
                .frame(maxWidth: .infinity, alignment: .leading)
<<<<<<< HEAD
                .transition(.opacity.combined(with: .move(edge: .bottom)))
            }
        }
        .padding(.horizontal, 20)
        .padding(.vertical, 12)
        .opacity(isActive ? 1.0 : 0.15)
        .scaleEffect(isActive ? 1.0 : 0.98)
        .onTapGesture {
            withAnimation(.spring(response: 0.3, dampingFraction: 0.7)) {
                onTap()
            }
        }
        .animation(.spring(response: 0.4, dampingFraction: 0.8), value: isActive)
        .drawingGroup()
=======
            }
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 8)
        .opacity(isActive ? 1.0 : 0.1)
        .onTapGesture {
            onTap()
        }
        .animation(.easeInOut(duration: 0.7), value: isActive)
        .drawingGroup() // Optimize rendering for complex views
>>>>>>> c5852787698c13ce07da0d9357cc236b6527617f
    }
}

#Preview {
    VStack(spacing: 16) {
        MessageBubbleView(
            message: Message(
                content: "What are you working on?",
                isUser: true
            ),
            isActive: true,
            onTap: {}
        )

        MessageBubbleView(
            message: Message(
                content: "I'm currently focused on several key projects. Let me show you CLOS, my primary focus right now.",
                isUser: false,
                projectCards: [
                    Project(
                        name: "CLOS",
                        description: "Cognitive Life Operating System - AI-augmented cognitive optimization using voice journaling and multi-modal analysis",
                        status: "90-day self-experimentation protocol active",
                        tech: ["iOS Shortcuts", "Voice transcription", "Pattern analysis"]
                    )
                ]
            ),
            isActive: true,
            onTap: {}
        )
    }
    .background(Color(hex: "0A0A0A"))
}
