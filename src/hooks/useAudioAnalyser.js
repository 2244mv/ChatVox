import { useRef, useState } from "react";

const useAudioAnalyser = () => {
  const [levels, setLevels] = useState(Array(7).fill(10));

  const audioContextRef = useRef(null);

  const analyserRef = useRef(null);

  const animationRef = useRef(null);

  const startAnalyser = async () => {
    try {
      if (
        audioContextRef.current &&
        audioContextRef.current.state !== "closed"
      ) {
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      audioContextRef.current = new (
        window.AudioContext || window.webkitAudioContext
      )();

      const source = audioContextRef.current.createMediaStreamSource(stream);

      analyserRef.current = audioContextRef.current.createAnalyser();

      analyserRef.current.fftSize = 64;

      source.connect(analyserRef.current);

      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);

      const update = () => {
        if (!analyserRef.current) return;

        analyserRef.current.getByteFrequencyData(dataArray);

        const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;

        setLevels(
          Array(7)
            .fill(0)
            .map(() => Math.max(8, average / 2)),
        );

        animationRef.current = requestAnimationFrame(update);
      };

      update();
    } catch (error) {
      console.log("Audio analyser error:", error);
    }
  };

  const stopAnalyser = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);

      animationRef.current = null;
    }

    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close();
    }

    audioContextRef.current = null;

    analyserRef.current = null;

    setLevels(Array(7).fill(10));
  };

  return {
    levels,

    startAnalyser,

    stopAnalyser,
  };
};

export default useAudioAnalyser;
