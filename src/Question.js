import React from "react"

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

    return (
        <>
            {!props.checked ? 
                <>
                    <div>
                        <h1 className="questionText">{decodeEntities(props.question)}</h1>
                        <div className="answer--container">
                            <button className={props.selected === props.answers[0] ? "answer-btn-selected" : "answer-btn"} onClick={() => props.select(props.id, props.answers[0])}>{decodeEntities(props.answers[0])}</button>
                            <button className={props.selected === props.answers[1] ? "answer-btn-selected" : "answer-btn"} onClick={() => props.select(props.id, props.answers[1])}>{decodeEntities(props.answers[1])}</button>
                            <button className={props.selected === props.answers[2] ? "answer-btn-selected" : "answer-btn"} onClick={() => props.select(props.id, props.answers[2])}>{decodeEntities(props.answers[2])}</button>
                            <button className={props.selected === props.answers[3] ? "answer-btn-selected" : "answer-btn"} onClick={() => props.select(props.id, props.answers[3])}>{decodeEntities(props.answers[3])}</button>
                        </div>
                    </div>
                    <hr />
                </>
                :
                <>
                    <div>
                        <h1 className="questionText">{decodeEntities(props.question)}</h1>
                        <div className="answer--container">
                            <button className={determine(0)}>{decodeEntities(props.answers[0])}</button>
                            <button className={determine(1)}>{decodeEntities(props.answers[1])}</button>
                            <button className={determine(2)}>{decodeEntities(props.answers[2])}</button>
                            <button className={determine(3)}>{decodeEntities(props.answers[3])}</button>
                        </div>
                    </div>
                    <hr />
                </>
            }
        </>
    )
}