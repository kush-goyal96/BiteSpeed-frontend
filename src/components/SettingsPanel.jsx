import React from "react";

export default function SettingsPanel({ node, onChange, onClose }) {
  return (
    <div className="w-full p-4 bg-white border-l border-gray-200 h-full flex flex-col">
      <button
        onClick={onClose}
        className="mb-2 text-blue-600 hover:underline text-sm flex items-center gap-1"
      >
        <span>←</span> Back
      </button>
      <h3 className="my-2 text-lg font-semibold text-gray-800">Message</h3>
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Text
        <textarea
          placeholder="Enter your message here"
          value={node.data.message}
          onChange={(e) => onChange(e.target.value)}
          className="w-full min-h-[80px] mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm resize-none"
        />
      </label>
    </div>
  );
}
