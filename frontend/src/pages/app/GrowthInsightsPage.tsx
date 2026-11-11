import React from 'react';
import {
  SAMPLE_ANALYTICS_METRICS,
  SAMPLE_PLATFORM_ENGAGEMENT,
  SAMPLE_GROWTH_TIMELINE,
  SAMPLE_PRODUCER_INSIGHTS
} from '../../data/sampleAnalytics';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { StatusPill } from '../../components/common/StatusPill';
import { Button } from '../../components/common/Button';
import {
  TrendingUp,
  BarChart3,
  Lightbulb,
  ArrowUpRight,
  Sparkles,
  PieChart,
  Layers,
  ArrowRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid
} from 'recharts';

export const GrowthInsightsPage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-krew-border/60 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-purple-400 bg-purple-500/15 px-2.5 py-0.5 rounded-full border border-purple-500/30 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
              <span>THE PRODUCER • GROWTH INTELLIGENCE</span>
            </span>
            <StatusPill type="sample" label="Demonstration Analytics Data" />
          </div>
          <h1 className="font-display font-bold text-3xl text-white tracking-tight">
            Growth Insights Desk
          </h1>
          <p className="text-xs sm:text-sm text-krew-text-secondary mt-1 max-w-2xl">
            The Producer audits cross-platform view velocity, audience retention curves, and comment sentiment, continuously feeding strategic learnings back into the Creator DNA Memory Engine.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="purple" size="sm">
            Self-Improving Loop Active
          </Badge>
          <StatusPill type="live_reserved" label="Live Telemetry Reserved" />
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SAMPLE_ANALYTICS_METRICS.map((metric, idx) => (
          <Card key={idx} padding="md" className="border-krew-border bg-krew-card">
            <span className="text-xs font-mono uppercase tracking-wider text-krew-text-muted">
              {metric.label}
            </span>
            <div className="flex items-baseline gap-2 mt-2 mb-1">
              <span className="font-display text-3xl font-bold text-white">
                {metric.value}
              </span>
              <span className="text-xs font-mono text-emerald-400 flex items-center">
                <ArrowUpRight className="w-3.5 h-3.5" />
                {metric.change}
              </span>
            </div>
            <p className="text-[11px] text-krew-text-secondary">
              {metric.timeframe}
            </p>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Cross-Platform Growth Timeline */}
        <div className="lg:col-span-2 space-y-8">
          <Card padding="lg" className="border-krew-border bg-krew-card space-y-4">
            <div className="flex items-center justify-between border-b border-krew-border/60 pb-3">
              <div>
                <h3 className="font-display text-lg font-bold text-white">
                  Audience Velocity & Cross-Platform Views
                </h3>
                <p className="text-xs text-krew-text-secondary">
                  Compounding reach across YouTube Long-form, Shorts, and Reels.
                </p>
              </div>
              <span className="text-xs font-mono text-krew-lavender bg-krew-surface px-2.5 py-1 rounded-lg border border-krew-border">
                Past 6 Weeks
              </span>
            </div>

            {/* Recharts Area Chart */}
            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={SAMPLE_GROWTH_TIMELINE}>
                  <defs>
                    <linearGradient id="viewGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop stopColor="#A855F7" stopOpacity={0.4} />
                      <stop stopColor="#A855F7" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="engGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop stopColor="#38BDF8" stopOpacity={0.3} />
                      <stop stopColor="#38BDF8" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2C2C3E" vertical={false} />
                  <XAxis dataKey="date" stroke="#71717A" fontSize={11} tickLine={false} />
                  <YAxis stroke="#71717A" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#15151D',
                      borderColor: '#2C2C3E',
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: '#fff'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="#A855F7"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#viewGrad)"
                    name="Views"
                  />
                  <Area
                    type="monotone"
                    dataKey="subscribers"
                    stroke="#38BDF8"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#engGrad)"
                    name="Followers"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Platform Performance Comparison Table */}
          <Card padding="md" className="space-y-4 bg-krew-card">
            <h4 className="font-display text-base font-bold text-white">
              Platform Distribution Efficiency Benchmarks
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-krew-border/60 text-krew-text-muted font-mono uppercase tracking-wider">
                    <th className="pb-3">Platform Format</th>
                    <th className="pb-3">Demonstration Views</th>
                    <th className="pb-3">Avg Retention</th>
                    <th className="pb-3">Engagement Rate</th>
                    <th className="pb-3">Growth Velocity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-krew-border/40">
                  {SAMPLE_PLATFORM_ENGAGEMENT.map((row, idx) => (
                    <tr key={idx} className="hover:bg-krew-surface/40 transition-colors">
                      <td className="py-3 font-semibold text-white">{row.platform}</td>
                      <td className="py-3 font-mono text-krew-text-secondary">
                        {(row.views / 1000).toFixed(0)}K
                      </td>
                      <td className="py-3 font-mono text-krew-lavender">{row.retentionPercent}%</td>
                      <td className="py-3 font-mono text-emerald-400">{row.engagementRate}%</td>
                      <td className="py-3 font-mono text-amber-400">+{row.growth}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right Col: The Producer's Strategic Recommendations */}
        <div className="space-y-6">
          <Card padding="md" className="space-y-4 bg-krew-card border-purple-500/30">
            <div className="border-b border-krew-border/60 pb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Producer Intelligence Loop</span>
              </span>
              <h4 className="font-display text-base font-bold text-white mt-0.5">
                DNA Feedback Directives
              </h4>
              <p className="text-xs text-krew-text-secondary mt-0.5">
                Learnings excavated from latest campaigns and pushed to Creator DNA memory.
              </p>
            </div>

            <div className="space-y-3">
              {SAMPLE_PRODUCER_INSIGHTS.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-krew-surface border border-krew-border space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white">{item.title}</span>
                    <Badge
                      variant={item.potentialImpact === 'Breakthrough' ? 'purple' : 'cyan'}
                      size="xs"
                    >
                      {item.potentialImpact}
                    </Badge>
                  </div>
                  <p className="text-xs text-krew-text-secondary leading-relaxed">
                    <strong className="text-krew-text-muted">Observed:</strong> {item.observation}
                  </p>
                  <p className="text-xs text-krew-lavender leading-relaxed bg-krew-card p-2 rounded-lg border border-krew-border/60">
                    <strong className="text-white">Directive:</strong> {item.recommendation}
                  </p>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs text-krew-lavender"
              onClick={() => {}}
            >
              Feed All Directives into DNA Core
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
