import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import WalletConnect from '../components/WalletConnect';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI agent assistant. I can help you discover datasets, negotiate prices, and validate data quality. What would you like to know?',
      sender: 'agent',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate agent response
    setTimeout(() => {
      const agentResponse = generateAgentResponse(inputText);
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: agentResponse,
        sender: 'agent',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, agentMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAgentResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('dataset') || input.includes('data')) {
      return `I found several relevant datasets for you:

🔍 **Computer Vision Dataset**
- 50,000 labeled images
- 100 categories
- Price: 0.1 ETH
- Verified by 3 validators

📊 **Financial Data**
- Historical stock prices
- Trading indicators
- Price: 0.05 ETH
- Real-time updates

💬 **NLP Corpus**
- 1M+ text samples
- Multiple languages
- Price: 0.2 ETH
- Pre-processed

Would you like me to show you more details about any of these datasets?`;
    }
    
    if (input.includes('price') || input.includes('cost')) {
      return `I can help you negotiate prices! Here are some options:

💰 **Current Market Prices:**
- Computer Vision: 0.1 ETH (negotiable)
- Financial Data: 0.05 ETH (fixed)
- NLP Corpus: 0.2 ETH (bulk discount available)

🤝 **Negotiation Tips:**
- Bulk purchases get 20% discount
- Verified datasets have premium pricing
- New sellers often offer better deals

Would you like me to contact a seller for price negotiation?`;
    }
    
    if (input.includes('verify') || input.includes('validate')) {
      return `I can help you verify dataset quality and provenance:

✅ **Verification Process:**
1. Check data integrity (hash verification)
2. Validate schema compliance
3. Run quality metrics
4. Review validator attestations

🔍 **Provenance Tracking:**
- Full transaction history
- Validator signatures
- Quality scores
- Usage statistics

I can run a comprehensive validation on any dataset. Which one would you like me to verify?`;
    }
    
    if (input.includes('buy') || input.includes('purchase')) {
      return `I can help you purchase datasets! Here's the process:

🛒 **Purchase Steps:**
1. Select your desired dataset
2. I'll verify your wallet balance
3. Execute the purchase transaction
4. Set up token-gated access
5. Download your data

💳 **Payment Options:**
- ETH (recommended)
- MATIC (for lower fees)
- Credit card (via fiat on-ramp)

Which dataset would you like to purchase? I'll guide you through the entire process.`;
    }
    
    return `I understand you're asking about "${userInput}". I can help you with:

🔍 **Dataset Discovery** - Find the perfect data for your AI project
💰 **Price Negotiation** - Get the best deals on datasets
✅ **Quality Verification** - Ensure data meets your standards
🛒 **Purchase Assistance** - Guide you through buying
📊 **Market Analysis** - Get insights on data trends

What specific help do you need?`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <Head>
        <title>AI Agent Chat - DataCoin Marketplace</title>
        <meta name="description" content="Chat with AI agents to discover and purchase datasets" />
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                DataCoin Marketplace
              </Link>
              <div className="flex items-center space-x-4">
                <WalletConnect />
                <Link 
                  href="/"
                  className="text-gray-600 hover:text-gray-900"
                >
                  ← Back to Marketplace
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="border-b p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">🤖</span>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">AI Agent Assistant</h2>
                  <p className="text-sm text-gray-600">Powered by Fetch.ai & ASI:One</p>
                </div>
                <div className="ml-auto">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                    Online
                  </span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                      <span className="text-sm">Agent is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about datasets, prices, or verification..."
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isLoading}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </div>
              
              <div className="mt-2 text-xs text-gray-500">
                Try: "Find computer vision datasets" or "Help me verify data quality"
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setInputText('Find computer vision datasets for object detection')}
              className="bg-white border border-gray-300 rounded-lg p-4 text-left hover:bg-gray-50"
            >
              <div className="text-2xl mb-2">🔍</div>
              <h3 className="font-semibold">Find Datasets</h3>
              <p className="text-sm text-gray-600">Discover relevant AI training data</p>
            </button>
            
            <button
              onClick={() => setInputText('Help me verify the quality of a dataset')}
              className="bg-white border border-gray-300 rounded-lg p-4 text-left hover:bg-gray-50"
            >
              <div className="text-2xl mb-2">✅</div>
              <h3 className="font-semibold">Verify Quality</h3>
              <p className="text-sm text-gray-600">Validate data integrity and schema</p>
            </button>
            
            <button
              onClick={() => setInputText('Negotiate prices for bulk dataset purchases')}
              className="bg-white border border-gray-300 rounded-lg p-4 text-left hover:bg-gray-50"
            >
              <div className="text-2xl mb-2">💰</div>
              <h3 className="font-semibold">Negotiate Prices</h3>
              <p className="text-sm text-gray-600">Get the best deals on datasets</p>
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
