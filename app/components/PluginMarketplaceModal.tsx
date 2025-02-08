"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PluginMarketplace } from "./PluginMarketplace";
import { QuestionPlugin } from "@/types/plugin";
import { availablePlugins } from "@/plugins";

interface PluginMarketplaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInstall: (plugin: QuestionPlugin) => void;
  onUninstall: (pluginId: string) => void;
  installedPlugins: Set<string>;
}

export function PluginMarketplaceModal({
  isOpen,
  onClose,
  onInstall,
  onUninstall,
  installedPlugins,
}: PluginMarketplaceModalProps) {
  const [plugins, setPlugins] = useState<QuestionPlugin[]>([]);

  const handleInstall = async (pluginId: string) => {
    const plugin = availablePlugins.find((p) => p.id === pluginId);
    if (plugin) {
      onInstall(plugin);
    }
  };

  const handleUninstall = async (pluginId: string) => {
    const newPlugins = new Set(installedPlugins);
    newPlugins.delete(pluginId);
    onUninstall(pluginId);
    // You could add a toast notification here
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="absolute inset-4 md:inset-10 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl overflow-hidden"
          >
            {/* Grainy overlay */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Close button */}
            <div className="absolute top-4 right-4 z-10">
              <Button
                variant="outline"
                size="icon"
                onClick={onClose}
                className="rounded-full"
              >
                ✕
              </Button>
            </div>

            {/* Content */}
            <div className="absolute inset-0 overflow-y-auto">
              <PluginMarketplace
                plugins={availablePlugins}
                installedPlugins={installedPlugins}
                onInstall={handleInstall}
                onUninstall={handleUninstall}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
