import React, {Component} from 'react';
import { StyleSheet, TextInput} from 'react-native';
import { Button, Container, Picker, Content, Form, Item, Icon, Label} from 'native-base';
import {addNote} from '../publics/redux/actions/notes';
import {getCategories} from '../publics/redux/actions/categories';
import {connect} from 'react-redux';

class App extends Component {

  state = {
    title: '',
    note : '',
    categoryId : 1,
  };

  _addData = () => {
    this.props.dispatch(
      addNote(this.state.title, this.state.note, this.state.categoryId),
    )
    const { navigation } = this.props;
    navigation.navigate('Home')
  }

  componentDidMount() {
    this.props.navigation.setParams({ addData: this._addData });
    this.props.dispatch(getCategories())
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Add Note',
      headerTitleStyle: {
        width: '100%',
        textAlign: 'center',
      },
      headerRight: (
        <Button style={{ elevation: 0 ,marginTop: 5, backgroundColor: 'white'}}
          onPress={
            navigation.getParam('addData')
          }
        >
          <Icon name='checkmark-circle-outline' style={{fontSize:30, marginRight: 20, color: 'green'}}/>
        </Button>
      ),
    };
  };

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <TextInput style={styles.inputStyle} placeholder="ADD TITLE ..."  
              onChangeText={(text) => this.setState({title : text})}
              value={this.state.title}
            />
            <TextInput style={styles.inputStyle} multiline={true} placeholder="ADD DESCRIPTION ..." 
              onChangeText={(text) => this.setState({note : text})}
              value={this.state.note}
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
  }
});
