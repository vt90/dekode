import React from 'react';
import PropTypes from 'prop-types';
import windowSize from 'react-window-size';
import ReactTransactionsFlow from 'echarts-for-react';
import {getNodes, getChartHeight} from 'misc';

// import moment from 'moment';

// const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';

const TransactionsFlow = React.forwardRef(({
                                               analysedAddress,
                                               chartData,
                                               onAddressChange,
                                               windowWidth,
                                               transactions,
                                           }, ref) => {

        const chartHeight = getChartHeight(transactions);

        const getTransactions = (nodes) => {
                const sentForward = [];
                const sentBackward = [];

                transactions.forEach((transaction) => {
                        const {vin, vout} = transaction;

                        vin.forEach((vin) => {
                            const {address} = vin;
                            if (address) {
                                const from = nodes[address];
                                vout.forEach(vout => {
                                    if (vout.address) {
                                        const to = nodes[vout.address];
                                        sentForward.push({
                                            fromName: 'a',
                                            toName: 'b',
                                            coords: [[from.value[0], from.value[1]], [to.value[0], to.value[1]]],
                                            transaction,
                                        })
                                    }
                                })
                            }
                        })
                    }
                );

                return {
                    sentForward,
                    sentBackward,
                };
            }
        ;

        const getChartOptions = () => {
            const nodes = getNodes(transactions, windowWidth, chartHeight, analysedAddress);

            const {sentForward, sentBackward} = getTransactions(nodes);

            const displayNodes = Object.values(nodes);

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
                            // formatter: (props) => {
                            // const {data: {fromName, toName}} = props;
                            // let tooltip = `From <b>${fromName}</b><br>To <b>${toName}</b><br><br>Transactions:<br>`;
                            //
                            // sentForward
                            //     .filter((data) => data.fromName === fromName && data.toName === toName)
                            //     .map((data) => data.transaction)
                            //     .forEach((transaction, index) => {
                            //         tooltip += `${index + 1}: <b>${transaction.value}</b> ETH (${moment(transaction.timeStamp * 1000).format(DATE_TIME_FORMAT)})<br>`;
                            //     });
                            //
                            // return tooltip;
                            // }
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
                            // formatter: (props) => {
                            //     const {data: {fromName, toName}} = props;
                            //     let tooltip = `From <b>${fromName}</b><br>To <b>${toName}</b><br><br>Transactions:<br>`;
                            //
                            //     sentBackward
                            //         .filter((data) => data.fromName === fromName && data.toName === toName)
                            //         .map((data) => data.transaction)
                            //         .forEach((transaction, index) => {
                            //             tooltip += `${index + 1}: <b>${transaction.value}</b> ETH (${moment(transaction.timeStamp * 1000).format(DATE_TIME_FORMAT)})<br>`;
                            //         });
                            //
                            //     return tooltip;
                            // }
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
            // const {componentType, componentSubType, name, type} = event;
            //
            // if (
            //     type === 'click'
            //     && componentType === 'series'
            //     && componentSubType === 'scatter'
            // ) {
            //     onAddressChange(name);
            // }
        };

        console.log(' test', chartHeight);

        return (
            <div ref={ref}>
                {
                    transactions && transactions.length ? (
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
    }
    )
;

TransactionsFlow.propTypes = {
    analysedAddress: PropTypes.string.isRequired,
    onAddressChange: PropTypes.func.isRequired,
    windowWidth: PropTypes.number.isRequired,
};
TransactionsFlow.defaultProps = {
    onAddressChange: console.log,
};

export default windowSize(TransactionsFlow);
