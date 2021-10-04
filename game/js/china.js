document.addEventListener('DOMContentLoaded', () => {
  var socialCredit = parseInt(localStorage.getItem("socialCredit")) || 0
  var creditUpBtn = document.getElementById("creditUpBtn");
  var creditClearBtn = document.getElementById("creditClearBtn");
  var creditField = document.getElementById("creditField");
  var plusCredit = document.getElementById("plusCredit");

  function addSocialCredit(value) {
    socialCredit += value;
    localStorage.setItem("socialCredit", socialCredit);
    creditField.innerHTML = "Your social credit is: " + socialCredit;
    if (socialCredit <= Number.NEGATIVE_INFINITY) {
      document.body.style.background = "url('assets/xi-double-laser.jpg')"
    }else if (socialCredit <= -1000000) {
      document.body.style.background = "url('assets/xi-laser.jpg')"
    }
  }
  addSocialCredit(0)

  var blocker = false
  creditUpBtn.addEventListener('click', (e) => {
    e.preventDefault()
    if (!blocker) {
    addSocialCredit(1)

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
    addSocialCredit(-socialCredit)
  });
  var prompts = [
    {"text": "Is Taiwan a country?", "rightAnswer": "no", "rightValue": 15, "wrongValue": 1500},
    {"text": "What happened on June 4th, 1989 in Tiananmen Square", "rightAnswer": "nothing", "rightValue": 100, "wrongValue": 30000000},
    {"text": "Who is the greatest leader", "rightAnswer": "xi jinping", "rightValue": 15, "wrongValue": 1000000},    
  ]
  function ccpQuiz() {
    question = prompts[Math.floor(Math.random() * prompts.length)]
    var answer = prompt(question.text)
    switch(answer.toLowerCase()) {
      case question.rightAnswer:
        addSocialCredit(question.rightValue)    
      break;
      default:
        addSocialCredit(-question.wrongValue)
    }
  }

  setInterval(() => {
    ccpQuiz()
  }, 30000)
}, false);
