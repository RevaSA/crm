import Paginate from 'vuejs-paginate';
import { chunk } from 'lodash';

export default {
    data() {
        return {
            page: Math.max(Number(this.$route.query.page), 1) || 1,
            pageSize: 5,
            pageCount: 0,
            allItems: [],
            items: [],
        };
    },
    methods: {
        setupPagination(allItems) {
            this.allItems = chunk(allItems, this.pageSize);
            this.pageCount = this.allItems.length;
            this.items = this.allItems[this.page - 1];
        },
        pageChangeHandler(page) {
            this.$router.push({ query: { page } });
            this.items = this.allItems[page - 1];
        },
    },
    components: { Paginate },
};
