import React, { useState } from "react";
import Input from "../components/Input";
import Selector from "../components/Selector";
import Button from "../components/Button";
import GeneratedCode from "../components/GeneratedCode";

type CardData = {
  id: number;
  label1: string;
  label2: string;
};

const Home: React.FC = () => {
  const [username, setUsername] = useState("");
  const [selectedItems, setSelectedItems] = useState<CardData[]>([]);
  const [code, setCode] = useState("");

  const handleGenerateCode = () => {
    const generatedCode = selectedItems
      .map((item) => {
        const label1Map: { [key: string]: string } = {
          "Profile details card": "profile-details",
          "Top languages used in repository card": "repos-per-language",
          "Top languages in commits card": "most-commit-language",
          "GitHub stats card": "stats",
          "Productive time card": "productive-time",
        };

        if (item.label1 === "profile-trophy") {
          return `<img src="https://github-profile-trophy.vercel.app/?username=${username}&rank=-?&theme=${item.label2}"/>`;
        } else if (
          Object.prototype.hasOwnProperty.call(label1Map, item.label1)
        ) {
          return `<img src="https://github-profile-summary-cards.vercel.app/api/cards/${
            label1Map[item.label1]
          }?username=${username}&count_private=true&theme=${item.label2}"/>`;
        } else if (item.label1 === "title") {
          return `<h1>${item.label2}</h1>`;
        } else if (item.label1 === "body") {
          return `<p>${item.label2}</p>`;
        } else {
          return `Option: ${item.label1} could not be generated`;
        }
      })
      .join("\n");
    setCode(generatedCode);
  };

  return (
    <div className="container mx-auto py-10 p-4 bg-gray-50">
      <Input
        value={username}
        onChange={setUsername}
        placeholder="Enter your GitHub username"
      />
      <Selector
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
      <div className="mt-4 text-center">
        <Button onClick={handleGenerateCode}>Generate Code</Button>
      </div>
      <div className="mt-10">
        <GeneratedCode code={code} />
      </div>
    </div>
  );
};

export default Home;
