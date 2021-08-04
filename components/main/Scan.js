import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList } from 'react-native';
import { RNCamera } from 'react-native-camera';
import {launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';

export default class Scan extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      imageList: [],
      update: false,
    };
  }
  componentDidUpdate(){
      if(this.state.update){
        this.setState({
          update:false
        })
      }
  }
  render() {
    
    console.log(this.state.imageList);
    
    return (
      <View style={styles.container}>
        
          {this.state.imageList && 
          <FlatList 
            style={{maxHeight:600}}
            numColumns={2}
            horizontal={false}
            data={this.state.imageList}
            renderItem={({item}) => (
              <View style={{flex:1,alignItems:'center'}}>
            <Text></Text>
            <Image style={{flex:1,height: 200, width:200,justifyContent:'center'}} source={{uri:item.path}}/>
            </View>
          )
        }keyExtractor={(item, index) => index.toString()}
        />
      }
        <View style={{flex:1,flexDirection:'row',justifyContent:'space-evenly'}}>

          <TouchableOpacity onPress={this.imagePicker} style={styles.capture}>
            <Text style={{color:'white'}}>Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.clickPicture} style={styles.capture}>
            <Text style={{color:'white'}}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.capture}>
            <Text style={{color:'white'}}>Submit</Text>
          </TouchableOpacity>
          </View>
      </View>
    );
    
  }
  clickPicture = async () =>
  ImagePicker.openCamera({
    compressImageQuality: 0.8,
    cropping: true,
  }).then(image => {
    this.state.imageList.push(image)
    this.setState({
      update:true
    })
    // console.log(image);
    console.log(this.state.imageList);
  });
imagePicker = async () => 
  ImagePicker.openPicker({
    multiple: true
  }).then(images => {
    for(let i=0;i<images.length;i++){
      this.state.imageList.push(images[i])
    }
    this.setState({
      update:true
    })
    
    console.log(this.state.imageList)
  });

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  preview: {
    flex: 1,
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#694fad',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    
  },
});