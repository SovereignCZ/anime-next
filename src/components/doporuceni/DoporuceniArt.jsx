import React from 'react';
import {ROUTE_PROFIL_DETAIL} from "#comp/routes.jsx";
import Link from "next/link";

const img = 'data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAIAAACzY+a1AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAFN0lEQVR4nO3dPWubVxjG8etxnJh4KKGQJZsCoXMFAtExY5eCpgS8eUsHQ4ZO7qYv4KFbvQm6GfIBmrEIDM4HKMRbxhBCMaShVoeTF8vW2yPd59wv5/rP0uGRf3oxPIdzN5PJBBKdjM8ADPpdkdUEe/HDK6mlfvrre5F1ZP9WWyKrpPaOjtPFsQWdjM/2jo4FF5QkBBWXJe4HcUJQcX45/JCDEFScVSY/ZCIEFafL54d8hKDi57L6ISshqJjfD7kJUbdiAT8UIEStimX8UIYQ9SkW80MxQtSkWNIPJQlRh2JhPxQmRHTF8n4oT4i4iip+UCFEREUtP2gRIpaioh8UCRFFUdcPuoTwr6juB3VCeFa04AcLhPCpaMQPRgjhTdGOH+wQwo+iKT+YIoQHRWt+ALa1L+B6e0fHI6B/8VD7QmZk0A9Ac/fJM6m1Rgf7Ukv1Lx6eHp6LLNUbdh48vieylOA3hOBbQfJTKLuVuzfsSClKJfkC5Qht/RZe7cHje71hR/sqHGSXEFRcLdOEoOIKWScEFZflgBBUXJgPQlBxfm4IQcU5eSIEFWfljBBUvJE/QlBxOpeEoOKVvBKCip9zTAgqAvBOCCoGIET1ihEIUbdiEEJUrBiHELUqhiJElYrRCFGfYkBCVKYYkxA1KYYlRDWKjdSpwG9evgMgten2919/afX4t1s7f9/+ptVTHn18/+3lh1ZPuf/n01aPX5DUAcOQ+hS+efnO2rbdpTWQee+qJ0Do0Q9Ao30BUm1K6NQPJEz59QO/SOHcD4H+F1/zhXj3A9AI/Suu3jqEAfxQ829hDD8AO5P/tC9BpnaEYfwA3Krw35lIfpFalZB+ZluJkH6WW05IP+MtIaSf/RYR0s9Fc8+d0fV7u7XT6vF3cPno4/tWT/m32fqnud3qKfdbPbpUswnVP38F7t+ucZf4u1aPLtWML1J1P9aq64T0c9cUIf089pWQfk77REg/v22Bfs7bpp9KadutSNsApLY8S74VfhRbSTCp/buCH5vesLMttf+alS+dWR1mH1d1fTlznIQuu3pmPAn9de3MfxI66+bMBhJ6aubMDRK6ad7MFHMDf1Jt79/ewWWBu8SKLZh5Y5SwwP3bNe4Sa7V4ZhG/SK23dOYUCU23yswwEtptxZlvJDTa6jP7SGixVjMXSWiutjMzSWirNWaektBQ682sJaGV1p45TEITbTIzmoT6bTjzm4TKbT6znYSabe4HEiom4gcSaiXlB6C5++SZyEIALv74TWopqWTPKhZs9+nPUkvF/xSeHp4L7n43WHxCRFesghChFWshRFzFiggRVLEuQkRUrI4Q4RRrJEQsxUoJEUixXkJEUayaECEUayeEf0USAs4VSfgpv4ok/JpTRRJO5VGRhNdzp0jCGflSJOHsHCmScG5eFEm4KBeKJFySfUUSLs+4ouS5MyfjM6mlBv2u1FIinR6e94ad8e5r7QuZUTMRmkp8Mj7bOzoWWWp0sH/rudioXakzjwGMd18Lvkapt6m505/Sa3uBV1ILCm7lHqA7AqQUpbL1Wyj43szUoN8dHexrX8VUhgjt+6WsKVoh9OKXMqVogtCXX8qOoj6hR7+UEUVlQr9+KQuKmoTe/VLqimqEMfxSuoo6hJH8UoqKCoTx/FJaiqUJo/qlVBSLEsb2S5VXLEdYg1+qsGIhwnr8UiUVSxDW5pcqppidsE6/VBnFvIQ1+6UKKGYkpF8qt2IuQvpdLatiFkL63Syfojwh/eaVSVGYkH6Ly6EouQmRfqs06HdHogv+D7VStxJNFXkVAAAAAElFTkSuQmCC'
const DoporuceniArt = ({typArt, idArt}) => {
    return (
        <div>
            <div className={"flex flex-1 justify-between bg-gray-400"}>
                <div><i className="far fa-grin-hearts" style={{fontSize: '1.5em'}}></i></div>
                <div><i className="fas fa-meh" style={{fontSize: '1.5em'}}></i></div>
                <div><i className="fas fa-angry" style={{fontSize: '1.5em'}}></i></div>
            </div>
            <div className={"flex w-full"}>
                <div className={"flex flex-row"}>
                    <div className={"shrink-0"}>
                        <div className={"flex flex-col pt-2.5 pr-2.5"}>
                            <Link href={ROUTE_PROFIL_DETAIL(1, 'Sovereign')}>
                                <img src={img} alt={"Img Sove"} className={"w-24 h-24 rounded-full mb-2.5"}/>
                            </Link>
                            <div className={"py-0.5"}>
                                <Link href={ROUTE_PROFIL_DETAIL(1, 'Sovereign')}>Sovereign</Link>
                            </div>
                            <div className={"py-0.5 text-xs"}>3. 6. 2024</div>
                            <div className={"py-0.5 text-xs"}>
                                <i className="fas fa-grin-hearts" style={{fontSize: '1.5em'}}/>
                            </div>
                            <div className={"py-0.5 text-xs"}>3 / 12</div>
                        </div>
                    </div>
                    <div className={""}>
                        <div>
                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam justo enim, consectetuer
                                nec, ullamcorper ac, vestibulum in, elit. Aliquam erat volutpat. Phasellus enim erat,
                                vestibulum vel, aliquam a, posuere eu, velit. Ut enim ad minima veniam, quis nostrum
                                exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
                                consequatur? Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                                dolore eu
                                fugiat nulla pariatur. In sem justo, commodo ut, suscipit at, pharetra vitae, orci.
                                Class
                                aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos.
                                Nullam
                                sit amet magna in magna gravida vehicula. Temporibus autem quibusdam et aut officiis
                                debitis
                                aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae
                                non
                                recusandae. Pellentesque sapien. Maecenas lorem. Aliquam id dolor. Mauris dictum
                                facilisis
                                augue. Aliquam in lorem sit amet leo accumsan lacinia. Quisque porta. Morbi leo mi,
                                nonummy
                                eget tristique non, rhoncus non leo. Mauris suscipit, ligula sit amet pharetra semper,
                                nibh
                                ante cursus purus, vel sagittis velit mauris vel metus. Proin pede metus, vulputate nec,
                                fermentum fringilla, vehicula vitae, justo. Nullam sit amet magna in magna gravida
                                vehicula.</p>

                            <p>Integer lacinia. Pellentesque arcu. Mauris tincidunt sem sed arcu. Praesent dapibus.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                mollit
                                anim id est laborum. Sed vel lectus. Donec odio tempus molestie, porttitor ut, iaculis
                                quis,
                                sem. Etiam bibendum elit eget erat. Fusce wisi. Phasellus enim erat, vestibulum vel,
                                aliquam
                                a, posuere eu, velit. Suspendisse sagittis ultrices augue. Fusce aliquam vestibulum
                                ipsum.
                                Proin in tellus sit amet nibh dignissim sagittis. Nullam rhoncus aliquam metus. Mauris
                                tincidunt sem sed arcu. Etiam dui sem, fermentum vitae, sagittis id, malesuada in, quam.
                                Cum
                                sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc
                                tincidunt ante vitae massa. Morbi leo mi, nonummy eget tristique non, rhoncus non leo.
                                Cum
                                sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DoporuceniArt;