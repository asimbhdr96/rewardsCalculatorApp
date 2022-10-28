import { customerData } from "./mockData"

export const getRewards = (id) => {
  if(id){
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(customerData.filter((data) => data.id === id))
      },1500)
    })
  }else{
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(customerData)
      },1500)

    })
  }
}



