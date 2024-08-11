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
      <div className="relative dark:text-white bg-gray-200 p-4 mt-4 rounded shadow-inner dark:bg-zinc-900 dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-xl dark:bg-opacity-30 dark:border dark:border-zinc-500">
        <button
          onClick={copyToClipboard}
          className="absolute top-1 right-2 dark:text-gray-400 dark:hover:text-gray-300 text-gray-400 hover:text-gray-500 transition duration-300"
        >
          <FontAwesomeIcon icon={faClipboard} size="lg" />
        </button>
        <pre style={{ whiteSpace: "pre", overflow: "auto" }}>
          <code>{code}</code>
        </pre>
      </div>
      <div className="relative dark:text-white bg-gray-200 p-4 mt-4 shadow-inner dark:bg-zinc-900 dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-xl dark:bg-opacity-30 dark:border dark:border-zinc-500">
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
