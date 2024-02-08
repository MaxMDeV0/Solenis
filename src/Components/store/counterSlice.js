import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'solenis',
  initialState: {
    product: [],
    jobs:[],
    admin:[],
    category:{category:'', content:[]},
    page:'accueil',
  },
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload
    },
    delProduct: state=> {
        state.product = {}
    },
    setJobs: (state, action) =>{
      state.jobs = action.payload
    },
    setAdmin: (state, action) =>{
      state.admin = action.payload
      console.log(action.payload)
    },
    setCategory: (state, action) =>{
      state.category = action.payload
      console.log(action.payload)
    },
    setPage: (state, action)=>{
      state.page = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setProduct, delProduct, setJobs,setAdmin, setCategory, setPage } = counterSlice.actions

export default counterSlice.reducer