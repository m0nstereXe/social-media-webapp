import React from 'react';
import {useParams} from 'react-router-dom'

import PlaceList from '../components/PlaceList';


const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'big huge tower!!!!!',
        imageUrl: 'https://images.emojiterra.com/twitter/v13.0/512px/1f9a7.png',
        address: '376 Lakeview Drive, Wyckoff NJ',
        location: 
        {
            lat: 40.9894912,
            lng: -74.1605376,
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Poop',
        description: 'look at this cool stuff!',
        imageUrl: 'https://hips.hearstapps.com/edc.h-cdn.co/assets/16/45/1478626107-white-house-driveway.jpg',
        address: '1600 Pensylvania Ave, Washington DC',
        location: 
        {
            lat: 38.8977,
            lng: -77.0365,
        },
        creator: 'u2'
    },
]

const UserPlaces = () =>
{
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
    return <PlaceList items={loadedPlaces}/>
};

export default UserPlaces;