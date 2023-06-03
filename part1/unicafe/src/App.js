import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


if (good + bad + neutral > 0) {
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good +  1)}>good</button>
      <button onClick={() => setNeutral(neutral +  1)}>neutral</button>
      <button onClick={() => setBad(bad +  1)}>bad</button>
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good +  1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral +  1)} text="neutral"/>
      <Button handleClick={() => setBad(bad +  1)} text="bad"/>
      <h1>statistics</h1>
      <p>no feedback given</p>
    </div>
  )
}

const Button = (props) => {
  return(
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

// const Statistics = (props) => {
//   /// ...
//   return(
//     <div>
//       <StatisticLine text="good" value ={...} />
//       <StatisticLine text="neutral" value ={...} />
//       <StatisticLine text="bad" value ={...} />
//       // ...
//     </div>
//   )
// }


const StatisticsLine = (props) => {
  if (props.text === "positive") {
    return(
      <tr>
        <td> {props.text} </td>
        <td> {props.value}% </td>
      </tr>
    )
  }
  return(
    <tr>
        <td> {props.text} </td>
        <td> {props.value} </td>
      </tr>
  )
}


const Statistics = (props) => {
  return (
  <table>
  <tbody>
  <StatisticsLine text="good" value={props.good}/>
  <StatisticsLine text="neutral" value={props.neutral}/>
  <StatisticsLine text="bad" value={props.bad}/>
  <StatisticsLine text="all" value={props.good + props.bad + props.neutral}/>
  <StatisticsLine text="average" value={(props.good * 1 + props.bad * (-1))/(props.good + props.bad + props.neutral)}/>
  <StatisticsLine text="positive" value={props.good/(props.good + props.bad + props.neutral) * 100}/>
  </tbody>
  </table>)
}

export default App