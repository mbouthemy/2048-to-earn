import type { NextPage } from "next";
import React, { useState } from "react";
import { Button } from "../components/Button";
import { Game } from "../components/Game";
import Countdown, { zeroPad } from 'react-countdown';
import { finishGameAndGetMoneyWebThree, Play2EarnModal } from "play2earn";
import { Board } from "../components/Board";
import { TileMeta } from "../components/Tile";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TIME_SECONDS_TO_FINISH_GAME } from "../constants";

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

  // Tell if the user is playing the game
  const [gameStatus, setGameStatus] = useState<string>("not_started");
  const [isCountdownStarted, setIsCountdownStarted] = useState<boolean>(false);

  const defaultTilesBegin: TileMeta[] = [
    { id: 0, position: [0, 1], value: 2 },
    { id: 1, position: [0, 2], value: 2 }
  ]

  const handleRestart = () => {
    setDate(new Date());
    console.log('Game ID',)
  };

  /**
   * The user has won the game, the money is transferred on the backend.
   * The signature is also displayed to the frontend.
   */
  const handleWinGame = () => {
    setGameStatus("game_won");
    toast.success("Congratulation for winning, wait a bit until the money is transferred to your account", {
      autoClose: 10000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    })
    // TODO: Change the backend to return the signature of the game
    finishGameAndGetMoneyWebThree(process.env.NEXT_PUBLIC_WEBSITE_HOST || '2048-to-earn.web-2-to-3.com', date.toISOString(), 'game_master', 'game_master', false)
      .then(resultSignature => {
        toast.success(`The money has been transferred to your account, the signature is ${resultSignature}`, {
          autoClose: 10000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        })
      });
  }

  /**
   * The user has lost, the money is transferred to the game master.
   */
  const handleOnComplete = () => {
    console.log('You have lost!');
    setGameStatus("game_lost");
    toast.warning("Unfortunately you didn't win this type, reload the page to try again!")
    finishGameAndGetMoneyWebThree(process.env.NEXT_PUBLIC_WEBSITE_HOST || '2048-to-earn.web-2-to-3.com', date.toISOString(), 'game_master', 'game_master', false)
      .then(resultSignature => {
        console.log('The money has been transferred to the game master account, the signature is: ', resultSignature);
      });
  }


  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }: IPropsRenderer) => {
    if (completed) {
      // Render a completed state
      return <span>Game Over!</span>;;
    } else {
      return <span>{zeroPad(minutes)}:{zeroPad(seconds)}</span>;
    }
  }



  /**
   * Handle the start of the game.
   * Can be simulated if needed.
   */
  const handleGameStarting = () => {
    toast("Betting worked! Game is starting, good luck!")
    setGameStatus("started");  // Switch to dynamic board
    setIsCountdownStarted(true);
  }

  /**
   * Render the main display based on the gameStatus.
   */
  const renderMainDisplay = (_gameStatus: string) => {
    if (_gameStatus === 'not_started') {
      return (
        <Board tiles={defaultTilesBegin} tileCountPerRow={4} />
      )
    } else if (_gameStatus === 'started') {
      return (
        <Game key={date.toISOString()} handleWinGame={() => handleWinGame()} />
      )
    } else if (_gameStatus === 'game_won') {
      return (
        <p>Game Won ! </p>
      )
    } else if (_gameStatus === 'game_lost') {
      return (
        <p>Game Lost ! You can reload the page </p>
      )
    }
  }

  return (
    <div className="App">
      <div className="header">
        <div>
          <h1>2048 Play2Earn</h1>
        </div>
      </div>
      <p>
        <b>2048 To Earn</b> is a play2earn where you can win Solana if you manage to beat the game within 20 seconds.
          You first need to connect a Solana wallet and wage the amount of SOL. The game is currently only available on Devnet.
      </p>
      {gameStatus === "not_started" &&
        <Play2EarnModal gameWebsiteHost={process.env.NEXT_PUBLIC_WEBSITE_HOST || '2048-to-earn.com'}
          gameID={date.toISOString()}
          playerUID={'player1'}
          handleGameStarting={() => handleGameStarting()}
          gameType="solo"
          blockchainType="solana"
          amountBet={0.1} />
      }

      {isCountdownStarted && gameStatus === 'started' &&
        <Countdown date={Date.now() + TIME_SECONDS_TO_FINISH_GAME}
          renderer={renderer}
          onComplete={() => handleOnComplete()}
        />
      }
      {renderMainDisplay(gameStatus)}

      {/* Keep those buttons to test and debug. */}
      {/* <Button onClick={handleGameStarting}>Start Game</Button>
      <Button onClick={handleRestart}>Restart</Button> */}

      <ToastContainer />
      <div className="footer">
        Copyrights 2022 - 2048 To Earn
      </div>
    </div>
  );
};

export default Home;