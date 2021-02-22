import React from 'react';
import ChosenRoomDecoration from "./ChosenRoomDecoration/ChosenRoomDecoration";
import Room from "./Room/Room";
import {connect} from 'react-redux';

const ChosenRoom = ({room}) => {
    return (
        <>
            {
                room === undefined
                    ?
                    <ChosenRoomDecoration />
                    :
                    <Room />
            }
        </>
    )
};

const mapStateToProps = (state) => ({
    room: state.chat.room
})

export default connect(mapStateToProps,{})(ChosenRoom)