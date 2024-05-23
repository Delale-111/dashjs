document.addEventListener("DOMContentLoaded", function() {
    fetch('weather_data.json')
        .then(response => response.json())
        .then(data => {
            createTemperatureChart(data);
            createPrecipitationChart(data);
            createMonthlyChart();
            createLiquidGauge(58); // Mettre à jour le visuel de pourcentage
            updateWeatherInfo(data);
            updateIndicators(data);
        });

    function createTemperatureChart(data) {
        const ctx = document.getElementById('currentTemperature').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.hours,
                datasets: [{
                    label: 'Température (°C)',
                    data: data.temperatures,
                    borderColor: 'rgba(46, 204, 113, 1)',
                    backgroundColor: 'rgba(46, 204, 113, 0.2)',
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Heure'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Température (°C)'
                        }
                    }
                }
            }
        });
    }

    function createPrecipitationChart(data) {
        const ctx = document.getElementById('precipitationChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.hours,
                datasets: [{
                    label: 'Précipitations (%)',
                    data: data.precipitation,
                    borderColor: 'rgba(52, 152, 219, 1)',
                    backgroundColor: 'rgba(52, 152, 219, 0.5)',
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Heure'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Précipitations (%)'
                        }
                    }
                }
            }
        });
    }

    function createMonthlyChart() {
        const ctx = document.getElementById('monthlyChart').getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Jours ensoleillés/nuageux', 'Jours de pluie ou de neige'],
                datasets: [{
                    data: [25, 6],
                    backgroundColor: ['#e67e22', '#3498db']
                }]
            },
            options: {
                responsive: true
            }
        });
    }

    function createLiquidGauge(percentage) {
        var gauge = d3.select("#liquidGauge")
            .append("svg")
            .attr("width", "90%")
            .attr("height", "90%")
            .attr("viewBox", "0 0 200 200");

        var config = liquidFillGaugeDefaultSettings();
        config.circleThickness = 0.05;
        config.circleFillGap = 0.05;
        config.circleColor = "#8e44ad";
        config.waveColor = "rgba(255, 87, 136, 0.5)";
        config.waveHeight = 0.05;
        config.waveAnimateTime = 1000;
        config.waveOffset = 0.25;
        config.textSize = 1;
        config.waveCount = 2;
        config.textVertPosition = 0.5;
        config.textColor = "#ecf0f1";
        config.waveTextColor = "#ecf0f1";

        loadLiquidFillGauge("liquidGauge", percentage, config);
    }

    function updateWeatherInfo(data) {
        document.getElementById('dayForecast').setAttribute('data-text', "Attendez-vous à un ciel partiellement ensoleillé. La température maximale sera de " + Math.max(...data.temperatures) + "°C.");
        document.getElementById('nightForecast').setAttribute('data-text', "Le ciel sera partiellement nuageux. La température minimale sera de " + Math.min(...data.temperatures) + "°C.");
        document.getElementById('umbrella').setAttribute('data-text', "Inutile");
        document.getElementById('outdoor').setAttribute('data-text', "Très météo-dépendant");
        document.getElementById('clothes').setAttribute('data-text', "Veste légère recommandée");
        document.getElementById('coldWind').setAttribute('data-text', "Sans danger");
    }

    function updateIndicators(data) {
        const highestTemperature = Math.max(...data.temperatures);
        const averageTemperature = (data.temperatures.reduce((a, b) => a + b, 0) / data.temperatures.length).toFixed(2);

        // Find the most frequent weather condition
        const weatherConditions = data.conditions;
        const frequency = {};
        let maxFreq = 0;
        let mostFrequentWeather = '';

        weatherConditions.forEach(condition => {
            frequency[condition] = (frequency[condition] || 0) + 1;
            if (frequency[condition] > maxFreq) {
                maxFreq = frequency[condition];
                mostFrequentWeather = condition;
            }
        });

        document.getElementById('highestTemperature').innerText = highestTemperature + '°C';
        document.getElementById('mostFrequentWeather').innerText = mostFrequentWeather;
        document.getElementById('averageTemperature').innerText = averageTemperature + '°C';
    }

    // Initialize Sortable
    var sortableContainers = document.querySelectorAll('.sortable');
    sortableContainers.forEach(function(container) {
        new Sortable(container, {
            animation: 150,
            ghostClass: 'sortable-ghost'
        });
    });
});