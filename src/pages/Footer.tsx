import React, { useState } from "react";
import LicenseModal from "./LicenseModal";

const Footer: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <footer className="py-4 text-center bg-zinc-100 dark:bg-zinc-900 dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-xl dark:bg-opacity-30 dark:border-zinc-500">
      <p>
        <button onClick={openModal}>Software product license</button>
      </p>
      {isModalOpen && <LicenseModal onClose={closeModal} />}
    </footer>
  );
};

export default Footer;
