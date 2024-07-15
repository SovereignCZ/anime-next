import React from 'react';

const HodnoceniEpizod = ({pocetEpizod = 12}) => {
    let sirka = 1200
    const vyska = 260
    let rozestup = sirka / pocetEpizod
    let label = []
    let body = []
    let bodka = []
    let pomocna = []
    let hodnoceni = []

    /*useEffect(() => {
        const handleResize = () => {
            sirka = Math.floor(document.getElementById('graf-epizody').clientWidth);
            // console.log(sirka)
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Spustit při prvním renderu

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);*/

    for (let i = 1; i <= pocetEpizod; i++) {
        const pozice = Math.random() * ((vyska - 40) - 40) + 40
        const hodnoceni = 10 - (pozice / vyska) * 10;
        label.push(<text x={(rozestup * i) - 40} y={vyska} key={i}>{i}</text>)
        body.push([(rozestup * i) - 35, pozice])
        bodka.push(<circle cx={(rozestup * i) - 35} cy={pozice} data-value="7.2" r="6" key={i}>
            <title>{hodnoceni}</title></circle>)
        // pomocna.push(<line x1={(rozestup * i) - 35} x2={(rozestup * i) - 35} y1="0" y2="300" stroke={"#ccc"} strokeDasharray={0} strokeWidth={1}></line>)
    }


    function changeBackground(e) {
        e.target.fill = '#fff';
    }


    return (
        <div id={"graf-epizody"} className={"overflow-auto"}>
            <svg className={"w-full"} height={vyska} xmlns="http://www.w3.org/2000/svg">
                <g className="labels y-labels">
                    <text x="0" y={vyska - 20}>0</text>
                    <text x="0" y="200">2</text>
                    <text x="0" y="160">4</text>
                    <text x="0" y="120">6</text>
                    <text x="0" y="80">8</text>
                    <text x="0" y="40">10</text>
                </g>
                <g className="grid x-grid" stroke={"#ccc"} strokeDasharray={0} strokeWidth={1}>
                    <line x1="30" x2="30" y1="0" y2={vyska - 20}></line>
                </g>
                <g className="grid y-grid" id="yGrid" stroke={"#ccc"} strokeDasharray={0} strokeWidth={1}>
                    <line x1="30" x2={sirka + 30} y1={vyska - 20} y2={vyska - 20}></line>
                </g>
                <g className="labels x-labels" fill={"black"}>
                    {label}
                </g>
                <g className="labels x-labels" fill={"black"}>
                    {pomocna}
                </g>
                <g className="labels x-labels" fill={"black"}>
                    <line x1={0} x2={1000} y1="200" y2="200" stroke={"#ccc"} strokeDasharray={0} strokeWidth={1}></line>
                    <line x1={0} x2={1000} y1="160" y2="160" stroke={"#ccc"} strokeDasharray={0} strokeWidth={1}></line>
                    <line x1={0} x2={1000} y1="120" y2="120" stroke={"#ccc"} strokeDasharray={0} strokeWidth={1}></line>
                    <line x1={0} x2={1000} y1="80" y2="80" stroke={"#ccc"} strokeDasharray={0} strokeWidth={1}></line>
                    <line x1={0} x2={1000} y1="40" y2="40" stroke={"#ccc"} strokeDasharray={0} strokeWidth={1}></line>
                </g>
                <polyline
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                    points={body}
                />
                <g data-setname="Our first data set">
                    {bodka}
                </g>
            </svg>
        </div>
    );
};

export default HodnoceniEpizod;