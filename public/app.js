$("#scrape").on("click", function() {
  $.ajax({
    method: "GET",
    url: "/scrape"
  }).then(function() {
    location.reload();
  });
});

$.getJSON("/articles", function(data) {
  console.log(data[1].link.substring(0, 1));

  for (var i = 0; i < data.length; i++) {
    var div = $("<div>");

    div.addClass("articleDiv");

    var pTitle = $("<p>");
    pTitle.addClass("articleTitle");
    pTitle.text(data[i].title);

    var pLink = $("<a>");
    pLink.addClass("articleLink");
    pLink.text(data[i].link);

    if (data[i].link.substring(0, 1) === "/") {
      pLink.text("https://www.bbc.com" + data[i].link);
      pLink.attr("href", "https://www.bbc.com" + data[i].link);
    } else {
      pLink.text(data[i].link);
      pLink.attr("href", data[i].link);
    }
    pLink.attr("target", "_blank");

    var input = $("<input>");
    input.attr("type", "text");
    input.attr("id", "input-" + data[i]._id);
    input.attr("placeholder", "Add your note here");

    var button0 = $("<button>");
    button0.attr("data-noteSend", data[i]._id);
    button0.addClass("saveNote");
    button0.text("Add Note");

    var button1 = $("<button>");
    button1.addClass("deleteBtn");
    button1.attr("id", data[i]._id);
    button1.text("Delete Article");

    var button2 = $("<button>");
    button2.addClass("saveBtn");
    button2.attr("data-save", data[i]._id);
    button2.text("Save Article");

    var button3 = $("<button>");
    button3.addClass("showNotes");
    button3.attr("data-showNotes", data[i]._id);
    button3.text("Show Notes");
    button3.attr("data-toggle", "modal");
    button3.attr("data-target", "#exampleModalLong");

    div.append(pTitle);
    div.append(pLink);
    div.append(input);
    div.append(button0);
    div.append(button1);
    div.append(button2);
    div.append(button3);

    $("#articles").append(div);
  }
});

$("#savedArticles").on("click", function() {
  $("#articles").empty();
  $.getJSON("/saved-Articles", function(data) {
    for (var i = 0; i < data.length; i++) {
      var div = $("<div>");
  
      div.addClass("articleDiv");
  
      var pTitle = $("<p>");
      pTitle.addClass("articleTitle");
      pTitle.text(data[i].title);
  
      var pLink = $("<a>");
      pLink.addClass("articleLink");
      pLink.text(data[i].link);
  
      if (data[i].link.substring(0, 1) === "/") {
        pLink.text("https://www.bbc.com" + data[i].link);
        pLink.attr("href", "https://www.bbc.com" + data[i].link);
      } else {
        pLink.text(data[i].link);
        pLink.attr("href", data[i].link);
      }
      pLink.attr("target", "_blank");
  
      var input = $("<input>");
      input.attr("type", "text");
      input.attr("id", "input-" + data[i]._id);
      input.attr("placeholder", "Add your note here");
  
      var button0 = $("<button>");
      button0.attr("data-noteSend", data[i]._id);
      button0.addClass("saveNote");
      button0.text("Add Note");
  
      var button1 = $("<button>");
      button1.addClass("deleteBtn");
      button1.attr("id", data[i]._id);
      button1.text("Delete Article");
  
     
  
      var button3 = $("<button>");
      button3.addClass("showNotes");
      button3.attr("data-showNotes", data[i]._id);
      button3.text("Show Notes");
      button3.attr("data-toggle", "modal");
      button3.attr("data-target", "#exampleModalLong");
  
      div.append(pTitle);
      div.append(pLink);
      div.append(input);
      div.append(button0);
      div.append(button1);
     
      div.append(button3);
  
      $("#articles").append(div);
    }
  });
});

$("#home").on("click", function() {
  location.reload();
});

$(document).on("click", ".deleteBtn", function() {
  var id = $(this).attr("id");
  console.log(id);

  $.ajax({
    method: "DELETE",
    url: "/delete/" + id
  }).then(function() {
    // Grab the articles as a json
    location.reload();
  });
});

$(document).on("click", ".saveBtn", function() {
  var id = $(this).attr("data-save");
  console.log(id);

  $.ajax({
    method: "PUT",
    url: "/save/" + id
  }).then(function() {
    location.reload();
  });
});

$(document).on("click", ".saveNote", function(e) {
  var id = $(this).attr("data-noteSend");
  //var value = $("input[data-commendId="+id+"]").val();
  var notes = $("#input-" + id)
    .val()
    .trim();
  console.log(id);

  $.ajax({
    method: "POST",
    url: "/notes/" + id,
    data: {
      articleID: id,
      body: notes
    }
  })
  .then(function(data) {
    console.log(data);

    $("#notes").empty();
  });
});

$(document).on("click", ".showNotes", function() {
  $("#notesDiv").empty();
  var id = $(this).attr("data-showNotes");
  console.log(id);

  $.getJSON("/show-notes/" + id, function(data) {
    for (var i = 0; i < data.length; i++) {
      var div = $("<div>");
      div.addClass("notesDiv");

      var p = $("<p>");
      p.attr("id", "p-" + data[i]._id);
      p.text(data[i].body);

      var button = $("<button>");
      button.addClass("deleteNote");
      button.attr("id", data[i]._id);
      button.text("Delete Note");

      div.append(p);
      p.append(button);

      $("#notesDiv").append(div);
    }
  });
});

$(document).on("click", ".deleteNote", function() {
  console.log(" this working");
  var id = $(this).attr("id");
  console.log(id);
  $("#p-" + id).empty();

  $.ajax({
    method: "DELETE",
    url: "/delete-note/" + id
  });
});

