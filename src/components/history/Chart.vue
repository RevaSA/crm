<script>
    import { Pie } from 'vue-chartjs';

    export default {
        mixins: [Pie],
        props: {
            items: {
                type: Array,
                required: true,
            },
        },
        mounted() {
            this.renderChart({
                labels: this.items.map(({ label }) => label),
                datasets: [{
                    data: this.items.map(({ data }) => data),
                    borderWidth: 1,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                }],
            });
        },
    };
</script>
