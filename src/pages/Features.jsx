import { Sparkles } from "lucide-react";

import { AI_FEATURES } from "../config/features";
import FeatureCard from "../components/features/FeatureCard";

const Features = () => {
  return (
    <div className="h-full overflow-y-auto bg-[#f7f7f8] p-6 text-gray-900 dark:bg-[#050807] dark:text-white">
      <div className="mx-auto max-w-6xl">
        {/* Header */}

        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-xl bg-[#39FF88]/20 p-3 text-[#39FF88] shadow-[0_0_25px_rgba(57,255,136,0.35)]">
            <Sparkles size={28} />
          </div>

          <div>
            <h1 className="text-3xl font-bold">AI Features</h1>

            <p className="text-gray-500 dark:text-gray-400">
              Explore upcoming AI capabilities
            </p>
          </div>
        </div>

        {/* Features */}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AI_FEATURES.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
