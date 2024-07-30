import React, { memo, useCallback, useEffect } from 'react';
import TaskDetailsContainer from './TaskDetailsContainer';
import TimeAndWatches from './TimeAndWatches';
import SimilarAds from './SimilarAds';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addWatch } from '../../../store/information';

const FirstDetails = ({  orderInformation , className , setProfile, end = false, ...props}) => {
    const focuseHandelr = useCallback( () => {
        document.documentElement.style.overflowY = "auto"
        document.documentElement.style.marginTop = "0px"
    } , [] )
    const unfocusHandler = useCallback( () => {
        
            document.documentElement.style.marginTop = "20px"
            window.scrollTo(0,40)
            document.documentElement.style.overflowY = "hidden"
    } , [] )
    
    useEffect( () => {
        focuseHandelr()
        return () => {
            unfocusHandler()
        }
    } , [focuseHandelr, unfocusHandler] )

    console.log('рендер детаилса')
    const disatch = useDispatch()
    useEffect( () => {
        if (!end){

            disatch(addWatch(orderInformation))
        }
    } , [] )

    // useEffect( () => {
    //     document.documentElement.style.overflowY = "unset"
    //     document.documentElement.style.marginTop = "0px"
    //     window.scrollTo({
    //         top: 0,
    //         behavior: "smooth",
    //       });
    //     return () => {
    //         document.documentElement.style.marginTop = "40px"
    //         window.scrollTo({
    //             top: 40,
    //             behavior: "smooth",
    //           });
    //         document.documentElement.style.overflowY = "hidden"
    //     }
    // } , [])

    return (
        <>
        {orderInformation 
            ? 
            (
            <div {...props} className  =  {className ? ['TaskDetails' , className].join(' ') : 'TaskDetails'} >
    
                <TaskDetailsContainer setProfile = {setProfile} end = {end}  orderInformation = {orderInformation} />
    
                <TimeAndWatches time={orderInformation.creationTime} watches={orderInformation.viewsNumber} />
    
                <SimilarAds similarAds = {[]} />
    
            </div>
            )
            :
            <>
            </>
        }
        </>
    );
};

export default memo(FirstDetails);