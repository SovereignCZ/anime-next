const position = {x: 0, y: 0};
const edgeType = 'smoothstep';
export const initialNodes = [
    {
        "id": '85781',
        data: {label: 'Manga Delicious in Dungeon'},
        position
    },
    {
        "id": '36577',
        data: {label: 'Anime Dungeon Meshi PVs'},
        position
    },
    {
        "id": '52701',
        data: {label: 'Anime Delicious in Dungeon'},
        position
    }
];

export const initialEdges = [
    {
        "id": '137',
        "source": '85781',
        "target": '36577',
        "label": "Adaptation", type: edgeType, animated: true
    },
    {
        "id": '138',
        "source": '85781',
        "target": '52701',
        "label": "Adaptation", type: edgeType, animated: true
    },
    {
        "id": '134',
        "source": '52701',
        "target": '36577',
        "label": "Other", type: edgeType, animated: true
    }
];