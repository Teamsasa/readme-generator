import React, { useState } from "react";
import Input from "../components/Input";
import Selector from "../components/Selector";
import Button from "../components/Button";
import GeneratedCode from "../components/GeneratedCode";
import { halfSizeCards } from "../components/Selector";

type CardData = {
  id: number;
  label1: string;
  label2: string;
  label3: string;
};

const Home: React.FC = () => {
  const [username, setUsername] = useState("");
  const [selectedItems, setSelectedItems] = useState<CardData[]>([] as CardData[]);
  const [code, setCode] = useState("");

  const handleGenerateCode = () => {
    let generatedCode = "";
    let currentGroup: CardData[] = [];
    let insideGroup = false;

    selectedItems.forEach((item) => {
      if (halfSizeCards.includes(item.label1)) {
        if (!insideGroup) {
          if (currentGroup.length > 0) {
            generatedCode += generateGroupHtml(currentGroup);
            currentGroup = [];
          }
          insideGroup = true;
        }
        currentGroup.push(item);
      } else {
        if (insideGroup) {
          generatedCode += generateGroupHtml(currentGroup);
          currentGroup = [];
          insideGroup = false;
        }
        generatedCode += generateItemHtml(item);
      }
    });

    if (currentGroup.length > 0) {
      generatedCode += generateGroupHtml(currentGroup);
    }

    setCode(generatedCode);
  };

  const generateGroupHtml = (group: CardData[]): string => {
    let groupHtml = "";
    for (let i = 0; i < group.length; i += 2) {
      const cardsToDisplay = group.slice(i, i + 2);
      const alignment = cardsToDisplay[0].label3;
      groupHtml += `
        <div style="display: flex; justify-content: ${alignment}; align-items: center; flex-wrap: nowrap; margin-bottom: 10px;">
          ${cardsToDisplay.map((item) => `
            <img src="https://github-profile-summary-cards.vercel.app/api/cards/${getCardUrl(item.label1)}?username=${username}&count_private=true&theme=${item.label2}" style="margin-right: 10px;"/>
          `).join("\n")}
        </div>
      `;
    }
    return groupHtml;
  };

  const generateItemHtml = (item: CardData): string => {
    const label1Map: { [key: string]: string } = {
      "Profile details card": "profile-details",
      "Top languages used in repository card": "repos-per-language",
      "Top languages in commits card": "most-commit-language",
      "GitHub stats card": "stats",
      "Productive time card": "productive-time",
    };

    if (item.label1 === "profile-trophy") {
      return `<div align="${item.label3}"><img src="https://github-profile-trophy.vercel.app/?username=${username}&rank=-?&theme=${item.label2}"/></div>`;
    } else if (Object.prototype.hasOwnProperty.call(label1Map, item.label1)) {
      return `<div align="${item.label3}"><img src="https://github-profile-summary-cards.vercel.app/api/cards/${label1Map[item.label1]}?username=${username}&count_private=true&theme=${item.label2}"/></div>`;
    } else if (item.label1 === "title") {
      return `<h1 align="${item.label3}">${item.label2}</h1>`;
    } else if (item.label1 === "body") {
      return `<p align="${item.label3}">${item.label2}</p>`;
    } else {
      return `Option: ${item.label1} could not be generated`;
    }
  };

  const getCardUrl = (label1: string): string => {
    const label1Map: { [key: string]: string } = {
      "Profile details card": "profile-details",
      "Top languages used in repository card": "repos-per-language",
      "Top languages in commits card": "most-commit-language",
      "GitHub stats card": "stats",
      "Productive time card": "productive-time",
    };

    return label1Map[label1] || "";
  };

  return (
    <div className="container mx-auto py-10 p-4 bg-neutral-50 text-black dark:bg-neutral-800 dark:text-white">
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
