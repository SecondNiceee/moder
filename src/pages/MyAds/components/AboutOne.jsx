import React, { useCallback, useEffect, useState } from 'react';

import FirstBlock from '../../../components/First/FirstMain/FirstBlock';
import { memo } from 'react';
import Top from '../../../components/UI/Top/Top';
import ReactionBlock from './ReactionBlock';
import axios from 'axios';
import MyLoader from '../../../components/UI/MyLoader/MyLoader';
import makeFile from '../../../functions/makeFile';
import { deleteAd } from '../../../store/information';
import { useDispatch } from 'react-redux';




const AboutOne = ({task, setMenuActive, goForward, setOpen, setSecondPage, setDetailsActive, setDetails }) => {
  const [responces , setResponces] = useState(null)
  const dispatch = useDispatch()
  useEffect( () => {
    async function getIt(id){
      let im = await axios.get("https://back-birga.ywa.su/response/findByAdvertisement" , {
        params : {
          advertisementId : id
        }
      })
      let responces = im.data
      console.log(responces)
      for (let i = 0; i < responces.length; i++){

        let photos = []
        if (responces[i].files){
          photos = makeFile(responces[i].files, Array(responces[i].files.length))
        }
        responces[i].photos = photos
        try{

          let imTwo = await axios.get("https://back-birga.ywa.su/advertisement/findCount" , {
            params : {
              userId : responces[i].user.id
            }
          })
          console.log(imTwo.data)
          alert(imTwo.data)
          responces[i].createNumber = imTwo.data
        }
        catch(e){
          alert(e)
          console.log(e)
        }
      }



      
      

      return responces
  }

  console.log(responces)

  getIt(task.id).then( (resp) => {
    console.log(resp)
    setResponces(resp)
  } )

  } , []  )


  const deleteFunction = useCallback( (e) => {
    window.Telegram.WebApp
    .showPopup({
      title: "Удалить?",
      message: "Вы хотите удалить это задание?",
      buttons: [
        { id: "save", type: "default", text: "Да" },
        { id: "delete", type: "destructive", text: "Нет" },
      ],
    } , (buttonId) => {

      if (buttonId === "delete" || buttonId === null) {
        
      }
      if (buttonId === "save") {
        dispatch(deleteAd(e.id))
        setSecondPage( (value) => ({...value, isActive : false}) )
      }


    } )
  }, [dispatch] )

    return (
        <div className="aboutOne" style={{
        }}>
          
          <Top name={'Отклики'} setMenuActive={setMenuActive}/>

        {task ? 
        <FirstBlock
        deleteFunction={() => {
          deleteFunction(task)
        }}
         setDetailsActive={(value) => {
          setDetails({
            isActive : true,
            task : task,
          })
        }} isResponce={true} isButton={true}   className={'FirstAdsBlock'}  {...task} />
      :
      ""
      }
          
          {responces === null ? 
          <MyLoader style = {
            {
              height : "calc(100vh - 456px)",
              position : "fixed",
              left : 0
            }
          } />
          :
          <ReactionBlock responces = {responces} setOpen={setOpen} goForward = {goForward} />
          }
      
          

          

        </div>
    );
};

export default memo(AboutOne);