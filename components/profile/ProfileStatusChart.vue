<script>
import { Doughnut, Bar } from "vue-chartjs";
import Chart from "chart.js";

export default {
    extends: Bar,
    data: () => ({
        chartdata: {
        labels: ["Posts", "Comments", "Likes"],
        datasets: [
                    {
                        label: "Profile Status",
                        backgroundColor: ["#303F9F", "#00838F", "#D32F2F"],
                        data: [150, 121, 140]
                    }
                ]
            },
        options: {
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    barThickness : 12,
                }],
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true,
                        steps: 10,
                        stepValue: 5,
                        max: 160,
                        display: false
                    }
                }]
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }),
    mounted() {
        this.renderChart(this.chartdata, this.options);
    },
}
</script>

<style scoped>

</style>