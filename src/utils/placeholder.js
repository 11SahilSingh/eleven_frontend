// Generates a self-contained SVG placeholder image (no external service needed).
const PALETTE = [
  "#1f1f1f",
  "#3d405b",
  "#2a6f97",
  "#6d597a",
  "#9c6644",
  "#2a9d8f",
  "#b5838d",
  "#4a4e69",
];

const escapeXml = (text) =>
  String(text).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]
  );

export function placeholderImage(text = "ELEVEN", width = 600, height = 700, seed) {
  const source = String(seed ?? text);
  let hash = 0;
  for (const ch of source) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  const background = PALETTE[hash % PALETTE.length];
  const fontSize = Math.round(width / 16);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="${background}"/><text x="50%" y="50%" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="bold" text-anchor="middle" dominant-baseline="middle">${escapeXml(text)}</text></svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
