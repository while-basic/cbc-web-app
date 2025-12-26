//----------------------------------------------------------------------------
//File:       TypingIndicatorView.swift
//Project:     cbc
//Created by:  Celaya Solutions, 2025
//Author:      Christopher Celaya <chris@chriscelaya.com>
//Description: Optimized typing indicator with efficient animation
//Version:     1.0.0
//License:     MIT
//Last Update: November 2025
//----------------------------------------------------------------------------

import SwiftUI

struct TypingIndicatorView: View {
    @State private var currentIndex = 0
    @State private var timer: Timer?
    
    var body: some View {
<<<<<<< HEAD
        HStack(spacing: 6) {
            ForEach(0..<3) { index in
                Circle()
                    .fill(Color(hex: "808080"))
                    .frame(width: 8, height: 8)
                    .scaleEffect(currentIndex == index ? 1.2 : 0.9)
                    .opacity(currentIndex == index ? 1.0 : 0.4)
                    .animation(
                        .spring(response: 0.4, dampingFraction: 0.6)
                        .delay(Double(index) * 0.15),
                        value: currentIndex
                    )
            }
        }
        .padding(.horizontal, 18)
        .padding(.vertical, 14)
        .background(
            RoundedRectangle(cornerRadius: 20)
                .fill(Color(hex: "1A1A1A"))
        )
        .onAppear {
            timer = Timer.scheduledTimer(withTimeInterval: 0.5, repeats: true) { _ in
                withAnimation {
                    currentIndex = (currentIndex + 1) % 3
                }
=======
        HStack(spacing: 4) {
            ForEach(0..<3) { index in
                Circle()
                    .fill(Color(hex: "A0A0A0"))
                    .frame(width: 8, height: 8)
                    .opacity(currentIndex == index ? 1.0 : 0.3)
                    .animation(.easeInOut(duration: 0.3), value: currentIndex)
            }
        }
        .padding(16)
        .background(Color(hex: "1A1A1A"))
        .cornerRadius(16)
        .onAppear {
            // Use Timer for more efficient animation control
            timer = Timer.scheduledTimer(withTimeInterval: 0.6, repeats: true) { _ in
                currentIndex = (currentIndex + 1) % 3
>>>>>>> c5852787698c13ce07da0d9357cc236b6527617f
            }
        }
        .onDisappear {
            timer?.invalidate()
            timer = nil
        }
    }
}

#Preview {
    TypingIndicatorView()
        .padding()
        .background(Color(hex: "0A0A0A"))
}
