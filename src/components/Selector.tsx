import React, { useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { halfSizeCards } from "../constants";

type CardData = {
  id: number;
  label1: string;
  label2: string;
  label3: string;
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
      label3: alignProfiles[0],
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
              label3: alignProfiles[0],
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
            selectedItems={selectedItems}
          />
        ))}
        <div className="flex justify-center mt-4 col-span-2">
          <button
            onClick={addCard}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            項目を追加
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
    halfSizeCards.includes(card.label1) &&
    index % 2 === 1 &&
    halfSizeCards.includes(selectedItems[index - 1]?.label1);

  return (
    <div
      ref={ref}
      style={{ opacity }}
      className={`border bg-white dark:bg-neutral-800 p-4 mb-4 rounded dark:border-neutral-600 ${
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
          className="w-full p-2 border rounded mr-2 bg-white dark:bg-neutral-800 dark:border-neutral-600"
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
            className="w-full p-2 border rounded mr-2 bg-white dark:bg-neutral-800 dark:border-neutral-600"
            value={card.label2}
            onChange={(e) => updateLabel(card.id, "label2", e.target.value)}
            placeholder="テキストを入力"
          />
        ) : (
          <select
            className="w-full p-2 border rounded mr-2 bg-white dark:bg-neutral-800 dark:border-neutral-600"
            value={card.label2}
            onChange={(e) => updateLabel(card.id, "label2", e.target.value)}
          >
            {card.label1 === "profile-trophy"
              ? trophyProfiles.map((profile) => (
                  <option key={profile} value={profile}>
                    {profile}
                  </option>
                ))
              : cardProfiles.map((profile) => (
                  <option key={profile} value={profile}>
                    {profile}
                  </option>
                ))}
          </select>
        )}
        {!isRightCard && (
          <select
            className="w-full p-2 border rounded bg-white dark:bg-neutral-800 dark:border-neutral-600"
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
