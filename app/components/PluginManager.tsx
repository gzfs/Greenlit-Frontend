"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { QuestionPlugin } from "@/types/plugin";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export function PluginManager() {
  const [plugins, setPlugins] = useState<QuestionPlugin[]>([]);
  const [enabledPlugins, setEnabledPlugins] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlugins();
  }, []);

  const loadPlugins = async () => {
    try {
      const response = await fetch("/api/plugins");
      const data = await response.json();
      setPlugins(data.plugins);

      // Load enabled plugins from localStorage
      const saved = localStorage.getItem("enabledPlugins");
      if (saved) {
        setEnabledPlugins(new Set(JSON.parse(saved)));
      }
    } catch (error) {
      toast.error("Failed to load plugins");
    } finally {
      setLoading(false);
    }
  };

  const togglePlugin = async (pluginId: string) => {
    try {
      const newEnabled = new Set(enabledPlugins);
      if (newEnabled.has(pluginId)) {
        newEnabled.delete(pluginId);
      } else {
        newEnabled.add(pluginId);
      }

      setEnabledPlugins(newEnabled);
      localStorage.setItem("enabledPlugins", JSON.stringify([...newEnabled]));

      toast.success(
        `Plugin ${newEnabled.has(pluginId) ? "enabled" : "disabled"}`
      );
    } catch (error) {
      toast.error("Failed to toggle plugin");
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading plugins...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-medium tracking-tight text-emerald-800">
        ESG Standards
      </h2>

      <div className="grid gap-4">
        {plugins.map((plugin) => (
          <motion.div
            key={plugin.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl border border-emerald-400/40 bg-white/10 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-emerald-700">{plugin.name}</h3>
                <p className="text-sm text-emerald-600">{plugin.description}</p>
                <div className="mt-1 text-xs text-emerald-500">
                  Version {plugin.version}
                </div>
              </div>

              <Switch
                checked={enabledPlugins.has(plugin.id)}
                onCheckedChange={() => togglePlugin(plugin.id)}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
