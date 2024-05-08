import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserInfo = createAsyncThunk(
    'telegramUserInfo/fetchUserInfo',
    async function(){
        let firstName = 'привет'
        let lastName =  window.Telegram.WebApp.initDataUnsafe.user.last_name
        let UserId = window.Telegram.WebApp.initDataUnsafe.user.id
        let photo =  'хай хай'
        // let photo = await axios.get( 'https://birga.ywa.su/api/user/findOne' ,  {
        //     params : {
        //       id : UserId
        //     }
        //   })

        // let firstName = 'Привет'
        // let lastName =  'Как дела'
        // let UserId = '14'
        // let photo = 'бла бла фото еб'
          return {firstName : firstName, lastName : lastName , id : UserId , photo : photo}
    }


)

const telegramUserInfo = createSlice(  {
    name : 'telegramUserInfo',
    initialState : {
        state : null,
        id : '',
        photo : '',
        firstName : 'неверный ферст нэйм',
        lastName : '',
    },
    extraReducers : builder => {
        builder.addCase( fetchUserInfo.pending, (state => {state.status = 'loading'} )  )
        builder.addCase( fetchUserInfo.fulfilled, ( (state ,action) => {state.status = 'loading' 
        state.id = action.payload.id 
        state.firstName = action.payload.firstName 
        state.lastName = action.payload.lastName 
        state.photo = action.payload.photo 
    } ) )
        builder.addCase(fetchUserInfo.rejected, ( (state ) => {state.status = 'error'} )  )
        
    }
}   )

export default telegramUserInfo.reducer;