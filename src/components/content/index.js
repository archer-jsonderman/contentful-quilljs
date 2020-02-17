import React from "react";
import { init } from "contentful-ui-extensions-sdk";
import "@contentful/forma-36-react-components/dist/styles.css"
import {FormLabel} from "@contentful/forma-36-react-components"
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './index.scss'


export default class Content extends React.Component{
	constructor(props){
		super(props)
		//if(!this.props.value) console.log('no value - headline')
		this.handleEditorChange = this.handleEditorChange.bind(this)
	}
	handleEditorChange=(value)=>{
		this.props.onStateChange('content',value)
	}
	 modules = {
		toolbar: [
			['bold', 'italic', {'script':'super'},'blockquote'],
			[{'size':['small',false]}],
			['clean']
		    ],
	  }
	render(){
		const {content} = (typeof this.props!== 'undefined' && this.props)||'';
		//headline must be empty string and n ot undefined object or Quill has an issue
		return(
			<>
				<ReactQuill 
			  		name="content"
			  		value={this.props.content}
			  		placeholder="Add your content..."
			  		onChange={(value)=>this.handleEditorChange(value)} 
			  		modules={this.modules}
			  		theme='snow'
			  		/>
	  		</>
		)
	}
}