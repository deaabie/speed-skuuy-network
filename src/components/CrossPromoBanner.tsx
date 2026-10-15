import React from 'react';
import { Globe, Lock, Mail, Shield, Zap, ExternalLink } from 'lucide-react';

export const CrossPromoBanner: React.FC = () => {
  const tools = [
    {
      title: 'DNS Matrix & DNSSEC',
      domain: 'dns.skuuy.com',
      url: 'https://dns.skuuy.com',
      desc: '35+ Anycast global resolver propagation, DNSSEC trust chain & email security audit.',
      color: 'bg-[#FFE600]',
      icon: Zap
    },
    {
      title: 'IP & Leak Suite',
      domain: 'ip.skuuy.com',
      url: 'https://ip.skuuy.com',
      desc: 'Dual-stack IPv4/IPv6, WebRTC STUN leaks & DNS leak auditor.',
      color: 'bg-[#00F0FF]',
      icon: Globe
    },
    {
      title: '2FA Authenticator',
      domain: '2fa.skuuy.com',
      url: 'https://2fa.skuuy.com',
      desc: 'Zero-knowledge WebCrypto TOTP generator & encrypted vault.',
      color: 'bg-[#FF007F]',
      textColor: 'text-white',
      icon: Lock
    },
    {
      title: 'Temp Mail & OTP',
      domain: 'mail.skuuy.com',
      url: 'https://mail.skuuy.com',
      desc: 'Instant disposable email with 1-click OTP verification code parser.',
      color: 'bg-[#00E676]',
      icon: Mail
    }
  ];

  return (
    <div className="bg-[#161922] border-3 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_#000000] space-y-4">
      <div className="flex items-center justify-between pb-3 border-b-2 border-slate-800">
        <div>
          <h3 className="text-lg font-black text-white font-mono uppercase">
            Explore Skuuy Ecosystem Utilities
          </h3>
          <p className="text-xs text-slate-400 font-mono">
            Zero-knowledge, open-source privacy and network diagnostics deployed on the edge.
          </p>
        </div>
        <a
          href="https://skuuy.com"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:inline-flex items-center gap-1 text-xs font-black uppercase text-[#00F0FF] hover:underline"
        >
          <span>All Tools Portal</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <a
              key={tool.domain}
              href={tool.url}
              target="_blank"
              rel="noreferrer"
              className={`rounded-xl border-2 border-black p-4 transition-all hover:scale-[1.02] shadow-[3px_3px_0px_0px_#000000] flex flex-col justify-between ${tool.color} ${
                tool.textColor || 'text-black'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Icon className="w-5 h-5" />
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </div>
                <h4 className="font-black text-sm uppercase leading-tight font-mono">
                  {tool.title}
                </h4>
                <p className="text-[11px] font-bold opacity-90 leading-tight">
                  {tool.desc}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-black/20 text-[10px] font-mono font-black uppercase">
                {tool.domain} ↗
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};
