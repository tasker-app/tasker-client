import * as Tooltip from '@radix-ui/react-tooltip'
import styled, { keyframes } from 'styled-components'

import { Text } from './Text'

const slideUpAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const slideRightAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateX(-2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const slideDownAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(-2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const slideLeftAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateX(2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const closedAndFade = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`

const Content = styled(Tooltip.Content)`
  border-radius: 4px;
  width: 100px;
  height: 28px;
  background: rgba(38, 38, 38, 0.9);
  user-select: none;
  animation-duration: 300ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  will-change: transform, opacity;

  &[data-state='delayed-open'][data-side='top'] {
    animation-name: ${slideDownAndFade};
  }
  &[data-state='delayed-open'][data-side='right'] {
    animation-name: ${slideLeftAndFade};
  }
  &[data-state='delayed-open'][data-side='bottom'] {
    animation-name: ${slideUpAndFade};
  }
  &[data-state='delayed-open'][data-side='left'] {
    animation-name: ${slideRightAndFade};
  }
  &[data-state='closed'] {
    animation-name: ${closedAndFade};
  }
`

type CustomerTooltipProps = {
  children: React.ReactNode
  content: string
  side?: 'top' | 'right' | 'bottom' | 'left'
}

export const CustomTooltip = ({ children, content, side = 'bottom' }: CustomerTooltipProps) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={400}>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Content side={side} sideOffset={8}>
            <Text color="rgba(255, 255, 255, 0.9)">{content}</Text>
          </Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
