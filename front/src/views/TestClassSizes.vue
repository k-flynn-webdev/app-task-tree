<template>
  <div class="">

    <div>
      testing text
      <p class="sm">small</p>
      <p>normal</p>
      <p class="md">med</p>
      <p class="lg">large</p>
      <p class="xl">extra large</p>
    </div>

    <div>
      testing icons
      <icAdd class="sm" />
      <icAdd />
      <icAdd class="md" />
      <icAdd class="lg" />
      <icAdd class="xl" />
    </div>

    <div class="relative" style="height: 10rem;">
      testing icons widths
      <icAdd class="icon-10" />
      <icAdd class="icon-20" />
      <icAdd class="icon-30" />
      <icAdd class="icon-40" />
      <icAdd class="icon-50" />
      <icAdd class="icon-60" />
      <icAdd class="icon-70" />
      <icAdd class="icon-80" />
      <icAdd class="icon-90" />
      <icAdd class="icon-100" />
      <icAdd />
    </div>

  </div>
</template>

<script>
import icAdd from './assets/icons/ic_add'

export default {
  name: 'Home',
  components: {
    icAdd
  }
}
</script>
