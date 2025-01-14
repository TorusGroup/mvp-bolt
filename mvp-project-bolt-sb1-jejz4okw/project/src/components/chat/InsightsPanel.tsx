import React from 'react';
import { 
  Lightbulb, Target, AlertTriangle, Sparkles, GitCommit,
  Brain, ArrowRight, Info, Clock
} from 'lucide-react';
import type { 
  Insight, Analysis, Strategy, 
  ProjectContext, Planning 
} from './types';

interface InsightsPanelProps {
  insights?: Insight[];
  analysis?: Analysis;
  strategy?: Strategy;
  projectContext?: ProjectContext;
  planning?: Planning;
}

const insightTypeIcons: Record<string, typeof Target> = {
  requirement: Target,
  constraint: GitCommit,
  risk: AlertTriangle,
  opportunity: Sparkles,
  decision: Lightbulb
};

const insightTypeColors: Record<string, string> = {
  requirement: 'text-blue-400',
  constraint: 'text-purple-400',
  risk: 'text-red-400',
  opportunity: 'text-green-400',
  decision: 'text-yellow-400'
};

const impactColors: Record<string, string> = {
  high: 'bg-red-500/20 text-red-300',
  medium: 'bg-yellow-500/20 text-yellow-300',
  low: 'bg-green-500/20 text-green-300'
};

export function InsightsPanel({ 
  insights = [], 
  analysis, 
  strategy,
  projectContext,
  planning
}: InsightsPanelProps) {
  return (
    <div className="space-y-6">
      {/* Seção de Insights */}
      {insights && insights.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Lightbulb className="w-4 h-4 text-yellow-400" />
            <h4 className="font-medium text-yellow-400">Insights</h4>
          </div>

          <div className="space-y-3">
            {insights.map((insight) => {
              if (!insight || !insight.type) return null;

              const Icon = insightTypeIcons[insight.type];
              const typeColor = insightTypeColors[insight.type] || 'text-gray-400';
              const impactColor = insight.impact_level ? impactColors[insight.impact_level] : 'bg-gray-500/20 text-gray-300';

              return (
                <div
                  key={insight.id}
                  className="bg-white/5 rounded-lg p-3 space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      {Icon && <Icon className={`w-4 h-4 ${typeColor}`} />}
                      <span className={`text-sm ${typeColor}`}>
                        {insight.type ? insight.type.charAt(0).toUpperCase() + insight.type.slice(1) : 'Desconhecido'}
                      </span>
                    </div>
                    {insight.impact_level && (
                      <span className={`text-xs px-2 py-1 rounded-full ${impactColor}`}>
                        {insight.impact_level.toUpperCase()}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-white/90">{insight.content}</p>

                  {insight.tags && insight.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {insight.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {typeof insight.confidence === 'number' && (
                    <div className="text-xs text-white/50">
                      Confiança: {Math.round(insight.confidence * 100)}%
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Seção de Análise */}
      {analysis && (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Brain className="w-4 h-4 text-blue-400" />
            <h4 className="font-medium text-blue-400">Análise</h4>
          </div>

          <div className="space-y-3">
            {analysis.patterns && analysis.patterns.length > 0 && (
              <div className="bg-white/5 rounded-lg p-3">
                <h5 className="text-sm font-medium text-blue-300 mb-2">Padrões</h5>
                <div className="space-y-2">
                  {analysis.patterns.map((pattern, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-1 h-1 rounded-full bg-blue-400 mt-2" />
                      <p className="text-sm text-white/80">{pattern}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {analysis.opportunities && analysis.opportunities.length > 0 && (
              <div className="bg-white/5 rounded-lg p-3">
                <h5 className="text-sm font-medium text-green-300 mb-2">Oportunidades</h5>
                <div className="space-y-2">
                  {analysis.opportunities.map((opportunity, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Sparkles className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-white/80">{opportunity}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {analysis.risks && analysis.risks.length > 0 && (
              <div className="bg-white/5 rounded-lg p-3">
                <h5 className="text-sm font-medium text-red-300 mb-2">Riscos</h5>
                <div className="space-y-2">
                  {analysis.risks.map((risk, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-white/80">{risk}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Seção de Estratégia */}
      {strategy && (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-purple-400" />
            <h4 className="font-medium text-purple-400">Estratégia</h4>
          </div>

          <div className="space-y-3">
            {strategy.next_steps && strategy.next_steps.length > 0 && (
              <div className="bg-white/5 rounded-lg p-3">
                <h5 className="text-sm font-medium text-purple-300 mb-2">Próximos Passos</h5>
                <div className="space-y-2">
                  {strategy.next_steps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <ArrowRight className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-white/80">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {strategy.information_needed && strategy.information_needed.length > 0 && (
              <div className="bg-white/5 rounded-lg p-3">
                <h5 className="text-sm font-medium text-blue-300 mb-2">Informações Necessárias</h5>
                <div className="space-y-2">
                  {strategy.information_needed.map((info, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-white/80">{info}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {strategy.approach && (
              <div className="bg-white/5 rounded-lg p-3">
                <h5 className="text-sm font-medium text-green-300 mb-2">Abordagem</h5>
                <p className="text-sm text-white/80">{strategy.approach}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}