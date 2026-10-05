import React, { useState } from 'react';
import { 
  AppWindow, 
  Maximize2, 
  Minimize2, 
  X, 
  Wifi, 
  Battery, 
  Bell, 
  Grid, 
  Sparkles, 
  Monitor, 
  Layers, 
  RotateCcw,
  Search,
  ExternalLink,
  ChevronRight,
  Tablet,
  CheckCircle2,
  Terminal,
  FileText,
  Image,
  Globe,
  Sliders
} from 'lucide-react';
import { AppItem, SAMPLE_APPS } from '../data/appsData';

interface TabletSimulatorProps {
  onOpenSpotlight: () => void;
  activeApps: {
    app: AppItem;
    mode: 'fullscreen' | 'windowed';
    windowId: string;
    zIndex: number;
    position: { x: number; y: number };
  }[];
  onCloseApp: (windowId: string) => void;
  onMaximizeApp: (windowId: string) => void;
  onFocusApp: (windowId: string) => void;
  dexMode: boolean;
  onToggleDexMode: () => void;
  defaultLaunchMode: 'fullscreen' | 'windowed';
  onToggleDefaultLaunchMode: () => void;
}

export const TabletSimulator: React.FC<TabletSimulatorProps> = ({
  onOpenSpotlight,
  activeApps,
  onCloseApp,
  onMaximizeApp,
  onFocusApp,
  dexMode,
  onToggleDexMode,
  defaultLaunchMode,
  onToggleDefaultLaunchMode,
}) => {
  // Check if any app is running fullscreen
  const fullscreenApp = activeApps.find((a) => a.mode === 'fullscreen');
  const windowedApps = activeApps.filter((a) => a.mode === 'windowed');

  return (
    <div className="relative w-full rounded-2xl bg-neutral-950 p-2 sm:p-4 border border-neutral-800 shadow-2xl flex flex-col">
      {/* Tablet Hardware Top Frame Bar */}
      <div className="flex items-center justify-between pb-3 px-2 text-xs text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-neutral-200">Samsung Galaxy Tab S9 FE+</span>
          <span className="text-neutral-500">·</span>
          <span>12.4" 90Hz WQXGA Display (2560 × 1600)</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleDexMode}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors border ${
              dexMode
                ? 'bg-blue-600/20 text-blue-300 border-blue-500/30'
                : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700'
            }`}
          >
            {dexMode ? 'Samsung DeX Mode: ON' : 'Tablet Mode (One UI 6)'}
          </button>

          <button
            onClick={onToggleDefaultLaunchMode}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors border ${
              defaultLaunchMode === 'windowed'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
            }`}
          >
            Default: {defaultLaunchMode === 'windowed' ? 'Pop-up Windowed' : 'Full Screen'}
          </button>
        </div>
      </div>

      {/* Physical Tablet Bezel */}
      <div className="relative w-full aspect-[16/10] bg-neutral-900 rounded-xl border-4 border-neutral-800 shadow-inner overflow-hidden flex flex-col select-none">
        {/* Tablet Front Camera Centered on Top Bezel */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-neutral-800 border border-neutral-700 z-30" />

        {/* System Status Bar */}
        <div className="w-full h-7 bg-black/40 backdrop-blur-md px-4 flex items-center justify-between text-neutral-300 text-[11px] font-sans z-20 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-medium">10:59 AM</span>
            <span className="text-neutral-500">|</span>
            <span className="text-neutral-400">One UI 6.1 (Android 14)</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] text-amber-400/90 font-mono">
              Mode: {defaultLaunchMode === 'windowed' ? 'Pop-up View' : 'Full Screen'}
            </span>
            <div className="flex items-center gap-1.5 text-neutral-400">
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-3.5 h-3.5" />
              <span>94%</span>
            </div>
          </div>
        </div>

        {/* Tablet Screen Body (Wallpaper / Desktop or Fullscreen App) */}
        <div className="relative flex-1 bg-gradient-to-br from-slate-900 via-indigo-950 to-neutral-900 overflow-hidden flex flex-col">
          {/* Subtle Samsung DeX / One UI geometric wave wallpaper accent */}
          <div className="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(circle_at_30%_20%,#3b82f6_0,transparent_45%),radial-gradient(circle_at_80%_70%,#8b5cf6_0,transparent_50%)]" />

          {/* Fullscreen App Layer (if one is active) */}
          {fullscreenApp ? (
            <div className="absolute inset-0 bg-neutral-900 z-10 flex flex-col animate-in fade-in duration-150">
              {/* Top app control header */}
              <div className="h-10 bg-neutral-800/90 border-b border-neutral-700 px-4 flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: fullscreenApp.app.accentColor }}
                  />
                  <span className="font-medium">{fullscreenApp.app.name}</span>
                  <span className="text-[10px] text-neutral-400 font-mono">
                    (Running Fullscreen)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onMaximizeApp(fullscreenApp.windowId)}
                    className="p-1 hover:bg-white/10 rounded text-neutral-300"
                    title="Switch to Pop-up Window"
                  >
                    <AppWindow className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onCloseApp(fullscreenApp.windowId)}
                    className="p-1 hover:bg-red-500/20 hover:text-red-400 rounded text-neutral-300"
                    title="Close"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* App Body Simulator */}
              <div className="flex-1 p-6 flex flex-col items-center justify-center text-center text-neutral-300">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 shadow-lg"
                  style={{ backgroundColor: `${fullscreenApp.app.accentColor}25`, color: fullscreenApp.app.accentColor }}
                >
                  <Globe className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{fullscreenApp.app.name}</h3>
                <p className="text-xs text-neutral-400 max-w-md mb-4">{fullscreenApp.app.description}</p>
                <div className="flex items-center gap-2 text-xs bg-neutral-800/80 px-3 py-1.5 rounded-lg border border-neutral-700">
                  <span className="text-emerald-400">Active Fullscreen Android Activity</span>
                  <span className="text-neutral-500">·</span>
                  <code className="text-neutral-300 font-mono text-[10px]">{fullscreenApp.app.package}</code>
                </div>
              </div>
            </div>
          ) : (
            /* Desktop / Home Screen Grid */
            <div className="flex-1 p-6 z-0 flex flex-col justify-between">
              {/* Desktop Icons */}
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 max-w-2xl">
                {SAMPLE_APPS.slice(0, 8).map((app) => (
                  <button
                    key={app.id}
                    onClick={() => onOpenSpotlight()}
                    className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 transition-colors group text-center"
                  >
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md transition-transform group-hover:scale-105"
                      style={{ backgroundColor: `${app.accentColor}30`, color: app.accentColor }}
                    >
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] text-neutral-200 truncate w-16 group-hover:text-white font-medium">
                      {app.name}
                    </span>
                  </button>
                ))}
              </div>

              {/* Center Prompt / Keyboard reminder */}
              <div className="self-center bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 max-w-md text-center shadow-xl">
                <p className="text-xs text-neutral-300 mb-2">
                  Press the <strong className="text-white">Assistant / Search key</strong> on your Galaxy Tab keyboard, or press:
                </p>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <kbd className="px-2 py-1 bg-white/10 rounded border border-white/15 text-xs font-mono text-white">
                    Cmd / Win + Space
                  </kbd>
                  <span className="text-xs text-neutral-400">or</span>
                  <kbd className="px-2 py-1 bg-white/10 rounded border border-white/15 text-xs font-mono text-white">
                    Alt + Space
                  </kbd>
                </div>
                <button
                  onClick={onOpenSpotlight}
                  className="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium text-xs shadow-lg hover:from-blue-500 hover:to-indigo-500 transition-all flex items-center justify-center gap-2"
                >
                  <Search className="w-3.5 h-3.5" />
                  Trigger Spotlight Search Overlay
                </button>
              </div>
            </div>
          )}

          {/* Windowed Mode Apps (Samsung Pop-up View) */}
          {windowedApps.map((item) => (
            <div
              key={item.windowId}
              onMouseDown={() => onFocusApp(item.windowId)}
              style={{
                top: `${item.position.y}px`,
                left: `${item.position.x}px`,
                zIndex: item.zIndex,
              }}
              className="absolute w-[340px] sm:w-[420px] bg-neutral-900/95 border border-white/20 rounded-xl shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden transition-shadow"
            >
              {/* Samsung Pop-up View Window Header */}
              <div 
                className="h-8 bg-neutral-800/90 border-b border-white/10 px-3 flex items-center justify-between cursor-move select-none"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.app.accentColor }}
                  />
                  <span className="text-xs font-semibold text-neutral-200 truncate">
                    {item.app.name}
                  </span>
                  <span className="text-[10px] text-amber-400 font-mono">
                    Pop-up View
                  </span>
                </div>

                {/* Pop-up view window controls */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onMaximizeApp(item.windowId)}
                    className="p-1 hover:bg-white/10 text-neutral-400 hover:text-white rounded"
                    title="Maximize to Fullscreen"
                  >
                    <Maximize2 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => onCloseApp(item.windowId)}
                    className="p-1 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 rounded"
                    title="Close"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Pop-up view content */}
              <div className="p-4 text-xs text-neutral-300 min-h-[140px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-white">{item.app.category} Application</span>
                    <span className="text-[10px] text-neutral-400 font-mono">Android Windowed Intent</span>
                  </div>
                  <p className="text-neutral-400 text-xs leading-relaxed">
                    {item.app.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400">
                  <span className="font-mono text-[10px] truncate max-w-[200px]">{item.app.package}</span>
                  <span className="text-emerald-400 font-medium">Samsung Multi-Window</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Samsung Taskbar (DeX / One UI 6) */}
        <div className="h-10 bg-neutral-950/90 border-t border-white/10 px-3 flex items-center justify-between text-neutral-300 text-xs z-30 shrink-0">
          <div className="flex items-center gap-2">
            {/* Apps Drawer Icon */}
            <button 
              onClick={onOpenSpotlight}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white flex items-center gap-1.5"
              title="Click or hit Assistant key to search"
            >
              <Grid className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-medium hidden sm:inline">Spotlight</span>
            </button>

            {/* Running Apps Icons in Taskbar */}
            <div className="flex items-center gap-1.5 border-l border-neutral-700 pl-2">
              {activeApps.map((a) => (
                <button
                  key={a.windowId}
                  onClick={() => onFocusApp(a.windowId)}
                  className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-[11px] text-neutral-200 flex items-center gap-1.5"
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: a.app.accentColor }}
                  />
                  <span className="truncate max-w-[80px]">{a.app.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick status controls */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-neutral-500 font-mono hidden md:inline">
              Tablet S9 FE+ Keyboard Assistant Hook
            </span>
            <button
              onClick={onOpenSpotlight}
              className="p-1.5 hover:bg-white/10 rounded-lg text-neutral-300 hover:text-white"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
