import React from 'react';

interface SelectorProps {
  selectedItems: string[];
  setSelectedItems: (items: string[]) => void;
}

const items = ['stat', 'trophy'];

const Selector: React.FC<SelectorProps> = ({ selectedItems, setSelectedItems }) => {
  const toggleItem = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  }

  return (
    <div className="flex space-x-2">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => toggleItem(item)}
          className={`p-2 border ${selectedItems.includes(item) ? 'bg-blue-500 text-white' : 'bg-white'}`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default Selector;
