import { Icon } from "native-base";
import React, { Component } from "react";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import PasswordInput from "../../PaswordInput";
import validator from "validator";

const green = "#008000";
const SpecialCharacterRegex = /[$&+,:;=?@#|'<>.^*()%!-]/g;
const EightCharacterRegex = /^[a-zA-Z]\w{8,}$/g;
const NumberRegex = new RegExp("[0-9]");

class Login extends Component {
  state = {
    Email: "",
    Password: "",
    ConnectionError: false,
    secureTextEntry: true,
    isRegex: false,
    isEightCharacter: false,
    isSpecialCharacter: false,
    isNumberCharacter: false,
    emailregex: false,
    validEmail: false,
  };

  passwordChange = (val) => {
    this.setState({ Password: val });

    if (val.length > 0) {
      this.setState({ isRegex: true });

      if (val?.match(SpecialCharacterRegex) != null) {
        this.setState({ isSpecialCharacter: true });
      }

      if (val?.match(SpecialCharacterRegex) == null) {
        this.setState({ isSpecialCharacter: false });
      }

      if (val?.length > 8) {
        this.setState({ isEightCharacter: true });
      }

      if (val?.length < 8) {
        this.setState({ isEightCharacter: false });
      }

      if (NumberRegex.test(val)) {
        this.setState({ isNumberCharacter: true });
      }

      if (!NumberRegex.test(val)) {
        this.setState({ isNumberCharacter: false });
      }
    }
  };

  onChangeEmail = (val) => {
    this.setState({ Email: val });

    if (val.length > 0) {
      this.setState({ emailregex: true });

      if (validator.isEmail(val)) {
        this.setState({ validEmail: true });
      } else {
        this.setState({ validEmail: false });
      }
    }
  };

  goToNextScreen = () => {
    if (
      this.state.isSpecialCharacter &&
      this.state.validEmail &&
      this.state.isEightCharacter &&
      this.state.isNumberCharacter
    ) {
      this.props.navigation.navigate("home");
    }
  };

  render() {
    return (
      <View
        style={{
          width: "100%",
          flex: 1,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "100%",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ width: "100%", marginTop: 50, alignItems: "center" }}>
            <TextInput
              autoCapitalize="none"
              onChangeText={this.onChangeEmail}
              value={this.state.Email}
              style={{
                borderWidth: 1,
                width: "80%",
                borderRadius: 5,
                backgroundColor: "rgba(220,220,220,0.3)",
                marginTop: 10,
                height: 50,
                fontSize: 20,
                paddingLeft: 10,
              }}
              placeholder="Username or Email"
              placeholderTextColor="#A9A9A9"
            />
            <PasswordInput
              changeSecureTextEntry={() =>
                this.setState({
                  secureTextEntry: !this.state.secureTextEntry,
                })
              }
              secureTextEntry={this.state.secureTextEntry}
              onChangeText={(val) => this.passwordChange(val)}
            />
            <View
              style={{ width: "80%", alignItems: "flex-end", paddingTop: 5 }}
            >
              <TouchableOpacity>
                <Text>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginTop: 20, width: "100%", alignItems: "center" }}>
            <TouchableOpacity
              onPress={this.goToNextScreen}
              style={{
                backgroundColor: "#3498F1",
                width: "80%",
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={{ width: "80%", marginTop: 30 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon
                name="check"
                type="AntDesign"
                style={{
                  fontSize: 15,
                  color: this.state.isRegex
                    ? this.state.isSpecialCharacter
                      ? green
                      : "red"
                    : "gray",
                }}
              />
              <Text
                style={{
                  marginLeft: 10,
                  color: this.state.isRegex
                    ? this.state.isSpecialCharacter
                      ? green
                      : "red"
                    : "gray",
                }}
              >
                1 special characters
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 0,
              }}
            >
              <Icon
                name="check"
                type="AntDesign"
                style={{
                  fontSize: 15,
                  color: this.state.isRegex
                    ? this.state.isEightCharacter
                      ? green
                      : "red"
                    : "gray",
                }}
              />
              <Text
                style={{
                  marginLeft: 10,
                  color: this.state.isRegex
                    ? this.state.isEightCharacter
                      ? green
                      : "red"
                    : "gray",
                }}
              >
                8 characters
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 0,
              }}
            >
              <Icon
                name="check"
                type="AntDesign"
                style={{
                  fontSize: 15,
                  color: this.state.isRegex
                    ? this.state.isNumberCharacter
                      ? green
                      : "red"
                    : "gray",
                }}
              />
              <Text
                style={{
                  marginLeft: 10,
                  color: this.state.isRegex
                    ? this.state.isNumberCharacter
                      ? green
                      : "red"
                    : "gray",
                }}
              >
                1 number
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 0,
              }}
            >
              <Icon
                name="check"
                type="AntDesign"
                style={{
                  fontSize: 15,
                  color: this.state.emailregex
                    ? this.state.validEmail
                      ? green
                      : "red"
                    : "gray",
                }}
              />
              <Text
                style={{
                  marginLeft: 10,
                  color: this.state.emailregex
                    ? this.state.validEmail
                      ? green
                      : "red"
                    : "gray",
                }}
              >
                valid email
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default Login;
