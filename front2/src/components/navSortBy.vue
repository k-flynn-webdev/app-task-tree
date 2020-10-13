<template>
  <div>

<!--    <span>Sort direction</span>-->
<!--    <b-switch v-model="sortDirection"-->
<!--              :true-value="sort.direction[0]"-->
<!--              :false-value="sort.direction[1]">-->
<!--      {{ sortDirection }}-->
<!--    </b-switch>-->

<!--    <br>-->

<!--    <span>Sort by</span>-->

<!--    <b-radio v-for="(item,idx) in sort.types"-->
<!--             :key="idx"-->
<!--             native-value="item">-->
<!--      {{ item }}-->
<!--    </b-radio>-->

  </div>
<!--  <b-button class="flex-grow is-size-7-tablet has-text-weight-bold"-->
<!--    :loading="isLoading"-->
<!--    @click="submitForm">-->
<!--    Logout-->
<!--  </b-button>-->
</template>

<script>
import { APP_VARS } from '../constants'
// import HTTP from '../services/HttpService'
// import { get } from 'lodash-es'

export default {
  name: 'navSortBy',

  data () {
    return {
      sort: APP_VARS.sort
    }
  },

  computed: {
    sortDirection: {
      get () {
        return this.$store.state.sortBY
      },
      set (input) {
        this.$store.commit('setSortBy', input)
      }
    }
    // sortBy () {
    //   return this.$store.state.sortBY
    // }
  },

  methods: {
  }
}
</script>

