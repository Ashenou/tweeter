
$(document).ready(function () {

  $("#tweet-text").on("input", function() {
    let counter = 140 - this.value.length;
    $(".counter")[0].value = counter;

    if (Number($(".counter")[0].value) < 0) {
      $(".counter")[0].style = "color:red";
    } else {
      $(".counter")[0].style = "color:black";
    }
  });
});