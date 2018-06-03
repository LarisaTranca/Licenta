import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View,TextInput } from 'react-native'
import { Icon } from 'react-native-elements'
import PropTypes from 'prop-types'

import mainColor from './constants'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 25,
  },
  emailColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  emailIcon: {
    color: mainColor,
    fontSize: 30,
  },
  emailNameColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  emailNameText: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '200',
  },
  emailRow: {
    flex: 8,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  emailText: {
    fontSize: 16,
  },
  iconRow: {
    flex: 2,
    justifyContent: 'center',
  }, input: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: 140,
    height: 30,
    color: '#000000',
    left:0,
    marginRight:20
  },
})

const Email = ({ containerStyle, onPressEmail, email, edit, setEmail }) => {
  if(edit){
    return(
      <TouchableOpacity>
    <View style={[styles.container, containerStyle]}>
      <View style={styles.iconRow}>
          <Icon
            name="email"
            underlayColor="transparent"
            iconStyle={styles.emailIcon}
          />
      </View>
      <View style={styles.emailRow}>
        <View style={styles.emailColumn}>
          <TextInput
              style={styles.input}
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
        </View>
      </View>
    </View>
  </TouchableOpacity>
      );
  }
    else{
  return(<TouchableOpacity onPress={() => onPressEmail(email)}>
    <View style={[styles.container, containerStyle]}>
      <View style={styles.iconRow}>
          <Icon
            name="email"
            underlayColor="transparent"
            iconStyle={styles.emailIcon}
          />
      </View>
      <View style={styles.emailRow}>
        <View style={styles.emailColumn}>
          <Text style={styles.emailText}>{email}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>);
}
}

Email.propTypes = {
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  email: PropTypes.string.isRequired,
  onPressEmail: PropTypes.func.isRequired,
  setEmail: PropTypes.func.isRequired,
}

Email.defaultProps = {
  containerStyle: {},
  name: null,
}

export default Email