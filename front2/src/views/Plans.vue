<template>
  <section class="container mx-1">

    <div class="columns is-centered flex-wrap">
      <row-create :type="type" />

      <row-item v-for="item in pageItems"
                :key="item.id"
                :item="item"
                :type="type"
                :class="{ 'is-active': pageCurrentItem.id === item.id }"
                @reload="getPageItems"
      />
    </div>

  </section>
</template>

<script>
import rowCreate from '../components/rowCreate'
import rowItem from '../components/rowItem'
import pagesMixin from '../mixins/Pages'

export default {
  name: 'Plans',

  mixins: [pagesMixin],

  components: {
    rowItem,
    rowCreate,
  },

  data () {
    return {
      isLoading: false
    }
  },

  props: {
    type: {
      type: String,
      default: ''
    }
  }
}
</script>

