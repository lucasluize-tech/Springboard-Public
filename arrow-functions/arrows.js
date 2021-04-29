const dailyRainTotals = [[1.2,0.35, 2.2],[1.7,0.6,0.1],[2.5,0.9,1.5]];

//return new array , with sum of other arrays. 
const sumOfDrt = dailyRainTotals.map((hourlyRainTotals) => {
    return hourlyRainTotals.reduce((sum, next)=>{
        return sum + next;
    })
});

//with implicit returns

const sumOfDrt_implicit = dailyRainTotals.map((h) => (
    h.reduce((s,n) => s + n )));