import React from "react";

type CardData = {
  id: number;
  label1: string;
  label2: string;
};

type SelectorProps = {
  selectedItems: CardData[];
  setSelectedItems: React.Dispatch<React.SetStateAction<CardData[]>>;
};

const options: string[] = [
  "Profile details card",
  "Top languages used in repository card",
  "Top languages in commits card",
  "GitHub stats card",
  "Productive time card",
  "profile-trophy",
  "title",
  "body",
];

const cardProfiles: string[] = [
  "default",
  "2077",
  "dracula",
  "github",
  "github_dark",
  "gruvbox",
  "monokai",
  "nord_bright",
  "nord_dark",
  "radical",
  "solarized",
  "solarized_dark",
  "tokyonight",
  "vue",
  "zenburn",
  "transparent",
];

const trophyProfiles: string[] = [
  "flat",
  "onedark",
  "gruvbox",
  "dracula",
  "monokai",
  "chalk",
  "nord",
  "alduin",
  "darkhub",
  "juicyfresh",
  "buddhism",
  "oldie",
  "radical",
  "onestar",
  "discord",
  "algolia",
  "gitdimmed",
  "tokyonight",
  "matrix",
  "apprentice",
  "dark_dimmed",
  "dark_lover",
  "kimbie_dark",
  "no",
];

const Selector: React.FC<SelectorProps> = ({
  selectedItems,
  setSelectedItems,
}) => {
  const addCard = () => {
    const newCard: CardData = {
      id: Date.now(),
      label1: options[0],
      label2: cardProfiles[0],
    };
    setSelectedItems([...selectedItems, newCard]);
  };

  const updateLabel = (
    id: number,
    labelType: "label1" | "label2",
    value: string
  ) => {
    setSelectedItems(
      selectedItems.map((card) => {
        if (card.id === id) {
          if (labelType === "label1") {
            const profiles =
              value === "profile-trophy" ? trophyProfiles : cardProfiles;
            return {
              ...card,
              [labelType]: value,
              label2: profiles[0],
            };
          }
          return { ...card, [labelType]: value };
        }
        return card;
      })
    );
  };

  const removeCard = (id: number) => {
    setSelectedItems(selectedItems.filter((card) => card.id !== id));
  };

  return (
    <div className="p-4">
      {selectedItems.map((card) => (
        <div key={card.id} className="bg-white p-4 mb-4 rounded shadow-lg">
          <div className="flex items-center mb-2">
            <select
              className="w-full p-2 border rounded mr-2"
              value={card.label1}
              onChange={(e) => updateLabel(card.id, "label1", e.target.value)}
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {card.label1 === "title" || card.label1 === "body" ? (
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={card.label2}
                onChange={(e) => updateLabel(card.id, "label2", e.target.value)}
              />
            ) : (
              <select
                className="w-full p-2 border rounded"
                value={card.label2}
                onChange={(e) => updateLabel(card.id, "label2", e.target.value)}
              >
                {(card.label1 === "profile-trophy"
                  ? trophyProfiles
                  : cardProfiles
                ).map((profile) => (
                  <option key={profile} value={profile}>
                    {profile}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="flex justify-end mt-2">
            <button
              onClick={() => removeCard(card.id)}
              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
            >
              削除
            </button>
          </div>
        </div>
      ))}
      <div className="flex justify-center mt-4">
        <button
          onClick={addCard}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          項目を追加
        </button>
      </div>
    </div>
  );
};

export default Selector;
