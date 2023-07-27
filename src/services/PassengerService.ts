import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios' 
import type { PassengerItem } from '@/passenger'
import type { AirlineItem } from '@/airline'

const apiClient : AxiosInstance = axios.create({
    baseURL: 'https://my-json-server.typicode.com/se331-2022/passengerdb',
    withCredentials: false,
    headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default{
    getPassenger(perPage: number, page:number): Promise<AxiosResponse<PassengerItem[]>>{
        return apiClient.get<PassengerItem[]>('/passenger?_page=' + page + '&_limit=' + perPage)
    },
    getPassengerById(id: number): Promise<AxiosResponse<PassengerItem>>{
        return apiClient.get<PassengerItem>('passenger/' + id.toString()) 
    },
    getAirlineById(id: number): Promise<AxiosResponse<AirlineItem>>{
        return apiClient.get<AirlineItem>('airline/' + id.toString()) 
    }
    
}   
