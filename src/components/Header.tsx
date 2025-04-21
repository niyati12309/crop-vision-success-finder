
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="bg-agriculture-800 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-agriculture-600 flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M3 16V8a5 5 0 0 1 10 0v8"></path>
              <path d="M18 16V8a3 3 0 0 0-6 0v8"></path>
              <path d="M21 16V8a1 1 0 0 0-1-1h-2"></path>
              <line x1="21" y1="16" x2="3" y2="16"></line>
              <line x1="12" y1="16" x2="12" y2="21"></line>
              <path d="M9 21h6"></path>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold">CropVision</span>
            <span className="text-xs text-agriculture-200">Success Predictor</span>
          </div>
        </Link>
        <nav>
          <ul className="flex gap-6">
            <li>
              <Link to="/" className="text-agriculture-200 hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/predict" className="text-agriculture-200 hover:text-white transition">
                Predict
              </Link>
            </li>
            <li>
              <Link to="/identify" className="text-agriculture-200 hover:text-white transition">
                Identify Plants
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
