import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";

interface GeneratedCodeProps {
  code: string;
}

const GeneratedCode: React.FC<GeneratedCodeProps> = ({ code }) => {
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        alert("コードがクリップボードにコピーされました！");
      })
      .catch((err) => {
        console.error("コピーに失敗しました: ", err);
      });
  };

  return (
    <div className="relative bg-gray-200 p-4 mt-4 rounded shadow-inner">
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 text-blue-600 hover:text-blue-700 transition duration-300"
      >
        <FontAwesomeIcon icon={faClipboard} size="sm" />
      </button>
      <pre style={{ whiteSpace: "pre", overflow: "auto" }}>
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default GeneratedCode;
