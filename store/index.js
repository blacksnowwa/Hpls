export const state = () => ({
  isCollaped: true
})



export const getters = {
    isCollaped(state){
      return state.isCollaped || window.innerWidth > 600
    },


    isAuthenticated(state) {
      return state.auth.loggedIn
    },
  
    loggedInUser(state) {
      return state.auth.user
    }
  }


  export const mutations = {
    collap(state) {
      console.log("store");
      state.isCollaped = !state.isCollaped
    },
    closemenu(state) {
      console.log("asdasd");
      state.isCollaped = false
    }

  }