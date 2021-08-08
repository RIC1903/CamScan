
import React, { Component } from 'react'
import { Text, View, StyleSheet,PermissionsAndroid, TouchableOpacity, Alert,Image, FlatList } from 'react-native'
import RNFetchBlob from 'rn-fetch-blob';
import PdfThumbnail from "react-native-pdf-thumbnail";


export class Docs extends Component {
    constructor(props){
        super(props)
        this.state={
            files: [],
            loaded: false,
            
        }
    }
    componentDidMount(){
        this.readFiles();
        this.getThumbnail();
        
    }
    componentDidUpdate(){
        console.log(this.props.route)
        
        
    }
    
    getThumbnail = async () => {
        const filePath = '/storage/emulated/0/Android/data/com.camscan/files/Test.pdf';
        const page = 0;

        const { uri, width, height } = await PdfThumbnail.generate(filePath, page);
        // console.log(uri)
        this.setState({
            uri:uri
        })
    }
    render() {
        return (
           <View style={styles.container}>
            {!this.state.loaded ? (<Text style={{textAlign: 'center',fontSize:16,marginVertical:30}}>Loading...</Text>): (
            <FlatList 
                numColumns={2}
                horizontal={false}
                data={this.state.files}
                renderItem={({item}) => (
                <View style={{padding:5,marginTop: 10}}>
                <TouchableOpacity style={{flex:1,justifyContent:'center', paddingHorizontal:25, paddingVertical:10}}
                    onPress={()=> this.downloadFile({item})}
                >
                    <Image style={{height:150,width: 150}} source={{uri: item.thumb}}/>
                    <Text style={{textAlign:'center',marginTop:5, fontSize: 15}}>{item.file}</Text>
                </TouchableOpacity>
                
                
                </View>
                )
                }keyExtractor={(item, index) => index.toString()}
            />)}
           </View>
        )
    }
    readFiles = async () => {
        try {
            let file = await RNFetchBlob.fs.ls("/storage/emulated/0/Android/data/com.camscan/files/");
            for(let i=0;i<file.length;i++){
                if(file[i].substr(file[i].length-4,file[i].length)!=='.pdf')
                    file.splice(i,1)
            }
            let arr=[]
            for(let i=0;i<file.length;i++){
                const filePath = '/storage/emulated/0/Android/data/com.camscan/files/'+file[i];
                const page = 0;
                let item ={}
                const { uri, width, height } = await PdfThumbnail.generate(filePath, page);
                item['file']=file[i];
                item['thumb']=uri;
                arr.push(item)
            }
            // console.log(arr)
            this.setState({
                files:arr,
                loaded:true
            })
            
          } catch (error) {
            console.log(error);
          }
          
    }
    downloadFile = async (filename) => {
        try {console.log("Yo")
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                const android = RNFetchBlob.android;    
                console.log(filename.item.file)
                let PATH = "/storage/emulated/0/Android/data/com.camscan/files/"+filename.item.file
                android.actionViewIntent(PATH, 'application/pdf');
            } else {
                Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
            }
          } catch (err) {
            console.warn(err);
          } 
      }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column'
    },
    
  });

export default Docs
