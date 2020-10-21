<script>
import { Doughnut } from "vue-chartjs";
import Chart from "chart.js";

export default {
    extends: Doughnut,
    data: () => ({
        chartdata: {
        labels: ["Posts", "Comments", "Likes"],
        datasets: [
                    {
                    label: "Profile Status",
                    backgroundColor: ["#FB8C00", "#1DE9B6", "#E53935"],
                    data: [200, 121, 30]
                    }
                ]
            },
        options: {
            legend: {
            display: false
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