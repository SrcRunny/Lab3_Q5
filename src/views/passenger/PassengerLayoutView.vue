<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { type PassengerItem } from '@/passenger'
import { type AirlineItem } from '@/airline';
import PassengerService from '@/services/PassengerService';
import {useRouter} from 'vue-router';
const passenger = ref<PassengerItem| null> (null)
const airline = ref<AirlineItem| null> (null)
const props = defineProps({
    id: String
})

const router = useRouter()
    PassengerService.getPassengerById(Number(props.id)).then((response) => {
        passenger.value = response.data
        PassengerService.getAirlineById(Number(passenger.value?.airlineId)).then((response) => {
        airline.value = response.data
    })
    })


    .catch(error =>{
        console.log(error)
        if(error.response && error.response.status === 404){
            router.push({name:'404-resource',params: {resource: 'event'}})
        }else{
            router.push({name:'network-error'})
        }
    })

</script>
<template>
    <div v-if="passenger">
        <h1>{{ passenger.first_name }} {{ passenger.last_name }}</h1>
        <div id="nav">
            <router-link :to="{name: 'passenger-detail', params:{id}}">Details </router-link>
            <router-link :to="{name: 'passenger-airline', params:{id}}">airline</router-link>
        </div>
        <router-view :passenger="passenger" :airline="airline"></router-view>
    </div>
</template>
