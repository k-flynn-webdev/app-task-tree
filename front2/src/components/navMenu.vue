<template>

  <div class="navbar__options">

    <b-button class="navbar__options-close is-transparent"
              @click="onClose">
      <icClose class="is-medium" />
    </b-button>

    <div class="option">
        <p class="title">User</p>

        <b-field>
          <div v-if="isLoggedIn">
            <btnLogout />
          </div>
          <div v-else>
            <b-button class="mb-2"
                      expanded
                      type="is-primary"
                      tag="router-link"
                      :to="{ name: 'create' }">
              Sign up
            </b-button>
            <b-button class="mb-2"
                      expanded
                      tag="router-link"
                      :to="{ name: 'login' }">
              Login
            </b-button>
          </div>
        </b-field>
      </div>

    <div class="option">
      <p class="title">Sort</p>

      <b-field label="Direction">
        <div class="block p-0">
          <b-radio v-for="(item, idx) in appVars.sort.direction"
                   name="sortOrder"
                   v-model="sortDirection"
                   :native-value="item.value">
            {{ item.name }}
          </b-radio>

        </div>
      </b-field>

      <b-field label="Sort by">
        <div class="is-flex start column p-0">
          <b-radio v-for="(item, idx) in appVars.sort.types"
                   name="sortType"
                   v-model="sortType"
                   class="mb-2"
                   :native-value="item.value">
            {{ item.name }}
          </b-radio>

        </div>
      </b-field>

    </div>

  </div>

</template>

<script>
import { mapState } from 'vuex'
import icClose from '../assets/icons/ic_cross'
import btnLogout from '../components/btnLogout'
// import navSortBy from '../components/navSortBy'
import { APP_VARS } from '../constants'

export default {
  name: 'navMenu',

  // data () {
  //   return {
  //     // sortOrder: null,
  //     // sortType: null
  //   }
  // },

  components: {
    icClose,
    btnLogout,
    // navSortBy
  },

  computed: {
    appVars() { return APP_VARS },
    sortType: {
      get () { return this.$store.state.sort.type },
      set (value) { this.$store.commit('setSortType', value) },
    },
    sortDirection: {
      get () { return this.$store.state.sort.direction },
      set (value) { this.$store.commit('setSortDirection', value) },
    },
    ...mapState('user',
        ['isLoggedIn', 'user']
    ),
  },

  methods: {
    onClose () {
      this.$emit('close')
    }
  }

}
</script>
