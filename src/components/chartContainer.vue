<template>
    <div class="chart-container">
        <pie-chart :data="chartData" :options="chartOptions"></pie-chart>
    </div>
</template>

<script>
import PieChart from "./chart.vue";

export default {
    name: "PieChartContainer",
    components: {
        PieChart,
    },
    props: {
        taskItems: Array,
    },
    data: () => ({
        // loaded: false,
        chartOptions: {
            hoverBorderWidth: 20,
            title: {
                display: true,
                text: "Today's completed tasks",
            },
        },
    }),
    computed: {
        loaded() {
            return this.taskItems.length > 0;
        },
        chartData() {
            let chartObject = {};

            if (this.loaded) {
                // get all categories
                const currentCategories = this.taskItems.map((task) => {
                    return task.category;
                });

                const reducedCategoryList = [...new Set(currentCategories)];

                // Count completed points
                let pts = [];
                console.log(reducedCategoryList);
                reducedCategoryList.forEach((element) => {
                    let totalCount = 0;
                    let completedCount = 0;
                    this.taskItems.forEach((task) => {
                        if (task.category === element) {
                            totalCount++;
                            if (task.completed) {
                                completedCount++;
                            }
                        }
                    });
                    pts.push({
                        category: element,
                        total: totalCount,
                        incomplete: totalCount - completedCount,
                        completed: completedCount,
                    });
                });

                // Build Datasets
                let datasets = [];
                pts.forEach((taskSet) => {
                    console.log(taskSet);
                    const set = {
                        label: taskSet.category,
                        backgroundColor: ["#41B883", "#ced3e1"],
                        data: [taskSet.completed, taskSet.incomplete],
                    };
                    datasets.push(set);
                });

                if (datasets.length > 0) {
                    chartObject = {
                        hoverBackgroundColor: "red",
                        hoverBorderWidth: 10,
                        labels: ["Completed", "Incomplete"],
                        datasets: datasets,
                    };
                }
            }

            return chartObject;
        },
    },
    //   async mounted() {
    //     // try {

    //     // } catch (e) {
    //     //   console.error(e);
    //     // }
    //   },
};
</script>

<style lang="stylus">
.chart-container {
  // max-height: 100px
  margin: 0 auto;
  width: 200px;
}
</style>