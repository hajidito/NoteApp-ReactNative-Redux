import React, { Component } from 'react';
import { Alert, StyleSheet, Modal, TouchableHighlight, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import { Container, Text, View, Fab, Icon} from 'native-base';
import {getNotes, deleteNote, getNotesSearch, getNotesPage, getNotesSearchByCategory, getNotesPageByCategory} from '../publics/redux/actions/notes';
import { connect } from 'react-redux';
import Moment from 'moment';
import _ from 'lodash';

class App extends Component {

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { 
            modalVisible: false,
            sort : '',
            search: '',
            page:1,
        };
        this.limitSearch = _.debounce(this.getDataSearch,1500)
    }
    
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    _setModalVisible = () => {
        this.setState({modalVisible: true});
    }

    handleNavigateDrawer = () => {
        this.props.navigation.openDrawer()
    }

    getData =()=> {
        this.props.dispatch(getNotes(this.state.sort))
        this.setState({page : 1})
    }

    getNextPage =()=> {
        if (this.props.notes.withCategory != null){
            this.props.dispatch(getNotesPageByCategory(this.state.search, this.state.page+1, this.state.sort, this.props.notes.withCategory))
            this.setState({page : this.state.page+1})
        }
        if (this.props.notes.withCategory == null){
            this.props.dispatch(getNotesPage(this.state.search, this.state.page+1, this.state.sort))
            this.setState({page : this.state.page+1})
        }
    }

    deleteData =(noteId)=> {
        this.props.dispatch(deleteNote(noteId))
    }

    getDataSearch =(search, sort)=> {
        if (this.props.notes.withCategory != null){
            this.props.dispatch(getNotesSearchByCategory(search, sort, this.props.notes.withCategory))    
        }
        if (this.props.notes.withCategory == null){
            this.props.dispatch(getNotesSearch(search, sort))
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({ 
            setModalVisible: this._setModalVisible });
        this.getData();
        this.subs = [
            this.props.navigation.addListener('willFocus',()=>{
                this.setState({loading: true})
                this.getData();
            }),
        ]
    }

    componentWillUnmount(){
        this.subs.forEach(sub => {
            sub.remove()
        })
    }

    static navigationOptions = ({navigation}) => ({
        headerTitle: 'Note App',
        headerTitleStyle: { 
            width: '100%',
            textAlign: 'center',
            
        },
        headerLeft:(
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <Image
                source={require('../Images/profil3.jpg')}
                style={styles.iconProfil}
                />
            </TouchableOpacity>
        ),
        headerRight: (
            <TouchableOpacity onPress={navigation.getParam('setModalVisible')} style={{marginRight: 20}}>
              <Image 
                    source={require('../Images/sort.png')}
                    style={styles.iconSort}
                />
            </TouchableOpacity>
        ),
    })

    handleNavigateAddNote = () => {
        this.setState({
            sort : '',
            search: '',
            page:1
        })
        const { navigation } = this.props;
        navigation.navigate('AddNote');
    }

    handleNavigateEditNote = () => {
        this.setState({
            sort : '',
            search: '',
            page:1
        })
        const { navigation } = this.props;
        navigation.navigate('EditNote')
    }

    handlerLongClick = (noteId) => {
        Alert.alert(
            'Operation',
            'Delete This Note',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {text: 'OK', onPress: () => this.deleteData(noteId)},
            ],
            {cancelable: false},
        );
    };

    render() {
        Moment.locale('en');
        const colors = ['#2FC2DF', '#C0EB6A', '#FAD06C', '#FF92A9'];
        return (
        
        <Container style={{padding:1}} >
            <View style={{ flex: 1, backgroundColor: "transparent" }}>
                <TextInput
                    style={styles.search} 
                    onChangeText={ (text) =>{
                        this.setState({search : text})
                        this.limitSearch(text, this.state.sort)
                    }}
                    value={this.state.search}
                    searchBar 
                    placeholder="Search.."
                />
                    <FlatList
                        data = {this.state.search == '' && 
                        this.state.sort == '' ? 
                        this.props.notes.dataNote : this.props.notes.dataSearch}
                        keyExtractor={(item,index) => index}
                        refreshing = {this.props.notes.isLoading}
                        onRefresh={()=>{this.getData()}}
                        numColumns={2}
                        onEndReachedThreshold={0.1}
                        onEndReached={() => {
                            this.getNextPage()
                        }}
                        renderItem={({ item }) => {
                        return (
                            <View style={{
                                borderRadius:7, 
                                flexGrow: 1,
                                flexBasis: 0,
                                padding : 20,
                                marginLeft: '3%',
                                marginRight: '3%',
                                marginTop: '5%',
                                marginBottom: '3%',
                                height : 174,
                                backgroundColor : colors[item.categoryId % colors.length] }}>
                                <TouchableOpacity 
                                onLongPress={() => {
                                    this.handlerLongClick(item.id)
                                }}
                                onPress={() => {
                                    this.props.navigation.navigate('EditNote', {
                                    noteId : item.id,
                                    title: item.title,
                                    category: item.categoryName,
                                    note: item.note,
                                    categoryId: item.categoryId
                                    });
                                }}
                                >
                                    <Text style={styles.textTime}>{Moment(item.time).format('LL')}</Text>
                                    <Text style={styles.textTitle}>{item.title}</Text>
                                    <Text style={styles.textCategory} >{item.categoryName}</Text>
                                    <Text numberOfLines={5} style={styles.textNote}>{item.note}</Text>
                                </TouchableOpacity>
                            </View>
                            );
                        }}
                    />
                <Modal
                    transparent={true}
                    visible={this.state.modalVisible}
                    >
                    <View style={{flex:1, position:'absolute', alignSelf : "flex-end"}}>
                        <View style={styles.sortBarStyle}>
                            <TouchableHighlight
                                onPress={() => {
                                    this.setState({sort: 'DESC'})
                                    this.getDataSearch(this.state.search,'DESC')
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <Text style={{fontSize:15, padding: 10}}>ASCENDING</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                onPress={() => {
                                    this.setState({sort: 'ASC'})
                                    this.getDataSearch(this.state.search,'ASC')
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <Text style={{fontSize:15, padding: 10}}>DESCENDING</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
                <Fab position="bottomRight" style={{ backgroundColor: 'white' }} onPress={this.handleNavigateAddNote}>
                    <Icon name='ios-add' style={{fontSize:50, color: 'black'}}/>
                </Fab>
            </View>
        </Container>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        notes : state.notes,
    }
}

export default connect(mapStateToProps)(App)

const styles = StyleSheet.create({
    itemEmpty: {
        borderRadius: 7, 
        flexGrow: 1,
        flexBasis: 0,
        padding : 20,
        marginLeft: '3%',
        marginRight: '3%',
        marginTop: '5%',
        marginBottom: '5%',
        backgroundColor: "transparent"
    },
    ImageIconStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
    },
    textTime: {
        fontWeight: 'bold',
        fontSize: 10,
        alignSelf : "flex-end",
        marginBottom : '5%',
        color: "white"
    },
    textTitle: {
        fontWeight: 'bold',
        fontSize: 15,
        textAlign : 'left',
        color: "white"
    },
    textCategory: {
        fontSize: 10,
        textAlign : 'left',
        color: "white"
    },
    textNote: {
        fontWeight: 'bold',
        fontSize: 10,
        textAlign : 'left',
        color: "white"
    },
    iconProfil :{
        borderRadius: 50,
        marginLeft : 20,
        height: 50,
        width: 50,
        resizeMode: 'stretch'
    },
    iconSort: {
        padding: 10,
        margin: 5,
        height: 10,
        width: 10,
        resizeMode: 'stretch',
    },
    search: {
        backgroundColor: "transparent", 
        borderRadius: 25, 
        elevation: 3, 
        paddingLeft: 20, 
        paddingRight: 20, 
        margin: 20
    },
    sortBarStyle :{
        padding: 10, 
        elevation: 20, 
        backgroundColor:'white', 
        marginTop:'30%', 
        marginRight: '2%'
    }
});
