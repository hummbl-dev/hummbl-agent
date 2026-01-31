export const compareNetworkPermission = (a, b) => {
    const order = {
        none: 0,
        restricted: 1,
        open: 2,
    };
    return order[a] - order[b];
};
export const compareExecPermission = (a, b) => {
    const order = {
        none: 0,
        allowlisted: 1,
    };
    return order[a] - order[b];
};
export const compareRisk = (a, b) => {
    const order = {
        low: 0,
        medium: 1,
        high: 2,
    };
    return order[a] - order[b];
};
//# sourceMappingURL=policies.js.map