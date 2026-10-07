import {delayRender, continueRender, cancelRender, staticFile} from 'remotion';
const handle=delayRender('Local fonts', {timeoutInMilliseconds:300000});
Promise.all([
 new FontFace('Noto Display', `url(${staticFile('fonts/NotoSansCJKtc-Black.otf')})`, {weight:'900'}).load(),
 new FontFace('Noto Sans TC', `url(${staticFile('fonts/NotoSansCJKtc-Regular.otf')})`, {weight:'400'}).load(),
 new FontFace('Noto Sans TC', `url(${staticFile('fonts/NotoSansCJKtc-Bold.otf')})`, {weight:'700 900'}).load(),
 new FontFace('Inter Heavy', `url(${staticFile('fonts/Inter_24pt-Black.ttf')})`, {weight:'900'}).load(),
]).then(fonts=>{fonts.forEach(f=>document.fonts.add(f));continueRender(handle)}).catch(cancelRender);
