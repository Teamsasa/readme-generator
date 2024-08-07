import React from "react";

interface GeneratedCodeProps {
  code: string;
}

const GeneratedCode: React.FC<GeneratedCodeProps> = ({ code }) => {
  return (
    <pre
      className="bg-gray-200 p-4 mt-4 rounded shadow-inner dark:bg-neutral-700 dark:text-white"
      style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}
    >
      <code>{code}</code>
    </pre>
  );
};

export default GeneratedCode;
