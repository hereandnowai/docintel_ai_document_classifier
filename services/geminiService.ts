
import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";
import type { ClassificationOutput, ChatMessage } from '../types';
import { GEMINI_MODEL_NAME, DOCUMENT_ANALYSIS_SYSTEM_PROMPT, GENERAL_CHAT_SYSTEM_PROMPT } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This will be caught by the app and displayed to the user if needed.
  // For development, ensure API_KEY is set in your environment.
  console.error("API_KEY for Gemini is not set. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! }); // Non-null assertion, error handled if key is missing

function parseJsonFromMarkdown(text: string): any {
  let jsonStr = text.trim();
  const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
  const match = jsonStr.match(fenceRegex);
  if (match && match[2]) {
    jsonStr = match[2].trim();
  }
  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error("Failed to parse JSON response:", jsonStr, e);
    throw new Error(`Failed to parse JSON from AI response. Raw text: "${text.substring(0,100)}..."`);
  }
}

export const analyzeDocumentWithGemini = async (documentContent: string): Promise<ClassificationOutput> => {
  if (!API_KEY) {
    throw new Error("Gemini API Key is not configured. Please contact support or check environment variables.");
  }
  
  const promptWithContent = DOCUMENT_ANALYSIS_SYSTEM_PROMPT.replace('[DOCUMENT_CONTENT]', documentContent);

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: promptWithContent,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2, // Lower temperature for more deterministic classification
        topP: 0.9,
        topK: 40,
      }
    });

    const rawText = response.text;
    if (!rawText) {
        console.error("Empty response from Gemini API", response);
        throw new Error("Received an empty response from the AI. Please try again.");
    }
    
    const parsedJson = parseJsonFromMarkdown(rawText);

    // Validate structure (basic validation)
    if (!parsedJson.document_id || !parsedJson.primary_classification) {
        console.error("Unexpected JSON structure from Gemini API", parsedJson);
        throw new Error("AI response has an unexpected format.");
    }
    
    // Ensure confidence_score is a number
    if (typeof parsedJson.confidence_score === 'string') {
        parsedJson.confidence_score = parseInt(parsedJson.confidence_score, 10);
         if (isNaN(parsedJson.confidence_score)) {
            parsedJson.confidence_score = 0; // Default if parsing fails
         }
    }


    return parsedJson as ClassificationOutput;

  } catch (error) {
    console.error('Error calling Gemini API for analysis:', error);
    if (error instanceof Error) {
        throw new Error(`AI API Error: ${error.message}`);
    }
    throw new Error('An unknown error occurred while communicating with the AI.');
  }
};


let chatInstance: Chat | null = null;

const getChatInstance = (): Chat => {
    if (!chatInstance) {
        chatInstance = ai.chats.create({
            model: GEMINI_MODEL_NAME,
            config: {
                systemInstruction: GENERAL_CHAT_SYSTEM_PROMPT,
                temperature: 0.7, // More creative for chat
            },
        });
    }
    return chatInstance;
}

export const streamChatWithGemini = async function* (
    newMessage: string, 
    history: ChatMessage[]
): AsyncGenerator<string, void, undefined> {
    if (!API_KEY) {
        throw new Error("Gemini API Key is not configured.");
    }

    // Note: The @google/genai SDK's chat.sendMessageStream handles history internally if you use the same chatInstance.
    // However, if we want to explicitly manage history (e.g., limit its length or transform it),
    // we would build the `contents` array manually. For simplicity here, we'll rely on the SDK's internal history.
    // For a more robust implementation, you might want to re-initialize chat for each session or manage history explicitly.
    // For now, let's just send the new message to the existing chat instance.

    const chat = getChatInstance();

    // To send history, if needed, map ChatMessage[] to Content[] type:
    // const geminiHistory = history.map(msg => ({
    //    role: msg.sender === 'user' ? 'user' : 'model',
    //    parts: [{ text: msg.text }]
    // }));
    // And then pass it to `chat.sendMessageStream({ message: newMessage, history: geminiHistory })`
    // However, the current Gemini SDK `Chat` object keeps its own history.
    // If you always want to start fresh or use a specific history, you might need:
    // const chat = ai.chats.create(...) and then pass history to sendMessage or sendMessageStream.
    // For this example, we'll assume the chatInstance maintains the context.
    
    try {
        const stream = await chat.sendMessageStream({ message: newMessage });
        for await (const chunk of stream) {
            if (chunk.text) {
                 yield chunk.text;
            }
        }
    } catch (error) {
        console.error('Error calling Gemini API for chat:', error);
        if (error instanceof Error) {
            throw new Error(`AI Chat API Error: ${error.message}`);
        }
        throw new Error('An unknown error occurred while communicating with the AI for chat.');
    }
};

// Function to reset chat session if needed, e.g., for a "New Chat" button
export const resetChatSession = () => {
    chatInstance = null;
};
