<template>
   <layout-public>
      <router-view />
   </layout-public>
</template>

<script>


import LayoutPublic from '@core/layouts/layout-public/LayoutPublic.vue';

export default {
   components: {
      LayoutPublic,
   },
}
</script>
