"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QuestionPlugin } from "@/types/plugin";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PluginMarketplaceProps {
  plugins: QuestionPlugin[];
  installedPlugins: Set<string>;
  onInstall: (pluginId: string) => Promise<void>;
  onUninstall: (pluginId: string) => Promise<void>;
}

export function PluginMarketplace({
  plugins,
  installedPlugins,
  onInstall,
  onUninstall,
}: PluginMarketplaceProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStandard, setSelectedStandard] = useState<string | null>(null);
  const [selectedPlugin, setSelectedPlugin] = useState<QuestionPlugin | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const standards = Array.from(new Set(plugins.map((p) => p.standard)));

  const handleInstall = async (plugin: QuestionPlugin) => {
    try {
      setIsLoading(plugin.id);
      await onInstall(plugin.id);
      toast.success(`${plugin.name} installed successfully`);
    } catch (error) {
      toast.error("Failed to install plugin");
    } finally {
      setIsLoading(null);
    }
  };

  const handleUninstall = async (plugin: QuestionPlugin) => {
    try {
      setIsLoading(plugin.id);
      await onUninstall(plugin.id);
      toast.success(`${plugin.name} uninstalled successfully`);
    } catch (error) {
      toast.error("Failed to uninstall plugin");
    } finally {
      setIsLoading(null);
    }
  };

  const filteredPlugins = plugins.filter(
    (plugin) =>
      (!selectedStandard || plugin.standard === selectedStandard) &&
      (!searchQuery ||
        plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plugin.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header and Search */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-medium tracking-tight text-emerald-800">
            ESG Standards Marketplace
          </h2>
          <p className="text-sm text-emerald-600">
            Browse and install sustainability reporting standards
          </p>
        </div>
      </div>

      {/* Standards Filter */}
      <div className="flex gap-4 justify-between">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-emerald-700">
            Filter by Standard
          </h3>
          <div className="flex gap-2 flex-wrap">
            {standards.map((standard) => (
              <Button
                key={standard}
                variant={selectedStandard === standard ? "default" : "outline"}
                onClick={() =>
                  setSelectedStandard(
                    selectedStandard === standard ? null : standard
                  )
                }
                className={cn(
                  "text-sm",
                  selectedStandard === standard
                    ? "bg-emerald-700/50 hover:bg-emerald-700/60"
                    : "bg-white/10 hover:bg-white/20"
                )}
              >
                {standard}
                {selectedStandard === standard && (
                  <span className="ml-2 text-xs">✕</span>
                )}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search standards..."
              className="w-full sm:w-[300px] p-3 rounded-xl border-emerald-400/40 bg-white/10 backdrop-blur-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="text-sm text-emerald-600">
        {filteredPlugins.length === 0
          ? "No plugins found"
          : `Showing ${filteredPlugins.length} plugin${
              filteredPlugins.length === 1 ? "" : "s"
            }`}
      </div>

      {/* Plugin Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredPlugins.length > 0 ? (
            filteredPlugins.map((plugin) => (
              <motion.div
                key={plugin.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="backdrop-blur-sm bg-white/10 border-emerald-400/40 h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-emerald-700">
                          {plugin.name}
                        </CardTitle>
                        <CardDescription className="text-emerald-600/80">
                          {plugin.description}
                        </CardDescription>
                      </div>
                      <Badge
                        variant="outline"
                        className="border-emerald-400/40"
                      >
                        {plugin.standard}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm space-y-1 text-emerald-600/80">
                      <div>Questions: {plugin.questions.length}</div>
                      <div>Category: {plugin.category}</div>
                      <div>Version: {plugin.version}</div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="ghost"
                      className="text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50/50"
                      onClick={() => setSelectedPlugin(plugin)}
                    >
                      View Details
                    </Button>
                    <Button
                      variant={
                        installedPlugins.has(plugin.id)
                          ? "destructive"
                          : "default"
                      }
                      disabled={isLoading === plugin.id}
                      onClick={() =>
                        installedPlugins.has(plugin.id)
                          ? handleUninstall(plugin)
                          : handleInstall(plugin)
                      }
                      className={
                        installedPlugins.has(plugin.id)
                          ? "bg-red-500/50 hover:bg-red-500/60"
                          : "bg-emerald-700/50 hover:bg-emerald-700/60"
                      }
                    >
                      {isLoading === plugin.id ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : installedPlugins.has(plugin.id) ? (
                        "Uninstall"
                      ) : (
                        "Install"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full flex flex-col items-center justify-center py-12 text-emerald-600"
            >
              <svg
                className="w-12 h-12 mb-4 text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-center">
                No plugins found matching your search criteria
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedStandard(null);
                }}
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Plugin Details Modal */}
      <AnimatePresence>
        {selectedPlugin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            onClick={() => setSelectedPlugin(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="backdrop-blur-md bg-white/10 border-emerald-400/40">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-emerald-700">
                        {selectedPlugin.name}
                      </CardTitle>
                      <CardDescription className="text-emerald-600/80">
                        {selectedPlugin.description}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="border-emerald-400/40">
                      {selectedPlugin.standard}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium text-emerald-700 mb-2">
                      Questions
                    </h3>
                    <div className="space-y-2 max-h-[400px] overflow-y-auto">
                      {selectedPlugin.questions.map((question) => (
                        <div
                          key={question.id}
                          className="p-3 rounded-lg bg-white/5 border border-emerald-400/20"
                        >
                          <div className="font-medium text-emerald-700">
                            {question.text}
                          </div>
                          <div className="text-sm text-emerald-600/80 mt-1">
                            Type: {question.type} | Unit: {question.unit} |
                            Code: {question.code}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedPlugin(null)}
                    className="border-emerald-400/40 bg-white/10 hover:bg-white/20"
                  >
                    Close
                  </Button>
                  <Button
                    variant={
                      installedPlugins.has(selectedPlugin.id)
                        ? "destructive"
                        : "default"
                    }
                    disabled={isLoading === selectedPlugin.id}
                    onClick={() =>
                      installedPlugins.has(selectedPlugin.id)
                        ? handleUninstall(selectedPlugin)
                        : handleInstall(selectedPlugin)
                    }
                    className={
                      installedPlugins.has(selectedPlugin.id)
                        ? "bg-red-500/50 hover:bg-red-500/60"
                        : "bg-emerald-700/50 hover:bg-emerald-700/60"
                    }
                  >
                    {isLoading === selectedPlugin.id ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : installedPlugins.has(selectedPlugin.id) ? (
                      "Uninstall"
                    ) : (
                      "Install"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
