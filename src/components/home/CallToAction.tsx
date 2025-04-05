
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-sakha-blue to-sakha-purple">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-white max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Ready to transform your learning, career, and well-being journey?
            </h2>
            <p className="text-white/80 text-lg">
              Join thousands of users who are experiencing the benefits of an AI companion 
              that truly understands their needs and grows with them.
            </p>
          </div>
          
          <Button 
            className="bg-white hover:bg-gray-100 text-sakha-blue text-lg group px-8 py-6"
            asChild
          >
            <Link to="/signup" className="flex items-center gap-2">
              <span>Get Started with Sakha AI</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
