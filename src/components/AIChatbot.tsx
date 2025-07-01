
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { language, t } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = getWelcomeMessage();
      setMessages([{
        id: '1',
        text: welcomeMessage,
        sender: 'bot',
        timestamp: new Date()
      }]);
    }
  }, [isOpen, language]);

  const getWelcomeMessage = () => {
    const welcomeMessages = {
      en: "Hello! I'm your CLUB B2B PERFORMANCE assistant. I can help you with luxury car imports, exports, shipping quotes, and VIP services. How can I assist you today?",
      fr: "Bonjour! Je suis votre assistant CLUB B2B PERFORMANCE. Je peux vous aider avec les importations de voitures de luxe, les exportations, les devis d'expédition et les services VIP. Comment puis-je vous aider aujourd'hui?",
      es: "¡Hola! Soy tu asistente de CLUB B2B PERFORMANCE. Puedo ayudarte con importaciones de autos de lujo, exportaciones, cotizaciones de envío y servicios VIP. ¿Cómo puedo ayudarte hoy?"
    };
    return welcomeMessages[language as keyof typeof welcomeMessages] || welcomeMessages.en;
  };

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    const responses = {
      en: {
        greeting: "Hello! How can I help you with our luxury automotive services today?",
        price: "Our prices vary based on the vehicle and destination. Would you like me to connect you with our team for a personalized quote? You can also use our price calculator for estimates.",
        shipping: "We offer worldwide shipping with complete logistics support. Typical shipping times: Canada to Africa (21-35 days), Canada to Europe (14-21 days). Would you like specific details?",
        import: "We specialize in luxury vehicle imports with full legal compliance. Our team handles all documentation, customs, and delivery. Which country are you importing to?",
        export: "Our export services include complete documentation, shipping arrangements, and legal compliance. Which vehicle are you looking to export?",
        vip: "Our VIP services include priority handling, white-glove delivery, and exclusive access to rare vehicles. Would you like to learn about our VIP membership?",
        appointment: "I can help you schedule an appointment. Would you prefer a phone call, video consultation, or in-person meeting?",
        default: "I understand you're interested in our services. Can you tell me more about what you're looking for? I can help with vehicle imports, exports, shipping, or VIP services."
      },
      fr: {
        greeting: "Bonjour! Comment puis-je vous aider avec nos services automobiles de luxe aujourd'hui?",
        price: "Nos prix varient selon le véhicule et la destination. Voulez-vous que je vous mette en contact avec notre équipe pour un devis personnalisé?",
        shipping: "Nous offrons l'expédition mondiale avec un support logistique complet. Temps d'expédition typiques: Canada vers Afrique (21-35 jours), Canada vers Europe (14-21 jours).",
        import: "Nous nous spécialisons dans l'importation de véhicules de luxe avec conformité légale complète. Dans quel pays importez-vous?",
        export: "Nos services d'exportation incluent la documentation complète et la conformité légale. Quel véhicule souhaitez-vous exporter?",
        vip: "Nos services VIP incluent la manipulation prioritaire et l'accès exclusif aux véhicules rares. Voulez-vous en savoir plus sur notre adhésion VIP?",
        appointment: "Je peux vous aider à planifier un rendez-vous. Préférez-vous un appel téléphonique, une consultation vidéo ou une rencontre en personne?",
        default: "Je comprends que vous êtes intéressé par nos services. Pouvez-vous me dire ce que vous recherchez?"
      },
      es: {
        greeting: "¡Hola! ¿Cómo puedo ayudarte con nuestros servicios automotrices de lujo hoy?",
        price: "Nuestros precios varían según el vehículo y el destino. ¿Te gustaría que te conecte con nuestro equipo para una cotización personalizada?",
        shipping: "Ofrecemos envío mundial con soporte logístico completo. Tiempos típicos: Canadá a África (21-35 días), Canadá a Europa (14-21 días).",
        import: "Nos especializamos en importación de vehículos de lujo con cumplimiento legal completo. ¿A qué país estás importando?",
        export: "Nuestros servicios de exportación incluyen documentación completa y cumplimiento legal. ¿Qué vehículo buscas exportar?",
        vip: "Nuestros servicios VIP incluyen manejo prioritario y acceso exclusivo a vehículos raros. ¿Te gustaría conocer nuestra membresía VIP?",
        appointment: "Puedo ayudarte a programar una cita. ¿Prefieres una llamada telefónica, consulta por video o reunión en persona?",
        default: "Entiendo que estás interesado en nuestros servicios. ¿Puedes decirme más sobre lo que buscas?"
      }
    };

    const langResponses = responses[language as keyof typeof responses] || responses.en;

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('bonjour') || lowerMessage.includes('hola')) {
      return langResponses.greeting;
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('prix') || lowerMessage.includes('precio')) {
      return langResponses.price;
    } else if (lowerMessage.includes('ship') || lowerMessage.includes('delivery') || lowerMessage.includes('expédition') || lowerMessage.includes('envío')) {
      return langResponses.shipping;
    } else if (lowerMessage.includes('import')) {
      return langResponses.import;
    } else if (lowerMessage.includes('export')) {
      return langResponses.export;
    } else if (lowerMessage.includes('vip')) {
      return langResponses.vip;
    } else if (lowerMessage.includes('appointment') || lowerMessage.includes('meeting') || lowerMessage.includes('rendez-vous') || lowerMessage.includes('cita')) {
      return langResponses.appointment;
    } else {
      return langResponses.default;
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Widget Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white text-black hover:bg-gray-200 rounded-full w-16 h-16 shadow-lg transition-all duration-300 hover:scale-110"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl z-50 border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="bg-black text-white p-4 rounded-t-lg">
            <div className="flex items-center space-x-3">
              <Bot className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">CLUB B2B Assistant</h3>
                <p className="text-xs text-gray-300">Online now</p>
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
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-black'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === 'bot' && <Bot className="w-4 h-4 mt-1 flex-shrink-0" />}
                    {message.sender === 'user' && <User className="w-4 h-4 mt-1 flex-shrink-0" />}
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-black px-4 py-2 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={language === 'fr' ? 'Tapez votre message...' : language === 'es' ? 'Escribe tu mensaje...' : 'Type your message...'}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                className="bg-black text-white hover:bg-gray-800"
                disabled={!inputMessage.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
