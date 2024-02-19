// Search bar- allows user to search and go to other pages
function submitinputs(){
  var input1_val=document.getElementById("input1").value;
  document.getElementById("input1").value="";
  if(input1_val==""){
    alert("Please fill up the searchbar");
  }else if(input1_val=="Home"){
    window.location.href="../index.html";
  }else if(input1_val=="News1"){
      window.location.href="../html/article1.html";
  }else if(input1_val=="News2"){
      window.location.href="../html/article2.html";
  }else if(input1_val=="Reviews"){
    window.location.href="../html/article3.html";
  }else if(input1_val=="Best Buys"){
    window.location.href="../html/article4.html";
  }else if(input1_val=="How To"){
    window.location.href="../html/article5.html";
  }else if(input1_val=="Report"){
    window.location.href="../html/report.html";
  }
}
