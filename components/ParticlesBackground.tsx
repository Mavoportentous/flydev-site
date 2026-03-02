"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export default function ParticlesBackground() {
    const [init, setInit] = useState(false);

    // Inicializar el motor de partículas una sola vez
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const options: ISourceOptions = {
        fpsLimit: 120,
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: "push", // Genera partículas extra al click
                },
                onHover: {
                    enable: true,
                    mode: "grab", // Crea las líneas de polígonos hacia el mouse
                },
            },
            modes: {
                grab: {
                    distance: 200,
                    links: {
                        opacity: 0.5,
                        color: "#22d3ee" // El cyan que elegimos
                    }
                },
                push: {
                    quantity: 4,
                },
            },
        },
        particles: {
            color: {
                value: "#22d3ee",
            },
            links: {
                color: "#22d3ee",
                distance: 150,
                enable: true,
                opacity: 0.2,
                width: 1,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "out",
                },
                random: false,
                speed: 1.2,
                straight: false,
            },
            number: {
                value: 100,
                limit: {
                    value: 250,
                },
                density: {
                    enable: true,
                },

            },
            opacity: {
                value: 0.4,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 3 },
            },
        },
        detectRetina: true,
        fullScreen: { enable: true, zIndex: -1 } // Siempre al fondo
    };

    if (init) {
        return <Particles id="tsparticles" options={options} />;
    }

    return null;
}