<script setup lang="ts">
import type { Ref } from 'vue'
import { type PassengerItem } from '@/passenger'
import type{PropType} from 'vue'

defineProps({
    passenger: {
        type: Object as PropType<PassengerItem>,
            require: true
    }
})
</script>
<!-- gender: string
    ip_address: string
    Source: string
    Destination: string
    travelDate: string
    airlineId: number -->
<template>
    <div v-if="passenger">
        <p>Name :{{ passenger.first_name }}  {{ passenger.last_name }} </p> 
       <p> Email : {{ passenger.email }} </p> 
       <p> Gender : {{ passenger.gender }}</p> 
       <p> Address :  {{ passenger.ip_address }}</p> 
       <p> Source : {{ passenger.Source }} </p> 
       <p> Destination : {{ passenger.Destination }} </p> 
       <p> Date :  {{ passenger.travelDate }}</p> 
       <p> AirlineID : {{ passenger.airlineId }}</p> 
    </div>
</template>
