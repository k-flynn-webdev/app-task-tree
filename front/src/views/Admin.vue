<template>
  <section class="container">

    <div class="columns is-centered">

      <div class="column is-8 has-text-left">

        <div class="box">

          <p class="is-size-4 has-text-centered has-text-weight-bold">
            Admin
          </p>

          <b-tabs
              v-model="tab"
              type="is-toggle"
              expanded>
            <b-tab-item :label="usersLabel"
                        :value="tabs[0]">

              <div class="is-flex flex-space-between mb-2">
                <span>Selected id: {{ users.selected ? users.selected.id : 'none' }}</span>

                <label>
                  JSON:
                  <input type="text"
                         v-model="users.query"
                         @change="getUsers">
                </label>

                <div class="buttons">
                  <b-button size="is-small" :disabled="!users.selected">
                    Edit
                  </b-button>
                </div>
              </div>

              <b-table
                  striped
                  scrollable
                  :data="users.data"
                  :columns="users.columns"
                  :selected.sync="users.selected"
              />

            </b-tab-item>
            <b-tab-item :label="projectsLabel"
                        :value="tabs[1]"></b-tab-item>
            <b-tab-item :label="plansLabel"
                        :value="tabs[2]"></b-tab-item>
            <b-tab-item :label="tasksLabel"
                        :value="tabs[3]"></b-tab-item>
          </b-tabs>

        </div>

      </div>
    </div>

  </section>
</template>

<script>
import userEdit from '../components/admin/userEdit'
import { ADMIN, PROJECT, PLAN, TASK } from '../constants'
import HTTP from '../services/HttpService'
import { get } from 'lodash-es'

export default {
  name: 'Admin',

  components: {
    userEdit
  },

  data () {
    return {
      tab: undefined,
      tabs: ['users', 'projects', 'plans', 'tasks'],
      totals: {
        projects: 0,
        plans: 0,
        tasks: 0,
        users: 0
      },
      users: {
        loading: false,
        query: '',
        selected: null,
        data: [],
        columns: [
          { field: 'id', label: 'ID' },
          { field: 'role', label: 'Role' },
          { field: 'email', label: 'Email' },
          { field: 'login_at', label: 'Login' },
          { field: 'created_at', label: 'Created' },
          { field: 'updated_at', label: 'Updated' },
        ]
      }
    }
  },

  computed: {
    projectsLabel () {
      return `Projects (${this.totals.projects})`
    },
    plansLabel () {
      return `Plans (${this.totals.plans})`
    },
    tasksLabel () {
      return `Tasks (${this.totals.tasks})`
    },
    usersLabel () {
      return `Users (${this.totals.users})`
    },
  },

  watch: {
    'tab': {
      handler: 'getItems',
      immediate: true
    }
  },

  created () {
    return this.getTotals()
  },

  methods: {
    getItems () {
      if (this.tab === this.tabs[0] || !this.tab) {
        return this.getUsers()
      }
    },
    getTotals () {
      const USER = { API: { GET: '/api/users' }, text: 'users' }
      const query = { params: { $limit: 0, showAll: true } }
      ;[PROJECT, PLAN, TASK, USER].forEach(item => {
        return HTTP.get(item.API.GET, query)
        .then(({ data }) => {
          this.totals[item.text] = data.total
        })
      })
    },
    getUsers () {
      if (this.users.loading) return

      const USER = { API: { GET: '/api/users' }, text: 'users' }
      const query = { params: { $limit: 20, showAll: true } }

      if (this.users.query.toString().length > 0) {
        query.params = Object.assign(query.params, JSON.parse(this.users.query))
      }

      this.users.loading = true

      return HTTP.get(USER.API.GET, query)
      .then(({ data }) => {
        this.users.data = data.data.reduce((acc, current) => {
          current.login_at = this.$options.filters.itemLogin(current, true,true,true)
          current.created_at = this.$options.filters.itemDate(current, true,true,true)
          current.updated_at = this.$options.filters.itemUpdate(current, true,true,true)

          acc.push(current)

          return acc
        }, [])
        this.users.loading = false
      })
      .finally(() => this.users.loading = false)
    }
  }
}
</script>

