
import { GoogleGenAI } from "@google/genai";

export interface IMChatMessage {
    role: 'user' | 'model';
    text: string;
}

export const generateAIResponse = async (apiKey: string, prompt: string): Promise<string> => {
    try {
        const ai = new GoogleGenAI({ apiKey: apiKey });
        
        // Using gemini-3-flash-preview for basic text tasks/math as per guidelines
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
                systemInstruction: "You are a helpful math tutor and calculator assistant. Provide clear, concise explanations for mathematical problems. If the user asks for a calculation, show the steps.",
            },
        });

        if (response.text) {
            return response.text;
        } else {
            throw new Error("No response text");
        }
    } catch (error) {
        console.error("AI Error:", error);
        throw error;
    }
};
