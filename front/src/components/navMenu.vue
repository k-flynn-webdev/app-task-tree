<template>

  <div class="navbar__options">

    <b-button class="navbar__options-close is-transparent hover"
              @click="onClose">
      <icClose class="is-medium" />
    </b-button>

    <div class="option user">
        <p class="title">User</p>

        <div class="control">
          <template v-if="isLoggedIn">
            <b-button class="mb-2"
                      expanded
                      type="is-primary"
                      tag="router-link"
                      :to="{ name: 'user' }">
              {{ user.name }}
              <component :is="iconType" />
            </b-button>
            <btnLogout/>
          </template>
          <template v-else>
            <b-button class="mb-2"
                      expanded
                      type="is-primary"
                      tag="router-link"
                      :to="{ name: 'login' }">
              Login
              <component :is="iconType" />
            </b-button>

            <b-button class="mb-2"
                      expanded
                      tag="router-link"
                      :to="{ name: 'create' }">
              Sign up
            </b-button>
          </template>
        </div>
      </div>

    <div class="option sort" :class="{ 'disabled': !isLoggedIn }">
      <p class="title">Sort</p>

      <b-field v-if="isLoggedIn"
               label="Direction">
        <div class="block p-0">
          <b-radio v-for="(item, idx) in appVars.sort.direction"
                   name="sortOrder"
                   v-model="sortDirection"
                   :native-value="item.value">
            {{ item.name }}
          </b-radio>

        </div>
      </b-field>

      <b-field v-if="isLoggedIn"
               label="Sort by">
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

    <div v-if="isAdmin"
         class="option admin">

      <div class="control">
          <b-button class="mb-2"
                    expanded
                    type="is-primary"
                    tag="router-link"
                    :to="{ name: 'admin' }">
            Admin
          </b-button>
      </div>

    </div>

  </div>

</template>

<script>
import { mapState } from 'vuex'
import icUser from '../assets/icons/ic_user'
import icUserAnon from '../assets/icons/ic_user_anon'
import icUserNone from '../assets/icons/ic_user_none'
import icClose from '../assets/icons/ic_cross'
import btnLogout from '../components/btnLogout'
import { APP_VARS, USER, ADMIN } from '../constants'

export default {
  name: 'navMenu',

  components: {
    icUser,
    icUserAnon,
    icUserNone,
    icClose,
    btnLogout,
  },

  computed: {
    iconType () {
      if (!this.isLoggedIn) return icUserNone
      if (this.isAdmin) return icUserAnon
      if (this.isUser) return icUser
      if (this.isAnon) return icUserNone

      return null
    },
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
    isAdmin () {
      return this.user.role.indexOf(ADMIN.value) >= 0
    },
    isUser () {
      return this.user.role.indexOf(USER.value) >= 0
    },
    isAnon () {
      return this.user.role.indexOf('anon') >= 0
    }
  },

  methods: {
    /**
     * Emit close event
     */
    onClose () {
      this.$emit('close')
    }
  }

}
</script>
