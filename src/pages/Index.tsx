import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative">
          <div className="bg-agriculture-800 text-white py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Welcome to <span className="text-agriculture-200">FarmSightAI</span>
                </h1>
                <p className="text-xl mb-8 text-agriculture-100">
                  Maximize your harvest with <b>FarmSightAI</b>'s intelligent analytics powered by real weather and soil data.
                  Predict crop suitability, compatibility scores, and get the best farming recommendations for your land.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/predict">
                    <Button className="bg-agriculture-600 hover:bg-agriculture-700 text-white px-6 py-3 text-lg">
                      Predict Crop Success
                    </Button>
                  </Link>
                  <Link to="/identify">
                    <Button variant="outline" className="bg-white text-agriculture-800 hover:bg-agriculture-50 px-6 py-3 text-lg">
                      Identify Plants
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-agriculture-800 mb-12">
            Key Features
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md border border-agriculture-100">
              <div className="w-12 h-12 bg-agriculture-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-agriculture-600">
                  <path d="M4 7c0-3 2-4 5-4s5 1 5 4-2 3-5 3-5 0-5-3z"></path>
                  <path d="M14 7c0-3 2-4 5-4s5 1 5 4-2 3-5 3-5 0-5-3z"></path>
                  <path d="M4 14c0 3 2 5 5 5s5-2 5-5-2-3-5-3-5-2-5 3z"></path>
                  <path d="M14 14c0 3 2 5 5 5s5-2 5-5-2-3-5-3-5-2-5 3z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-agriculture-800 mb-2">
                Crop Suitability Analysis
              </h3>
              <p className="text-agriculture-600">
                Get accurate predictions on how well specific crops will perform in your location based on soil, climate, and seasonal factors.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md border border-agriculture-100">
              <div className="w-12 h-12 bg-agriculture-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-agriculture-600">
                  <path d="M9 12h.01"></path>
                  <path d="M15 12h.01"></path>
                  <path d="M10 16c.5.3 1.5.5 2 .5s1.5-.2 2-.5"></path>
                  <path d="M19 6V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v1"></path>
                  <path d="M12 2v1"></path>
                  <path d="M3 10h18"></path>
                  <path d="M3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-agriculture-800 mb-2">
                Plant Identification
              </h3>
              <p className="text-agriculture-600">
                Upload and crop photos of plants to instantly identify them with our advanced AI system that recognizes various crop species.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md border border-agriculture-100">
              <div className="w-12 h-12 bg-agriculture-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-agriculture-600">
                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                  <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-agriculture-800 mb-2">
                Soil Compatibility Score
              </h3>
              <p className="text-agriculture-600">
                Receive detailed soil compatibility scores that rate how well your soil conditions match the requirements of specific crops.
              </p>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 bg-agriculture-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-agriculture-800 mb-12">
              How It Works
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 relative">
                {/* Connecting line */}
                <div className="hidden md:block absolute h-0.5 bg-agriculture-200 top-16 left-[20%] right-[20%] z-0"></div>
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-agriculture-600 text-white rounded-full flex items-center justify-center mb-4 font-bold text-xl">
                    1
                  </div>
                  <h3 className="text-xl font-semibold text-agriculture-800 mb-2">
                    Input Your Data
                  </h3>
                  <p className="text-agriculture-600">
                    Select your crop, location, and season or upload a plant image for identification.
                  </p>
                </div>
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-agriculture-600 text-white rounded-full flex items-center justify-center mb-4 font-bold text-xl">
                    2
                  </div>
                  <h3 className="text-xl font-semibold text-agriculture-800 mb-2">
                    AI Analysis
                  </h3>
                  <p className="text-agriculture-600">
                    Our AI processes your data against extensive agricultural datasets and climate records.
                  </p>
                </div>
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-agriculture-600 text-white rounded-full flex items-center justify-center mb-4 font-bold text-xl">
                    3
                  </div>
                  <h3 className="text-xl font-semibold text-agriculture-800 mb-2">
                    Get Results
                  </h3>
                  <p className="text-agriculture-600">
                    Receive detailed predictions, crop identification, and actionable recommendations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="p-8 md:p-12">
                <h2 className="text-2xl font-bold text-agriculture-800 mb-4">
                  Start Optimizing Your Crop Selection Today
                </h2>
                <p className="text-agriculture-600 mb-6">
                  Use our tools to make data-driven decisions for better yields and sustainable farming practices.
                </p>
                <div className="flex gap-4">
                  <Link to="/predict">
                    <Button className="bg-agriculture-600 hover:bg-agriculture-700 text-white">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="bg-agriculture-100 md:w-1/3 flex items-center justify-center p-8">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-agriculture-800">
                  <path d="M3 7c0-3 2-4 5-4s5 1 5 4-2 3-5 3-5 0-5-3z"></path>
                  <path d="M14 7c0-3 2-4 5-4s5 1 5 4-2 3-5 3-5 0-5-3z"></path>
                  <path d="M4 14c0 3 2 5 5 5s5-2 5-5-2-3-5-3-5-2-5 3z"></path>
                  <path d="M14 14c0 3 2 5 5 5s5-2 5-5-2-3-5-3-5-2-5 3z"></path>
                </svg>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-agriculture-800 text-white py-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-agriculture-200">
            © 2025 FarmSightAI Success Predictor | Hackathon Project Demo
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
