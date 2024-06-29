import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
function generateNormalData(mu, sigma, sampleSize) {
    return Array.from({length: sampleSize}, () => {
        const u1 = Math.random();
        const u2 = Math.random();
        const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
        return z0 * sigma + mu;
    });
}

let calculate = (annualRisk, annualReturn, years, monthlyInvest, initialInvestment) => {
    annualRisk /= 100;
    annualReturn /= 100;
    const months = years * 12;
    const monthlyReturn = Math.log(1 + annualReturn) / 12;
    const monthlyRisk = annualRisk / Math.sqrt(12);

    let totalInvestment = initialInvestment;
    let principal = initialInvestment;

    const rawdata = generateNormalData(monthlyReturn, monthlyRisk, months);
    const money = rawdata.map((monthlyReturnRate, index) => {
        totalInvestment = totalInvestment * Math.exp(monthlyReturnRate) + monthlyInvest;
        principal += monthlyInvest;
        const profit = (totalInvestment - principal) / principal * 100;
        return {
            month: index + 1,
            value: totalInvestment,
            principal: principal,
            profit: profit
        };
    });

    return money;
};
const App = () => {
  const [annualRisk, setAnnualRisk] = useState(5);
  const [annualReturn, setAnnualReturn] = useState(5);
  const [year, setYear] = useState(10);
  const [invest, setInvest] = useState(3);
  const [initialInvest, setInitialInvest] = useState(5);
  
  const [data, setData] = useState(() => calculate(annualRisk, annualReturn, year, invest, initialInvest));
  
  const handleCalculate = () => {
    setData(calculate(annualRisk, annualReturn, year, invest, initialInvest));
  }
  const handleClear = () => {
  setAnnualRisk("");
  setAnnualReturn("");
  setYear("");
  setInvest("");
  setInitialInvest("");
  }

  return (
    <div className="App">
      <div className="flex">
      <div>
      リスク(年率）<br />
      <input
        value={annualRisk}
        onChange={(e) => setAnnualRisk(Number(e.target.value))}
      />
      </div>
      <div>
リターン(年率) <br />
      <input
        value={annualReturn}
        onChange={(e) => setAnnualReturn(Number(e.target.value))}
      />
      </div>
      <div>
      年数 <br />
      <input
        value={year}
        onChange={(e) => setYear(Number(e.target.value))}
      />
      </div>
      <div>
      毎月の積立額 <br />
      <input
        value={invest}
        onChange={(e) => setInvest(Number(e.target.value))}
      />
      </div>
      <div>
      初期投資額 <br />
      <input
        value={initialInvest}
        onChange={(e) => setInitialInvest(Number(e.target.value))}
      />
      </div>
      </div>
      <div className="flex">
      <button　onClick={handleClear} className="dark:text-dark-text text-main-text text-lg">クリア</button>
      <button onClick={handleCalculate} className="dark:text-dark-text text-main-text text-lg">計算</button>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{
            top: 30, right: 30, left: 20, bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" >
          <Label value="月" offset={0} position="insideBottom" />
          </XAxis>
          <YAxis />
          <Tooltip />
          <Legend />
          <Line name="総運用額" dataKey="value" stroke="#8884d8" type="basis" />
          <Line name="元本" dataKey="principal" stroke="#82ca9d" type="basis" />
          <Line name="運用益" dataKey="profit" stroke="#ffc658" type="basis" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default App;
