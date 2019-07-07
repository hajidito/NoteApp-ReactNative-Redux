import React, {Component} from 'react';
import { StyleSheet, TextInput} from 'react-native';
import { Button, Container, Picker, Content, Form, Item, Icon, Label} from 'native-base';
import {getCategories} from '../publics/redux/actions/categories';
import {editNote} from '../publics/redux/actions/notes';
import { connect } from 'react-redux';

class App extends Component {
    
  state = {
    noteId : 1,
    title: '',
    note : '',
    categoryId : 1,
  };

  _editData = () => {
    this.props.dispatch(
      editNote(this.state.noteId, this.state.title, this.state.note, this.state.categoryId),
    )
    const { navigation } = this.props;
    navigation.navigate('Home')
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.setState({title : navigation.getParam('title', 'edit title')})
    this.setState({noteId : navigation.getParam('noteId', 1)})
    this.setState({note : navigation.getParam('note', 'edit note')})
    this.setState({categoryId : navigation.getParam('categoryId', 1)})
    this.props.navigation.setParams({ editData: this._editData });
    this.props.dispatch(getCategories())
    
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Edit Note',
      headerTitleStyle: {
        width: '100%',
        textAlign: 'center',
      },
      headerRight: (
        <Button style={{elevation:0, marginTop: 5, backgroundColor: 'white'}}
          onPress={
            navigation.getParam('editData')
          }
        >
          <Icon name='checkmark-circle-outline' style={{fontSize:30, marginRight: 20, color: 'green'}}/>
        </Button>
      ),
    };
  };

  render() {
    
    const { navigation } = this.props;
    let category = navigation.getParam('category', 'category');

    return (
    <Container>
      <Content>
        <Form>
          <TextInput style={styles.inputStyle} value = {this.state.title}
            onChangeText={(text) => this.setState({title : text})}
          />
          <TextInput style={styles.inputStyle} multiline={true} value = {this.state.note} 
            onChangeText={(text) => this.setState({note : text})}
          />
          <Label style={styles.categoryInput} >
            CATEGORY
          </Label>
          <Item style={{width: '50%'}}>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="md-arrow-dropdown"/>}
              selectedValue={this.state.categoryId}
              onValueChange={(itemValue) =>
                this.setState({categoryId: itemValue})
              }
            >
              <Picker.Item label={(category)} value={this.state.categoryId} />
              {(this.props.categories.data).map((item, index) => {
                    return (<Picker.Item label={item.name} value={item.id} key={item.id}/>)
                })}
            </Picker>
          </Item>
        </Form>
      </Content>
    </Container>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
      notes : state.notes,
      categories : state.categories
  }
}

export default connect(mapStateToProps)(App)

const styles = StyleSheet.create({
  inputStyle: {
    textAlignVertical: 'top',
    fontSize :20, 
    height: 200,
  },
  categoryInput: {
    marginLeft: 10, 
    marginTop: 10, 
    color: 'black', 
    fontWeight: 'bold'
  },
});