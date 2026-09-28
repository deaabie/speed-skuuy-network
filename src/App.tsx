import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SpeedGauge } from './components/SpeedGauge';
import { BufferbloatCard } from './components/BufferbloatCard';
import { GamingMatrixCard } from './components/GamingMatrixCard';
import { CapabilityCard } from './components/CapabilityCard';
import { GuidesSection } from './components/GuidesSection';
import { AdBanner } from './components/AdBanner';
import { CrossPromoBanner } from './components/CrossPromoBanner';
import { CertificateModal } from './components/CertificateModal';
import { AdminDashboard, DEFAULT_AD_SETTINGS } from './pages/AdminDashboard';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { Disclaimer } from './pages/Disclaimer';

import {
  TestPhase,
  SpeedMetrics,
  ClientIpDetails,
  GamingServer,
  CapabilityItem,
  AdSettings
} from './types/speed';
import { fetchClientIpDetails, runFullSpeedTest } from './lib/speedEngine';
import { GAMING_SERVERS, pingGamingServer } from './lib/gamingMatrix';
import { evaluateCapabilities } from './lib/capabilityIndex';
import { Zap, Activity, Gamepad2, Award, ArrowRight, Share2, RotateCw } from 'lucide-react';

const INITIAL_METRICS: SpeedMetrics = {
  ping: 0,
  jitter: 0,
  download: 0,
  upload: 0,
  downloadLatency: 0,
  uploadLatency: 0,
  bufferbloatGrade: 'A',
  bufferbloatRpm: 1200,
  packetLoss: 0
};

const INITIAL_CLIENT_IP: ClientIpDetails = {
  ip: 'Fetching...',
  isp: 'Locating ISP...',
  asn: '...',
  city: 'Edge Hub',
  country: 'Global',
  countryCode: 'GL'
};

export const App: React.FC = () => {
  type ActiveTab =
    | 'test'
    | 'bufferbloat'
    | 'gaming'
    | 'capabilities'
    | 'docs'
    | 'privacy'
    | 'terms'
    | 'disclaimer'
    | 'admin';

  // Read initial tab from URL hash
  const getInitialTab = (): ActiveTab => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#admin') return 'admin';
      if (hash === '#bufferbloat') return 'bufferbloat';
      if (hash === '#gaming') return 'gaming';
      if (hash === '#capabilities') return 'capabilities';
      if (hash === '#docs') return 'docs';
      if (hash === '#privacy') return 'privacy';
      if (hash === '#terms') return 'terms';
      if (hash === '#disclaimer') return 'disclaimer';
    }
    return 'test';
  };

  const [currentTab, setCurrentTab] = useState<ActiveTab>(getInitialTab);
  const [phase, setPhase] = useState<TestPhase>('idle');
  const [currentSpeed, setCurrentSpeed] = useState<number>(0);
  const [currentPing, setCurrentPing] = useState<number>(0);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [metrics, setMetrics] = useState<SpeedMetrics>(INITIAL_METRICS);
  const [clientIp, setClientIp] = useState<ClientIpDetails>(INITIAL_CLIENT_IP);
  const [gamingServers, setGamingServers] = useState<GamingServer[]>(GAMING_SERVERS);
  const [capabilities, setCapabilities] = useState<CapabilityItem[]>([]);
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [isProbingGaming, setIsProbingGaming] = useState<boolean>(false);

  // Ad Settings state
  const [adSettings, setAdSettings] = useState<AdSettings>(() => {
    try {
      const saved = localStorage.getItem('skuuy_speed_ad_settings');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_AD_SETTINGS;
  });

  // Hotkey listener for secret admin dashboard (Ctrl + Shift + A or Cmd + Shift + A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setCurrentTab('admin');
        window.location.hash = '#admin';
      }
    };

    const handleHashChange = () => {
      setCurrentTab(getInitialTab());
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Fetch client IP details on component mount
  useEffect(() => {
    let isMounted = true;
    fetchClientIpDetails().then((details) => {
      if (isMounted) setClientIp(details);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Probe gaming servers
  const probeAllGamingServers = useCallback(
    async (basePing: number = 25) => {
      setIsProbingGaming(true);
      const updated = await Promise.all(
        gamingServers.map((server) => pingGamingServer(server, basePing))
      );
      setGamingServers(updated);
      setIsProbingGaming(false);
    },
    [gamingServers]
  );

  // Execute full speed test
  const handleStartTest = useCallback(async () => {
    if (phase !== 'idle' && phase !== 'complete') return;

    setPhase('ping');
    setCurrentSpeed(0);
    setCurrentPing(0);
    setProgressPercent(0);

    try {
      const finalMetrics = await runFullSpeedTest(
        adSettings.testDurationSeconds || 10,
        (progress) => {
          setPhase(progress.phase);
          setCurrentSpeed(progress.currentSpeedMbps);
          setCurrentPing(progress.currentPingMs);
          setProgressPercent(progress.progressPercent);
        }
      );

      setMetrics(finalMetrics);
      setPhase('complete');
      setCurrentSpeed(finalMetrics.download);
      setCurrentPing(finalMetrics.ping);
      setCapabilities(evaluateCapabilities(finalMetrics));

      // Trigger gaming probe with measured baseline ping
      probeAllGamingServers(finalMetrics.ping);
    } catch (err) {
      console.error('Speed test error:', err);
      setPhase('idle');
    }
  }, [phase, adSettings.testDurationSeconds, probeAllGamingServers]);

  const handleTabSelect = (tab: ActiveTab) => {
    setCurrentTab(tab);
    if (tab === 'admin') {
      window.location.hash = '#admin';
    } else if (tab === 'test') {
      window.history.pushState(null, '', window.location.pathname);
    } else {
      window.location.hash = `#${tab}`;
    }

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0D0F17] flex flex-col justify-between selection:bg-[#00F0FF] selection:text-black">
      {/* Neo Brutalist Sticky Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={handleTabSelect}
        onOpenCertificate={() => setIsCertificateOpen(true)}
        isComplete={phase === 'complete'}
      />

      {/* Main Content Arena */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Top Header Ad Placement */}
        {adSettings.enabled && (
          <AdBanner slot="header" adSettings={adSettings} />
        )}

        {/* Tab 1: Primary Speedtest Lab */}
        {currentTab === 'test' && (
          <div className="space-y-8">
            <SpeedGauge
              phase={phase}
              currentSpeed={currentSpeed}
              currentPing={currentPing}
              progressPercent={progressPercent}
              metrics={metrics}
              clientIp={clientIp}
              onStartTest={handleStartTest}
            />

            {/* In-depth Result Highlights (Shown when complete) */}
            {phase === 'complete' && (
              <div className="space-y-8 animate-fade-in">
                {/* Result Highlights Banner */}
                <div className="bg-[#FFE600] border-3 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_#000000] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-black/70">
                      Diagnostics Verified
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-black font-mono uppercase">
                      Test Completed Successfully!
                    </h3>
                    <p className="text-xs text-black/80 font-mono">
                      Your connection achieved{' '}
                      <span className="font-extrabold">{metrics.download.toFixed(1)} Mbps</span> down and{' '}
                      <span className="font-extrabold">{metrics.upload.toFixed(1)} Mbps</span> up with{' '}
                      <span className="font-extrabold">Grade {metrics.bufferbloatGrade}</span> Bufferbloat.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsCertificateOpen(true)}
                      className="px-4 py-2.5 rounded-xl bg-black text-white hover:bg-white hover:text-black font-mono font-bold text-xs uppercase border-2 border-black transition-colors flex items-center gap-2 shadow-[2px_2px_0px_0px_#000000]"
                    >
                      <Share2 className="w-4 h-4 text-[#00F0FF]" />
                      <span>Share Certificate</span>
                    </button>
                    <button
                      onClick={handleStartTest}
                      className="px-4 py-2.5 rounded-xl bg-[#00F0FF] text-black hover:bg-white font-mono font-bold text-xs uppercase border-2 border-black transition-colors flex items-center gap-2 shadow-[2px_2px_0px_0px_#000000]"
                    >
                      <RotateCw className="w-4 h-4" />
                      <span>Retest</span>
                    </button>
                  </div>
                </div>

                {/* Sub-grid of Diagnostic Highlights */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Bufferbloat Snippet */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-[#00F0FF]" />
                        <h4 className="font-mono font-black text-sm uppercase text-white">
                          Responsiveness (Bufferbloat)
                        </h4>
                      </div>
                      <button
                        onClick={() => handleTabSelect('bufferbloat')}
                        className="text-xs font-mono font-bold text-[#00F0FF] hover:underline flex items-center gap-1"
                      >
                        <span>Full Audit</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <BufferbloatCard metrics={metrics} />
                  </div>

                  {/* Capabilities Snippet */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-[#FFE600]" />
                        <h4 className="font-mono font-black text-sm uppercase text-white">
                          Application Capability
                        </h4>
                      </div>
                      <button
                        onClick={() => handleTabSelect('capabilities')}
                        className="text-xs font-mono font-bold text-[#FFE600] hover:underline flex items-center gap-1"
                      >
                        <span>View All</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <CapabilityCard items={capabilities.slice(0, 4)} />
                  </div>
                </div>

                {/* Gaming Matrix Snippet */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Gamepad2 className="w-5 h-5 text-[#FF007F]" />
                      <h4 className="font-mono font-black text-sm uppercase text-white">
                        Global Gaming Ping Matrix (Top Regions)
                      </h4>
                    </div>
                    <button
                      onClick={() => handleTabSelect('gaming')}
                      className="text-xs font-mono font-bold text-[#FF007F] hover:underline flex items-center gap-1"
                    >
                      <span>Explore 12 Clusters</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <GamingMatrixCard servers={gamingServers.slice(0, 6)} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Bufferbloat & Responsiveness Lab */}
        {currentTab === 'bufferbloat' && (
          <div className="space-y-8 animate-fade-in">
            <BufferbloatCard metrics={metrics} />
          </div>
        )}

        {/* Tab 3: Gaming Ping Matrix */}
        {currentTab === 'gaming' && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex justify-end">
              <button
                onClick={() => probeAllGamingServers(metrics.ping || 25)}
                disabled={isProbingGaming}
                className="px-4 py-2 rounded-xl bg-[#00F0FF] text-black font-mono font-bold text-xs uppercase border-2 border-black transition-colors hover:bg-white flex items-center gap-2 shadow-[2px_2px_0px_0px_#000000] disabled:opacity-50"
              >
                <RotateCw className={`w-4 h-4 ${isProbingGaming ? 'animate-spin' : ''}`} />
                <span>{isProbingGaming ? 'Pinging 12 Regions...' : 'Refresh Matrix'}</span>
              </button>
            </div>
            <GamingMatrixCard servers={gamingServers} />
          </div>
        )}

        {/* Tab 4: Application Capability Index */}
        {currentTab === 'capabilities' && (
          <div className="space-y-8 animate-fade-in">
            <CapabilityCard
              items={capabilities.length > 0 ? capabilities : evaluateCapabilities(metrics)}
            />
          </div>
        )}

        {/* Tab 5: Technical Guides & RFC Documentation */}
        {currentTab === 'docs' && (
          <div className="animate-fade-in">
            <GuidesSection />
          </div>
        )}

        {/* Tab 6: Secret Admin Dashboard */}
        {currentTab === 'admin' && (
          <div className="animate-fade-in">
            <AdminDashboard
              onBack={() => handleTabSelect('test')}
              adSettings={adSettings}
              onUpdateAdSettings={(newSettings) => setAdSettings(newSettings)}
            />
          </div>
        )}

        {/* Tab 7: Privacy Policy */}
        {currentTab === 'privacy' && (
          <div className="animate-fade-in">
            <PrivacyPolicy onBack={() => handleTabSelect('test')} />
          </div>
        )}

        {/* Tab 8: Terms of Service */}
        {currentTab === 'terms' && (
          <div className="animate-fade-in">
            <TermsOfService onBack={() => handleTabSelect('test')} />
          </div>
        )}

        {/* Tab 9: Network Disclaimer */}
        {currentTab === 'disclaimer' && (
          <div className="animate-fade-in">
            <Disclaimer onBack={() => handleTabSelect('test')} />
          </div>
        )}

        {/* Mid-Page Results Ad Placement */}
        {adSettings.enabled && (
          <AdBanner slot="result" adSettings={adSettings} />
        )}

        {/* Skuuy Ecosystem Cross-Promotion */}
        <CrossPromoBanner />

        {/* Footer Ad Placement */}
        {adSettings.enabled && (
          <AdBanner slot="footer" adSettings={adSettings} />
        )}
      </main>

      {/* Speed & Bufferbloat Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        metrics={metrics}
        clientIp={clientIp}
      />

      {/* Neo Brutalist Footer with Zero Admin Mention */}
      <Footer onSelectTab={handleTabSelect} />
    </div>
  );
};

export default App;
