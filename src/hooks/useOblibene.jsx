import {useState} from 'react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useAppContext} from "../context/ContextProvider.jsx";

import {deleteOblibene, getOblibeneUzivatelArt, postOblibene} from "#comp/api";

const useOblibene = ({typArt, idArt, oblibeneInit}) => {
    const {idUzivatel, addToast} = useAppContext()
    const queryClient = useQueryClient();
    const query = ['oblibene', typArt, idArt, idUzivatel];

    const [oblibene, setOblibene] = useState(oblibeneInit);

    const {data: oblibeneData, isRefetching} = useQuery({
        queryKey: query,
        queryFn: () => getOblibeneUzivatelArt({typArt, idArt, idUzivatel}),
    });

    const {mutate: odeslatOblibene} = useMutation({
        mutationFn: postOblibene,
        onMutate: () => {
            setOblibene(true);
            addToast('success', 'Bylo přidáno mezi oblíbené.');
        },
        onError: (data) => {
            queryClient.invalidateQueries({queryKey: query}).then(() => addToast('error', data.response.data.status.message));
        },
        retry: 0,
    });

    const {mutate: smazatOblibene} = useMutation({
        mutationFn: deleteOblibene,
        onMutate: () => {
            setOblibene(false);
            addToast('success', 'Bylo odebráno z oblíbených.');
        },
        onError: (data) => {
            queryClient.invalidateQueries({queryKey: query}).then(() => addToast('error', data.response.data.status.message));
        },
        retry: 0,
    });

    const handleOblibene = () => {
        if (oblibene) {
            smazatOblibene({typArt, idArt, idUzivatel});
        } else {
            odeslatOblibene({typArt, idArt, idUzivatel});
        }
    };

    return {
        oblibene,
        oblibeneData,
        isRefetching,
        handleOblibene,
    };
};

export default useOblibene;
