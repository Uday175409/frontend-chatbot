export default function MessageBubble({ message, isAdmin }) {
  return (
    <div className={`flex mb-4 ${isAdmin ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${isAdmin ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
          isAdmin 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-600 text-gray-200'
        }`}>
          {isAdmin ? 'A' : 'U'}
        </div>

        {/* Message Bubble */}
        <div className={`px-4 py-2 rounded-lg shadow-sm ${
          isAdmin 
            ? 'bg-blue-600 text-white rounded-br-none' 
            : 'bg-gray-700 text-gray-100 rounded-bl-none'
        }`}>
          <p className="text-sm leading-relaxed break-words">{message.text}</p>
          <p className={`text-xs mt-1 ${
            isAdmin 
              ? 'text-blue-100' 
              : 'text-gray-400'
          }`}>
            {message.timestamp}
          </p>
        </div>
      </div>
    </div>
  );
}