import React, { Component } from 'react';
import { ImagePicker, WingBlank, SegmentedControl } from 'antd-mobile';

const data = [{
  url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
  id: '2121',
}, {
  url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
  id: '2122',
}];

class ImagePickerExample extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {files: data,multiple: false}
    this.onSegChange = this.onSegChange.bind(this)
  }
  onChange(files, type, index) {
    console.log(files, type, index);
    this.setState({
      files,
    });
  }
  onSegChange(e) {
    const index = e.nativeEvent.selectedSegmentIndex;
    this.setState({
      multiple: index === 1,
    });
  }

  render() {
    const { files } = this.state;
    return (
      <ImagePicker
        onChange={this.onChange}
        onImageClick={(index, fs) => console.log(index, fs)}
        selectable={files.length < 7}
        multiple={this.state.multiple}
      />
    );
  }
}
export default ImagePickerExample;