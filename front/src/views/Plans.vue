<template>
  <section class="container">
    <div class="columns is-centered flex-wrap">
      <row-create :type="type" @click="onEdit(-1)" />

      <row-item v-for="item in pageItems"
                :key="item.id"
                :item="item"
                :type="type"
                :edit="edit"
                :class="{ 'is-active': pageCurrentItem.id === item.id }"
                @onEdit="onEdit"
      />
      <page-controls :type="type"/>

      <div v-if="pageItems.length === 0"
           class="column is-8 is-12-mobile px-0 py-0 mb-2 row">

          <div class="is-flex start flex-grow has-text-light is-radius row__item has-border-transparent has-background-mid mx-1">
            <span class="pad has-border-transparent is-family-sans-serif word-break">
              No {{ type }}s found
            </span>
          </div>

      </div>

    </div>

  </section>
</template>

<script>
import rowCreate from '../components/rowCreate'
import rowItem from '../components/rowItem'
import pagesMixin from '../mixins/Pages'
import pageControls from '../components/pageControls'

export default {
  name: 'Plans',

  mixins: [pagesMixin],

  components: {
    rowItem,
    rowCreate,
    pageControls
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

