import React, { useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { halfSizeCards } from "../constants";

export type CardData = {
  id: number;
  label1: string;
  label2: string;
  label3: string;
  label4: string;
};

type CardLabel = "label1" | "label2" | "label3" | "label4";

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
  "readme typing svg",
  "Static Badge",
  "skill icons",
  "typograssy",
  "github readme stats",
  "title",
  "body",
];

const alignProfiles: string[] = ["left", "center", "right"];

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

const colorProfiles: string[] = [
  "brightgreen",
  "blue",
  "red",
  "green",
  "yellow",
];

const githubReadmeStatsProfiles: string[] = [
  "default",
  "default_repocard",
  "transparent",
  "shadow_red",
  "shadow_green",
  "shadow_blue",
  "dark",
  "radical",
  "merko",
  "gruvbox",
  "gruvbox_light",
  "tokyonight",
  "onedark",
  "cobalt",
  "synthwave",
  "highcontrast",
  "dracula",
  "prussian",
  "monokai",
  "vue",
  "vue-dark",
  "shades-of-purple",
  "nightowl",
  "buefy",
  "blue-green",
  "algolia",
  "great-gatsby",
  "darcula",
  "bear",
  "solarized-dark",
  "solarized-light",
  "chartreuse-dark",
  "nord",
  "gotham",
  "material-palenight",
  "graywhite",
  "vision-friendly-dark",
  "ayu-mirage",
  "midnight-purple",
  "calm",
  "flag-india",
  "omni",
  "react",
  "jolly",
  "maroongold",
  "yeblu",
  "blueberry",
  "slateorange",
  "kacho_ga",
  "outrun",
  "ocean_dark",
  "city_lights",
  "github_dark",
  "github_dark_dimmed",
  "discord_old_blurple",
  "aura_dark",
  "panda",
  "noctis_minimus",
  "cobalt2",
  "swift",
  "aura",
  "apprentice",
  "moltack",
  "codeSTACKr",
  "rose_pine",
  "catppuccin_latte",
  "catppuccin_mocha",
  "date_night",
  "one_dark_pro",
  "rose",
  "holi",
  "neon",
  "blue_navy",
  "calm_pink",
  "ambient_gradient",
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
      label3: alignProfiles[0],
      label4: colorProfiles[0],
    };
    setSelectedItems([...selectedItems, newCard]);
  };

  const updateLabel = (id: number, labelType: CardLabel, value: string) => {
    setSelectedItems(
      selectedItems.map((card) => {
        if (card.id === id) {
          if (labelType === "label1") {
            if (value === "profile-trophy") {
              return {
                ...card,
                [labelType]: value,
                label2: trophyProfiles[0],
              };
            } else if (value === "title" || value === "body") {
              return {
                ...card,
                [labelType]: value,
                label2: "default",
                label3: alignProfiles[0],
              };
            } else if (value === "readme typing svg") {
              return {
                ...card,
                [labelType]: value,
                label2: "this is first line\nthis is second line",
              };
            } else if (value === "Static Badge") {
              return {
                ...card,
                [labelType]: value,
                label2: "any text",
                label3: "you like",
                label4: colorProfiles[0],
              };
            } else if (value === "skill icons") {
              return {
                ...card,
                [labelType]: value,
                label2: "react,typescript,javascript,html,css",
              };
            } else if (value === "typograssy") {
              return {
                ...card,
                [labelType]: value,
                label2: "Hello world こんにちは世界",
              };
            } else if (value === "github readme stats") {
              return {
                ...card,
                [labelType]: value,
                label2: githubReadmeStatsProfiles[0],
              };
            } else {
              return {
                ...card,
                [labelType]: value,
                label2: cardProfiles[0],
              };
            }
          }
          return { ...card, [labelType]: value };
        }
        return card;
      }),
    );
  };

  const removeCard = (id: number) => {
    setSelectedItems(selectedItems.filter((card) => card.id !== id));
  };

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const newItems = [...selectedItems];
    const [reorderedItem] = newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, reorderedItem);
    setSelectedItems(newItems);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4 grid grid-cols-2 gap-4">
        {selectedItems.map((card, index) => (
          <DraggableCard
            key={card.id}
            index={index}
            card={card}
            moveCard={moveCard}
            updateLabel={updateLabel}
            removeCard={removeCard}
            selectedItems={selectedItems}
          />
        ))}
        <div className="flex justify-center mt-4 col-span-2">
          <button
            onClick={addCard}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              + Add item
            </span>
          </button>
        </div>
      </div>
    </DndProvider>
  );
};

interface DraggableCardProps {
  card: CardData;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  updateLabel: (id: number, labelType: CardLabel, value: string) => void;
  removeCard: (id: number) => void;
  selectedItems: CardData[];
}

const DraggableCard: React.FC<DraggableCardProps> = ({
  card,
  index,
  moveCard,
  updateLabel,
  removeCard,
  selectedItems,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: "CARD",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: unknown) {
      const typedItem = item as { index: number };
      if (!ref.current) {
        return;
      }
      const dragIndex = typedItem.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      typedItem.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: "CARD",
    item: () => ({ id: card.id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;
  dragPreview(drop(ref));

  const isRightCard =
    selectedItems
      .slice(0, index + 1)
      .reverse()
      .reduce(
        (acc, cur) => {
          if (halfSizeCards.includes(cur.label1)) {
            return {
              count: acc.isContinuous ? acc.count + 1 : acc.count,
              isContinuous: acc.isContinuous && true,
            };
          } else {
            return {
              count: acc.count,
              isContinuous: false,
            };
          }
        },
        { count: 0, isContinuous: true },
      ).count %
      2 ===
      0 && halfSizeCards.includes(card.label1);

  return (
    <div
      ref={ref}
      style={{ opacity }}
      className={`border p-4 mb-4 dark:text-white dark:bg-zinc-900 dark:rounded-md dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-xl dark:bg-opacity-30 dark:border dark:border-zinc-500 ${
        halfSizeCards.includes(card.label1) ? "col-span-1" : "col-span-2"
      }`}
    >
      <div className="flex items-center mb-2">
        <div ref={drag} className="cursor-move mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M8 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8-16a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
          </svg>
        </div>
        <select
          className="w-full p-2 mr-2 dark:text-white dark:bg-zinc-900 dark:rounded-md dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-xl dark:bg-opacity-30 dark:border dark:border-zinc-500"
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
          <>
            <input
              type="text"
              className="w-full p-2 mr-2 dark:text-white dark:bg-zinc-900 dark:rounded-md dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-xl dark:bg-opacity-30 dark:border dark:border-zinc-500"
              value={card.label2}
              onChange={(e) => updateLabel(card.id, "label2", e.target.value)}
            />
          </>
        ) : card.label1 === "readme typing svg" ? (
          <textarea
            className="w-full p-2 border rounded mr-2 bg-white dark:bg-neutral-800 dark:border-neutral-600"
            value={card.label2}
            onChange={(e) => updateLabel(card.id, "label2", e.target.value)}
          />
        ) : card.label1 === "Static Badge" ? (
          <>
            <input
              type="text"
              className="w-2/5 p-2 border rounded mr-2 bg-white dark:bg-neutral-800 dark:border-neutral-600"
              value={card.label2}
              onChange={(e) => updateLabel(card.id, "label2", e.target.value)}
            />
            <input
              type="text"
              className="w-2/5 p-2 border rounded mr-2 bg-white dark:bg-neutral-800 dark:border-neutral-600"
              value={card.label3}
              onChange={(e) => updateLabel(card.id, "label3", e.target.value)}
            />
            {/* optional color choise */}
            <select
              className="w-1/5 p-2 border rounded mr-2 bg-white dark:bg-neutral-800 dark:border-neutral-600"
              value={card.label4}
              onChange={(e) => updateLabel(card.id, "label4", e.target.value)}
            >
              {colorProfiles.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </>
        ) : card.label1 === "skill icons" || card.label1 === "typograssy" ? (
          <input
            type="text"
            className="w-full p-2 border rounded mr-2 bg-white dark:bg-neutral-800 dark:border-neutral-600"
            value={card.label2}
            onChange={(e) => updateLabel(card.id, "label2", e.target.value)}
          />
        ) : (
          <select
            className="w-full p-2 mr-2 dark:text-white dark:bg-zinc-900 dark:rounded-md dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-xl dark:bg-opacity-30 dark:border dark:border-zinc-500"
            value={card.label2}
            onChange={(e) => updateLabel(card.id, "label2", e.target.value)}
          >
            {(card.label1 === "profile-trophy"
              ? trophyProfiles
              : card.label1 === "github readme stats"
                ? githubReadmeStatsProfiles
                : cardProfiles
            ).map((profile) => (
              <option key={profile} value={profile}>
                {profile}
              </option>
            ))}
          </select>
        )}
        {!isRightCard && (
          <select
            className="w-1/2 p-2 dark:text-white dark:bg-zinc-900 dark:rounded-md dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-xl dark:bg-opacity-30 dark:border dark:border-zinc-500"
            value={card.label3}
            onChange={(e) => updateLabel(card.id, "label3", e.target.value)}
          >
            {alignProfiles.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
        <button
          onClick={() => removeCard(card.id)}
          className="ml-2 text-red-500 hover:text-red-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M19 6h-4V5a3 3 0 0 0-6 0v1H5v2h14V6zm-7 0V5a1 1 0 1 1 2 0v1h-2zM6 9v12a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V9H6z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Selector;
