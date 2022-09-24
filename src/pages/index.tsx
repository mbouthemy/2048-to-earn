import type { NextPage } from "next";
import React, { useState } from "react";
import { Button } from "../components/Button";
import { Game } from "../components/Game";
import Countdown, { zeroPad} from 'react-countdown';
import { finishGameAndGetMoneyWebThree, Play2EarnModal } from "play2earn";


interface IPropsRenderer {
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
}

/**
 * The home page for the creation of the game.
 * Note that the ID of the game is given by the date creation as ISO string.
 */
const Home: NextPage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [isCountdownStarted, setIsCountdownStarted] = useState<boolean>(false);

  const handleRestart = () => {
    setDate(new Date());
    console.log('Game ID', )
  };


  const testGameIDCreation = () => {
    console.log('Game ID', new Date().toISOString());

  }

  const handleOnComplete = () => {
      // GameOver; the game is finished
      console.log('You have lost!');
  }

  const handleSimulateLosing = () => {
    finishGameAndGetMoneyWebThree(process.env.NEXT_PUBLIC_WEBSITE_HOST || '2048-to-earn.web-2-to-3.com', date.toISOString(), 'game_master', 'game_master', false)
    .then(resultSignature => {
        console.log('The money has been transferred to your account, the signature is: ', resultSignature);
    });

  }

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }: IPropsRenderer) => {
      if (completed) {
      // Render a completed state
      return  <span>Game Over!</span>;;
      } else {
      return <span>{zeroPad(minutes)}:{zeroPad(seconds)}</span>;
      }
  }
  
  const handleWinGame = () => {
      console.log('Game ID is finished');
  }

  /**
   * Handle the start of the game.
   * Can be simulated if needed.
   */
  const handleGameStarting = () => {
    console.log('Start the game');
    setIsCountdownStarted(true);
  }

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
      {isCountdownStarted && 
        <Countdown date={Date.now() + 5000}
                   renderer={renderer} 
                   onComplete={() => handleOnComplete()}
                   />
      }
      <Game key={date.toISOString()} handleWinGame={() => handleWinGame()}/>
      <div>
        <p>
          This game (2048) was built using <b>React</b> and <b>TypeScript</b>.
          The unique part of this example is animations. The animations in React
          aren't that straightforward, so I hope you can learn something new
          from it.
        </p>
      </div>
      <Play2EarnModal gameWebsiteHost={process.env.NEXT_PUBLIC_WEBSITE_HOST || '2048-to-earn.com'} 
                                        gameID={date.toISOString()}
                                        playerUID={'player1'} 
                                        handleGameStarting={() => handleGameStarting()}
                                        gameType="solo"
                                        blockchainType="solana"
                                        amountBet={0.1}/>
      <Button onClick={handleGameStarting}>Start Game</Button>

      <Button onClick={handleRestart}>Restart</Button>
      <Button onClick={handleSimulateLosing}>Simulate Losing</Button>
      <Button onClick={testGameIDCreation}>Test Game Creation</Button>

      <div className="footer">
        Copyrights 2022 - 2048 To Earn
      </div>
    </div>
  );
};

export default Home;