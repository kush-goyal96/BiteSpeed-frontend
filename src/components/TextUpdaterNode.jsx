import { FaWhatsapp } from "react-icons/fa";
import { LuMessageSquareText } from "react-icons/lu";
import CustomHandle from "./CustomHandle";

export function TextUpdaterNode({ data }) {
  return (
    <div className="rounded-lg shadow-md bg-white border border-gray-200 w-64 relative">
      <div className="bg-[#7CE5A3] text-sm font-semibold py-2 rounded-t-lg flex gap-2 items-center px-2">
        <LuMessageSquareText className="text-xl" />
        <span>Send Message</span>
        <FaWhatsapp className="text-xl ml-auto" />
      </div>

      <div className="p-2 min-h-[40px]">
        <div className="text-sm text-gray-800 whitespace-pre-line break-words">
          {data.label || (
            <span className="text-gray-400 italic">No message</span>
          )}
        </div>
      </div>

      <CustomHandle
        type="source"
        position="right"
        className="w-2 h-2 bg-gray-500 p-1"
        connectioncount={1}
      />
      <CustomHandle
        type="target"
        position="left"
        className="w-2 h-2 bg-gray-500 p-1"
        connectioncount={-1}
      />
    </div>
  );
}
