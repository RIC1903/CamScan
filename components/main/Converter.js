import React, { Component } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import RNImageToPdf from 'react-native-image-to-pdf';

export class Converter extends Component {
    constructor(props){
        super(props);
        this.state = {
            imagePathList: []
        }
    }
    componentDidMount(){
        for(let i=0;i<this.props.route.params.imageList.length;i++){
            this.state.imagePathList.push(this.props.route.params.imageList[i].path.substring(8))
        }
    }
    render()
     {
         console.log(this.props.route.params.imageList);
        return (
           <View style={{flex:1}}>
               <TouchableOpacity
                onPress={this.myAsyncPDFFunction} style={{flex: 0,
                    backgroundColor: '#694fad',
                    borderRadius: 5,
                    padding: 15,
                    paddingHorizontal: 20,
                    alignSelf: 'center'}} >
                    <Text style={{color:'white'}}>Submit</Text>
               </TouchableOpacity>
           </View>
        )
    }
    myAsyncPDFFunction = async () => {
        try {
            const options = {
                imagePaths: this.state.imagePathList,
                name: 'PDFName.pdf',
                maxSize: { // optional maximum image dimension - larger images will be resized
                    width: 900,
                    height: 1200,
                },
                quality: .5, // optional compression paramter
            };
            const pdf = await RNImageToPdf.createPDFbyImages(options);
            
            console.log(pdf.filePath);
        } catch(e) {
            console.log(e);
        }
    }
}

export default Converter
