import React from "react";
import { LuMessageSquareText } from "react-icons/lu";

const nodeTypes = [
  {
    type: "textUpdater",
    label: "Send Message",
    icon: LuMessageSquareText,
    color: "#7CE5A3",
    description: "Send a message via WhatsApp",
  },
];

export function NodesPanel() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="bg-white border-l border-gray-200 w-1/5 h-full overflow-y-auto shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Nodes</h2>
        <p className="text-sm text-gray-600 mt-1">Drag and drop to add nodes</p>
      </div>

      <div className="p-4 space-y-3">
        {nodeTypes.map((nodeType) => {
          const IconComponent = nodeType.icon;
          return (
            <div
              key={nodeType.type}
              className="bg-white border border-gray-200 rounded-lg p-3 cursor-grab hover:shadow-md transition-shadow duration-200 hover:border-gray-300"
              draggable
              onDragStart={(event) => onDragStart(event, nodeType.type)}
              onDragEnd={(event) => {
                event.preventDefault();
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="p-2 rounded-md flex-shrink-0"
                  style={{ backgroundColor: nodeType.color + "20" }}
                >
                  <IconComponent
                    className="text-xl"
                    style={{ color: nodeType.color }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-800 text-sm">
                    {nodeType.label}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {nodeType.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-200">
        <p className="text-xs text-gray-400 text-center">
          More node types coming soon...
        </p>
      </div>
    </div>
  );
}
