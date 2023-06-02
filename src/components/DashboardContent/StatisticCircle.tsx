import { motion } from 'framer-motion'
import React from 'react'

type StatictisCircleProps = {
  children: React.ReactNode
  totalWorkload: number
  completedWorkload: number
  iconSize: number
}

export const StatictisCircle = ({ iconSize, totalWorkload, completedWorkload, children }: StatictisCircleProps) => {
  const radius = 70

  const strokeWidth = 10
  const percent = (completedWorkload / totalWorkload) * 100
  const circumference = 2 * Math.PI * (radius - strokeWidth / 2)
  const strokeDasharray = circumference
  const strokeDashoffset = ((100 - percent) / 100) * circumference

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        cx={radius}
        cy={radius}
        fill="transparent"
        r={radius - strokeWidth / 2}
        stroke="#D9D6D6"
        strokeWidth={strokeWidth}
      />
      <motion.circle
        animate={{ strokeDashoffset }}
        cx={radius}
        cy={radius}
        fill="transparent"
        initial={{ strokeDashoffset: circumference }}
        r={radius - strokeWidth / 2}
        stroke="#B95A5A"
        strokeDasharray={strokeDasharray}
        strokeWidth={strokeWidth}
        transform={`rotate(-90 ${radius} ${radius})`}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />
      <g>
        <foreignObject
          height={iconSize}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          width={iconSize}
          x={radius - iconSize / 2}
          y={radius - iconSize / 2}
        >
          <div>{children}</div>
        </foreignObject>
      </g>
    </svg>
  )
}
