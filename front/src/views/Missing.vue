<template>

  <div>

    <router-link to="/"
                 title="Home"
                 class="user__home text-bold fill-fore">
      <icBack class="md" />
    </router-link>

    <div class="missing">

      <Card class="max-30">

        <div slot="default">

          <p class="title">
            Missing Page
          </p>

          <div class="text-center">

            <p> The page your looking for is missing. </p>
            <router-link to="/"
                         title="Home">
              <p class="text-bold no-margin">Home</p>
              <icUserAnon class="xl fill-fore margin" />

            </router-link>

          </div>

        </div>

      </Card>

    </div>
  </div>

</template>

<script>
import icBack from '../assets/icons/ic_left'
import Card from '../components/general/Card'
import icUserAnon from '../assets/icons/ic_user_anon'

export default {
  name: 'Missing',
  components: {
    Card,
    icBack,
    icUserAnon
  }
}
</script>
