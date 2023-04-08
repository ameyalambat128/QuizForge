import React, { useState } from "react";
import Button from "./Button";
import Axios from "axios";

const URL = process.env.ENV === "prod" ? "" : "http://localhost:3000/api";

function Dashboard() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const sendInput = async () => {
    console.log("sent: ", input);
    const { data } = await Axios.post("/api/generate", {
      prompt: input,
    });
    console.log(data);
    setOutput(data.message);
  };

  // Checks for Enter Key and Calls Send Input
  const handleKeyDown = (e: any) => {
    // if (e.keyCode === 13) sendInput();
  };

  return (
    <div className="flex min-h-screen flex-col items-center gap-5 pt-5 dark:bg-slate-900 dark:text-white">
      <textarea
        className="box-border max-w-full rounded bg-slate-200 p-2 text-black"
        placeholder="Text here"
        onChange={(e) => setInput(e.target.value)}
        cols={100}
        rows={20}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <button
        className={`h-10 rounded bg-white p-2 font-bold text-black`}
        onClick={() => sendInput()}
      >
        Generate
      </button>

      <div className="whitespace-pre-wrap">{output}</div>
    </div>
  );
}

export default Dashboard;
