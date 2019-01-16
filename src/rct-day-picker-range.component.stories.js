import React from 'react'
import { Provider } from 'mobx-react'
import { BrowserRouter } from 'react-router-dom'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered'
import { withInfo } from '@storybook/addon-info'

// import xyzStore from '@4geit/rct-xyz-store'

import RctDayPickerRangeComponent from './rct-day-picker-range.component'

const stores = {
  // xyzStore,
}

function dummy(object) {
  // eslint-disable-next-line no-console
  console.log(object)
}

storiesOf('RctDayPickerRangeComponent', module)
  .addDecorator(centered)
  .add('simple usage', withInfo()(() => (
    <BrowserRouter>
      <Provider {...stores}>
        <RctDayPickerRangeComponent onChange={dummy} />
      </Provider>
    </BrowserRouter>
  )))
