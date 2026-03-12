"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileEdit,
  Image as ImageIcon,
  Type,
  Calendar,
  Eye,
  Save,
  Check,
} from "lucide-react";

interface ContentField {
  id: string;
  label: string;
  type: "text" | "richtext" | "image" | "date" | "toggle";
  value: string;
  icon: React.ReactNode;
}

const contentFields: ContentField[] = [
  {
    id: "title",
    label: "Page Title",
    type: "text",
    value: "Our Growth Solutions",
    icon: <Type className="w-4 h-4" />,
  },
  {
    id: "description",
    label: "Description",
    type: "richtext",
    value: "Discover our integrated growth systems designed to help businesses generate leads, acquire customers, and scale revenue predictably.",
    icon: <FileEdit className="w-4 h-4" />,
  },
  {
    id: "hero_image",
    label: "Hero Image",
    type: "image",
    value: "solutions-hero-2024.jpg",
    icon: <ImageIcon className="w-4 h-4" />,
  },
  {
    id: "publish_date",
    label: "Publish Date",
    type: "date",
    value: "2026-03-04",
    icon: <Calendar className="w-4 h-4" />,
  },
];

const CMSContentDemo: React.FC = () => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [savedFields, setSavedFields] = useState<Set<string>>(new Set());
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);

  useEffect(() => {
    const cycleFields = () => {
      if (currentFieldIndex >= contentFields.length) {
        setTimeout(() => {
          setSavedFields(new Set());
          setEditingField(null);
          setCurrentFieldIndex(0);
        }, 2000);
        return;
      }

      const field = contentFields[currentFieldIndex];
      setEditingField(field.id);

      const saveTimer = setTimeout(() => {
        setSavedFields((prev) => new Set([...prev, field.id]));
        setEditingField(null);

        setTimeout(() => {
          setCurrentFieldIndex((prev) => prev + 1);
        }, 500);
      }, 1500);

      return () => clearTimeout(saveTimer);
    };

    const timer = setTimeout(cycleFields, currentFieldIndex === 0 ? 1000 : 500);
    return () => clearTimeout(timer);
  }, [currentFieldIndex]);

  return (
    <div className="w-full bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-amber-900/20 to-orange-900/20 border-b border-zinc-700 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
            <FileEdit className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              Sanity Studio
            </h3>
            <p className="text-[10px] text-zinc-400">
              Content Management
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-xs text-zinc-400">
            <Eye className="w-3 h-3" />
            <span className="hidden sm:inline">Preview</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-white text-xs font-medium">
            <Save className="w-3 h-3" />
            <span className="hidden sm:inline">Publish</span>
          </button>
        </div>
      </div>

      <div className="flex">
        <div className="hidden sm:block w-48 border-r border-zinc-700 p-3">
          <div className="text-[10px] uppercase tracking-wider text-zinc-500 mb-2 font-medium">
            Document Types
          </div>
          {["Pages", "Blog Posts", "Case Studies", "Testimonials", "Settings"].map(
            (item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className={`px-3 py-2 rounded-lg text-xs font-medium mb-1 cursor-pointer ${
                  index === 0
                    ? "bg-amber-500/10 text-amber-400"
                    : "text-zinc-400 hover:bg-zinc-800"
                }`}
              >
                {item}
              </motion.div>
            ),
          )}
        </div>

        <div className="flex-1 p-4 sm:p-6">
          <div className="max-w-xl">
            <div className="mb-4 pb-3 border-b border-zinc-700">
              <h4 className="text-sm font-bold text-white">
                Edit Page Content
              </h4>
              <p className="text-[10px] text-zinc-400">
                Changes are saved automatically
              </p>
            </div>

            <div className="space-y-4">
              {contentFields.map((field, index) => {
                const isEditing = editingField === field.id;
                const isSaved = savedFields.has(field.id);

                return (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`p-3 rounded-xl border transition-all duration-300 ${
                      isEditing
                        ? "border-amber-500/50 bg-amber-900/10"
                        : isSaved
                          ? "border-emerald-500/30 bg-emerald-900/10"
                          : "border-zinc-700 bg-zinc-800/50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`${isEditing ? "text-amber-500" : isSaved ? "text-emerald-500" : "text-zinc-500"}`}
                        >
                          {field.icon}
                        </span>
                        <label className="text-xs font-medium text-zinc-400">
                          {field.label}
                        </label>
                      </div>
                      {isEditing && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex items-center gap-1 text-amber-500"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                          <span className="text-[10px] font-medium">Editing</span>
                        </motion.div>
                      )}
                      {isSaved && !isEditing && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex items-center gap-1 text-emerald-500"
                        >
                          <Check className="w-3 h-3" />
                          <span className="text-[10px] font-medium">Saved</span>
                        </motion.div>
                      )}
                    </div>

                    {field.type === "image" ? (
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-10 rounded-lg bg-gradient-to-br from-blue-800 to-blue-900 flex items-center justify-center">
                          <ImageIcon className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                          <div className="text-xs text-zinc-300">
                            {field.value}
                          </div>
                          <div className="text-[10px] text-zinc-500">
                            1920 x 1080 &bull; 245 KB
                          </div>
                        </div>
                      </div>
                    ) : field.type === "date" ? (
                      <div className="text-sm text-zinc-300 font-mono">
                        {field.value}
                      </div>
                    ) : (
                      <div
                        className={`text-sm text-zinc-300 ${
                          isEditing ? "border-b border-amber-400/50 pb-0.5" : ""
                        }`}
                      >
                        {field.value}
                        {isEditing && (
                          <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{
                              duration: 0.5,
                              repeat: Infinity,
                              repeatType: "reverse",
                            }}
                            className="inline-block w-0.5 h-4 bg-amber-500 ml-0.5 align-middle"
                          />
                        )}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CMSContentDemo;
