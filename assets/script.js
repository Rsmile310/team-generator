$(document).ready(function () {
  let data = [
    {
      name: "Juan",
      performance: 10,
    },
    {
      name: "Pedro",
      performance: 10,
    },
    {
      name: "Pablo",
      performance: 10,
    },
    {
      name: "Vilma",
      performance: 9,
    },
    {
      name: "Beti",
      performance: 9,
    },
    {
      name: "Dino",
      performance: 8,
    },
    {
      name: "Vam",
      performance: 8,
    },
    {
      name: "Jose",
      performance: 8,
    },
    {
      name: "Carlos",
      performance: 8,
    },
    {
      name: "Karina",
      performance: 8,
    },
    {
      name: "Marina",
      performance: 7,
    },
    {
      name: "Mery",
      performance: 6,
    },
    {
      name: "Sam",
      performance: 6,
    },
    {
      name: "Ani",
      performance: 5,
    },
    {
      name: "Josh",
      performance: 5,
    },
    {
      name: "Cesar",
      performance: 5,
    },
    {
      name: "Sofia",
      performance: 3,
    },
    {
      name: "John",
      performance: 3,
    },
    {
      name: "Kais",
      performance: 3,
    },
    {
      name: "Lao",
      performance: 2,
    },
  ];
  var groupNum = 3;
  var flag = [];
  $("#totalNum").html(data.length);
  data.map((e, index) => {
    console.log(index)
    if (index < data.length-1)
      $("#inputData").append(e.name + " " + e.performance + "\n");
    else $("#inputData").append(e.name + " " + e.performance);
    // performanceArr.push(e.performance);
  });

  function groupTasks(tasks, groupCount) {
    var sum = tasks.reduce((p, c) => p + c),
      initial = [...Array(groupCount)].map(
        (sa) => ((sa = []), (sa.sum = 0), sa)
      );
    return tasks
      .sort((a, b) => b - a)
      .reduce((groups, task) => {
        var group = groups.reduce((p, c) => (p.sum < c.sum ? p : c));
        group.push(task);
        group.sum += task;
        return groups;
      }, initial);
  }
  // distribute them into 10 sub arrays with closest sums

  function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  $("#startBtn").click(function () {
    var performanceArr = [];
    flag = [];
    var inputDataArr = $("#inputData").val().split("\n");
    var data = [];
    for (var i = 0; i < inputDataArr.length; i++) {
      data.push({
        name: inputDataArr[i].split(" ")[0],
        performance: Number(inputDataArr[i].split(" ")[1]),
      });
    }
    $("#totalNum").text(data.length);
    data.map((e, index) => {
      performanceArr.push(e.performance);
    });
    data = shuffleArray(data);

    const groupedData = groupBy(data, (e) => e.performance);
    $(".output-box-body>div").html("");

    groupNum = $("#groupNum").val();

    result = groupTasks(performanceArr, parseInt(groupNum));

    for (var i = 0; i < result.length; i++) {
      $(".output-box-body>div").append(
        `<div class="output-card` +
          Number(i + 1) +
          `"><div class="output-card-header"><h3 class="mb-0">Team` +
          Number(i + 1) +
          `</h3><span class="group-count">` +
          result[i].length +
          `</span></div><div class="output-card-body"></div><div class="output-card-footer">Total: ` +
          result[i]["sum"] +
          `</div></div>`
      );
      for (var j = 0; j < result[i].length; j++) {
        // console.log(groupedData);
        flag.push(result[i][j]);
        var tempp = flag.filter((num) => num === result[i][j]).length;

        $(".output-card" + Number(i + 1))
          .find(".output-card-body")
          .append(
            `<p>` +
              groupedData.get(result[i][j])[tempp - 1].name +
              `&nbsp;&nbsp;&nbsp;` +
              groupedData.get(result[i][j])[tempp - 1].performance +
              `</p>`
          );
      }
    }
  });
});
