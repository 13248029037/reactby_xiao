import React, { Component } from "react";
import { bindActionCreators } from "redux";
import PropTypes from 'prop-types'

import { connect } from "react-redux";
import  {getCategory,getCitys} from "../redux/action.js";

console.info(Component.prototype,'Component.prototype')
class Left extends new Component().MyComponent {
  constructor(props) {
    super(props);
    this.state = {
      s:'true'
    };

    console.info(this.props,'this props children')
  }
  handleClick() {
    // for(var i=0;i<200;i++){
    //   console.info(this.state)
    //   this.setState({
    //     s:Math.random()*10>5?'true':'false'
    //   },(s)=>{
    //     // console.info(s,'ssssssssssssssssssssssss')
    //     // console.info(this.state,'ssssssssssssssssssssssss')
    //     console.info(this.state,'callback')
    //   })
    // }
    this.setState({
      s:Math.random()*10>5?'true':'false'
    })
  
    this.props.getCategory();
  }
  render() {
    console.info('renderrenderrender')

    return (
      <div style={{ marginTop: "50px" }}>
        <div
          style={{ heigth: "40px", backgroundColor: "blue" }}
          onClick={this.handleClick.bind(this)}
        >
          点击
        </div>
        <div>{this.state.s}43534</div>
        <span style={{ display: "block", backgroundColor: "red" }}>left</span>
       <Home>
         <Childs name='xiaoshulin' />
       </Home>
        {(this.props.category || []).map(item => {
          return (
            <div
              style={{
                height: "50px",
                backgroundColor: "yellow",
                margin: "5px 10px",
                lineHeight: "50px",
                cursor: "pointer"
              }}
              key={item.id}
            >
       
              {item.name}
            </div>
          );
        })}
      </div>
    );
  }
  componentDidMount(){
    console.info('mounted')
  }
  componentWillMount(){
    console.info(' will mounted')
  }
  componentDidUpdate(){
    console.info('updated')
  }
  // shouldComponentUpdate(nexrprops,nextstate){
  //   console.info(nexrprops,'nexrprops')
  //   console.info(nextstate,'nextstate')
  //   if(nextstate.s===this.state.s){
  //     return false
  //   }else{
  //     return true
  //   }
   
  //   // console.info('should')
  // }
  componentWillReceiveProps(nextprops){
    // console.info(nextprops,'nextprops')
    // console.info('receive props')
    // this.props.getCategory();
  }
  
}

function mapStateToProps(state) {
  return {
    category: state.reducer2.category
  };
}
let action ={
  getCategory,
  getCitys
}

// console.info(action,'actionactionactionaction')
function mapDispatchToProps(dispatch) {
  let funcs = bindActionCreators(action, dispatch);
  return {
    ...funcs
  };
}


class Home extends Component{
  constructor(props){
    super(props)
    // console.info(this.props.children,'childrenchildrenchildren')
  }
  render(){
    // console.info(this.context,'home context')
    return <div>
      {/* <Childs /> */}
      {this.props.children}
      <span>homssadade</span>
    </div>
  }

}
Home.contextTypes  = {
  store:PropTypes.object,
  color:PropTypes.string
}

class Childs  extends Component{
  constructor(props){
    super(props);
    this.state={
      age:23
    }
    // this.state={age:'23'}
  }
  callback(dom){
    console.info(dom,'dom')
    if(dom)
    dom.innerHTML='xiaoshulin'
  }
  render(){
    // console.info(this.state,'this.state')
    return <div>
    <span ref={this.callback}> my xiaodsf dsfdsf age is {this.state.age}</span>
  </div>
  }

}

const ContainerLeft = connect(mapStateToProps, mapDispatchToProps)(Left);

export default ContainerLeft;
