import pickBy from 'lodash/pickBy';
import maxBy from "lodash/maxBy";

// removes null, "" from an search param object
export const getSearchParams = params => pickBy(params, value => value !== null && value !== "");

export const GRAPH_ITEM_HEIGHT = 100;

export const getChartHeight = (transactions) => {
    let chartHeight = 0;
    if (transactions && transactions.length) {
        const maxNodes = maxBy(transactions, (transaction) => transaction.vin.length + transaction.vout.length);

        chartHeight = (maxNodes.vin.length + maxNodes.vout.length) * GRAPH_ITEM_HEIGHT;
    }

    return chartHeight;
};

export const getNodes = (
    transactions,
    windowWidth,
    chartHeight,
    analysedAddress,
) => {
    const displayNodes = {};
    const xOffset = (windowWidth - 400) / (transactions.length - 1);
    let x = 60;

    transactions.forEach(transaction => {
        let yOffset = (chartHeight - (transaction.vin.length + transaction.vout.length) * GRAPH_ITEM_HEIGHT) / ((transaction.vin.length + transaction.vout.length) + 1);
        let y = yOffset + GRAPH_ITEM_HEIGHT;

        transaction.vin.forEach(entry => {
            if (entry.address) {
                const {address} = entry;
                const isAnalysed = address.toLowerCase() === analysedAddress.toLowerCase();
                const symbol = `image:///icons/${isAnalysed ? 'incognito' : 'account'}.png`;
                displayNodes[address] = {
                    name: address,
                    value: [x, y, 4],
                    symbolSize: isAnalysed ? 58 : 50,
                    symbol,
                };

                y += GRAPH_ITEM_HEIGHT + yOffset;
            }
        });

        transaction.vout.forEach(entry => {
            if (entry.address) {
                const {address} = entry;
                const isAnalysed = address.toLowerCase() === analysedAddress.toLowerCase();
                const symbol = `image:///icons/${isAnalysed ? 'incognito' : 'account'}.png`;
                displayNodes[address] = {
                    name: address,
                    value: [x, y, 4],
                    symbolSize: isAnalysed ? 58 : 50,
                    symbol,
                };

                y += GRAPH_ITEM_HEIGHT + yOffset;
            }
        });

        x += xOffset;

    });

    return displayNodes;
};
