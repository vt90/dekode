/**
 * Created by vladtomsa on 10/01/2019
 */
import React, {PureComponent} from 'react';
// import { RadialBarChart, RadialBar, ResponsiveContainer, LabelList, Legend, Tooltip} from 'recharts';
import { RadialBarChart, RadialBar, ResponsiveContainer,  Legend} from 'recharts';
import {
    amber,
    green,
    cyan,
    pink,
} from '@material-ui/core/colors';

const colors = [
    {
        name: 'amber',
        color: amber[500],
    },
    {
        name: 'green',
        color: green['A400'],
    },
    {
        name: 'cyan',
        color: cyan[500],
    },
    {
        name: 'pink',
        color: pink[500],
    },
];

class SummaryReport extends PureComponent {
    render() {
        const {
            // nrOfAddresses,
            nrOfBlackListedAddresses,
            nrOfGrayListedAddresses,
            nrOfVerifiedAddresses,
            height = 400,
        } = this.props;

        const data = [
            { name: 'Verified addresses', value: nrOfVerifiedAddresses, fill: 'url(#green)', color: 'green'},
            { name: 'Blacked addresses', value: nrOfBlackListedAddresses, fill: 'url(#pink)', color: 'pink'},
            { name: 'Addresses being processed', value: nrOfGrayListedAddresses, fill: 'url(#amber)', color: 'amber'},
            // { name: 'Total address', value: nrOfAddresses, fill: 'url(#cyan)', color: 'cyan'},
        ];

        return (
            <ResponsiveContainer height={height}>
                <RadialBarChart
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius="20%"
                    outerRadius="90%"
                    barSize={8}
                >
                    {
                        colors.map(color => (
                            <defs key={color.name}>
                                <linearGradient id={`${color.name}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={color.color} stopOpacity={1}/>
                                    <stop offset="95%" stopColor={color.color} stopOpacity={0.2}/>
                                </linearGradient>
                            </defs>
                        ))
                    }
                    <RadialBar
                        dataKey="value"
                        clockWise={false}
                    />

                    <Legend
                        verticalAlign="middle"
                        content={(props) => {
                            const { payload } = props;

                            return (
                                <div >
                                    {
                                        payload.map(item => {
                                            const { color, value } = item.payload;
                                            const itemColor = colors.find(c => c.name === color);

                                            return (
                                                <p key={item.value} style={{ color: itemColor.color }}>
                                                    <strong style={{ fontSize: 42, fontWeight: 300, }}>{value}</strong>&nbsp;
                                                    <span style={{opacity: 0.75, fontSize: 18}}>{item.value}</span>
                                                </p>);
                                        })
                                    }
                                </div>
                            )
                        }}
                    />

                    {/*<Tooltip*/}
                    {/*cursor={{ stroke: 'red', strokeWidth: 2 }}*/}
                    {/*/>*/}
                </RadialBarChart>
            </ResponsiveContainer>

        );
    }
}

export default SummaryReport;
