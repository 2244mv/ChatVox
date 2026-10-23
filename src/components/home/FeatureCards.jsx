import { PenLine, Lightbulb, BookOpen, ListChecks } from "lucide-react";

const features = [
  {
    title: "Write something",
    desc: "Draft a message, email, or professional bio",
    icon: PenLine,
    action: "writing",
  },

  {
    title: "Explore an idea",
    desc: "Brainstorm ideas and creative possibilities",
    icon: Lightbulb,
    action: "ideas",
  },

  {
    title: "Learn something new",
    desc: "Understand a topic with simple examples",
    icon: BookOpen,
    action: "learn",
  },

  {
    title: "Make a plan",
    desc: "Break a goal into clear, actionable steps",
    icon: ListChecks,
    action: "plan",
  },
];

const FeatureCards = ({ onAction }) => {
  return (
    <div className="flex h-full items-center justify-center p-6">
      <div className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-[#1C2B22] dark:bg-[#0A100D]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                onClick={() => onAction(item.action)}
                className="group cursor-pointer rounded-xl border border-gray-200 bg-gray-50 p-5 transition-all duration-300 hover:scale-[1.03] hover:border-[#39FF88] hover:bg-green-50 hover:shadow-[0_0_25px_rgba(57,255,136,0.25)] dark:border-[#1C2B22] dark:bg-[#050807] dark:hover:border-[#39FF88] dark:hover:bg-[#102A1C]"
              >
                <div className="flex items-center gap-3">
                  {/* Icon */}

                  <div className="rounded-lg bg-gray-100 p-2 transition group-hover:bg-[#39FF88] dark:bg-[#101A13]">
                    <Icon
                      className="text-gray-700 transition group-hover:text-[#041008] dark:text-gray-200"
                      size={20}
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeatureCards;
