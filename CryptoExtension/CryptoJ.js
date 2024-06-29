let selectedCurrency = "USD";
currency=document.getElementById("currency").selectedOptions[0].value;

const API_KEY = "0c9f83b7d9ef47115c98c6df94c50623663a04ea5b399b4fc7821741c0d1561c";

const getDataBtcApi = async () =>
{
    let response = await fetch(`https://min-api.cryptocompare.com/data/v2/histominute?fsym=BTC&tsym=${currency}&limit=119&api_key=${API_KEY}`);

    const json = await response.json();
    const data = json.Data.Data;
    const times = data.map(obj => obj.time);
    const prices = data.map(obj => obj.high);
    return { times, prices };
}

const getDataDogeApi = async () => 
{
    let response = await fetch(`https://min-api.cryptocompare.com/data/v2/histominute?fsym=DOGE&tsym=${currency}&limit=119&api_key=${API_KEY}`);

    const json = await response.json();
    const data = json.Data.Data
    const times = data.map(obj => obj.time)
    const prices = data.map(obj => obj.high)
    return { times, prices }
}

const getDataEthApi = async () =>
{
    let response = await fetch(`https://min-api.cryptocompare.com/data/v2/histominute?fsym=ETH&tsym=${currency}&limit=119&api_key=${API_KEY}`);

    const json = await response.json();
    const data = json.Data.Data
    const times = data.map(obj => obj.time)
    const prices = data.map(obj => obj.high)
    return { times, prices } //gi vrakjame vremeto i cenite za toa vreme
}

async function displayBtcChart()
{
    let { times, prices } = await getDataBtcApi()
    let btcChart = document.getElementById('btcChart');

    new Chart(btcChart,
    {
        type: 'line',

        data:
        {
            labels: times,
            datasets:[{ data: prices, backgroundColor: 'rgb(53,53,233)', borderColor: "black", pointRadius: 0, pointHitRadius: 15}]
        },

        options:
        {
            tooltips: //krieme datum i boja
            {
                callbacks:
                {
                    title: function() {}
                },

                displayColors: false,
                backgroundColor: 'rgba(0,0,0,0.9)',
                bodyFontSize: 15,
                fontWeight: "bolder"
            },

            scales: //go krieme grafikot
            {
                xAxes: [{display: false}], yAxes: [{display: false}]
            },

            legend:
            {
                display: false
            }
        }
    });
}


async function displayDogeChart()
{
    let { times, prices } = await getDataDogeApi()
    let dogeChart = document.getElementById('dogeChart');

    new Chart(dogeChart, {
        type: 'line',

        data:
            {
                labels: times,
                datasets:[{ data: prices, backgroundColor: 'rgb(7,124,14)', borderColor: "black", pointRadius: 0, pointHitRadius: 15}]
            },

        options:
            {
                scales: //go krieme grafikot
                    {
                        xAxes: [{display: false}], yAxes: [{display: false}]
                    },

                legend:
                    {
                        display: false
                    }
            }
    });
}

async function displayEthChart()
{
    let { times, prices } = await getDataEthApi()
    let ethChart = document.getElementById('ethChart');

    new Chart(ethChart, {

        type: 'line',
        data:
        {
            labels: times,
            datasets:[{ data: prices, backgroundColor: 'rgb(198,17,17)', borderColor: "black", pointRadius: 0, pointHitRadius: 15}]
        },

        options:
        {
            tooltips: //krieme datum i boja
            {
                callbacks:
                {
                    title: function() {}
                },

                displayColors: false,
                backgroundColor: 'rgba(0,0,0,0.9)',
                bodyFontSize: 15,
                fontWeight: "bolder"
            },

            scales: //go krieme grafikot
            {
                xAxes: [{display: false}], yAxes: [{display: false}]
            },

            legend:
            {
                display: false
            }
        }
    });
}

function onSubmitClicked(e) //koga ke se klikne submit se izvrsuva ovaa funkcija
{
    e.preventDefault(); // (ne sakame da ne odnese na druga strana) ne dakame da ispratime nikakvi podatoci do nikade
    selectedCurrency = document.getElementById("currency").selectedOptions[0].value; //go zema prviot selektiran element od select boxot

    updateETH()
    updateDOGE()
    updateBTC()

    location.reload(); //koga ke se klikne submit se reloadnuva samata
    return false;
}

var b;

if(currency=="USD")
{
    b="$";
}
else if(currency=="EUR")
{
    b="€";
}
else if(currency=="GBP")
{
    b="£";
}

async function updateBTC()
{
    let { prices } = await getDataBtcApi()
    let currentPrice = prices[prices.length-1].toFixed(3);

    document.getElementById("btcPrice").innerHTML = currentPrice +" "+b;
}

async function updateDOGE()
{
    let { prices } = await getDataDogeApi()
    let currentPrice = prices[prices.length-1].toFixed(3);

    document.getElementById("atomPrice").innerHTML = currentPrice+" "+b;
}

async function updateETH()
{
    let { prices } = await getDataEthApi()
    let currentPrice = prices[prices.length-1].toFixed(3);

    document.getElementById("ethPrice").innerHTML = currentPrice+" "+b;
}

async function main()
{
    await Promise.all([updateBTC(), updateDOGE(), updateETH()]);

    document.getElementById("currencyForm").addEventListener("submit", onSubmitClicked); //kazuvame koga ke klikneme na kopceto ("submit") izvrsi ja funkcijata posle zapirakata

    await Promise.all([displayBtcChart(), displayDogeChart(), displayEthChart()]);
}
main();

