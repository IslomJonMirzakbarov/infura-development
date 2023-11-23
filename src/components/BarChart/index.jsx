import React from 'react'
import {
  BarChart,
  Bar,
  Rectangle,
  ResponsiveContainer,
  Text,
  LabelList
} from 'recharts'

const CustomBar = ({ fill, x, y, width, height }) => (
  <Rectangle x={x} y={y} width={21.71} height={height} fill={fill} />
)

const CappedBar = (props) => {
  const { fill, x, y, width, height } = props
  const cappedHeight = Math.min(height, MAX_BAR_HEIGHT)
  const adjustedY = y - (cappedHeight - height)
  return (
    <Rectangle
      x={x}
      y={adjustedY}
      width={21.71}
      height={cappedHeight}
      fill={fill}
    />
  )
}

const CustomBarLabel = (props) => {
  const { x, y, value, height } = props
  const cappedHeight = Math.min(height, MAX_BAR_HEIGHT)
  const adjustedY = y - (cappedHeight - height)
  const barWidth = 21.71
  return (
    <Text
      x={x + barWidth / 2}
      y={adjustedY - 6}
      fill='#FFF'
      textAnchor='middle'
      dominantBaseline='bottom'
    >
      {value}
    </Text>
  )
}

const MAX_BAR_HEIGHT = 250 // Maximum height for bars in pixels

const DashboardBarChart = ({ upload = 0, download = 0 }) => {
  const data = [{ Upload: upload, Download: download }]
  return (
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
          {upload && (
            <Bar
              dataKey='Upload'
              fill='url(#uploadGradient)'
              shape={<CappedBar />}
            >
              <LabelList dataKey='Upload' content={<CustomBarLabel />} />
            </Bar>
          )}
          {download && (
            <Bar
              dataKey='Download'
              fill='url(#downloadGradient)'
              shape={<CappedBar />}
            >
              <LabelList dataKey='Download' content={<CustomBarLabel />} />
            </Bar>
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default DashboardBarChart
