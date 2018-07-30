import Left from 'bundle-loader?lazy!./container/left'
import Middle from 'bundle-loader?lazy!./container/middle'
import Right from 'bundle-loader?lazy!./container/right'
import React, { Component } from 'react'
import Bundle from './components/bundle'



// const Loading = function () {
//     return <div>Loading...</div>
// };

const createComponent = (component) => (props) => (
    <Bundle load={component}>
        {
             
            (Component) => Component ? <Component {...props} /> : null
        }
    </Bundle>
);




export let data = [
    {
        path: '/left',
        value:'left',
        id: 1,
        component:createComponent(Left)
    }, {
        path: '/middle',
        value:'middle',
        id: 2,
        component:createComponent(Middle)      
    }, {
        path: '/right',
        value:'right',
        id: 3,
        component:createComponent(Right)    
    }
]

export let env_test=process.env.NODE_ENV ==='production'?false:true;
