<template>
  <section class="container user">

    <div class="columns is-centered">

      <div class="column is-8 has-text-left">

        <div class="box">

          <p class="is-size-4 has-text-centered has-text-weight-bold">
            User
          </p>

          <form @submit.prevent="submitUser">

            <b-field label="Email">
              <b-input v-model="input.email"
                       type="email"
                       minLength="5"
                       :readonly="!isEdit"
                       @input="updateEmail">
              </b-input>
            </b-field>

            <b-field label="Password">
              <b-input v-model="input.password"
                       type="password"
                       minlength="8"
                       placeholder="********"
                       :readonly="!isEdit"
                       @input="updatePassword">
              </b-input>
            </b-field>

            <div class="columns is-mobile">
              <div class="column is-narrow">
                <p>Role:</p>
                <p>Created:</p>
                <p>Updated:</p>
                <p>Login:</p>
              </div>
              <div class="column">
                <p>{{ user.role }}</p>
                <p>{{ user | itemDate }}</p>
                <p>{{ user | itemUpdate }}</p>
                <p>{{ user | itemLogin }}</p>
              </div>
            </div>

            <br>

            <div class="columns is-gapless is-mobile is-vbottom">
              <div class="column">
                <b-button native-type="submit"
                          type="is-primary"
                          :disabled="!allowedEdit"
                          @click="onEdit">
                  Edit
                </b-button>
              </div>
              <div class="column is-narrow">
                <b-button native-type="submit"
                          type="is-primary"
                          :disabled="!hasChanges"
                          :loading="isLoading"
                          @click="submitUser">
                  Update
                </b-button>
              </div>
            </div>

          </form>

        </div>

        <div v-if="showResendVerify">
          <b-button class="resend-link"
                    @click="submitResendLink">
            Resend verify email
          </b-button>
        </div>

      </div>
    </div>

    <!--    <div class="columns is-centered">-->

<!--      <div class="column is-8 has-text-left">-->

<!--        <div class="box">-->

<!--          <p class="is-size-4 has-text-centered has-text-weight-bold">-->
<!--            User-->
<!--          </p>-->

<!--          <div> {{ user }}</div>-->

<!--          <form @submit.prevent="submitForm">-->

<!--            <b-field label="Email"-->
<!--                     :type="{ 'is-danger': email.errors.length > 0 }"-->
<!--                     :message="email.errors">-->
<!--              <b-input v-model="email.value"-->
<!--                       type="email"-->
<!--                       minLength="5"-->
<!--                       @input="inputUpdate">-->
<!--              </b-input>-->
<!--            </b-field>-->

<!--            <b-field label="Password"-->
<!--                     :type="{ 'is-danger': password.errors.length > 0 }"-->
<!--                     :message="password.errors">-->
<!--              <b-input type="password"-->
<!--                       minlength="8"-->
<!--                       v-model="password.value"-->
<!--                       @input="inputUpdate">-->
<!--              </b-input>-->
<!--            </b-field>-->

<!--            <div class="columns is-gapless is-mobile is-vbottom">-->

<!--              <div class="column">-->
<!--                <router-link :to="{ name: 'login' }" class="has-text-link">-->
<!--                  Login..-->
<!--                </router-link>-->
<!--              </div>-->

<!--              <div class="column is-narrow">-->
<!--                <b-button native-type="submit"-->
<!--                          type="is-primary"-->
<!--                          :disabled="isDisabled"-->
<!--                          :loading="isLoading"-->
<!--                          @click="submitForm">-->
<!--                  Create-->
<!--                </b-button>-->
<!--              </div>-->

<!--            </div>-->

<!--          </form>-->

<!--        </div>-->


<!--      </div>-->
<!--    </div>-->

  </section>
</template>

<script>
import HTTP from '../services/HttpService'
import { USER, VERIFY } from '../constants'
import { get } from 'lodash-es'
import { mapState } from 'vuex'

export default {
  name: 'User',

  data () {
    return {
      isEdit: false,
      isLoading: false,
      input : {
        email: '',
        password: ''
      }
    }
  },

  computed: {
    showResendVerify () {
      return !!(this.user.verify && this.user.role !== 'anon')
    },
    allowedEdit () {
      return !!(!this.user.verify && this.user.role !== 'anon')
    },
    emailAllowed () {
      return (this.input.email.length > 1 &&
          this.input.email !== this.user.email)
    },
    passwordAllowed () {
      return (this.input.password.length > 8)
    },
    hasChanges () {
      return (this.emailAllowed || this.passwordAllowed)
    },
    ...mapState( USER.store,
        { user: state => state.user })
  },

  created () {
    return this.getUser()
  },

  methods: {
    onEdit () {
      this.isEdit = !this.isEdit
      this.input.email = this.user.email
      this.input.password = ''
    },
    updateEmail (input) {
      this.input.email = input
    },
    updatePassword (input) {
      this.input.password = input
    },
    submitResendLink () {
      return HTTP.get(VERIFY.API.GET + '?email=' + this.user.email)
    },
    submitUser () {
      if (!this.isEdit) return
      if (!this.allowedEdit) return
      if (!this.hasChanges) return

    },
    getUser () {
      return this.$store.dispatch(`${USER.store}/get`)
      .then(() => {
        this.onEdit()
        this.isEdit = false
      })
      .catch(err => this.handleError(err))
    },
    // inputUpdate () {
    //   this.isDisabled = true
    //   if (this.email.value.length < 5) return
    //   if (this.password.value.length < 8) return
    //
    //   this.isDisabled = false
    // },
    // submitForm () {
    //   if (this.isDisabled) return
    //   if (this.isLoading) return
    //
    //   this.isLoading = true
    //
    //   return HTTP.post(USER.API.POST, {
    //     email: this.email.value,
    //     password: this.password.value
    //   })
    //   .then(res => {
    //     this.isLoading = false
    //
    //     this.$buefy.toast.open({
    //       duration: 1500,
    //       message: get(res, 'data.message', 'success'),
    //       position: 'is-top',
    //       type: 'is-success'
    //     })
    //
    //     // let self = this
    //     // setTimeout(function () {
    //     //   self.$router.push({ name: 'home' })
    //     // }, 1.5 * 1000)
    //   })
    //   .catch(err => this.handleError(err))
    // },
    handleError (err) {
      this.isLoading = false

      this.$buefy.toast.open({
        duration: 5000,
        message: get(err, 'response.data.message', 'error'),
        position: 'is-top',
        type: 'is-danger'
      })

      throw err
    }
  }
}
</script>

