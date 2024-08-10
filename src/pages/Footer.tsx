import React, { useState } from "react";
import LicenseModal from "./LicenseModal";

const Footer: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <footer className="bg-neutral-50 text-black dark:bg-neutral-800 dark:text-white py-4 text-center">
      <p>
        <button onClick={openModal}>Software product license</button>
      </p>
      {isModalOpen && <LicenseModal onClose={closeModal} />}
    </footer>
  );
};

export default Footer;
