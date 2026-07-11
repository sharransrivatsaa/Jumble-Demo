"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { WORDS_BY_DIFFICULTY } from "../data/word-tiers";
import {
  DIFFICULTY_LABELS,
  clueForWord,
  scrambleWord,
  WordDeck,
  type Difficulty,
  type Puzzle,
} from "../lib/words";

const MAX_GUESSES = 3;
const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];

type Round = {
  puzzle: Puzzle;
  scrambled: string;
};

type Status = "playing" | "won" | "lost";

export default function JumbleGame() {
  const inputId = useId();
  const deckRef = useRef<WordDeck | null>(null);
  const difficultyRef = useRef<Difficulty>("medium");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [round, setRound] = useState<Round | null>(null);
  const [guess, setGuess] = useState("");
  const [guessesLeft, setGuessesLeft] = useState(MAX_GUESSES);
  const [showClue, setShowClue] = useState(false);
  const [status, setStatus] = useState<Status>("playing");
  const [feedback, setFeedback] = useState("");
  const [shake, setShake] = useState(false);
  const [tileKey, setTileKey] = useState(0);
  const [wordsLeft, setWordsLeft] = useState(WORDS_BY_DIFFICULTY.medium.length);

  function resetDeck(level: Difficulty) {
    deckRef.current = new WordDeck(WORDS_BY_DIFFICULTY[level]);
    difficultyRef.current = level;
    setWordsLeft(deckRef.current.remaining);
  }

  function drawRound(level: Difficulty = difficultyRef.current): Round {
    if (!deckRef.current || difficultyRef.current !== level) {
      resetDeck(level);
    }
    const deck = deckRef.current!;
    const puzzle = deck.next();
    setWordsLeft(deck.remaining);
    return {
      puzzle,
      scrambled: scrambleWord(puzzle.word),
    };
  }

  function resetQuiz(level: Difficulty) {
    setDifficulty(level);
    setRound(drawRound(level));
    setGuess("");
    setGuessesLeft(MAX_GUESSES);
    setShowClue(false);
    setStatus("playing");
    setFeedback(`Switched to ${DIFFICULTY_LABELS[level].label}. New word ready.`);
    setTileKey((k) => k + 1);
  }

  useEffect(() => {
    resetDeck("medium");
    setRound(drawRound("medium"));
  }, []);

  function handleDifficultyChange(level: Difficulty) {
    if (level === difficulty) return;
    resetQuiz(level);
  }

  function startNextRound() {
    setRound(drawRound());
    setGuess("");
    setGuessesLeft(MAX_GUESSES);
    setShowClue(false);
    setStatus("playing");
    setFeedback("");
    setTileKey((k) => k + 1);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!round || status !== "playing") return;

    const cleaned = guess.trim().toUpperCase();
    if (cleaned.length !== 5) {
      setFeedback("Enter exactly 5 letters.");
      setShake(true);
      window.setTimeout(() => setShake(false), 420);
      return;
    }

    if (cleaned === round.puzzle.word) {
      setStatus("won");
      setFeedback(`Nice — ${round.puzzle.word} is right.`);
      return;
    }

    const remaining = guessesLeft - 1;
    setGuessesLeft(remaining);
    setGuess("");

    if (remaining <= 0) {
      setStatus("lost");
      setFeedback(`Out of guesses. The word was ${round.puzzle.word}.`);
      return;
    }

    setFeedback(
      remaining === 1
        ? "Not quite. One guess left."
        : `Not quite. ${remaining} guesses left.`,
    );
    setShake(true);
    window.setTimeout(() => setShake(false), 420);
  }

  if (!round) {
    return (
      <div className="game-shell" aria-busy="true">
        <p className="loading-copy">Shuffling letters…</p>
      </div>
    );
  }

  const letters = round.scrambled.split("");

  return (
    <div className="game-shell">
      <header className="brand-block">
        <p className="brand">Jumble-Demo</p>
        <h1 className="headline">Unscramble the word</h1>
        <p className="subhead">
          Five letters. Three chances. Ask for a clue if you need one.
        </p>
      </header>

      <div className="difficulty-block">
        <p className="difficulty-label">Difficulty</p>
        <div className="difficulty-picker" role="group" aria-label="Difficulty">
          {DIFFICULTIES.map((level) => (
            <button
              key={level}
              type="button"
              className={`difficulty-btn ${difficulty === level ? "is-active" : ""}`}
              aria-pressed={difficulty === level}
              onClick={() => handleDifficultyChange(level)}
            >
              {DIFFICULTY_LABELS[level].label}
            </button>
          ))}
        </div>
        <p className="difficulty-hint">{DIFFICULTY_LABELS[difficulty].description}</p>
      </div>

      <section
        className={`board ${shake ? "is-shaking" : ""}`}
        aria-label="Scrambled letters"
      >
        {letters.map((letter, index) => (
          <span
            key={`${tileKey}-${index}-${letter}`}
            className="tile"
            style={{ animationDelay: `${index * 55}ms` }}
          >
            {letter}
          </span>
        ))}
      </section>

      <div className="meta-row" aria-live="polite">
        <p className="guesses">
          Guesses left: <strong>{guessesLeft}</strong>
          <span className="words-left"> · {wordsLeft} new words left</span>
        </p>
        {showClue ? (
          <p className={`clue ${difficulty !== "easy" ? "is-emoji" : ""}`}>
            <span className="clue-label">Clue</span>
            {clueForWord(round.puzzle.word, difficulty)}
          </p>
        ) : (
          <button
            type="button"
            className="text-btn"
            onClick={() => setShowClue(true)}
            disabled={status !== "playing"}
          >
            Need a clue?
          </button>
        )}
      </div>

      {status === "playing" ? (
        <form className="guess-form" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor={inputId}>
            Your 5-letter guess
          </label>
          <input
            id={inputId}
            className="guess-input"
            value={guess}
            onChange={(e) =>
              setGuess(e.target.value.replace(/[^a-zA-Z]/g, "").slice(0, 5))
            }
            maxLength={5}
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            placeholder="Type your guess"
            aria-describedby="feedback"
          />
          <button type="submit" className="primary-btn">
            Guess
          </button>
        </form>
      ) : (
        <div className="result-row">
          <button type="button" className="primary-btn" onClick={startNextRound}>
            Next word
          </button>
        </div>
      )}

      <p
        id="feedback"
        className={`feedback ${status === "won" ? "is-win" : ""} ${status === "lost" ? "is-loss" : ""}`}
        aria-live="polite"
      >
        {feedback}
      </p>
    </div>
  );
}
