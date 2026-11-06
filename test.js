var questions = [
  ["A1", "Ich ___ Anna.", ["heiße", "heißt", "heißen"], 0],
  ["A1", "Ich komme ___ Russland.", ["von", "aus", "nach"], 1],
  ["A1", "Das ist ___ Buch.", ["eine", "einen", "ein"], 2],

  ["A2", "Gestern ___ ich lange geschlafen.", ["bin", "habe", "war"], 1],
  ["A2", "Ich fahre morgen ___ Berlin.", ["nach", "zu", "in"], 0],
  ["A2", "Ich bleibe zu Hause, ___ ich krank bin.", ["denn", "deshalb", "weil"], 2],

  ["B1", "Das ist der Mann, ___ ich gestern gesehen habe.", ["der", "den", "dem"], 1],
  ["B1", "Wenn ich mehr Zeit ___, würde ich öfter reisen.", ["hätte", "habe", "hatte"], 0],
  ["B1", "Ich interessiere mich ___ Geschichte.", ["an", "auf", "für"], 2],

  ["B2", "Das Haus ___ im Jahr 1900 gebaut.", ["wurde", "hat", "war"], 0],
  ["B2", "___ des schlechten Wetters fand das Konzert statt.", ["Wegen", "Trotz", "Obwohl"], 1],
  ["B2", "Je mehr man übt, ___ besser wird man.", ["als", "so", "desto"], 2],

  ["C1", "Der Minister sagte, er ___ nichts davon gewusst.", ["hat", "habe", "haben"], 1],
  ["C1", "Die Firma hat ___ der hohen Kosten auf das Projekt verzichtet.", ["angesichts", "ungeachtet", "anstatt"], 0],
  ["C1", "«Sich etwas durch den Kopf gehen lassen» bedeutet:", ["etwas vergessen", "Kopfschmerzen haben", "gründlich nachdenken"], 2],

  ["C2", "Seine Argumentation war sehr ___.", ["stichhaltig", "stechend", "stichig"], 0],
  ["C2", "«Jemandem nicht das Wasser reichen können» bedeutet:", ["Durst haben", "viel schlechter sein als jemand", "jemandem nicht helfen"], 1],
  ["C2", "Den Vorwurf wies er als haltlos ___.", ["ab", "an", "zurück"], 2]
];

var levels = ["A1", "A2", "B1", "B2", "C1", "C2"];

var form = document.getElementById("test");
var html = "";
for (var i = 0; i < questions.length; i++) {
  html += '<div class="test-question" id="q' + i + '">';
  html += "<p>" + (i + 1) + ". " + questions[i][1] + "</p>";
  for (var j = 0; j < questions[i][2].length; j++) {
    html += '<label><input type="radio" name="q' + i + '" value="' + j + '"> ' + questions[i][2][j] + "</label>";
  }
  html += "</div>";
}
form.innerHTML = html;

function checkTest() {
  var correct = { A1: 0, A2: 0, B1: 0, B2: 0, C1: 0, C2: 0 };
  var total = 0;

  for (var i = 0; i < questions.length; i++) {
    var checked = document.querySelector('input[name="q' + i + '"]:checked');
    var block = document.getElementById("q" + i);
    if (checked && Number(checked.value) == questions[i][3]) {
      correct[questions[i][0]]++;
      total++;
      block.className = "test-question right";
    } else {
      block.className = "test-question wrong";
    }
  }

  var level = "A0";
  for (var k = 0; k < levels.length; k++) {
    if (correct[levels[k]] >= 2) {
      level = levels[k];
    } else {
      break;
    }
  }

  document.getElementById("result").innerHTML =
    "Правильных ответов: " + total + " из " + questions.length + ".<br>Ваш примерный уровень: <b>" + level + "</b>";
}
