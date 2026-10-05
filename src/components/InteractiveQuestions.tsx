import React from 'react';
import { CheckCircle2, Sparkles, Check, Download, Layers, ShieldCheck, Terminal, Smartphone } from 'lucide-react';

interface InteractiveQuestionsProps {
  currentQuestionIndex: number;
  answers: Record<number, string>;
  onSelectOption: (questionId: number, optionLetter: string) => void;
  onExportConfig: () => void;
}

export const InteractiveQuestions: React.FC<InteractiveQuestionsProps> = ({
  answers,
  onExportConfig,
}) => {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3 border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shadow">
              ✓
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Configuration Complete · All 5 Specifications Set
            </span>
          </div>

          <span className="text-[11px] font-mono text-neutral-400 bg-white/5 px-2 py-0.5 rounded">
            Tab S9 FE+ Ready
          </span>
        </div>

        <h3 className="text-sm sm:text-base font-bold text-white mb-2">
          Galaxy Spotlight Configuration Summary
        </h3>
        <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
          Your custom macOS-style Spotlight application for Samsung Galaxy Tab S9 FE+ is fully configured with your selected options:
        </p>

        {/* 5 Configured Specifications */}
        <div className="space-y-2.5">
          <div className="p-2.5 rounded-xl bg-neutral-950/70 border border-neutral-800 flex items-start gap-2.5 text-xs">
            <div className="w-5 h-5 rounded-md bg-blue-600/20 text-blue-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
              1
            </div>
            <div>
              <strong className="text-neutral-200">Trigger Mechanism:</strong>{' '}
              <span className="text-neutral-400">
                Default Digital Assistant App (Android <code className="text-blue-300">ACTION_ASSIST</code>), 0% idle battery drain, hardware key captured over any app.
              </span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-neutral-950/70 border border-neutral-800 flex items-start gap-2.5 text-xs">
            <div className="w-5 h-5 rounded-md bg-blue-600/20 text-blue-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
              2
            </div>
            <div>
              <strong className="text-neutral-200">Mode Switching:</strong>{' '}
              <span className="text-neutral-400">
                <kbd className="bg-neutral-800 px-1 py-0.5 rounded text-white font-mono">↵ Enter</kbd> launches Default mode, while{' '}
                <kbd className="bg-neutral-800 px-1 py-0.5 rounded text-white font-mono">⇧ Shift + ↵ Enter</kbd> launches Alternate mode (Fullscreen $\leftrightarrow$ Pop-up).
              </span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-neutral-950/70 border border-neutral-800 flex items-start gap-2.5 text-xs">
            <div className="w-5 h-5 rounded-md bg-blue-600/20 text-blue-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
              3
            </div>
            <div>
              <strong className="text-neutral-200">Search Extensibility:</strong>{' '}
              <span className="text-neutral-400">
                Full support for installed apps + device local storage files &amp; Samsung Notes titles and content.
              </span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-neutral-950/70 border border-neutral-800 flex items-start gap-2.5 text-xs">
            <div className="w-5 h-5 rounded-md bg-blue-600/20 text-blue-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
              4
            </div>
            <div>
              <strong className="text-neutral-200">Visual Overlay:</strong>{' '}
              <span className="text-neutral-400">
                Classic macOS / Raycast Centered Floating Modal with deep frosted-glass blur (<code className="text-blue-300">backdrop-blur-2xl</code>).
              </span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-neutral-950/70 border border-neutral-800 flex items-start gap-2.5 text-xs">
            <div className="w-5 h-5 rounded-md bg-blue-600/20 text-blue-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
              5
            </div>
            <div>
              <strong className="text-neutral-200">Pop-up View Windowing:</strong>{' '}
              <span className="text-neutral-400">
                Centered medium Pop-up Window (60% width, 75% height) with Samsung One UI freeform drag &amp; resize handles.
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-neutral-800 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Ready for Android APK Build &amp; One UI 6 Deployment</span>
        </div>

        <button
          onClick={onExportConfig}
          className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors flex items-center gap-1.5 shadow"
        >
          <Download className="w-3.5 h-3.5" />
          Download Android Manifest &amp; Kotlin Source
        </button>
      </div>
    </div>
  );
};
