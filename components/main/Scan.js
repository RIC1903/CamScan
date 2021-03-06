import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList, TextInput } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export default class Scan extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      imageList: [],
      update: false,
      fileName: '',
    };
  }
  
  render() {
    
    console.log(this.state.imageList);
    
    return (
      <View style={styles.container}>
          {this.state.imageList.length > 0 ? <Text onPress={()=> this.setState({imageList: []})} style={{textAlign:'center',fontSize:14, fontWeight:'bold',marginTop: 5, color:'#FF7F7F'}}>X Clear all</Text> : null}
          {this.state.imageList && 
          <FlatList 
            style={{minHeight:500,marginBottom:10}}
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
        <View style={{flex:1,flexDirection:'row',justifyContent:'space-evenly',minHeight:50}}>
          <TouchableOpacity onPress={this.imagePicker} style={styles.capture}>
            <Text style={{color:'white'}}>Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.clickPicture} style={styles.capture}>
            <Text style={{color:'white'}}>Camera</Text>
          </TouchableOpacity>
          {this.state.imageList.length > 0 ? (
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Converter',{imageList:this.state.imageList,fileName: this.state.fileName})} 
          style={styles.capture}>
            <Text style={{color:'white'}}>Submit</Text>
          </TouchableOpacity>) : null}
        </View>
        <View>
          <TextInput 
            placeholder="Filename"
            placeholderTextColor="gray"
            style={{fontSize: 18,color:'black'}}
            onChangeText={(text) => this.setState({
              fileName: text,
              
            })}
          />

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
    multiple: false,
    cropping: true
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
    flexDirection: 'column',
    overflow: 'scroll'
  },
  preview: {
    flex: 1,
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#576F90',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    
  },
});