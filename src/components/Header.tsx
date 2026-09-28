import React, { useState } from 'react';
import { SkuuyLogo } from './SkuuyLogo';
import {
  Zap,
  Activity,
  Gamepad2,
  Award,
  BookOpen,
  Menu,
  X,
  Share2
} from 'lucide-react';

interface HeaderProps {
  currentTab: 'test' | 'bufferbloat' | 'gaming' | 'capabilities' | 'docs' | 'privacy' | 'terms' | 'disclaimer' | 'admin';
  onSelectTab: (tab: any) => void;
  onOpenCertificate?: () => void;
  isComplete: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenCertificate,
  isComplete
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'test', label: 'Speedtest Lab', icon: Zap },
    { id: 'bufferbloat', label: 'Bufferbloat & RPM', icon: Activity, badge: 'RFC 8290' },
    { id: 'gaming', label: 'Gaming Clusters', icon: Gamepad2, badge: '12 Regions' },
    { id: 'capabilities', label: 'App Capability', icon: Award },
    { id: 'docs', label: 'Guides & RFCs', icon: BookOpen }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b-3 border-black bg-[#00F0FF] text-black shadow-[0_4px_0px_0px_#000000]">
      {/* Top Neo Ticker Bar */}
      <div className="bg-black py-1 px-4 text-center text-xs text-white font-mono flex items-center justify-center gap-3 overflow-hidden select-none">
        <span className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#00E676]">
          <span className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse"></span>
          Edge Engine:
        </span>
        <span className="font-extrabold text-[#FFE600]">
          Cloudflare Anycast PoPs • HTTP/3 Multiplexing • Zero Throttling
        </span>
        <span className="hidden sm:inline text-slate-400">• Multi-Stream Web Worker</span>

        <div className="hidden md:flex items-center gap-2 ml-4">
          <a
            href="https://dns.skuuy.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#FFE600] text-black text-[10px] font-black uppercase hover:bg-white transition-colors"
          >
            <span>DNS Matrix ↗</span>
          </a>
          <a
            href="https://ip.skuuy.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#FF007F] text-white text-[10px] font-black uppercase hover:bg-white hover:text-black transition-colors"
          >
            <span>IP Suite ↗</span>
          </a>
          <a
            href="https://2fa.skuuy.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#00E676] text-black text-[10px] font-black uppercase hover:bg-white transition-colors"
          >
            <span>2FA Vault ↗</span>
          </a>
          <a
            href="https://proxy.skuuy.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white text-black text-[10px] font-black uppercase hover:bg-[#FFE600] transition-colors"
          >
            <span>Proxy Hub ↗</span>
          </a>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => onSelectTab('test')}
          className="cursor-pointer transition-transform hover:scale-[1.02]"
        >
          <SkuuyLogo size="sm" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-black uppercase transition-all rounded-lg border-2 ${
                  isActive
                    ? 'bg-black text-[#00F0FF] border-black shadow-[2px_2px_0px_0px_#FF007F]'
                    : 'bg-white text-black border-black hover:bg-[#FFE600] shadow-[2px_2px_0px_0px_#000000]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 text-[9px] font-mono rounded ${
                      isActive ? 'bg-[#FF007F] text-white' : 'bg-slate-200 text-slate-900 font-bold'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {isComplete && onOpenCertificate && (
            <button
              onClick={onOpenCertificate}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-black uppercase rounded-lg bg-[#FFE600] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000000] hover:bg-white transition-all active:translate-x-0.5 active:translate-y-0.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Speed Certificate</span>
            </button>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000000] text-black hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t-3 border-black bg-[#00F0FF] px-4 py-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-black uppercase rounded-lg border-2 border-black ${
                  isActive
                    ? 'bg-black text-[#00F0FF] shadow-[2px_2px_0px_0px_#FF007F]'
                    : 'bg-white text-black shadow-[2px_2px_0px_0px_#000000]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-slate-200 text-black">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t-2 border-black grid grid-cols-2 gap-2 text-center text-xs font-black">
            <a
              href="https://dns.skuuy.com"
              target="_blank"
              rel="noreferrer"
              className="py-1.5 bg-[#FFE600] text-black rounded border border-black"
            >
              DNS Matrix ↗
            </a>
            <a
              href="https://ip.skuuy.com"
              target="_blank"
              rel="noreferrer"
              className="py-1.5 bg-black text-white rounded border border-black"
            >
              IP & Leak Suite ↗
            </a>
            <a
              href="https://2fa.skuuy.com"
              target="_blank"
              rel="noreferrer"
              className="py-1.5 bg-[#FF007F] text-white rounded border border-black"
            >
              2FA Authenticator ↗
            </a>
            <a
              href="https://proxy.skuuy.com"
              target="_blank"
              rel="noreferrer"
              className="py-1.5 bg-[#00E676] text-black rounded border border-black"
            >
              Free Proxy ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
