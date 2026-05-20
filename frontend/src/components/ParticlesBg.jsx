import Particles from "@tsparticles/react";
import { loadSlim} from "tsparticles/slim";

export default function ParticlesBg() {
  const particlesInit = async (engine) => {
  await loadSlim(engine);
};

  return (
    <Particles
      init={particlesInit}
      options={{
        background: { color: "transparent" },
        particles: {
          number: { value: 40 },
          color: { value: "#a5b4fc" },
          opacity: { value: 0.3 },
          size: { value: 3 },
          move: {
            enable: true,
            speed: 1,
          },
        },
      }}
      className="absolute inset-0 -z-10"
    />
  );
}
