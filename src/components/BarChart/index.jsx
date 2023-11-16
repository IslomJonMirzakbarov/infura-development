import React from 'react'
import {
  BarChart,
  Bar,
  Rectangle,
  ResponsiveContainer,
  Text,
  LabelList
} from 'recharts'

const data = [
  { Upload: 15, Download: 25 },
  { Upload: 5, Download: 15 },
  { Upload: 5, Download: 15 }
]

const CustomBar = ({ fill, x, y, width, height }) => (
  <Rectangle x={x} y={y} width={21.71} height={height} fill={fill} />
)

const CustomBarLabel = (props) => {
  const { x, y, value } = props
  const barWidth = 21.71
  return (
    <Text
      x={x + barWidth / 2}
      y={y - 6}
      fill='#FFF'
      textAnchor='middle'
      dominantBaseline='bottom'
    >
      {value}
    </Text>
  )
}

const DashboardBarChart = () => (
  <div
    style={{
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '0px 0px 7px 7px',
      overflow: 'hidden'
    }}
  >
    <ResponsiveContainer width='100%' height={317}>
      <BarChart data={data} barCategoryGap='40%'>
        <defs>
          <linearGradient id='uploadGradient' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor='#27E6D6' />
            <stop offset='87.2%' stopColor='#201F3C' />
          </linearGradient>
          <linearGradient id='downloadGradient' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor='#4131CA' />
            <stop offset='100%' stopColor='#201F3C' />
          </linearGradient>
        </defs>
        <Bar dataKey='Upload' fill='url(#uploadGradient)' shape={<CustomBar />}>
          <LabelList dataKey='Upload' content={<CustomBarLabel />} />
        </Bar>
        <Bar
          dataKey='Download'
          fill='url(#downloadGradient)'
          shape={<CustomBar />}
        >
          <LabelList dataKey='Download' content={<CustomBarLabel />} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
)

export default DashboardBarChart
