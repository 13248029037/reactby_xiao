import React, { Component } from 'react'
import {Link,Route} from 'react-router-dom'
// import  action from "../redux/action.js";
 class Right extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    render(){
        console.info(this.props)
        return <div style={{marginTop:'50px'}}>
         <Link to={'/right/dfsdfs?id=xiaoshulin'}>点击</Link>
         <Link to={'/risdfght/dfsdfs?id=xiaoshulin'}>点dfsf击</Link>
         {/* <Route path={this.props.match.url+'/:id'}  component={Show}></Route> */}
         
        
            <span style={{display:'block',backgroundColor:'green'}}>right</span>
        </div>
    }
}

function Show(props){
    console.info(props)
    return <div>
        <span>{props.match.params.id}</span>
    </div>
}

export default Right;  
 

