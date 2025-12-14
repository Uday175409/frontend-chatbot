// ChatGPT API utility
export class ChatGPTService {
  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    console.log("[chatgpt.jsx - constructor] 🔑 FRONTEND API KEY VALUE:", this.apiKey);
    console.log("[chatgpt.jsx - constructor] 🔑 FRONTEND API KEY TYPE:", typeof this.apiKey);
    console.log("[chatgpt.jsx - constructor] 🔑 FRONTEND API KEY LENGTH:", this.apiKey ? this.apiKey.length : 0);
    this.apiUrl = 'https://api.openai.com/v1/chat/completions';
    
    console.log('[chatgpt.jsx - constructor] 🤖 Frontend ChatGPT Service initialized');
    console.log('[chatgpt.jsx - constructor] 🔑 API Key configured:', this.apiKey ? 'YES (key present)' : 'NO (missing)');
    console.log('[chatgpt.jsx - constructor] 🌐 API URL:', this.apiUrl);
  }

  async generateResponse(userMessage, conversationHistory = []) {
    console.log('[chatgpt.jsx - generateResponse] \n🚀 Frontend ChatGPT API Call Started');
    console.log('[chatgpt.jsx - generateResponse] 📝 User Message:', userMessage);
    console.log('[chatgpt.jsx - generateResponse] 📚 Conversation History Length:', conversationHistory.length);
    console.log('[chatgpt.jsx - generateResponse] 🔍 Conversation History:', conversationHistory);
    
    if (!this.apiKey || this.apiKey === 'your_openai_api_key_here') {
      const error = 'OpenAI API key is not configured';
      console.error('[chatgpt.jsx - generateResponse] ❌ Frontend API Key Error:', error);
      throw new Error(error);
    }

    try {
      const messages = [
        {
          role: 'system',
          content: 'You are a helpful assistant. Provide concise, helpful responses to user questions.'
        },
        ...conversationHistory.slice(-5), // Keep last 5 messages for context
        {
          role: 'user',
          content: userMessage
        }
      ];
      
      console.log('[chatgpt.jsx - generateResponse] 📋 Messages to send to ChatGPT:', messages);
      
      const requestBody = {
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7
      };
      
      console.log('[chatgpt.jsx - generateResponse] 📦 Request body:', requestBody);
      console.log('[chatgpt.jsx - generateResponse] 🔐 Authorization header:', `Bearer ${this.apiKey.substring(0, 10)}...`);

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(requestBody)
      });
      
      console.log('[chatgpt.jsx - generateResponse] 📡 Response received. Status:', response.status);
      console.log('[chatgpt.jsx - generateResponse] ✅ Response OK:', response.ok);
      console.log('[chatgpt.jsx - generateResponse] 📊 Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[chatgpt.jsx - generateResponse] ❌ HTTP Error Response:', response.status, errorText);
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      console.log('[chatgpt.jsx - generateResponse] 📄 Raw response data:', data);
      console.log('[chatgpt.jsx - generateResponse] 🎯 ChatGPT response:', data.choices[0].message.content);
      
      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error('[chatgpt.jsx - generateResponse] ❌ Frontend ChatGPT API Error:', error.message);
      console.error('[chatgpt.jsx - generateResponse] 🔍 Error type:', error.constructor.name);
      console.error('[chatgpt.jsx - generateResponse] 📋 Full error object:', error);
      throw error;
    }
  }
}

export const chatGPTService = new ChatGPTService();
