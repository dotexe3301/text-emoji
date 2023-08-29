var emoji = "";
function encryption() {
  document.querySelector("#encrypt-btn").addEventListener("click", function () {
    var input = document.getElementById("txtmsg").value;
    var password = document.getElementById("password").value;
    const str = input.split("");
    str.forEach((element) => {
      emoji += `&#128${element.charCodeAt()} `;
    });
    document.querySelector("#result").innerHTML = emoji;

    var dataarr = [];

    if (JSON.parse(localStorage.getItem("data1"))) {
      dataarr = JSON.parse(localStorage.getItem("data1"));
      dataarr.push({ pass: password, input: input, emoji: emoji });
    } else {
      dataarr = [{ pass: password, input: input, emoji: emoji }]; // array of objects
    }

    localStorage.setItem(`data1`, JSON.stringify(dataarr));
    emoji = "";
  });
}

function decryption() {
  document.querySelector("#decrypt-btn").addEventListener("click", function () {
    var emoji2 = "";

    var input2 = document.querySelector("#emojimsg").value;
    var pass2 = document.querySelector("#finalpassword").value;

    var user = JSON.parse(localStorage.getItem("data1"));

    var str2 = input2.split(" ");
    str2.forEach((element) => {
      emoji2 += `&#${element.codePointAt(0)} `;
    });

    var found;
    for (let i of user) {
      if (i.emoji == emoji2) {
        found = i;
      }
    }
    if (found.pass != pass2) {
      document.querySelector("#result").style.display = `block`;
      document.querySelector("#result").style.color = `red`;
      document.querySelector("#result").innerHTML = "Wrong emojis or password";
    } else if (found.emoji === emoji2) {
      document.querySelector("#result").style.display = `block`;
      document.querySelector("#result").style.color = `#eee`;
      document.querySelector("#result").innerHTML = found.input;
    }
  });
}

function endecbtnclick() {
  document.querySelector("#decbtn").addEventListener("click", function () {
    document.querySelector("#decryption").style.display = "block";
    document.querySelector("#encryption").style.display = "none";
    document.querySelector("#decbtn").style.backgroundColor = "#333";
    document.querySelector("#encbtn").style.backgroundColor = "#222";
    document.querySelector("#main>h1 span").style.rotate = "-180deg";
    document.querySelector("#result").style.display = "none";
    document.querySelector("title").innerHTML = "Emoji-to-text";
  });
  document.querySelector("#encbtn").addEventListener("click", function () {
    document.querySelector("#encryption").style.display = "block";
    document.querySelector("#decryption").style.display = "none";
    document.querySelector("#encbtn").style.backgroundColor = "#333";
    document.querySelector("#decbtn").style.backgroundColor = "#222";
    document.querySelector("#main>h1 span ").style.rotate = "0deg";
    document.querySelector("#result").style.display = "none";
    document.querySelector("title").innerHTML = "Text-to-emoji";
    
  });
  document.querySelector("#encrypt-btn").addEventListener("click", function () {
    document.querySelector("#result").style.display = "block";
  });
  document.querySelector("#decrypt-btn").addEventListener("click", function () {
    document.querySelector("#result").style.display = "block";
  });
}
endecbtnclick();
encryption();
decryption();