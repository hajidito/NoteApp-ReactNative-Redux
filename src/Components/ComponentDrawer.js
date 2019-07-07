import React, {Component} from 'react';
import {Modal, Alert, Image, SafeAreaView, StyleSheet, ScrollView, TextInput, TouchableHighlight} from 'react-native';
import {ListItem, Text, Item, View} from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {getCategories, addCategory, deleteCategory} from '../publics/redux/actions/categories';
import {connect} from 'react-redux';
import { getNotesByCategory, getNotes } from '../publics/redux/actions/notes';
import { withNavigation } from 'react-navigation';

class ComponentDrawer extends Component {
    
    state = {
        modalVisible: false,
        categoryName: '',
        description : 'from front end',
        image : '',
        check : '',
    };
    
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    addDataCategory = () => {
        this.props.dispatch(
            addCategory(this.state.categoryName, this.state.description, this.state.image),
            getCategories()
        )
        this.setModalVisible(!this.state.modalVisible)
    }

    deleteDataCategory = (categoryId) => {
        this.props.dispatch(deleteCategory(categoryId))
    }

    handlerLongClick = (categoryId) => {
        Alert.alert(
            'Operation',
            'Delete This Category',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {text: 'OK', onPress: () => this.deleteDataCategory(categoryId)},
            ],
            {cancelable: false},
        );
    };
    
    getDataNote = (categoryId) => {
        this.props.dispatch(
            getNotesByCategory(categoryId),
        )
        this.props.navigation.closeDrawer()
    }

    componentDidMount() {
        this.props.dispatch(getCategories())
    }

    render() {
        return (
            <SafeAreaView style={{flex:1}}>
                <View style={styles.profilTemplate}>
                    <TouchableOpacity onPress = {() => {
                        this.props.navigation.closeDrawer(); 
                        this.props.dispatch(getNotes(''))
                    }}>
                        <Image source={require('../Images/profil3.jpg')} style={styles.profilImage}/>
                        <Text style={styles.profilName}> Raon Lee </Text>
                    </TouchableOpacity>
                </View>
            
                <View style={{flex:1}}>
                    <ScrollView >
                    {(this.props.categories.data).map((item) => {
                        return (
                        <TouchableOpacity 
                            key={item.id}
                            onLongPress={()=>{ 
                                this.handlerLongClick(item.id)
                            }}
                            onPress = {()=>{this.getDataNote(item.id)}}
                        >
                            <ListItem>
                                <Image
                                    source={{uri: item.image}} 
                                    style={styles.icon}
                                />
                                <Text style={styles.textIcon}>{item.name}</Text>
                            </ListItem>
                        </TouchableOpacity>)
                    })}
                    
                    <TouchableOpacity onPress={() => {this.setModalVisible(!this.state.modalVisible);}}>
                        <ListItem>
                            <Image 
                                source={require('../Images/add.png')}
                                style={styles.icon}
                            />
                            <Text style={styles.textIcon}>Add Category</Text>
                        </ListItem>
                    </TouchableOpacity>
                    <Modal
                    transparent={true}
                    visible={this.state.modalVisible}
                    >
                        <View style={styles.modalView}>
                            <View style={{ elevation: 20, backgroundColor:'white', borderRadius:10}}>
                                <View style={{ padding:'10%'}}>
                                    <Item style={{borderColor: 'green'}}>
                                        <TextInput placeholder="Category Name ..."  
                                            onChangeText={(text) => this.setState({categoryName : text})}
                                            value={this.state.categoryName}
                                        />
                                    </Item>
                                    <Item style={{borderColor: 'green'}}>
                                        <TextInput placeholder="Image Url ..."  
                                            onChangeText={(text) => this.setState({image : text})}
                                            value={this.state.image}
                                        />
                                    </Item>
                                </View>
                                <View style={{alignSelf:'flex-end'}}>
                                    <ListItem >
                                        <TouchableHighlight onPress = {() => {this.addDataCategory()}} >
                                            <Text style={{fontSize:15, fontWeight:'bold', right:'30%'}}>Add</Text>
                                        </TouchableHighlight>
                                        <TouchableHighlight onPress={() => {this.setModalVisible(!this.state.modalVisible);}}>
                                            <Text style={{fontSize:15, left:'5%'}}>Cancel</Text>
                                        </TouchableHighlight>
                                    </ListItem>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    </ScrollView>
                </View>
            
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        categories : state.categories
    }
  }

export default withNavigation(connect(mapStateToProps)(ComponentDrawer))

const styles = StyleSheet.create({
    icon: {
        padding: 10,
        margin: 1,
        height: 10,
        width: 10,
        resizeMode: 'stretch',
    },
    textIcon: {
        fontWeight:'bold', 
        color:'black', 
        marginLeft: 32, 
        fontSize:15
    },
    modalView: {
        flex:1,
        justifyContent : 'center',
        alignSelf : 'center',
        width :'70%',
        position:'relative',
    },
    profilTemplate : {
        height:150,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'20%'
      },
    profilImage: {
        height:120,
        width:121,
        borderRadius:54,
        alignSelf : 'center',
        // paddingTop:'10%'
      },
    profilName:{
        fontWeight:'bold',
        color:'#000',
        alignSelf : 'center',
        paddingTop:'5%',
        fontSize:20 
      }
  })