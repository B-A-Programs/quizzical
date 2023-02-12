import React from "react"
import {nanoid} from "nanoid"

export default function Question(props) {

    var decodeEntities = (function() {
        // this prevents any overhead from creating the object each time
        var element = document.createElement('div');
      
        function decodeHTMLEntities (str) {
          if(str && typeof str === 'string') {
            // strip script/html tags
            str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
            str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
            element.innerHTML = str;
            str = element.textContent;
            element.textContent = '';
          }
      
          return str;
        }
      
        return decodeHTMLEntities;
      })();

    
    function determine(nmb) {
        let clas = "answer-btn-faded";

        if(props.selected === props.answers[nmb] && props.answers[nmb] !== props.correct_answer)
            clas = "answer-btn-wrong"

        if(props.answers[nmb] === props.correct_answer)
            clas = "answer-btn-right"

        return clas
    }

    let ansButtons = [];
    let finButtons = [];
    for(let i = 0; i < 4; i++)
    {
        ansButtons.push(<button key={nanoid()} className={props.selected === props.answers[i] ? "answer-btn-selected" : "answer-btn"} onClick={() => props.select(props.id, props.answers[i])}>{decodeEntities(props.answers[i])}</button>)
        finButtons.push(<button key={nanoid()} className={determine(i)}>{decodeEntities(props.answers[i])}</button>)
    }


    return (
        <>
            {!props.checked ? 
                <>
                    <div className="questionConainer">
                        <h1 className="questionText">{decodeEntities(props.question)}</h1>
                        <div className="answer--container">
                            {ansButtons}
                        </div>
                    </div>
                    <hr />
                </>
                :
                <>
                    <div className="questionConainer">
                        <h1 className="questionText">{decodeEntities(props.question)}</h1>
                        <div className="answer--container">
                            {finButtons}
                        </div>
                    </div>
                    <hr />
                </>
            }
        </>
    )
}