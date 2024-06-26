import { useState } from 'react'
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

function generateNormalData(mu, sigma, sampleSize) {
  return Array.from({ length: sampleSize }, () => {
    const u1 = Math.random()
    const u2 = Math.random()
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2)
    return z0 * sigma + mu
  })
}

let calculate = (
  annualRisk,
  annualReturn,
  years,
  monthlyInvest,
  initialInvestment,
) => {
  annualRisk /= 100
  annualReturn /= 100
  const months = years * 12
  const monthlyReturn = Math.log(1 + annualReturn) / 12
  const monthlyRisk = annualRisk / Math.sqrt(12)

  let totalInvestment = initialInvestment
  let principal = initialInvestment

  const rawdata = generateNormalData(monthlyReturn, monthlyRisk, months)
  const money = rawdata.map((monthlyReturnRate, index) => {
    totalInvestment =
      totalInvestment * Math.exp(monthlyReturnRate) + monthlyInvest
    principal += monthlyInvest
    const profit = ((totalInvestment - principal) / principal) * 100
    return {
      month: index + 1,
      value: totalInvestment,
      principal: principal,
      profit: profit,
    }
  })

  return money
}

const App = () => {
  const [annualRisk, setAnnualRisk] = useState('5')
  const [annualReturn, setAnnualReturn] = useState('5')
  const [year, setYear] = useState('10')
  const [invest, setInvest] = useState('3')
  const [initialInvest, setInitialInvest] = useState('5')

  const [data, setData] = useState(() =>
    calculate(
      parseFloat(annualRisk) || 0,
      parseFloat(annualReturn) || 0,
      parseFloat(year) || 0,
      parseFloat(invest) || 0,
      parseFloat(initialInvest) || 0,
    ),
  )

  const handleCalculate = () => {
    setData(
      calculate(
        parseFloat(annualRisk) || 0,
        parseFloat(annualReturn) || 0,
        parseFloat(year) || 0,
        parseFloat(invest) || 0,
        parseFloat(initialInvest) || 0,
      ),
    )
  }

  const handleClear = () => {
    setAnnualRisk('')
    setAnnualReturn('')
    setYear('')
    setInvest('')
    setInitialInvest('')
  }

  return (
    <div className="App w-full">
      <div className="flex dark:text-dark-text text-main-text flex-wrap">
        <div>
          リスク(年率）
          <br />
          <input
            value={annualRisk}
            onChange={(e) => setAnnualRisk(e.target.value)}
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          リターン(年率) <br />
          <input
            value={annualReturn}
            onChange={(e) => setAnnualReturn(e.target.value)}
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          年数 <br />
          <input
            value={year}
            onChange={(e) => setYear(e.target.value)}
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          毎月の積立額 <br />
          <input
            value={invest}
            onChange={(e) => setInvest(e.target.value)}
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          初期投資額 <br />
          <input
            value={initialInvest}
            onChange={(e) => setInitialInvest(e.target.value)}
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <div className="flex">
        <button
          onClick={handleClear}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          クリア
        </button>
        <button
          onClick={handleCalculate}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
        >
          計算
        </button>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{
            top: 30,
            right: 30,
            left: 20,
            bottom: 40,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month">
            <Label value="月" position="insideBottom" offset={10}/>
          </XAxis>
          <YAxis />
          <Tooltip />
          <Legend />
          <Line name="総運用額" dot={false} dataKey="value" stroke="#8884d8" type="basis" />
          <Line name="元本" dot={false} dataKey="principal" stroke="#82ca9d" type="basis" />
          <Line name="運用益" dot={false} dataKey="profit" stroke="#ffc658" type="basis" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default App
