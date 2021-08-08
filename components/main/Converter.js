import React, { Component } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import RNImageToPdf from 'react-native-image-to-pdf';

export class Converter extends Component {
    constructor(props){
        var currentdate = new Date();
        var datetime =currentdate.getDay() + " " + currentdate.getMonth() 
        + " " + currentdate.getFullYear() + " @ " 
        + currentdate.getHours() + ":" 
        + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        super(props);
        this.state = {
            imagePathList: [],
            fileName: datetime
        }
    }
    componentDidMount(){
        if(this.props.route.params.fileName !== ''){
            this.setState({
                fileName: this.props.route.params.fileName+'.pdf'
            })
        }
        for(let i=0;i<this.props.route.params.imageList.length;i++){
            this.state.imagePathList.push(this.props.route.params.imageList[i].path.substring(8))
        }
    }
    render()
     {
         console.log(this.props.route.params.imageList);
        return (
           <View style={{flex:1, padding:15}}>
               <Text style={{fontSize:16}}>The pdf will be saved in Android/data/com.camscan/files/{this.state.fileName}.You can also view all your genereated pdfs from the Docs page. </Text>
               <Text style={{fontSize:18,fontWeight:'bold',marginTop:50}}>Click on the button below to generate pdf, or go back to re-edit your pages</Text>
               <TouchableOpacity
                onPress={this.myAsyncPDFFunction} style={{flex: 0,
                    backgroundColor: '#694fad',
                    borderRadius: 5,
                    padding: 15,
                    paddingHorizontal: 20,
                    alignSelf: 'center',
                    marginTop:20}}>
                    <Text style={{color:'white'}}>Generate PDF</Text>
               </TouchableOpacity>
           </View>
        )
    }
    myAsyncPDFFunction = async () => {
        try {
            const options = {
                imagePaths: this.state.imagePathList,
                name: this.state.fileName+'.pdf',
                maxSize: { // optional maximum image dimension - larger images will be resized
                    width: 900,
                    height: 1200,
                },
                quality: .5, // optional compression paramter
                
            };
            const pdf = await RNImageToPdf.createPDFbyImages(options);
            this.props.navigation.reset({
                index: 0,
                routes: [{name: 'Docs'}],
              });
            this.props.navigation.navigate('Docs',{updated:true})
            
            console.log(pdf.filePath);
        } catch(e) {
            console.log(e);
        }
    }
}

export default Converter
