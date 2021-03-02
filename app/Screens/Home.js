import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  TextInput,
} from "react-native";
import { Picker, Tab, Tabs } from "native-base";
import * as Notifications from "expo-notifications";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Toast from "react-native-toast-message";
import validator from "validator";

const Home = () => {
  const [imageModal, setImageModal] = useState(false);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [operator, setOperator] = useState("");

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const registerForPushNotificationsAsync = async () => {
    let token;
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;

    return token;
  };

  const openCamera = () => {
    setImageModal(false);

    ImagePicker.launchCameraAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      aspect: [4, 5],
      allowsMultipleSelection: false,
    }).then((res) => {
      if (!res.cancelled) {
        setImage(res.uri);
      }
    });
  };

  const openGallery = () => {
    setImageModal(false);

    ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      aspect: [4, 5],
      allowsMultipleSelection: false,
    }).then((res) => {
      if (!res.cancelled) {
        setImage(res.uri);
      }
    });
  };

  const Tab1 = () => (
    <View
      style={{
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity
        onPress={sendNotification}
        style={{
          width: 200,
          height: 200,
          borderRadius: 300,
          backgroundColor: "tomato",
          elevation: 5,
        }}
      ></TouchableOpacity>
    </View>
  );

  const Tab2 = () => (
    <View
      style={{
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Modal
        visible={imageModal}
        transparent
        animated
        animationType="slide"
        onRequestClose={() => setImageModal(false)}
      >
        <View
          style={{
            width: "100%",
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              width: "100%",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              backgroundColor: "white",
              padding: 20,
            }}
          >
            <TouchableOpacity onPress={() => setImageModal(false)}>
              <Text
                style={{ color: "tomato", textDecorationLine: "underline" }}
              >
                cancel
              </Text>
            </TouchableOpacity>

            <View
              style={{
                width: "100%",
                marginTop: 20,
                flexDirection: "row",
                height: 100,
                marginBottom: 20,
              }}
            >
              <TouchableOpacity
                style={{
                  width: "50%",
                  height: 100,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={openCamera}
              >
                <Image
                  style={{ width: 80, height: 50 }}
                  source={require("../../assets/pocketCamera.png")}
                />
                <Text
                  style={{ fontSize: 13, fontWeight: "bold", marginTop: 10 }}
                >
                  CAMERA
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: "50%",
                  height: 100,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={openGallery}
              >
                <Image
                  style={{ width: 60, height: 60 }}
                  source={require("../../assets/gallery.png")}
                />
                <Text
                  style={{ fontSize: 13, fontWeight: "bold", marginTop: 10 }}
                >
                  GALLERY
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {image != null && (
        <Image
          style={{
            marginBottom: 30,
            width: 200,
            height: 200,
            borderRadius: 20,
          }}
          source={{ uri: image }}
        />
      )}
      <TouchableOpacity
        onPress={() => setImageModal(true)}
        style={{
          width: 200,
          height: 50,
          borderRadius: 10,
          backgroundColor: "tomato",
          elevation: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "white" }}>Upload Image</Text>
      </TouchableOpacity>
    </View>
  );

  const sendNotification = async () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Hello ronak Developers 😊",
        body: "I hope this impress you 😁",
      },
      trigger: { seconds: 1 },
    })
      .then((res) => {
        console.log("success");
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const showToast = () => {
    if (name.length == 0) {
      return;
    }
    Toast.show({
      type: "success",
      text1: `Hello ${name}`,
      text2: "I hope this impress you",
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 50,
    });
  };

  const Tab3 = () => (
    <View
      style={{
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TextInput
        autoCapitalize="none"
        onChangeText={(val) => setName(val)}
        value={name}
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
        placeholder="Enter your name"
        placeholderTextColor="#A9A9A9"
      />
      <TouchableOpacity
        onPress={showToast}
        style={{
          width: 200,
          height: 50,
          borderRadius: 10,
          backgroundColor: "tomato",
          elevation: 5,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <Text style={{ color: "white" }}>Send</Text>
      </TouchableOpacity>
    </View>
  );

  const PerformOperation = () => {
    if (
      number1.length == 0 ||
      number2.length == 0 ||
      operator.length == 0 ||
      !validator.isNumeric(number2) ||
      !validator.isNumeric(number1)
    ) {
      Toast.show({
        type: "error",
        text1: `Error`,
        text2: "Cannot perform this operation",
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 50,
      });
      return;
    }

    if (operator == "Addition") {
      Toast.show({
        type: "success",
        text1: `Answer`,
        text2: `Answer is ${number1 + number2}`,
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 50,
      });
    }

    if (operator == "Subtraction") {
      Toast.show({
        type: "success",
        text1: `Answer`,
        text2: `Answer is ${number1 - number2}`,
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 50,
      });
    }

    if (operator == "Multiplication") {
      Toast.show({
        type: "success",
        text1: `Answer`,
        text2: `Answer is ${number1 * number2}`,
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 50,
      });
    }
  };

  const Tab4 = () => (
    <View
      style={{
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TextInput
        autoCapitalize="none"
        onChangeText={(val) => setNumber1(val)}
        value={number1}
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
        placeholder="Number 1"
        placeholderTextColor="#A9A9A9"
        keyboardType="numeric"
      />
      <View
        style={{
          borderWidth: 1,
          width: "80%",
          borderRadius: 5,
          backgroundColor: "rgba(220,220,220,0.3)",
          marginTop: 20,
          marginBottom: 10,
          height: 50,
          fontSize: 20,
        }}
      >
        <Picker
          note
          mode="dropdown"
          style={{ width: "100%" }}
          textStyle={{ color: "black" }}
          placeholder="Select Operator"
          placeholderStyle={{ color: "gray" }}
          selectedValue={operator}
          onValueChange={(val) => setOperator(val)}
        >
          <Picker.Item label="Select Operator" value="" />
          <Picker.Item label="Addition" value="Addition" />
          <Picker.Item label="Subtraction" value="Subtraction" />
          <Picker.Item label="Multiplication" value="Multiplication" />
        </Picker>
      </View>

      <TextInput
        autoCapitalize="none"
        onChangeText={(val) => setNumber2(val)}
        value={number2}
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
        placeholder="Number 2"
        placeholderTextColor="#A9A9A9"
        keyboardType="numeric"
      />
      <TouchableOpacity
        onPress={PerformOperation}
        style={{
          width: 200,
          height: 50,
          borderRadius: 10,
          backgroundColor: "tomato",
          elevation: 5,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <Text style={{ color: "white" }}>Perform Operation</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ width: "100%", flex: 1 }}>
      <Tabs tabBarPosition="bottom">
        <Tab heading="Tab1">{Tab1()}</Tab>
        <Tab heading="Tab2">{Tab2()}</Tab>
        <Tab heading="Tab3">{Tab3()}</Tab>
        <Tab heading="Tab4">{Tab4()}</Tab>
      </Tabs>
    </View>
  );
};

export default Home;
