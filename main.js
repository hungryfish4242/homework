(function (d) {
  var config = {
    kitId: "aeo6pal",
    scriptTimeout: 3000,
    async: true
  },
    h = d.documentElement,
    t = setTimeout(function () {
      h.className = h.className.replace(/\bwf-loading\b/g, "") + " wf-inactive";
    }, config.scriptTimeout),
    tk = d.createElement("script"),
    f = false,
    s = d.getElementsByTagName("script")[0],
    a;
  h.className += " wf-loading";
  tk.src = "https://use.typekit.net/" + config.kitId + ".js";
  tk.async = true;
  tk.onload = tk.onreadystatechange = function () {
    a = this.readyState;
    if (f || (a && a != "complete" && a != "loaded")) return;
    f = true;
    clearTimeout(t);
    try {
      Typekit.load(config);
    } catch (e) { }
  };
  s.parentNode.insertBefore(tk, s);
})(document);

var scenarios = [
  {
    description:
      "离开老者往前行，阳光透过树叶间的缝隙洒下，令森林充满魔幻的氛围。突然，你在路上发现了一只小动物，它看起来孤单无助。你会...",
    options: [
      { value: "E", label: "靠近观察和与它互动，尝试帮助它找到家" },
      { value: "I", label: "在远处欣赏它，但不打扰它，继续前进" }
    ]
  },
  {
    description:
      "你继续踏着青苔覆盖的小径，来到了一个分岔路口。在你面前，出现了两条道路。你会...",
    options: [
      { value: "S", label: "细心观察地图或指南针，确定正确的方向" },
      {
        value: "N",
        label: "跟着直觉，选择一条路继续前进，相信它会带你去一个有趣的地方"
      }
    ]
  },
  {
    description:
      "经过一段时间的行走，你看到一位陌生人坐在树下，他觉得你看起来疲惫不堪，因此询问你需要帮忙吗。你会...",
    options: [
      {
        value: "F",
        label: "说出自己需要的帮助，并与他合作，一起寻找更好的出路"
      },
      {
        value: "T",
        label: "婉拒帮助，表示自己可以独自应对，然后继续自己的旅程"
      }
    ]
  },
  {
    description:
      "告别陌生人，在前行的过程中，你发现了一片美丽的花园，花园的尽头有一道清澈的小溪。你很想走进花园，但进入花园需要穿越这条小溪。你会...",
    options: [
      {
        value: "J",
        label: "寻找一条可以跨越小溪的石头或桥，确保自己可以安全到达花园"
      },
      {
        value: "P",
        label: "脱掉鞋子，冒着湿脚的风险，穿越小溪，享受沐浴在溪水中的感觉"
      }
    ]
  },
  {
    description:
      "当你继续向前走时，你意外地发现了一座古老的神秘洞穴，洞穴的入口散发出微弱的光芒。你会...",
    options: [
      {
        value: "S",
        label: "踏进洞穴中，好奇地探索其中的秘密，期待着能够发现什么宝藏"
      },
      {
        value: "N",
        label:
          "在洞穴外观察一会儿，感受着洞穴散发的神秘氛围，但不敢进去，继续向前走"
      }
    ]
  }
];

var currentScenarioIndex = 0;
var answers = [];

$(document).ready(function () {
  $("#test").hide();
  $("#wait").hide();
  $("#result").hide();
  $("#askName").hide();
  $("#goIntoForest").click(function () {
    $("#cover").hide();
    $("#askName").show();
  });

  $("#start").click(function () {
    var answerName = $("#name").val();
    if (answerName === "") {
      alert("請先輸入姓名或暱稱！");
    } else {
      $("#askName").hide();
      $("#test").show();
      showTest();
    }
  });
});

function showTest() {
  renderScenario();
  hideBtn();

  $("#nextBtn").click(function () {
    if (isAnswered()) {
      saveAnswer();
      currentScenarioIndex++;
      renderScenario();
      hideBtn();
    } else {
      alert("请先回答问题！");
    }
  });

  $("#waitBtn").click(function () {
    if (isAnswered()) {
      saveAnswer();
      $("#wait").show();
      $("#test").hide();
    } else {
      alert("请先回答问题！");
    }
  });

  $("#submitBtn").click(function () {
    if (isAnswered()) {
      $("#wait").hide();
      $("#result").show();
      saveAnswer();
      calculateResult();
    } else {
      alert("请先回答问题！");
    }
  });
}

function hideBtn() {
  // 控制按鈕顯示
  if (currentScenarioIndex < scenarios.length - 1) {
    $("#nextBtn").show();
    $("#waitBtn").hide();
  } else {
    $("#nextBtn").hide();
    $("#waitBtn").show();
  }
}

function isAnswered() {
  var selectedOption = $('input[name="q' + currentScenarioIndex + '"]:checked');
  return selectedOption.length > 0;
}

function renderScenario() {
  if (currentScenarioIndex < scenarios.length) {
    var scenario = scenarios[currentScenarioIndex];
    var scenarioHTML = "";
    scenarioHTML += "<p>" + scenario.description + "</p>";
    scenarioHTML += "<form>";

    for (var i = 0; i < scenario.options.length; i++) {
      var option = scenario.options[i];
      scenarioHTML +=
        '<input type="radio" name="q' +
        currentScenarioIndex +
        '" id="' +
        option.value +
        '" value="' +
        option.value +
        '"> ' +
        '<label for="' +
        option.value +
        '">' +
        option.label +
        "</label>";
    }

    scenarioHTML += "</form>";
    $("#scenarioContainer").html(scenarioHTML);
  } else {
    alert("已完成所有情境！");
  }
}

function saveAnswer() {
  var selectedOption = $('input[name="q' + currentScenarioIndex + '"]:checked');
  if (selectedOption.length > 0) {
    answers[currentScenarioIndex] = selectedOption.val();
  }
  // console.log(answers);
}

function calculateResult() {
  var result = "";

  // 計算 E 或 I
  var eCount = 0;
  var iCount = 0;
  for (var i = 0; i < scenarios.length; i++) {
    var answer = answers[i];
    if (answer === "E") {
      eCount++;
    } else if (answer === "I") {
      iCount++;
    }
  }
  result += eCount > iCount ? "E" : "I";

  // 計算 S 或 N
  var sCount = 0;
  var nCount = 0;
  for (var i = 0; i < scenarios.length; i++) {
    var answer = answers[i];
    if (answer === "S") {
      sCount++;
    } else if (answer === "N") {
      nCount++;
    }
  }
  result += sCount > nCount ? "S" : "N";

  // 計算 T 或 F
  var tCount = 0;
  var fCount = 0;
  for (var i = 0; i < scenarios.length; i++) {
    var answer = answers[i];
    if (answer === "T") {
      tCount++;
    } else if (answer === "F") {
      fCount++;
    }
  }
  result += tCount > fCount ? "T" : "F";

  // 計算 J 或 P
  var jCount = 0;
  var pCount = 0;
  for (var i = 0; i < scenarios.length; i++) {
    var answer = answers[i];
    if (answer === "J") {
      jCount++;
    } else if (answer === "P") {
      pCount++;
    }
  }
  result += jCount > pCount ? "J" : "P";

  // 建立 MBTI 類型與動物名稱的對應表
  var animalNames = {
    ENTJ: "狮子",
    ENTP: "狐狸",
    ENFJ: "孔雀",
    ENFP: "蝴蝶",
    INTJ: "独角兽",
    INTP: "猫头鹰",
    INFJ: "灰狼",
    INFP: "水鹿",
    ESTJ: "老鹰",
    ESTP: "猎豹",
    ESFJ: "大象",
    ESFP: "黑熊",
    ISTJ: "浣熊",
    ISTP: "狼狗",
    ISFJ: "松鼠",
    ISFP: "鹿鼠"
  };

  // 建立動物名稱與描述的對應表
  var animalDescriptions = {
    狮子:
      "森林中的领导者，擅长用规范和经验渲染他人，相当具有领导风范的类型。然而，他们的执着和硬派的管理风格有时会给身边人带来压力。",
    狐狸:
      "机智灵活的探索者，擅长思考问题的各种可能性，喜欢挑战常规。像狐狸一样狡猾聪明，但有时也会因为好奇心而迷失方向。",
    孔雀:
      "充满魅力和社交能力的孔雀，在人群中引人注目，善于建立和谐和支持他人。然而，他们有时也会在过于关注他人的需求时忽略了自己。",
    蝴蝶:
      "自由奔放的蝴蝶，充满热情和创造力。他们喜欢追求梦想，带给周围人活力和喜悦，但有时也容易感到不安定和难以捉摸。",
    独角兽:
      "神秘而独立的独角兽，擅长分析和策划，有着强大的洞察力和创新思维。他们在追求目标时常常非常坚定，但也因为内向而被认为神秘而难以理解。",
    猫头鹰:
      "智慧而冷静的观察者，像猫头鹰一样喜欢追求知识和理解。他们拥有优秀的逻辑思维和分析能力，但有时也倾向于过度分析和与现实脱节。",
    灰狼:
      "敏锐而富有同理心的灰狼，善于理解他人的需求和情感。他们常常具有崇高的价值观和使命感，但有时也会因为过于保护他人而忽略自己的需求。",
    水鹿:
      "敏感而和善的水鹿，具有丰富的情感世界和强烈的内在价值观。像水鹿一样，他们追求和平与和谐，但有时也容易感到压力和情绪波动。",
    老鹰:
      "有着锐利洞察力和果断决策能力的老鹰，擅长组织和管理。他们注重效率和结果，但有时也因为过于严格和不易妥协而与他人产生冲突。",
    猎豹:
      "追求刺激和冒险的猎豹，善于适应环境并迅速做出反应。他们勇于冒险并享受现在，但有时也容易变得过于冲动和不顾后果。",
    大象:
      "温暖和蔼的大象，关心他人并善于提供支持和帮助。他们重视传统价值观和社区关系，但有时也会因为过于关注他人的评价而忽略自己的需求。",
    黑熊:
      "活泼开朗的黑熊，喜欢享受当下并与他人互动。他们善于娱乐和带给周围人欢乐，但有时也会因为缺乏计划性而面临困难。",
    浣熊:
      "细心勤劳的浣熊，喜欢按部就班地处理任务和责任。他们是可靠的伙伴和良好的组织者，但有时也倾向于过度保守和固执。",
    狼狗:
      "独立而机智的狼狗，擅长解决问题和应对挑战。他们享受自由和冒险，但有时也会因为过于独立而不愿与他人合作。",
    松鼠:
      "细心而负责任的松鼠，善于收集和保管资源。他们拥有出色的记忆力和组织能力，注重细节并具有耐心，但有时也会因过于保守而错过一些机会。",
    鹿鼠:
      "敏感而和谐的鹿鼠，追求艺术和美感。他们拥有丰富的情感世界和创造力，但有时也容易感到压力和难以捉摸。"
  };

  // 建立動物名稱與能力值的對應表
  var animalAbilities = {
    "狮子": [9, 6, 8, 5, 4],
    "狐狸": [6, 9, 3, 8, 7],
    "孔雀": [5, 4, 2, 7, 9],
    "蝴蝶": [3, 7, 1, 6, 8],
    "独角兽": [8, 5, 6, 9, 3],
    "猫头鹰": [4, 8, 2, 9, 7],
    "灰狼": [9, 7, 7, 8, 6],
    "水鹿": [3, 6, 5, 7, 8],
    "老鷹": [7, 9, 6, 5, 6],
    "獵豹": [6, 9, 8, 4, 7],
    "大象": [8, 2, 9, 6, 3],
    "黑熊": [5, 6, 7, 3, 4],
    "浣熊": [4, 8, 3, 6, 7],
    "狼狗": [7, 8, 7, 5, 6],
    "松鼠": [3, 9, 2, 6, 8],
    "鹿鼠": [2, 7, 4, 5, 9]
  };

  // 建立動物的友好動物列表
  var animalFriends = {
    "狮子": "猫头鹰",
    "狐狸": "独角兽",
    "孔雀": "水鹿",
    "蝴蝶": "灰狼",
    "独角兽": "狐狸",
    "猫头鹰": "狮子",
    "灰狼": "蝴蝶",
    "水鹿": "孔雀",
    "老鹰": "狼狗",
    "猎豹": "浣熊",
    "大象": "鹿鼠",
    "黑熊": "松鼠",
    "浣熊": "猎豹",
    "狼狗": "老鹰",
    "松鼠": "黑熊",
    "鹿鼠": "大象"
  };

  // 顯示結果
  $("#submitBtn").hide();
  $("#scenarioContainer").hide();
  var mbtiType = result;
  var animalName = animalNames[mbtiType];
  var animalDescription = animalDescriptions[animalName];
  var animalAbility = animalAbilities[animalName];
  var imgSrc = "/src/image/animal/" + animalName + ".png";

  var answerHTML = "<h2>" + animalName + "</h2>";
  answerHTML += "<img src='" + imgSrc + "' width=150 height=150>";
  answerHTML += "<p>" + animalDescription + "</p>";

  $("#content").html(answerHTML);

  var animalFriend = animalFriends[animalName];
  var friendImgSrc = "/src/image/animal/" + animalFriend + ".png";
  var friendHTML = "<img src='" + friendImgSrc + "' width=100 height=100>";
  friendHTML += "<p>" + animalFriend + "</p>";

  $("#friend").html(friendHTML);

  // 能力值的維度
  var dimensions = ["领导能力", "敏捷性", "力量", "智慧", "灵敏度"];

  // 設定雷達圖的資料
  var data = {
    labels: dimensions,
    datasets: [{
      label: "能力值",
      data: animalAbility,
      backgroundColor: "rgba(255, 234, 138, 0.4)",
      borderColor: "rgba(255, 234, 138, 1)",
      pointBackgroundColor: "rgba(255, 234, 138, 1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(255, 234, 138, 1)",
      color: "rgba(255, 234, 138, 1)"
    }]
  };

  // 設定雷達圖的選項
  var options = {
    scale: {
      ticks: {
        beginAtZero: true,
        max: 10,
      },
      pointLabels: {
        fontSize: 14,
      },
    },
    legend: {
      display: false,
    }
  };

  Chart.defaults.color = 'rgba(255, 234, 138, 1)';

  // 繪製雷達圖
  var ctx = document.getElementById("radarChart").getContext("2d");
  var radarChart = new Chart(ctx, {
    type: 'radar',
    data: data,
    options: options
  });


  // 在按鈕點擊後觸發的事件處理函式
  $("#shareBtn").on("click", function () {
    // 取得測驗結果
    var result = animalDescription;
    var answerName = $("#name").val();

    // 建立新的 Canvas 元素
    var canvas = document.createElement("canvas");
    canvas.width = 720;
    canvas.height = 1280;
    var ctx = canvas.getContext("2d");

    // 建立背景圖片物件
    var backgroundImage = new Image();
    backgroundImage.src = "/src/image/canvas_background.jpg";

    // 背景圖片載入完成後繪製
    backgroundImage.onload = function () {
      // 繪製背景圖片
      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

      // 設定標題文字樣式
      ctx.font = "bold 55px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowBlur = 5;
      ctx.shadowColor = "rgba(0,0,0,0.5)";

      // 繪製標題文字
      var titleText = answerName + "是...";
      ctx.fillText(titleText, canvas.width / 2, 130);

      // 設定動物文字樣式
      ctx.font = "bold 78px kaisei-tokumin";
      ctx.fillStyle = "#523721";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowBlur = 5;
      ctx.shadowColor = "rgba(255,255,255,0.5)";

      // 繪製動物文字
      var animalText = animalName;
      ctx.fillText(animalText, canvas.width / 2, canvas.height - 670);

      // 設定友好動物標題文字樣式
      ctx.font = "bold 40px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowBlur = 5;
      ctx.shadowColor = "rgba(0,0,0,0.5)";

      // 繪製友好動物標題文字
      ctx.fillText("友好动物", canvas.width / 2 + 180, canvas.height - 560);

      // 設定友好動物文字樣式
      ctx.font = "bold 30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowBlur = 5;
      ctx.shadowColor = "rgba(0,0,0,0.5)";

      // 繪製友好動物標題文字
      ctx.fillText(animalFriend, canvas.width / 2 + 180, canvas.height - 340);

      // 設定測驗結果文字的樣式和位置
      ctx.font = "32px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowBlur = 5;
      ctx.shadowColor = "rgba(0,0,0,0.5)";

      // 設定測驗結果文字的最大寬度和行高
      var maxWidth = canvas.width - 40; // 距離邊界的空白距離
      var lineHeight = 42;

      // 定義測驗結果文字的起始位置
      var startX = canvas.width / 2;
      var startY = canvas.height - 260;

      // 將測驗結果文字進行換行處理
      var words = result.split("");
      var line = "";
      var lines = [];

      for (var i = 0; i < words.length; i++) {
        var testLine = line + words[i] + "";
        var metrics = ctx.measureText(testLine);
        var testWidth = metrics.width;

        if (testWidth > maxWidth && i > 0) {
          lines.push(line.trim());
          line = words[i] + "";
        } else {
          line = testLine;
        }
      }

      lines.push(line.trim());

      // 繪製測驗結果文字（換行處理後）
      for (var j = 0; j < lines.length; j++) {
        ctx.fillText(lines[j], startX, startY + j * lineHeight);
      }

      // 設定雷達圖的參數
      var abilities = animalAbility;
      var dimensions = ["领导能力", "敏捷性", "力量", "智慧", "灵敏度"];
      var centerX = 230;
      var centerY = canvas.height - 450;
      var radius = 100;
      var angleCount = abilities.length;
      var angle = (Math.PI * 2) / angleCount;

      // 將能力值轉換為百分比
      var maxAbility = 10; // 最大值為 10
      var abilitiesInPercentage = abilities.map(function (ability) {
        return (ability / maxAbility) * 100;
      });

      // 在 canvas 上繪製雷達圖
      ctx.beginPath();
      for (var i = 0; i < angleCount; i++) {
        var currentAngle = angle * i - Math.PI / 2;
        var value = abilitiesInPercentage[i];
        var x = centerX + Math.cos(currentAngle) * ((radius * value) / 100);
        var y = centerY + Math.sin(currentAngle) * ((radius * value) / 100);

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        // 繪製維度名稱標籤
        var labelX = centerX + Math.cos(currentAngle) * (radius + 20);
        var labelY = centerY + Math.sin(currentAngle) * (radius + 20);
        ctx.fillStyle = "black";
        ctx.font = "25px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(dimensions[i], labelX, labelY);
      }
      ctx.closePath();
      ctx.strokeStyle = "rgba(255, 234, 138, 0.7)";
      ctx.lineWidth = 5;
      ctx.fillStyle = "rgba(255, 234, 138, 0.3)";
      ctx.fill();
      ctx.stroke();

      var imgObj = new Image();
      imgObj.src = imgSrc;
      imgObj.onload = function () {
        ctx.drawImage(imgObj, canvas.width / 2 - 175, 200, 350, 350);

        var friendimgObj = new Image();
        friendimgObj.src = friendImgSrc;
        friendimgObj.onload = function () {
          ctx.drawImage(friendimgObj, 465, canvas.height - 525, 150, 150);

          // 建立圖片 URL
          var image = canvas.toDataURL("image/png");

          // 開啟新視窗
          var newWindow = window.open("", "_blank");

          // 在新視窗中插入圖片元素
          newWindow.document.open();
          newWindow.document.write('<p style="text-align:center">长按图片保存分享</p><img src="' + image + '" alt="測驗結果" style="height: 100%;text-align:center;margin: 0 auto;">');
          newWindow.document.close();
        }
      };
    };
  });

}