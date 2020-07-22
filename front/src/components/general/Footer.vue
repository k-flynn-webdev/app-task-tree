<template>

  <div ref="parent">

    <div ref="footer" class="task__footer">

      <div class="task__footer__content">
        Made with
        <svg
          class="icon"
          viewBox="0 0 907 828">
          <path d="M730.084,312.85c4.226,113.133 -40.828,236.381 -79.883,320.702c-29.137,63.033 -92.165,103.467 -161.607,103.675c-58.148,0.184 -129.832,0.398 -188.066,0.573c-68.886,0.206 -131.752,-39.215 -161.569,-101.314c-43.597,-90.793 -96.522,-224.663 -88.059,-325.713"/>
          <path d="M710,410.13l137.329,0c0,0 27.947,188.444 -226.001,233.406"/>
        </svg>
        by
        <a class=""
           rel="noreferrer"
           target="_blank"
           href="https://github.com/k-flynn-webdev">
          k-flynn-webdev
        </a>

        <small class="task__footer__content-version">
          ver {{ version }}
        </small>
      </div>

    </div>

  </div>

</template>

<script>

export default {
  name: 'Footer',
  computed: {
    version: function () {
      return process.env.VUE_APP_VERSION || '0.0.0'
    }
  },
  mounted () {
    document.body.appendChild(this.$refs.footer)
  },
  beforeDestroy () {
    document.body.removeChild(this.$refs.footer)
    this.$refs.parent.appendChild(this.$refs.footer)
  }
}
</script>
