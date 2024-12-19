import React, { useState } from "react";
import { calculateFlames } from "../lib/utils";

const MainApp: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [secondName, setSecondName] = useState<string>("");
  const [flamesLabel, setFlamesLabel] = useState<string | null>(null);
  const [resultText, setResultText] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { flamesLabel, resultText } = calculateFlames(firstName, secondName);
    setFlamesLabel(flamesLabel);
    setResultText(resultText);
    setIsModalOpen(true);
  };

  const handleShare = () => {
    const resultMessage = `✨ Your connection: ${flamesLabel} ✨\n\n${resultText}\n\nExplore more at:`;

    if (navigator.share) {
      navigator
        .share({
          title: "FLAMEson",
          text: resultMessage,
          url: window.location.href,
        })
        .then(() => console.log("Shared successfully!"))
        .catch((err) => console.error("Error sharing:", err));
    } else {
      console.log("Sharing not supported, you can copy this text manually:");
      console.log(resultMessage);
    }
  };

  const closeModal = (e: React.MouseEvent) => {
    const modalBox = document.querySelector(".modal-box");
    if (modalBox && !modalBox.contains(e.target as Node)) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="container mx-auto h-screen w-full max-w-lg text-balance px-5 text-center">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="space-y-4">
          <h3 className="text-6xl font-black">
            <span className="uppercase text-primary">Flames</span>on
          </h3>
          <p className="text-2xl">
            <span className="font-bold text-primary">F</span>riendship,{" "}
            <span className="font-bold text-primary">L</span>ove,{" "}
            <span className="font-bold text-primary">A</span>ffection,{" "}
            <span className="font-bold text-primary">M</span>arriage,{" "}
            <span className="font-bold text-primary">E</span>nemy, or{" "}
            <span className="font-bold text-primary">S</span>iblings.
          </p>
        </div>

        <form
          className="my-10 flex w-full flex-col items-center gap-3"
          onSubmit={handleFormSubmit}
        >
          <input
            required
            className="input input-bordered w-full text-center !text-xl"
            placeholder="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            required
            className="input input-bordered w-full text-center !text-xl"
            placeholder="Second Name"
            type="text"
            value={secondName}
            onChange={(e) => setSecondName(e.target.value)}
          />
          <button type="submit" className="btn btn-primary mt-3 text-base">
            Find Out
          </button>
        </form>
      </div>

      <dialog
        open={isModalOpen}
        className="bg-base/30 modal modal-bottom backdrop-blur-md sm:modal-middle"
        onClick={closeModal}
      >
        <div className="modal-box w-full bg-primary text-primary-content">
          <h3 className="text-3xl font-bold">Your relationship is...</h3>
          <p id="resultText" className="py-5 text-5xl font-bold">
            {flamesLabel}
          </p>
          <p className="text-pretty text-xl">{resultText}</p>
          <div className="modal-action flex-col justify-between gap-2 space-x-0">
            <button onClick={handleShare} className="btn text-xl">
              Share
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MainApp;
