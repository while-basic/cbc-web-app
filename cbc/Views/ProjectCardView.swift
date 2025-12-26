<<<<<<< HEAD
//----------------------------------------------------------------------------
//File:       ProjectCardView.swift
//Project:     cbc
//Created by:  Celaya Solutions, 2025
//Author:      Christopher Celaya <chris@chriscelaya.com>
//Description: Project card view with improved layout and styling
//Version:     1.0.0
//License:     MIT
//Last Update: November 2025
//----------------------------------------------------------------------------
=======
//
//  ProjectCardView.swift
//  cbc
//
//  Created by Christopher Celaya on 12/25/25.
//
>>>>>>> c5852787698c13ce07da0d9357cc236b6527617f

import SwiftUI

struct ProjectCardView: View {
    let project: Project

    var body: some View {
<<<<<<< HEAD
        VStack(alignment: .leading, spacing: 16) {
            // Header with title and status
            HStack(alignment: .top) {
                VStack(alignment: .leading, spacing: 4) {
                    Text(project.name)
                        .font(.system(size: 20, weight: .semibold, design: .rounded))
                        .foregroundColor(.white)
                }
                
                Spacer()
                
                Text(project.status.components(separatedBy: " ").first ?? "")
                    .font(.system(size: 9, weight: .bold, design: .default))
                    .foregroundColor(Color(hex: "808080"))
                    .tracking(0.2)
                    .textCase(.uppercase)
            }

            // Description
            Text(project.description)
                .font(.system(size: 14, weight: .regular, design: .default))
                .foregroundColor(Color(hex: "B0B0B0"))
                .lineSpacing(4)
                .fixedSize(horizontal: false, vertical: true)

=======
        VStack(alignment: .leading, spacing: 12) {
            Text(project.name)
                .font(.title2)
                .fontWeight(.bold)
                .foregroundColor(.white)

            Text(project.description)
                .font(.body)
                .foregroundColor(Color(hex: "A0A0A0"))
                .fixedSize(horizontal: false, vertical: true)

            HStack {
                Text(project.status)
                    .font(.caption)
                    .foregroundColor(Color(hex: "0066FF"))
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(Color(hex: "0066FF").opacity(0.2))
                    .cornerRadius(4)

                Spacer()
            }

>>>>>>> c5852787698c13ce07da0d9357cc236b6527617f
            // Tech tags
            FlowLayout(spacing: 8) {
                ForEach(project.tech, id: \.self) { tech in
                    Text(tech)
<<<<<<< HEAD
                        .font(.system(size: 11, weight: .regular, design: .monospaced))
                        .foregroundColor(Color(hex: "808080"))
                        .padding(.horizontal, 10)
                        .padding(.vertical, 5)
                        .background(Color(hex: "0F0F0F"))
                        .cornerRadius(6)
                        .overlay(
                            RoundedRectangle(cornerRadius: 6)
                                .stroke(Color(hex: "2A2A2A"), lineWidth: 0.5)
                        )
                }
            }
            
            // Footer with full status
            Divider()
                .background(Color(hex: "2A2A2A"))
                .padding(.top, 4)
            
            HStack {
                Text(project.status)
                    .font(.system(size: 10, weight: .regular, design: .monospaced))
                    .foregroundColor(Color(hex: "707070"))
                    .tracking(0.5)
                
                Spacer()
                
                Text("Details →")
                    .font(.system(size: 10, weight: .semibold, design: .default))
                    .foregroundColor(Color(hex: "808080"))
                    .tracking(0.2)
                    .textCase(.uppercase)
            }
            .padding(.top, 8)
        }
        .padding(24)
        .background(
            RoundedRectangle(cornerRadius: 16)
                .fill(Color(hex: "1A1A1A"))
                .overlay(
                    RoundedRectangle(cornerRadius: 16)
                        .stroke(Color(hex: "2A2A2A"), lineWidth: 0.5)
                )
        )
        .shadow(color: Color.black.opacity(0.4), radius: 12, x: 0, y: 4)
=======
                        .font(.caption2)
                        .foregroundColor(Color(hex: "A0A0A0"))
                        .padding(.horizontal, 6)
                        .padding(.vertical, 3)
                        .background(Color(hex: "1A1A1A"))
                        .cornerRadius(3)
                        .overlay(
                            RoundedRectangle(cornerRadius: 3)
                                .stroke(Color(hex: "A0A0A0").opacity(0.3), lineWidth: 0.5)
                        )
                }
            }
        }
        .padding(24)
        .background(Color(hex: "1A1A1A"))
        .cornerRadius(12)
        .shadow(color: Color.black.opacity(0.3), radius: 10, x: 0, y: 2)
>>>>>>> c5852787698c13ce07da0d9357cc236b6527617f
    }
}

// Simple flow layout for tech tags
struct FlowLayout: Layout {
    var spacing: CGFloat = 8

    func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) -> CGSize {
        let result = FlowResult(
            in: proposal.replacingUnspecifiedDimensions().width,
            subviews: subviews,
            spacing: spacing
        )
        return result.size
    }

    func placeSubviews(in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) {
        let result = FlowResult(
            in: bounds.width,
            subviews: subviews,
            spacing: spacing
        )
        for (index, subview) in subviews.enumerated() {
            subview.place(at: CGPoint(x: bounds.minX + result.positions[index].x, y: bounds.minY + result.positions[index].y), proposal: .unspecified)
        }
    }

    struct FlowResult {
        var size: CGSize = .zero
        var positions: [CGPoint] = []

        init(in maxWidth: CGFloat, subviews: Subviews, spacing: CGFloat) {
            var x: CGFloat = 0
            var y: CGFloat = 0
            var lineHeight: CGFloat = 0

            for subview in subviews {
                let size = subview.sizeThatFits(.unspecified)

                if x + size.width > maxWidth && x > 0 {
                    x = 0
                    y += lineHeight + spacing
                    lineHeight = 0
                }

                positions.append(CGPoint(x: x, y: y))
                lineHeight = max(lineHeight, size.height)
                x += size.width + spacing
            }

            self.size = CGSize(width: maxWidth, height: y + lineHeight)
        }
    }
}

#Preview {
    ProjectCardView(project: Project(
        name: "CLOS",
        description: "Cognitive Life Operating System - AI-augmented cognitive optimization using voice journaling and multi-modal analysis",
        status: "90-day self-experimentation protocol active",
        tech: ["iOS Shortcuts", "Voice transcription", "Pattern analysis"]
    ))
    .padding()
    .background(Color(hex: "0A0A0A"))
}
