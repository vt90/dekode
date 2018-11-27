/**
 * Created by vladtomsa on 26/11/2018
 */
import React from 'react';
import PropTypes from 'prop-types';
import windowSize from 'react-window-size';
import ReactTransactionsFlow from 'echarts-for-react';
import maxBy from 'lodash/maxBy';
import moment from 'moment';
import { DATE_TIME_FORMAT } from '../../../../constants';

const GRAPH_ITEM_HEIGHT = 100;

const TransactionsFlow = ({analysedAddress, chartData, onAddressChange, windowWidth}) => {
  let chartHeight = 0;

  if (chartData && chartData.nodes && chartData.nodes.length) {
    const maxNodes = maxBy(chartData.nodes, (nodes) => nodes.length);

    chartHeight = maxNodes.length * GRAPH_ITEM_HEIGHT;
  }

  const getPositions = () => {
    const {nodes} = chartData;
    const displayNodes = [];
    const xOffset = (windowWidth - 120) / (nodes.length - 1);
    let x = 60;

    nodes.forEach((node) => {
      const yOffset = (chartHeight - node.length * GRAPH_ITEM_HEIGHT) / (node.length + 1);
      let y = yOffset + GRAPH_ITEM_HEIGHT;

      node.forEach((address, index) => {
        const isAnalysed = address.id.toLowerCase() === analysedAddress.toLowerCase();
        const symbol = `image:///icons/${ isAnalysed ? 'incognito' : 'account'}.png`;
        displayNodes.push({
          name: address.id,
          value: [x, y, 4],
          symbolSize: isAnalysed ? 58 : 50,
          symbol,
          // itemStyle: {
          //   normal: {
          //     color: isAnalysed ? '#FFFFFF' : '#F58158',
          //   }
          // }
        });

        y += GRAPH_ITEM_HEIGHT + yOffset;
      });

      x += xOffset;
    });

    return displayNodes;
  };

  const getTransactions = (nodes) => {
    const {transactions} = chartData;
    const sentForward = [];
    const sentBackward = [];

    transactions.forEach((transaction) => {
      let from;
      let to;

      nodes.forEach((n) => {
        if (n.name.toLowerCase() === transaction.from.toLowerCase()) from = n;

        if (n.name.toLowerCase() === transaction.to.toLowerCase()) to = n;
      });

      // on the X axis
      if (from.value[0] < to.value[0]) {
        sentForward.push({
          fromName: transaction.from.toLowerCase(),
          toName: transaction.to.toLowerCase(),
          coords: [[from.value[0], from.value[1]], [to.value[0], to.value[1]]],
          transaction,
        })
      }
      else {
        sentBackward.push({
          fromName: transaction.from.toLowerCase(),
          toName: transaction.to.toLowerCase(),
          coords: [[from.value[0], from.value[1]], [to.value[0], to.value[1]]],
          transaction,
        })
      }

    });

    return {
      sentForward,
      sentBackward,
    };
  };

  const getChartOptions = () => {
    const displayNodes = getPositions();

    const {sentForward, sentBackward} = getTransactions(displayNodes);

    return {
      backgroundColor: 'rgba(0,0,0,0)',
      // title: {
      //   text: 'Transactions flow',
      //   subtext: 'Address here'
      // },
      tooltip: {
        trigger: 'item',
        formatter: "{b}"
      },
      // toolbox: {
      //   feature: {
      //     dataView: {readOnly: false},
      //     restore: {},
      //     saveAsImage: {}
      //   }
      // },
      // legend: {
      //     data: ['展现','点击','访问','咨询','订单']
      // },
      geo: {
        map: 'Position map',
        label: {
          emphasis: {
            show: false
          }
        },
        roam: true,
        itemStyle: {
          normal: {
            areaColor: '#323c48',
            borderColor: '#404a59'
          },
          emphasis: {
            areaColor: '#2a333d'
          }
        }
      },
      series: [
        // position addresses on map
        {
          name: 'Addresses',
          //type: 'effectScatter',
          type: 'scatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: {
            brushType: 'stroke',
            period: 7,
            scale: 26
          },
          label: {
            // normal: {
            //     show: true,
            //     position: 'top',
            //     formatter: '{b}',
            //     color: 'white',
            // },
            // emphasis: {
            //   show: true,
            //   // position: 'right',
            //   formatter: '{b}',
            //   color: 'white',
            // }
          },
          showEffectOn: 'render',
          itemStyle: {
            normal: {
              color: '#46bee9'
            }
          },
          data: displayNodes,
        },
        // create lines for sent transactions
        {
          name: 'Sent transactions',
          type: 'lines',
          coordinateSystem: 'geo',
          zlevel: 2,
          large: true,
          tooltip: {
            trigger: 'item',
            formatter: (props) => {
              const { data: { fromName, toName } } = props;
              let tooltip = `From <b>${fromName}</b><br>To <b>${toName}</b><br><br>Transactions:<br>`;

              sentForward
                .filter((data) => data.fromName === fromName && data.toName === toName)
                .map((data) => data.transaction)
                .forEach((transaction, index) => {
                  tooltip += `${index + 1}: <b>${transaction.value}</b> ETH (${moment(transaction.timeStamp * 1000).format(DATE_TIME_FORMAT)})<br>`;
                });

              return tooltip;
            }
          },
          effect: {
            show: true,
            constantSpeed: 30,
            symbol: 'arrow',//ECharts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
            symbolSize: 8,
            trailLength: 0,
          },

          lineStyle: {
            normal: {
              color: '#66bb6a',
              width: 3,
              opacity: 0.6,
              curveness: 0.1
            }
          },
          data: sentForward,
        },
        {
          name: '线路',
          type: 'lines',
          coordinateSystem: 'geo',
          zlevel: 2,
          large: true,
          tooltip: {
            trigger: 'item',
            formatter: (props) => {
              const { data: { fromName, toName } } = props;
              let tooltip = `From <b>${fromName}</b><br>To <b>${toName}</b><br><br>Transactions:<br>`;

              sentBackward
                .filter((data) => data.fromName === fromName && data.toName === toName)
                .map((data) => data.transaction)
                .forEach((transaction, index) => {
                  tooltip += `${index + 1}: <b>${transaction.value}</b> ETH (${moment(transaction.timeStamp * 1000).format(DATE_TIME_FORMAT)})<br>`;
                });

              return tooltip;
            }
          },
          effect: {
            show: true,
            constantSpeed: 30,
            symbol: 'arrow',
            symbolSize: 8,
            trailLength: 0,
          },
          lineStyle: {
            normal: {
              color: '#ffa726',
              width: 3,
              opacity: 1,
              curveness: 0.2
            }
          },
          data: sentBackward
        }
      ]
    };
  };

  const onChartClick = (event) => {
    const {componentType, componentSubType, name, type} = event;

    if (
      type === 'click'
      && componentType === 'series'
      && componentSubType === 'scatter'
    ) {
      onAddressChange(name);
    }
  };

  return (
    <div>
      {
        chartData
        && chartData.nodes
        && chartData.nodes.length
          ? (
            <div>
              <ReactTransactionsFlow
                option={getChartOptions()}
                style={{height: chartHeight + 300}}
                onEvents={{
                  click: onChartClick
                }}
              />
            </div>
          )
          : null
      }
    </div>
  );
};

TransactionsFlow.propTypes = {
  analysedAddress: PropTypes.string.isRequired,
  chartData: PropTypes.object.isRequired,
  onAddressChange: PropTypes.func.isRequired,
  windowWidth: PropTypes.number.isRequired,
};

export default windowSize(TransactionsFlow);
