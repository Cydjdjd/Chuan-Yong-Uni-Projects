// Article links
function article2() {
  window.location.href = "../html/article2.html";
}

function article3() {
  window.location.href = "../html/article3.html";
}

function article4() {
  window.location.href = "../html/article4.html";
}

function article5() {
  window.location.href = "../html/article5.html";
}
// Comment section- add comments upon submitting
const commentContainer = document.getElementById('allComments');
document.getElementById('addComments').addEventListener('click', function() {
  addComment();
});

function addComment() {
  let commentText;
  const textBox = document.createElement('div');
  commentText = document.getElementById('newComment').value;
  document.getElementById('newComment').value = '';
  textBox.innerHTML = commentText;
  commentContainer.appendChild(textBox);

}

// Search bar- allows user to search and go to other pages
function submitinputs() {
  var input1_val = document.getElementById("input1").value;
  document.getElementById("input1").value = "";
  if (input1_val == "") {
    alert("Please fill up the searchbar");
  } else if (input1_val == "Home") {
    window.location.href = "../index.html";
  } else if (input1_val == "News1") {
    window.location.href = "../html/article1.html";
  } else if (input1_val == "News2") {
    window.location.href = "../html/article2.html";
  } else if (input1_val == "Reviews") {
    window.location.href = "../html/article3.html";
  } else if (input1_val == "Best Buys") {
    window.location.href = "../html/article4.html";
  } else if (input1_val == "How To") {
    window.location.href = "../html/article5.html";
  } else if (input1_val == "Report") {
    window.location.href = "../html/report.html";
  }
}
// Handlebars for author details
// Grab the template script
var theTemplateScript = document.getElementById('address-template').innerHTML;
// Compile the template
var theTemplate = Handlebars.compile(theTemplateScript);

// Define our data object
var context = {
  author: "Solomon Milo",
  date: "Feb 15, 2022",
  time: "8.23am"
};

// Pass our data to the template
var theCompiledHtml = theTemplate(context);
// Add the compiled html to the page
document.getElementById('content-placeholder').innerHTML = theCompiledHtml;
