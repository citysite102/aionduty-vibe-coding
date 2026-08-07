/**
 * 一排平行卡片的「滑到哪張、哪張亮起來，其餘變暗」。
 *
 * 用途是講者現場要指某一格。只加在「講者會逐格停下來講」的頁面，
 * 不要見到 grid 就加：整場都在明暗閃動會變成干擾，而且會稀釋掉真正需要它的那幾頁。
 *
 * 不適合的情況有三種：
 *   1. 整張圖是一個流程或一組對照（例如前端→API→後端），暗掉旁邊就破壞了要講的關係
 *   2. 只有兩三格，口頭指一下就夠，暗化反而重手
 *   3. 那一頁在實際播放時會被預錄頁取代（見 slides-recorded/registry.ts），加了不會上螢幕
 *
 * 暗化用 brightness 不用 opacity：AnimatedBlock 的進場動畫是 motion 直接寫成 inline 的
 * opacity，class 蓋不過去；就算用 ! 蓋過去，還沒輪到的那幾格會被強制顯示出來，等於劇透。
 * 沒有人在動 filter，所以 opacity 0 的格子乘上任何亮度還是看不見。
 */

/** 加在 grid 容器上。只對直接子元素生效，卡片外面再包一層 div 就不會作用。 */
export const hoverIsolateGrid = '[&:hover>*]:brightness-[0.4] [&>*:hover]:brightness-100';

/** 加在卡片上。用於邊框是灰階、沒有語意的卡片。 */
export const hoverIsolateCard = 'transition-[filter,border-color] duration-200 hover:border-sky-500/60';

/**
 * 邊框本身帶語意的卡片（紅＝錯誤、琥珀＝注意、綠＝正解）改用這個。
 * 多加一圈外框而不是改邊框顏色，才不會把語意色蓋掉。
 */
export const hoverIsolateCardRing = 'transition-[filter,box-shadow] duration-200 hover:ring-1 hover:ring-sky-400/60';
