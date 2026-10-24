"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type AudioGraph = {
  context: AudioContext;
  noise: AudioBufferSourceNode;
  gain: GainNode;
};

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [entered, setEntered] = useState(false);
  const [closing, setClosing] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const audio = useRef<AudioGraph | null>(null);

  useEffect(() => {
    if (window.sessionStorage.getItem("cold-ashtray-entered") === "yes") {
      setEntered(true);
    }
  }, []);

  const stopSound = useCallback(() => {
    const graph = audio.current;
    if (!graph) return;
    graph.gain.gain.setTargetAtTime(0, graph.context.currentTime, 0.08);
    window.setTimeout(() => {
      graph.noise.stop();
      void graph.context.close();
    }, 260);
    audio.current = null;
    setSoundOn(false);
  }, []);

  useEffect(() => stopSound, [stopSound]);

  const startSound = useCallback(() => {
    const AudioContextClass = window.AudioContext;
    const context = new AudioContextClass();
    const seconds = 2;
    const buffer = context.createBuffer(1, context.sampleRate * seconds, context.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let index = 0; index < data.length; index += 1) {
      const white = Math.random() * 2 - 1;
      last = last * 0.985 + white * 0.015;
      data[index] = last;
    }
    const noise = context.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    const filter = context.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 190;
    const gain = context.createGain();
    gain.gain.setValueAtTime(0, context.currentTime);
    gain.gain.linearRampToValueAtTime(0.035, context.currentTime + 0.8);
    noise.connect(filter).connect(gain).connect(context.destination);
    noise.start();

    const bell = context.createOscillator();
    const bellGain = context.createGain();
    bell.type = "sine";
    bell.frequency.setValueAtTime(146, context.currentTime);
    bell.frequency.exponentialRampToValueAtTime(92, context.currentTime + 0.7);
    bellGain.gain.setValueAtTime(0.0001, context.currentTime);
    bellGain.gain.exponentialRampToValueAtTime(0.045, context.currentTime + 0.03);
    bellGain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.95);
    bell.connect(bellGain).connect(context.destination);
    bell.start();
    bell.stop(context.currentTime + 1);

    audio.current = { context, noise, gain };
    setSoundOn(true);
  }, []);

  const toggleSound = () => {
    if (soundOn) stopSound();
    else startSound();
  };

  const enter = () => {
    setClosing(true);
    window.sessionStorage.setItem("cold-ashtray-entered", "yes");
    window.setTimeout(() => {
      document.documentElement.dataset.archiveEntered = "true";
      setEntered(true);
    }, 480);
  };

  return (
    <>
      <div className="site-noise" aria-hidden="true" />
      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="cold.ashtray home">
          cold<span>.</span>ashtray
        </Link>
        <nav aria-label="Primary navigation">
          <Link className={pathname === "/" ? "active" : ""} href="/">
            Works
          </Link>
          <Link className={pathname === "/archive" ? "active" : ""} href="/archive">
            Archive
          </Link>
          <Link className={pathname === "/writings" ? "active" : ""} href="/writings">
            Writings
          </Link>
        </nav>
        <button
          className="sound-toggle"
          type="button"
          onClick={toggleSound}
          aria-pressed={soundOn}
        >
          <span className={soundOn ? "sound-mark active" : "sound-mark"} aria-hidden="true" />
          Sound {soundOn ? "on" : "off"}
        </button>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div>
          <span>cold.ashtray</span>
          <small>Drawings &amp; writings · 2025—2026</small>
        </div>
        <a href="https://www.instagram.com/cold.ashtray/" target="_blank" rel="noreferrer">
          Instagram ↗
        </a>
      </footer>
      {!entered ? (
        <section
          className={`entry-gate ${closing ? "is-closing" : ""}`}
          aria-labelledby="entry-gate-title"
          aria-modal="true"
          role="dialog"
        >
          <div className="gate-architecture" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <div className="gate-copy">
            <p className="eyebrow">A private first exhibition</p>
            <h1 id="entry-gate-title">
              cold<span>.</span>ashtray
            </h1>
            <p className="gate-description">Drawings, fragments, and writings.</p>
            <p className="content-note">
              This archive contains anatomical, nude, and disturbing imagery.
            </p>
            <button type="button" onClick={enter} autoFocus>
              Enter the archive <span aria-hidden="true">↓</span>
            </button>
          </div>
        </section>
      ) : null}
    </>
  );
}
