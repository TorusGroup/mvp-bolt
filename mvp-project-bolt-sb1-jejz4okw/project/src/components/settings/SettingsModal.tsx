import React, { useState, useEffect } from 'react';
import { X, Save, Key, Bot } from 'lucide-react';
import { useSettings } from '../../hooks/useSettings';
import { AnimatedDiv } from '../animation';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { settings, saveSettings } = useSettings();
  const [formData, setFormData] = useState({
    openaiToken: '',
    anthropicToken: '',
    geminiToken: '',
    groqToken: '',
    architectPrompt: '',
    systemPrompt: '',
    assistantPrompt: '',
  });

  useEffect(() => {
    setFormData({
      openaiToken: settings.openaiToken || '',
      anthropicToken: settings.anthropicToken || '',
      geminiToken: settings.geminiToken || '',
      groqToken: settings.groqToken || '',
      architectPrompt: settings.architectPrompt || '',
      systemPrompt: settings.systemPrompt || '',
      assistantPrompt: settings.assistantPrompt || '',
    });
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveSettings(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <AnimatedDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-purple-900/90 to-indigo-900/90 rounded-xl w-full max-w-2xl 
                  max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold">Configurações</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium">
                OpenAI API Key
                <div className="relative">
                  <input
                    type="password"
                    value={formData.openaiToken}
                    onChange={(e) => setFormData(prev => ({ ...prev, openaiToken: e.target.value }))}
                    className="w-full bg-white/10 p-3 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder="sk-..."
                  />
                  <Key className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                </div>
              </label>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Anthropic API Key
                <div className="relative">
                  <input
                    type="password"
                    value={formData.anthropicToken}
                    onChange={(e) => setFormData(prev => ({ ...prev, anthropicToken: e.target.value }))}
                    className="w-full bg-white/10 p-3 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder="sk-ant-..."
                  />
                  <Key className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                </div>
              </label>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Google Gemini API Key
                <div className="relative">
                  <input
                    type="password"
                    value={formData.geminiToken}
                    onChange={(e) => setFormData(prev => ({ ...prev, geminiToken: e.target.value }))}
                    className="w-full bg-white/10 p-3 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder="AIza..."
                  />
                  <Key className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                </div>
              </label>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Groq API Key
                <div className="relative">
                  <input
                    type="password"
                    value={formData.groqToken}
                    onChange={(e) => setFormData(prev => ({ ...prev, groqToken: e.target.value }))}
                    className="w-full bg-white/10 p-3 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder="gsk-..."
                  />
                  <Key className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                </div>
              </label>
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium flex items-center space-x-2">
              <Bot className="w-5 h-5 text-purple-400" />
              <span>Prompt do Arquiteto</span>
            </label>
            <textarea
              value={formData.architectPrompt}
              onChange={(e) => setFormData(prev => ({ ...prev, architectPrompt: e.target.value }))}
              className="w-full bg-white/10 p-3 rounded-lg resize-none h-32 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Defina o comportamento e personalidade do Arquiteto AI..."
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Prompt do Sistema
              <textarea
                value={formData.systemPrompt}
                onChange={(e) => setFormData(prev => ({ ...prev, systemPrompt: e.target.value }))}
                className="w-full bg-white/10 p-3 rounded-lg resize-none h-32 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Defina o comportamento base do sistema..."
              />
            </label>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Prompt do Assistente
              <textarea
                value={formData.assistantPrompt}
                onChange={(e) => setFormData(prev => ({ ...prev, assistantPrompt: e.target.value }))}
                className="w-full bg-white/10 p-3 rounded-lg resize-none h-32 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Defina o comportamento do assistente..."
              />
            </label>
          </div>
        </form>

        <div className="p-6 border-t border-white/10">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-purple-500 hover:bg-purple-400 px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors ml-auto"
          >
            <Save className="w-5 h-5" />
            <span>Salvar Configurações</span>
          </button>
        </div>
      </AnimatedDiv>
    </div>
  );
}