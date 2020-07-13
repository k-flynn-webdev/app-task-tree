<template>
  <div class="card">

    <div class="card__content">
      <slot></slot>
    </div>

    <div class="card__footer flex-row flex-between">
      <slot name="footer"></slot>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Card'
}
</script>
