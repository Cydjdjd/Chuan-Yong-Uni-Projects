// Article links
function article1() {
  window.location.href = "html/article1.html";
}

function article2() {
  window.location.href = "html/article2.html";
}

function article3() {
  window.location.href = "html/article3.html";
}

function article4() {
  window.location.href = "html/article4.html";
}

function article5() {
  window.location.href = "html/article5.html";
}
// First article onload animation
var x = document.getElementById('article1');

function myFunction() {
  x.style.transition = "1s"
  x.style.top = "0px"
}
// Mouseover animation-causes articles to move up upon reaching row
var row1 = document.getElementById('row1');
var animation2 = document.getElementById('article2');
var animation3 = document.getElementById('article3');

function myFunction2() {
  animation2.style.transition = "1s";
  animation2.style.top = "0px";
  animation3.style.transition = "3s";
  animation3.style.top = "0px";
}

var row2 = document.getElementById('row2');
var animation4 = document.getElementById('article4');
var animation5 = document.getElementById('article5');

function myFunction3() {
  animation4.style.transition = "1s";
  animation4.style.top = "0px";
  animation5.style.transition = "3s";
  animation5.style.top = "0px";
}
// Search bar- allows user to search and go to other pages
function submitinputs() {
  var input1_val = document.getElementById("input1").value;
  document.getElementById("input1").value = "";
  if (input1_val == "") {
    alert("Please fill up the searchbar");
  } else if (input1_val == "Home") {
    window.location.href = "index.html";
  } else if (input1_val == "News1") {
    window.location.href = "html/article1.html";
  } else if (input1_val == "News2") {
    window.location.href = "html/article2.html";
  } else if (input1_val == "Reviews") {
    window.location.href = "html/article3.html";
  } else if (input1_val == "Best Buys") {
    window.location.href = "html/article4.html";
  } else if (input1_val == "How To") {
    window.location.href = "html/article5.html";
  } else if (input1_val == "Report") {
    window.location.href = "html/report.html";
  }
}
// Mouseover animation- shows more information on mouseover of text
// Article1
var headlinetext = document.getElementById("headline-text");
var animation6 = document.getElementById("headline-text");
var animation7 = document.getElementById("tag1");
var animation8 = document.getElementById("dropdown-content");

function myFunction4() {
  animation6.style.transition = "0.3s"
  animation6.style.top = "555px";
  animation7.style.transition = "0.3s"
  animation7.style.top = "520px";
  animation8.style.transition = "1s"
  animation8.style.display = "block"
}


function myFunction4Out() {
  animation6.style.transition = "0.3s"
  animation6.style.top = "640px";
  animation7.style.transition = "0.3s"
  animation7.style.top = "600px";
  animation8.style.transition = "1s"
  animation8.style.display = "none"
}
// Article 2
var nsatext = document.getElementById("nsa-text");
var animation9 = document.getElementById("nsa-text");
var animation10 = document.getElementById("tag2");
var animation11 = document.getElementById("dropdown-content2");

function myFunction5() {
  animation9.style.transition = "0.3s"
  animation9.style.top = "265px";
  animation10.style.transition = "0.3s"
  animation10.style.top = "225px";
  animation11.style.transition = "1s"
  animation11.style.display = "block"
}

function myFunction5Out() {
  animation9.style.transition = "0.3s"
  animation9.style.top = "320px";
  animation10.style.transition = "0.3s"
  animation10.style.top = "270px";
  animation11.style.transition = "1s"
  animation11.style.display = "none"
}

// Article 3
var projectortext = document.getElementById("projector-text");
var animation12 = document.getElementById("projector-text");
var animation13 = document.getElementById("tag3");
var animation14 = document.getElementById("dropdown-content3");

function myFunction6() {
  animation12.style.transition = "0.3s"
  animation12.style.top = "265px";
  animation13.style.transition = "0.3s"
  animation13.style.top = "225px";
  animation14.style.transition = "1s"
  animation14.style.display = "block"
}

function myFunction6Out() {
  animation12.style.transition = "0.3s"
  animation12.style.top = "320px";
  animation13.style.transition = "0.3s"
  animation13.style.top = "270px";
  animation14.style.transition = "1s"
  animation14.style.display = "none"
}

// Article 4
var laptoptext = document.getElementById("laptop-text");
var animation15 = document.getElementById("laptop-text");
var animation16 = document.getElementById("tag4");
var animation17 = document.getElementById("dropdown-content4");

function myFunction7() {
  animation15.style.transition = "0.3s"
  animation15.style.top = "250px";
  animation16.style.transition = "0.3s"
  animation16.style.top = "205px";
  animation17.style.transition = "1s"
  animation17.style.display = "block"
}

function myFunction7Out() {
  animation15.style.transition = "0.3s"
  animation15.style.top = "300px";
  animation16.style.transition = "0.3s"
  animation16.style.top = "245px";
  animation17.style.transition = "1s"
  animation17.style.display = "none"
}

// Article 5
var usbtext = document.getElementById("usb-text");
var animation18 = document.getElementById("usb-text");
var animation19 = document.getElementById("tag5");
var animation20 = document.getElementById("dropdown-content5");

function myFunction8() {
  animation18.style.transition = "0.3s"
  animation18.style.top = "265px";
  animation19.style.transition = "0.3s"
  animation19.style.top = "220px";
  animation20.style.transition = "1s"
  animation20.style.display = "block"
}

function myFunction8Out() {
  animation18.style.transition = "0.3s"
  animation18.style.top = "315px";
  animation19.style.transition = "0.3s"
  animation19.style.top = "270px";
  animation20.style.transition = "1s"
  animation20.style.display = "none"
}
//Functions to reposition elements when resizing
function resizeBig() {
  animation6.style.top = "640px";
  animation7.style.top = "600px";
  animation8.style.display = "none"
  animation9.style.top = "320px";
  animation10.style.top = "270px";
  animation11.style.display = "none";
  animation12.style.top = "320px";
  animation13.style.top = "270px";
  animation14.style.display = "none"
  animation15.style.top = "300px";
  animation16.style.top = "245px";
  animation17.style.display = "none"
  animation18.style.top = "315px";
  animation19.style.top = "270px";
  animation20.style.display = "none"
}

function resizeSmall() {
  6
  headlinetext.style.top = "300px";
  animation7.style.top = "250px";
  animation8.style.display = "none"
  nsatext.style.top = "280px";
  animation10.style.top = "235px";
  animation11.style.display = "none"
  projectortext.style.top = "280px";
  animation13.style.top = "230px";
  animation14.style.display = "none";
  laptoptext.style.top = "280px";
  animation16.style.top = "230px";
  animation17.style.display = "none"
  usbtext.style.top = "280px";
  animation19.style.top = "230px";
  animation20.style.display = "none"
}
//Eventlisteners for animations
window.addEventListener("mouseover", myFunction);
row1.addEventListener("mouseover", myFunction2);
row2.addEventListener("mouseover", myFunction3);
headlinetext.addEventListener("mouseover", myFunction4);
animation8.addEventListener("mouseout", myFunction4Out);
nsatext.addEventListener("mouseover", myFunction5);
animation11.addEventListener("mouseout", myFunction5Out);
projectortext.addEventListener("mouseover", myFunction6);
animation14.addEventListener("mouseout", myFunction6Out);
laptoptext.addEventListener("mouseover", myFunction7);
animation17.addEventListener("mouseout", myFunction7Out);
usbtext.addEventListener("mouseover", myFunction8);
animation20.addEventListener("mouseout", myFunction8Out);
//Remove animation for small screen sizes
if (window.innerWidth < 1220) {
  window.removeEventListener("mouseover", myFunction);
  row1.removeEventListener("mouseover", myFunction2);
  row2.removeEventListener("mouseover", myFunction3);
  headlinetext.removeEventListener("mouseover", myFunction4);
  animation8.removeEventListener("mouseout", myFunction4Out);
  nsatext.removeEventListener("mouseover", myFunction5);
  animation11.removeEventListener("mouseout", myFunction5Out);
  projectortext.removeEventListener("mouseover", myFunction6);
  animation14.removeEventListener("mouseout", myFunction6Out);
  laptoptext.removeEventListener("mouseover", myFunction7);
  animation17.removeEventListener("mouseout", myFunction7Out);
  usbtext.removeEventListener("mouseover", myFunction8);
}
//Adds and removes mouseover animatio as well as adjust position of elements when resizing
function checkWindowSize() {
  if (window.innerWidth > 1220) {
    window.addEventListener("mouseover", myFunction);
    row1.addEventListener("mouseover", myFunction2);
    row2.addEventListener("mouseover", myFunction3);
    headlinetext.addEventListener("mouseover", myFunction4);
    animation8.addEventListener("mouseout", myFunction4Out);
    nsatext.addEventListener("mouseover", myFunction5);
    animation11.addEventListener("mouseout", myFunction5Out);
    projectortext.addEventListener("mouseover", myFunction6);
    animation14.addEventListener("mouseout", myFunction6Out);
    laptoptext.addEventListener("mouseover", myFunction7);
    animation17.addEventListener("mouseout", myFunction7Out);
    usbtext.addEventListener("mouseover", myFunction8);
    animation20.addEventListener("mouseout", myFunction8Out);
    resizeBig();
  } else {
    window.removeEventListener("mouseover", myFunction);
    row1.removeEventListener("mouseover", myFunction2);
    row2.removeEventListener("mouseover", myFunction3);
    headlinetext.removeEventListener("mouseover", myFunction4);
    animation8.removeEventListener("mouseout", myFunction4Out);
    nsatext.removeEventListener("mouseover", myFunction5);
    animation11.removeEventListener("mouseout", myFunction5Out);
    projectortext.removeEventListener("mouseover", myFunction6);
    animation14.removeEventListener("mouseout", myFunction6Out);
    laptoptext.removeEventListener("mouseover", myFunction7);
    animation17.removeEventListener("mouseout", myFunction7Out);
    usbtext.removeEventListener("mouseover", myFunction8);
    animation20.removeEventListener("mouseout", myFunction8Out);
    resizeSmall();
  }
}
window.onresize = checkWindowSize;
