import React, { useContext, useEffect } from "react";
import {
  AreaChart,
  Area,
  BarChart, 
  Bar,
  LineChart,
  ResponsiveContainer,
  Legend, Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { ThemeColors } from '@src/utility/context/ThemeColors'

const Chart= ({type="line",data,dataKeyX,keys})=> {
    const { colors } = useContext(ThemeColors)
    const CustomTooltip = ({ active, payload }) => {

        if (active && payload) {
          return (
            <div className='recharts-custom-tooltip'>
              <span>{`${payload[0].value}%`}</span>
            </div>
          )
        }
      
        return null
      }
  if(type=="line")
    return (
      <ResponsiveContainer >
      <LineChart data={data} height={300} >
          <CartesianGrid />
          <XAxis dataKey={dataKeyX} 
              interval={'preserveStartEnd'} />
          <YAxis></YAxis>
          <Legend />
          <Tooltip content={CustomTooltip}/>
          {keys.map((k,i)=> <Line key={i} dataKey={k}
          stroke={colors.warning.main}  strokeWidth={3} />)}
      </LineChart>
      </ResponsiveContainer>
   
    );
    else if(type=="bar")
    return (
      <ResponsiveContainer >
      <BarChart
        height={300}
        data={data}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={dataKeyX} />
        <YAxis />
        <Tooltip content={CustomTooltip} />
        {keys.map((k,i)=> <Bar key={i} dataKey={k} stackId='a' fill="#8884d8" />)}
      </BarChart>
     </ResponsiveContainer>
    );
    else if(type=="area")
    return(
      <ResponsiveContainer width="100%" aspect={1}>
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={dataKeyX} />
          <YAxis />
          <Tooltip />
          {keys.map((k,i)=> <Area type="monotone" key={i} dataKey={k} stackId="1" stroke="#8884d8" fill="#8884d8" />)}
        </AreaChart>
      </ResponsiveContainer>

    );
  
}
export default Chart;

