import {parseISO} from "date-fns/parseISO";
import {format} from "date-fns/format";
import React from 'react';
import {ROUTE_DISKUZE_DETAIL, ROUTE_PROFIL_DETAIL} from "../../routes.jsx";
import Link from "next/link";

const DiskuzeSeznam = ({diskuze}) => {
    return (
        <>
            {diskuze.map(r => (
                <div className={"py-1.5 [&:not(:last-child)]:border-b border-sky-300"} key={r.id_topic}>
                    <div className={"flex justify-between"}>
                        <h5><Link href={ROUTE_DISKUZE_DETAIL(r.id_topic)}>{r.predmet}</Link></h5>
                        <div className={"flex"} style={{fontSize: '.75'}}>
                            <div className={"pr-3"}><i className={"far fa-eye pr-1"}/>{r.zobrazeni}</div>
                            <div><i className={"fas fa-comments pr-1"}></i>{r.prispevky}</div>
                        </div>
                    </div>
                    <div className={"flex justify-between"}>
                        <div className={"flex"}>
                            <img className="h-5 w-5 rounded-full mr-2"
                                 src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAIAAACzY+a1AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAFN0lEQVR4nO3dPWubVxjG8etxnJh4KKGQJZsCoXMFAtExY5eCpgS8eUsHQ4ZO7qYv4KFbvQm6GfIBmrEIDM4HKMRbxhBCMaShVoeTF8vW2yPd59wv5/rP0uGRf3oxPIdzN5PJBBKdjM8ADPpdkdUEe/HDK6mlfvrre5F1ZP9WWyKrpPaOjtPFsQWdjM/2jo4FF5QkBBWXJe4HcUJQcX45/JCDEFScVSY/ZCIEFafL54d8hKDi57L6ISshqJjfD7kJUbdiAT8UIEStimX8UIYQ9SkW80MxQtSkWNIPJQlRh2JhPxQmRHTF8n4oT4i4iip+UCFEREUtP2gRIpaioh8UCRFFUdcPuoTwr6juB3VCeFa04AcLhPCpaMQPRgjhTdGOH+wQwo+iKT+YIoQHRWt+ALa1L+B6e0fHI6B/8VD7QmZk0A9Ac/fJM6m1Rgf7Ukv1Lx6eHp6LLNUbdh48vieylOA3hOBbQfJTKLuVuzfsSClKJfkC5Qht/RZe7cHje71hR/sqHGSXEFRcLdOEoOIKWScEFZflgBBUXJgPQlBxfm4IQcU5eSIEFWfljBBUvJE/QlBxOpeEoOKVvBKCip9zTAgqAvBOCCoGIET1ihEIUbdiEEJUrBiHELUqhiJElYrRCFGfYkBCVKYYkxA1KYYlRDWKjdSpwG9evgMgten2919/afX4t1s7f9/+ptVTHn18/+3lh1ZPuf/n01aPX5DUAcOQ+hS+efnO2rbdpTWQee+qJ0Do0Q9Ao30BUm1K6NQPJEz59QO/SOHcD4H+F1/zhXj3A9AI/Suu3jqEAfxQ829hDD8AO5P/tC9BpnaEYfwA3Krw35lIfpFalZB+ZluJkH6WW05IP+MtIaSf/RYR0s9Fc8+d0fV7u7XT6vF3cPno4/tWT/m32fqnud3qKfdbPbpUswnVP38F7t+ucZf4u1aPLtWML1J1P9aq64T0c9cUIf089pWQfk77REg/v22Bfs7bpp9KadutSNsApLY8S74VfhRbSTCp/buCH5vesLMttf+alS+dWR1mH1d1fTlznIQuu3pmPAn9de3MfxI66+bMBhJ6aubMDRK6ad7MFHMDf1Jt79/ewWWBu8SKLZh5Y5SwwP3bNe4Sa7V4ZhG/SK23dOYUCU23yswwEtptxZlvJDTa6jP7SGixVjMXSWiutjMzSWirNWaektBQ682sJaGV1p45TEITbTIzmoT6bTjzm4TKbT6znYSabe4HEiom4gcSaiXlB6C5++SZyEIALv74TWopqWTPKhZs9+nPUkvF/xSeHp4L7n43WHxCRFesghChFWshRFzFiggRVLEuQkRUrI4Q4RRrJEQsxUoJEUixXkJEUayaECEUayeEf0USAs4VSfgpv4ok/JpTRRJO5VGRhNdzp0jCGflSJOHsHCmScG5eFEm4KBeKJFySfUUSLs+4ouS5MyfjM6mlBv2u1FIinR6e94ad8e5r7QuZUTMRmkp8Mj7bOzoWWWp0sH/rudioXakzjwGMd18Lvkapt6m505/Sa3uBV1ILCm7lHqA7AqQUpbL1Wyj43szUoN8dHexrX8VUhgjt+6WsKVoh9OKXMqVogtCXX8qOoj6hR7+UEUVlQr9+KQuKmoTe/VLqimqEMfxSuoo6hJH8UoqKCoTx/FJaiqUJo/qlVBSLEsb2S5VXLEdYg1+qsGIhwnr8UiUVSxDW5pcqppidsE6/VBnFvIQ1+6UKKGYkpF8qt2IuQvpdLatiFkL63Syfojwh/eaVSVGYkH6Ly6EouQmRfqs06HdHogv+D7VStxJNFXkVAAAAAElFTkSuQmCC"
                                 alt=""
                            />
                            <Link
                                href={ROUTE_PROFIL_DETAIL(1, "Sovereign")}>Sovereign</Link>&nbsp;|&nbsp;{format(parseISO(r.pridano), 'd. M. R, H:mm')}
                        </div>
                        <div>
                            <Link
                                href={ROUTE_PROFIL_DETAIL(1, "Sovereign")}>Sovereign</Link>&nbsp;|&nbsp;12.
                            5. 2024, 16:28
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default DiskuzeSeznam;