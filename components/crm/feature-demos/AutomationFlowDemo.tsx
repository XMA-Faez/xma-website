"use client";

import React, { useState  } from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  Position,
  Handle,
} from "react-flow-renderer";

// add this near the top of your file
import "react-flow-renderer/dist/style.css";
import { motion } from "framer-motion";
import {
  Users,
  Filter,
  MessageCircle,
  Mail,
  Activity,
  Zap,
  CheckCircle2,
  Play,
  Pause,
} from "lucide-react";

// Enhanced Custom Node Component with glassmorphism
const CustomNode = ({ data }: { data: any }) => {
  const {
    title,
    description,
    icon,
    type,
    isActive,
    isCompleted,
    pulseAnimation,
  } = data;

  const getNodeStyles = () => {
    const baseStyles =
      "glass-primary backdrop-blur-xl rounded-2xl border-2 min-w-[160px] shadow-xl transition-all duration-500 transform-gpu";

    switch (type) {
      case "trigger":
        return `${baseStyles} ${isActive ? "border-blue-400 bg-gradient-to-br from-blue-500/10 to-blue-600/5 shadow-blue-400/20 shadow-2xl scale-105" : isCompleted ? "border-blue-300/50 bg-gradient-to-br from-blue-50/50 to-blue-100/30 dark:from-blue-900/10 dark:to-blue-800/5" : "border-blue-200/40 bg-gradient-to-br from-blue-50/30 to-blue-100/20 dark:from-blue-900/5 dark:to-blue-800/5"}`;
      case "condition":
        return `${baseStyles} ${isActive ? "border-purple-400 bg-gradient-to-br from-purple-500/10 to-purple-600/5 shadow-purple-400/20 shadow-2xl scale-105" : isCompleted ? "border-purple-300/50 bg-gradient-to-br from-purple-50/50 to-purple-100/30 dark:from-purple-900/10 dark:to-purple-800/5" : "border-purple-200/40 bg-gradient-to-br from-purple-50/30 to-purple-100/20 dark:from-purple-900/5 dark:to-purple-800/5"}`;
      case "action":
        return `${baseStyles} ${isActive ? "border-emerald-400 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 shadow-emerald-400/20 shadow-2xl scale-105" : isCompleted ? "border-emerald-300/50 bg-gradient-to-br from-emerald-50/50 to-emerald-100/30 dark:from-emerald-900/10 dark:to-emerald-800/5" : "border-emerald-200/40 bg-gradient-to-br from-emerald-50/30 to-emerald-100/20 dark:from-emerald-900/5 dark:to-emerald-800/5"}`;
      case "delay":
        return `${baseStyles} ${isActive ? "border-amber-400 bg-gradient-to-br from-amber-500/10 to-amber-600/5 shadow-amber-400/20 shadow-2xl scale-105" : isCompleted ? "border-amber-300/50 bg-gradient-to-br from-amber-50/50 to-amber-100/30 dark:from-amber-900/10 dark:to-amber-800/5" : "border-amber-200/40 bg-gradient-to-br from-amber-50/30 to-amber-100/20 dark:from-amber-900/5 dark:to-amber-800/5"}`;
      default:
        return `${baseStyles} border-slate-200/40 bg-gradient-to-br from-slate-50/30 to-slate-100/20 dark:from-slate-900/5 dark:to-slate-800/5`;
    }
  };

  const getIconColor = () => {
    switch (type) {
      case "trigger":
        return isActive ? "text-blue-500" : "text-blue-400";
      case "condition":
        return isActive ? "text-purple-500" : "text-purple-400";
      case "action":
        return isActive ? "text-emerald-500" : "text-emerald-400";
      case "delay":
        return isActive ? "text-amber-500" : "text-amber-400";
      default:
        return "text-slate-400";
    }
  };

  return (
    <motion.div
      className={getNodeStyles()}
      initial={false}
      animate={{
        scale: isActive ? 1.05 : 1,
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      {(isActive || pulseAnimation) && (
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-current opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      <div className="relative p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <motion.div
              className={`p-3 rounded-xl ${getIconColor()} bg-white/20 dark:bg-black/20 backdrop-blur-sm`}
              animate={isActive ? { rotate: [0, 5, -5, 0] } : {}}
              transition={{
                duration: 0.5,
                repeat: isActive ? Infinity : 0,
                repeatDelay: 2,
              }}
            >
              {React.cloneElement(icon, { className: "w-6 h-6" })}
            </motion.div>

            {isCompleted && !isActive && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-emerald-500 text-white rounded-full p-1"
              >
                <CheckCircle2 className="w-4 h-4" />
              </motion.div>
            )}

            {isActive && (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full p-1"
              >
                <Zap className="w-4 h-4" />
              </motion.div>
            )}
          </div>

          <div className="text-center space-y-2">
            <h4 className="font-bold text-base text-slate-900 dark:text-white leading-tight">
              {title}
            </h4>
            <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </motion.div>
  );
};

// Define initial nodes in horizontal layout with fixed positions
const initialNodes = [
  {
    id: "1",
    type: "custom",
    position: { x: 50, y: 150 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: {
      title: "New Lead",
      description: "Captured from website form",
      icon: <Users />,
      type: "trigger",
    },
  },
  {
    id: "2",
    type: "custom",
    position: { x: 350, y: 150 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: {
      title: "Lead Scoring",
      description: "AI analyzes lead quality & intent",
      icon: <Filter />,
      type: "condition",
    },
  },
  {
    id: "3",
    type: "custom",
    position: { x: 650, y: 150 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: {
      title: "WhatsApp Outreach",
      description: "Personalized welcome message",
      icon: <MessageCircle />,
      type: "action",
    },
  },
  {
    id: "4",
    type: "custom",
    position: { x: 950, y: 150 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: {
      title: "Email Sequence",
      description: "Add to nurturing campaign",
      icon: <Mail />,
      type: "action",
    },
  },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "straight",
    animated: true,
    style: { strokeWidth: 2, stroke: "#3b82f6" },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    type: "straight",
    animated: true,
    style: { strokeWidth: 2, stroke: "#3b82f6" },
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    type: "straight",
    animated: true,
    style: { strokeWidth: 2, stroke: "#3b82f6" },
  },
];

const AutomationFlowDemo = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  
  // Custom node change handler that prevents position changes
  const handleNodesChange = React.useCallback((changes: any) => {
    // Filter out position changes to keep nodes fixed
    const filteredChanges = changes.filter(
      (change: any) => change.type !== 'position' && change.type !== 'select'
    );
    if (filteredChanges.length > 0) {
      onNodesChange(filteredChanges);
    }
  }, [onNodesChange]);

  // Animation logic to progress through the flow
  React.useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        const next = (prev + 1) % (nodes.length + 1); // +1 to show completion

        // Update node states based on current step
        setNodes((nds) =>
          nds.map((node, index) => ({
            ...node,
            data: {
              ...node.data,
              isActive: index === next - 1,
              isCompleted: index < next - 1,
            },
          })),
        );

        // Update edge states
        setEdges((eds) =>
          eds.map((edge, index) => ({
            ...edge,
            animated: index < next - 1,
            style: {
              strokeWidth: index < next - 1 ? 3 : 2,
              stroke: index < next - 1 ? "#10b981" : "#3b82f6",
            },
          })),
        );

        return next;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isPlaying, nodes.length, setNodes, setEdges]);

  return (
    <div className="w-full h-full glass-primary backdrop-blur-xl rounded-2xl overflow-hidden border border-slate-200/50 dark:border-zinc-800/50">
      {/* React Flow Container */}
      <div className="relative" style={{ width: "100%", height: "400px" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={handleNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={(params) => setEdges((eds) => addEdge(params, eds))}
          nodeTypes={{ custom: CustomNode }}
          defaultEdgeOptions={{
            type: "straight",
            animated: true,
            style: { strokeWidth: 2, stroke: "#3b82f6" },
          }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          panOnDrag={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          className="react-flow-subflows-example"
          style={{ backgroundColor: "transparent" }}
        >
          <Background
            color="hsl(215 20% 90%)"
            gap={24}
            size={1}
            className="opacity-30 dark:opacity-20"
          />
        </ReactFlow>
      </div>
    </div>
  );
};

export default AutomationFlowDemo;
