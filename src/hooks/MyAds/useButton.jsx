import {  useEffect } from "react";
import BackButton from "../../constants/BackButton";
import MainButton from "../../constants/MainButton";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setStartTask } from "../../store/information";
import { setStartResponse } from "../../store/responses";

export const useButton = ({
  sliderActive,
  localDetails,
  localAboutReaction,
  localIsOpen,
  setOpen,
  setSecondPage,
  navigate,
  setOpenAboutReaction,
  setSliderActive,
  openAboutReaction,
  isOpen,
  localSecondPage,
  details,
  secondPage,
  save,
  oneCards,
  setOneCard,
  detailsTwo,
  setDetailsTwo,
  myResponse,
  setMyResponse

}) => {
  const history = useLocation()
  console.log(history)
  const dispatch = useDispatch()
  useEffect(() => {
    function writeFucntion() {
      console.log('я тут прием')
      window.Telegram.WebApp
      .showPopup({
        title: "Внимание",
        message: "Перед выбором исполнителя\n ознакомьтесь с FAQ Биржи.",
        buttons: [
          { id: "delete", type: "default", text: "Продолжить" },
          { id: "save", type: "destructive", text: "Прочитать" },
        ],
      } , (buttonId) => {
  
        if (buttonId === "delete" ) {
          window.Telegram.WebApp.showPopup({
            title : "Выбрать?",
            message : "Вы уверены, что хотите выбрать\n этого исполнителя?",
            buttons : [
              { id: "save", type: "default", text: "Да" },
              { id: "delete", type: "destructive", text: "Нет" },
            ]
          } , (buttonId) => {
            if (buttonId === 'save'){
              dispatch(setStartTask(secondPage.task.id))
              dispatch(setStartResponse(isOpen.responce.id))
              setOpen({ ...isOpen, isActive: false });
              setSecondPage({ ...secondPage, isActive: false });

            }
            else{

            }
          })

        }
        if (buttonId === "save") {
          window.Telegram.WebApp.openLink('https://walletru.helpscoutdocs.com/')
      } })
    }
    function goBack() {
      if (!sliderActive.isActive) {
        if (!localDetails.isActive) {
          if (oneCards.isOpen){
            setOneCard((value) => ({...value , isOpen : false}))
          }
          else{

            if (!localAboutReaction.isActive) {
              if (localIsOpen.isActive) {
                setOpen({ ...isOpen, isActive: false });
              } else {
                if (localSecondPage.isActive) {
                  setSecondPage({ ...secondPage, isActive: false });
                } else {
                  // if (history[history.length - 1] === '/AdCreating'){
  
                  //   navigate();
                  // }
                  // else{
                  //   navigate(-1)
                  // }
                  if (myResponse.isOpen){
                    setMyResponse( (value) => ({...value, isOpen : false}) )
                  }
                  else{
                    
                    if (detailsTwo.isOpen){
                      setDetailsTwo((value) => ({...value, isOpen : false}))
                    }
                    else{
                      navigate('/')
                    }

                  }

                }
              }
            } else {
              setOpenAboutReaction({ ...openAboutReaction, isActive: false });
            }

          }
        } else {
            save()
        }
      } else {
        setSliderActive({ ...sliderActive, isActive: false });
      }
    }

    BackButton.show();
    

    if (isOpen.isActive) {
      MainButton.show();
      MainButton.setParams({
        color: "#2ea5ff",
        text_color: "#ffffff",
      });
      MainButton.setText("ВЫБРАТЬ");
      MainButton.onClick(writeFucntion);
    } else {
      MainButton.offClick(writeFucntion);
      if (!myResponse.isOpen){
        MainButton.hide();
      }
    }
    BackButton.onClick(goBack);
    return () => {
      BackButton.offClick(goBack);
      // MainButton.offClick(writeFucntion);
    };

    // eslint-disable-next-line
  }, [
    isOpen.isActive,
    sliderActive.isActive,
    openAboutReaction.isActive,
    sliderActive.isActive,
    details.isActive,
    isOpen,
    navigate,
    save,
    setOneCard,
    oneCards.isOpen,
    detailsTwo.isOpen,
    setDetailsTwo,
    myResponse.isOpen,
    setMyResponse
  ]);
};

