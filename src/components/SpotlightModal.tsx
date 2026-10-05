import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Terminal, 
  Monitor, 
  Maximize2, 
  AppWindow, 
  CornerDownLeft, 
  Sparkles, 
  Globe, 
  Calculator, 
  Settings, 
  Command, 
  FileText, 
  Folder, 
  Image, 
  Compass, 
  BookOpen, 
  PlayCircle, 
  Music, 
  Mail, 
  Edit3, 
  Sliders, 
  Palette, 
  MessageSquare, 
  Video, 
  Clock, 
  CheckSquare,
  ArrowRight
} from 'lucide-react';
import { SAMPLE_APPS, AppItem } from '../data/appsData';
import { SAMPLE_FILES, DeviceFileItem } from '../data/filesData';
import { evaluateMathExpression, evaluateUnitConversion, SearchResult } from '../utils/searchEngine';

interface SpotlightModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchApp: (app: AppItem, mode: 'fullscreen' | 'windowed') => void;
  defaultLaunchMode: 'fullscreen' | 'windowed';
  onToggleDefaultLaunchMode: () => void;
  onExecuteCustomAction?: (actionText: string) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  FileText,
  Monitor,
  Image,
  Folder,
  Globe,
  Compass,
  BookOpen,
  Terminal,
  PlayCircle,
  Music,
  Mail,
  Calculator,
  Settings,
  Edit3,
  Sliders,
  Palette,
  MessageSquare,
  Video,
  Clock,
  CheckSquare,
  Search,
};

export const SpotlightModal: React.FC<SpotlightModalProps> = ({
  isOpen,
  onClose,
  onLaunchApp,
  defaultLaunchMode,
  onToggleDefaultLaunchMode,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentLaunchMode, setCurrentLaunchMode] = useState<'fullscreen' | 'windowed'>(defaultLaunchMode);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentLaunchMode(defaultLaunchMode);
  }, [defaultLaunchMode, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Compute search results
  const results: SearchResult[] = React.useMemo(() => {
    const trimmed = query.trim();
    const list: SearchResult[] = [];

    // 1. Math calculation check
    const mathResult = evaluateMathExpression(trimmed);
    if (mathResult !== null) {
      list.push({
        id: 'calc-result',
        type: 'calc',
        title: mathResult,
        subtitle: `Calculation: ${trimmed} = ${mathResult}`,
        iconName: 'Calculator',
        accentColor: '#10b981',
        badge: 'Calculator',
        payload: mathResult,
      });
    }

    // 2. Unit conversion check
    const unitResult = evaluateUnitConversion(trimmed);
    if (unitResult !== null) {
      list.push({
        id: 'unit-result',
        type: 'unit',
        title: unitResult,
        subtitle: `Conversion for "${trimmed}"`,
        iconName: 'Sliders',
        accentColor: '#0ea5e9',
        badge: 'Convert',
        payload: unitResult,
      });
    }

    // 3. App matching
    const qLower = trimmed.toLowerCase();
    const matchingApps = SAMPLE_APPS.filter((app) => {
      if (!trimmed) return true; // show all/frequently used when blank
      return (
        app.name.toLowerCase().includes(qLower) ||
        app.category.toLowerCase().includes(qLower) ||
        app.description.toLowerCase().includes(qLower) ||
        app.package.toLowerCase().includes(qLower)
      );
    });

    matchingApps.forEach((app) => {
      list.push({
        id: `app-${app.id}`,
        type: 'app',
        title: app.name,
        subtitle: `${app.category} · ${app.package}`,
        badge: app.category,
        iconName: app.icon,
        accentColor: app.accentColor,
        appData: {
          id: app.id,
          package: app.package,
          category: app.category,
        },
      });
    });

    // 4. Local Files & Samsung Notes matching
    if (trimmed.length > 0) {
      const matchingFiles = SAMPLE_FILES.filter((f) =>
        f.name.toLowerCase().includes(qLower) ||
        f.path.toLowerCase().includes(qLower) ||
        f.appHandler.toLowerCase().includes(qLower)
      );

      matchingFiles.forEach((file) => {
        list.push({
          id: `file-${file.id}`,
          type: file.type === 'note' ? 'note' : 'file',
          title: file.name,
          subtitle: `${file.path} · ${file.size} · ${file.appHandler}`,
          badge: file.type === 'note' ? 'Samsung Note' : file.type.toUpperCase(),
          iconName: file.iconName,
          accentColor: file.color,
          fileData: {
            id: file.id,
            path: file.path,
            appHandler: file.appHandler,
          },
        });
      });
    }

    // 5. Fallback Web search if query is non-empty
    if (trimmed.length > 0) {
      list.push({
        id: 'web-search-google',
        type: 'web',
        title: `Search Google for "${trimmed}"`,
        subtitle: 'Open web browser with query',
        badge: 'Web',
        iconName: 'Globe',
        accentColor: '#3b82f6',
        payload: `https://www.google.com/search?q=${encodeURIComponent(trimmed)}`,
      });
    }

    return list;
  }, [query]);

  // Handle keyboard navigation inside the spotlight
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0));
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      // Toggle launch mode between fullscreen and windowed
      setCurrentLaunchMode((prev) => (prev === 'fullscreen' ? 'windowed' : 'fullscreen'));
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      const selected = results[selectedIndex];
      if (!selected) return;

      // Modifier key check: If shift/cmd held, flip launch mode for this action
      const mode = (e.shiftKey || e.metaKey || e.ctrlKey) 
        ? (currentLaunchMode === 'fullscreen' ? 'windowed' : 'fullscreen')
        : currentLaunchMode;

      executeResult(selected, mode);
    }
  };

  const executeResult = (item: SearchResult, mode: 'fullscreen' | 'windowed') => {
    if (item.type === 'app' && item.appData) {
      const targetApp = SAMPLE_APPS.find((a) => a.id === item.appData?.id);
      if (targetApp) {
        onLaunchApp(targetApp, mode);
        onClose();
      }
    } else if (item.type === 'note') {
      const notesApp = SAMPLE_APPS.find((a) => a.id === 'samsung-notes');
      if (notesApp) {
        onLaunchApp({
          ...notesApp,
          name: `${item.title} (Samsung Note)`,
          description: `Note opened from Spotlight: ${item.subtitle}`
        }, mode);
        onClose();
      }
    } else if (item.type === 'file') {
      const filesApp = SAMPLE_APPS.find((a) => a.id === 'samsung-files');
      if (filesApp) {
        onLaunchApp({
          ...filesApp,
          name: `${item.title}`,
          description: `Document preview: ${item.subtitle}`
        }, mode);
        onClose();
      }
    } else if (item.type === 'web' && item.payload) {
      window.open(item.payload, '_blank');
      onClose();
    } else if (item.type === 'calc' || item.type === 'unit') {
      navigator.clipboard?.writeText(item.title);
      alert(`Copied "${item.title}" to clipboard!`);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4 bg-black/40 backdrop-blur-md transition-opacity duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-neutral-900/90 border border-white/15 rounded-2xl shadow-2xl backdrop-blur-2xl overflow-hidden flex flex-col transition-transform duration-200 transform scale-100"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Top Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Spotlight Search or calculate (e.g. Chrome, Notes, 45*12, 100 usd to inr)..."
            className="w-full bg-transparent text-lg md:text-xl text-neutral-100 placeholder-neutral-500 focus:outline-none font-sans"
            autoFocus
          />

          {/* Mode Switcher pill on top right */}
          <button
            type="button"
            onClick={() => setCurrentLaunchMode((m) => (m === 'fullscreen' ? 'windowed' : 'fullscreen'))}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors border ${
              currentLaunchMode === 'windowed'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
            }`}
            title="Press [Tab] to toggle launch mode"
          >
            {currentLaunchMode === 'windowed' ? (
              <>
                <AppWindow className="w-3.5 h-3.5" />
                <span>Pop-up Window</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Full Screen</span>
              </>
            )}
            <span className="text-[10px] text-white/50 ml-1 font-mono">Tab</span>
          </button>
        </div>

        {/* Results List */}
        <div 
          ref={listRef}
          className="max-h-[380px] overflow-y-auto divide-y divide-white/5 p-2 space-y-0.5 scrollbar-thin scrollbar-thumb-white/10"
        >
          {results.length === 0 ? (
            <div className="py-12 text-center text-neutral-400 text-sm">
              No matching applications or calculations found.
            </div>
          ) : (
            results.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const IconComp = ICON_MAP[item.iconName] || Terminal;

              return (
                <div
                  key={item.id}
                  onClick={() => executeResult(item, currentLaunchMode)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-600/30 text-white border border-blue-500/30 shadow-sm'
                      : 'text-neutral-300 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div 
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border border-white/10"
                      style={{ 
                        backgroundColor: item.accentColor ? `${item.accentColor}25` : '#33415525',
                        color: item.accentColor || '#94a3b8'
                      }}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 truncate">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm text-neutral-100 truncate">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/10 text-neutral-400">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-neutral-400 truncate">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  {/* Action Hints on hover/select */}
                  <div className="flex items-center gap-2 shrink-0 text-xs">
                    {item.type === 'app' && (
                      <div className="flex items-center gap-1 text-[11px] text-neutral-400">
                        <span className="hidden sm:inline">
                          {currentLaunchMode === 'windowed' ? 'Open in Pop-up' : 'Open Fullscreen'}
                        </span>
                        <kbd className="px-1.5 py-0.5 bg-white/10 border border-white/10 rounded font-mono text-[10px] text-neutral-200">
                          ↵
                        </kbd>
                      </div>
                    )}
                    {item.type === 'calc' && (
                      <div className="flex items-center gap-1 text-[11px] text-emerald-400">
                        <span>Copy</span>
                        <kbd className="px-1.5 py-0.5 bg-emerald-500/20 rounded font-mono text-[10px]">↵</kbd>
                      </div>
                    )}
                    {item.type === 'web' && (
                      <div className="flex items-center gap-1 text-[11px] text-blue-400">
                        <span>Browse</span>
                        <kbd className="px-1.5 py-0.5 bg-blue-500/20 rounded font-mono text-[10px]">↵</kbd>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts & advice */}
        <div className="px-4 py-2.5 bg-black/40 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-neutral-400 gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 bg-white/10 rounded font-mono text-[10px]">↑↓</kbd> Select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 bg-white/10 rounded font-mono text-[10px]">↵</kbd> {currentLaunchMode === 'windowed' ? 'Pop-up' : 'Fullscreen'}
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 bg-white/10 rounded font-mono text-[10px]">⇧ + ↵</kbd> {currentLaunchMode === 'windowed' ? 'Fullscreen' : 'Pop-up'}
            </span>
            <span className="flex items-center gap-1 hidden sm:flex">
              <kbd className="px-1 py-0.5 bg-white/10 rounded font-mono text-[10px]">Tab</kbd> Flip Default
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-neutral-500">Galaxy Tab S9 FE+ Keyboard</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[11px] text-emerald-400 font-mono">Assistant Key</span>
          </div>
        </div>
      </div>
    </div>
  );
};
