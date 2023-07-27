<script setup lang="ts">
import PassengerCard from '../components/PassengerCard.vue'

import type { PassengerItem } from '@/passenger';
import PassengerService from '@/services/PassengerService';
import { ref } from 'vue'
import { Ref } from 'vue'
import { watchEffect,computed } from 'vue'
import type { AxiosResponse } from 'axios'


const passengers: Ref<Array<PassengerItem>> = ref([])

const totalEvent = ref<number>(0)
const perPage = ref<number>(2)
const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})

// PassengerService.getPassenger(2, props.page).then((response: AxiosResponse<PassengerItem[]>) => {
//   passengers.value = response.data
//   console.log(passengers.value)
// })

watchEffect(()=>{
  PassengerService.getPassenger(2,props.page).then((response: AxiosResponse<PassengerItem[]>)=>{
    passengers.value = response.data
    totalEvent.value = response.headers['x-total-count']
  })
})

const hasNextPage = computed(()=>{
  // first calculate the total page
  const totalPages = Math.ceil(totalEvent.value / perPage.value)
  return props.page.valueOf() < totalPages
})

</script>

<template>
  <main class="events">
    <PassengerCard v-for="passenger in passengers" :key="passenger.id" :passenger="passenger"></PassengerCard>

  <div class="pagination">
    <RouterLink :to="{ name: 'passenger', query: { page: page - 1} }" rel="prev" v-if="page!=1" id="page-prev">
      Prev Page
    </RouterLink>

    <RouterLink :to="{ name: 'passenger', query: { page: page + 1} }" rel="next" v-if="hasNextPage" id="page-next">
      Next Page
    </RouterLink>
  </div>
  </main>
</template>

<style scoped>
.events{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  width: 290px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
#page-prev{
  text-align: left;
}

#page-next{
  text-align: right;
}

</style>

