## Due to the lack of response from the maintenance team, I am deploying my own package for my projects. If you'd like to use this package, feel free to do so.

Original Package [react-native-otp-verify](https://www.npmjs.com/package/react-native-otp-verify)


# react-native-otp-verify-remastered
The SMS Retriever API is used in Automatic SMS Verification.
You can use the API to automatically verify users' identities through SMS, without requiring them to type verification codes manually or requiring them to grant additional permissions to your app.

 ## Message Format/Structure
 In order to detect the message, a hash that identifies your application must be included in the SMS. Below, you can find this hash by using the getHash() method.

For more information on the message structure, consult the official documentation here.
[Google developer guide](https://developers.google.com/identity/sms-retriever/verify)

## Getting started

```
npm i react-native-otp-verify-remastered
```
or
```
yarn add react-native-otp-verify-remastered
```

## Usage
```javascript
import RNOtpVerify from 'react-native-otp-verify-remastered';

getHash = () =>
    RNOtpVerify.getHash()
    .then(console.log)
    .catch(console.log);

startListeningForOtp = () =>
    RNOtpVerify.getOtp()
    .then(p => RNOtpVerify.addListener(this.otpHandler))
    .catch(p => console.log(p));

 otpHandler = (message: string) => {
        const otp = /(\d{4})/g.exec(message)[1];
        this.setState({ otp });
        RNOtpVerify.removeListener();
        Keyboard.dismiss();
}

 componentWillUnmount() {
    RNOtpVerify.removeListener();
 }
```

#### Methods
---
### `getOtp():Promise<boolean>`

Start listening for OTP/SMS. Return true if listener starts else throws error.

---
### `getOtp():Promise<boolean>`

Start listening for OTP/SMS. Return true if listener starts else throws error.

---
### `getHash():Promise<string[]>`

Gets the hash code for the application which should be added at the end of message.
This is just a one time process.

---
### `addListener(handler:(message:string)=>any):Promise<boolean>`

Adds a javascript listener to the handler passed which is called when message is received.

---
### `removeListener():void`

Removes the listener.