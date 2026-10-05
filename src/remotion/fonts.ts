/**
 * 渲染用的字體。投影片靠 index.html 的 Google Fonts link 拿到這兩套字，
 * 但 Remotion 渲染時跑的是無頭瀏覽器，吃不到那個 link，不載就會掉回系統預設字，
 * 中文字形會跟投影片不一樣，剪在一起看得出來。
 *
 * 根目錄 CLAUDE.md A-4 的「不引用外部網址資源」管的是投影片在現場播放的時候，
 * 這裡是渲染階段抓一次、字形直接烙進影片檔，輸出的 mp4 不依賴網路。
 *
 * weights 與 subsets 要指定。中文字體是照 unicode 範圍切成一百多個檔案的，
 * 不指定就會把九種字重乘上全部語系抓一遍，第一次渲染會多等很久。
 */
import { loadFont as loadSans } from '@remotion/google-fonts/NotoSansTC';
import { loadFont as loadMono } from '@remotion/google-fonts/JetBrainsMono';

loadSans('normal', {
  weights: ['400', '700'],
  subsets: ['latin', 'chinese-traditional'],
  ignoreTooManyRequestsWarning: true,
});

loadMono('normal', {
  weights: ['400', '700'],
  subsets: ['latin'],
  ignoreTooManyRequestsWarning: true,
});
