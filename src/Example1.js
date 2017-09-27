import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import Realm from "realm";

const PersonSchema = {
  name: "Person",
  properties: {
    name: "string"
  }
};

export default class Example1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      realm: null
    };
  }

  componentWillMount() {
    Realm.open({ schema: [PersonSchema] }).then(realm => {
      this.setState({ realm });
    });
  }

  save = () => {
    Realm.open({ schema: [PersonSchema] }).then(realm => {
      realm.write(() => {
        realm.create("Person", { name: this.state.text });
      });
      this.setState({ realm });
    });

    this.setState({ text: "" });

    console.log(this.state.realm);
  };

  render() {
    const info = this.state.realm
      ? "Number of Person in this Realm: " +
        this.state.realm.objects("Person").length
      : "Loading...";
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={{
              flex: 1,
              height: 45,
              borderWidth: 0,
              borderColor: "#fff",
              color: "#363636"
            }}
            value={this.state.text}
            onChangeText={text => this.setState({ text })}
          />
          <TouchableOpacity onPress={() => this.save()}>
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.welcome}>{info}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
