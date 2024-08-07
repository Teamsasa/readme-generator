import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import parse from "html-react-parser";

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
    <>
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
      <div className="bg-gray-50 p-2 border border-gray-300 rounded mt-2">
        <style>
          {`
          h1 {
            font-size: 36px;
          }
        `}
        </style>
        {parse(code)}
      </div>
    </>
  );
};

export default GeneratedCode;
