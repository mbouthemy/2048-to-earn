import type { NextPage } from "next";
import React, { useState } from "react";
import { Button } from "../components/Button";
import { Game } from "../components/Game";


const Home: NextPage = () => {
  const [date, setDate] = useState<Date>(new Date());

  const handleRestart = () => {
    setDate(new Date());
  };

  return (
    <div className="App">
      <div className="header">
        <div>
          <h1>2048 Play2Earn</h1>
        </div>
      </div>
      <p>
          <b>2048 2 Earn</b> is a play2earn where you can win Solana if you manage to beat the game within 20seconds.
          You first need to connect a Solana wallet and wage the amount of SOL. The game is currently only available on Devnet.
      </p>
      <Game key={date.toISOString()} />
      <div>
        <p>
          This game (2048) was built using <b>React</b> and <b>TypeScript</b>.
          The unique part of this example is animations. The animations in React
          aren't that straightforward, so I hope you can learn something new
          from it.
        </p>
      </div>
      <Button onClick={handleRestart}>Restart</Button>

      <div className="footer">
        Made with ❤️ by{" "}
        <a
          href="https://www.youtube.com/channel/UCJV16_5c4A0amyBZSI4yP6A"
          target="_blank"
        >
          Matt Sokola
        </a>
      </div>
    </div>
  );
};

export default Home;