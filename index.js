window.onload = function () {
  var i;
  for (i = 1; i < 11; i++) {
    var player = localStorage.getItem("player" + i);
    var rank = localStorage.getItem("player" + i + "rank");
    console.log(player + " " + rank);
    $("#player" + i).val(player);
    $("#player" + i + "rank").text(rank);
    $("#player" + i + "rank").addClass("rank-" + rank);
    console.log("loaded player"+i);
  }
};

window.onunload = savePlayers();

var players = $(".input").length;

function savePlayers() {
  var i;
  for (i = 1; i < (players + 1); i++) {
    localStorage.setItem("player" + i, $("#player" + i).val());
    localStorage.setItem(
      "player" + i + "rank",
      $("#player" + i + "rank").text()
    );
    var player = localStorage.getItem("player" + i);
    var rank = localStorage.getItem("player" + i + "rank");
    console.log("saved player"+i);
  }
}

function randomNumber(min, max) {
  const r = Math.random() * (max - min) + min;
  return Math.floor(r);
}

$("body").on("click", ".rank", function () {
  $(".popup").removeClass("visible");
  $(this).next(".popup").toggleClass("visible");
});

$("body").on("click", ".rankbox", function () {
  var currentRank = $(this).html();
  var futureRank = "rank-" + currentRank;
  $(this).parent().parent().parent().find(".rank").text(currentRank);
  $(this)
    .parent()
    .parent()
    .parent()
    .find(".rank")
    .removeClass(
      "rank-1 rank-2 rank-3 rank-4 rank-5 rank-6 rank-7 rank-8 rank-9 rank-10"
    );
  $(this).parent().parent().parent().find(".rank").addClass(futureRank);
  $(".popup").removeClass("visible");
  savePlayers();
});

$("body").on("click", ".x", function () {
  $(this).parent().addClass("delete");
  setTimeout(() => {
    $(this).parent().remove();
  }, 100);
  players = players - 1;
  $("#playernumber").text(players);
});

var large =
  '<div class="input delete"><div class="x"><i class="fas fa-times"></i></div><input type="text" name="player" placeholder="Player" /></input><div><div class="rank">10</div><div class="popup"><div class="arrow"><svg xmlns="http://www.w3.org/2000/svg" width="11.472" height="6.733" viewBox="0 0 11.472 6.733"><path id="Path_1" data-name="Path 1" d="M513.991-137l5.736-6.733L525.463-137Z" transform="translate(-513.991 143.736)" fill="#333a3a"/></svg></div><div class="popup2"><div class="rankbox rank-1">1</div><div class="rankbox rank-2">2</div><div class="rankbox rank-3">3</div><div class="rankbox rank-4">4</div><div class="rankbox rank-5">5</div><div class="rankbox rank-6">6</div><div class="rankbox rank-7">7</div><div class="rankbox rank-8">8</div><div class="rankbox rank-9">9</div><div class="rankbox rank-10">10</div></div></div></div></div>';

var large2 =
  '<div class="input input-norank delete"><div class="x"><i class="fas fa-times"></i></div><input type="text" name="player" placeholder="Player" /></input><div><div class="rank hidden">10</div><div class="popup"><div class="arrow"><svg xmlns="http://www.w3.org/2000/svg" width="11.472" height="6.733" viewBox="0 0 11.472 6.733"><path id="Path_1" data-name="Path 1" d="M513.991-137l5.736-6.733L525.463-137Z" transform="translate(-513.991 143.736)" fill="#333a3a"/></svg></div><div class="popup2"><div class="rankbox rank-1">1</div><div class="rankbox rank-2">2</div><div class="rankbox rank-3">3</div><div class="rankbox rank-4">4</div><div class="rankbox rank-5">5</div><div class="rankbox rank-6">6</div><div class="rankbox rank-7">7</div><div class="rankbox rank-8">8</div><div class="rankbox rank-9">9</div><div class="rankbox rank-10">10</div></div></div></div></div>';

$(".add").on("click", function () {
  if (players < 10) {
    if ($(".rating").hasClass("rating-active")) {
      $(large).insertBefore(".buttons");
    } else {
      $(large2).insertBefore(".buttons");
    }
    setTimeout(() => {
      $(".buttons").prev().removeClass("delete");
    }, 1);
    players = players + 1;
    $("#playernumber").text(players);
  }
});

$(".rating").on("click", function () {
  savePlayers();
  if ($(this).hasClass("rating-active")) {
    $(this).toggleClass("rating-active");
    $(".team-rank").toggleClass("hidden");
    $(".rank").toggleClass("hidden");
    setTimeout(() => {
      $(".input").toggleClass("input-norank");
    }, 205);
    setTimeout(() => {
      $(".player-team").toggleClass("player-norank");
    }, 205);
  } else {
    $(this).toggleClass("rating-active");
    $(".input").toggleClass("input-norank");
    $(".player-team").toggleClass("player-norank");
    $(".rank").toggleClass("hidden");
    $(".team-rank").toggleClass("hidden");
  }
});
$(".map").on("click", function () {
  $(this).toggleClass("opacity");
});

function scrambleMap() {
  if ($(".map").hasClass("opacity")) {
    return;
  } else {
    $(".map-0").removeClass("map-1 map-2 map-3 map-4 map-5");
    var randomMap = randomNumber(1, 5);
    $(".map-0").addClass("map-" + randomMap);
    if ($(".map-0").hasClass("map-1")) {
      $("#map").text("Ascent");
    }
    if ($(".map-0").hasClass("map-2")) {
      $("#map").text("Bind");
    }
    if ($(".map-0").hasClass("map-3")) {
      $("#map").text("Haven");
    }
    if ($(".map-0").hasClass("map-4")) {
      $("#map").text("Split");
    }
    if ($(".map-0").hasClass("map-5")) {
      $("#map").text("Icebox");
    }
  }
}

function scrambleNorating() {
  if (players % 2 != 0) {
    $("#team1").html(
      '<div class="player-team player-norank"><p>Number of players is odd!</p><div class="hidden">10</div></div>'
    );
    $("#team2").html(
      '<div class="player-team player-norank"><p>Number of players is odd!</p><div class="hidden">10</div></div>'
    );
    return;
  }
  $("#team1").html("<code></code>");
  $("#team2").html("<code></code>");

  $(".input").each(function () {
    var playername = $(this).find("input").val();
    var playerrank = parseInt($(this).find(".rank").html());
    var team = randomNumber(1, 3);

    if (playername != "") {
      $("#team" + team).append(
        '<div class="player-team player-norank"><p>' +
          playername +
          '</p><div class="rank rank-' +
          playerrank +
          ' hidden">' +
          playerrank +
          "</div></div>"
      );
    } else {
      $("#team" + team).append(
        '<div class="player-team player-norank"><p>Fill out all of the player names</p><div class="rank rank-1 hidden">1</div></div>'
      );
    }
  });

  $("#team1rank").text(team1rank);
  $("#team2rank").text(team2rank);
  var team1 = $("#team1").find(".player-team").length;
  var team2 = $("#team2").find(".player-team").length;
  if (team1 != team2) {
    scrambleNorating();
  }
}

function scramble() {
  scrambleMap();
  if ($(".rating").hasClass("rating-active")) {
    scrambleRating();
    $("#team1").find(".rank").removeClass("hidden");
    $("#team2").find(".rank").removeClass("hidden");
    $("#team1").find(".player-team").removeClass("player-norank");
    $("#team2").find(".player-team").removeClass("player-norank");
  } else {
    scrambleNorating();
  }
}

function scrambleRating() {
  if (players % 2 != 0) {
    $("#team1").html(
      '<div class="player-team player-norank"><p>Number of players is odd!</p><div class="hidden">10</div></div>'
    );
    $("#team2").html(
      '<div class="player-team player-norank"><p>Number of players is odd!</p><div class="hidden">10</div></div>'
    );
    return;
  }
  $("#team1").html("<code></code>");
  $("#team2").html("<code></code>");

  $(".input").each(function () {
    var playername = $(this).find("input").val();
    var playerrank = parseInt($(this).find(".rank").html());
    var team = randomNumber(1, 3);

    if (playername != "") {
      $("#team" + team).append(
        '<div class="player-team"><p>' +
          playername +
          '</p><div class="rank rank-' +
          playerrank +
          '">' +
          playerrank +
          "</div></div>"
      );
    } else {
      $("#team" + team).append(
        '<div class="player-team"><p>Fill out all of the player names</p><div class="rank rank-1">1</div></div>'
      );
    }
  });
  var team1 = $("#team1").find(".player-team").length;
  var team2 = $("#team2").find(".player-team").length;
  if (team1 != team2) {
    scrambleNorating();
  }
}

$(".scramble").on("click", function () {
  savePlayers();
  $(".container2").addClass("map-20");
  setTimeout(() => {
    $(".container2").removeClass("map-20");
  }, 200);
  scramble();
  var sum1 = 0;
  var sum2 = 0;
  $("#team1")
    .find(".rank")
    .each(function () {
      sum1 += parseFloat($(this).text());
    });
  $("#team2")
    .find(".rank")
    .each(function () {
      sum2 += parseFloat($(this).text());
    });
  $("#team1rank").html(sum1);
  $("#team2rank").html(sum2);
});
