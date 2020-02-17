import React from "react"
import PropTypes from "prop-types"
import ReactDOM from "react-dom"
import { init } from "contentful-ui-extensions-sdk"
import update from 'immutability-helper';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./index.scss"

const initFormat = {
    content:''
}
class App extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired
  }
constructor(props){
	super(props)
	this.state=this.props.sdk.field.getValue();
	if(!this.state)this.state=initFormat;
	//console.log(this.state)

}
  

  componentDidMount() {
    this.props.sdk.window.startAutoResizer()

  }
  componentWillUnmount() {
	  //need to add this or onExternal Change will keep nesting value objects in state
    //this.detachExternalChangeHandler()
  }
  
   handleStateChange =(value, delta, source, editor)=>{
	   
	   
	   const updatedState = update(
		   this.state,{
			   content:{$set:editor.getHTML()}
		   }
	   )	  
	   this.setState(updatedState,this.saveValues)
	   
   }
  saveValues=()=>{
	  //console.log(this.state,' saving')
	  this.props.sdk.field.setValue(this.state);
	  //console.log(this.props.sdk.field.getValue(),' save to field')
  }
   onExternalChange = value => {
    //this.setState({ value })
  }
  modules = {
	  clipboard:{matchVisual:false},
		toolbar: [
			['bold', 'italic', {'script':'super'},'blockquote'],
			[{'size':['small',false]}],
			[{'list': 'ordered'}, {'list': 'bullet'}],
			['clean']
		    ],
	  }
  render(){
	  const {content} = this.state||'';
      return ( 
	     <ReactQuill 
	  		name="content"
	  		value={content}
	  		placeholder="Add your content..."
	  		onChange={this.handleStateChange} 
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
