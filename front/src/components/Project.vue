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

        </MenuRowOptSlide>
      </div>
    </transition>

<!--    <div class="flex-row">-->

<!--    </div>-->

<!--    <div @click="showOpt = !showOpt">-->
<!--      <p> {{ project.name }} </p>-->
<!--    </div>-->

<!--    <ProjectInput v-if="showOpt" @close="showOpt = false"/>-->
<!--    <ProjectSelect v-if="showOpt" />-->

  </div>
</template>

<script>
import ProjectCreate from './ProjectCreate'
import ProjectRename from './ProjectRename'
// import ProjectSelect from './ProjectSelect'
import MenuRowOptSlide from './MenuRowOptSlide'

const DELAY = 400

export default {
  name: 'Project',
  components: {
    ProjectCreate,
    ProjectRename,
    // ProjectSelect
    MenuRowOptSlide
  },
  data () {
    return {
      showOpt: false,
      showRow: [false, false, false, false]
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
    return this.getProjects()
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
    },
    // toggleOpt: function () {
    //   for (let i = 0; i < this.showRow.length; i++) {
    //     if (this.showRow[i]) {
    //       this.closeRows()
    //       return
    //     }
    //   }
    //
    //   this.toggleRow(0)
    // },
    showNew: function () {
      this.closeRow(0)
      this.openRow(1)
    },
    showEdit: function () {
      this.closeRow(0)
      this.openRow(2)
    },
    showSelect: function () {
      this.closeRows()
      this.openRowDelayed(3)
    },
    showDelete: function () {
      this.closeRows()
      this.openRowDelayed(4)
    },
    toggleRow: function (row) {
      this.showRow.splice(row, 1, !this.showRow[row])
    },
    openRow: function (row) {
      this.showRow.splice(row, 1, true)
    },
    openRowDelayed: function (row) {
      const self = this
      setTimeout(function () {
        self.openRow(row)
      }, DELAY)
    },
    closeRow: function (row) {
      this.showRow.splice(row, 1, false)
    },
    getProjects: function () {
      const userParam = { user: this.user.id }
      return this.$store.dispatch('projects/getProjectsByUserId', userParam)
    }
  }
}
</script>
