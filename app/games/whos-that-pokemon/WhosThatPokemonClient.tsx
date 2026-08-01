"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { fetchRandomPokemonForGameAction, type GamePokemon } from "@/app/lib/actions";
import { trackEvent } from "@/app/lib/analytics";

type GameState = "loading" | "guessing" | "revealed";

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function WhosThatPokemonClient() {
  const [answer, setAnswer] = useState<GamePokemon | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [state, setState] = useState<GameState>("loading");
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [round, setRound] = useState(0);

  const loadRound = useCallback(async () => {
    setState("loading");
    setPicked(null);
    try {
      const mons = await fetchRandomPokemonForGameAction(4);
      if (mons.length < 2) {
        return;
      }
      const ans = mons[0];
      const opts = shuffle(mons.map((m) => m.name));
      setAnswer(ans);
      setOptions(opts);
      setState("guessing");
      setRound((r) => r + 1);
    } catch {
      setState("guessing");
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setState("loading");
      setPicked(null);
      try {
        const mons = await fetchRandomPokemonForGameAction(4);
        if (cancelled || mons.length < 2) return;
        const ans = mons[0];
        const opts = shuffle(mons.map((m) => m.name));
        setAnswer(ans);
        setOptions(opts);
        setState("guessing");
        setRound((r) => r + 1);
      } catch {
        if (!cancelled) setState("guessing");
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const handlePick = (name: string) => {
    if (state !== "guessing" || !answer) return;
    setPicked(name);
    setState("revealed");
    const correct = name === answer.name;
    if (correct) {
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }
    trackEvent("whos_that_pokemon_guess", { correct, pokemon: answer.name });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Score bar */}
      <section className="mx-auto w-full max-w-3xl px-6">
        <div className="flex items-center justify-between rounded-xl border border-zinc-100 bg-surface px-5 py-3 shadow-sm">
          <div className="flex gap-6 text-sm">
            <div>
              <span className="text-xs uppercase text-muted">Score</span>
              <p className="text-lg font-bold text-foreground">{score}</p>
            </div>
            <div>
              <span className="text-xs uppercase text-muted">Streak</span>
              <p className="text-lg font-bold text-foreground">{streak}</p>
            </div>
            <div>
              <span className="text-xs uppercase text-muted">Round</span>
              <p className="text-lg font-bold text-foreground">{round}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={loadRound}
            disabled={state === "loading"}
            className="inline-flex h-9 items-center rounded-full border border-zinc-200 px-4 text-sm font-medium text-muted transition-colors hover:border-brand hover:text-brand disabled:opacity-50"
          >
            Skip
          </button>
        </div>
      </section>

      {/* Silhouette */}
      <section className="mx-auto w-full max-w-3xl px-6">
        <div className="flex flex-col items-center rounded-2xl border border-zinc-100 bg-surface p-8 shadow-sm">
          <div className="flex h-48 w-48 items-center justify-center">
            {answer && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={answer.sprite}
                alt={state === "revealed" ? answer.name : "Mystery Pokémon"}
                width={192}
                height={192}
                className="h-48 w-48 object-contain transition-all duration-500"
                style={{
                  filter: state === "guessing" ? "brightness(0)" : "brightness(1)",
                }}
                draggable={false}
              />
            )}
          </div>
          <p className="mt-4 text-sm font-medium text-muted">
            {state === "revealed" && answer
              ? `It's ${answer.name}!`
              : "Who's That Pokémon?"}
          </p>
        </div>
      </section>

      {/* Options */}
      <section className="mx-auto w-full max-w-3xl px-6">
        <div className="grid grid-cols-2 gap-3">
          {options.map((opt) => {
            const isCorrect = answer && opt === answer.name;
            const isPicked = picked === opt;
            let className =
              "min-h-[52px] rounded-xl border px-4 py-3 text-sm font-semibold transition-all duration-150 ";
            if (state === "revealed") {
              if (isCorrect) {
                className += "border-green-500 bg-green-50 text-green-700";
              } else if (isPicked) {
                className += "border-red-400 bg-red-50 text-red-600";
              } else {
                className += "border-zinc-100 text-zinc-400";
              }
            } else {
              className +=
                "border-zinc-200 bg-surface text-foreground hover:border-brand hover:text-brand";
            }
            return (
              <button
                key={opt}
                type="button"
                onClick={() => handlePick(opt)}
                disabled={state !== "guessing"}
                className={className}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </section>

      {/* Next button */}
      {state === "revealed" && (
        <section className="mx-auto w-full max-w-3xl px-6 text-center">
          <button
            type="button"
            onClick={loadRound}
            className="inline-flex h-11 items-center rounded-full bg-brand px-8 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Next Pokémon →
          </button>
        </section>
      )}

      {/* SEO cross-links */}
      <section className="mx-auto w-full max-w-3xl px-6 pt-8 pb-8">
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          Enjoyed the game? Try our{" "}
          <Link href="/" className="text-brand underline">
            random Pokemon picker
          </Link>
          , build a team with the{" "}
          <Link href="/pokemon-team-builder" className="text-brand underline">
            team builder
          </Link>
          , or create wild combinations with the{" "}
          <Link href="/games/pokemon-fusion" className="text-brand underline">
            Pokemon fusion tool
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
