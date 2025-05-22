
import { OnboardingProvider } from "@/components/signup/OnboardingContext";
import SignUpContent from "@/components/signup/SignupContent";
import { motion } from "framer-motion";
import { useEffect } from "react";

const SignUp = () => {
  // Initialize speech recognition API access on page load
  useEffect(() => {
    // Request microphone permission early to ensure voice assistance works
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => console.log("Microphone access granted"))
        .catch(() => console.log("Microphone access denied"));
    }
    
    // Create event to let components know voice should be ready
    document.dispatchEvent(new CustomEvent('voice-ready'));
  }, []);

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-sky-100/30 via-white to-violet-100/30 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <OnboardingProvider>
        <SignUpContent />
      </OnboardingProvider>
    </motion.div>
  );
};

export default SignUp;
