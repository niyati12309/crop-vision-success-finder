
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
              {/* simple sprout icon for farming theme */}
              <path d="M12 19V5M12 5l-2 2M12 5l2 2M10 7a7 7 0 1 0 4.001 7M14 7A7 7 0 0 1 9.999 14" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold">FarmSightAI</span>
            <span className="text-xs text-agriculture-200">Farming Success Predictor</span>
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
