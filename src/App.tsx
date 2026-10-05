import React, { useState, useEffect } from 'react';
import { 
  Search, 
  AppWindow, 
  Maximize2, 
  Keyboard, 
  Tablet, 
  Settings2, 
  Sparkles, 
  Monitor, 
  Terminal, 
  Check, 
  HelpCircle,
  ExternalLink,
  Laptop,
  Flame,
  Key
} from 'lucide-react';
import { SpotlightModal } from './components/SpotlightModal';
import { TabletSimulator } from './components/TabletSimulator';
import { KeyDetector } from './components/KeyDetector';
import { AndroidGuide } from './components/AndroidGuide';
import { InteractiveQuestions } from './components/InteractiveQuestions';
import { AppItem, SAMPLE_APPS } from './data/appsData';

interface ActiveAppWindow {
  app: AppItem;
  mode: 'fullscreen' | 'windowed';
  windowId: string;
  zIndex: number;
  position: { x: number; y: number };
}

export default function App() {
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  const [defaultLaunchMode, setDefaultLaunchMode] = useState<'fullscreen' | 'windowed'>('windowed');
  const [dexMode, setDexMode] = useState(false);
  const [activeApps, setActiveApps] = useState<ActiveAppWindow[]>([
    {
      app: SAMPLE_APPS[0], // Samsung Notes
      mode: 'windowed',
      windowId: 'win-notes-1',
      zIndex: 10,
      position: { x: 30, y: 35 },
    },
    {
      app: SAMPLE_APPS[7], // Termux
      mode: 'windowed',
      windowId: 'win-termux-1',
      zIndex: 12,
      position: { x: 180, y: 80 },
    },
  ]);
  const [topZIndex, setTopZIndex] = useState(15);
  const [questionnaireState, setQuestionnaireState] = useState<{
    currentIndex: number;
    answers: Record<number, string>;
  }>({
    currentIndex: 4, // Question 5
    answers: { 1: 'A', 2: 'A', 3: 'B', 4: 'A' },
  });

  // Global keyboard shortcut to open Spotlight
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Win + Space, Alt + Space, or digital assistant key
      const isAssistantKey = 
        e.key === 'LaunchAssistant' || 
        e.code === 'LaunchAssistant' || 
        e.key === 'Search' || 
        e.keyCode === 231 || // KEYCODE_VOICE_ASSIST
        e.keyCode === 219;   // KEYCODE_ASSIST

      const isMacShortcut = (e.metaKey || e.ctrlKey) && e.code === 'Space';
      const isAltSpace = e.altKey && e.code === 'Space';

      if (isAssistantKey || isMacShortcut || isAltSpace) {
        e.preventDefault();
        setIsSpotlightOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLaunchApp = (app: AppItem, mode: 'fullscreen' | 'windowed') => {
    const newWindowId = `app-${app.id}-${Date.now()}`;
    const nextZ = topZIndex + 1;
    setTopZIndex(nextZ);

    if (mode === 'fullscreen') {
      // Close other fullscreen or replace
      setActiveApps((prev) => [
        ...prev.filter((a) => a.mode !== 'fullscreen'),
        {
          app,
          mode: 'fullscreen',
          windowId: newWindowId,
          zIndex: nextZ,
          position: { x: 0, y: 0 },
        },
      ]);
    } else {
      // Windowed (Samsung Pop-up View)
      const offset = (activeApps.length % 5) * 35 + 40;
      setActiveApps((prev) => [
        ...prev,
        {
          app,
          mode: 'windowed',
          windowId: newWindowId,
          zIndex: nextZ,
          position: { x: offset, y: offset },
        },
      ]);
    }
  };

  const handleCloseApp = (windowId: string) => {
    setActiveApps((prev) => prev.filter((a) => a.windowId !== windowId));
  };

  const handleMaximizeApp = (windowId: string) => {
    setActiveApps((prev) =>
      prev.map((a) => {
        if (a.windowId === windowId) {
          return {
            ...a,
            mode: a.mode === 'fullscreen' ? 'windowed' : 'fullscreen',
          };
        }
        return a;
      })
    );
  };

  const handleFocusApp = (windowId: string) => {
    const nextZ = topZIndex + 1;
    setTopZIndex(nextZ);
    setActiveApps((prev) =>
      prev.map((a) => (a.windowId === windowId ? { ...a, zIndex: nextZ } : a))
    );
  };

  const toggleDefaultLaunchMode = () => {
    setDefaultLaunchMode((prev) => (prev === 'fullscreen' ? 'windowed' : 'fullscreen'));
  };

  const handleExportConfig = () => {
    const config = {
      app_name: "Galaxy Spotlight",
      target_device: "Samsung Galaxy Tab S9 FE+",
      android_os: "Android 14 (One UI 6.x)",
      display: "12.4 inch WQXGA (2560x1600)",
      trigger_key: {
        type: "hardware_assistant_key",
        intent: "android.intent.action.ASSIST",
        keycodes: [231, 219, 84],
        fallback_shortcuts: ["Cmd+Space", "Alt+Space"]
      },
      launch_modes: {
        default: defaultLaunchMode,
        modifier: "Shift+Enter",
        windowed_spec: {
          width_ratio: 0.60,
          height_ratio: 0.75,
          centered: true,
          freeform_resizable: true,
          flags: ["FLAG_ACTIVITY_NEW_TASK", "FLAG_ACTIVITY_MULTIPLE_TASK"]
        }
      },
      search_providers: [
        "installed_applications",
        "device_storage_files",
        "samsung_notes_content",
        "quick_calculations",
        "unit_conversions",
        "web_search"
      ],
      ui_styling: {
        theme: "macos_frosted_dark",
        position: "centered_upper_third",
        backdrop: "backdrop-blur-2xl"
      }
    };

    const blob = new Blob([JSON.stringify(config, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "galaxy-spotlight-tab-s9-fe-plus.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Top Navigation Bar */}
      <header className="border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Search className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-white">
                  Galaxy Spotlight
                </h1>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Tab S9 FE+ Edition
                </span>
              </div>
              <p className="text-xs text-neutral-400 hidden sm:block">
                macOS Spotlight overlay with Fullscreen & Samsung Pop-up View multi-window launch
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Launch Mode Toggle Button */}
            <div className="flex items-center bg-neutral-800/80 p-1 rounded-xl border border-neutral-700/80">
              <button
                onClick={() => setDefaultLaunchMode('windowed')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  defaultLaunchMode === 'windowed'
                    ? 'bg-amber-500 text-neutral-950 font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Launch apps in floating Pop-up View windows"
              >
                <AppWindow className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Pop-up View</span>
                <span className="md:hidden">Window</span>
              </button>
              <button
                onClick={() => setDefaultLaunchMode('fullscreen')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  defaultLaunchMode === 'fullscreen'
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Launch apps in Fullscreen mode"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Fullscreen</span>
              </button>
            </div>

            {/* Quick Trigger Button */}
            <button
              onClick={() => setIsSpotlightOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs shadow-md shadow-blue-600/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Key className="w-3.5 h-3.5" />
              <span>Open Spotlight</span>
              <kbd className="hidden lg:inline bg-blue-700 px-1.5 py-0.5 rounded text-[10px] font-mono text-blue-100">
                Cmd+Space
              </kbd>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Device & Hardware Keyboard Status Banner */}
        <div className="bg-gradient-to-r from-blue-950/40 via-neutral-900 to-indigo-950/30 border border-blue-500/20 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-white">
                  Hardware Keyboard Connected
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Galaxy AI / Assistant Key
                </span>
                <span className="text-[11px] text-neutral-400">
                  Target: Samsung Galaxy Tab S9 FE+ (12.4" One UI 6)
                </span>
              </div>
              <p className="text-xs text-neutral-300 mt-1">
                Press the dedicated <strong>Assistant key</strong> on your keyboard to instantly summon the macOS-style Spotlight search box over any running app. Choose whether results launch in <strong>Fullscreen</strong> or <strong>Samsung Pop-up Windowed View</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsSpotlightOpen(true)}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium border border-white/10 transition-colors flex items-center gap-2"
            >
              <Search className="w-3.5 h-3.5 text-blue-400" />
              <span>Test Spotlight Overlay</span>
            </button>
          </div>
        </div>

        {/* Live Interactive Tablet Simulator */}
        <section>
          <TabletSimulator
            onOpenSpotlight={() => setIsSpotlightOpen(true)}
            activeApps={activeApps}
            onCloseApp={handleCloseApp}
            onMaximizeApp={handleMaximizeApp}
            onFocusApp={handleFocusApp}
            dexMode={dexMode}
            onToggleDexMode={() => setDexMode((d) => !d)}
            defaultLaunchMode={defaultLaunchMode}
            onToggleDefaultLaunchMode={toggleDefaultLaunchMode}
          />
        </section>

        {/* Two-Column Utility & Question Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Interactive Questionnaire - Configuration Summary */}
          <InteractiveQuestions
            currentQuestionIndex={questionnaireState.currentIndex}
            answers={questionnaireState.answers}
            onSelectOption={(qId, opt) => {
              setQuestionnaireState((prev) => ({
                ...prev,
                answers: { ...prev.answers, [qId]: opt },
              }));
            }}
            onExportConfig={handleExportConfig}
          />

          {/* Real-time Hardware Key Sniffer */}
          <KeyDetector onTriggerSpotlight={() => setIsSpotlightOpen(true)} />
        </section>

        {/* Android Architecture & Implementation Guide */}
        <section>
          <AndroidGuide />
        </section>
      </main>

      {/* macOS Style Spotlight Search Overlay Modal */}
      <SpotlightModal
        isOpen={isSpotlightOpen}
        onClose={() => setIsSpotlightOpen(false)}
        onLaunchApp={handleLaunchApp}
        defaultLaunchMode={defaultLaunchMode}
        onToggleDefaultLaunchMode={toggleDefaultLaunchMode}
      />

      {/* Footer */}
      <footer className="border-t border-neutral-800 bg-neutral-900/50 py-4 px-6 text-center text-xs text-neutral-500">
        Galaxy Tab S9 FE+ Spotlight Engine · Supports Samsung Pop-up View, DeX Multi-Window, and External Keyboard Assistant Keys
      </footer>
    </div>
  );
}
