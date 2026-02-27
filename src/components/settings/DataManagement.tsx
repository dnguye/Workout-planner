import { useRef } from 'react';
import { useAppState } from '../../storage/AppContext';
import { exportData, importData, clearAllData } from '../../storage/localStorage';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export function DataManagement() {
  const { dispatch } = useAppState();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleExport() {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rp-planner-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const state = importData(reader.result as string);
        dispatch({ type: 'IMPORT_STATE', payload: state });
      } catch {
        alert('Invalid backup file');
      }
    };
    reader.readAsText(file);
  }

  function handleClear() {
    if (confirm('Are you sure? This will delete ALL data permanently.')) {
      clearAllData();
      dispatch({ type: 'CLEAR_ALL' });
    }
  }

  return (
    <Card>
      <h3 className="font-semibold text-sm mb-4">Data Management</h3>
      <div className="space-y-3">
        <Button variant="secondary" onClick={handleExport} className="w-full">
          Export Data (JSON)
        </Button>
        <Button variant="secondary" onClick={() => fileInputRef.current?.click()} className="w-full">
          Import Data
        </Button>
        <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
        <Button variant="danger" onClick={handleClear} className="w-full">
          Clear All Data
        </Button>
      </div>
    </Card>
  );
}
