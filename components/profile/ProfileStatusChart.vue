<script>
import { Doughnut, Bar } from "vue-chartjs";
import Chart from "chart.js";

export default {
    props: {
        postCount : {
            type: Number
        },
        commentCount : {
            type: Number
        },
        likeCount : {
            type: Number
        }
    },
    extends: Doughnut,
    data: () => ({
        chartdata: {
        datasets: [
                    {
                        label: "Profile Status",
                        backgroundColor: ["#303F9F", "#00796B", "#C62828"],
                    }
                ]
            },
        options: {
            cutoutPercentage: 80,
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
        this.chartdata.datasets[0].data = [this.postCount, this.commentCount, this.likeCount]
        this.renderChart(this.chartdata, this.options);
    },
}
</script>

<style scoped>

</style>