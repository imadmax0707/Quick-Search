export interface DeviceFileItem {
  id: string;
  name: string;
  type: 'note' | 'pdf' | 'doc' | 'sheet' | 'image' | 'archive';
  path: string;
  size: string;
  updated: string;
  appHandler: string;
  iconName: string;
  color: string;
}

export const SAMPLE_FILES: DeviceFileItem[] = [
  {
    id: 'note-1',
    name: 'CS Project Architecture & Diagrams',
    type: 'note',
    path: 'Samsung Notes / University',
    size: '4.2 MB',
    updated: 'Today, 9:30 AM',
    appHandler: 'Samsung Notes',
    iconName: 'FileText',
    color: '#e11d48',
  },
  {
    id: 'note-2',
    name: 'Weekly Meeting S-Pen Handwritten Sketch',
    type: 'note',
    path: 'Samsung Notes / Work',
    size: '1.8 MB',
    updated: 'Yesterday',
    appHandler: 'Samsung Notes',
    iconName: 'Edit3',
    color: '#ec4899',
  },
  {
    id: 'pdf-1',
    name: 'Galaxy Tab S9 FE Plus User Manual.pdf',
    type: 'pdf',
    path: 'Internal Storage / Downloads',
    size: '14.5 MB',
    updated: 'Oct 02, 2026',
    appHandler: 'Samsung Notes PDF Reader',
    iconName: 'FileText',
    color: '#ef4444',
  },
  {
    id: 'doc-1',
    name: 'Quarterly Budget & Expense Report.xlsx',
    type: 'sheet',
    path: 'Internal Storage / Documents / Finance',
    size: '820 KB',
    updated: 'Oct 04, 2026',
    appHandler: 'Microsoft Excel / Hancom Office',
    iconName: 'FileSpreadsheet',
    color: '#10b981',
  },
  {
    id: 'doc-2',
    name: 'Research Paper Draft v2.docx',
    type: 'doc',
    path: 'Internal Storage / Documents / Research',
    size: '2.1 MB',
    updated: 'Oct 03, 2026',
    appHandler: 'Google Docs',
    iconName: 'FileText',
    color: '#2563eb',
  },
  {
    id: 'img-1',
    name: 'Screenshot_20261005_DeX_Multitasking.png',
    type: 'image',
    path: 'DCIM / Screenshots',
    size: '3.6 MB',
    updated: '10:15 AM',
    appHandler: 'Samsung Gallery',
    iconName: 'Image',
    color: '#ea580c',
  },
  {
    id: 'note-3',
    name: 'Ideas for Android Spotlight Utility App',
    type: 'note',
    path: 'Samsung Notes / Personal',
    size: '320 KB',
    updated: 'Just now',
    appHandler: 'Samsung Notes',
    iconName: 'FileText',
    color: '#e11d48',
  }
];
