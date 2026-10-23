const GlassCard = ({ children }) => {
  return (
    <div
      className="
backdrop-blur-xl
bg-white/5
border
border-white/10
rounded-3xl
p-8
shadow-[0_0_40px_rgba(57,255,136,0.15)]
"
    >
      {children}
    </div>
  );
};

export default GlassCard;
