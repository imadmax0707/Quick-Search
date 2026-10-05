import React, { useState, useEffect } from 'react';
import { Keyboard, Key, CheckCircle, Info, Sparkles, Terminal } from 'lucide-react';

interface KeyDetectorProps {
  onTriggerSpotlight: () => void;
}

export const KeyDetector: React.FC<KeyDetectorProps> = ({ onTriggerSpotlight }) => {
  const [lastKey, setLastKey] = useState<{
    key: string;
    code: string;
    keyCode: number;
    altKey: boolean;
    ctrlKey: boolean;
    metaKey: boolean;
    shiftKey: boolean;
    timestamp: string;
  } | null>(null);

  const [triggerCount, setTriggerCount] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Record any keypress
      setLastKey({
        key: e.key,
        code: e.code,
        keyCode: e.keyCode,
        altKey: e.altKey,
        ctrlKey: e.ctrlKey,
        metaKey: e.metaKey,
        shiftKey: e.shiftKey,
        timestamp: new Date().toLocaleTimeString(),
      });

      // Check if this matches Assistant key, Meta/Cmd + Space, or Alt + Space
      const isAssistantKey = 
        e.key === 'LaunchAssistant' || 
        e.code === 'LaunchAssistant' || 
        e.key === 'Assistant' || 
        e.key === 'Search' || 
        e.code === 'OSLeft' ||
        e.code === 'OSRight' ||
        e.keyCode === 231 || // Android KEYCODE_VOICE_ASSIST
        e.keyCode === 219 || // Android KEYCODE_ASSIST
        e.keyCode === 84;   // Android KEYCODE_SEARCH

      const isMacCmdSpace = (e.metaKey && e.code === 'Space') || (e.ctrlKey && e.code === 'Space');
      const isAltSpace = e.altKey && e.code === 'Space';

      if (isAssistantKey || isMacCmdSpace || isAltSpace) {
        // Prevent default browser search behavior if applicable
        e.preventDefault();
        setTriggerCount((c) => c + 1);
        onTriggerSpotlight();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onTriggerSpotlight]);

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Keyboard className="w-5 h-5 text-blue-400" />
            <h3 className="font-semibold text-sm text-neutral-100">
              Hardware Keyboard Keycode Sniffer
            </h3>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
            Active Listener
          </span>
        </div>

        <p className="text-xs text-neutral-400 mb-3 leading-relaxed">
          Press any key on your external keyboard (such as the <strong>Galaxy AI / Digital Assistant key</strong>, <kbd className="bg-neutral-800 px-1 py-0.5 rounded text-neutral-200">Cmd</kbd>, or <kbd className="bg-neutral-800 px-1 py-0.5 rounded text-neutral-200">Alt+Space</kbd>) to test hardware key event capture in real time.
        </p>

        {lastKey ? (
          <div className="bg-neutral-950 rounded-xl p-3 border border-neutral-800 space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between text-neutral-400">
              <span>Key: <strong className="text-white">{lastKey.key}</strong></span>
              <span>Code: <strong className="text-white">{lastKey.code}</strong></span>
              <span>KeyCode: <strong className="text-blue-400">{lastKey.keyCode}</strong></span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-neutral-400 pt-1 border-t border-neutral-800/80">
              <span className={lastKey.metaKey ? 'text-amber-400 font-semibold' : 'text-neutral-600'}>Meta/Cmd</span>
              <span>·</span>
              <span className={lastKey.altKey ? 'text-amber-400 font-semibold' : 'text-neutral-600'}>Alt/Option</span>
              <span>·</span>
              <span className={lastKey.ctrlKey ? 'text-amber-400 font-semibold' : 'text-neutral-600'}>Ctrl</span>
              <span>·</span>
              <span className={lastKey.shiftKey ? 'text-amber-400 font-semibold' : 'text-neutral-600'}>Shift</span>
              <span className="ml-auto text-neutral-500">{lastKey.timestamp}</span>
            </div>
          </div>
        ) : (
          <div className="p-3 bg-neutral-950/50 rounded-xl border border-dashed border-neutral-800 text-center text-xs text-neutral-500">
            Awaiting keypress from your tablet keyboard...
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-neutral-400">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>Spotlight Key Triggers: <strong className="text-white">{triggerCount}</strong></span>
        </div>

        <button
          onClick={onTriggerSpotlight}
          className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors flex items-center gap-1.5 shadow"
        >
          <Key className="w-3.5 h-3.5" />
          Simulate Assistant Key
        </button>
      </div>
    </div>
  );
};
