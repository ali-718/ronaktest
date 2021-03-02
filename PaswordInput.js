import { Icon } from "native-base";
import React, { Component } from "react";
import { TextInput, View, TouchableOpacity } from "react-native";

export default class PasswordInput extends Component {
  render() {
    return (
      <View
        style={{
          borderWidth: 1,
          width: "80%",
          borderRadius: 5,
          backgroundColor: "rgba(220,220,220,0.3)",
          marginTop: 10,
          height: 50,
          fontSize: 20,
          paddingLeft: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 1, height: 50 }}>
          <TextInput
            style={{ width: "100%", height: 50, fontSize: 20 }}
            secureTextEntry={this.props.secureTextEntry}
            placeholder={this.props.placeholder || "Password"}
            placeholderTextColor="#A9A9A9"
            onChangeText={(val) => this.props.onChangeText(val)}
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity
          onPress={() => this.props.changeSecureTextEntry()}
          style={{
            width: 40,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon
            name={this.props.secureTextEntry ? "eye-slash" : "eye"}
            type="FontAwesome"
            style={{ color: "black", fontSize: 20 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
