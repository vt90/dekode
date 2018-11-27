/**
 * Created by vladtomsa on 27/11/2018
 */
/**
 * Created by vladtomsa on 27/11/2018
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Echart from 'echarts-for-react';

import moment from 'moment';
import groupBy from 'lodash/groupBy';
import {DATE_FORMAT} from '../../../../constants';
import styles from '../styles';


const option = {
  // title: {
  //   text: 'Account history',
  //   x: 'center',
  //   align: 'right'
  // },
  backgroundColor: 'rgba(0,0,0,0)',
  color: ['#66bb6a', '#ffa726', 'rgba(0, 0, 0, 0.5)'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    x: 'right',
    top: '8%',
    align: 'left',
    orient: 'vertical',
    data: ['Sent', 'Received', 'Balance'],
    symbolKeepAspect: false,
    textStyle: {
      color: '#666',
    },
  },
  grid: {
    top: '5%%',
    left: '5%',
    // right: '5%',
    // bottom: '5%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    axisLine: {onZero: false}
  },
  yAxis: {
    type: 'value',
    splitLine: {
      show: false,
      lineStyle: {
        color: ['#f2f2f2']
      }
    },
    axisLine: {onZero: false}
  },
  dataZoom: [
    {
      type: 'slider',
      xAxisIndex: 0,
      filterMode: 'empty'
    },
    // {
    //   type: 'slider',
    //   yAxisIndex: 0,
    //   filterMode: 'empty'
    // },
  ],
};


class TransactionsTable extends Component {

  getActivityChart = (address, transactions) => {
    const groupedByTimestamp = groupBy(transactions, (trs) => moment(trs.timeStamp * 1000).format(DATE_FORMAT));
    const transactionDates = Object.keys(groupedByTimestamp);

    const minDate = moment.min(transactionDates.map(date => moment(date)));
    const maxDate = moment.max(transactionDates.map(date => moment(date)));

    const startDate = moment(minDate);

    const chartDates = [];

    while (maxDate.diff(startDate, 'days') >= 0) {
      chartDates.push(startDate.format(DATE_FORMAT));

      startDate.add(1, 'days');
    }

    const sendData = [];
    const receivedData = [];
    const balanceData = [];

    chartDates.forEach((date, index) => {
      const previousBalance = balanceData[index - 1] || 0;
      let dayBalance = previousBalance;
      let daySent = 0;
      let dayReceived = 0;

      const dateTransactions = groupedByTimestamp[date];

      if (dateTransactions && dateTransactions.length) {
        dateTransactions.forEach((trs) => {
          if (trs.to.toLowerCase() === address.toLowerCase()) {
            dayReceived += trs.value;
            dayBalance += trs.value;
          }

          if (trs.from.toLowerCase() === address.toLowerCase()) {
            daySent += trs.value;
            dayBalance -= trs.value;
          }
        })
      }

      sendData.push(daySent);
      receivedData.push(dayReceived);
      balanceData.push(dayBalance);
    });

    const series = [
      {
        name: 'Sent',
        type: 'bar',
        stack: 'day',
        data: sendData,
      },
      {
        name: 'Received',
        type: 'bar',
        stack: 'day',
        data: receivedData,
        // markArea: areaStyle
      },
      {
        name: 'Balance',
        type: 'line',
        stack: 'day',
        data: balanceData,
        symbolSize: 0,
        smooth: true,
        lineStyle: {
          normal: {
            width: 2,
            opacity: 1,
          },
        },
      },
    ];

    return {
      series,
      xAxis: [{
        type: 'category',
        data: chartDates,
      }],
    }
  };

  render() {
    const {address, classes, transactions} = this.props;

    const {series, xAxis} = this.getActivityChart(address, transactions);

    return (
      <CardContent>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Paper elevation={12}>
              <Echart
                option={{...option, series, xAxis}}
                style={{height: 600}}
              />
            </Paper>
          </Grid>
        </Grid>

      </CardContent>
    );
  }
}

TransactionsTable.propTypes = {
  address: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  transactions: PropTypes.array.isRequired,
};

export default withStyles(styles)(TransactionsTable);
