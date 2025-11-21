import React, { useEffect, useState } from "react";

import { ListWidgetProps } from "../../core/types/widget.types";

interface GameTeam {
  abbrev: string;
  placeName: {
    default: string;
  };
  logo: string;
}

interface Game {
  id: number;
  startTimeUTC: string;
  homeTeam: GameTeam;
  awayTeam: GameTeam;
  gameState: string;
}

interface ScheduleResponse {
  games: Game[];
  nextStartDate: string;
  previousStartDate: string;
}

const ListWidget: React.FC<{ widget: ListWidgetProps }> = ({ widget }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { team } = widget.config;

  useEffect(() => {
    if (team) {
      const controller = new AbortController();
      const fetchSchedule = async () => {
        setLoading(true);
        setError(null);
        try {
          // Direct calls to the NHL API from a browser fails due to CORS so routing the request through a public CORS proxy (AllOrigins).
          const targetUrl = `https://api-web.nhle.com/v1/club-schedule/${team}/week/now`;
          const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(
            targetUrl
          )}`;
          const response = await fetch(proxyUrl, { signal: controller.signal });
          const data: ScheduleResponse = await response.json();
          setGames(data.games || []);
        } catch (err: unknown) {
          if (err instanceof Error) {
            if (err.name !== "AbortError") {
              console.error("Error fetching NHL schedule:", err);
              setError("Failed to load schedule.");
            }
          }
        } finally {
          if (!controller.signal.aborted) {
            setLoading(false);
          }
        }
      };

      fetchSchedule();
      return () => {
        controller.abort();
      };
    }
  }, [team]);

  if (loading) {
    return (
      <div className="text-gray-400 text-sm text-center mt-4">Loading...</div>
    );
  } else if (error) {
    return <div className="text-red-400 text-sm text-center mt-4">{error}</div>;
  }

  if (games.length === 0 && !team) {
    return (
      <div className="text-gray-400 text-sm text-center mt-4">
        Please select a team.
      </div>
    );
  }

  return (
    <div className="overflow-auto h-full pr-1 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
      <div className="text-yellow-500 text-sm text-center font-bold">
        Next Schedule
      </div>
      <ul className="space-y-2">
        {games.map((game) => {
          const gameDate = new Date(game.startTimeUTC);
          const isHome = game.homeTeam.abbrev === team;
          const opponent = isHome ? game.awayTeam : game.homeTeam;
          const formattedDate = gameDate.toLocaleDateString(undefined, {
            weekday: "long",
            month: "short",
            day: "numeric",
          });
          const formattedTime = gameDate.toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <li
              key={game.id}
              className="bg-gray-200/50 rounded-md p-2 flex items-center justify-between text-sm"
            >
              <div className="flex flex-col mr-4">
                <span className="text-gray-500 text-xs font-medium uppercase tracking-wide">
                  {formattedDate}
                </span>
                <div className="flex items-center mt-1">
                  <span
                    className={`font-bold ${
                      isHome ? "text-cyan-400" : "text-orange-400"
                    } w-6 text-center inline-block`}
                  >
                    {isHome ? "VS" : "@"}
                  </span>
                  <img
                    src={opponent.logo}
                    alt={opponent.abbrev}
                    className="size-7 object-contain"
                  />
                  <span className="text-gray-500 font-bold">
                    {opponent.abbrev}
                  </span>
                </div>
              </div>
              <div className="bg-gray-800 px-2 py-1 rounded text-xs text-gray-300 font-mono border border-gray-600">
                {formattedTime}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default React.memo(ListWidget);
