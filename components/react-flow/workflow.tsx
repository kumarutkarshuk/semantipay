"use client";
import React, { useCallback } from "react";
import {
  ReactFlow,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  type Node,
  type Edge,
  type OnConnect,
  Viewport,
  useReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/base.css";

import TurboNode, { type TurboNodeData } from "./TurboNode";
import TurboEdge from "./TurboEdge";
import "./workflow.css";
import { SiSlack } from "react-icons/si";
import { FaRobot } from "react-icons/fa";
import {
  Database,
  DollarSign,
  Mail,
  SearchIcon,
  Slack,
  TriangleAlert,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const initialNodes = [
  {
    id: "1",
    data: {
      icon: <DollarSign />,
      title: "Payroll Data",
      subtitle: "Fetch employee's payroll data",
    },
    type: "turbo",
  },
  {
    id: "2",
    data: {
      icon: <FaRobot size={25} />,
      title: "Generate Query & Embeddings",
      subtitle: "Compliance query generation",
    },
    type: "turbo",
  },
  {
    id: "3",
    data: {
      icon: <Database />,
      title: "Semantic Search",
      subtitle: "Retrieve relevant compliance rules",
    },
    type: "turbo",
  },
  {
    id: "4",
    data: {
      icon: <FaRobot size={25} />,
      title: "Processing...",
      subtitle: "Payroll processing using AI",
    },
    type: "turbo",
  },
  {
    id: "5",
    data: { icon: <TriangleAlert />, title: "Violation?", subtitle: "" },
    type: "turbo",
  },
  {
    id: "6",
    data: { icon: <Mail />, title: "Send Mail", subtitle: "Send a mail to HR" },
    type: "turbo",
  },
  {
    id: "7",
    data: {
      icon: <SiSlack size={25} />,
      title: "Send Message",
      subtitle: "Send a message to HR on Slack",
    },
    type: "turbo",
  },
];

const initialNodesMobile: Node<TurboNodeData>[] = [
  {
    ...initialNodes[0],
    position: { x: 0, y: 0 },
  },
  {
    ...initialNodes[1],
    position: { x: 1000, y: 50 },
  },
  {
    ...initialNodes[2],
    position: { x: 1000, y: 100 },
  },
  {
    ...initialNodes[3],
    position: { x: 1500, y: 150 },
  },
  {
    ...initialNodes[4],
    position: { x: 2000, y: 200 },
  },
  {
    ...initialNodes[5],
    position: { x: 2500, y: 0 },
  },
  {
    ...initialNodes[6],
    position: { x: 2500, y: 500 },
  },
];

const initialNodesDesktop: Node<TurboNodeData>[] = [
  {
    ...initialNodes[0],
    position: { x: 0, y: 0 },
  },
  {
    ...initialNodes[1],
    position: { x: 500, y: 50 },
  },
  {
    ...initialNodes[2],
    position: { x: 1000, y: 100 },
  },
  {
    ...initialNodes[3],
    position: { x: 1500, y: 150 },
  },
  {
    ...initialNodes[4],
    position: { x: 2000, y: 200 },
  },
  {
    ...initialNodes[5],
    position: { x: 2500, y: 0 },
  },
  {
    ...initialNodes[6],
    position: { x: 2500, y: 500 },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    animated: true,
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    animated: true,
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
    animated: true,
  },
  {
    id: "e5-6",
    source: "5",
    target: "6",
    animated: true,
  },
  {
    id: "e5-7",
    source: "5",
    target: "7",
    animated: true,
  },
];

const nodeTypes = {
  turbo: TurboNode,
};

const edgeTypes = {
  turbo: TurboEdge,
};

const defaultEdgeOptions = {
  type: "turbo",
  markerEnd: "edge-circle",
};

const Flow = () => {
  const isMobile = useIsMobile();
  const { setViewport } = useReactFlow();
  const [nodes, _, onNodesChange] = useNodesState(initialNodesDesktop);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  if (isMobile) {
    setViewport({ x: 50, y: 125, zoom: 0.5 });
  }

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    []
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      defaultEdgeOptions={defaultEdgeOptions}
    >
      <Controls showInteractive={false} />
      <svg>
        <defs>
          <linearGradient id="edge-gradient">
            <stop offset="0%" stopColor="hsl(var(--node-color-a))" />
            <stop offset="100%" stopColor="hsl(var(--node-color-b))" />
          </linearGradient>
        </defs>
      </svg>
    </ReactFlow>
  );
};

export default Flow;
