import React, { useState } from "react";
import Button from "./Button";
import Axios from "axios";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";

function Dashboard() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState();
  const [loading, setLoading] = useState(false);

  // TODO: create loading
  const sendInput = async () => {
    console.log("sent to openai");
    const { data } = await Axios.post("/api/generate", {
      prompt: input,
    });
    if (!data) setLoading(!loading);
    setOutput(data.message);
    console.log(data);
  };

  const parseMessage = (str: string) => {
    return str.split(/(Answer: [A-D]\n\n)/);
  };

  // Checks for Enter Key and Calls Send Input
  const handleKeyDown = (e: any) => {
    // if (e.keyCode === 13) sendInput();
  };

  const [value, setValue] = React.useState("");

  const charLimit = React.useMemo(() => {
    if (value.length >= 21000) {
      return "You have reached the maximum number of characters!";
    } else {
      return `${value.length} / ${21000}`;
    }
  }, [value]);

  return (
    <div className="flex min-h-screen flex-col items-center gap-5 bg-[#1B1C1E] pt-5 dark:text-white">
      <textarea
        className="font-prototype box-border max-w-full rounded border-4 border-[#f1741b] bg-[#303030] p-2 tracking-wider text-white scrollbar-hide "
        placeholder="Insert text here..."
        onChange={(e) => (setInput(e.target.value), setValue(e.target.value))}
        cols={100}
        rows={20}
        onKeyDown={(e) => handleKeyDown(e)}
        maxLength={21000}
      />
      {charLimit && <span style={{ fontFamily: 'Prototype', fontSize: '14px' }}>{charLimit}</span>}

      <button
        className={`bg-2B2B2B text-#F5F5F5 font-prototype flex h-20 w-40 items-center justify-center 
        rounded border-4 border-[#f1741b] bg-gradient-to-r from-[#d48a35] to-[#e0572a] p-2 tracking-wider transition 
        duration-200 ease-in-out hover:scale-105`}
        style={{ fontSize: "22px" }}
        onClick={() => sendInput()}
      >
        Generate
      </button>

      <div className="flex flex-col justify-center gap-4 rounded-lg p-4">
        {output &&
          parseMessage(output).map((i, key) => {
            const isEven = key % 2 === 0;
            return (
              <div
                className={clsx(
                  "flex flex-col whitespace-pre-wrap rounded-lg border-2 border-[#f1741b] p-4 font-bold text-white shadow-2xl",
                  {
                    "border-green-500 bg-green-400 p-2 text-transparent hover:bg-transparent hover:text-white":
                      !isEven,
                  }
                )}
                key={key}
              >
                {!isEven && <p className="text-white">Hover For the Answers</p>}
                {i}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Dashboard;
