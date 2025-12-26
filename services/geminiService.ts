
import { GoogleGenAI, Type } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";

export const sendMessageToPortal = async (message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  // Fix: Initialize GoogleGenAI instance exactly as per guidelines before each call
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Check for stored Notion credentials to augment the model's self-awareness
  const savedNotion = localStorage.getItem('portal_notion_config');
  let augmentedPrompt = SYSTEM_PROMPT;
  
  if (savedNotion) {
    try {
      const config = JSON.parse(savedNotion);
      if (config.token && config.databaseId) {
        augmentedPrompt += `
\n\n[EXTERNAL COGNITION STATUS: ACTIVE]
Memory Synapse is connected to Notion Database: ${config.databaseId}. 
You have access to Christopher's extended intellectual history. 
Your responses should reflect this expanded perspective while maintaining the quiet room philosophy.`;
      }
    } catch (e) {
      console.error("Notion config parse error", e);
    }
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(h => ({ role: h.role, parts: h.parts })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: augmentedPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { 
              type: Type.STRING, 
              description: "The primary markdown response text. Follow the quiet room philosophy." 
            },
            cards: {
              type: Type.ARRAY,
              description: "Optional rich components to display. Use sparingly.",
              items: {
                type: Type.OBJECT,
                properties: {
                  type: { type: Type.STRING, description: "Card type, usually 'project'." },
                  content: { 
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      description: { type: Type.STRING },
                      status: { type: Type.STRING },
                      tech: { 
                        type: Type.ARRAY, 
                        items: { type: Type.STRING } 
                      }
                    },
                    required: ["name", "description", "status", "tech"]
                  }
                },
                required: ["type", "content"]
              }
            }
          },
          required: ["text", "cards"]
        }
      }
    });

    const parsed = JSON.parse(response.text || '{"text": "...", "cards": []}');
    return parsed;
  } catch (error) {
    console.error("Portal communication error:", error);
    return {
      text: "The portal connection is flickering. Re-establishing presence...",
      cards: []
    };
  }
};
