import React, {useEffect, useRef} from "react";
import alanBtn from '@alan-ai/alan-sdk-web';
import { withRouter, useLocation } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import moment from "moment-timezone";

const AlanContainer = (props) => {
    const rootElRef = useRef(null);
    const location = useLocation();
    const methods = useFormContext();
    const onSubmit = data => {
      alert(JSON.stringify(data));
      window.alanBtnInstance.playText('I will find the best hotel for you in a few seconds');
    };

    const onErrors = data => {
      window.alanBtnInstance.playText('Please check the data ypu have provided');
    };

    const handleSubmit = methods.handleSubmit(onSubmit, onErrors);

    useEffect(() => {
    window.alanBtnInstance = alanBtn({
      key: '6f3433adfd7cbdd38883f962aa1549aa2e956eca572e1d8b807a3e2338fdd0dc/stage',
      onButtonState: async (status) =>{
        if(status === 'ONLINE'){
          window.welcomeMsg = false;
          if(!window.welcomeMsg){
            window.alanBtnInstance.activate();
            window.alanBtnInstance.playText("Hello, I am your food order assistant. To satrt searching hit the buttonbelow or say Start now!")
            window.welcomeMsg = true;
          }
        }
      },
      
      onCommand: (commandData) => {
        if (commandData.command === 'openForm') {
          props.history.push("Form2");
        }
        if(commandData.command === 'getLocation'){
          methods.setValue('location', commandData.value);
        }
        if(commandData.command === 'setFromDate'){
          let fromDate = moment(commandData.value).format("MM-DD-YYYY");
          fromDate = moment(fromDate).toDate();
          methods.setValue('fromDate', fromDate);
        }
        if(commandData.command === 'setToDate'){
          let toDate = moment(commandData.value).format("MM-DD-YYYY");
          toDate = moment(toDate).toDate();
          methods.setValue('toDate', toDate);
        }
        if(commandData.command === 'setType'){
          methods.setValue('type', commandData.type);
        }
        if(commandData.command === 'cancelFree'){
          methods.setValue('cancelFree', true);
        }
        if(commandData.command === 'submitData'){
          handleSubmit();
        }
      }
    });
    }, []);

    useEffect(() => {
      window.alanBtnInstance.setVisualState({"path": location.pathname})
    }, [location]);

    return(
        <div className="alan-btn-container">
            <div ref={rootElRef}></div>
        </div>
    )
}

export default withRouter(AlanContainer);