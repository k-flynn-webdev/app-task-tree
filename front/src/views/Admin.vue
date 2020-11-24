<template>
  <section class="container">

    <div class="columns is-centered">

      <div class="column is-8 has-text-left">

        <div class="box">

          <p class="is-size-4 has-text-centered has-text-weight-bold">
            Admin
          </p>

          <b-tabs
              type="is-toggle"
              expanded>
            <b-tab-item :label="usersLabel"></b-tab-item>
            <b-tab-item :label="projectsLabel"></b-tab-item>
            <b-tab-item :label="plansLabel"></b-tab-item>
            <b-tab-item :label="tasksLabel"></b-tab-item>
          </b-tabs>

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
      tab: null,
      totals: {
        projects: 0,
        plans: 0,
        tasks: 0,
        users: 0
      }
    }
  },

  computed: {
    projectsLabel () {
      return `Projects ${this.totals.projects}`
    },
    plansLabel () {
      return `Plans ${this.totals.plans}`
    },
    tasksLabel () {
      return `Tasks ${this.totals.tasks}`
    },
    usersLabel () {
      return `Users ${this.totals.users}`
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

