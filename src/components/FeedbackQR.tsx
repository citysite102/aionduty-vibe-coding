import { memo } from 'react';

/**
 * 課後回饋表單的 QR Code。
 *
 * 內嵌成向量而不是抓線上產碼服務，也不是放一張圖：現場網路不一定通，
 * 這一頁又是最後一頁，破圖就等於收不到回饋。內嵌的另一個好處是投影多大都不糊。
 *
 * 資料是離線算好的（qrcode 套件，版本 3、容錯 M），每一列連續的黑格併成一個矩形。
 * 網址若要換，重新產一次 path 再貼進來，不要手改。產生方式：
 *   npm i qrcode
 *   QRCode.create(網址, { errorCorrectionLevel: 'M' }) 取 modules，逐列合併成 path
 */

export const FEEDBACK_FORM_URL = 'https://forms.gle/HVP5WoYtfBY21JCq9';

const SIZE = 29;
const QUIET = 4; // 四格留白是規格要求，少了掃不到
const PATH = 'M0 0h7v1h-7zM9 0h2v1h-2zM12 0h1v1h-1zM15 0h2v1h-2zM20 0h1v1h-1zM22 0h7v1h-7zM0 1h1v1h-1zM6 1h1v1h-1zM9 1h1v1h-1zM11 1h2v1h-2zM17 1h1v1h-1zM20 1h1v1h-1zM22 1h1v1h-1zM28 1h1v1h-1zM0 2h1v1h-1zM2 2h3v1h-3zM6 2h1v1h-1zM8 2h3v1h-3zM14 2h1v1h-1zM16 2h1v1h-1zM20 2h1v1h-1zM22 2h1v1h-1zM24 2h3v1h-3zM28 2h1v1h-1zM0 3h1v1h-1zM2 3h3v1h-3zM6 3h1v1h-1zM8 3h1v1h-1zM10 3h3v1h-3zM17 3h1v1h-1zM20 3h1v1h-1zM22 3h1v1h-1zM24 3h3v1h-3zM28 3h1v1h-1zM0 4h1v1h-1zM2 4h3v1h-3zM6 4h1v1h-1zM8 4h1v1h-1zM13 4h3v1h-3zM17 4h3v1h-3zM22 4h1v1h-1zM24 4h3v1h-3zM28 4h1v1h-1zM0 5h1v1h-1zM6 5h1v1h-1zM8 5h1v1h-1zM10 5h8v1h-8zM22 5h1v1h-1zM28 5h1v1h-1zM0 6h7v1h-7zM8 6h1v1h-1zM10 6h1v1h-1zM12 6h1v1h-1zM14 6h1v1h-1zM16 6h1v1h-1zM18 6h1v1h-1zM20 6h1v1h-1zM22 6h7v1h-7zM8 7h2v1h-2zM13 7h1v1h-1zM15 7h1v1h-1zM0 8h1v1h-1zM2 8h5v1h-5zM9 8h3v1h-3zM14 8h1v1h-1zM16 8h1v1h-1zM20 8h1v1h-1zM22 8h5v1h-5zM0 9h3v1h-3zM4 9h1v1h-1zM11 9h1v1h-1zM17 9h1v1h-1zM20 9h1v1h-1zM22 9h3v1h-3zM28 9h1v1h-1zM0 10h3v1h-3zM4 10h1v1h-1zM6 10h2v1h-2zM9 10h1v1h-1zM12 10h1v1h-1zM15 10h2v1h-2zM18 10h1v1h-1zM21 10h1v1h-1zM23 10h2v1h-2zM0 11h2v1h-2zM3 11h2v1h-2zM7 11h2v1h-2zM11 11h1v1h-1zM14 11h2v1h-2zM19 11h2v1h-2zM22 11h2v1h-2zM25 11h1v1h-1zM27 11h1v1h-1zM0 12h1v1h-1zM3 12h5v1h-5zM10 12h3v1h-3zM15 12h3v1h-3zM20 12h2v1h-2zM25 12h2v1h-2zM0 13h1v1h-1zM2 13h3v1h-3zM7 13h1v1h-1zM9 13h1v1h-1zM13 13h2v1h-2zM16 13h1v1h-1zM20 13h5v1h-5zM28 13h1v1h-1zM1 14h2v1h-2zM6 14h1v1h-1zM8 14h1v1h-1zM10 14h2v1h-2zM13 14h4v1h-4zM22 14h1v1h-1zM25 14h2v1h-2zM0 15h2v1h-2zM8 15h1v1h-1zM12 15h2v1h-2zM18 15h1v1h-1zM21 15h2v1h-2zM24 15h1v1h-1zM27 15h1v1h-1zM5 16h2v1h-2zM11 16h2v1h-2zM14 16h2v1h-2zM17 16h1v1h-1zM19 16h1v1h-1zM23 16h1v1h-1zM25 16h2v1h-2zM0 17h1v1h-1zM2 17h2v1h-2zM5 17h1v1h-1zM10 17h3v1h-3zM15 17h2v1h-2zM18 17h1v1h-1zM20 17h5v1h-5zM26 17h1v1h-1zM28 17h1v1h-1zM0 18h1v1h-1zM3 18h2v1h-2zM6 18h2v1h-2zM11 18h2v1h-2zM15 18h1v1h-1zM17 18h1v1h-1zM20 18h1v1h-1zM23 18h1v1h-1zM26 18h1v1h-1zM0 19h1v1h-1zM3 19h1v1h-1zM8 19h1v1h-1zM12 19h1v1h-1zM14 19h1v1h-1zM18 19h3v1h-3zM22 19h2v1h-2zM27 19h1v1h-1zM0 20h1v1h-1zM3 20h1v1h-1zM5 20h2v1h-2zM19 20h6v1h-6zM26 20h3v1h-3zM8 21h1v1h-1zM10 21h7v1h-7zM18 21h1v1h-1zM20 21h1v1h-1zM24 21h5v1h-5zM0 22h7v1h-7zM9 22h2v1h-2zM13 22h8v1h-8zM22 22h1v1h-1zM24 22h3v1h-3zM0 23h1v1h-1zM6 23h1v1h-1zM8 23h3v1h-3zM13 23h1v1h-1zM15 23h1v1h-1zM18 23h1v1h-1zM20 23h1v1h-1zM24 23h1v1h-1zM28 23h1v1h-1zM0 24h1v1h-1zM2 24h3v1h-3zM6 24h1v1h-1zM8 24h2v1h-2zM11 24h1v1h-1zM14 24h3v1h-3zM20 24h5v1h-5zM26 24h2v1h-2zM0 25h1v1h-1zM2 25h3v1h-3zM6 25h1v1h-1zM8 25h1v1h-1zM12 25h2v1h-2zM17 25h1v1h-1zM19 25h1v1h-1zM25 25h4v1h-4zM0 26h1v1h-1zM2 26h3v1h-3zM6 26h1v1h-1zM8 26h2v1h-2zM12 26h1v1h-1zM14 26h2v1h-2zM18 26h2v1h-2zM21 26h7v1h-7zM0 27h1v1h-1zM6 27h1v1h-1zM13 27h2v1h-2zM20 27h1v1h-1zM22 27h1v1h-1zM25 27h1v1h-1zM27 27h1v1h-1zM0 28h7v1h-7zM8 28h1v1h-1zM10 28h10v1h-10zM21 28h1v1h-1zM23 28h2v1h-2zM26 28h1v1h-1z';

export const FeedbackQR = memo(function FeedbackQR({ className = '' }: { className?: string }) {
  const box = SIZE + QUIET * 2;
  return (
    <svg
      viewBox={`${-QUIET} ${-QUIET} ${box} ${box}`}
      className={className}
      shapeRendering="crispEdges"
      role="img"
      aria-label="課後回饋表單的 QR Code"
    >
      <rect x={-QUIET} y={-QUIET} width={box} height={box} fill="#ffffff" />
      <path d={PATH} fill="#020617" />
    </svg>
  );
});
