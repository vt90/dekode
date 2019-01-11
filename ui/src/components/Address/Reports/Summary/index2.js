/**
 * Created by vladtomsa on 10/01/2019
 *//**
 * Created by vladtomsa on 10/01/2019
 */

import React from 'react';
import ReactEcharts from 'echarts-for-react';

const GRAPH_ITEM_HEIGHT = 100;

/*---------------------数据----------------------------*/


/*
* "nrOfAddresses": 2,
    "nrOfBlackListedAddresses": 1,
    "nrOfGrayListedAddresses": 1,
* */

const getOption = ({
                       nrOfAddresses = 3,
                       nrOfBlackListedAddresses = 2,
                       nrOfGrayListedAddresses = 1,
                   }) => {

    const blackListedData = [{
        value: nrOfBlackListedAddresses,
        name: 'black listed addresses'
    }, {
        value: nrOfAddresses - nrOfBlackListedAddresses,
        labelLine: {
            normal: {
                show: false
            }
        }
    }];

    const greyListedData = [{
        value: nrOfGrayListedAddresses,
        name: 'addresses being analysed'
    }, {
        value: nrOfAddresses - nrOfGrayListedAddresses,
        name: '',
        labelLine: {
            normal: {
                show: false
            }
        }
    }];

    const blackListedColor = [{
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
            offset: 0.2,
            color: 'rgba(235,41,125,0.1)' // 0%
        }, {
            offset: 1,
            color: 'rgba(235,41,125,0.8)' // 100%
        }],
        globalCoord: false
    }, 'none'];

    const greyListedColor = [{
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
            offset: 0.3,
            color: 'rgba(63,218,255,0.1)' // 0%
        }, {
            offset: 1,
            color: 'rgba(63,218,255,0.8)' // 100%
        }],
        globalCoord: false
    }, 'none'];

    const rich = {
        exemptname: {
            color: '#115b70',
            fontSize: 14,
            padding: [0, 0]
        },
        examptdata: {
            color: '#eb297d',
            fontSize: 30,
            padding: [0, 0],
            fontWeight: 'bold'
        },
        exemname: {
            color: '#115b70',
            fontSize: 14 ,
            padding: [0, 0]
        },
        examdata: {
            color: '#3fdaff',
            fontSize: 30,
            padding: [0, 0],
            fontWeight: 'bold'
        },
        // rectblue: {
        //     width: 14,
        //     height: 14,
        //     borderRadius: 3,
        //     backgroundColor: "#3fdaff",
        // },
        // rectred: {
        //     width: 14,
        //     height: 14,
        //     borderRadius: 3,
        //     backgroundColor: '#eb297d'
        // },
        space: {
            padding: [20, 10, 90, 40]
        }
    }


    const option = {
        // backgroundColor: '#031f2d',
        series: [
            //内圈圆环

            //免考人数圆环
            {
                name: 'vlad',
                type: 'pie',
                clockWise: false, //顺时加载
                hoverAnimation: false, //鼠标移入变大
                startAngle: 0,
                center: ['50%', '55%'],
                radius: ['60%', '50%'],
                color: blackListedColor,
                label: {
                    normal: {
                        formatter: function (params) {
                            if (params.dataIndex === 0) {
                                return '{examptdata|' + params.value + '}\n{exemptname|' + params.name + '}';
                            }
                        },
                        rich: rich
                    }
                },
                labelLine: {
                    normal: {
                        length: 90,
                        length2: 10,
                        lineStyle: {
                            color: '#eb297d',
                        }
                    }
                },
                data: blackListedData,
            },
            // Grey addresses
            {
                type: 'pie',
                clockWise: false,
                hoverAnimation: false,
                center: ['50%', '55%'],
                radius: ['75%', '65%'],
                color: greyListedColor,
                label: {
                    normal: {
                        formatter: function (params) {
                            if (params.dataIndex === 0) {
                                return '{examdata|' + params.value + '}\n{exemname|' + params.name + '}';
                            }
                        },
                        rich: rich
                    }
                },
                labelLine: {
                    normal: {
                        length: 70,
                        length2: 10,
                        lineStyle: {
                            color: '#3fdaff',
                        }
                    }
                },
                data: greyListedData,
            },
            // Total addresses
            {
                type: 'pie',
                clockWise: false,
                hoverAnimation: false,
                center: ['50%', '55%'],
                radius: ['85%', '85%'],
                label: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    {
                        value: nrOfAddresses,
                        name: '',
                        itemStyle: {
                            normal: {
                                borderWidth: 3,
                                borderColor: '#0b5263'
                            }
                        }
                    },
                ]
            },
        ]
    };

    return option;

};

const SummaryReport = ({
                           nrOfAddresses = 3,
                           nrOfBlackListedAddresses = 2,
                           nrOfGrayListedAddresses = 1,
                       }) => {
    return (
        <div>
            <ReactEcharts option={getOption({})}
                          style={{height: 600, width: '100%'}}
            />
        </div>
    );
};

export default SummaryReport;

/*
*
* const onChartClick = (event) => {
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
* */
