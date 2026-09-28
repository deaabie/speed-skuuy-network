import React, { useState, useEffect } from 'react';
import {
  Lock,
  Shield,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Save,
  ArrowLeft,
  Sliders,
  Code
} from 'lucide-react';
import { AdSettings } from '../types/speed';

export const DEFAULT_AD_SETTINGS: AdSettings = {
  enabled: true,
  clientId: 'ca-pub-8440630877434169',
  headerSlotId: '8440630877434169',
  resultSlotId: '8440630877434169',
  footerSlotId: '8440630877434169',
  customBannerHtml: '',
  useCustomHtml: false,
  testDurationSeconds: 10
};

interface AdminDashboardProps {
  onBack: () => void;
  adSettings: AdSettings;
  onUpdateAdSettings: (newSettings: AdSettings) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onBack,
  adSettings,
  onUpdateAdSettings
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [formSettings, setFormSettings] = useState<AdSettings>(adSettings);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Restore authenticated session from sessionStorage
  useEffect(() => {
    try {
      const savedToken = sessionStorage.getItem('skuuy_speed_admin_token');
      if (savedToken) {
        const payload = JSON.parse(atob(savedToken));
        if (payload.authenticated && payload.expiresAt > Date.now()) {
          setIsAuthenticated(true);
        }
      }
    } catch {}
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    // Master Ecosystem Admin Password
    if (passwordInput === 'Prabowo789@@@!' || passwordInput === 'skuuy-admin-secret-2026') {
      setIsAuthenticated(true);
      const token = btoa(
        JSON.stringify({
          authenticated: true,
          expiresAt: Date.now() + 1000 * 60 * 60 * 4
        })
      );
      sessionStorage.setItem('skuuy_speed_admin_token', token);
    } else {
      setAuthError('Invalid administrator credentials.');
      setPasswordInput('');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('skuuy_speed_admin_token');
    setIsAuthenticated(false);
    setPasswordInput('');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateAdSettings(formSettings);
    try {
      localStorage.setItem('skuuy_speed_ad_settings', JSON.stringify(formSettings));
    } catch {}
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#161922] border-3 border-black rounded-2xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_#00F0FF] space-y-6">
          <div className="flex items-center justify-between pb-4 border-b-2 border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-[#00F0FF] text-black border border-black shadow-[2px_2px_0px_0px_#000]">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-black text-white font-mono uppercase">
                System Administration
              </h2>
            </div>
            <button
              onClick={onBack}
              className="text-xs text-slate-400 hover:text-white font-mono flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-slate-300 mb-1.5">
                Passphrase
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter master authorization key"
                autoFocus
                className="w-full px-4 py-3 rounded-xl bg-black border-2 border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-[#00F0FF]"
              />
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-[#FF007F]/20 border border-[#FF007F] text-[#FF007F] text-xs font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#00F0FF] border-2 border-black text-black font-black uppercase text-sm shadow-[3px_3px_0px_0px_#000] hover:bg-white transition-all active:translate-x-0.5 active:translate-y-0.5"
            >
              Authorize Access
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Top Console Bar */}
      <div className="bg-[#00F0FF] border-3 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_#000000] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-black" />
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono uppercase">
              Skuuy Speed Control Console
            </h2>
          </div>
          <p className="text-xs font-bold text-black/80 font-mono mt-1">
            Configure dynamic Google AdSense slots, sponsor banners, and benchmark duration.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="px-4 py-2 rounded-xl bg-white text-black font-black uppercase text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-slate-100 flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Site</span>
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-black text-white font-black uppercase text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-[#FF007F] hover:text-white transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-[#00E676] border-3 border-black text-black font-black font-mono text-sm shadow-[4px_4px_0px_0px_#000] flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          <span>Configuration saved successfully and applied to live runtime!</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Monetization & AdSense */}
        <div className="bg-[#161922] border-3 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_#000000] space-y-6">
          <div className="flex items-center justify-between pb-4 border-b-2 border-slate-800">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[#FFE600]" />
              <h3 className="text-base font-black text-white font-mono uppercase">
                1. Google AdSense & Monetization
              </h3>
            </div>
            {/* Master Toggle */}
            <label className="relative inline-flex items-center cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formSettings.enabled}
                onChange={(e) =>
                  setFormSettings({ ...formSettings, enabled: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00E676]"></div>
              <span className="ml-3 text-xs font-mono font-black uppercase text-white">
                {formSettings.enabled ? 'ADS ACTIVE' : 'ADS DISABLED'}
              </span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <label className="block font-bold text-slate-300 uppercase mb-1">
                Publisher Client ID
              </label>
              <input
                type="text"
                value={formSettings.clientId}
                onChange={(e) =>
                  setFormSettings({ ...formSettings, clientId: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg bg-black border border-slate-700 text-white font-mono focus:outline-none focus:border-[#00F0FF]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 uppercase mb-1">
                Header Ad Slot ID
              </label>
              <input
                type="text"
                value={formSettings.headerSlotId}
                onChange={(e) =>
                  setFormSettings({ ...formSettings, headerSlotId: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg bg-black border border-slate-700 text-white font-mono focus:outline-none focus:border-[#00F0FF]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 uppercase mb-1">
                Results Mid-Page Slot ID
              </label>
              <input
                type="text"
                value={formSettings.resultSlotId}
                onChange={(e) =>
                  setFormSettings({ ...formSettings, resultSlotId: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg bg-black border border-slate-700 text-white font-mono focus:outline-none focus:border-[#00F0FF]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 uppercase mb-1">
                Footer Ad Slot ID
              </label>
              <input
                type="text"
                value={formSettings.footerSlotId}
                onChange={(e) =>
                  setFormSettings({ ...formSettings, footerSlotId: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg bg-black border border-slate-700 text-white font-mono focus:outline-none focus:border-[#00F0FF]"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Custom Sponsor HTML */}
        <div className="bg-[#161922] border-3 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_#000000] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b-2 border-slate-800">
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-[#00F0FF]" />
              <h3 className="text-base font-black text-white font-mono uppercase">
                2. Custom Sponsor / Affiliate HTML Code
              </h3>
            </div>
            <label className="relative inline-flex items-center cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formSettings.useCustomHtml}
                onChange={(e) =>
                  setFormSettings({ ...formSettings, useCustomHtml: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#00F0FF]"></div>
              <span className="ml-2 text-xs font-mono font-bold uppercase text-slate-300">
                Enable Custom Banner
              </span>
            </label>
          </div>

          <div>
            <textarea
              rows={4}
              value={formSettings.customBannerHtml}
              onChange={(e) =>
                setFormSettings({ ...formSettings, customBannerHtml: e.target.value })
              }
              placeholder="<a href='https://vpn-provider.com' target='_blank'><img src='...' /></a>"
              className="w-full px-3 py-2.5 rounded-lg bg-black border border-slate-700 text-slate-200 font-mono text-xs focus:outline-none focus:border-[#00F0FF]"
            />
          </div>
        </div>

        {/* Section 3: Test Duration */}
        <div className="bg-[#161922] border-3 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_#000000] space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b-2 border-slate-800">
            <Sliders className="w-5 h-5 text-[#00E676]" />
            <h3 className="text-base font-black text-white font-mono uppercase">
              3. Benchmark Duration (Seconds)
            </h3>
          </div>

          <div className="max-w-xs text-xs font-mono">
            <label className="block font-bold text-slate-300 uppercase mb-1">
              Sample Window Time
            </label>
            <select
              value={formSettings.testDurationSeconds}
              onChange={(e) =>
                setFormSettings({
                  ...formSettings,
                  testDurationSeconds: parseInt(e.target.value, 10) || 10
                })
              }
              className="w-full px-3 py-2 rounded-lg bg-black border border-slate-700 text-white font-mono focus:outline-none focus:border-[#00F0FF]"
            >
              <option value={6}>Fast Mode (6 seconds - low data usage)</option>
              <option value={10}>Balanced Mode (10 seconds - default standard)</option>
              <option value={18}>Thorough Gigabit Mode (18 seconds - deep bufferbloat)</option>
            </select>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#00E676] text-black font-black uppercase text-sm border-3 border-black shadow-[4px_4px_0px_0px_#000] hover:bg-white transition-all active:translate-x-0.5 active:translate-y-0.5"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
};
