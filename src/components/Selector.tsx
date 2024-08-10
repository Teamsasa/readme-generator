import React, { useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type CardData = {
  id: number;
  label1: string;
  label2: string;
  label3?: string;
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

const halfSizeCards: string[] = [
  "Top languages used in repository card",
  "Top languages in commits card",
  "GitHub stats card",
  "Productive time card",
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

const Selector: React.FC<SelectorProps> = ({
  selectedItems,
  setSelectedItems,
}) => {
  const addCard = () => {
    const newCard: CardData = {
      id: Date.now(),
      label1: options[0],
      label2: cardProfiles[0],
      label3:
        options[0] === "title" || options[0] === "body" ? alignProfiles[0] : "",
    };
    setSelectedItems([...selectedItems, newCard]);
  };

  const updateLabel = (
    id: number,
    labelType: "label1" | "label2" | "label3",
    value: string,
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
              label3:
                value === "title" || value === "body"
                  ? alignProfiles[0]
                  : undefined,
            };
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
  updateLabel: (
    id: number,
    labelType: "label1" | "label2" | "label3",
    value: string,
  ) => void;
  removeCard: (id: number) => void;
}

const DraggableCard: React.FC<DraggableCardProps> = ({
  card,
  index,
  moveCard,
  updateLabel,
  removeCard,
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
              className="w-full p-2 dark:text-white dark:bg-zinc-900 dark:rounded-md dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-xl dark:bg-opacity-30 dark:border dark:border-zinc-500"
              value={card.label2}
              onChange={(e) => updateLabel(card.id, "label2", e.target.value)}
            />
          </>
        ) : (
          <select
            className="w-full p-2 dark:text-white dark:bg-zinc-900 dark:rounded-md dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-xl dark:bg-opacity-30 dark:border dark:border-zinc-500"
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
      {card.label1 === "title" || card.label1 === "body" ? (
        <div className="flex justify-center mt-2">
          <select
            className="w-1/2 p-2 dark:text-white dark:bg-zinc-900 dark:rounded-md dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-xl dark:bg-opacity-30 dark:border dark:border-zinc-500"
            value={card.label3}
            onChange={(e) => updateLabel(card.id, "label3", e.target.value)}
          >
            {alignProfiles.map((align) => (
              <option key={align} value={align}>
                {align}
              </option>
            ))}
          </select>
        </div>
      ) : null}
      <div className="flex justify-end mt-2">
        <button
          onClick={() => removeCard(card.id)}
          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
        >
          削除
        </button>
      </div>
    </div>
  );
};

export default Selector;
