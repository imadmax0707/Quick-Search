import React, { useState } from 'react';
import { 
  Code2, 
  Layers, 
  Smartphone, 
  Sliders, 
  Check, 
  Copy, 
  ShieldCheck, 
  Cpu, 
  ExternalLink 
} from 'lucide-react';

export const AndroidGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'assistant' | 'popup' | 'overlay'>('assistant');
  const [copied, setCopied] = useState<string | null>(null);

  const copyCode = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const assistantCode = `// 1. AndroidManifest.xml: Register as the Digital Assistant app
<activity
    android:name=".SpotlightActivity"
    android:theme="@style/Theme.Spotlight.Translucent"
    android:launchMode="singleTop"
    android:excludeFromRecents="true"
    android:exported="true">
    <intent-filter>
        <action android:name="android.intent.action.ASSIST" />
        <category android:name="android.intent.category.DEFAULT" />
    </intent-filter>
    <intent-filter>
        <action android:name="android.intent.action.VOICE_ASSIST" />
        <category android:name="android.intent.category.DEFAULT" />
    </intent-filter>
</activity>

// 2. Setting on your Galaxy Tab S9 FE+:
// Settings -> Apps -> Choose default apps -> Digital assistant app -> Select SpotlightTab`;

  const popupCode = `// Launching in Samsung Pop-up View (Freeform Windowed Mode)
fun launchApp(context: Context, packageName: String, mode: LaunchMode) {
    val pm = context.packageManager
    val launchIntent = pm.getLaunchIntentForPackage(packageName) ?: return

    launchIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)

    if (mode == LaunchMode.WINDOWED) {
        // Multi-window pop-up view support for Samsung One UI & DeX
        launchIntent.addFlags(Intent.FLAG_ACTIVITY_MULTIPLE_TASK)
        
        // Define centered floating window bounds (e.g., 680x860 dp on 12.4" screen)
        val displayMetrics = context.resources.displayMetrics
        val width = (displayMetrics.widthPixels * 0.55).toInt()
        val height = (displayMetrics.heightPixels * 0.70).toInt()
        val left = (displayMetrics.widthPixels - width) / 2
        val top = (displayMetrics.heightPixels - height) / 2

        val bounds = Rect(left, top, left + width, top + height)
        val options = ActivityOptions.makeBasic()
        options.launchBounds = bounds

        context.startActivity(launchIntent, options.toBundle())
    } else {
        // Standard Fullscreen launch
        context.startActivity(launchIntent)
    }
}`;

  const overlayCode = `// WindowManager Floating Overlay Service (Alternative to Translucent Activity)
val params = WindowManager.LayoutParams(
    WindowManager.LayoutParams.MATCH_PARENT,
    WindowManager.LayoutParams.WRAP_CONTENT,
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O)
        WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
    else
        WindowManager.LayoutParams.TYPE_PHONE,
    WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL or
    WindowManager.LayoutParams.FLAG_WATCH_OUTSIDE_TOUCH,
    PixelFormat.TRANSLUCENT
).apply {
    gravity = Gravity.TOP or Gravity.CENTER_HORIZONTAL
    y = 120 // offset from top bezel
}

windowManager.addView(spotlightView, params)`;

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-indigo-400" />
          <h3 className="font-semibold text-sm text-neutral-100">
            Android One UI Architecture & Native Engine
          </h3>
        </div>
        <span className="text-[11px] text-neutral-400 font-mono">
          Samsung Galaxy Tab S9 FE+
        </span>
      </div>

      <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
        To launch on the Galaxy Tab S9 FE+ hardware keyboard's Assistant key and display over active apps, the native Android companion utilizes these core Android subsystems:
      </p>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-3 border-b border-neutral-800 pb-2">
        <button
          onClick={() => setActiveTab('assistant')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'assistant'
              ? 'bg-neutral-800 text-white font-semibold'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          1. Assistant Key Hook
        </button>
        <button
          onClick={() => setActiveTab('popup')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'popup'
              ? 'bg-neutral-800 text-white font-semibold'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          2. Fullscreen vs Pop-up View
        </button>
        <button
          onClick={() => setActiveTab('overlay')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'overlay'
              ? 'bg-neutral-800 text-white font-semibold'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          3. Overlay Windowing
        </button>
      </div>

      {/* Tab Content */}
      <div className="relative bg-neutral-950 rounded-xl p-3.5 border border-neutral-800 font-mono text-xs overflow-x-auto">
        <button
          onClick={() => {
            const code = 
              activeTab === 'assistant' ? assistantCode :
              activeTab === 'popup' ? popupCode : overlayCode;
            copyCode(code, activeTab);
          }}
          className="absolute top-3 right-3 p-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[11px] flex items-center gap-1 border border-neutral-700"
        >
          {copied === activeTab ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>

        <pre className="text-neutral-300 whitespace-pre leading-relaxed pr-16 text-[11px]">
          {activeTab === 'assistant' && assistantCode}
          {activeTab === 'popup' && popupCode}
          {activeTab === 'overlay' && overlayCode}
        </pre>
      </div>

      <div className="mt-4 pt-3 border-t border-neutral-800 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-neutral-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>No Root Required</span>
        </div>
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-400 shrink-0" />
          <span>Samsung Knox / MultiStar Safe</span>
        </div>
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-amber-400 shrink-0" />
          <span>One UI 5.x / 6.x / DeX</span>
        </div>
      </div>
    </div>
  );
};
