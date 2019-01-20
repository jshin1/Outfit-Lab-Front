import React, { Component } from 'react';
import Canvas from '../components/Canvas'
import ShirtTypeContainer from './ShirtTypeContainer'
import EditorContainer from './EditorContainer'
import GalleryContainer from './GalleryContainer'


class MainContainer extends Component {

  state= {
    shirtColor: 'lightgrey',
    pocketColor: 'blue',
    ringerColor: 'orange',
    target: '',
    designs: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/designs')
    .then(r => r.json())
    .then(data => {
      this.setState({
        designs: data
      })
    })
  }

  handleTargetClick = (e) => {
    this.setState({
      target: e.target.className.baseVal
    })
  }

  changeColor = (color) => {
    this.setState({
      [this.state.target]: color.hex
    })
  }

  handleSaveDesign = (e) => {
    console.log(e.target, this.state.shirtColor, this.state.pocketColor, this.state.ringerColor)
    fetch('http://localhost:3000/api/v1/designs', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      },
      body: JSON.stringify({
        shirtType: "Base",
        shirtColor: this.state.shirtColor,
        pocketColor: this.state.pocketColor,
        user_id: 1
      })
      // .then(r => r.json())
      // .then(data => {
      //   this.setState({
      //     designs: [...this.state.designs, data]
      //   })
      // })
    })
  }

  handleDeleteDesign = (e) => {
    console.log(e.target.value)
  }

  render() {
    return (
      <div>
        <div className="wrapper-1">
          <ShirtTypeContainer />
          <Canvas target={this.state.target} shirtColor={this.state.shirtColor} pocketColor={this.state.pocketColor} ringerColor={this.state.ringerColor} handleTargetClick={this.handleTargetClick}/>
          <GalleryContainer designs={this.state.designs} handleDeleteDesign={this.handleDeleteDesign}/>
          </div>
          <EditorContainer changeColor={this.changeColor} handleSaveDesign={this.handleSaveDesign} />
      </div>
    );
  }

}

export default MainContainer;
