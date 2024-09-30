import React, { useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import * as d3 from 'd3';

function HomePage() {
  useEffect(() => {
    // Chart.js for Pie Chart
    const dataSource = {
      datasets: [
        {
          data: [],
          backgroundColor: [
            '#ffcd56', '#ff6384', '#36a2eb', '#fd6b19',
            '#84DCCF', '#3A1772', '#EFC7E5', '#CFEE9E', '#B97375'
          ]
        }
      ],
      labels: []
    };

    const createChart = () => {
      const ctx = document.getElementById('myChart').getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: dataSource
      });
    };

    const getBudget = () => {
      axios.get('/budget.json')
        .then((res) => {
          const budgetData = res.data.myBudget;
          budgetData.forEach((item) => {
            dataSource.datasets[0].data.push(item.budget);
            dataSource.labels.push(item.title);
          });
          createChart();
        })
        .catch(err => console.error(err));
    };

    // Fetch and create Chart.js chart
    getBudget();

    // D3.js for Pie Chart
    const createD3Chart = (data) => {
      const width = 200, height = 200, radius = Math.min(width, height) / 2;

      const svg = d3.select("#d3Chart")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      const pie = d3.pie().value((d) => d.budget);
      const arc = d3.arc().outerRadius(radius - 10).innerRadius(0);

      const color = d3.scaleOrdinal(d3.schemeCategory10);

      const g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");

      g.append("path")
        .attr("d", arc)
        .style("fill", (d) => color(d.data.title));

      g.append("text")
        .attr("transform", (d) => `translate(${arc.centroid(d)})`)
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .text((d) => d.data.title);
    };

    const fetchD3Data = () => {
      axios.get('/budget.json')
        .then((res) => {
          createD3Chart(res.data.myBudget);
        })
        .catch(err => console.error(err));
    };

    // Fetch and create D3.js chart
    fetchD3Data();

  }, []);

  return (
    <main className="center" id="main">
      <div className="page-area">
        <article>
          <h1>Stay on track</h1>
          <p>
            Do you know <em>where</em> you are spending your money? If you really stop to track it down,
            you would get surprised! Proper budget management depends on real data... and this
            app will help you with that!
          </p>
        </article>

        <article>
          <h1>Alerts</h1>
          <p>
            What if your clothing budget ended? You will get an alert. The goal is to <em>never</em> go over the budget.
          </p>
        </article>

        <article>
          <h1>Results</h1>
          <p>
            People who stick to a financial plan, budgeting every expense, get out of debt faster!
            Also, they live happier lives... since they expend without guilt or fear...
            because they know it is all good and accounted for.
          </p>
        </article>

        <article>
          <h1>Free</h1>
          <p>
            This app is <strong>free!!!</strong> And you are the only one holding your data!
          </p>
        </article>

        <article>
          <h1>Chart.js Pie Chart</h1>
          <canvas id="myChart" width="400" height="400"></canvas>
        </article>

        <article>
          <h1>D3.js Pie Chart</h1>
          <svg id="d3Chart"></svg>
        </article>
      </div>
    </main>
  );
}

export default HomePage;
