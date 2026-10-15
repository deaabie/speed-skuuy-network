import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, Activity, Zap, Gamepad2, Wifi } from 'lucide-react';

export const GuidesSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const guides = [
    {
      title: 'The Truth About Bufferbloat: Why High Speeds Don\'t Stop Lag',
      category: 'Network Engineering',
      icon: Activity,
      color: 'border-[#00F0FF]',
      excerpt:
        'Having a 100 Mbps or 1 Gbps fiber plan does not prevent ping spikes. Bufferbloat occurs when unmanaged routers store packets in large FIFO queues instead of dropping them, adding hundreds of milliseconds of lag during downloads.'
    },
    {
      title: 'Latency vs Jitter vs Packet Loss: The Gaming Diagnostic Triad',
      category: 'Esports Optimization',
      icon: Gamepad2,
      color: 'border-[#FF007F]',
      excerpt:
        'A steady 60ms ping is far better than a fluctuating 20ms–150ms connection. Learn how packet loss causes rubberbanding and how jitter ruins hit registration in tactical shooters like Valorant and CS2.'
    },
    {
      title: 'Smart Queue Management (SQM): Configuring CAKE & FQ-CoDel',
      category: 'Router Configuration',
      icon: Wifi,
      color: 'border-[#00E676]',
      excerpt:
        'Active Queue Management algorithms like CAKE (Common Applications Kept Enhanced) and FQ-CoDel ensure critical gaming and voice packets skip download queues. A step-by-step overview for OpenWrt, MikroTik, and Asus routers.'
    },
    {
      title: 'HTTP/3, QUIC & Anycast: Modern Speed Architecture',
      category: 'Web Standards',
      icon: Zap,
      color: 'border-[#FFE600]',
      excerpt:
        'Traditional speed tests rely on single TCP streams susceptible to head-of-line blocking. Skuuy Speed uses parallel HTTP/3 UDP multiplexing to measure true physical edge bandwidth capacity.'
    }
  ];

  const faqs = [
    {
      q: 'Why is my speed test result lower than my advertised ISP plan?',
      a: 'Wi-Fi interference, older Ethernet cables (Cat5 vs Cat6), background cloud syncs (OneDrive, Google Drive), and distance from the router can reduce speeds. For the most accurate benchmark, connect your PC directly via a Gigabit Ethernet cable.'
    },
    {
      q: 'What is a good Bufferbloat score for gaming?',
      a: 'A Bufferbloat Grade of "A+" or "A" means your ping increases by less than 15ms during heavy downloads, ensuring competitive esports responsiveness. Grades "D" or "F" mean your latency explodes under load, making voice calls and gaming stutter.'
    },
    {
      q: 'What does the RPM (Round-trips Per Minute) score mean?',
      a: 'Defined by Apple and the IETF Network Working Group (RFC 8290), RPM measures how many distinct round-trip requests your network can complete in 60 seconds while under full saturation. Higher RPM = snappier web browsing and lag-free gaming.'
    },
    {
      q: 'Does Skuuy Speed log my personal data or IP?',
      a: 'No. Skuuy operates under a strict zero-logging policy. Speed tests run entirely in your client browser memory using public edge endpoints. We never track, record, or store your internet history.'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Guides Grid */}
      <div className="bg-[#161922] border-3 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_#000000] space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b-2 border-slate-800">
          <BookOpen className="w-6 h-6 text-[#00F0FF]" />
          <div>
            <h3 className="text-xl font-black text-white font-mono uppercase">
              Network Engineering & Bufferbloat Reference
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              In-depth guides on queue algorithms, latency jitter, and router optimization.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guides.map((g, idx) => {
            const Icon = g.icon;
            return (
              <div
                key={idx}
                className={`rounded-xl border-3 border-black p-5 bg-[#0D0F17] shadow-[4px_4px_0px_0px_#000000] space-y-3 ${g.color}`}
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-black text-[#FFE600] text-[10px] font-mono font-bold uppercase border border-slate-700">
                    {g.category}
                  </span>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-base font-black text-white font-mono leading-snug">
                  {g.title}
                </h4>
                <p className="text-xs text-slate-300 font-mono leading-relaxed">
                  {g.excerpt}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="bg-[#161922] border-3 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_#000000] space-y-4">
        <h3 className="text-lg font-black text-white font-mono uppercase pb-3 border-b-2 border-slate-800 flex items-center gap-2">
          <Zap className="w-5 h-5 text-[#FFE600]" />
          <span>Frequently Asked Questions</span>
        </h3>

        <div className="space-y-3">
          {faqs.map((faq, fIdx) => {
            const isOpen = openFaq === fIdx;
            return (
              <div
                key={fIdx}
                className="rounded-xl border-2 border-black bg-black/60 overflow-hidden shadow-[2px_2px_0px_0px_#000]"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                  className="w-full px-4 py-3.5 flex items-center justify-between text-left text-xs sm:text-sm font-black text-white font-mono uppercase hover:bg-slate-900 transition-colors"
                >
                  <span className="flex-1 pr-2">{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-[#00F0FF]" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs font-mono text-slate-300 border-t border-slate-800 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
