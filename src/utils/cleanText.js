export const cleanText = (text) => {
  if (!text) return "";

  return (
    text

      // Remove bold markdown **
      .replace(/\*\*(.*?)\*\*/g, "$1")

      // Remove italic markdown *
      .replace(/\*(.*?)\*/g, "$1")

      // Remove markdown headings
      .replace(/^#+\s/gm, "")

      // Remove code blocks
      .replace(/```[\s\S]*?```/g, "")

      .trim()
  );
};
