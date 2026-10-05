/**
 * 渲染用的字體。投影片靠 index.html 的 Google Fonts link 拿到這兩套字，
 * 但 Remotion 渲染時跑的是無頭瀏覽器，吃不到那個 link，不載就會掉回系統預設字，
 * 中文會變成跟投影片不同的字形，剪在一起看得出來。
 *
 * 根目錄 CLAUDE.md A-4 的「不引用外部網址資源」管的是投影片在現場播放時，
 * 這裡是渲染階段抓一次、字形直接烙進影片檔，成品不依賴網路。
 */
import { loadFont as loadSans } from '@remotion/google-fonts/NotoSansTC';
import { loadFont as loadMono } from '@remotion/google-fonts/JetBrainsMono';

loadSans();
loadMono();
