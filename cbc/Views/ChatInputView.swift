//----------------------------------------------------------------------------
//File:       ChatInputView.swift
//Project:     cbc
//Created by:  Celaya Solutions, 2025
//Author:      Christopher Celaya <chris@chriscelaya.com>
//Description: Chat input view with keyboard handling
//Version:     1.0.0
//License:     MIT
//Last Update: November 2025
//----------------------------------------------------------------------------

import SwiftUI

struct ChatInputView: View {
    @Binding var text: String
    let onSend: () -> Void
    let isLoading: Bool
    @FocusState private var isFocused: Bool

    var body: some View {
<<<<<<< HEAD
        VStack(spacing: 0) {
            // Subtle top border
            Rectangle()
                .fill(Color(hex: "1A1A1A").opacity(0.5))
                .frame(height: 0.5)
            
            HStack(spacing: 12) {
                TextField("Ask anything...", text: $text, axis: .vertical)
                    .textFieldStyle(.plain)
                    .font(.system(size: 15, weight: .regular, design: .default))
                    .foregroundColor(.white)
                    .padding(.horizontal, 18)
                    .padding(.vertical, 14)
                    .background(
                        RoundedRectangle(cornerRadius: 24)
                            .fill(Color(hex: "1A1A1A"))
                            .overlay(
                                RoundedRectangle(cornerRadius: 24)
                                    .stroke(isFocused ? Color(hex: "0066FF").opacity(0.3) : Color.clear, lineWidth: 1)
                            )
                    )
                    .lineLimit(1...5)
                    .disabled(isLoading)
                    .focused($isFocused)
                    .autocorrectionDisabled()
                    .textInputAutocapitalization(.never)
                    .submitLabel(.send)
                    .onSubmit {
                        if !text.isEmpty && !isLoading {
                            onSend()
                        }
                    }

                Button(action: {
                    if !text.isEmpty && !isLoading {
                        isFocused = false
                        onSend()
                    }
                }) {
                    ZStack {
                        Circle()
                            .fill(text.isEmpty ? Color(hex: "1A1A1A") : Color(hex: "0066FF"))
                            .frame(width: 44, height: 44)
                        
                        Image(systemName: isLoading ? "stop.fill" : "arrow.up")
                            .font(.system(size: 16, weight: .semibold))
                            .foregroundColor(text.isEmpty ? Color(hex: "606060") : .white)
                    }
                    .shadow(
                        color: text.isEmpty ? Color.clear : Color(hex: "0066FF").opacity(0.3),
                        radius: 8,
                        x: 0,
                        y: 2
                    )
                }
                .disabled(text.isEmpty && !isLoading)
                .animation(.spring(response: 0.3, dampingFraction: 0.6), value: text.isEmpty)
            }
            .padding(.horizontal, 20)
            .padding(.vertical, 16)
        }
        .background(
            LinearGradient(
                gradient: Gradient(colors: [
                    Color(hex: "0A0A0A"),
                    Color(hex: "0A0A0A").opacity(0.98)
                ]),
                startPoint: .top,
                endPoint: .bottom
            )
        )
=======
        HStack(spacing: 12) {
            TextField("Ask anything...", text: $text, axis: .vertical)
                .textFieldStyle(.plain)
                .font(.body)
                .foregroundColor(.white)
                .padding(12)
                .background(Color(hex: "1A1A1A"))
                .cornerRadius(20)
                .lineLimit(1...5)
                .disabled(isLoading)
                .focused($isFocused)
                .autocorrectionDisabled()
                .textInputAutocapitalization(.never)
                .submitLabel(.send)
                .onSubmit {
                    if !text.isEmpty && !isLoading {
                        onSend()
                    }
                }

            Button(action: {
                if !text.isEmpty && !isLoading {
                    isFocused = false
                    onSend()
                }
            }) {
                Image(systemName: isLoading ? "stop.circle.fill" : "arrow.up.circle.fill")
                    .font(.system(size: 32))
                    .foregroundColor(text.isEmpty ? Color(hex: "A0A0A0") : Color(hex: "0066FF"))
            }
            .disabled(text.isEmpty && !isLoading)
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 12)
        .background(Color(hex: "0A0A0A"))
>>>>>>> c5852787698c13ce07da0d9357cc236b6527617f
    }
}

#Preview {
    VStack {
        Spacer()
        ChatInputView(text: .constant(""), onSend: {}, isLoading: false)
    }
    .background(Color(hex: "0A0A0A"))
}
