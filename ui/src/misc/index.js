import pickBy from 'lodash/pickBy';
import maxBy from "lodash/maxBy";

// removes null, "" from an search param object
export const getSearchParams = params => pickBy(params, value => value !== null && value !== "");

export const GRAPH_ITEM_HEIGHT = 100;

export const getChartHeight = (nodes) => {
    let chartHeight = 0;
    if (nodes && nodes.length) {
        const maxNodes = maxBy(nodes, (nodes) => nodes.length);

        chartHeight = maxNodes.length * GRAPH_ITEM_HEIGHT;
    }

    return chartHeight;
};

export const getNodes = (
    nodes,
    windowWidth,
    chartHeight,
    analysedAddress,
) => {
    const displayNodes = [];
    // const xOffset = (windowWidth - 120) / (nodes.length - 1);
    const xOffset = (windowWidth - 300) / (nodes.length - 1);
    let x = 60;

    nodes.forEach((node) => {
        const yOffset = (chartHeight - node.length * GRAPH_ITEM_HEIGHT) / (node.length + 1);
        let y = yOffset + GRAPH_ITEM_HEIGHT;

        node.forEach((address) => {
            const isAnalysed = address.toLowerCase() === analysedAddress.toLowerCase();
            const symbol = `image:///icons/${isAnalysed ? 'incognito' : 'account'}.png`;
            displayNodes.push({
                name: address,
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
