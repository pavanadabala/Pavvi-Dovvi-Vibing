document.addEventListener('DOMContentLoaded', function () {
  // Set the target date and time for the countdown (format: "YYYY/MM/DD HH:MM:SS")
  // Updated to a future date
  var targetDate = new Date("2025/12/31 23:59:59").getTime();

  var timer = setInterval(function () {
    // Get the current date and time
    var now = new Date().getTime();

    // Calculate the remaining time in milliseconds
    var remainingTime = targetDate - now;

    // Calculate days, hours, minutes, and seconds
    var days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    var hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    // Display the countdown timer
    var timerDisplay = days + "d " + hours + "h " + minutes + "m " + seconds + "s";
    document.getElementById("timer").innerHTML = timerDisplay;

    // If the countdown is finished, display a message
    if (remainingTime < 0) {
      clearInterval(timer);
      document.getElementById("timer").innerHTML = "Countdown Finished!";
    }
  }, 1000);

  // Lap button functionality
  var lapCount = 0;
  var lastLapTime = new Date().getTime();
  var lapData = []; // Store all lap data

  document.getElementById("lap-btn").addEventListener("click", function () {
    var now = new Date().getTime();
    var currentTimer = document.getElementById("timer").innerText;

    if (currentTimer && currentTimer !== "Countdown Finished!") {
      lapCount++;
      var diff = now - lastLapTime;
      lastLapTime = now;

      // Format difference 
      var diffMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      var diffSeconds = Math.floor((diff % (1000 * 60)) / 1000);
      var diffMilliseconds = Math.floor((diff % 1000) / 10); // Show 2 digits for ms

      var diffDisplay = "+" +
        (diffMinutes < 10 ? "0" : "") + diffMinutes + ":" +
        (diffSeconds < 10 ? "0" : "") + diffSeconds + "." +
        (diffMilliseconds < 10 ? "0" : "") + diffMilliseconds;

      var li = document.createElement("li");
      li.innerText = "Lap " + lapCount + ": " + currentTimer + " (" + diffDisplay + ")";
      document.getElementById("laps").appendChild(li);

      // Store lap data
      var diffInSeconds = diff / 1000;
      lapData.push({ lap: "Lap " + lapCount, diff: diffInSeconds });

      // Chart logic
      updateChart();
    }
  });

  var lapChart;
  function updateChart() {
    if (lapCount > 5) {
      document.getElementById("chart-container").style.display = "block";

      var ctx = document.getElementById('lapChart').getContext('2d');

      if (!lapChart) {
        // Initialize chart with ALL data collected so far
        var labels = lapData.map(d => d.lap);
        var data = lapData.map(d => d.diff);

        lapChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'Lap Difference (Seconds)',
              data: data,
              borderColor: '#930d0d',
              tension: 0.1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      } else {
        // Update existing chart with the latest data point
        var latestLap = lapData[lapData.length - 1];
        lapChart.data.labels.push(latestLap.lap);
        lapChart.data.datasets[0].data.push(latestLap.diff);
        lapChart.update();
      }
    }
  }
});
