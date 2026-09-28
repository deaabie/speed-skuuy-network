import { CapabilityItem, SpeedMetrics } from '../types/speed';

export function evaluateCapabilities(metrics: SpeedMetrics): CapabilityItem[] {
  const { download, upload, ping, jitter, bufferbloatGrade } = metrics;
  const isBufferbloatOk = bufferbloatGrade === 'A+' || bufferbloatGrade === 'A' || bufferbloatGrade === 'B';

  return [
    {
      id: 'gaming',
      label: 'Competitive Esports Gaming',
      description: 'Zero stutter, precise hit registration in Valorant, CS2, Dota 2, and Apex Legends.',
      category: 'Gaming',
      isCapable: ping <= 45 && jitter <= 8 && isBufferbloatOk,
      requiredSpeed: 'Ping < 45ms, Jitter < 8ms, Low Bufferbloat'
    },
    {
      id: 'stream4k',
      label: '4K Ultra HD Streaming',
      description: 'Instant playback without buffering on YouTube 4K 60fps, Netflix UHD, and Disney+.',
      category: 'Streaming',
      isCapable: download >= 25,
      requiredSpeed: 'Download ≥ 25 Mbps'
    },
    {
      id: 'stream8k',
      label: '8K HDR Extreme Video',
      description: 'High-bitrate AV1/HEVC 8K master streams and spatial VR video headsets.',
      category: 'Streaming',
      isCapable: download >= 75,
      requiredSpeed: 'Download ≥ 75 Mbps'
    },
    {
      id: 'cloudgaming',
      label: 'Cloud Gaming (GeForce NOW)',
      description: 'Full 1080p/1440p 60fps remote game streaming without input lag or packet dropping.',
      category: 'Gaming',
      isCapable: download >= 35 && ping <= 40 && jitter <= 6,
      requiredSpeed: 'Download ≥ 35 Mbps, Ping < 40ms, Jitter < 6ms'
    },
    {
      id: 'discord',
      label: 'Discord 1080p 60fps Screen Share',
      description: 'Crystal-clear audio and crisp high-framerate stream to voice channels.',
      category: 'Work',
      isCapable: upload >= 8 && jitter <= 12,
      requiredSpeed: 'Upload ≥ 8 Mbps, Jitter < 12ms'
    },
    {
      id: 'zoom',
      label: 'Multi-Party HD Video Conferences',
      description: 'Uninterrupted Zoom, Google Meet, and Microsoft Teams meetings with gallery view.',
      category: 'Work',
      isCapable: download >= 5 && upload >= 4 && ping <= 90,
      requiredSpeed: 'Download ≥ 5 Mbps, Upload ≥ 4 Mbps'
    },
    {
      id: 'p2p',
      label: 'High-Speed File Sharing & P2P',
      description: 'Rapid cloud backups (Google Drive, OneDrive) and Git large file synchronization.',
      category: 'Transfer',
      isCapable: download >= 50 && upload >= 20,
      requiredSpeed: 'Download ≥ 50 Mbps, Upload ≥ 20 Mbps'
    }
  ];
}
