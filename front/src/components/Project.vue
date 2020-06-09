<template>
  <div class="project">

    <div class="flex-row flex-between">
      <p class="flex-auto"> {{ project.name }} </p>
      <button @click="toggleOpt">:</button>
    </div>

    <transition name="drop">
      <div v-if="showOpt">
        <MenuRowOptSlide
          :show="showRow">

          <div slot="0" class="flex-row flex-between test1">
            <button @click="showNew">New</button>
            <button @click="showEdit">Edit</button>
            <button @click="showDelete">Delete</button>
            <button @click="showSelect">Select</button>
          </div>

          <ProjectCreate slot="1" class="test2" @close="closeRows"/>

          <ProjectRename slot="2" class="test3" @close="closeRows"/>

          <ProjectDelete slot="3" class="test4" @close="closeRows"/>

<!--          <ProjectSelect slot="4" class="test1" @close="closeRows"/>-->

        </MenuRowOptSlide>
      </div>
    </transition>

  </div>
</template>

<script>
import helpers from '../services/Helpers'
import general from '../constants/general'

import ProjectCreate from './ProjectCreate'
import ProjectRename from './ProjectRename'
import ProjectDelete from './ProjectDelete'
// import ProjectSelect from './ProjectSelect'
import MenuRowOptSlide from './MenuRowOptSlide'

const defaultRows = () => [false, false, false, false, false]

export default {
  name: 'Project',
  components: {
    ProjectCreate,
    ProjectRename,
    ProjectDelete,
    // ProjectSelect,
    MenuRowOptSlide
  },
  data () {
    return {
      showOpt: false,
      showRow: defaultRows()
    }
  },
  computed: {
    project: function () {
      return this.$store.getters['projects/current']
    },
    user: function () {
      return this.$store.getters['user/user']
    }
  },
  mounted () {
    this.getProjects()
    helpers.timeDelay(() => {
      this.$root.$emit('PROJECT-CHANGE')
    }, general.DELAY_SHORT)
  },
  methods: {
    toggleOpt: function () {
      this.showOpt = !this.showOpt
      if (this.showOpt) {
        this.openRow(0)
        return
      }

      this.closeRows()
    },
    closeRows: function () {
      this.showRow.forEach((item, idx) => {
        this.closeRow(idx)
      })
      if (this.showOpt) {
        this.showOpt = false
      }
    },
    showNew: function () {
      this.closeRow(0)
      this.openRow(1)
    },
    showEdit: function () {
      this.closeRow(0)
      this.openRow(2)
    },
    showDelete: function () {
      this.closeRow(0)
      this.openRow(3)
    },
    showSelect: function () {
      this.closeRow(0)
      this.openRow(4)
    },
    toggleRow: function (row) {
      this.showRow.splice(row, 1, !this.showRow[row])
    },
    openRow: function (row) {
      this.showRow.splice(row, 1, true)
    },
    closeRow: function (row) {
      this.showRow.splice(row, 1, false)
    },
    getProjects: function () {
      const userParam = { user: this.user.id }
      this.$store.dispatch('projects/getProjectsByUserId', userParam)
      // todo if no projects, create one via server!!
    }
  }
}
</script>
