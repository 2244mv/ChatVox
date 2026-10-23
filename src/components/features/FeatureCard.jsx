import { Sparkles } from "lucide-react";

const FeatureCard = ({ feature }) => {
  const Icon = feature.icon;

  return (
    <article
      className="group rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:scale-[1.03] hover:border-[#39FF88] hover:shadow-[0_0_30px_rgba(57,255,136,0.3)] dark:border-[#1C2B22] dark:bg-[#0A100D]"
    >
      {/* Header */}

      <div className="mb-4 flex items-start justify-between">
        <div className="rounded-xl bg-[#39FF88]/20 p-3 text-[#39FF88] transition group-hover:shadow-[0_0_20px_rgba(57,255,136,0.5)]">
          <Icon size={24} />
        </div>

        <span className="flex items-center gap-1 rounded-full bg-[#39FF88]/10 px-3 py-1 text-xs text-[#39FF88]">
          <Sparkles size={12} />
          Coming Soon
        </span>
      </div>

      {/* Content */}

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {feature.title}
      </h3>

      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        {feature.description}
      </p>
    </article>
  );
};

export default FeatureCard;
