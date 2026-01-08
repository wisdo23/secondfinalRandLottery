import defaultBadge from "@/assets/design9/game-badge.png";
import { getGameImage } from "@/lib/gameAssets";

interface GameBadgeProps {
  gameName?: string;
  className?: string;
}

export function GameBadge({ gameName, className }: GameBadgeProps) {
  // Prefer a per-game image from the public folder. If none exists, fall
  // back to the bundled design9 badge image.
  const gameImg = gameName ? getGameImage(gameName) : null;
  const src = gameImg || defaultBadge;

  return (
    <img
      src={src}
      alt={gameName || "Game"}
      className={`object-contain drop-shadow-lg ${className || "w-24 h-24 md:w-28 md:h-28"}`}
    />
  );
}
