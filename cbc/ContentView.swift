//----------------------------------------------------------------------------
//File:       ContentView.swift
//Project:     cbc
//Created by:  Celaya Solutions, 2025
//Author:      Christopher Celaya <chris@chriscelaya.com>
//Description: macOS-specific ContentView
//Version:     1.0.0
//License:     MIT
//Last Update: November 2025
//----------------------------------------------------------------------------

#if os(macOS)
import SwiftUI

struct ContentView: View {
    @StateObject private var viewModel = ChatViewModel()
    @State private var inputText = ""
    @State private var scrollProxy: ScrollViewProxy?

    var body: some View {
        ZStack {
            // Background
            Color(hex: "0A0A0A")
                .ignoresSafeArea()

            VStack(spacing: 0) {
                // Header
                headerView

                // Messages
                ScrollViewReader { proxy in
                    ScrollView {
                        LazyVStack(spacing: 0) {
                            // Messages
                            ForEach(viewModel.messages) { message in
                                MessageBubbleView(
                                    message: message,
                                    isActive: viewModel.activePathIds.contains(message.id),
                                    onTap: {
                                        viewModel.selectMessage(message.id)
                                    }
                                )
                                .id(message.id)
                            }

                            // Typing indicator
                            if viewModel.isLoading {
                                HStack {
                                    TypingIndicatorView()
                                        .padding(.leading, 16)
                                    Spacer()
                                }
                                .padding(.vertical, 8)
                            }

                            // Bottom spacer for scroll
                            Color.clear
                                .frame(height: 20)
                                .id("bottom")
                        }
                    }
                    .onAppear {
                        scrollProxy = proxy
                    }
                    .onChange(of: viewModel.messages.count) { oldCount, newCount in
                        // Only scroll if a new message was added (not removed)
                        if newCount > oldCount {
                            DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
                                withAnimation(.easeOut(duration: 0.3)) {
                                    proxy.scrollTo("bottom", anchor: .bottom)
                                }
                            }
                        }
                    }
                }

                // Input field
                ChatInputView(
                    text: $inputText,
                    onSend: {
                        Task {
                            let message = inputText
                            inputText = ""
                            await viewModel.sendMessage(message)
                        }
                    },
                    isLoading: viewModel.isLoading
                )
            }
        }
        .preferredColorScheme(.dark)
    }

    private var headerView: some View {
<<<<<<< HEAD
        VStack(spacing: 12) {
            HStack {
                VStack(alignment: .leading, spacing: 6) {
                    Text("Christopher Celaya")
                        .font(.system(size: 32, weight: .semibold, design: .rounded))
                        .foregroundColor(.white)
                    
                    PulsingStatusView()
                }
                Spacer()
            }
            .padding(.horizontal, 20)
        }
        .padding(.top, 50)
        .padding(.bottom, 20)
        .frame(maxWidth: .infinity)
        .background(
            LinearGradient(
                gradient: Gradient(colors: [
                    Color(hex: "0A0A0A"),
                    Color(hex: "0A0A0A").opacity(0.95)
                ]),
                startPoint: .top,
                endPoint: .bottom
            )
        )
=======
        VStack(spacing: 8) {
            Text("Christopher Celaya")
                .font(.system(size: 34, weight: .bold, design: .default))
                .foregroundColor(.white)

            PulsingStatusView()
        }
        .padding(.top, 60)
        .padding(.bottom, 24)
        .frame(maxWidth: .infinity)
        .background(Color(hex: "0A0A0A"))
>>>>>>> c5852787698c13ce07da0d9357cc236b6527617f
    }
}

struct PulsingStatusView: View {
    @State private var isPulsing = false

    var body: some View {
<<<<<<< HEAD
        HStack(spacing: 10) {
            ZStack {
                Circle()
                    .fill(Color(hex: "0066FF").opacity(0.2))
                    .frame(width: 12, height: 12)
                    .scaleEffect(isPulsing ? 1.8 : 1.0)
                    .opacity(isPulsing ? 0 : 0.6)
                
                Circle()
                    .fill(Color(hex: "0066FF"))
                    .frame(width: 8, height: 8)
            }
            .animation(.easeInOut(duration: 1.5).repeatForever(autoreverses: false), value: isPulsing)

            Text("Currently: Building CLOS cognitive optimization systems")
                .font(.system(size: 13, weight: .regular, design: .default))
                .foregroundColor(Color(hex: "B0B0B0"))
                .tracking(0.2)
=======
        HStack(spacing: 8) {
            Circle()
                .fill(Color(hex: "0066FF"))
                .frame(width: 8, height: 8)
                .scaleEffect(isPulsing ? 1.2 : 1.0)
                .opacity(isPulsing ? 1.0 : 0.6)
                .animation(.easeInOut(duration: 1.5).repeatForever(autoreverses: true), value: isPulsing)

            Text("Currently: Building CLOS cognitive optimization systems")
                .font(.subheadline)
                .foregroundColor(Color(hex: "A0A0A0"))
>>>>>>> c5852787698c13ce07da0d9357cc236b6527617f
        }
        .onAppear {
            isPulsing = true
        }
<<<<<<< HEAD
        .drawingGroup()
=======
        .drawingGroup() // Optimize rendering
>>>>>>> c5852787698c13ce07da0d9357cc236b6527617f
    }
}

#Preview {
    ContentView()
}
#endif