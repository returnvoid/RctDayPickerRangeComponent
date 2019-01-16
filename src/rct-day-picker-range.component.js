import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import buildDebug from 'debug'
// eslint-disable-next-line no-unused-vars
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { withStyles } from 'material-ui/styles'
import withWidth from 'material-ui/utils/withWidth'
import Button from 'material-ui/Button'
import Popover from 'material-ui/Popover'
import Icon from 'material-ui/Icon'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import moment from 'moment'

import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'

import DayPickerRangeController from 'react-dates/lib/components/DayPickerRangeController'
import { isInclusivelyAfterDay } from 'react-dates'

import './rct-day-picker-range.component.css'

const debug = buildDebug('react-packages:packages:rct-day-picker-range-component')

const START_DATE = 'startDate'
const END_DATE = 'endDate'

// eslint-disable-next-line no-unused-vars
@withStyles(theme => ({
  icon: {
    marginTop: '5px',
    marginLeft: '2px',
  },
  button: {
    margin: '8px',
  },
  // TBD
}))
@withWidth()
// @inject('xyzStore')
@observer
export default class RctDayPickerRangeComponent extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types, react/no-unused-prop-types
    classes: PropTypes.object.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    width: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    months: PropTypes.number,
    noBorder: PropTypes.bool,
    buttonName: PropTypes.string,
    autoFocusEndDate: PropTypes.bool,
    isOutsideRange: PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    initStartDate: PropTypes.any,
    // eslint-disable-next-line react/forbid-prop-types
    initEndDate: PropTypes.any,
    // TBD
  }
  static defaultProps = {
    months: 2,
    noBorder: false,
    buttonName: 'Dates',
    autoFocusEndDate: false,
    isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
    initStartDate: null,
    initEndDate: null,
    // TBD
  }

  componentWillMount() {
    const { initStartDate, initEndDate, autoFocusEndDate } = this.props
    debug(initStartDate)
    debug(initEndDate)
    this.startDate = initStartDate && moment(initStartDate)
    this.endDate = initEndDate && moment(initEndDate)
    this.focusedInput = autoFocusEndDate ? END_DATE : START_DATE
  }

  getButtonColor = action(() => {
    debug('getButtonColor')
    if (this.startDate && this.endDate) {
      return 'primary'
    }
    return null
  })
  handleClick = action(() => {
    debug('handleClick()')
    this.open = true
    // eslint-disable-next-line react/no-find-dom-node
    this.anchorEl = findDOMNode(this.button)
  })
  handleClose = action(() => {
    debug('handleClose()')
    this.open = false
  })
  handleDate = action(({ startDate, endDate }) => {
    debug('handleDate()')
    debug(startDate)
    debug(endDate)
    const { onChange } = this.props
    this.startDate = startDate
    this.endDate = endDate
    onChange({ startDate, endDate })
    // if (this.endDate != null) {
    //   this.open = false
    // }
  })
  handleFocusedInput = action((focused) => {
    debug('handleFocused()')
    this.focusedInput = !focused ? START_DATE : focused
  })
  handleOnApply = action(() => {
    debug('handleOnApply()')
    this.open = false
  })
  handleOnCancel = action(() => {
    debug('handleOnCancel()')
    this.startDate = null
    this.endDate = null
  })
  showCalendarActions = action(() => {
    debug('showCalendarActions')
    return (
      <Grid container alignItems="center" justify="space-between" spacing={0}>
        <Grid item>
          <Button
            className={this.props.classes.button}
            onClick={this.handleOnCancel}
            disabled={this.startDate === null && this.endDate === null}
          >
            Clear
          </Button>
        </Grid>
        <Grid item>
          <Button color="primary" className={this.props.classes.button} onClick={this.handleOnApply}>Apply</Button>
        </Grid>
      </Grid>
    )
  })
  isButtonRaised = action(() => {
    debug('isButtonRaised')
    if (this.startDate && this.endDate) {
      return 'raised'
    }
    return 'flat'
  })

  @observable startDate = null
  @observable endDate = null
  @observable focusedInput = START_DATE
  @observable open = false
  @observable anchorEl = null

  button = null

  render() {
    debug('render()')
    const {
      classes, months, noBorder, buttonName, isOutsideRange,
    } = this.props
    return (
      <div>
        <Button
          variant={this.isButtonRaised()}
          color={this.getButtonColor()}
          ref={(node) => {
            this.button = node
          }}
          onClick={this.handleClick}
          size="small"
        >
          <Grid container alignItems="center" spacing={0}>
            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  { this.startDate === null && this.endDate === null && (
                    <Typography>{buttonName}</Typography>
                  )}
                  { this.startDate != null && (
                    <Typography color="inherit">{ moment(this.startDate).format('MMM DD')}</Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>
            { this.startDate !== null && this.endDate !== null && (
              <Grid item>
                <Typography color="inherit">&nbsp;-&nbsp; </Typography>
              </Grid>
            )}
            <Grid item>
              { this.startDate === null && this.endDate === null && (
                <Icon className={classes.icon}>keyboard_arrow_down</Icon>
              )}
              { this.endDate != null && (
                <Typography color="inherit">{moment(this.endDate).format('MMM DD')}</Typography>
              )}
            </Grid>
          </Grid>
        </Button>
        <Popover
          open={this.open}
          onClose={this.handleClose}
          anchorEl={this.anchorEl}
          anchorReference="anchorEl"
          anchorPosition={{ top: 200, left: 400 }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <DayPickerRangeController
            startDate={this.startDate}
            endDate={this.endDate}
            onDatesChange={this.handleDate}
            focusedInput={this.focusedInput}
            onFocusChange={this.handleFocusedInput}
            numberOfMonths={months}
            noBorder={noBorder}
            onOutsideClick={this.handleClose}
            renderCalendarInfo={this.showCalendarActions}
            isOutsideRange={isOutsideRange}
          />
        </Popover>
      </div>
    )
  }
}
