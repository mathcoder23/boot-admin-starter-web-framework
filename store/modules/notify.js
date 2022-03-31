
const notify = {
  state: {
    deviceStatus:''
    ,platformStatus:''
  },
  mutations: {
    DEVICE_STATUS: (state,data) => {
      console.log('state',data)
      state.deviceStatus = data
    },
    PLATFORM_STATUS: (state,data) => {
      state.platformStatus = data
    },
  }
}
export default notify