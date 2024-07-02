import React, { useCallback, useEffect, useState } from "react";



import AboutTop from "./AboutTop";
import AboutInfo from "./AboutInfo";
import AboutMain from "./AboutMain";
import ExampleWorks from "./ExampleWorks";
import { memo } from "react";
import Top from "../../../components/UI/Top/Top";
import axios from "axios";
import makeFile from "../../../functions/makeFile";
import MyLoader from "../../../components/UI/MyLoader/MyLoader";
import Stage from "../../../components/UI/Stage/Stage";
import Compact from "../../../components/UI/Compact/Compact";
import { useDispatch } from "react-redux";
import { changeMenuActive } from "../../../store/menuSlice";

const AboutReaction = ({ responce ,   ...props}) => {
  const dispatch = useDispatch()
  const setMenuActive = useCallback(
    (arg) => {
      dispatch(changeMenuActive(arg));
    },
    [dispatch]
  );

  const [cards , setCards] = useState(null)
  useEffect( () => {
    async function getAllCards(){
      let localCards = []
      try{

        let allCards = await axios.get("https://back-birga.ywa.su/card/findByUser" , {
            params : {
                userId : responce.user.id
            }
        })

        allCards.data.forEach(e => {
          let files = makeFile(e.files , e.photos)
          console.log(files)
          localCards.push({
              id : e.id,
              title : e.title,
              description : e.description,
              behanceLink : e.behance,
              dribbbleLink : e.dribble,
              dropfileLink : e.dropFile,
              photosNames : e.photos,
              photos : files
          })
      })
      return localCards


      }
      catch(e){
        alert(e)
        console.log()
      }



    }
    getAllCards().then((value) => {
      console.log(value)
      setCards(value)
    })
  } , [])

  return (
    <div className="aboutReaction" {...props}>


      <Top setMenuActive={setMenuActive} name={'Отклики'}/>

      <AboutTop responce={responce} />

      <AboutInfo responce={responce} />

      <AboutMain aboutU = {responce.user.about}  />

      <Compact className={"stage-compact"} title = {"Стаж работы"}>
        <Stage number={String(responce.user.stage)} />
      </Compact>


      {cards === null ? <MyLoader/> :
      <ExampleWorks cards={cards}/>}



    </div>
  );
};
export default memo(AboutReaction);
