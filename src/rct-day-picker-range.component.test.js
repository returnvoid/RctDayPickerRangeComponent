import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { createShallow } from 'material-ui/test-utils'
import initStoryshots from '@storybook/addon-storyshots'

// import xyzStore from '@4geit/rct-xyz-store'

import RctDayPickerRangeComponent from './rct-day-picker-range.component'

const stores = {
  // xyzStore,
}

if (!process.env.DISABLE_STORYSHOTS) {
  initStoryshots({
    storyKindRegex: /^RctDayPickerRangeComponent$/,
  })
}

const shallow = createShallow({ untilSelector: 'div' })

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Provider {...stores} >
      <RctDayPickerRangeComponent />
    </Provider>,
    div,
  )
})
// it('renders correctly', () => {
//   const wrapper = mount(<RctDayPickerRangeComponent {...stores} />)
//   expect(wrapper).toMatchSnapshot()
// })
it('shallow-renders correctly', () => {
  const wrapper = shallow(<RctDayPickerRangeComponent {...stores} />)
  expect(wrapper).toMatchSnapshot()
})
