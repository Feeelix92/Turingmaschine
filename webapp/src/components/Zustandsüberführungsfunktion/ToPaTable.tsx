import { useState } from "react";
import { BiCaretDown, BiCaretUp } from "react-icons/all";
import Table from "../Zustandsüberführungsfunktion/Table";

export default function ToPaTable() {
  /**
   * Accordion data (Title, Icons)
   */
  const accordionData = {
    title: <h2>Zustandstabelle</h2>,
    openAccordion: (
      <button className={"float-left"}>
        <BiCaretDown />
      </button>
    ),
    closeAccordion: (
      <button className={"float-left"}>
        <BiCaretUp />
      </button>
    ),
  };
  const { title, openAccordion, closeAccordion } = accordionData;

  /**
   * To check if Accordion opened or closed
   */
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={
        "border-solid border rounded bg-white w-full p-2 border rounded items-center hover:bg-gray-100 col-span-12"
      }
    >
      <div className={""} onClick={() => setIsActive(!isActive)}>
        <div className={"flex xl:grid xl:grid-cols-3 gap-5 items-center"}>
          <span className={""}>
            {isActive ? closeAccordion : openAccordion}
          </span>
          <span>{title}</span>
        </div>
      </div>

      {isActive && (
        <div className={"pt-2"}>
          <Table />
        </div>
      )}
    </div>
  );
}
