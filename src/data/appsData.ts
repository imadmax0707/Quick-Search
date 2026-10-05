export interface AppItem {
  id: string;
  name: string;
  package: string;
  category: 'Samsung' | 'Productivity' | 'Media' | 'Utilities' | 'Social' | 'Developer';
  icon: string; // Lucide icon name or emoji
  accentColor: string;
  description: string;
  defaultWindowed?: boolean;
}

export const SAMPLE_APPS: AppItem[] = [
  {
    id: 'samsung-notes',
    name: 'Samsung Notes',
    package: 'com.samsung.android.app.notes',
    category: 'Samsung',
    icon: 'FileText',
    accentColor: '#e11d48',
    description: 'Note taking with S-Pen support, PDF markup, and audio sync',
    defaultWindowed: true,
  },
  {
    id: 'samsung-dex',
    name: 'Samsung DeX',
    package: 'com.sec.android.app.desktoplauncher',
    category: 'Samsung',
    icon: 'Monitor',
    accentColor: '#2563eb',
    description: 'Desktop productivity environment for Galaxy Tab S9 FE+',
  },
  {
    id: 'samsung-gallery',
    name: 'Gallery',
    package: 'com.sec.android.gallery3d',
    category: 'Samsung',
    icon: 'Image',
    accentColor: '#ea580c',
    description: 'Photos, videos, and object eraser photo editing',
  },
  {
    id: 'samsung-files',
    name: 'My Files',
    package: 'com.sec.android.app.myfiles',
    category: 'Samsung',
    icon: 'Folder',
    accentColor: '#f59e0b',
    description: 'Local storage, SD card, OneDrive, and network storage browser',
    defaultWindowed: true,
  },
  {
    id: 'chrome',
    name: 'Google Chrome',
    package: 'com.android.chrome',
    category: 'Productivity',
    icon: 'Globe',
    accentColor: '#10b981',
    description: 'Fast, secure web browsing with multi-tab desktop view',
  },
  {
    id: 'samsung-internet',
    name: 'Samsung Internet',
    package: 'com.sec.android.app.sbrowser',
    category: 'Samsung',
    icon: 'Compass',
    accentColor: '#4f46e5',
    description: 'Ad-blocking, secret mode, video assistant, and S-Pen translation',
  },
  {
    id: 'obsidian',
    name: 'Obsidian',
    package: 'md.obsidian',
    category: 'Productivity',
    icon: 'BookOpen',
    accentColor: '#8b5cf6',
    description: 'Markdown knowledge base and second brain',
  },
  {
    id: 'termux',
    name: 'Termux',
    package: 'com.termux',
    category: 'Developer',
    icon: 'Terminal',
    accentColor: '#059669',
    description: 'Linux terminal emulator and package environment',
    defaultWindowed: true,
  },
  {
    id: 'youtube',
    name: 'YouTube',
    package: 'com.google.android.youtube',
    category: 'Media',
    icon: 'PlayCircle',
    accentColor: '#ef4444',
    description: 'Streaming videos, subscriptions, and offline downloads',
  },
  {
    id: 'spotify',
    name: 'Spotify',
    package: 'com.spotify.music',
    category: 'Media',
    icon: 'Music',
    accentColor: '#10b981',
    description: 'Music, podcasts, and background audio streaming',
    defaultWindowed: true,
  },
  {
    id: 'gmail',
    name: 'Gmail',
    package: 'com.google.android.gm',
    category: 'Productivity',
    icon: 'Mail',
    accentColor: '#ea4335',
    description: 'Email, Chat, and Google Meet integration',
  },
  {
    id: 'samsung-calculator',
    name: 'Calculator',
    package: 'com.sec.android.app.popupcalculator',
    category: 'Utilities',
    icon: 'Calculator',
    accentColor: '#16a34a',
    description: 'Standard, scientific, and unit converter popup',
    defaultWindowed: true,
  },
  {
    id: 'samsung-settings',
    name: 'Settings',
    package: 'com.android.settings',
    category: 'Utilities',
    icon: 'Settings',
    accentColor: '#64748b',
    description: 'System configurations, Labs, S-Pen, and Display settings',
  },
  {
    id: 'penup',
    name: 'PENUP',
    package: 'com.sec.penup',
    category: 'Samsung',
    icon: 'Edit3',
    accentColor: '#ec4899',
    description: 'Digital art, coloring, live drawing with S-Pen',
  },
  {
    id: 'good-lock',
    name: 'Good Lock',
    package: 'com.samsung.android.goodlock',
    category: 'Samsung',
    icon: 'Sliders',
    accentColor: '#0ea5e9',
    description: 'One UI customization suite (MultiStar, Keys Cafe, NavStar)',
  },
  {
    id: 'canva',
    name: 'Canva',
    package: 'com.canva.editor',
    category: 'Productivity',
    icon: 'Palette',
    accentColor: '#06b6d4',
    description: 'Visual graphics, presentation slides, and posters',
  },
  {
    id: 'discord',
    name: 'Discord',
    package: 'com.discord',
    category: 'Social',
    icon: 'MessageSquare',
    accentColor: '#6366f1',
    description: 'Community voice, video, and text chat channels',
    defaultWindowed: true,
  },
  {
    id: 'vlc',
    name: 'VLC Media Player',
    package: 'org.videolan.vlc',
    category: 'Media',
    icon: 'Video',
    accentColor: '#f97316',
    description: 'Hardware accelerated media player for all video formats',
  },
  {
    id: 'samsung-clock',
    name: 'Clock & Timer',
    package: 'com.sec.android.app.clockpackage',
    category: 'Utilities',
    icon: 'Clock',
    accentColor: '#3b82f6',
    description: 'Alarm, World Clock, Stopwatch, and Timer',
    defaultWindowed: true,
  },
  {
    id: 'google-keep',
    name: 'Google Keep',
    package: 'com.google.android.keep',
    category: 'Productivity',
    icon: 'CheckSquare',
    accentColor: '#eab308',
    description: 'Sticky notes, checklists, and synced reminders',
    defaultWindowed: true,
  },
];

export interface SystemAction {
  id: string;
  title: string;
  subtitle: string;
  category: 'System' | 'Calculation' | 'Web';
  icon: string;
  action: () => void;
  keywords: string[];
}
