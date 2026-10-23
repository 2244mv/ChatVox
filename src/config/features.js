import { FileText, Image, Upload, Globe, Brain, SlidersHorizontal } from "lucide-react";

export const AI_FEATURES = [
  {
    id: "pdf-chat",

    title: "PDF Chat",

    description: "Upload PDF files and ask questions from documents.",

    icon: FileText,

    status: "coming-soon",
  },

  {
    id: "image-understanding",

    title: "Image Understanding",

    description: "Analyze images and get AI-powered insights.",

    icon: Image,

    status: "coming-soon",
  },

  {
    id: "file-upload",

    title: "File Upload",

    description: "Upload documents and chat with your files.",

    icon: Upload,

    status: "coming-soon",
  },

  {
    id: "web-search",

    title: "Web Search",

    description: "Search the internet with AI assistance.",

    icon: Globe,

    status: "coming-soon",
  },

  {
    id: "multiple-models",

    title: "Multiple AI Models",

    description: "Switch between different AI models.",

    icon: Brain,

    status: "coming-soon",
  },

  {
    id: "custom-instructions",

    title: "Custom Instructions",

    description: "Personalize the assistant's response style and preferences.",

    icon: SlidersHorizontal,

    status: "coming-soon",
  },
];
