import MainLayout from "../components/layout/MainLayout";

import AIOrb from "../components/orb/AIOrb";

import Waveform from "../components/voice/Waveform";

import VoiceButton from "../components/voice/VoiceButton";

import StopButton from "../components/voice/StopButton";

import StatusText from "../components/ui/StatusText";

import SettingsPanel from "../components/settings/SettingsPanel";

import ErrorMessage from "../components/ui/ErrorMessage";

const Home = () => {
  return (
    <MainLayout>
      <ErrorMessage />

      <SettingsPanel />

      <div
        className="
relative
min-h-screen
w-full
flex
flex-col
items-center
justify-center
px-6
"
      >
        {/* Logo */}

        <h1
          className="
absolute
top-10
text-4xl
font-bold
tracking-[18px]
text-white
"
        >
          SHIFRA
        </h1>

        {/* AI CORE */}

        <div
          className="
relative
flex
items-center
justify-center
"
        >
          <div
            className="
absolute
w-100
h-100
rounded-full
bg-[#39FF88]
opacity-20
blur-[140px]
"
          />

          <AIOrb />
        </div>

        <Waveform />

        <StatusText />

        <div
          className="
flex
items-center
gap-6
mt-8
"
        >
          <VoiceButton />

          <StopButton />
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
