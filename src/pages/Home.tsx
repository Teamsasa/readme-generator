import React, { useState } from "react";
import Input from "../components/Input";
import Selector from "../components/Selector";
import Button from "../components/Button";
import GeneratedCode from "../components/GeneratedCode";
import { CardData } from "../components/Selector";
import { halfSizeCards } from "../constants";
import dedent from "ts-dedent";

const label1Map: { [key: string]: string } = {
  "Top languages used in repository card": "repos-per-language",
  "Top languages in commits card": "most-commit-language",
  "GitHub stats card": "stats",
  "Productive time card": "productive-time",
};

const Home: React.FC = () => {
  const [username, setUsername] = useState("");
  const [selectedItems, setSelectedItems] = useState<CardData[]>(
    [] as CardData[],
  );
  const [code, setCode] = useState("");

  const handleGenerateCode = () => {
    let generatedCode = "";
    let currentGroup: CardData[] = [];
    let insideGroup = false;

    if (!username) {
      alert(
        "🔴Error : Username is required.\nPlease enter your GitHub username.",
      );
      return;
    }

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
      groupHtml += dedent`
        <div style="display: flex; justify-content: ${alignment}; align-items: center; flex-wrap: nowrap; margin-bottom: 10px;">
          ${cardsToDisplay
            .map((item) =>
              item.label1 === "github readme stats"
                ? dedent`<img src="https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${item.label2}" />`
                : dedent`<img src="https://github-profile-summary-cards.vercel.app/api/cards/${label1Map[item.label1] || ""}?username=${username}&count_private=true&theme=${item.label2}" style="margin-right: 10px;"/>`
            )
            .join("\n")}
        </div>
      `;
    }
    return groupHtml;
  };

  const generateItemHtml = (item: CardData): string => {
    if (item.label1 === "profile-trophy") {
      return `<div align="${item.label3}"><img src="https://github-profile-trophy.vercel.app/?username=${username}&rank=-?&theme=${item.label2}"/></div>`;
    } else if (item.label1 === "Profile details card") {
      return `<div align="${item.label3}"><img src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${username}&count_private=true&theme=${item.label2}"/></div>`;
    } else if (item.label1 === "readme typing svg") {
      return `<div align="${item.label3}"><img src="https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&repeat=true&width=435&lines=${item.label2.replaceAll(" ", "+").replaceAll("\n", ";")}" alt="Typing SVG" /></div>`;
    } else if (item.label1 === "Static Badge") {
      return `<div align="${item.label3}"><img src="https://img.shields.io/badge/${item.label2}-${item.label3}-${item.label4}" /></div>`;
    } else if (item.label1 === "skill icons") {
      return `<div align="${item.label3}"><img src="https://skillicons.dev/icons?i=${item.label2}" /></div>`;
    } else if (item.label1 === "typograssy") {
      return `<div align="${item.label3}"><img alt="typograssy" src="https://typograssy.deno.dev/api?text=${item.label2}"></div>`;
    } else if (item.label1 === "title") {
      return `<h1 align="${item.label3}">${item.label2}</h1>`;
    } else if (item.label1 === "body") {
      return `<p align="${item.label3}">${item.label2}</p>`;
    } else {
      return `Option: ${item.label1} could not be generated`;
    }
  };

  return (
    <div className="container mx-auto py-10 p-4 bg-neutral-100 text-black dark:bg-zinc-900 dark:rounded-md dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-xl dark:bg-opacity-30 dark:border dark:border-zinc-500">
      <h2 className="mb-4 pb-4 text-xl text-center dark:text-white">
        Enter your GitHub username and select the profile cards you want to
        generate code for.
      </h2>
      <div className="flex justify-center">
        <div className="w-1/4">
          <Input
            value={username}
            onChange={setUsername}
            placeholder="Enter your GitHub username"
          />
        </div>
      </div>
      <hr className="my-8 mx-20 border-zinc-500" />
      <h2 className="pb-8 text-xl text-center dark:text-white">
        Select the profile cards you want to generate code.
      </h2>
      <Selector
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
      <hr className="my-8 mx-20 border-zinc-500" />
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
