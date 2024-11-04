import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider  = (props) => {

    const [input, setInput] = useState("");
    const [recentPormpt, setRecentPormpt] = useState("");
    const [prevPormpt, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {

    }

    const onSent = async (prompt) => {
        setResultData("")
        setLoading(true)
        setShowResult(true)
        setRecentPormpt(input)
      const response =  await run(input)
      let responseArray = response.split("**");
      let newResponse = '';
      for(let i = 0; i < responseArray.length; i++) {
        if (i === 0 ||  i % 2 !== 1) {
            newResponse += responseArray[i];
        }
        else {
            newResponse += "<b>" + responseArray[i] + "</b>"
        }
      }
      newResponse = newResponse.split('*').join('</br>');
      setResultData(newResponse)
      setLoading(false)
      setInput("")
    }

    const contextValue = {
        prevPormpt,
        setPrevPrompts,
        onSent,
        setRecentPormpt,
        recentPormpt,
        showResult,
        loading,
        resultData,
        input,
        setInput
    }
    return (

        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider
