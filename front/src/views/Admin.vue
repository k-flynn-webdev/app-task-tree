<template>
  <section class="container">

    <div class="columns is-centered">

      <div class="column is-8 has-text-left">

        <div class="box">

          <p class="is-size-4 has-text-centered has-text-weight-bold">
            Admin
          </p>

          <div>
            Projects: {{ totalProjects }}
          </div>
          <div>
            Plans: {{ totalPlans }}
          </div>
          <div>
            Tasks: {{ totalTasks }}
          </div>
          <div>
            Users: {{ totalUsers }}
          </div>
        </div>

      </div>
    </div>

  </section>
</template>

<script>
import { ADMIN, PROJECT, PLAN, TASK } from '../constants'
import HTTP from '../services/HttpService'
import { get } from 'lodash-es'

export default {
  name: 'Admin',

  data () {
    return {
      totals: {
        projects: 0,
        plans: 0,
        tasks: 0,
        users: 0
      }
    }
  },

  computed: {
    totalProjects () {
      return this.totals.projects
    },
    totalPlans () {
      return this.totals.plans
    },
    totalTasks () {
      return this.totals.tasks
    },
    totalUsers () {
      return this.totals.users
    },
  },

  created () {
    return this.getTotals()
  },

  methods: {
    getTotals () {
      const query = { params: { $limit: 0, showAll: true } }
      const USER = { API: { GET: '/api/users' }, text: 'users' }
      ;[PROJECT, PLAN, TASK, USER].forEach(item => {
        return HTTP.get(item.API.GET, query)
        .then(({ data }) => {
          this.totals[item.text] = data.total
        })
      })
    }
  }
}
</script>

