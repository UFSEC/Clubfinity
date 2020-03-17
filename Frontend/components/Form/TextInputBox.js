import React from 'react';
import { TextInput, StyleSheet, Platform } from 'react-native';

export default class TextInputBox extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const isMultilineEnabled = !!this.props.multiline
		return (
			<TextInput
				numberOfLines={isMultilineEnabled ? (Platform.OS === 'ios' ? null : 5) : null}
				minHeight={isMultilineEnabled ? ((Platform.OS === 'ios' && 5) ? (20 * 5) : null) : null}
				multiline={isMultilineEnabled}
				secureTextEntry={this.props.isHidden}
				style={Platform.OS === "ios" ? styles.iOS : styles.android}
				placeholderTextColor={'#8E8E93'}
				placeholder={this.props.placeholder}
				onChangeText={(text) => this.props.setValue(text)}
				value={this.props.firstName}
			/>
		);
	}
}

const txtFieldBgColor = "#F4F4F4";
const styles = StyleSheet.create({
	iOS: {
		flex: 1,
		backgroundColor: txtFieldBgColor,
		borderColor: txtFieldBgColor,
		borderWidth: 1,
		borderRadius: 10,
		margin: 5,
		paddingHorizontal: 20,
		paddingVertical: 10,
		maxHeight: 60,
	},
	android: {
		backgroundColor: txtFieldBgColor,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: txtFieldBgColor,
		margin: 5,
		paddingHorizontal: 20,
		paddingVertical: 10,
		flex: 1
	}
})
