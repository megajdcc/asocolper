<template>
  <p class="clearfix mb-0">
    <span class="float-md-left d-block d-md-inline-block mt-25">
      COPYRIGHT  © {{ new Date().getFullYear() }}
      <b-link
        class="ml-25"
        :to="{name:'inicio'}"
      >Villamizar & Jarava</b-link>
      <span class="d-none d-sm-inline-block">, Todos los derechos reservados</span>
    </span>

    <span class="float-md-right d-none d-md-block">Hecho a mano &amp; con amor
      <feather-icon
        icon="HeartIcon"
        size="21"
        class="text-danger stroke-current"
      />
    </span>
  </p>
</template>

<script>
import { BLink } from 'bootstrap-vue'

export default {
  components: {
    BLink,
  },
}
</script>
