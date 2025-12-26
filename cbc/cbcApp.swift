//----------------------------------------------------------------------------
//File:       cbcApp.swift
//Project:     cbc
//Created by:  Celaya Solutions, 2025
//Author:      Christopher Celaya <chris@chriscelaya.com>
//Description: Main app entry point - multiplatform (iOS/macOS)
//Version:     1.0.0
//License:     MIT
//Last Update: November 2025
//----------------------------------------------------------------------------

import SwiftUI

@main
struct cbcApp: App {
    var body: some Scene {
        WindowGroup {
            #if os(iOS)
            ContentView_iOS()
            #elseif os(macOS)
            ContentView()
            #else
            ContentView()
            #endif
        }
    }
}
