import React from "react"
import PropTypes from "prop-types"
import ReactDOM from "react-dom"
import { init } from "contentful-ui-extensions-sdk"
import update from 'immutability-helper';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./index.scss"


class App extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired
  }
constructor(props){
	super(props)
	this.state=this.props.sdk.field.getValue();

}
  

  componentDidMount() {
    this.props.sdk.window.startAutoResizer()
    console.log(this.state)
	// Handler for external field value changes (e.g. when multiple authors are working on the same entry).
    //this.detachExternalChangeHandler = this.props.sdk.field.onValueChanged(this.onExternalChange)

  }
  componentWillUnmount() {
	  //need to add this or onExternal Change will keep nesting value objects in state
    //this.detachExternalChangeHandler()
  }
  
   handleStateChange =(newState)=>{
	   const updatedState = update(
		   this.state,{
			   $set:newState
		   }
	   )	  
	   this.setState(updatedState,this.saveValues)
	   
   }
  saveValues=()=>{
	  console.log(this.state,' saving')
	  this.props.sdk.field.setValue(this.state);
	  console.log(this.props.sdk.field.getValue(),' save to field')
  }
   onExternalChange = value => {
    //this.setState({ value })
  }
  modules = {
		toolbar: [
			['bold', 'italic', {'script':'super'},'blockquote'],
			[{'size':['small',false]}],
			[{'list': 'ordered'}, {'list': 'bullet'}],
			['clean']
		    ],
	  }
  render(){
      return ( 
	     <ReactQuill 
	  		name="content"
	  		value={this.state}
	  		placeholder="Add your content..."
	  		onChange={(value)=>this.handleStateChange(value)} 
	  		modules={this.modules}
	  		theme='snow'
	  		/>
  		)
  }
}

init(sdk => {
  ReactDOM.render(<App sdk={sdk} />, document.getElementById("root"))
})

if (module.hot) {
  module.hot.accept()
}
