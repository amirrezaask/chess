import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PieceMoveList from '../../components/gameplay/PieceMoveList';
import { replayValueThunk } from '../../modules/canvas';

const PieceMoveListContainer = () => {
    
    const dispatch = useDispatch();

    const { pieceMove, showIndex } = useSelector(({ record }) => ({
        pieceMove: record.pieceMove,
        showIndex: record.showIndex,
    }));

    const onClick = useCallback(index => {
        dispatch(replayValueThunk({ index }));
    }, [dispatch]);

    return (
        <PieceMoveList
            onClick = {onClick}
            pieceMove={pieceMove}
            showIndex={showIndex}
        />
    )
};

export default PieceMoveListContainer;