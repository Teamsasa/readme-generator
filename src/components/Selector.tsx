import React, { useRef, useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { createPortal } from "react-dom";
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
  "github sns card",
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

const platformProfiles: string[] = [
  "qiita",
  "zenn",
  "note",
  "atcoder",
  "youtube",
  "stackoverflow",
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
            } else if (value === "github sns card") {
              return {
                ...card,
                [labelType]: value,
                label2: platformProfiles[0],
                label4: "Qiita",
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

  const [isOpen, setIsOpen] = useState(false);
  const [previewOption, setPreviewOption] = useState<string | null>(null);
  const [previewStyle, setPreviewStyle] = useState({
    x: 0,
    y: 0,
    position: "right" as "right" | "left",
  });

  // プレビュー画像のURLを生成する関数
  const getPreviewUrl = (option: string): string => {
    switch (option) {
      case "Profile details card":
        return "https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=torvalds";
      case "Top languages used in repository card":
        return "https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=torvalds";
      case "Top languages in commits card":
        return "https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=torvalds";
      case "GitHub stats card":
        return "https://github-readme-stats.vercel.app/api?username=torvalds&show_icons=true";
      case "Productive time card":
        return "https://github-profile-summary-cards.vercel.app/api/cards/productive-time?username=torvalds&count_private=true&theme=default";
      case "profile-trophy":
        return "https://github-profile-trophy.vercel.app/?username=torvalds";
      case "readme typing svg":
        return "https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&repeat=true&width=435&lines=Hello+world!";
      case "Static Badge":
        return "https://img.shields.io/badge/any%20text-you%20like-blue";
      case "skill icons":
        return "https://skillicons.dev/icons?i=react,typescript,javascript,html,css";
      case "typograssy":
        return "https://typograssy.deno.dev/api?text=Hello+world!+こんにちは世界";
      case "github readme stats":
        return "https://github-readme-stats.vercel.app/api?username=torvalds&show_icons=true&theme=default";
      case "github sns card":
        return "https://github-sns-profile-card-e53bc5obaa-an.a.run.app/svg?platform=qiita&userid=Qiita";
      default:
        return "";
    }
  };

  // 画像をプリロードする関数
  const preloadImage = (url: string) => {
    if (!url) return;
    const img = new Image();
    img.src = url;
  };

  // コンポーネントマウント時に全ての画像をプリロード
  useEffect(() => {
    options.forEach((option) => {
      const url = getPreviewUrl(option);
      preloadImage(url);
    });
  }, []);

  // プレビューの位置を計算して設定
  const calculatePreviewPosition = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const rightSpace = window.innerWidth - rect.right;
    const position = rightSpace > 500 ? "right" : "left";

    setPreviewStyle({
      x: position === "right" ? rect.right + 10 : rect.left - 510,
      y: Math.min(rect.top, window.innerHeight - 400),
      position,
    });
  };

  const handleOptionSelect = (option: string) => {
    updateLabel(card.id, "label1", option);
    setIsOpen(false);
    setPreviewOption(null); // プレビューを閉じる
  };

  const handleMouseEnter = (option: string, event: React.MouseEvent) => {
    calculatePreviewPosition(event);
    setPreviewOption(option);
  };

  // プレビューの表示位置が画面外にならないように監視
  useEffect(() => {
    const handleScroll = () => {
      if (previewOption) {
        setPreviewOption(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [previewOption]);

  // プレビューコンポーネント
  const PreviewPopup = () => {
    if (!previewOption) return null;

    const previewUrl = getPreviewUrl(previewOption);

    return createPortal(
      <div
        className={`fixed z-[9999] bg-white dark:bg-zinc-800 border dark:border-zinc-600 rounded-md shadow-xl p-4 transition-all duration-200 ease-in-out ${
          previewOption
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2"
        }`}
        style={{
          left: `${previewStyle.x}px`,
          top: `${previewStyle.y}px`,
          width: "500px",
          maxHeight: "400px",
          overflow: "auto",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <div className="relative">
          {previewOption !== "title" && previewOption !== "body" ? (
            <img
              src={previewUrl}
              alt={`${previewOption} Preview`}
              className="w-auto h-auto"
            />
          ) : (
            <div className="whitespace-nowrap">
              <p
                className={
                  previewOption === "title" ? "text-xl font-bold" : "text-base"
                }
              >
                Sample {previewOption}
              </p>
            </div>
          )}
        </div>
      </div>,
      document.body,
    );
  };

  // プルダウンの参照を追加
  const dropdownRef = useRef<HTMLDivElement>(null);

  // クリックイベントのハンドラーを更新
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setPreviewOption(null); // プルダウンを閉じる際にプレビューも閉じる
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

        <div className="relative w-full mr-2 flex items-start bg-gray-200 dark:bg-zinc-900">
          <div className="flex-1" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full p-2 text-left dark:text-white dark:bg-zinc-900 dark:rounded-md dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-xl dark:bg-opacity-30 dark:border dark:border-zinc-500"
            >
              {card.label1}
            </button>

            {isOpen && (
              <div className="absolute z-50 w-full mt-1 dark:bg-zinc-900 dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-xl dark:bg-opacity-30 border dark:border-zinc-500 rounded-md shadow-lg max-h-60 overflow-auto bg-gray-200">
                {options.map((option) => (
                  <div
                    key={option}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-700/50 cursor-pointer dark:bg-zinc-900"
                    onMouseEnter={(e) => handleMouseEnter(option, e)}
                    onMouseLeave={() => !isOpen && setPreviewOption(null)}
                    onClick={() => handleOptionSelect(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
          <PreviewPopup />
        </div>

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
              className="w-1/5 p-2 border rounded mr-2 dark:bg-neutral-800 dark:border-neutral-600 bg-gray-200 [&>option]:dark:bg-zinc-900"
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
        ) : card.label1 === "github sns card" ? (
          <>
            <select
              className="w-full p-2 mr-2 dark:text-white dark:bg-zinc-900 dark:rounded-md dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-xl dark:bg-opacity-30 dark:border dark:border-zinc-500 bg-gray-200 [&>option]:dark:bg-zinc-900"
              value={card.label2}
              onChange={(e) => updateLabel(card.id, "label2", e.target.value)}
            >
              {platformProfiles.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
            <input
              type="text"
              className="w-full p-2 border rounded mr-2 bg-white dark:bg-neutral-800 dark:border-neutral-600"
              value={card.label4}
              onChange={(e) => updateLabel(card.id, "label4", e.target.value)}
              placeholder="Enter username"
            />
          </>
        ) : (
          <select
            className="w-full p-2 mr-2 dark:text-white dark:bg-zinc-900 dark:rounded-md dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-xl dark:bg-opacity-30 dark:border dark:border-zinc-500 bg-gray-200 [&>option]:dark:bg-zinc-900"
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
            className="w-1/2 p-2 dark:text-white dark:bg-zinc-900 dark:rounded-md dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-xl dark:bg-opacity-30 dark:border dark:border-zinc-500 bg-gray-200 [&>option]:dark:bg-zinc-900"
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
