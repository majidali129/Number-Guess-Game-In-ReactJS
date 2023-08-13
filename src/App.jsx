/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

let myNumber = Math.floor(Math.random()*100) + 1;

export default function App() {
  const [count, setCount] = useState(0);
  const [guess, setGuess] = useState(0);
  const [upcommingGuess, setUpcommingGuess] = useState("")
  const [isFinished, setIsFinished] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(upcommingGuess !== ""){
    setCount((prevCount) => prevCount + 1);
    setGuess(+upcommingGuess)
    setUpcommingGuess("")
  }
};


  

  const handleUserGuess = (e) => {
    setUpcommingGuess(e.target.value);
  }


  useEffect(() => {
    if(count >= 10 || myNumber === guess){
      setIsFinished(true)
    }

    if(isFinished){
      myNumber = Math.floor(Math.random() * 100) + 1;
    }

  }, [count, guess, isFinished])


  const handleReset = () => {
    setCount(0)
    setGuess(0)
    setUpcommingGuess('');
    setIsFinished(false)

  };

  return (
    <main className="w-screen border border-yellow-500 min-h-screen flex items-center justify-center">
      <section className=" border flex flex-col gap-y-2 text-center py-4 px-2">
        <div>
          <h1 className="main-heading text-xl font-bold text-cyan-900">
           {
             isFinished || count >= 10 ? (<span>Let&apos;s play again...</span>): (<span>Guess My Number</span>)
           }
          </h1>
        </div>
        <Message count={count} guess={guess} setFinish={setIsFinished} />
        <PlayGround onSubmit={handleSubmit} onReset={handleReset} onGuessChange={handleUserGuess} upcommingGuess={upcommingGuess} count={count} finished={isFinished}  />
      </section>
    </main>
  );
}

function Message({count, guess}) {
  let guardMessage = getGuardMessage(guess, count);
  
  return ( 
    <>
    {/* <Guard guess={guess} count={count} setFinish={setFinish} /> */}
    {
      guardMessage && guardMessage
    }
      <h2 className="text-xl text-red-900 font-semibold">
        You have guessed
        <span className="font-extrabold text-blue-600"> {count} </span> times
      </h2>
    </>
  );
}


// Guard clause for conditional rendering
const  getGuardMessage = (guess, count) => {
  if(myNumber === guess){
    return <h2 className="text-xl text-red-900 font-semibold">Congrat&apos;s, {<span className="bg-blue-500 bond-bold">{guess}</span>} is the right number </h2>
  }

  if(myNumber < guess && count > 0){
    return <h2 className="text-xl text-red-900 font-semibold"> My number is smaller than {<span className="bg-blue-500 bond-bold">{guess}</span>} </h2>
  }

  if(myNumber > guess && count > 0){
    return <h2 className="text-xl text-red-900 font-semibold"> My number is larger than {<span className="bg-blue-500 bond-bold">{guess}</span>} </h2>
  }
  return null
}



function PlayGround({ onSubmit, onReset, count, finished,  upcommingGuess, onGuessChange }) {

  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center gap-y-3">
      <input
      readOnly={count >= 10 || finished ? true: false}
        type="text"
        pattern="\d*"
        min={0}
        max={10}
        maxLength={3}
        className=" outline-none border-none py-2 text-center text-cyan-900 text-lg bg-blue-100"
        value={upcommingGuess}
        onChange={onGuessChange}
      />
      <button 
      type="submit" 
      className="btn" 
      disabled={count < 10 || finished? false: true}
      >
        Guess
      </button>
      <button 
      type="button"  
      className={`btn ${finished || count >= 10 ? 'opacity-100': 'opacity-0'}`} 
      onClick={onReset} 
      >
        New Game
      </button>
    </form>
  );
}
