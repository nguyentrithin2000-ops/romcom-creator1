"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Thêm để xử lý Back
import { Column } from "@once-ui-system/core";
import {
  CreationScreen,
  creationSteps,
  initialCharacters,
  initialCreationForm,
  initialHaoCam,
  initialHeartbeat,
  LandingScreen,
  type Screen,
  type StoryBeat,
  type StoryChoice,
  StoryScreen,
  storyBeats,
  templateOptions,
  TrollScreen,
} from "@/components/romcom-ui";

const clampAffection = (value: number) => Math.max(0, Math.min(100, value));

const TROLL_SCREEN_ENABLED = process.env.NEXT_PUBLIC_TROLL_SCREEN_ENABLED === "true";

const getCurrentBeat = (index: number): StoryBeat => {
  const safeIndex = Math.max(0, Math.min(index, storyBeats.length - 1));
  return storyBeats[safeIndex];
};

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // --- QUẢN LÝ STATE ---
  const [screen, setScreen] = useState<Screen>("landing");
  const [creationStep, setCreationStep] = useState(0);
  const [creationForm, setCreationForm] = useState(initialCreationForm);
  const [heartbeat, setHeartbeat] = useState(initialHeartbeat);
  const [haoCam, setHaoCam] = useState(initialHaoCam);
  const [characters, setCharacters] = useState(initialCharacters);
  const [storyIndex, setStoryIndex] = useState(0);
  const [customAction, setCustomAction] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAffectionPanelOpen, setIsAffectionPanelOpen] = useState(false);

  // --- 1. LOGIC AUTO-SAVE (LOCALSTORAGE) ---
  // Load dữ liệu khi vào trang
  useEffect(() => {
    const savedData = localStorage.getItem("romcom_progress");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setScreen(parsed.screen || "landing");
      setCreationStep(parsed.creationStep || 0);
      setCreationForm(parsed.creationForm || initialCreationForm);
      setHeartbeat(parsed.heartbeat ?? initialHeartbeat);
      setHaoCam(parsed.haoCam ?? initialHaoCam);
      setCharacters(parsed.characters || initialCharacters);
      setStoryIndex(parsed.storyIndex || 0);
    }
  }, []);

  // Lưu dữ liệu mỗi khi có thay đổi
  useEffect(() => {
    const dataToSave = {
      screen, creationStep, creationForm, heartbeat, haoCam, characters, storyIndex
    };
    localStorage.setItem("romcom_progress", JSON.stringify(dataToSave));
  }, [screen, creationStep, creationForm, heartbeat, haoCam, characters, storyIndex]);

  // --- 2. LOGIC ĐIỀU HƯỚNG (BACK BUTTON) ---
  const updateScreen = (newScreen: Screen) => {
    setScreen(newScreen);
    router.push(`?screen=${newScreen}`, { scroll: false });
  };

  useEffect(() => {
    const screenParam = searchParams.get("screen") as Screen;
    if (screenParam && screenParam !== screen) {
      setScreen(screenParam);
    }
  }, [searchParams]);

  // --- CÁC LOGIC GAME ---
  const beat = useMemo(() => getCurrentBeat(storyIndex), [storyIndex]);
  const chapterAnimationKey = `${beat.id}-${storyIndex}`;

  useEffect(() => {
    if (screen !== "story" || !TROLL_SCREEN_ENABLED) return;
    const timer = window.setTimeout(() => updateScreen("troll"), 5000);
    return () => window.clearTimeout(timer);
  }, [screen]);

  const resetStoryState = () => {
    setHeartbeat(initialHeartbeat);
    setHaoCam(initialHaoCam);
    setCharacters(initialCharacters);
    setStoryIndex(0);
    setCustomAction("");
    setIsProcessing(false);
    setIsAffectionPanelOpen(false);
    localStorage.removeItem("romcom_progress"); // Xóa khi chơi mới
  };

  const goToCreation = () => {
    setCreationStep(0);
    updateScreen("creation");
  };

  const applyChoice = (choice: StoryChoice) => {
    if (isProcessing || heartbeat <= 0) return;
    setHeartbeat((prev) => Math.max(0, prev - choice.heartbeatCost));
    setIsProcessing(true);

    window.setTimeout(() => {
      setCharacters((prev) =>
        prev.map((char) => ({
          ...char,
          affection: clampAffection(char.affection + (choice.affectionDelta[char.id] ?? 0)),
        }))
      );
      setHaoCam((prev) => Math.max(0, prev + choice.haoCamDelta));
      setStoryIndex((prev) => (prev + 1 >= storyBeats.length ? 0 : prev + 1));
      setCustomAction("");
      setIsProcessing(false);
    }, 1050);
  };

  const handlePresetChoice = (choiceId: string) => {
    const choice = beat.choices.find((item) => item.id === choiceId);
    if (choice) applyChoice(choice);
  };

  const handleSubmitCustomAction = () => {
    if (customAction.trim().length === 0 || isProcessing || heartbeat <= 0) return;
    applyChoice({
      id: `custom-${beat.id}`,
      label: customAction,
      heartbeatCost: 1,
      haoCamDelta: 4,
      affectionDelta: { "an-nhien": 2, "minh-thu": 2, "khanh-linh": 2 },
    });
  };

  const handleSelectTemplate = (templateId: string) => {
    const picked = templateOptions.find((t) => t.id === templateId);
    if (picked) {
      setCreationForm((prev) => ({ ...prev, worldDescription: picked.quickPrompt }));
      goToCreation();
    } else {
      goToCreation();
    }
  };

  return (
    <Column
      fillWidth
      center
      style={{
        minHeight: "100dvh",
        padding: "clamp(1.25rem, 4vw, 2rem) clamp(1rem, 4vw, 2.5rem)",
      }}
    >
      <Column
        fillWidth
        maxWidth="xl"
        border="neutral-alpha-medium"
        background="surface"
        radius="xl"
        shadow="l"
        style={{ padding: "clamp(1.25rem, 4vw, 2rem)", gap: "clamp(1.25rem, 4vw, 2rem)" }}
      >
        {screen === "landing" && (
          <LandingScreen
            haoCam={haoCam}
            templates={templateOptions}
            onQuickStart={goToCreation}
            onSelectTemplate={handleSelectTemplate}
          />
        )}

        {screen === "creation" && (
          <CreationScreen
            steps={creationSteps}
            currentStep={creationStep}
            form={creationForm}
            onChangeForm={(field, value) => setCreationForm((p) => ({ ...p, [field]: value }))}
            onBack={() => {
              if (creationStep > 0) {
                setCreationStep((p) => p - 1);
              } else {
                updateScreen("landing");
              }
            }}
            onNextStep={() => setCreationStep((p) => Math.min(p + 1, creationSteps.length - 1))}
            onSubmit={() => {
              resetStoryState();
              updateScreen("story");
            }}
          />
        )}

        {screen === "story" && (
          <StoryScreen
            beat={beat}
            characters={characters}
            heartbeat={heartbeat}
            haoCam={haoCam}
            customAction={customAction}
            isProcessing={isProcessing}
            chapterAnimationKey={chapterAnimationKey}
            isAffectionPanelOpen={isAffectionPanelOpen}
            onToggleAffectionPanel={() => setIsAffectionPanelOpen((p) => !p)}
            onSelectChoice={handlePresetChoice}
            onCustomActionChange={setCustomAction}
            onSubmitCustomAction={handleSubmitCustomAction}
          />
        )}

        {screen === "troll" && (
          <TrollScreen
            onExit={() => {
              resetStoryState();
              updateScreen("landing");
            }}
          />
        )}
      </Column>
      {/* Các lớp Gradient giữ nguyên */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '50%', background: 'radial-gradient(ellipse at top right, var(--once-brand-alpha-weak), transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '35%', height: '45%', background: 'radial-gradient(ellipse at bottom left, var(--once-accent-alpha-weak), transparent)', pointerEvents: 'none' }} />
    </Column>
  );
}
