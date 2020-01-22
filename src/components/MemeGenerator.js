import React, { Component, Fragment } from 'react';
import "../styles/main.css"
import htmlToImage from 'html-to-image'
import download from 'downloadjs'
class MemeGenerator extends Component {
  state = {
    fontSize: "45",
    topText: "",
    bottomText: "",
    randomImg: "http://i.imgflip.com/1bij.jpg",
    fontColor: "#fff",
    allMemeImgs: []
  }
  handleChange = (e) => {
    const value = e.target.value
    this.setState({ ...this.state, [e.target.name]: value })
    console.log(this.state.topText)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let randomNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
    this.setState({ randomImg: this.state.allMemeImgs[randomNum].url })
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then(data => data.json())
      .then(response => {
        const { memes } = response.data;
        this.setState({ allMemeImgs: memes });
      });

  }

  downloadMeme(){
    htmlToImage.toPng(document.getElementById('my-node'))
      .then(function (dataUrl) {
        download(dataUrl, 'meme.png');
      });
  }


  render() {
    
    return (
      <Fragment>
        <h1 className="text-center">
          Meme Generator
        </h1>
        <section className="meme-container">
          <form className="meme-form">
            <div className="form-group">
              <label>Add Top Text:</label>
              <input className="form-control" maxLength="30"
                value={this.state.topText} name="topText" onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label>Add Bottom Text:</label>
              <input className="form-control" value={this.state.bottomText} maxLength="30"
                name="bottomText" onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label>Meme Font Size:</label>
              <input type="number" className="form-control" value={this.state.fontSize}
                name="fontSize" onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label>Meme Font Color:</label>
              <input type="color" className="form-control" value={this.state.fontColor}
                name="fontColor" onChange={this.handleChange} />
            </div>
            <button type="submit" className="random-meme" onClick={this.handleSubmit}>Random Meme</button>
          </form>

          <div className="meme-width">
            <div className="meme" style={{ backgroundImage: `url(${this.state.randomImg})`, 
            fontSize: this.state.fontSize.toString() + 'px' , color: this.state.fontColor}} id="my-node">
              <p className="top-text text-center">{this.state.topText}</p>
              <p className="bottom-text text-center">{this.state.bottomText}</p>
            </div>
            <button className="download-meme" onClick={this.downloadMeme}>Download</button>
          </div>
          
        </section>
      </Fragment>
    )
  }
}

export default MemeGenerator;