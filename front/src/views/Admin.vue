<template>

  <div>

    <crud-modal :is-open="isOpen"
                :api="itemAPI"
                :fields="itemFields"
                :item="itemSelected"
              @close="isOpen = false" />

    <section class="container">

      <div class="columns is-centered">

        <div class="column is-12 has-text-left">

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
                  <span>Selected id:
                    {{ users.selected ? users.selected.id : 'none' }}
                  </span>

                  <label>
                    JSON:
                    <input type="text"
                           v-model="users.query"
                           @change="getItems">
                  </label>

                  <div class="buttons">
                    <b-button size="is-small"
                              :disabled="!users.selected"
                              @click="isOpen = !isOpen">
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
                          :value="tabs[1]"
                          @click="isOpen = !isOpen">

                <div class="is-flex flex-space-between mb-2">
                  <span>Selected id:
                    {{ projects.selected ? projects.selected.id : 'none' }}
                  </span>

                  <label>
                    JSON:
                    <input type="text"
                           v-model="projects.query"
                           @change="getItems">
                  </label>

                  <div class="buttons">
                    <b-button size="is-small"
                              :disabled="!projects.selected"
                              @click="isOpen = !isOpen">
                      Edit
                    </b-button>
                  </div>
                </div>

                <b-table
                    striped
                    scrollable
                    :data="projects.data"
                    :columns="projects.columns"
                    :selected.sync="projects.selected"
                />

              </b-tab-item>
              <b-tab-item :label="plansLabel"
                          :value="tabs[2]"
                          @click="isOpen = !isOpen">

                <div class="is-flex flex-space-between mb-2">
                  <span>Selected id:
                    {{ plans.selected ? plans.selected.id : 'none' }}
                  </span>

                  <label>
                    JSON:
                    <input type="text"
                           v-model="plans.query"
                           @change="getItems">
                  </label>

                  <div class="buttons">
                    <b-button size="is-small"
                              :disabled="!plans.selected"
                              @click="isOpen = !isOpen">
                      Edit
                    </b-button>
                  </div>
                </div>

                <b-table
                    striped
                    scrollable
                    :data="plans.data"
                    :columns="plans.columns"
                    :selected.sync="plans.selected"
                />

              </b-tab-item>
              <b-tab-item :label="tasksLabel"
                          :value="tabs[3]"
                          @click="isOpen = !isOpen">

                <div class="is-flex flex-space-between mb-2">
                  <span>Selected id:
                    {{ tasks.selected ? tasks.selected.id : 'none' }}
                  </span>

                  <label>
                    JSON:
                    <input type="text"
                           v-model="tasks.query"
                           @change="getItems">
                  </label>

                  <div class="buttons">
                    <b-button size="is-small"
                              :disabled="!tasks.selected"
                              @click="isOpen = !isOpen">
                      Edit
                    </b-button>
                  </div>
                </div>

                <b-table
                    striped
                    scrollable
                    :data="tasks.data"
                    :columns="tasks.columns"
                    :selected.sync="tasks.selected"
                />

              </b-tab-item>
            </b-tabs>

            <b-pagination
                v-model="pageCurrent"
                simple
                :total="pageTotals"
                :per-page="perPage"
            >
              <b-button slot="previous"
                        class="previous"
                        :disabled="pageCurrent <= 1"
                        @click="pageCurrent = pageCurrent - 1">
                <
              </b-button>
              <b-button slot="next"
                        class="mr-4 next"
                        :disabled="pageCurrent > pageMax"
                        @click="pageCurrent = pageCurrent + 1">
                >
              </b-button>
            </b-pagination>

          </div>

        </div>
      </div>

    </section>

  </div>
</template>

<script>
import crudModal from '../components/admin/crudModal'
import { ADMIN, PROJECT, PLAN, TASK } from '../constants'
const USER = {
  API: {
    GET: '/api/users',
    PATCH: '/api/users',
    DELETE: '/api/users'
  },
  text: 'users'
}

const ALL = {
  PROJECT,
  PLAN,
  TASK,
  USER
}

import HTTP from '../services/HttpService'
import { get } from 'lodash-es'

export default {
  name: 'Admin',

  components: {
    crudModal
  },

  data () {
    return {
      tab: 'users',
      tabs: ['users', 'projects', 'plans', 'tasks'],
      perPage: 20,
      skip: 0,
      isOpen: false,
      totals: {
        projects: 0,
        plans: 0,
        tasks: 0,
        users: 0
      },
      projects: {
        loading: false,
        query: '',
        page: 1,
        total: 0,
        data: [],
        columns: [
          { field: 'id', label: 'ID' },
          { field: 'owner', label: 'Owner' },
          { field: 'progress', label: 'Progress' },
          { field: 'total', label: 'Total' },
          { field: 'is_done', label: 'isDone' },
          { field: 'done_at', label: 'Done' },
          { field: 'created_at', label: 'Created' },
          { field: 'updated_at', label: 'Updated' },
          { field: 'value', label: 'Value' },
        ]
      },
      plans: {
        loading: false,
        query: '',
        page: 1,
        total: 0,
        data: [],
        columns: [
          { field: 'id', label: 'ID' },
          { field: 'owner', label: 'Owner' },
          { field: 'project', label: 'Project' },
          { field: 'progress', label: 'Progress' },
          { field: 'total', label: 'Total' },
          { field: 'is_done', label: 'isDone' },
          { field: 'done_at', label: 'Done' },
          { field: 'created_at', label: 'Created' },
          { field: 'updated_at', label: 'Updated' },
          { field: 'value', label: 'Value' },
        ]
      },
      tasks: {
        loading: false,
        query: '',
        page: 1,
        total: 0,
        data: [],
        columns: [
          { field: 'id', label: 'ID' },
          { field: 'owner', label: 'Owner' },
          { field: 'project', label: 'Project' },
          { field: 'plan', label: 'Plan' },
          { field: 'progress', label: 'Progress' },
          { field: 'total', label: 'Total' },
          { field: 'is_done', label: 'isDone' },
          { field: 'done_at', label: 'Done' },
          { field: 'created_at', label: 'Created' },
          { field: 'updated_at', label: 'Updated' },
          { field: 'value', label: 'Value' },
        ]
      },
      users: {
        loading: false,
        query: '',
        page: 1,
        total: 0,
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
    itemAPI () {
      return Object.values(ALL).filter(item => item.text === this.tab)[0].API
    },
    itemFields () {
      return this[this.tab].columns
    },
    itemSelected () {
      return this[this.tab].selected
    },
    pageTotals () {
      return this[this.tab].total
    },
    pageCurrent: {
      get: function () {
        return this[this.tab].page
      },
      set: function (value) {
        this[this.tab].page = value
      }
    },
    pageMax () {
      return Math.floor(this[this.tab].total / this.perPage)
    },
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
      handler: function () {
        this.skip = 0
        this.pageCurrent = 1
        return this.getItems()
      },
      immediate: true
    },
    pageCurrent () {
      return this.getItems()
    }
  },

  created () {
    return this.getTotals()
  },

  methods: {
    getItems () {
      if (this.tab === this.tabs[1]) {
        return this.getWrapper(PROJECT)
      }
      if (this.tab === this.tabs[2]) {
        return this.getWrapper(PLAN)
      }
      if (this.tab === this.tabs[3]) {
        return this.getWrapper(TASK)
      }

      return this.getWrapper(USER)
    },
    getTotals () {
      const query = { params: { $limit: 0, showAll: true } }
      ;[PROJECT, PLAN, TASK, USER].forEach(item => {
        return HTTP.get(item.API.GET, query)
        .then(({ data }) => {
          this.totals[item.text] = data.total
        })
      })
    },
    /**
     * A simple wrapper to do the API call and update local data for a [type]
     *
     * @param {Object} type     Type obj containing API and value
     * @return {Promise<boolean>|void}
     */
    getWrapper (type) {
      if (this[type.text].loading) return

      const query = {
        params: {
          $limit: 20,
          $skip: (this.pageCurrent - 1) * this.perPage,
          showAll: true
        }
      }

      if (this[type.text].query.toString().length > 0) {
        query.params = Object.assign(query.params, JSON.parse(this[type.text].query))
      }

      this[type.text].loading = true

      return HTTP.get(type.API.GET, query)
      .then(({ data }) => {
        this[this.tab].total = data.total

        this[type.text].data = data.data.reduce((acc, current) => {
          if (current.login_at) {
            current.login_at = this.$options.filters.itemLogin(current, true,true,true)
          }
          if (current.created_at) {
            current.created_at = this.$options.filters.itemDate(current, true,true,true)
          }
          if (current.updated_at) {
            current.updated_at = this.$options.filters.itemUpdate(current, true,true,true)
          }
          if (current.done_at) {
            current.done_at = this.$options.filters.itemDone(current, true,true,true)
          }
          acc.push(current)

          return acc
        }, [])
      })
      .finally(() => this[type.text].loading = false)
    }
  }
}
</script>

