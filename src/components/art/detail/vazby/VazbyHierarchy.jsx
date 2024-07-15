import React, {useCallback, useEffect} from 'react';
import {useQuery} from "@tanstack/react-query";
import {Panel, ReactFlow, ReactFlowProvider, useEdgesState, useNodesState, useReactFlow} from "reactflow";
import 'reactflow/dist/style.css';
import ELK from 'elkjs/lib/elk.bundled.js';
// import * as Dagre from "@dagrejs/dagre";
import './reactflow.scss';
import {getVazbyHierarchyArt} from "#comp/api";
// import {stratify, tree} from 'd3-hierarchy';

// import { initialNodes, initialEdges } from './nodes-edges.js';

const stringifyTextValues = (obj) => {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    return Object.keys(obj).reduce((acc, key) => {
        if (typeof obj[key] === 'number') {
            acc[key] = String(obj[key]);
        } else if (typeof obj[key] === 'object') {
            acc[key] = stringifyTextValues(obj[key]);
        } else {
            acc[key] = obj[key];
        }
        return acc;
    }, Array.isArray(obj) ? [] : {});
};

const elk = new ELK();

const useLayoutedElements = () => {
    const {getNodes, setNodes, getEdges, fitView} = useReactFlow();
    const defaultOptions = {
        'elk.algorithm': 'layered',
        'elk.layered.spacing.nodeNodeBetweenLayers': 100,
        'elk.spacing.nodeNode': 80,
    };

    const getLayoutedElements = useCallback((options) => {
        const layoutOptions = {...defaultOptions, ...options};
        const graph = {
            id: 'root',
            layoutOptions: layoutOptions,
            children: getNodes(),
            edges: getEdges(),
        };

        elk.layout(graph).then(({children}) => {
            // By mutating the children in-place we saves ourselves from creating a
            // needless copy of the nodes array.
            children.forEach((node) => {
                node.position = {x: node.x, y: node.y};
            });

            setNodes(children);
            window.requestAnimationFrame(() => {
                fitView();
            });
        });
    }, []);

    return {getLayoutedElements};
};

function Flow({data}) {

    const [nodes, , onNodesChange] = useNodesState(data.nodes);
    const [edges, , onEdgesChange] = useEdgesState(data.edges);
    const {getLayoutedElements} = useLayoutedElements({'elk.algorithm': 'mrtree'});

    useEffect(() => {
        getLayoutedElements({'elk.algorithm': 'mrtree'})
    }, []);

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
        >
            <Panel position="top-right">
                <button style={{backgroundColor: "darkblue", padding: "5px", margin: "2px"}}
                        onClick={() =>
                            getLayoutedElements({'elk.algorithm': 'layered', 'elk.direction': 'DOWN'})
                        }
                >
                    vertical layout
                </button>
                <button style={{backgroundColor: "darkblue", padding: "5px", margin: "2px"}}
                        onClick={() =>
                            getLayoutedElements({'elk.algorithm': 'mrtree'})
                        }
                >
                    mtrtree layout
                </button>
                <button style={{backgroundColor: "darkblue", padding: "5px", margin: "2px"}}
                        onClick={() =>
                            getLayoutedElements({
                                'elk.algorithm': 'org.eclipse.elk.radial',
                            })
                        }
                >
                    radial layout
                </button>
                <button style={{backgroundColor: "darkblue", padding: "5px", margin: "2px"}}
                        onClick={() =>
                            getLayoutedElements({
                                'elk.algorithm': 'org.eclipse.elk.force',
                            })
                        }
                >
                    force layout
                </button>
            </Panel>
        </ReactFlow>
    );
}

const VazbyHierarchy = ({typArt, idArt, ...props}) => {
    const {data: hierarchie} = useQuery({
        queryKey: ["getVazbyHierarchyArt", typArt, idArt],
        queryFn: () => getVazbyHierarchyArt({typArt, idArt})
    })

    const data = stringifyTextValues(hierarchie)

    console.log(data)

    return (
        <div style={{height: "calc(100vh - 200px)", backgroundColor: "white"}}>
            <ReactFlowProvider>
                {hierarchie && data && (
                    <Flow data={data}/>
                )}
            </ReactFlowProvider>
        </div>
    );
};

export default VazbyHierarchy;