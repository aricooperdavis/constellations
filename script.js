window.onload = function(){
  let end = new Date('Apr 16 2022 GMT+0100'),
    h1 = document.getElementsByTagName('h1')[0];

  (function update(){
    // Generate timestamp
    let now = Date.now(),
      diff = Math.floor((end-now)/1000),
      w = Math.floor(diff/(60*60*24*7)),
      d = Math.floor(diff/(60*60*24))-(w*7),
      h = Math.floor(diff/(60*60))-(w*7*24+d*24),
      m = Math.floor(diff/60)-(w*7*24*60+d*24*60+h*60),
      s = diff-(w*7*24*60*60+d*24*60*60+h*60*60+m*60);
    let text = `${zp(w)}w ${zp(d)}d ${zp(h)}h ${zp(m)}m ${zp(s)}s`;

    // Redirect after countdown ends
    if (diff < 0) {
      redirect();
    }

    // Glitch timestamp every 10s
    if ([3,5].includes(s%10)) {
      let _text = '';
      for (let i=0; i<text.length; i++) {
        if (Math.random() > 0.333) {
          _text += text[i];
        } else {
          _text += '..constellations...'[i];
        }
      }
      text = _text;
    } else if (s%10 == 4) {
      text = '..constellations...';
    }

    h1.textContent = text;

    setTimeout(update, 1000);
  })();
}

document.onkeydown = function(e){
  user_keys.push(e.keyCode)
  if (user_keys.toString().indexOf(konami) >= 0) {
    redirect();
  }
  if (user_keys.length > 10) {
    user_keys = [];
  }
}

/* zero pad single digits */
function zp(i) {
  return ('0'+i).slice(-2);
}

/* redirect on timer end */
function redirect() {
  window.location.replace('https://www.youtube.com/embed/-C1xg8JWqEA');
}

let user_keys = [],
  konami = '38,38,40,40,37,39,37,39,66,65';
