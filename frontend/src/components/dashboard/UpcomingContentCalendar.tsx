import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Calendar, Clock, Youtube, Instagram, Linkedin, Facebook } from 'lucide-react';

export const UpcomingContentCalendar: React.FC = () => {
  const scheduleItems = [
    {
      day: 'Thursday',
      time: '5:30 PM IST',
      platform: 'YouTube',
      icon: <Youtube className="w-4 h-4 text-red-500" />,
      title: 'Master Video Essay: The Death of the Solo Creator',
      format: '16:9 Long-Form',
      status: 'Ready for Review'
    },
    {
      day: 'Thursday',
      time: '7:00 PM IST',
      platform: 'Instagram',
      icon: <Instagram className="w-4 h-4 text-pink-500" />,
      title: 'Reel 01: The Bollywood Film Star Illusion',
      format: '9:16 Vertical Reel',
      status: 'Clips Approved'
    },
    {
      day: 'Friday',
      time: '9:00 AM IST',
      platform: 'LinkedIn',
      icon: <Linkedin className="w-4 h-4 text-blue-400" />,
      title: 'The Unbundling of the Creator Workforce',
      format: 'Document Carousel + Video',
      status: 'Scheduled'
    }
  ];

  return (
    <Card padding="md" className="space-y-4">
      <div className="flex items-center justify-between border-b border-krew-border/60 pb-3">
        <div>
          <h4 className="font-display font-bold text-white text-base">
            Upcoming Distribution Slate
          </h4>
          <p className="text-xs text-krew-text-secondary">
            Multi-platform campaign cadence prepared by The Publicist.
          </p>
        </div>
        <span className="text-xs font-mono text-krew-lavender flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          <span>Week 46 Slate</span>
        </span>
      </div>

      <div className="space-y-2.5">
        {scheduleItems.map((item, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl bg-krew-surface border border-krew-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-krew-card border border-krew-border shrink-0 mt-0.5">
                {item.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-semibold text-white">{item.platform}</span>
                  <span className="text-[10px] text-krew-text-muted font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.day} • {item.time}
                  </span>
                </div>
                <p className="text-krew-text-secondary line-clamp-1">{item.title}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <span className="text-[10px] font-mono bg-krew-card px-2 py-0.5 rounded border border-krew-border text-krew-text-muted">
                {item.format}
              </span>
              <Badge variant="cyan" size="xs">
                {item.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

