
import { OnboardingProvider } from "@/components/signup/OnboardingContext";
import SignUpContent from "@/components/signup/SignupContent";
import { motion } from "framer-motion";

const SignUp = () => {
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
