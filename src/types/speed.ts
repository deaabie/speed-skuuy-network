export type TestPhase =
  | 'idle'
  | 'ping'
  | 'download'
  | 'upload'
  | 'bufferbloat'
  | 'complete';

export interface SpeedMetrics {
  ping: number;
  jitter: number;
  download: number;
  upload: number;
  downloadLatency: number;
  uploadLatency: number;
  bufferbloatGrade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  bufferbloatRpm: number;
  packetLoss: number;
}

export interface GamingServer {
  id: string;
  region: string;
  city: string;
  country: string;
  flag: string;
  targetUrl: string;
  ping: number;
  jitter: number;
  status: 'optimal' | 'good' | 'laggy' | 'testing';
  games: string[];
}

export interface ClientIpDetails {
  ip: string;
  isp: string;
  asn: string;
  city: string;
  country: string;
  countryCode: string;
}

export interface CapabilityItem {
  id: string;
  label: string;
  description: string;
  category: 'Streaming' | 'Gaming' | 'Work' | 'Transfer';
  isCapable: boolean;
  requiredSpeed: string;
}

export interface AdSettings {
  enabled: boolean;
  clientId: string;
  headerSlotId: string;
  resultSlotId: string;
  footerSlotId: string;
  customBannerHtml: string;
  useCustomHtml: boolean;
  testDurationSeconds: number;
}
