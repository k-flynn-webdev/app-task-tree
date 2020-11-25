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
            <b-tab-item :label="usersLabel">

              <b-table
                  :data="users.data"
                  :columns="users.columns"
                  focusable>
              </b-table>

<!--              <table style="width: 100%;">-->
<!--                <thead>-->
<!--                <tr>-->
<!--                  <td>ID</td>-->
<!--                  <td>Role</td>-->
<!--                  <td>Email</td>-->
<!--                  <td>Login_at</td>-->
<!--                  <td>Created_at</td>-->
<!--                  <td>Updated_at</td>-->
<!--                </tr>-->
<!--                </thead>-->
<!--                <tbody>-->
<!--                  <tr v-for="item in users"-->
<!--                      :key="item.id">-->
<!--                    <td>{{ item.id }}</td>-->
<!--                    <td>{{ item.role }}</td>-->
<!--                    <td>{{ item.email }}</td>-->
<!--                    <td>{{ item | itemLogin(true,true,true) }}</td>-->
<!--                    <td>{{ item | itemDate(true,true,true) }}</td>-->
<!--                    <td>{{ item | itemUpdate(true,true,true) }}</td>-->
<!--                  </tr>-->
<!--                </tbody>-->
<!--              </table>-->

<!--              <user-edit />-->

            </b-tab-item>
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
      totals: {
        projects: 0,
        plans: 0,
        tasks: 0,
        users: 0
      },
      users: {
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

  created () {
    return this.getUsers()
    .then(() => this.getTotals())
  },

  methods: {
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
      const USER = { API: { GET: '/api/users' }, text: 'users' }
      const query = { params: { $limit: 20, showAll: true } }
      return HTTP.get(USER.API.GET, query)
      .then(({ data }) => {
        this.users.data = data.data
      })
    }
  }
}
</script>

