import React from 'react'
import PropTypes from 'prop-types'
import angular from 'angular'
import { react2angular } from 'react2angular'
import { Provider } from 'mobx-react'

import RctDayPickerRangeComponent from './rct-day-picker-range.component'

const stores = {
  // TBD
}

const RctDayPickerRangeComponentWrapper = ({
  onChange, onReset, noBorder, months, initStartDate, initEndDate,
}) => (
  <Provider {...stores} >
    <RctDayPickerRangeComponent
      onChange={onChange}
      onReset={onReset}
      noBorder={noBorder}
      months={months}
      initStartDate={initStartDate}
      initEndDate={initEndDate}
    />
  </Provider>
)
RctDayPickerRangeComponentWrapper.propTypes = {
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  noBorder: PropTypes.bool,
  months: PropTypes.number,
  // eslint-disable-next-line react/forbid-prop-types
  initStartDate: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  initEndDate: PropTypes.any,
}
RctDayPickerRangeComponentWrapper.defaultProps = {
  noBorder: false,
  months: 2,
  initStartDate: null,
  initEndDate: null,
}

export default angular
  .module('rct-day-picker-range-component', [])
  .component('rctDayPickerRangeComponent', react2angular(RctDayPickerRangeComponentWrapper))
  .name
