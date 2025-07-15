import React, { useCallback, useRef, useState, useEffect } from "react";
import { TextUpdaterNode } from "./components/TextUpdaterNode";
import { NodesPanel } from "./components/NodesPanel";
import SettingsPanel from "./components/SettingsPanel";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  NodeToolbar,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const reactFlowWrapper = useRef(null);
  const colorMode = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    if (error) {
      toast.error(error);
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      toast.success(success);
      const timer = setTimeout(() => setSuccess(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: { label: `${type} node`, message: "" },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  const handleNodeMessageChange = (newMessage) => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === selectedNode.id
          ? { ...n, data: { ...n.data, message: newMessage } }
          : n
      )
    );
    setSelectedNode((node) => ({
      ...node,
      data: { ...node.data, message: newMessage },
    }));
  };

  const handleDeleteNode = () => {
    if (selectedNode) {
      setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id));
      setEdges((eds) =>
        eds.filter(
          (e) => e.source !== selectedNode.id && e.target !== selectedNode.id
        )
      );
      setSelectedNode(null);
    }
  };

  const handleSave = () => {
    setSuccess("");
    if (nodes.length <= 1) {
      setError("Please add at least 2 nodes");
      return;
    }
    const nodeIdsWithIncoming = new Set(edges.map((e) => e.target));
    const nodesWithNoIncoming = nodes.filter(
      (n) => !nodeIdsWithIncoming.has(n.id)
    );
    if (nodesWithNoIncoming.length > 1) {
      setError("Cannot save Flow, no node can have empty target handles.");
      return;
    }
    setError("");
    setSuccess("Saved successfully!");
  };

  const nodeTypes = {
    textUpdater: TextUpdaterNode,
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="w-full flex items-center justify-between px-8 py-2 bg-white border-b border-gray-200 z-10">
        <div className="flex-1 flex justify-center">
          <div className=" px-6 py-2 text-center text-xl font-semibold text-gray-800">
            BiteSpeed WhatsApp Flow Editor
          </div>
        </div>
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow ml-4"
        >
          Save Changes
        </button>
      </div>

      <div className="flex flex-1">
        <div ref={reactFlowWrapper} className="flex-grow">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDragOver={onDragOver}
            onDrop={onDrop}
            colorMode={colorMode}
            onNodeClick={onNodeClick}
            onPaneClick={() => setSelectedNode(null)}
          >
            <NodeToolbar />
            <Controls />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
        </div>
        <AnimatePresence mode="wait">
          {selectedNode ? (
            <motion.div
              key="settings"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="h-full w-1/5"
            >
              <SettingsPanel
                node={selectedNode}
                onChange={handleNodeMessageChange}
                onClose={() => setSelectedNode(null)}
                onDelete={handleDeleteNode}
              />
            </motion.div>
          ) : (
            <motion.div
              key="nodes"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="h-full w-1/5"
            >
              <NodesPanel />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
