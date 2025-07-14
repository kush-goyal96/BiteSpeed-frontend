import React, { useCallback, useRef, useState } from "react";
import { TextUpdaterNode } from "./components/TextUpdaterNode";
import { NodesPanel } from "./components/NodesPanel";
import SettingsPanel from "./components/SettingsPanel";
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

// const initialNodes = [
//   {
//     id: "node-1",
//     type: "textUpdater",
//     position: { x: 0, y: 0 },
//     data: { value: 123 },
//   },
//   {
//     id: "2",
//     type: "textUpdater",
//     position: { x: 0, y: 100 },
//     data: { label: "2" },
//   },
// ];
// const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

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
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  const handleNodeLabelChange = (newLabel) => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === selectedNode.id
          ? { ...n, data: { ...n.data, label: newLabel } }
          : n
      )
    );
    setSelectedNode((node) => ({
      ...node,
      data: { ...node.data, label: newLabel },
    }));
  };

  // Save handler with validation logic
  const handleSave = () => {
    setSuccess(""); // Clear previous success
    if (nodes.length <= 1) {
      setError("Please add at least 2 nodes");
      return;
    }
    // Find nodes with no incoming edges (empty target handles)
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
    // Proceed with save logic here
  };

  const nodeTypes = {
    textUpdater: TextUpdaterNode,
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="w-full flex items-center justify-between px-8 py-2 bg-white border-b border-gray-200 z-10">
        <div className="flex-1 flex justify-center">
          {error && (
            <div className="bg-red-100 text-red-700 px-6 py-2 rounded shadow text-center">
              {error}
            </div>
          )}
          {!error && success && (
            <div className="bg-green-100 text-green-700 px-6 py-2 rounded shadow text-center">
              {success}
            </div>
          )}
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
        {selectedNode ? (
          <SettingsPanel
            node={selectedNode}
            onChange={handleNodeLabelChange}
            onClose={() => setSelectedNode(null)}
          />
        ) : (
          <NodesPanel />
        )}
      </div>
    </div>
  );
}
