/**
 * 用字串網格畫的像素圖。一格 'X' 就是一個方塊，其餘留空。
 *
 * 為什麼不用圖檔：A-4 規定不引用外部資源，而 PNG 放進 assets 之後顏色就寫死了，
 * 這一頁的區塊會依狀態在 amber 與 emerald 之間切換，圖示要跟著變色。
 * 畫成 SVG 走 currentColor，顏色交給外層的 text-* 決定，放大也不會糊。
 *
 * shapeRendering="crispEdges" 是關鍵，少了它瀏覽器會把方塊邊緣抗鋸齒掉，
 * 放大之後看起來是模糊的圓角，不是像素。
 *
 * 同一列連續的 X 會合併成一個 rect，16x16 的圖大概只會產生十幾個節點。
 */
export function PixelArt({
  grid,
  size = 40,
  className = '',
}: {
  grid: readonly string[];
  size?: number;
  className?: string;
}) {
  const h = grid.length;
  const w = grid[0].length;

  const rects: { x: number; y: number; w: number }[] = [];
  grid.forEach((row, y) => {
    let run = 0;
    for (let x = 0; x <= w; x += 1) {
      if (row[x] === 'X') {
        run += 1;
      } else if (run) {
        rects.push({ x: x - run, y, w: run });
        run = 0;
      }
    }
  });

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={size}
      height={size}
      fill="currentColor"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={className}
    >
      {rects.map((r) => (
        <rect key={`${r.x}-${r.y}-${r.w}`} x={r.x} y={r.y} width={r.w} height={1} />
      ))}
    </svg>
  );
}

/** 資料夾。工作目錄用。 */
export const PX_FOLDER = [
  '................',
  '................',
  '..XXXXX.........',
  '..X...X.........',
  '..X...XXXXXXXX..',
  '..X..........X..',
  '..X..........X..',
  '..X..........X..',
  '..X..........X..',
  '..X..........X..',
  '..X..........X..',
  '..X..........X..',
  '..XXXXXXXXXXXX..',
  '................',
  '................',
  '................',
] as const;

/**
 * 一張紙插在收納盤裡。暫存區用，畫的是「先挑到這個籃子裡」。
 *
 * 原本畫成兩張紙疊在盤子上方，上窄下寬的輪廓看起來像印表機在吐紙。
 * 改成單張紙插進盤子，盤子的前緣直接把紙的下半截切掉，這是收納盤的標準畫法。
 */
export const PX_TRAY = [
  '................',
  '....XXXXXXXX....',
  '....X......X....',
  '....X.XXXX.X....',
  '....X......X....',
  '....X.XXXX.X....',
  '....X......X....',
  '.XXXXXXXXXXXXXX.',
  '.X............X.',
  '.X............X.',
  '.X............X.',
  '.XXXXXXXXXXXXXX.',
  '................',
  '................',
  '................',
  '................',
] as const;

/** 磁片。存檔點用，這是最好認的「存檔」像素圖示。 */
export const PX_DISK = [
  '................',
  '..XXXXXXXXXXXX..',
  '..X..........X..',
  '..X..XXXXXX..X..',
  '..X..X....X..X..',
  '..X..XXXXXX..X..',
  '..X..........X..',
  '..X.XXXXXXXX.X..',
  '..X.X......X.X..',
  '..X.X......X.X..',
  '..X.X......X.X..',
  '..XXXXXXXXXXXX..',
  '................',
  '................',
  '................',
  '................',
] as const;

/** 三層機櫃，每層一顆指示燈。遠端（GitHub）用。 */
export const PX_SERVER = [
  '................',
  '................',
  '..XXXXXXXXXXXX..',
  '..X..........X..',
  '..X.XX.......X..',
  '..XXXXXXXXXXXX..',
  '..X..........X..',
  '..X.XX.......X..',
  '..XXXXXXXXXXXX..',
  '..X..........X..',
  '..X.XX.......X..',
  '..XXXXXXXXXXXX..',
  '................',
  '................',
  '................',
  '................',
] as const;

/** 往右的箭頭，接在兩個區塊中間。 */
export const PX_ARROW_RIGHT = [
  '............',
  '......XX....',
  '.......XX...',
  'XXXXXXXXXX..',
  'XXXXXXXXXX..',
  '.......XX...',
  '......XX....',
  '............',
] as const;

/** 往左的箭頭，給 pull 用。 */
export const PX_ARROW_LEFT = [
  '............',
  '....XX......',
  '...XX.......',
  '..XXXXXXXXXX',
  '..XXXXXXXXXX',
  '...XX.......',
  '....XX......',
  '............',
] as const;

/** 一張紙，放在檔案名稱前面。 */
export const PX_FILE = [
  '........',
  '.XXXXX..',
  '.X...XX.',
  '.X....X.',
  '.X....X.',
  '.X....X.',
  '.XXXXXX.',
  '........',
] as const;
