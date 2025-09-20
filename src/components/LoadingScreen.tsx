interface LoadingScreenProps {
    message: string;
  }
  
  export function LoadingScreen({ message }: LoadingScreenProps) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-stone-50 via-white to-amber-50/30 flex items-center justify-center z-50">
        <div className="text-center space-y-6">
          {/* Loading message */}
          <h1 className="text-4xl lg:text-6xl text-stone-900 tracking-tight leading-tight font-light">
            {message}
          </h1>
          
          {/* Loading animation */}
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-amber-600 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-orange-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-amber-800 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }