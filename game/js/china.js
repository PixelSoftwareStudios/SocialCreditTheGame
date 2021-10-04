const puncRegex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

document.addEventListener('DOMContentLoaded', () => {
  var socialCredit = parseInt(localStorage.getItem("socialCredit")) || 0;
  var creditUpBtn = document.getElementById("creditUpBtn");
  var creditClearBtn = document.getElementById("creditClearBtn");
  var creditField = document.getElementById("creditField");
  var plusCredit = document.getElementById("plusCredit");
  var audio = document.querySelector("audio");

  function setSocialCredit() {
    localStorage.setItem("socialCredit", socialCredit);
    creditField.innerHTML = "Your social credit is: " + socialCredit;
    if (socialCredit <= Number.NEGATIVE_INFINITY) {
      document.body.style.background = "url('assets/xi-double-laser.jpg')"
    }else if (socialCredit <= -1000000) {
      document.body.style.background = "url('assets/xi-laser.jpg')"
    }
  }

  setSocialCredit()
  var blocker = false
  creditUpBtn.addEventListener('click', (e) => {
    e.preventDefault()
    if (!blocker) {
      socialCredit += 1
      setSocialCredit()

      plusCredit.style.display = 'block';
      blocker = true
      setTimeout(() => {
        blocker = false
        plusCredit.style.display = 'none';
      }, 1500);
    }
  });

  creditClearBtn.addEventListener('click', (e) => {
    e.preventDefault()
    socialCredit += -socialCredit;
    setSocialCredit()
  });

  document.onclick = () => {
    if (audio.paused) {
      audio.play()
    }
  }
  var prompts = [
    {"text": "Is Taiwan a country?", "rightAnswer": ["no", "do you mean the chinese taipei"], "rightValue": 15, "wrongValue": 15000},
    {"text": "What happened on June 4th, 1989 in Tiananmen Square", "rightAnswer": ["nothing", "nothing happened"], "rightValue": 100, "wrongValue": Number.NEGATIVE_INFINITY},
    {"text": "Who is the greatest leader", "rightAnswer": ["xi jinping", "xi"], "rightValue": 15, "wrongValue": 1000000},
    {"text": "Do you have Valorant installed?", "rightAnswer": ["yes", "i love valorant"], "rightValue": 50, "wrongValue": 1000}
  ]
  function ccpQuiz() {
    question = prompts[Math.floor(Math.random() * prompts.length)]
    var answer = prompt(question.text)
    switch(answer.toLowerCase().replace(puncRegex, '')) {
      case question.rightAnswer[0]:
      case question.rightAnswer[1]:
        socialCredit += question.rightValue
        setSocialCredit()
      break;
      default:
        socialCredit = question.wrongValue == Number.NEGATIVE_INFINITY ? question.wrongValue : socialCredit - question.wrongValue
        setSocialCredit()
    }
  }

  setInterval(() => {
    ccpQuiz()
  }, 15000)
}, false);
