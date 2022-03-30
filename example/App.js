import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Platform
} from "react-native";

import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import RNOtpVerify from 'react-native-otp-verify-remastered';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      otp: "",
    }
  }

  // Step 1
  getHash = () => {
    RNOtpVerify.getHash()
      .then((response) => {
        alert(response);
        console.log("Hash Code:- ", response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Step 2
  startListeningForOtp = () => {
    RNOtpVerify.getOtp()
      .then(p => RNOtpVerify.addListener(this.otpHandler))
      .catch(p => console.log(p));
  }

  // Step 3
  otpHandler = async (message) => {
    if (message) {
      console.log(message);
      const otp = /(\d{6})/g.exec(message)[1];
      console.log(otp);
      await this.setState({ otp });
      await this.checkOTP();
      RNOtpVerify.removeListener();
      Keyboard.dismiss();
    }
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      alert('6 digit otp required')
      this.getHash();
      this.startListeningForOtp();
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      RNOtpVerify.removeListener();
    }
  }

  checkOTP = async () => {
    if (this.state.otp.length == 6) {
      alert('Thanks OTP Verified')
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{
        flex: 1,
      }}>
        <View style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: 'rgba(0,255,255,0.2)',
        }}>
          <View
            style={{
              flex: 1,
            }}
          >
            <SmoothPinCodeInput
              ref={this.pinInput}
              value={this.state.otp}
              codeLength={6}
              onTextChange={otp => this.setState({ otp })}
              autoFocus={true}
              cellStyle={{
                borderBottomWidth: 2,
                borderColor: '#222',
              }}
              cellSpacing={15}
              cellSize={40}
              cellStyleFocused={{
                borderColor: '#222',
              }}
              textStyle={{
                fontSize: 24,
                color: '#222'
              }}
              keyboardType="phone-pad"
              allowFontScaling={false}
            />
            <TouchableOpacity
              onPress={
                this.state.otp.length !== 6 || this.state.otp == '' ?
                  this.state.otp.length == 5 ?
                    this.checkOTP()
                    :
                    null
                  :
                  this.checkOTP()
              }
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default App;
