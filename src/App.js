import './App.css';
import React from "react"
import Question from "./Question"
import {nanoid} from "nanoid"

function App() {
  const [started, setStarted] = React.useState(false)
  const [quiz, setQuiz] = React.useState([])
  const [correct, setCorrect] = React.useState(0)
  const [checked, setChecked] = React.useState(false)
  const [quizCnt, setQuizCnt] = React.useState(0)

  function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
  }

  function check() {
    if(!checked) {
      setChecked(true)

      quiz.forEach(question => {
        if(question.selected === question.correct_answer)
          setCorrect(prev => prev + 1)
      })
    }
    else {
      setQuizCnt(prev => prev + 1)
      setChecked(false)
      setCorrect(0)
    }
  }

  function select(id, answer) {
    setQuiz(prevQuiz => {
      return prevQuiz.map(question => {
        if(question.id === id) {
          if(question.selected === answer)
            return {...question, selected: null}
          else
            return {...question, selected: answer}
        }
        else
          return question
      })
    })
  }

  React.useEffect(() => {
    const createQuiz = async () => {
      setQuiz([])
      const response = await fetch('https://opentdb.com/api.php?amount=5&type=multiple');

      const questions = await response.json();

      questions.results.map(question => {
        let answers = [question.correct_answer];
        question.incorrect_answers.forEach(answer => answers.push(answer))

        shuffleArray(answers)

        const id = nanoid()

        setQuiz(prevQuiz => {
          return [...prevQuiz, {id: id, question: question.question, correct_answer: question.correct_answer, answers: answers, selected: null}]
        })

        return 0
      })
    }

    createQuiz()
  }, [quizCnt])

  let questionsArray = quiz.map(question => {
    return <Question key={question.id} id={question.id} answers={question.answers} selected={question.selected} question={question.question} select={select} checked={checked} correct_answer={question.correct_answer} />
  })

  return (
    <>
      <div className="App">
          {started ?
            <>
              <img src={require("./images/blob1.png")} className="blob3" alt="blob" />
              <img src={require("./images/blob2.png")} className="blob4" alt="blob" />

              <div className="quiz">
                {questionsArray}

                <div><button className="check_btn" onClick={check}>{checked ? "New quiz" : "Check answers"}</button>{checked && <span className="results">You got {correct} out of 5!</span>}</div>
              </div>
            </>
          :
          <>
            <img src={require("./images/blob1.png")} className="blob1" alt="blob" />
            <img src={require("./images/blob2.png")} className="blob2" alt="blob" />
            <div className="start"> 
              <h1 className="title"><b>Quizzical</b></h1>
              <div className="description">Challange your general knowledge with trivia!</div>
              <button className="start_btn" onClick={() => setStarted(true)}>Start quiz</button>
            </div>
          </>
          }
      </div>
    </>
  );
}

export default App;
