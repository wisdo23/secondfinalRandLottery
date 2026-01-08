// Map game names to filenames located in the `public/` folder.
// Using the public folder keeps these images outside the build/dist and lets
// the administrator drop or replace files directly in `frontend/public`.
const mapping: Record<string, string> = {
  "BINGO4": "/Bing4 lottery.jpeg",
  "ENDOWMENT LOTTO": "/Endowment Thursday.jpeg",
  "GOLDEN SOUVENIR": "/Golden Souvenir Tuesday.jpeg",
  "SAMEDI SOIR": "/Samedi Soir Saturday.jpeg",
  "STAR LOTTO": "/Star Sunday.jpeg",
  "SIKA KESE": "/sika kesee.jpeg",
};

/**
 * Return a public URL (root-relative) for a given game name if available.
 * The URL points to files inside `frontend/public` so no bundling is required.
 */
export const getGameImage = (gameName: string): string | null => {
  if (!gameName) return null;
  const normalized = gameName.toUpperCase().trim();
  return mapping[normalized] || null;
};

/**
 * Helper to build a logo URL for other usages. Keep a conventional rand logo
 * in the public folder as `/randLogo.png` for fallbacks.
 */
export const getRandLogo = (): string => {
  return "/randLogo.png";
};

export const assets = {
  getGameImage,
  getRandLogo,
};

export default assets;
