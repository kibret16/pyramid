if ("serviceWorker" in navigator) {
  if (navigator.serviceWorker.controller) {
    console.log("[PWA Builder] active service worker found, no need to register");
  } else {
    navigator.serviceWorker
      .register("pwabuilder-sw.js", {
        scope: "./"
      })
      .then(function(reg) {
        console.log("[PWA Builder] Service worker has been registered for scope: " + reg.scope);
      });
  }
}

loadPyramid();

function loadPyramid() {

  var now = new Date();
  var start = new Date(now.getFullYear(), 0, 0);
  var diff = now - start;
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.floor(diff / oneDay);
  // document.getElementById("show-date").innerText = day;
  // document.getElementById("show-date-seconds").innerText = day;
  // document.getElementById("show-date-hours").innerText = convertNumToTime(roundQuarter(day/60));
  
  const container = document.getElementById("brick-container");

  container.innerHTML = "";
  
  const numBricks = 1*getCookie("brickNum");

  const brickNumberContainer = document.getElementById("brick-number");
  brickNumberContainer.innerText = "Day "+day+" • "+numBricks+" Bricks";

  
  var breakPoints = [1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78, 91, 105, 120, 136, 153, 171, 190, 210, 231, 253, 276, 300, 325, 351];
  
  for (let i = 1; i <= numBricks; i++) {
    const brick = document.createElement("div");
    brick.classList.add("brick", "full-brick");
    container.appendChild(brick);
    if(breakPoints.includes(351-i)) {
      const brake = document.createElement("div");
      brake.classList.add("break");
      container.appendChild(brake);
    }
    console.log(i, "full-brick")
  }
  
  for (let j = numBricks+1; j <= 351; j++) {
    const brick2 = document.createElement("div");
    brick2.classList.add("brick");
    container.appendChild(brick2);
    if(breakPoints.includes(351-j)) {
      const brake = document.createElement("div");
      brake.classList.add("break");
      container.appendChild(brake);
    }
    console.log(j, "empty-brick")
  }
}

function layBrick() {
  numCurrentBricks = getCookie("brickNum") ?? 0; 
  setCookie("brickNum", 1*numCurrentBricks + 1, 300)
  console.log(numCurrentBricks);
  document.getElementById("lay-brick-button").setAttribute("hidden","hidden");
  loadPyramid();
}

function roundQuarter(num) {
  if (num <= 20) return num;
  return Math.round(num*4)/4;
}

function convertNumToTime(number) {
    var sign = (number >= 0) ? 1 : -1;
    number = number * sign;
    var hour = Math.floor(number);
    var decpart = number - hour;

    var min = 1 / 60;
    decpart = min * Math.round(decpart / min);
    var minute = Math.floor(decpart * 60) + '';
    if (minute.length < 2) {
    minute = '0' + minute; 
  }

  sign = sign == 1 ? '' : '-';
  time = sign + hour + ':' + minute;

  return time;
}

function toObject(arr) {
  var rv = {};
  for (var i = 0; i < arr.length; ++i)
    rv[i] = arr[i];
  return rv;
}

function copyText(id) {
  var txt = document.getElementById(id);
  txt.select();
  txt.setSelectionRange(0, 99999); /* For mobile devices */
  document.execCommand("copy");
}

function clearText(id) {
  var txt = document.getElementById(id);
  txt.value = "";
}

function countRandom (id, displayId) {
  var txt = document.getElementById(id);
  txt = txt.value;

  display = document.getElementById(displayId);
  charsLeft = numChars - txt.length;
  
  display.innerHTML = charsLeft;
}

function setCookie(cname, cvalue, exdays = 1) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function nl2br(str, is_xhtml = false) {
  if (typeof str === 'undefined' || str === null) {
      return '';
  }
  var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

function escapeHtml(unsafe){
  return unsafe
    .replace(/<br>/g, "\n")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}