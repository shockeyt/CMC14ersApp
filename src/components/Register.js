'use strict';
 
import React, { Component } from 'react';
import {  StyleSheet, 
          View, 
          Text, 
          TextInput, 
          ScrollView,
        } from 'react-native';

import { Form,
  Separator,InputField, LinkField,
  SwitchField, PickerField,DatePickerField,TimePickerField,
} from 'react-native-form-generator';

import Button from 'react-native-button';
import axios from 'axios';
 
var styles = StyleSheet.create({
  description: {
    fontSize: 30,
    marginTop: 10,
    textAlign: 'center',
    color: '#234F33'
  },
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#82C6E2',
  },
  button: {
    fontSize: 20,
    height: 50,
    paddingTop: 5,
    color: 'white',
    backgroundColor: '#234F33',
  },
  completed: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
    marginTop: 60,
  },
  thankyou: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 30,
  },
  message: {
    marginBottom: 20,
    fontSize: 20,
    textAlign: 'center',
  },

});
 
class Register extends Component {
  constructor(props){
      super(props);
      this.state = {
        formData:{}
      }
    }
    handleFormChange(formData){
      /*
      formData will contain all the values of the form,
      in this example.

      formData = {
      first_name:"",
      last_name:"",
      gender: '',
      birthday: Date,
      has_accepted_conditions: bool
      }
      */

      this.setState({formData:formData})
      this.props.onFormChange && this.props.onFormChange(formData);
    }
    handleFormFocus(e, component){
      //console.log(e, component);
    }
    //get local host data
    getRegisters(){
      axios.get('http://localhost:3000/register/')
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    postRegister(data){
      console.log("form data is", data);
      //this.setState({showComplete: true});
      axios.post('http://localhost:3000/register/', {
        peak: data.peak,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        zipcode: data.zipcode,
        CMC_member: data.CMC_member,
        CMC_past_member: data.CMC_past_member,
        birth_year: data.birth_year
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      this.setState({showComplete: true});
    }

    openTermsAndConditionsURL(){

    }
    render(){
      return (
        <View style={styles.container}>
        {this.state.showComplete &&
        <View style={styles.completed}>
        <Text style={styles.thankyou}>Thank you!</Text>
        <Text style={styles.message}>Your peak has been sent to the CMC to be registered</Text>
        <Button style={styles.button} onPress={() => {this.setState({showComplete: false})}}>Back to Register</Button>
        </View>
        ||  
        <ScrollView keyboardShouldPersistTaps="always" style={{paddingLeft:10,paddingRight:10, height:200}}>
        <Text style={styles.description}>Log Summit</Text>

        <Form
          ref='registrationForm'
          onFocus={this.handleFormFocus.bind(this)}
          onChange={this.handleFormChange.bind(this)}
          label="Personal Information">
          <Separator />
          <PickerField ref='peak'
            label='Which Peak?'
            options={{
              "": '',
              Pikes_Peak: 'Pikes Peak',
              Mount_Evans: 'Mount Evans',
              Mount_Elbert: 'Mount Elbert',
              Mount_Massive: 'Mount Massive',
              Mount_Harvard: 'Mount Harvard',
              Blanca_Peak: 'Blanca Peak',
              Uncompahgre_Peak: 'Uncompahgre Peak',
              Crestone_Peak: 'Crestone Peak'
            }}/>
          <InputField
            ref='first_name'
            label='First Name'
            placeholder='First Name'
            helpText={((self)=>{

              if(Object.keys(self.refs).length !== 0){
                if(!self.refs.registrationForm.refs.first_name.valid){
                  return self.refs.registrationForm.refs.first_name.validationErrors.join("\n");
                }

              }
              // if(!!(self.refs && self.refs.first_name.valid)){
              // }
            })(this)}
            validationFunction={[(value)=>{
              /*
              you can have multiple validators in a single function or an array of functions
               */

              if(value == '') return "Required";
              //Initial state is null/undefined
              if(!value) return true;
              // Check if First Name Contains Numbers
              var matches = value.match(/\d+/g);
              if (matches != null) {
                  return "First Name can't contain numbers";
              }

              return true;
            }, (value)=>{
              ///Initial state is null/undefined
              if(!value) return true;
              if(value.indexOf('4')!=-1){
                return "I can't stand number 4";
              }
              return true;
            }]}
            />
          <InputField label='Last Name' ref='last_name' placeholder='Last Name'/>
          <InputField label='Email' ref='email' placeholder='Email'/>
          <InputField label='Zip' ref='zipcode' placeholder='Zipcode'/>
          <SwitchField label='CMC Member?'
            ref="CMC_member"
          />
          <SwitchField label='CMC Past Member?'
            ref="CMC_past_member"
          />
          <InputField label='Birthday Year' ref='birth_year' placeholder='Year'/>  
          <Button style={styles.button} onPress={()=>{this.postRegister(this.state.formData)}}>Submit</Button>
          <Button onPress={()=>{this.getRegisters()}}>Check</Button>
          </Form>
          
          <Text>{JSON.stringify(this.state.formData)}</Text>

        </ScrollView>
        }
        </View>
        );
        
      }
  // render() {
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.description}>
  //         Registration page!
  //       </Text>


  //     </View>
  //   );
  // }
}
 
module.exports = Register;